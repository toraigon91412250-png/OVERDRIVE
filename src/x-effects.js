import * as T from 'three';

// Three instanced draws, shared by every transient and the time-break field.
// Nothing is allocated when the player kills, dashes, or repeats a break.
export function createXEffects(scene) {
 const CAPACITY=24,PALETTE=[0xff4ca0,0xfff4dc,0xffc56c];
 const root=new T.Group();root.name='X / stolen-time fractures';root.visible=false;scene.add(root);
 const events=Array.from({length:CAPACITY},()=>({life:0,age:0,x:0,y:0,z:0,kind:'kill',seed:0}));
 const pose=new T.Object3D(),color=new T.Color();
 const makeBatch=(geometry,capacity,opacity)=>{
  const material=new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity,depthWrite:false,blending:T.AdditiveBlending});
  const mesh=new T.InstancedMesh(geometry,material,capacity);mesh.count=0;mesh.frustumCulled=false;mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);mesh.renderOrder=2;root.add(mesh);
  // Allocate instanceColor now, rather than on the first combat event.
  mesh.setColorAt(0,color.setHex(0xffffff));return mesh;
 };
 const shards=makeBatch(new T.ConeGeometry(1,1,3,1),CAPACITY*12+16,.86);
 const arcs=makeBatch(new T.TorusGeometry(1,.013,3,12,Math.PI*.22).rotateX(-Math.PI/2),CAPACITY*8+12,.76);
 const ticks=makeBatch(new T.BoxGeometry(1,1,1),CAPACITY*12+16,.80);
 const counts={kill:0,bounty:0,dash:0,break:0,refund:0};
 let enabled=false,clock=0,serial=0,totalBursts=0,breakVisible=false,shardCount=0,arcCount=0,tickCount=0;

 function write(mesh,index,x,y,z,sx,sy,sz,rx,ry,rz,hex,brightness){
  pose.position.set(x,y,z);pose.rotation.set(rx,ry,rz);pose.scale.set(sx,sy,sz);pose.updateMatrix();
  mesh.setMatrixAt(index,pose.matrix);mesh.setColorAt(index,color.setHex(hex).multiplyScalar(Math.max(0,brightness)));
 }
 function arc(x,y,z,r,angle,hex,brightness){write(arcs,arcCount++,x,y,z,r,1,r,0,angle,0,hex,brightness);}
 function tick(x,y,z,r,angle,length,hex,brightness){write(ticks,tickCount++,x+Math.cos(angle)*r,y,z+Math.sin(angle)*r,.028,.024,length,0,Math.PI/2-angle,0,hex,brightness);}
 function reset(){
  for(const event of events)event.life=0;
  for(const key of Object.keys(counts))counts[key]=0;
  shards.count=arcs.count=ticks.count=0;shardCount=arcCount=tickCount=0;
  clock=serial=totalBursts=0;breakVisible=false;root.visible=false;
 }
 function setActive(active){enabled=!!active;root.visible=false;if(!enabled){for(const event of events)event.life=0;shards.count=arcs.count=ticks.count=0;shardCount=arcCount=tickCount=0;breakVisible=false;}}
 function burst(at,{kind='kill'}={}){
  if(!enabled||!at)return false;
  if(!Object.prototype.hasOwnProperty.call(counts,kind))kind='kill';
  const x=Number(at.x??at[0]),y=Number(at.y??at[1]),z=Number(at.z??at[2]);
  if(!Number.isFinite(x)||!Number.isFinite(y)||!Number.isFinite(z))return false;
  const event=events.find(e=>e.life<=0)||events.reduce((a,b)=>a.age/a.life>b.age/b.life?a:b);
  event.x=x;event.y=y;event.z=z;event.kind=kind;event.age=0;
  event.life=kind==='break'?1.1:kind==='bounty'?.9:kind==='dash'?.38:.62;
  event.seed=(++serial*2.399963229728653)% (Math.PI*2);totalBursts++;counts[kind]++;return true;
 }
 function update(dt,{playing=false,breaking=false,player=null,low=false,reduced=false}={}){
  root.visible=enabled&&playing;if(!root.visible)return;
  const delta=Number.isFinite(dt)?Math.max(0,dt):0;clock+=delta;
  shardCount=arcCount=tickCount=0;breakVisible=!!breaking&&!!player;
  for(const event of events){
   if(event.life<=0)continue;event.age+=delta;
   if(event.age>=event.life){event.life=0;continue;}
   const t=event.age/event.life,fade=(1-t)*(1-t),kind=event.kind,big=kind==='bounty'||kind==='break';
   const floor=event.y+(kind==='kill'||kind==='bounty'?-.92:.065),spin=event.seed+(reduced?0:clock*.22);
   const radius=kind==='break'?1.3+(1-(1-t)**3)*4.1:kind==='dash'?.45+t*2.5:kind==='refund'?1.7*(1-t)+.2:kind==='bounty'?.75+t*2.2:.4+t*.8;
   const arcParts=kind==='break'?(low||reduced?4:8):big?6:kind==='dash'?3:2;
   for(let i=0;i<arcParts;i++)arc(event.x,floor,event.z,radius,spin+i*Math.PI*2/arcParts,PALETTE[(i+(big?1:0))%3],fade*(big?1.1:.65));
   const marks=big?(low?6:12):kind==='dash'?4:3;
   for(let i=0;i<marks;i++){
    const angle=spin+i*Math.PI*2/marks;
    tick(event.x,floor+.02,event.z,radius,angle,big?.3:.15,PALETTE[(i+2)%3],fade*.85);
   }
   const fragments=low||reduced?(big?6:3):big?12:6;
   for(let i=0;i<fragments;i++){
    const angle=event.seed+i*Math.PI*2/fragments+(reduced?0:t*.8),outward=(kind==='refund'?1-t:t)*(big?2.3:1.25),rise=kind==='dash'?.22:Math.sin(t*Math.PI*.72)*(big?2:1.15);
    const size=(big?.055:.035)*(1-.4*t),height=(big?.38:.26)*(1-.35*t);
    write(shards,shardCount++,event.x+Math.cos(angle)*outward,event.y+.15+rise+(i%3)*.09,event.z+Math.sin(angle)*outward,size,height,size,reduced?.2:t*1.6+i,angle,.35+Math.sin(angle)*.5,PALETTE[i%3],fade*(big?1.4:1));
   }
  }
  if(breakVisible){
   const x=player.x,y=player.y+.10,z=player.z,n=low||reduced?4:8,turn=reduced?0:clock*.35;
   for(let i=0;i<n;i++){
    const angle=i*Math.PI*2/n+turn,radius=2.8+.18*Math.sin(clock*2+i);
    arc(x,y,z,radius,angle,PALETTE[i%3],.34);
    tick(x,y+.015,z,2.55,angle,.25,0xfff4dc,.32);
    write(shards,shardCount++,x+Math.cos(angle)*2.4,y+.2+(reduced?0:Math.sin(clock*1.8+i)*.12),z+Math.sin(angle)*2.4,.035,.26,.035,0,-angle,Math.PI/4,PALETTE[(i+1)%3],.62);
   }
  }
  for(const [mesh,count] of [[shards,shardCount],[arcs,arcCount],[ticks,tickCount]]){mesh.count=count;if(count){mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true;}}
 }
 function snapshot(){return {enabled,visible:root.visible,active:events.reduce((n,e)=>n+(e.life>0?1:0),0),capacity:CAPACITY,drawObjects:3,shards:shardCount,arcs:arcCount,ticks:tickCount,breakVisible,totalBursts,counts:{...counts}};}
 return {reset,setActive,update,burst,snapshot};
}
