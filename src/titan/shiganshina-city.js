import * as THREE from 'three';

// Static city batches keep the original geometry and instance IDs. Traverse
// only nearby grid cells before asking Three's normal triangle raycast for
// the actual surface, so decoration count does not scale every wire query.
function indexInstanceRaycast(mesh) {
 const cellSize=32,boxes=[],bounds=new THREE.Box3(),instanceMatrix=new THREE.Matrix4();
 mesh.geometry.computeBoundingBox();
 for(let id=0;id<mesh.count;id++){
  mesh.getMatrixAt(id,instanceMatrix);
  const box=mesh.geometry.boundingBox.clone().applyMatrix4(instanceMatrix).expandByScalar(.0001);
  boxes.push(box);bounds.union(box);
 }
 const minX=Math.floor(bounds.min.x/cellSize),minZ=Math.floor(bounds.min.z/cellSize);
 const width=Math.floor(bounds.max.x/cellSize)-minX+1,depth=Math.floor(bounds.max.z/cellSize)-minZ+1;
 const grid=new Map();
 for(let id=0;id<boxes.length;id++){
  const box=boxes[id];
  for(let z=Math.floor(box.min.z/cellSize)-minZ;z<=Math.floor(box.max.z/cellSize)-minZ;z++)for(let x=Math.floor(box.min.x/cellSize)-minX;x<=Math.floor(box.max.x/cellSize)-minX;x++){
   const key=x+z*width;let list=grid.get(key);if(!list){list=[];grid.set(key,list);}list.push(id);
  }
 }
 const inverse=new THREE.Matrix4(),ray=new THREE.Ray(),hitPoint=new THREE.Vector3(),seen=new Uint32Array(mesh.count),intersections=[];
 const probe=new THREE.Mesh(mesh.geometry,mesh.material);let stamp=0;
 const stats={instances:mesh.count,cells:grid.size,queries:0,lastCells:0,lastCandidates:0,lastTested:0,lastHits:0,totalTested:0};
 mesh.userData.raycastGrid=stats;
 mesh.raycast=function(raycaster,output){
  stats.queries++;stats.lastCells=stats.lastCandidates=stats.lastTested=stats.lastHits=0;
  inverse.copy(this.matrixWorld).invert();ray.origin.copy(raycaster.ray.origin).applyMatrix4(inverse);
  const e=inverse.elements,d=raycaster.ray.direction;
  ray.direction.set(e[0]*d.x+e[4]*d.y+e[8]*d.z,e[1]*d.x+e[5]*d.y+e[9]*d.z,e[2]*d.x+e[6]*d.y+e[10]*d.z);
  const scale=ray.direction.length();ray.direction.multiplyScalar(1/scale);
  let enter=Math.max(0,raycaster.near*scale),exit=raycaster.far*scale;
  for(const axis of ['x','y','z']){
   const direction=ray.direction[axis],origin=ray.origin[axis];
   if(Math.abs(direction)<1e-12){if(origin<bounds.min[axis]||origin>bounds.max[axis])return;continue;}
   let a=(bounds.min[axis]-origin)/direction,b=(bounds.max[axis]-origin)/direction;
   if(a>b){const swap=a;a=b;b=swap;}enter=Math.max(enter,a);exit=Math.min(exit,b);
   if(exit<enter)return;
  }
  stamp=(stamp+1)>>>0;if(stamp===0){seen.fill(0);stamp=1;}
  ray.at(enter,hitPoint);
  let x=Math.max(0,Math.min(width-1,Math.floor(hitPoint.x/cellSize)-minX)),z=Math.max(0,Math.min(depth-1,Math.floor(hitPoint.z/cellSize)-minZ));
  const stepX=ray.direction.x>0?1:ray.direction.x<0?-1:0,stepZ=ray.direction.z>0?1:ray.direction.z<0?-1:0;
  const deltaX=stepX?cellSize/Math.abs(ray.direction.x):Infinity,deltaZ=stepZ?cellSize/Math.abs(ray.direction.z):Infinity;
  let nextX=stepX?((minX+x+(stepX>0?1:0))*cellSize-ray.origin.x)/ray.direction.x:Infinity;
  let nextZ=stepZ?((minZ+z+(stepZ>0?1:0))*cellSize-ray.origin.z)/ray.direction.z:Infinity;
  const visit=(cx,cz)=>{
   if(cx<0||cx>=width||cz<0||cz>=depth)return;
   stats.lastCells++;const ids=grid.get(cx+cz*width);if(!ids)return;
   for(const id of ids){
    if(seen[id]===stamp)continue;seen[id]=stamp;stats.lastCandidates++;
    if(!ray.intersectsBox(boxes[id]))continue;
    stats.lastTested++;this.getMatrixAt(id,instanceMatrix);probe.matrixWorld.multiplyMatrices(this.matrixWorld,instanceMatrix);
    THREE.Mesh.prototype.raycast.call(probe,raycaster,intersections);
    for(const hit of intersections){hit.instanceId=id;hit.object=this;output.push(hit);stats.lastHits++;}intersections.length=0;
   }
  };
  for(let step=0;step<width+depth+4;step++){
   visit(x,z);const next=Math.min(nextX,nextZ);if(next>exit||next===Infinity)break;
   if(Math.abs(nextX-nextZ)<1e-8){visit(x+stepX,z);visit(x,z+stepZ);x+=stepX;z+=stepZ;nextX+=deltaX;nextZ+=deltaZ;}
   else if(nextX<nextZ){x+=stepX;nextX+=deltaX;}else{z+=stepZ;nextZ+=deltaZ;}
   if(x<0||x>=width||z<0||z>=depth)break;
  }
  stats.totalTested+=stats.lastTested;
 };
}

