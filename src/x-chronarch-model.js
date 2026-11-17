import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// CHRONARCH is a suspended clock, not a scaled-up soldier. Geometry/materials
// are immutable shared assets; every run owns only transforms and mesh objects.
const TAU=Math.PI*2;
const steel=new T.MeshStandardMaterial({color:0x29283f,metalness:.72,roughness:.4});
const shadow=new T.MeshStandardMaterial({color:0x111827,metalness:.55,roughness:.5});
const ivory=new T.MeshStandardMaterial({color:0xf4e6d4,metalness:.48,roughness:.34,emissive:0x786953,emissiveIntensity:.12});
const gold=new T.MeshStandardMaterial({color:0xe2b66f,metalness:.72,roughness:.26,emissive:0xc98b32,emissiveIntensity:.28});
const pink=new T.MeshBasicMaterial({color:0xff74ce});
const dormantPink=new T.MeshStandardMaterial({color:0x65345f,metalness:.45,roughness:.4,emissive:0x4e164a,emissiveIntensity:.3});
const pale=new T.MeshBasicMaterial({color:0xffeed5});
const glowGold=new T.MeshBasicMaterial({color:0xffd693});
const hitMaterial=new T.MeshBasicMaterial({color:0xfff9ef,transparent:true,opacity:.72,depthWrite:false});

function transformed(geo,x=0,y=0,z=0,rx=0,ry=0,rz=0){
 const pose=new T.Object3D();pose.position.set(x,y,z);pose.rotation.set(rx,ry,rz);pose.updateMatrix();return geo.applyMatrix4(pose.matrix);
}
function merge(parts){const normalized=parts.map(p=>p.index?p.toNonIndexed():p);const result=mergeGeometries(normalized,false);for(const p of new Set([...parts,...normalized]))p.dispose();return result;}
function slab(x,y,z,w,h,d,rz=0){return transformed(new T.BoxGeometry(w,h,d),x,y,z,0,0,rz);}
function polygon(points,depth,z=0){
 const shape=new T.Shape();points.forEach(([x,y],i)=>i?shape.lineTo(x,y):shape.moveTo(x,y));shape.closePath();
 return new T.ExtrudeGeometry(shape,{depth,steps:1,bevelEnabled:false}).translate(0,0,z);
}

const bodyGeometry=merge([
 transformed(new T.CylinderGeometry(1.45,1.66,.5,12),0,0,-.16,Math.PI/2),
 transformed(new T.ConeGeometry(.54,1.6,6),0,-1.95,-.15,Math.PI),
 slab(0,-1.45,-.12,.22,1.15,.32),
 slab(-.9,-1.5,-.1,.12,.9,.19,-.22),slab(.9,-1.5,-.1,.12,.9,.19,.22),
]);
const rimGeometry=merge([
 transformed(new T.TorusGeometry(1.5,.075,4,48),0,0,.15),
 transformed(new T.TorusGeometry(.86,.045,4,32),0,0,.46),
 slab(-.44,0,.51,.045,1.55,.08),slab(.44,0,.51,.045,1.55,.08),
 slab(0,-2.62,-.14,.16,.22,.2),
]);
const backGeometry=merge([
 transformed(new T.CylinderGeometry(1.22,1.22,.15,12),0,0,-.5,Math.PI/2),
 slab(0,-1.45,-.27,.32,1.15,.28),
]);
const petalGeometry=polygon([[-.24,-.23],[-.43,.42],[-.26,.97],[0,1.18],[.26,.97],[.43,.42],[.24,-.23]],.16);
const petalFaceGeometry=polygon([[-.1,-.08],[-.25,.46],[-.16,.87],[0,1.01],[.16,.87],[.25,.46],[.1,-.08]],.025,.172);
const petalEdgeGeometry=merge([
 slab(-.29,.39,.208,.034,.55,.028,.23),slab(.29,.39,.208,.034,.55,.028,-.23),
 slab(0,.73,.208,.045,.24,.035),
]);
const hourglassGeometry=merge([
 transformed(new T.CylinderGeometry(.52,.055,.73,6),0,.365,0),
 transformed(new T.CylinderGeometry(.055,.52,.73,6),0,-.365,0),
 transformed(new T.OctahedronGeometry(.18,0)),
]);
const handGeometry=polygon([[-.06,-.19],[-.12,.1],[-.055,1.49],[0,1.86],[.055,1.49],[.12,.1],[.06,-.19]],.035);
const shortHandGeometry=polygon([[-.09,-.2],[-.14,.08],[-.09,.93],[0,1.26],[.09,.93],[.14,.08],[.09,-.2]],.05);
const ringGeometries=[
 new T.TorusGeometry(2.03,.036,4,64),
 new T.TorusGeometry(2.4,.027,4,72),
 new T.TorusGeometry(2.76,.025,4,80),
];
const tickGeometry=new T.BoxGeometry(1,1,1);
const pinGeometry=new T.OctahedronGeometry(.12,0);
const waistGeometry=new T.TorusGeometry(.23,.033,4,24);
const hitGeometry=new T.TorusGeometry(.94,.045,4,40);
const pose=new T.Object3D();

