import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

const TAU=Math.PI*2,clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const unitBox=new T.BoxGeometry(1,1,1),unitCylinder=new T.CylinderGeometry(1,1,1,8,1);
const ringGeometry=new T.TorusGeometry(1,.035,5,32),energyGeometry=new T.OctahedronGeometry(1,0);
const Z=new T.Vector3(0,0,1),UP=new T.Vector3(0,1,0);

// The arm is a left-handed mechanical catcher. Every moving part is a rigid
// assembly; fixed pieces are merged by material to keep the model inexpensive.
export function createKineticArmVisuals({scene,camera}){
 const root=new T.Group();root.name='KINETIC / interceptor gauntlet';root.visible=false;camera.add(root);
 const effects=new T.Group();effects.name='KINETIC / pooled energy';scene.add(effects);
 const armor=new T.MeshStandardMaterial({color:0x152a32,metalness:.65,roughness:.4});
 const dark=new T.MeshStandardMaterial({color:0x06131b,metalness:.35,roughness:.7});
 const steel=new T.MeshStandardMaterial({color:0x64858c,metalness:.8,roughness:.26});
 const ceramic=new T.MeshStandardMaterial({color:0xd3ddd5,metalness:.22,roughness:.52});
 const trim=new T.MeshStandardMaterial({color:0xd2a66a,metalness:.65,roughness:.32});
 const energy=new T.MeshStandardMaterial({color:0x8affe4,emissive:0x68f7d2,emissiveIntensity:1.6,metalness:.2,roughness:.25});
 const owned=[],fingers=[],cells=[];let phase=0,impact=0,releaseKick=0,nextSlot=0,active=false;
 function mesh(parent,geo,material,x=0,y=0,z=0){const m=new T.Mesh(geo,material);m.position.set(x,y,z);parent.add(m);return m;}
 function box(parent,x,y,z,w,h,d,material,rx=0,ry=0,rz=0){const m=mesh(parent,unitBox,material,x,y,z);m.scale.set(w,h,d);m.rotation.set(rx,ry,rz);return m;}
 function cylinder(parent,x,y,z,r,h,material,rx=0){const m=mesh(parent,unitCylinder,material,x,y,z);m.scale.set(r,h,r);m.rotation.x=rx;return m;}
 function ring(parent,x,y,z,r,material,rx=0,ry=0,rz=0){const m=mesh(parent,ringGeometry,material,x,y,z);m.scale.setScalar(r);m.rotation.set(rx,ry,rz);return m;}
 function batch(group){
  const bins=new Map();for(const child of [...group.children]){if(!child.isMesh)continue;child.updateMatrix();let g=child.geometry.clone().applyMatrix4(child.matrix);if(g.index){const flat=g.toNonIndexed();g.dispose();g=flat;}const list=bins.get(child.material)||[];list.push(g);bins.set(child.material,list);group.remove(child);}
  for(const [material,list] of bins){const geo=mergeGeometries(list,false);owned.push(geo);group.add(new T.Mesh(geo,material));for(const g of list)g.dispose();}
 }
 const shell=new T.Group();root.add(shell);
 // Forearm, wrist coupling and a stepped dorsal shell.
 box(shell,-.035,-.13,.09,.27,.22,.59,dark,-.06,0,-.03);
 box(shell,-.04,-.052,-.035,.31,.15,.49,armor,.07,0,0);
 box(shell,-.04,.032,.11,.28,.045,.25,ceramic,.08,0,0);
 box(shell,-.04,.03,-.13,.25,.05,.15,steel,-.14,0,0);
 for(const side of [-1,1]){
  box(shell,side*.15,-.07,.05,.035,.16,.43,armor);
  box(shell,side*.17,-.03,-.05,.028,.045,.25,ceramic);
  box(shell,side*.17,-.074,-.05,.015,.016,.2,trim);
  box(shell,side*.1,.061,.15,.035,.012,.18,dark);
  box(shell,side*.098,.066,.15,.012,.013,.115,trim);
 }
 cylinder(shell,-.035,-.12,.31,.155,.055,steel,Math.PI/2);
 cylinder(shell,-.035,-.12,.35,.145,.08,armor,Math.PI/2);
 cylinder(shell,-.035,-.12,.402,.133,.018,ceramic,Math.PI/2);
 // The aperture has a ceramic octagonal pressure collar and six storage sockets.
 cylinder(shell,0,.04,-.22,.205,.085,armor,Math.PI/2);
 cylinder(shell,0,.04,-.268,.19,.022,ceramic,Math.PI/2);
 cylinder(shell,0,.04,-.283,.157,.018,dark,Math.PI/2);
 for(let i=0;i<6;i++){
  const a=i*TAU/6,x=Math.sin(a)*.17,y=.04+Math.cos(a)*.17;
  box(shell,x,y,-.291,.032,.06,.02,dark,0,0,-a);
  const cell=box(root,x,y,-.307,.017,.04,.018,energy,0,0,-a);cell.visible=false;cells.push(cell);
 }
 for(const side of [-1,1])for(const z of [-.17,.2])cylinder(shell,side*.13,.047,z,.017,.014,steel);
 // Functional caution bars mark the knuckle/wrist edges without tiny decoration.
 for(let i=0;i<3;i++)box(shell,.06+i*.025,.071,.1,.012,.008,.055,trim,0,0,-.25);
 batch(shell);
 const aperture=new T.Group();aperture.position.set(0,.04,-.322);root.add(aperture);
 const outerRing=ring(aperture,0,0,0,.146,steel),innerRing=ring(aperture,0,0,-.012,.117,energy);
 const nucleus=mesh(aperture,energyGeometry,energy,0,0,-.025);nucleus.scale.set(.038,.038,.065);
 const spindle=ring(aperture,0,0,-.024,.08,trim,Math.PI*.26,0,.3);
 // Three double-jointed capture claws cradle the energy instead of blocking it.
 for(let i=0;i<3;i++){
  const a=i*TAU/3+.18,hinge=new T.Group();hinge.position.set(Math.sin(a)*.17,.04+Math.cos(a)*.17,-.255);hinge.rotation.z=-a;root.add(hinge);
  const upper=new T.Group();hinge.add(upper);box(upper,0,0,-.069,.066,.065,.17,armor);box(upper,0,.038,-.065,.052,.02,.123,ceramic);batch(upper);
  const tip=new T.Group();tip.position.z=-.143;hinge.add(tip);box(tip,0,-.012,-.052,.052,.055,.13,armor,.22);box(tip,0,.02,-.062,.032,.02,.1,ceramic,.22);batch(tip);
  fingers.push({hinge,tip,a});
 }
 const muzzle=new T.Object3D();muzzle.position.set(0,.04,-.55);root.add(muzzle);
 const pool=Array.from({length:30},()=>{
  const material=new T.MeshBasicMaterial({color:0x8affe4,transparent:true,opacity:0,depthWrite:false});
  const beam=new T.Mesh(unitBox,material),rim=new T.Mesh(ringGeometry,material);beam.visible=rim.visible=false;effects.add(beam,rim);
  return {beam,rim,material,life:0,max:0,type:'',a:new T.Vector3(),b:new T.Vector3(),normal:new T.Vector3(0,0,1),segment:0,width:.02,charged:false};
 });
 const destination=new T.Vector3(),aTemp=new T.Vector3(),bTemp=new T.Vector3(),direction=new T.Vector3(),right=new T.Vector3();
 function take(type,life){let slot=pool.find(p=>p.life<=0);if(!slot)slot=pool[nextSlot++%pool.length];slot.type=type;slot.max=slot.life=life;slot.beam.visible=type!=='ring';slot.rim.visible=type==='ring';slot.material.opacity=.9;slot.charged=false;return slot;}
 function curve(out,a,b,t,bend){out.copy(a).lerp(b,t);out.y+=Math.sin(Math.PI*t)*bend;return out;}
 function poseBeam(slot,a,b,width){const len=a.distanceTo(b);slot.beam.visible=active&&len>.002;slot.beam.position.copy(a).lerp(b,.5);slot.beam.lookAt(b);slot.beam.scale.set(width,width,Math.max(.002,len));}
 function capture(point){
  if(!point)return;muzzle.updateWorldMatrix(true,false);muzzle.getWorldPosition(destination);impact=.22;
  for(let i=0;i<3;i++){const slot=take('capture',.22);slot.a.copy(point);slot.b.copy(destination);slot.segment=i;slot.width=.022;slot.material.color.setHex(0x8affe4);}
 }
 function release({from,to,cells:count=1,charged=false}={}){
  if(!from||!to)return;direction.copy(to).sub(from);if(direction.lengthSq()<.001)direction.set(0,0,-1);direction.normalize();right.crossVectors(direction,UP);if(right.lengthSq()<.001)right.set(1,0,0);else right.normalize();releaseKick=charged?.16:.08;impact=.3;
  const strandCount=Math.min(6,Math.max(1,Math.floor(count)));
  for(let i=0;i<strandCount;i++){const slot=take('return',charged?.28:.2);slot.a.copy(from);slot.b.copy(to).addScaledVector(right,(i-(strandCount-1)/2)*.065);slot.width=charged?.045:.026;slot.charged=charged;slot.material.color.setHex(charged?0xffe7b4:0x94ffe8);}
  for(let i=0;i<(charged?2:1);i++){const slot=take('ring',.28+i*.06);slot.a.copy(from).addScaledVector(direction,.2+i*.22);slot.normal.copy(direction);slot.charged=charged;slot.material.color.setHex(charged?0xffce86:0x8affe4);slot.rim.quaternion.setFromUnitVectors(Z,slot.normal);}
 }
 function update(dt,{active:isActive=false,window=0,stored=0,kick=0,low=false}={}){
  active=!!isActive;root.visible=effects.visible=active;const delta=active?Math.max(0,Number.isFinite(dt)?dt:0):0;phase+=delta;impact=Math.max(0,impact-delta);releaseKick=Math.max(0,releaseKick-delta*.8);
  const charge=clamp(stored/6),opening=clamp(window/.55),spread=opening>0?.65+Math.sin(opening*Math.PI)*.15:charge*.18;
  root.position.set(-.48+Math.sin(phase*5)*.003,-.43+(window>0?.18:stored>0?.12:0)-Math.max(0,kick)*.1-releaseKick*.5,-.72+releaseKick*.45);
  root.rotation.set(-.12-releaseKick,.12,-.22+Math.sin(phase*4)*.004);
  energy.color.setHex(stored>=6?0xffdda0:0x8affe4);energy.emissive.setHex(stored>=6?0xffb766:0x68f7d2);energy.emissiveIntensity=1.1+charge*.8+impact*5+opening*.8;
  for(let i=0;i<6;i++)cells[i].visible=i<stored;
  aperture.rotation.z=phase*(.1+charge*.18);innerRing.scale.setScalar(.117*(1+opening*.2));outerRing.rotation.z=-phase*.12;spindle.rotation.y=Math.sin(phase*1.7)*.2;
  nucleus.scale.setScalar(.025+charge*.03+opening*.025+impact*.025);nucleus.rotation.set(phase*.4,phase*.7,phase*.2);
  fingers.forEach(({hinge,tip},i)=>{hinge.rotation.x=-.13-spread*.65+Math.sin(phase*2+i)*.012;tip.rotation.x=.24+spread*.52;});
  if(!active)return;
  muzzle.updateWorldMatrix(true,false);muzzle.getWorldPosition(destination);
  for(const slot of pool){if(slot.life<=0)continue;slot.life=Math.max(0,slot.life-delta);if(!slot.life){slot.beam.visible=slot.rim.visible=false;continue;}const t=1-slot.life/slot.max;slot.material.opacity=(1-t)*(slot.charged?.95:.76)*(low?.8:1);
   if(slot.type==='capture'){slot.b.copy(destination);const start=Math.max(slot.segment/3,t),end=Math.min(1,Math.max(start,(slot.segment+1)/3+t*.24));curve(aTemp,slot.a,slot.b,start,.45);curve(bTemp,slot.a,slot.b,end,.45);poseBeam(slot,aTemp,bTemp,slot.width*(1-t*.5));}
   else if(slot.type==='return')poseBeam(slot,slot.a,slot.b,slot.width*(1-t*.6));
   else{slot.rim.position.copy(slot.a).addScaledVector(slot.normal,t*.7);slot.rim.scale.setScalar(.16+t*(slot.charged?1.5:.8));slot.rim.visible=true;}
  }
 }
 function reset(){root.visible=effects.visible=false;active=false;impact=releaseKick=phase=0;for(const slot of pool){slot.life=0;slot.beam.visible=slot.rim.visible=false;}for(const cell of cells)cell.visible=false;}
 function stats(){let draws=0,triangles=0;if(root.visible)root.traverse(o=>{if(o.isMesh&&o.visible){draws++;triangles+=(o.geometry.index?.count||o.geometry.attributes.position.count)/3;}});return {draws,triangles,effects:pool.filter(p=>p.life>0).length,pool:pool.length,visible:root.visible};}
 function dispose(){reset();camera.remove(root);scene.remove(effects);for(const g of owned)g.dispose();for(const material of [armor,dark,steel,ceramic,trim,energy,...pool.map(p=>p.material)])material.dispose();}
 return {root,muzzle,update,capture,release,reset,stats,dispose};
}