// Architecture adapted from the user-supplied Shiganshina V4 scene. The game
// supplies its own camera, controls, lighting and existing Maria perimeter.
export function createShiganshinaCity({scene,targets=[],colliders=[]}) {
 const T=THREE,TAU=Math.PI*2,city=new T.Group();city.name='raid-shiganshina-city';city.userData.cityOnly=true;scene.add(city);
 const ownedColliders=[];
 function solid({x,z,w,d,h,bottom=0,roofHeight=0,roofAxis='x',roofShape}){
  const record={x,z,hx:w/2,hz:d/2,h,top:h+roofHeight,bottom,roofHeight,roofAxis,roofShape,mesh:city};
  ownedColliders.push(record);colliders.push(record);
 }
const rand=(()=>{let s=638297;return()=>((s=(Math.imul(s,1664525)+1013904223)>>>0)/4294967296)})();
const r=(a,b)=>a+(b-a)*rand();const pick=a=>a[Math.floor(rand()*a.length)];const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const palettes={
 ground:0x8a8573,grass:0x82956d, grass2:0x6d855f, pavement:0x978d7b,road:0xa29785,roadDark:0x7a766c,cobble:0xb1a28d,
 stone0:0xb2b2a4,stone1:0xc2beb0,stone2:0x999d98,stone3:0x868d8c,stone4:0xd0cab6,stoneShadow:0x666f6d,
 plaster0:0xd6c6a6,plaster1:0xd8d1bc,plaster2:0xbec5b8,plaster3:0xc6b39b,plaster4:0xbbb6a4,plaster5:0xd8c6b1,
 slateRoof:0x384d57,slateLight:0x687b80,copperRoof:0x546f72,copperTrim:0x819a91,formalWall:0xc6c6b8,formalWhite:0xe1d7bd,formalDark:0x7d8381,brick:0x986c60,plazaStone:0xaaa394,flagBlue:0x2c566e,roof0:0x9c4d3d,roof1:0xa95e45,roof2:0x75453a,roof3:0xbc7450,roof4:0x8c5545,roof5:0x734841,
 beam:0x574a3d,beam2:0x78604b,beam3:0x514b43,window:0x293943,glass:0x64838b,door:0x423e33,wood:0x74634c,
 stall0:0xd5a66f,stall1:0x667c74,water:0x669a9c,waterEdge:0x84b6b9,foliage0:0x557253,foliage1:0x688059,foliage2:0x47644e,trunk:0x6b5844,cloud:0xf4ecdf,metal:0xa39576,market:0xb4a08a
};
const mat={};for(const [k,v] of Object.entries(palettes))mat[k]=new T.MeshLambertMaterial({color:v,flatShading:true,side:T.FrontSide});
mat.water=new T.MeshPhongMaterial({color:0x69a7b2,shininess:88,transparent:true,opacity:.89});mat.cloud=new T.MeshLambertMaterial({color:0xf9f4e9,transparent:true,opacity:.66,depthWrite:false});
const boxGeo=new T.BoxGeometry(1,1,1),coneGeo=new T.ConeGeometry(1,.999,5),hipGeo=new T.ConeGeometry(Math.SQRT1_2,1,4),triGeo=new T.BufferGeometry();hipGeo.rotateY(Math.PI/4);triGeo.setAttribute('position',new T.Float32BufferAttribute([-.5,0,0,.5,0,0,0,1,0],3));triGeo.setIndex([0,1,2]);triGeo.computeVertexNormals();
const triMats={};for(const [k,v] of Object.entries(palettes))triMats[k]=new T.MeshLambertMaterial({color:v,side:T.DoubleSide,flatShading:true});
const queues=new Map();let batches=0,instances=0,homes=0,autoSolids=true;
const footprints=[];
function add(type,x,y,z,w,h,d,rotY=0,rotZ=0,tri=false){const id=(tri===true?'t':tri==='cone'?'c':tri==='hip'?'h':'b')+type;let q=queues.get(id);if(!q){q={type,tri,items:[]};queues.set(id,q)}q.items.push([x,y,z,w,h,d,rotY,rotZ]);if(autoSolids&&!tri&&w>=1&&d>=1&&h>=1.1&&!/^(?:grass|ground|road|pavement|cobble|water|foliage|cloud|trunk)/.test(type)&&!/^roof|Roof/.test(type)&&Math.abs(x)<540&&Math.abs(z)<540){const co=Math.abs(Math.cos(rotY)),si=Math.abs(Math.sin(rotY));solid({x,z,w:co*w+si*d,d:si*w+co*d,h:y+h/2,bottom:Math.max(0,y-h/2)});}}
const qY=new T.Quaternion(),qZ=new T.Quaternion(),qR=new T.Quaternion(),m4=new T.Matrix4();
function flush(){for(const q of queues.values()){
 const mesh=new T.InstancedMesh(q.tri===true?triGeo:q.tri==='cone'?coneGeo:q.tri==='hip'?hipGeo:boxGeo,q.tri===true?triMats[q.type]:mat[q.type],q.items.length);mesh.frustumCulled=false;mesh.name=q.type.toUpperCase()+'_'+q.items.length;
 q.items.forEach((a,i)=>{qY.setFromAxisAngle(new T.Vector3(0,1,0),a[6]);qZ.setFromAxisAngle(new T.Vector3(0,0,1),a[7]);qR.multiplyQuaternions(qY,qZ);m4.compose(new T.Vector3(a[0],a[1],a[2]),qR,new T.Vector3(a[3],a[4],a[5]));mesh.setMatrixAt(i,m4);});mesh.instanceMatrix.needsUpdate=true;mesh.userData.category=q.type;mesh.userData.cityOnly=true;city.add(mesh);if(/^(?:plaster|formalWall|stone[0-4]|roof|slateRoof|copperRoof|trunk)/.test(q.type)){indexInstanceRaycast(mesh);targets.push(mesh);}batches++;instances+=q.items.length;
 } queues.clear();}
function plainMesh(geo,key,x,y,z,ry=0){const mesh=new T.Mesh(geo,mat[key]);mesh.position.set(x,y,z);mesh.rotation.y=ry;city.add(mesh);return mesh}
// The historical town is preserved in style, but its footprint is 2.6 times wider AND deeper.
// Buildings keep their human-scale dimensions. The expanded quarters contain additional houses.
const CITY_SCALE=2.6;
const WALL=77, R=205*CITY_SCALE, C=-48*CITY_SCALE, BACK=-164*CITY_SCALE;
const FRONT=C+R, GATE_Z=FRONT-2*CITY_SCALE;
function insideTown(x,z,margin=0){
 if(z<BACK+margin || z>FRONT-margin || Math.abs(x)>R-margin)return false;
 if(z>C && x*x+(z-C)*(z-C)>(R-margin)*(R-margin))return false;
 return true;
}
// Roads become a connected, street-sized grid instead of enlarging ordinary buildings.
const verticalStreets=[-420,-320,-220,-110,0,110,220,320,420];
const horizontalStreets=[-365,-270,-175,-80,15,110,205,300];
const CANAL_X=R-69,CANAL_START=BACK+28,CANAL_END=C+83;
const secondMarkets=[{x:-259,z:117,size:51},{x:247,z:-267,size:53}];
add('grass',0,-.86,0,4400,1.5,4400);
add('ground',0,-.05,(BACK+C)/2,2*R-.5,.38,C-BACK);
const townShape=new T.Shape();townShape.moveTo(-R,C);townShape.lineTo(-R,BACK);townShape.lineTo(R,BACK);townShape.lineTo(R,C);
for(let i=0;i<=150;i++){const a=i/150*Math.PI;townShape.lineTo(R*Math.cos(a),C+R*Math.sin(a));}townShape.closePath();
// Explicit XZ polygon. Two-sided since the triangulation may select either winding.
const outline=townShape.extractPoints(12).shape;const flatVertices=[],faces=[];
for(const v of outline)flatVertices.push(v.x,.055,v.y);
for(let j=1;j<outline.length-1;j++)faces.push(0,j,j+1);
const floorGeo=new T.BufferGeometry();floorGeo.setAttribute('position',new T.Float32BufferAttribute(flatVertices,3));floorGeo.setIndex(faces);floorGeo.computeVertexNormals();
const cityGround=new T.Mesh(floorGeo,new T.MeshLambertMaterial({color:0x948a78,side:T.DoubleSide}));city.add(cityGround);
function road(x,z,w,d){add('road',x,.12,z,w,.16,d);add('roadDark',x-w/2,.18,z,.38,.2,d);add('roadDark',x+w/2,.18,z,.38,.2,d);}
road(0,(FRONT+BACK)/2,29,FRONT-BACK+16);
for(const xx of verticalStreets){if(xx===0)continue;
 const stop=C+Math.sqrt(Math.max(0,(R-19)**2-xx**2));
 const start=BACK+16;if(stop<=start)continue;
 road(xx,(start+stop)/2,11,stop-start);
}
for(const zz of horizontalStreets){
 const half=zz>C?Math.sqrt(Math.max(0,(R-21)**2-(zz-C)**2)):R-21;
 if(half<18)continue;
 road(0,zz,half*2,11);
}
// Central courtyard and two new neighborhood markets.
add('cobble',0,.23,-45*CITY_SCALE,81,.24,81);
add('stone1',0,.28,-45*CITY_SCALE,73,.17,73);
add('road',0,.31,-45*CITY_SCALE,68,.09,68);
for(const market of secondMarkets){
 add('cobble',market.x,.26,market.z,market.size*1.9,.22,market.size*1.9);
 add('stone1',market.x,.29,market.z,market.size*1.65,.12,market.size*1.65);
 add('road',market.x,.34,market.z,market.size*1.53,.08,market.size*1.53);
}
for(let i=0;i<750;i++){
 const x=r(-R,R),z=r(BACK,FRONT);if(!insideTown(x,z,16))continue;
 if(Math.abs(x)<16||horizontalStreets.some(p=>Math.abs(z-p)<8))continue;
 add(pick(['cobble','pavement','roadDark','road']),x,.17,z,r(1.2,3.1),.08,r(.8,1.8),r(-.08,.08));
}

// Eastern canal stays within the perimeter, and crosses the gridded streets.


const canalMid=(CANAL_START+CANAL_END)/2,canalLength=CANAL_END-CANAL_START;
add('stone2',CANAL_X,.29,canalMid,19,.35,canalLength);
add('water',CANAL_X,.5,canalMid,13,.18,canalLength-4);
add('stone1',CANAL_X-8,.8,canalMid,1.3,1.1,canalLength+4);
add('stone1',CANAL_X+8,.8,canalMid,1.3,1.1,canalLength+4);
for(const z of horizontalStreets.filter(z=>z>CANAL_START+10&&z<CANAL_END-10)){
 add('wood',CANAL_X,1.5,z,25,1.4,10);
 for(const x of [CANAL_X-12,CANAL_X+12])add('beam2',x,3,z,1,3.2,10);
}
// Reusable local-space building details. Everything enters instanced batches.
function house(x,z,w,d,levels=2,orientation=0,kind='home'){
 const wasAuto=autoSolids;autoSolids=false;
 const h=levels*r(5.1,6.1)+r(1,2.5),roofHeight=r(3.1,5.8);const wallType=pick(['plaster0','plaster0','plaster1','plaster2','plaster3','plaster4','plaster5']);const roofType=pick(['roof0','roof0','roof1','roof1','roof2','roof3','roof4','roof5']);let beamType=pick(['beam','beam2','beam3']);
 const yaw=orientation*Math.PI*.5,co=Math.cos(yaw),si=Math.sin(yaw);
 const local=(a,b)=>[x+a*co+b*si,z-a*si+b*co];
 function hb(type,dx,y,dz,ww,hh,dd,rz=0,tri=false){const [gx,gz]=local(dx,dz);add(type,gx,y,gz,ww,hh,dd,yaw,rz,tri)}
 hb(wallType,0,h/2,0,w,h,d);hb('stone2',0,0.65,0,w+.5,1.2,d+.5);
 hb(beamType,0,h*.47,-d/2-.13,w+.12,.34,.37);hb(beamType,0,h*.47,d/2+.13,w+.12,.34,.37);
 for(const side of [-1,1]){
   hb(beamType,side*w/2,h/2,-d/2-.20,.32,h,.5);
   hb(beamType,side*w/2,h/2,d/2+.20,.32,h,.5);
 }
 hb(beamType,0,h-.2,-d/2-.1,w+.25,.4,.4);hb(beamType,0,h-.2,d/2+.1,w+.25,.4,.4);
 // Sloping terracotta roof pitches: two thick planes with a central ridge.
 const over=1.0,slopeWidth=Math.sqrt((w/2+over)**2+(roofHeight+.5)**2),angle=Math.atan2(roofHeight+.5,w/2+over);
 hb(roofType,-w/4-.22,h+roofHeight/2-.05,0,slopeWidth,.55,d+2.0,angle);
 hb(roofType,w/4+.22,h+roofHeight/2-.05,0,slopeWidth,.55,d+2.0,-angle);
 hb('roof2',0,h+roofHeight,0,.8,.8,d+2.5);
 for(const zs of [-1,1]){hb(wallType,0,h,zs*d/2,w,roofHeight,1,0,true); // triangular gable height
   hb(beamType,0,h,zs*(d/2+.08),w+.3,.3,.25);
 }
 // Dark sash windows and shutters; use few high-contrast pieces at distance.
 const fullDetail=Math.hypot(x,z-C)<260||rand()<.35;
 const rows=fullDetail?levels:1,cols=fullDetail&&w>12?3:2;for(let j=0;j<rows;j++){
 const cy=fullDetail?(j+.54)*h/rows:h*.66;
 for(let k=0;k<cols;k++){
 const xx=(-.5+(k+.5)/cols)*w*.83;
 hb('beam',xx,cy,-d/2-.23,2.05,2.5,.25);
 hb('window',xx,cy,-d/2-.44,1.72,2.2,.18);
 hb('glass',xx,cy,-d/2-.55,1.30,1.6,.05);
 hb('beam',xx,cy,-d/2-.62,.12,1.9,.12);
 hb('beam',xx,cy,-d/2-.63,1.45,.12,.12);
 if(k===0||k===cols-1)hb('beam2',xx+(k===0?-1.17:1.17),cy,-d/2-.42,.45,2.4,.18);
 }
 }
 // Door and arched lintel.
 hb('beam',0,1.75,-d/2-.4,2.7,3.5,.3);hb('door',0,1.72,-d/2-.59,2.32,3.25,.2);
 hb('metal',.74,1.6,-d/2-.75,.12,.16,.13);hb('stone1',0,.28,-d/2-1.4,3.3,.36,2.8);
 // Roof tile ridges and chimney on selected houses.
 if(rand()<.73){let cz=r(-d*.2,d*.2),cx=(rand()<.5?-1:1)*w*.28;hb('stone3',cx,h+roofHeight*.84,cz,1.25,3.5,1.5);hb('stone2',cx,h+roofHeight*1.05+.3,cz,1.6,.4,1.8);}
 // Timber braces on exposed front panel.
 if(levels>1&&rand()<.63){for(let k of [-1,1])hb('beam2',k*w*.4,h*.28,-d/2-.2,.3,h*.55,.24,k*.22)}
 const cw=orientation%2?d:w,cd=orientation%2?w:d;autoSolids=wasAuto;footprints.push({x,z,w:cw+1,d:cd+1});solid({x,z,w:cw+1,d:cd+1,h,roofHeight,roofAxis:orientation%2?'z':'x'});homes++;
}

function warehouse(cx,cz,w=26,d=17,orientation=0){
 const wasAuto=autoSolids;autoSolids=false;
 const yaw=orientation*Math.PI*.5,co=Math.cos(yaw),si=Math.sin(yaw);
 const local=(a,b)=>[cx+a*co+b*si,cz-a*si+b*co];
 const part=(type,dx,y,dz,ww,hh,dd,rz=0,tri=false)=>{const[gx,gz]=local(dx,dz);add(type,gx,y,gz,ww,hh,dd,yaw,rz,tri)};
 const h=r(11,14),roofH=r(4.5,6.2),wallType=pick(['plaster4','plaster5','stone1']),roofType=pick(['roof2','roof4','roof5']);
 part(wallType,0,h/2,0,w,h,d);part('stone2',0,.8,0,w+.8,1.5,d+.8);
 part('beam',0,h*.50,-d/2-.16,w+.2,.36,.42);part('beam',0,h*.50,d/2+.16,w+.2,.36,.42);
 const slope=Math.sqrt((w/2+1.2)**2+(roofH+.5)**2),ang=Math.atan2(roofH+.5,w/2+1.2);
 part(roofType,-w/4-.25,h+roofH/2,0,slope,.72,d+2.0,ang);part(roofType,w/4+.25,h+roofH/2,0,slope,.72,d+2.0,-ang);part('roof2',0,h+roofH+.1,0,.95,.85,d+2.4);
 for(const zs of [-1,1])part(wallType,0,h,zs*d/2,w,roofH,1,0,true);
 for(let j=0;j<4;j++){let xx=-w*.34+j*w*.23;part('window',xx,h*.62,-d/2-.44,2.3,2.5,.2);part('beam',xx,h*.62,-d/2-.25,2.6,2.8,.2);} 
 part('door',0,2.6,-d/2-.62,5.0,5.1,.25);part('beam',0,2.75,-d/2-.42,5.5,5.6,.28);part('stone1',0,.36,-d/2-1.4,6.8,.45,3.1);
 autoSolids=wasAuto;const fw=(orientation%2?d:w)+1.5,fd=(orientation%2?w:d)+1.5;footprints.push({x:cx,z:cz,w:fw,d:fd});solid({x:cx,z:cz,w:fw,d:fd,h,roofHeight:roofH,roofAxis:orientation%2?'z':'x'});homes++;
}
// Smaller residences receive real roof-shape variants instead of overlapping houses.
function hipHouse(cx,cz,w=13,d=13,levels=2,orientation=0,style='home'){
 const wasAuto=autoSolids;autoSolids=false;
 const yaw=orientation*Math.PI*.5,co=Math.cos(yaw),si=Math.sin(yaw);
 const part=(t,dx,y,dz,ww,hh,dd,rz=0,shape=false)=>{const x=cx+dx*co+dz*si,z=cz-dx*si+dz*co;add(t,x,y,z,ww,hh,dd,yaw,rz,shape);};
 const h=levels*r(5.3,6.0)+2.3, roofRise=style==='tower'?6.2:4.2;
 const wall=style==='manor'?'formalWall':pick(['plaster0','plaster1','plaster3','plaster5']);
 const roof=style==='manor'?'roof2':style==='tower'?'slateRoof':pick(['roof1','roof3','roof4']);
 part(wall,0,h/2,0,w,h,d);part('stone2',0,.8,0,w+.5,1.6,d+.5);
 part('beam',0,h-.35,0,w+.45,.65,d+.45);part('stone3',0,h*.50,0,w+.28,.28,d+.28);
 for(const side of [-1,1])for(const f of [-1,1])part('beam',side*(w/2-.16),h/2,f*(d/2-.16),.32,h,.32);
 part(roof,0,h+roofRise/2-.10,0,w+2.1,roofRise,d+2.1,0,'hip');
 part('roof2',0,h-.16,0,w+2.6,.22,d+2.6);
 const columns=w>15?3:2;
 for(let floor=0;floor<levels;floor++){
  const py=3.15+floor*(h-3.4)/levels;
  for(let i=0;i<columns;i++){
   const xx=(i-(columns-1)/2)*w/(columns+0.15);
   part('window',xx,py,-d/2-.17,1.70,2.45,.15);part('glass',xx,py,-d/2-.31,1.35,2.0,.10);
   part('beam',xx,py,-d/2-.39,.10,2.12,.14);part('beam',xx,py,-d/2-.41,1.52,.12,.15);
   part('stone4',xx,py+1.35,-d/2-.38,2.04,.20,.24);
  }
  for(const side of [-1,1]){part('window',side*(w/2+.17),py,0,.18,2.5,1.5);}
 }
 part('door',0,1.9,-d/2-.24,2.9,3.8,.2);part('formalWhite',0,4.05,-d/2-.28,3.3,.35,.32);
 part('stone1',0,.24,-d/2-1.6,4.8,.5,3.5);
 if(style==='manor'){
  for(const side of [-1,1])part('formalWhite',side*2.2,2.7,-d/2-.52,.47,5,.50);
  part('formalWhite',0,5.2,-d/2-.43,6,.6,.9);
 }
 const ww=orientation%2?d:w,dd=orientation%2?w:d;autoSolids=wasAuto;footprints.push({x:cx,z:cz,w:ww+1,d:dd+1});solid({x:cx,z:cz,w:ww+1,d:dd+1,h,roofHeight:roofRise,roofShape:'hip'});homes++;
}
function towerHouse(cx,cz,w=10,d=12,orientation=0){hipHouse(cx,cz,w,d,3+Math.floor(rand()*2),orientation,'tower');}
function shopHouse(cx,cz,w=13,d=15,orientation=0){
 house(cx,cz,w,d,2+Math.floor(rand()*2),orientation,'shop');
 const yaw=orientation*Math.PI*.5,si=Math.sin(yaw),co=Math.cos(yaw);
 const fx=cx+(-d/2-2.0)*si,fz=cz+(-d/2-2.0)*co;
 add(pick(['stall0','stall1','roof1']),fx,4.1,fz,w*.69,.36,3.8,yaw);
 add('wood',fx,1.1,fz,w*.63,2.0,2.3,yaw);
 for(const side of [-1,1])add('beam2',fx+side*w*.31*co,2.2,fz-side*w*.31*si,.26,4.0,.26,yaw);
}
function manor(cx,cz,w=16,d=16,orientation=0){hipHouse(cx,cz,w,d,3,orientation,'manor');}
function districtBuilding(x,z){
 const edge=Math.abs(x)>R*.67||z<BACK+120||z>FRONT-150;
 const roll=rand(),orientation=rand()<.26?1:0;
 if(edge&&roll<.18)return warehouse(x,z,r(17,22),r(13,16),orientation);
 if(roll<.15)return shopHouse(x,z,r(11.5,14.5),r(12.8,15.5),orientation);
 if(roll<.28)return towerHouse(x,z,r(9,11.8),r(10,12.4),orientation);
 if(roll<.43)return hipHouse(x,z,r(11,15),r(12,16),rand()<.15?3:2,orientation,'home');
 if(roll<.49)return manor(x,z,r(14,17),r(13,16),orientation);
 return house(x,z,r(10.6,15.4),r(12.2,17.4),rand()<.22?3:2,orientation);
}
function longHall(cx,cz,w,d,h,roofType='roof2'){
 const wasAuto=autoSolids;autoSolids=false;
 add('stone1',cx,h/2,cz,w,h,d);add('stone2',cx,.8,cz,w+.9,1.6,d+.9);
 const roofH=Math.min(8,h*.52),slope=Math.sqrt((w/2+1.4)**2+(roofH+.7)**2),ang=Math.atan2(roofH+.7,w/2+1.4);
 add(roofType,cx-w/4-.25,h+roofH/2,cz,slope,.78,d+2.3,0,ang);add(roofType,cx+w/4+.25,h+roofH/2,cz,slope,.78,d+2.3,0,-ang);add('roof2',cx,h+roofH+.2,cz,.95,.8,d+2.5);
 autoSolids=wasAuto;footprints.push({x:cx,z:cz,w:w+1,d:d+1});solid({x:cx,z:cz,w:w+1,d:d+1,h,roofHeight:roofH});
}
// Formal military architecture. The roof geometry and elevations share a consistent datum.
function pitchedRoof(cx,cz,w,d,eave,raise,roof='slateRoof',dormers=false){
 const a=Math.atan2(raise,w/2+1.4),pitch=Math.hypot(raise,w/2+1.4);
 for(const side of [-1,1]){
  add(roof,cx+side*(w/4+.30),eave+raise/2,cz,pitch,.70,d+2.6,0,-side*a);
  add('slateLight',cx+side*(w/2+.68),eave+.2,cz,.32,.34,d+2.8);
 }
 add('formalDark',cx,eave+raise+.04,cz,.73,.54,d+3.3);
 for(const zz of [-1,1]){
  add('formalWall',cx,eave,cz+zz*d/2,w,raise,1.0,0,0,true);
  add('beam2',cx,eave+.4,cz+zz*(d/2+.65),w,.45,.25);
 }
 if(dormers){for(const side of [-1,1])for(const z of [-d*.29,0,d*.29]){
  const xx=cx+side*(w*.32),yy=eave+raise*.53;
  add('formalWall',xx,yy,z+cz,2.5,3.3,3.5);
  add('slateRoof',xx,yy+2.2,z+cz,3.5,2.6,4.3,0,0,'hip');
  add('window',xx,yy+.18,z+cz+side*.02,2.4,2.1,3.8);
 }}
}
function grandFacade(cx,cz,w,d,h,roof='slateRoof',floorCount=2,entry=false){
 const wasAuto=autoSolids;autoSolids=false;
 add('formalWall',cx,h/2,cz,w,h,d);
 add('formalDark',cx,.78,cz,w+1.1,1.56,d+1.1);
 add('formalWhite',cx,2.1,cz,w+.75,.34,d+.75);
 add('formalWhite',cx,h-.44,cz,w+1.25,.92,d+1.25);
 for(let f=1;f<floorCount;f++)add('formalWhite',cx,2.1+f*(h-2.7)/floorCount,cz,w+.72,.36,d+.72);
 for(const side of [-1,1]){
  add('formalWhite',cx+side*(w/2-.58),h/2,cz,.75,h+.35,d+.2);
  for(const z of [-d/2+2,d/2-2])add('formalDark',cx+side*(w/2-.27),h/2,cz+z,.20,h,.42);
 }
 const windows=Math.max(2,Math.floor((w-10)/5.7));
 for(let f=0;f<floorCount;f++){
  const wy=(f+.5)*(h-1.8)/floorCount+1.1;
  for(let j=0;j<windows;j++){
   const wx=cx+(j-(windows-1)/2)*(w-9.5)/Math.max(1,windows-1);
   if(entry&&f===0&&Math.abs(wx-cx)<5.5)continue;
   for(const sign of [-1,1]){
    const z=cz+sign*(d/2+.21);
    add('formalDark',wx,wy,z,2.48,3.45,.19);
    add('glass',wx,wy,z+sign*.20,1.98,2.83,.14);
    add('formalWhite',wx,wy,z+sign*.33,.11,3.03,.16);
    add('formalWhite',wx,wy,z+sign*.34,2.23,.13,.18);
    add('formalWhite',wx,wy+1.84,z+sign*.19,2.9,.28,.55);
    add('formalWhite',wx,wy-1.76,z+sign*.23,2.88,.25,.57);
   }
  }
  const sn=Math.max(1,Math.floor((d-8)/8));
  for(const side of [-1,1])for(let j=0;j<sn;j++){
   const zz=cz+(j-(sn-1)/2)*(d-8)/Math.max(1,sn-1);
   add('window',cx+side*(w/2+.2),wy,zz,.23,3.3,2.1);
   add('formalWhite',cx+side*(w/2+.39),wy+1.85,zz,.35,.26,2.85);
  }
 }
 pitchedRoof(cx,cz,w,d,h,Math.min(8,w*.18),roof,w>55);
 autoSolids=wasAuto;footprints.push({x:cx,z:cz,w:w+1,d:d+1});solid({x:cx,z:cz,w:w+1,d:d+1,h,roofHeight:Math.min(8,w*.18)});
}
function clockTex(){
 const can=document.createElement('canvas');can.width=256;can.height=256;const c=can.getContext('2d');
 c.fillStyle='#3c514e';c.fillRect(0,0,256,256);
 c.fillStyle='#e6d8b8';c.beginPath();c.arc(128,128,111,0,Math.PI*2);c.fill();
 c.strokeStyle='#514f42';c.lineWidth=8;c.beginPath();c.arc(128,128,101,0,Math.PI*2);c.stroke();
 for(let i=0;i<12;i++){let a=i*Math.PI/6-Math.PI/2;let x1=128+Math.cos(a)*77,y1=128+Math.sin(a)*77,x2=128+Math.cos(a)*92,y2=128+Math.sin(a)*92;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.lineWidth=i%3===0?6:3;c.stroke();}
 c.beginPath();c.moveTo(128,128);c.lineTo(128+Math.cos(-.9)*60,128+Math.sin(-.9)*60);c.lineWidth=6;c.stroke();
 c.beginPath();c.moveTo(128,128);c.lineTo(128+Math.cos(1.35)*44,128+Math.sin(1.35)*44);c.lineWidth=10;c.stroke();
 c.fillStyle='#514f42';c.beginPath();c.arc(128,128,7,0,Math.PI*2);c.fill();
 const tx=new T.CanvasTexture(can);tx.colorSpace=T.SRGBColorSpace;return tx;
}
const clockMaterial=new T.MeshBasicMaterial({map:clockTex(),side:T.DoubleSide});
function clockFace(x,y,z,size,ry=0){const m=new T.Mesh(new T.PlaneGeometry(size,size),clockMaterial);m.position.set(x,y,z);m.rotation.y=ry;city.add(m);}
function flagTexture(){
 const can=document.createElement('canvas');can.width=256;can.height=352;const g=can.getContext('2d');
 g.fillStyle='#1e4052';g.fillRect(0,0,256,352);g.fillStyle='#d3b77f';g.fillRect(9,8,238,3);g.fillRect(9,341,238,3);
 g.strokeStyle='#d3b77f';g.lineWidth=2;g.strokeRect(15,16,226,321);
 g.fillStyle='#f2ead4';g.beginPath();g.moveTo(128,53);g.lineTo(211,87);g.lineTo(198,209);g.lineTo(128,262);g.lineTo(58,209);g.lineTo(45,87);g.closePath();g.fill();
 g.fillStyle='#31576b';g.beginPath();g.moveTo(128,68);g.lineTo(197,96);g.lineTo(184,205);g.lineTo(128,245);g.lineTo(72,205);g.lineTo(59,96);g.closePath();g.fill();
 // Two layered wings, one ivory and one blue-gray: readable even at distant scale.
 for(const side of [-1,1]){
  const ox=128+side*7;g.fillStyle=side<0?'#eae4d5':'#83b1c8';
  for(let k=0;k<8;k++){
   const a=k/8,tx=ox+side*(22+k*6.3),by=92+k*15;
   g.beginPath();g.moveTo(ox,84+k*8);g.lineTo(tx,by);g.lineTo(tx-side*14,by+26);g.lineTo(ox,121+k*7);g.closePath();g.fill();
  }
 }
 g.fillStyle='#ead9a6';g.fillRect(122,65,12,185);g.fillRect(91,250,74,5);
 const t=new T.CanvasTexture(can);t.colorSpace=T.SRGBColorSpace;return t;
}
const flagMat=new T.MeshBasicMaterial({map:flagTexture(),side:T.DoubleSide,transparent:false});
function addBanner(x,y,z,height=24,ry=0){
 add('formalDark',x,y+height/2,z,.48,height,.48);
 add('bronze' in mat?'bronze':'metal',x,y+height+.35,z,.78,.78,.78);
 const flag=new T.Mesh(new T.PlaneGeometry(6.2,9.0),flagMat);
 flag.position.set(x+Math.cos(ry)*3.0,y+height-5,z-Math.sin(ry)*3.0);flag.rotation.y=ry;city.add(flag);
 add('formalWhite',x+Math.cos(ry)*3,y+height-.25,z-Math.sin(ry)*3,.12,.13,6.5,ry);
}
function plaque(x,y,z,w=6,h=8,ry=0){
 add('formalDark',x,y,z,w+.8,h+.8,.6,ry);
 const m=new T.Mesh(new T.PlaneGeometry(w,h),flagMat);m.position.set(x,y,z+.37);m.rotation.y=ry;city.add(m);
}
function gateArch(cx,cz,w=18,height=10){
 const gap=w*.57,side=(w-gap)/2;
 for(const sign of [-1,1]){
  add('formalDark',cx+sign*(gap/2+side/2),height/2,cz,side,height,3.6);
  add('formalWhite',cx+sign*(gap/2+side/2),height+.65,cz,side+.8,1.3,4.0);
 }
 add('formalWhite',cx,height+3,cz,w,3.8,4.3);
 add('slateRoof',cx,height+6,cz,w+1.6,2.6,6,0,0,'hip');
 add('formalDark',cx,height+2,cz-2.55,gap+2,1.6,.4);
}
function trainingGround(cx,cz){
 add('plazaStone',cx,.32,cz,77,.26,59);
 // Dedicated training court: regular lanes and target frames, not random street clutter.
 for(const z of [-24,-12,0,12,24])add('formalWhite',cx,.48,cz+z,67,.10,.23);
 for(const x of [-28,0,28])add('formalWhite',cx+x,.49,cz,.18,.10,49);
 for(const side of [-1,1])for(let j=0;j<3;j++){
  const x=cx+side*29,z=cz-19+j*18;
  add('beam2',x,3.5,z,.42,6.5,.42);
  add('wood',x,6.4,z,3.5,.36,.44);
  add('formalWall',x,4.8,z,2.6,1.4,.36);
 }
}
function barracksComplex(cx,cz){
 // One coherent compound: long main house, two side dormitories, open central court.
 add('plazaStone',cx,.20,cz-3,172,.30,143);
 trainingGround(cx,cz-17);
 grandFacade(cx,cz+34,102,31,20,'slateRoof',2,true);
 grandFacade(cx-67,cz-7,23,57,14,'slateRoof',2,false);
 grandFacade(cx+67,cz-7,23,57,14,'slateRoof',2,false);
 // Formal masonry portico, central entrance facing the training courtyard.
 for(const x of [-10,-6,6,10]){add('formalWhite',cx+x,4.8,cz+16.8,.82,8.8,.82);add('formalDark',cx+x,9.2,cz+16.8,1.35,.62,1.1);}
 add('formalWhite',cx,10.0,cz+16.8,23,1.1,7.3);add('formalDark',cx,5.0,cz+18.2,7.2,8.2,.32);
 for(let j=0;j<4;j++)add('formalWhite',cx,.30+j*.28,cz+13.0-j*1.1,18,.3,2.4);
 plaque(cx,15,cz+18.05,6.0,7.6,0);
 // Front boundary with a ceremonial gate. Corner structures are low and rectangular.
 for(const side of [-1,1]){
  add('formalDark',cx+side*58,3.2,cz-64,51,6,3.8);
  add('formalWhite',cx+side*82,3.0,cz-8,3.8,6,108);
  add('formalDark',cx+side*82,7,cz-64,10,13,10);
  add('slateRoof',cx+side*82,15,cz-64,12,4.0,12,0,0,'hip');
  addBanner(cx+side*28,1,cz-46,23,0);
 }
 gateArch(cx,cz-64,21,11);
 add('road',cx,.6,cz-47,11,.12,31);
 add('formalWhite',cx,1,cz+10,5,.25,14);
}
function warehouseQuarter(cx,cz){
 for(let row=-1;row<=1;row++)for(let col=-1;col<=1;col++){
  const ww=(row===0&&col===0)?28:22,dd=(row===0?14:12),ori=Math.abs(col)>Math.abs(row)?0:1;
  warehouse(cx+col*30,cz+row*22,ww,dd,ori);
 }
 for(let i=0;i<18;i++){const x=cx+r(-42,42),z=cz+r(-30,30);add(pick(['wood','beam2']),x,1.6,z,r(2.5,4.6),3.0,r(2.0,4.4),r(0,TAU));}
 addBanner(cx,1,cz-34,18,0);
}
function commandHall(cx,cz){
 // Main headquarters: the central clock tower emerges from a unified facade.
 add('plazaStone',cx,.23,cz,157,.32,136);
 // Symmetrical two-story wings flank the main entrance.
 grandFacade(cx,cz+20,86,36,23,'copperRoof',2,true);
 for(const side of [-1,1]){
  grandFacade(cx+side*51,cz+22,24,42,18,'copperRoof',2,false);
  add('formalWhite',cx+side*47,4,cz-8,4,8,4);
 }
 // Wide ceremonial staircase and entry pavilion: visually continuous with the main block.
 for(let i=0;i<5;i++)add('formalWhite',cx,.43+i*.32,cz-13-i*1.65,27-i*1.3,.26,1.95);
 for(const xx of [-13.0,-8.8,8.8,13.0]){
  add('formalWhite',cx+xx,7.6,cz-1.8,1.0,13.5,1.0);
  add('formalDark',cx+xx,14.5,cz-1.8,1.7,.56,1.65);
 }
 add('formalWhite',cx,15.1,cz-1.8,31.5,1.7,9.3);
 add('formalDark',cx,7.2,cz-2.6,9,12.6,.35);
 plaque(cx,18,cz+1.25,7.4,8.8,0);
 // Unified square masonry clock tower with restrained copper spire.
 const tz=cz+29;
 add('formalWall',cx,41,tz,18,82,18);
 for(const side of [-1,1])for(const yy of [28,41,51,64]){
  add('formalWhite',cx+side*9.2,yy,tz,.55,2.2,18.2);
  add('formalWhite',cx,yy,tz+side*9.2,18.2,2.2,.55);
 }
 for(const yy of [30,42])for(const side of [-1,1]){
  add('window',cx,yy,tz+side*9.35,3.2,6.2,.35);
  add('window',cx+side*9.35,yy,tz,.35,6.2,3.2);
 }
 add('formalDark',cx,66,tz,21,2.5,21);
 add('formalWhite',cx,74,tz,21,2.7,21);
 for(const face of [-1,1]){
  clockFace(cx,71.0,tz+face*9.60,10,face<0?Math.PI:0);
  clockFace(cx+face*9.60,71.0,tz,10,face*Math.PI/2);
 }
 // Roof tip at roughly 99 meters, deliberately taller than surrounding houses.
 add('copperRoof',cx,83.5,tz,23,17.0,23,0,0,'hip');
 add('metal',cx,94.0,tz,.65,6.0,.65);add('formalWhite',cx,97.2,tz,3.5,.6,.6);
 // Paved parade ground, gates, crests and measured banners.
 for(const side of [-1,1]){
  addBanner(cx+side*53,1,cz-47,25,0);
  add('formalWhite',cx+side*52,2.5,cz-48,3.5,5.0,3.5);
 }
 add('road',cx,.60,cz-40,16,.15,44);
}
// Landmark footprints, kept empty BEFORE houses are generated.
const landmarkLots=[
 {name:'兵団兵舎',x:-270,z:-222,rx:94,rz:89},
 {name:'司令棟',x:165,z:247,rx:91,rz:82},
 {name:'東倉庫街',x:370,z:-318,rx:57,rz:49},
 {name:'西倉庫街',x:-406,z:-350,rx:57,rz:49}
];

// Fivefold+ buildable area, with grid lanes, courtyards and small neighborhood plazas.
function clearLot(x,z,margin=0){
 if(Math.abs(x)<72+margin&&z>-62-margin&&z<112+margin)return false;
 if(Math.hypot(x-220,z+180)<47+margin)return false;
 if(Math.abs(x+20)<21+margin&&Math.abs(z-146)<21+margin)return false;
 if(Math.abs(x+270)<19+margin&&Math.abs(z+160)<18+margin)return false;
 if(Math.abs(x-260)<19+margin&&Math.abs(z-150)<18+margin)return false;
 if(!insideTown(x,z,28+margin))return false;
 if(landmarkLots.some(l=>Math.abs(x-l.x)<l.rx+margin+11&&Math.abs(z-l.z)<l.rz+margin+11))return false;
 if(verticalStreets.some(s=>Math.abs(x-s)<17+margin))return false;
 if(horizontalStreets.some(s=>Math.abs(z-s)<16+margin))return false;
 if(Math.abs(x)<25+margin)return false;
 if(Math.abs(x)<56+margin&&Math.abs(z+45*CITY_SCALE)<55+margin)return false;
 if(Math.abs(x-49*CITY_SCALE)<34+margin&&Math.abs(z+44*CITY_SCALE)<44+margin)return false;
 if(secondMarkets.some(s=>Math.abs(x-s.x)<s.size+10+margin&&Math.abs(z-s.z)<s.size+10+margin))return false;
 if(Math.abs(x-CANAL_X)<24+margin&&z>CANAL_START-10-margin&&z<CANAL_END+10+margin)return false;
 if(Math.abs(x+151*CITY_SCALE)<22+margin&&Math.abs(z-52*CITY_SCALE)<23+margin)return false;
 if(Math.abs(x-123*CITY_SCALE)<22+margin&&Math.abs(z+114*CITY_SCALE)<23+margin)return false;
 return true;
}
for(let z=BACK+27;z<FRONT-28;z+=22.7){for(let x=-R+30;x<R-25;x+=22.3){
 const xx=x+r(-2.0,2.0),zz=z+r(-1.8,1.8);
 if(!clearLot(xx,zz))continue;
 if(rand()<.07)continue;
 districtBuilding(xx,zz);
}}
// Small cottages naturally fill gaps along the winding arc.
for(let k=0;k<450;k++){
 const x=r(-R+28,R-28),z=r(BACK+27,FRONT-25);
 if(!clearLot(x,z,3))continue;
 if(footprints.some(c=>Math.abs(c.x-x)<(c.w+10)*.5&&Math.abs(c.z-z)<(c.d+11)*.5))continue;
 rand()<.45?districtBuilding(x,z):house(x,z,r(7.5,10.4),r(9.4,12.4),rand()<.3?3:2,rand()<.5?1:0);
}

// District-scale landmarks: regiment barracks, command hall and warehouse quarter.
barracksComplex(landmarkLots[0].x,landmarkLots[0].z);
commandHall(landmarkLots[1].x,landmarkLots[1].z);
warehouseQuarter(landmarkLots[2].x,landmarkLots[2].z);
warehouseQuarter(landmarkLots[3].x,landmarkLots[3].z);
for(const l of landmarkLots){add('cobble',l.x,.25,l.z,l.rx*1.6,.2,l.rz*1.65);}
// Gate-side defense details and banners.
for(const [x,z,ry] of [[0,FRONT-26,Math.PI],[0,BACK+18,0],[R-18,C+52,-Math.PI/2],[-R+18,C+52,Math.PI/2]]){
 addBanner(x,1,z,22,ry);
}
for(const [x,z] of [[0,FRONT-36],[0,BACK+34],[R-30,C+82],[-R+30,C+82]]){
 add('wood',x,2.2,z,6,4,6);add('beam2',x,5.0,z,8,.35,8,r(0,TAU));add('stone2',x,0.7,z,9,1.4,9);
}

// Central chapel / citadel. Its taller clock tower is a visual compass.
function church(cx,cz){
 add('stone1',cx,11,cz,24,22,43);add('stone2',cx,1,cz,27,2,47);
 const rise=11,roofLen=Math.hypot(13.5,rise),ang=Math.atan2(rise,13.5);
 for(const s of [-1,1])add('roof2',cx+s*6.75,27.5,cz,roofLen,.72,46,0,-s*ang);
 add('stone4',cx,20,cz-22,24,rise,1.2,0,0,true);
 for(let d of [-1,1])for(let j=0;j<4;j++)add('window',cx+d*12.1,9+j*3.5,cz-16,0.25,1.8,2.5);
 add('stone2',cx,27,cz-19,13,55,13);add('stone4',cx,56,cz-19,15,5,15);
 for(let i=0;i<4;i++){let off=(i-1.5)*3.1;add('window',cx+off,49,cz-25.8,2,7,.3);add('beam',cx+off,49,cz-26.04,.16,7.5,.2)}
 solid({x:cx,z:cz,w:26,d:46,h:22,roofHeight:11});solid({x:cx,z:cz-19,w:15.5,d:15.5,h:59,roofHeight:18,roofShape:'hip'});
 const roof=new T.Mesh(new T.ConeGeometry(11,18,4),mat.roof1);roof.position.set(cx,68,cz-19);roof.rotation.y=Math.PI/4;city.add(roof);targets.push(roof);
 add('metal',cx,80,cz-19,.7,7,.7);add('metal',cx,82.7,cz-19,4,.6,.6);
 for(let k=0;k<3;k++)add('stone3',cx,6+k*6,cz-22.9,2,4,.3);
}
church(49*CITY_SCALE,-44*CITY_SCALE);
// Fountain and square market furniture.
for(let s=0;s<14;s++){const a=s*TAU/14;let x=-12+9*Math.cos(a),z=-45*CITY_SCALE+9*Math.sin(a);add('stone2',x,1,z,4,1.9,2.2,-a);}
add('stone1',-12,1.1,-45*CITY_SCALE,13,1.5,13);add('water',-12,2,-45*CITY_SCALE,10,.45,10);add('stone4',-12,4.8,-45*CITY_SCALE,2.2,7,2.2);add('stone2',-12,8,-45*CITY_SCALE,5,.8,5);
for(const [sx,sz] of [[-25,-25],[18,-23],[-25,-72],[20,-72]].map(([x,z])=>[x,z-45*(CITY_SCALE-1)])){
 for(let c of [-1,1]){add('wood',sx+c*3,2.3,sz,0.5,4.6,.5);add('wood',sx+c*3,2.3,sz+4,.5,4.6,.5)}
 add(pick(['stall0','stall1','roof1']),sx,5.2,sz+2,8,.35,7);add('wood',sx,1,sz+2,7.1,2,4.5);
}
// Two new market quarters contain wells, awnings and trading stalls.
for(const market of secondMarkets){
 const {x,z}=market;
 add('stone1',x,1.1,z,10,1.5,10);add('water',x,1.9,z,7.5,.34,7.5);add('stone4',x,4,z,1.6,5,1.6);
 for(let a=0;a<8;a++){
  const t=a*Math.PI*2/8,xs=x+Math.cos(t)*30,zs=z+Math.sin(t)*30;
  add('wood',xs-3,2.6,zs,.5,5.2,.5);add('wood',xs+3,2.6,zs,.5,5.2,.5);
  add(pick(['stall0','stall1','roof1']),xs,5.4,zs,8,.45,6);
  add('wood',xs,1.05,zs,7.2,2.1,4.4);
 }
}
// A smaller barracks watchtower at the riverbank.
for(const [tx,tz] of [[-151*CITY_SCALE,52*CITY_SCALE],[123*CITY_SCALE,-114*CITY_SCALE]]){
 add('stone0',tx,18,tz,15,36,15);add('stone4',tx,37,tz,18,3,18);
 for(let i=0;i<4;i++){const a=i*TAU/4;add('stone1',tx+7.3*Math.cos(a),41,tz+7.3*Math.sin(a),4.2,6,4.2)}
 const cone=new T.Mesh(new T.ConeGeometry(13,15,4),mat.roof2);cone.position.set(tx,50,tz);cone.rotation.y=Math.PI/4;city.add(cone);targets.push(cone);solid({x:tx,z:tz,w:18.4,d:18.4,h:42.5,roofHeight:15,roofShape:'hip'});
 for(let h of [14,25])add('window',tx, h,tz+7.7,2,5,.25);
}
// Street furniture and sparse foliage inside the new perimeter.
for(let i=0;i<175;i++){
 const z=r(BACK+25,FRONT-25),x=pick(verticalStreets.filter(v=>v!==0).map(v=>v+(rand()<.5?-10:10)));
 if(!insideTown(x,z,24))continue;
 add('wood',x,3.25,z,.44,6.4,.44);add('metal',x,6.6,z,2.2,.6,2.2);add('stall0',x,6.3,z,1.5,1.1,1.5);
}
function tree(x,z,s=1){if(Math.abs(x)<535&&Math.abs(z)<535){solid({x,z,w:.9*s,d:.9*s,h:4.8*s});const trunk=ownedColliders[ownedColliders.length-1];trunk.radius=trunk.radiusTop=.45*s;}add('trunk',x,2.4*s,z,.9*s,4.8*s,.9*s);for(let j=0;j<3;j++){
 const radius=(4.5-j*.75)*s,height=(9-j)*s;add(pick(['foliage0','foliage1','foliage2']),x,(7.5+j*3.8)*s,z,radius,height,radius,r(0,TAU),0,'cone');
}}
for(let i=0;i<350;i++){
 let a=r(0,TAU),rr=r(R+38,R+310),x=Math.cos(a)*rr,z=Math.sin(a)*rr+C;
 if(rand()<.60)tree(x,z,r(.7,1.5));
}
for(let i=0;i<135;i++){
 let x=r(-R+35,R-35),z=r(BACK+35,FRONT-35);
 if(!clearLot(x,z,2))continue;
 if(footprints.some(c=>Math.abs(c.x-x)<c.w/2+5&&Math.abs(c.z-z)<c.d/2+5))continue;
 tree(x,z,r(.55,.95));
}
// Surrounding mountain silhouettes and drifting cloud banks.
for(let i=0;i<44;i++){
 const a=i/44*TAU,rr=r(1420,1870),x=Math.cos(a)*rr,z=Math.sin(a)*rr+C;
 const radius=r(100,260),height=r(90,240);
 add(pick(['stone2','foliage1','stone3']),x,36,z,radius,height,radius,r(0,TAU),0,'cone');
}
const clouds=[];
for(let i=0;i<21;i++){
 let a=r(0,TAU),rr=r(860,1560),bx=Math.cos(a)*rr,bz=Math.sin(a)*rr+C;
 for(let j=0;j<4;j++){
  const g=new T.Mesh(new T.DodecahedronGeometry(r(18,36),0),mat.cloud);
  g.scale.set(r(1.5,3),r(.28,.52),r(.8,1.5));g.position.set(bx+j*21,165+r(-8,8),bz+r(-9,9));city.add(g);clouds.push(g);
 }
}
flush();

 city.traverse(object=>{object.userData.cityOnly=true;if(object.isMesh){object.castShadow=true;object.receiveShadow=true;}});
 const renderMeshes=[];city.traverse(object=>{if(object.isMesh)renderMeshes.push(object);});
 const landmarks=Object.freeze({square:{x:0,z:-117},barracks:{x:-270,z:-222},command:{x:165,z:247},clock:{x:165,z:276,height:97},church:{x:127.4,z:-114.4},eastMarket:{x:247,z:-267},westMarket:{x:-259,z:117},warehouse:{x:370,z:-318},canal:{x:CANAL_X,z:(CANAL_START+CANAL_END)/2},supply:{x:-20,z:146},barracksSupply:{x:-270,z:-160},marketSupply:{x:260,z:150}});
 function setVisible(visible){city.visible=visible;for(const mesh of renderMeshes)mesh.visible=visible;}
 return {root:city,landmarks,setVisible,inspect:()=>({buildingCount:homes,instances,batches,colliderCount:ownedColliders.length,landmarks,visible:city.visible}),colliders:ownedColliders};
}