function mesh(parent,geometry,material,name){const m=new T.Mesh(geometry,material);m.name=name;parent.add(m);return m;}
function instances(parent,geometry,material,count,name){const m=new T.InstancedMesh(geometry,material,count);m.name=name;m.instanceMatrix.setUsage(T.DynamicDrawUsage);m.frustumCulled=false;parent.add(m);return m;}
function setPose(batch,i,x,y,z,sx,sy,sz,rx=0,ry=0,rz=0){pose.position.set(x,y,z);pose.rotation.set(rx,ry,rz);pose.scale.set(sx,sy,sz);pose.updateMatrix();batch.setMatrixAt(i,pose.matrix);}
function modelStats(root,kind){
 let draws=0,triangles=0;root.traverse(o=>{if(!o.isMesh)return;for(let p=o;p;p=p.parent)if(!p.visible)return;draws++;triangles+=(o.geometry.index?o.geometry.index.count:o.geometry.attributes.position.count)/3*(o.isInstancedMesh?o.count:1);});
 return {kind,draws,triangles,sharedAssets:true};
}

export function createChronarchModel(){
 const root=new T.Group();root.name='CHRONARCH / clockwork sovereign';
 mesh(root,backGeometry,shadow,'recessed clock body');
 mesh(root,bodyGeometry,steel,'faceted housing and suspended anchor');
 mesh(root,rimGeometry,gold,'clock rim and crystal rails');
 const core=mesh(root,hourglassGeometry,pink,'exposed hourglass core');core.position.z=.66;
 const waist=mesh(root,waistGeometry,pale,'core waist');waist.position.z=.67;waist.rotation.x=Math.PI/2;
 const shell=instances(root,petalGeometry,steel,8,'eight opening armor petals');
 const faces=instances(root,petalFaceGeometry,ivory,8,'ivory petal faces');
 const edges=instances(root,petalEdgeGeometry,gold,8,'gold petal inlays');
 const rings=ringGeometries.map((g,i)=>mesh(root,g,i===1?ivory:gold,'gyroscope '+i));
 const ticks=instances(root,tickGeometry,glowGold,48,'forty-eight minute indices');
 const longHand=mesh(root,handGeometry,ivory,'minute blade');longHand.position.z=.92;
 const shortHand=mesh(root,shortHandGeometry,gold,'hour blade');shortHand.position.z=.99;
 const pin=mesh(root,pinGeometry,pale,'clock spindle');pin.position.z=1.05;
 const flash=mesh(root,hitGeometry,hitMaterial,'impact circumference');flash.position.z=.91;flash.visible=false;
 const satellites=instances(root,pinGeometry,glowGold,4,'gyroscope pivots');
 let elapsed=0,opening=0,lastPhase=0,lastSealed=true;
 function update(dt,{phase=0,sealed=true,flash:hit=0,windup=0,breaking=false,reduced=false,low=false}={}){
  const delta=Number.isFinite(dt)?Math.max(0,dt):0;elapsed+=delta;phase=T.MathUtils.clamp(Math.floor(phase),0,2);lastPhase=phase;lastSealed=!!sealed;
  opening=T.MathUtils.damp(opening,sealed?0:1,reduced?10:5,delta);const t=elapsed;
  const float=reduced?0:Math.sin(t*1.45)*.045;
  for(let i=0;i<8;i++){
   const a=i*TAU/8,r=.71+opening*.47,z=.35-opening*.35+(i%2)*.018;
   const rz=-a+(i%2?1:-1)*opening*.1;
   for(const batch of [shell,faces,edges])setPose(batch,i,Math.sin(a)*r,Math.cos(a)*r+float,z,1,1,1,opening*.16*Math.cos(a),opening*.16*Math.sin(a),rz);
  }
  for(const batch of [shell,faces,edges])batch.instanceMatrix.needsUpdate=true;
  rings[0].rotation.set(.1+opening*.24,Math.sin(t*.23)*.12, reduced?0:t*.12);
  rings[1].rotation.set(.5+phase*.17+Math.sin(t*.17)*.08,.85+opening*.35,reduced?.3:-t*.16);
  rings[2].rotation.set(-.25-phase*.12,.25+Math.sin(t*.2)*.18,reduced?0:t*.075);
  // Minute indices stay in a readable clock plane rather than following all
  // three gyroscopes. They are one instanced draw even during phase changes.
  for(let i=0;i<48;i++){const a=i*TAU/48+(reduced?0:t*.075),major=i%4===0;setPose(ticks,i,Math.sin(a)*2.76,Math.cos(a)*2.76,0,major?.065:.028,major?.23:.1,.045,0,0,-a);}
  ticks.instanceMatrix.needsUpdate=true;ticks.count=low?0:48;
  const rush=windup>0?T.MathUtils.clamp(windup,0,1):0;
  longHand.rotation.z=reduced?-.8:(sealed?-t*.52:t*.72)-.8+phase*.35+rush*.9;
  shortHand.rotation.z=reduced?1.1:(sealed?t*.17:-t*.3)+1.1-rush*.4;
  const size=(sealed?.76:1.12)*(1+(reduced?0:Math.sin(t*3.8)*.035)+(hit>0?.1:0));core.material=sealed?dormantPink:pink;core.scale.setScalar(size);core.rotation.y=reduced?0:t*.25;core.position.y=float;
  waist.scale.setScalar(sealed?.85:1.05);waist.rotation.z=reduced?0:t*.4;
  for(let i=0;i<4;i++){const a=i*TAU/4+(reduced?0:t*.075);setPose(satellites,i,Math.sin(a)*2.76,Math.cos(a)*2.76,0,1,1,1,0,0,a);}
  satellites.instanceMatrix.needsUpdate=true;
  flash.visible=hit>0;flash.scale.setScalar(1+Math.max(0,hit)*.3);pin.scale.setScalar(1+rush*.6+(breaking?.15:0));
 }
 function reset(){elapsed=0;opening=0;lastPhase=0;lastSealed=true;update(0,{phase:0,sealed:true,flash:0});}
 reset();
 return {root,core,update,reset,stats:()=>({...modelStats(root,'chronarch'),phase:lastPhase,sealed:lastSealed,opening})};
}

