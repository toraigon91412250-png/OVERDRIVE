// Ground routes around the same visible obstacles used by character collision.
export function createNavigator(getObstacles,getVersion=()=>'',options={}){
 const cell=options.cellSize||4,bound=options.bound||564,width=Math.ceil(bound*2/cell)+1,count=width*width,grids=new Map(),agents=new WeakMap();let version=getVersion();
 const worldX=i=>i%width*cell-bound,worldZ=i=>Math.floor(i/width)*cell-bound;
 const index=(x,z)=>Math.max(0,Math.min(width-1,Math.round((z+bound)/cell)))*width+Math.max(0,Math.min(width-1,Math.round((x+bound)/cell)));
 function pointClear(x,z,boxes,r){for(const b of boxes)if(x>b.x-b.hx-r&&x<b.x+b.hx+r&&z>b.z-b.hz-r&&z<b.z+b.hz+r)return false;return true;}
 function segmentClear(a,b,boxes,r){
  for(const box of boxes){let enter=0,leave=1;for(const axis of ['x','z']){const delta=b[axis]-a[axis],half=(axis==='x'?box.hx:box.hz)+r,lo=box[axis]-half,hi=box[axis]+half;
   if(Math.abs(delta)<1e-8){if(a[axis]<lo||a[axis]>hi){enter=2;break;}}
   else {let p=(lo-a[axis])/delta,q=(hi-a[axis])/delta;if(p>q)[p,q]=[q,p];enter=Math.max(enter,p);leave=Math.min(leave,q);if(enter>leave)break;}}
   if(enter<=leave&&enter<=1&&leave>=0)return false;
  }return true;
 }
 function grid(radius,height){if(version!==getVersion()){version=getVersion();grids.clear();}const key=radius+':'+height;if(grids.has(key))return grids.get(key);
  const boxes=getObstacles(height),blocked=new Uint8Array(count);
  for(const b of boxes){const x0=Math.max(0,Math.ceil((b.x-b.hx-radius+bound)/cell)),x1=Math.min(width-1,Math.floor((b.x+b.hx+radius+bound)/cell)),z0=Math.max(0,Math.ceil((b.z-b.hz-radius+bound)/cell)),z1=Math.min(width-1,Math.floor((b.z+b.hz+radius+bound)/cell));for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++)blocked[z*width+x]=1;}
  const result={key,boxes,blocked,score:new Float32Array(count),parent:new Int32Array(count),seen:new Uint32Array(count),closed:new Uint32Array(count),stamp:0};grids.set(key,result);return result;
 }
 function nearest(g,point,r,checkLine){const at=index(point.x,point.z),cx=at%width,cz=Math.floor(at/width);if(!g.blocked[at]&&(!checkLine||segmentClear(point,{x:worldX(at),z:worldZ(at)},g.boxes,r)))return at;
  let best=-1,bestDistance=Infinity;
  for(let radius=1;radius<=12;radius++){for(let dz=-radius;dz<=radius;dz++)for(let dx=-radius;dx<=radius;dx++){if(Math.abs(dx)!==radius&&Math.abs(dz)!==radius)continue;const x=cx+dx,z=cz+dz;if(x<0||x>=width||z<0||z>=width)continue;const i=z*width+x;if(g.blocked[i])continue;const p={x:worldX(i),z:worldZ(i)},d=(p.x-point.x)**2+(p.z-point.z)**2;if(d<bestDistance&&(!checkLine||segmentClear(point,p,g.boxes,r))){best=i;bestDistance=d;}}if(best>=0)return best;}
  return -1;
 }
 function plan(start,goal,radius,height){const g=grid(radius,height);if(pointClear(goal.x,goal.z,g.boxes,radius)&&segmentClear(start,goal,g.boxes,radius))return [{x:goal.x,z:goal.z}];
  const from=nearest(g,start,radius,true),to=nearest(g,goal,radius,false);if(from<0||to<0)return [];
  const stamp=++g.stamp,heap=[],weights=[];const push=(id,weight)=>{let i=heap.length;heap.push(id);weights.push(weight);while(i>0){const p=(i-1)>>1;if(weights[p]<=weight)break;heap[i]=heap[p];weights[i]=weights[p];i=p;}heap[i]=id;weights[i]=weight;};
  const pop=()=>{const value=heap[0],last=heap.pop(),w=weights.pop();if(heap.length){let i=0;while(i*2+1<heap.length){let child=i*2+1;if(child+1<heap.length&&weights[child+1]<weights[child])child++;if(weights[child]>=w)break;heap[i]=heap[child];weights[i]=weights[child];i=child;}heap[i]=last;weights[i]=w;}return value;};
  const targetX=to%width,targetZ=Math.floor(to/width),heuristic=i=>Math.hypot(i%width-targetX,Math.floor(i/width)-targetZ);
  g.score[from]=0;g.seen[from]=stamp;g.parent[from]=-1;push(from,heuristic(from));let found=false,visits=0;
  while(heap.length&&visits++<10000){const current=pop();if(g.closed[current]===stamp)continue;g.closed[current]=stamp;if(current===to){found=true;break;}const x=current%width,z=Math.floor(current/width);
   for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dz)continue;const nx=x+dx,nz=z+dz;if(nx<0||nx>=width||nz<0||nz>=width)continue;const next=nz*width+nx;if(g.blocked[next]||g.closed[next]===stamp||dx&&dz&&(g.blocked[z*width+nx]||g.blocked[nz*width+x]))continue;const score=g.score[current]+(dx&&dz?Math.SQRT2:1);if(g.seen[next]!==stamp||score<g.score[next]){g.seen[next]=stamp;g.score[next]=score;g.parent[next]=current;push(next,score+heuristic(next));}}
  }
  if(!found)return [];const path=[];for(let i=to;i>=0;i=g.parent[i])path.push({x:worldX(i),z:worldZ(i)});path.reverse();return path;
 }
 function advance(position,goal,step,radius,height,yaw,now){const g=grid(radius,height);let state=agents.get(position);if(!state||state.version!==version||state.key!==g.key||now-state.time>3||now-state.time>.75&&Math.hypot(goal.x-state.goalX,goal.z-state.goalZ)>8){state={path:plan(position,goal,radius,height),index:0,time:now,goalX:goal.x,goalZ:goal.z,key:g.key,version};agents.set(position,state);}
  const path=state.path;if(!path.length)return {moved:false,heading:yaw};
  while(state.index<path.length-1&&Math.hypot(path[state.index].x-position.x,path[state.index].z-position.z)<cell*.65&&segmentClear(position,path[state.index+1],g.boxes,radius))state.index++;
  for(let i=Math.min(path.length-1,state.index+6);i>state.index;i--)if(segmentClear(position,path[i],g.boxes,radius)){state.index=i;break;}
  const target=path[state.index],dx=target.x-position.x,dz=target.z-position.z,d=Math.hypot(dx,dz),heading=Math.atan2(dx,dz),turn=Math.atan2(Math.sin(heading-yaw),Math.cos(heading-yaw));if(d<.12||Math.abs(turn)>.35)return {moved:false,heading};
  const amount=Math.min(step,d),next={x:position.x+dx/d*amount,z:position.z+dz/d*amount};if(!segmentClear(position,next,g.boxes,radius)){agents.delete(position);return {moved:false,heading};}position.x=next.x;position.z=next.z;return {moved:true,heading};
 }
 return {plan,advance,clearSegment:(a,b,r,h)=>segmentClear(a,b,grid(r,h).boxes,r)};
}