const sealShellGeometry=merge([
 transformed(new T.CylinderGeometry(.57,.57,.05,6),0,.65,0),
 transformed(new T.CylinderGeometry(.57,.57,.05,6),0,-.65,0),
 ...Array.from({length:4},(_,i)=>{const a=i*TAU/4+Math.PI/4;return slab(Math.cos(a)*.43,0,Math.sin(a)*.43,.045,1.3,.045);}),
]);
const sealCoreGeometry=hourglassGeometry.clone().scale(.58,.76,.58);
const sealRingGeometry=new T.TorusGeometry(.74,.025,4,32);
const sealHandGeometry=merge([slab(0,.17,.37,.025,.34,.025),slab(.1,.02,.37,.23,.025,.025,.35)]);
const sealFlashGeometry=new T.OctahedronGeometry(.48,0);

export function createChronoSealModel(){
 const root=new T.Group();root.name='CHRONARCH / breakable time seal';
 mesh(root,sealShellGeometry,gold,'hourglass cage');
 const core=mesh(root,sealCoreGeometry,pale,'stolen-time crystal');
 const first=mesh(root,sealRingGeometry,gold,'seal orbit');first.rotation.x=.65;
 const second=mesh(root,sealRingGeometry,pink,'seal counter-orbit');second.rotation.y=.7;
 const hands=mesh(root,sealHandGeometry,pale,'seal clock hands');
 const flash=mesh(root,sealFlashGeometry,hitMaterial,'seal impact');flash.visible=false;
 let elapsed=0;
 function update(dt,{flash:hit=0,reduced=false,breaking=false}={}){
  elapsed+=Number.isFinite(dt)?Math.max(0,dt):0;const t=elapsed;
  first.rotation.z=reduced?.15:t*.45;second.rotation.z=reduced?-.3:-t*.32;second.rotation.x=.1+Math.sin(t*.25)*.1;
  core.rotation.y=reduced?0:t*.32;core.scale.setScalar(1+(reduced?0:Math.sin(t*3)*.04));hands.rotation.z=reduced?.3:t*.24;
  flash.visible=hit>0;flash.scale.setScalar(breaking?1.1:1);
 }
 function reset(){elapsed=0;update(0,{flash:0});}
 reset();
 return {root,core,update,reset,stats:()=>modelStats(root,'chrono-seal')};
}
