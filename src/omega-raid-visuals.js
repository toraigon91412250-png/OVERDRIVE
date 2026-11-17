import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

const TAU=Math.PI*2;
const boxGeo=new T.BoxGeometry(1,1,1);
const cylinderGeo=new T.CylinderGeometry(1,1,1,8,1);
const coreGeo=new T.OctahedronGeometry(1,0);
const ringGeo=new T.TorusGeometry(1,.055,5,40);
const arrowGeo=new T.ConeGeometry(1,1,3);
const clamp=v=>Math.max(0,Math.min(1,Number.isFinite(v)?v:0));

// Objective models have a shared visual language: heavy graphite armor,
// ceramic edge plates and an exposed, animated energy mechanism. Static
// pieces are merged by material; no geometry/material is allocated in update.
export function createOmegaRaidVisuals({scene}){
 const root=new T.Group();root.name='Ω / Rift Raid objectives';root.visible=false;scene.add(root);
 const metal=(color,roughness=.45,metalness=.6)=>new T.MeshStandardMaterial({color,roughness,metalness});
 const mats={armor:metal(0x13252d),steel:metal(0x50656a,.32),ceramic:metal(0xc6d7d1,.58,.2),black:metal(0x071218,.85,.1)};
 const models=[],owned=new Set(),targetMaterials=new Set();let elapsed=0,kind='';
 function mesh(parent,geometry,material,x=0,y=0,z=0){const m=new T.Mesh(geometry,material);m.position.set(x,y,z);parent.add(m);return m;}
 function box(parent,x,y,z,w,h,d,material,rx=0,ry=0,rz=0){const m=mesh(parent,boxGeo,material,x,y,z);m.scale.set(w,h,d);m.rotation.set(rx,ry,rz);return m;}
 function cyl(parent,x,y,z,r,h,material){const m=mesh(parent,cylinderGeo,material,x,y,z);m.scale.set(r,h,r);return m;}
 function ring(parent,x,y,z,r,material,rx=0,ry=0,rz=0){const m=mesh(parent,ringGeo,material,x,y,z);m.scale.setScalar(r);m.rotation.set(rx,ry,rz);return m;}
 function arrow(parent,x,y,z,size,material,rx=0,ry=0,rz=0){const m=mesh(parent,arrowGeo,material,x,y,z);m.scale.set(size,size*.8,size*.28);m.rotation.set(rx,ry,rz);return m;}
 function batch(group){
  group.updateMatrixWorld(true);const bins=new Map();
  for(const child of [...group.children]){if(!child.isMesh)continue;child.updateMatrix();let geometry=child.geometry.clone().applyMatrix4(child.matrix);if(geometry.index){const flat=geometry.toNonIndexed();geometry.dispose();geometry=flat;}const bin=bins.get(child.material)||[];bin.push(geometry);bins.set(child.material,bin);group.remove(child);}
  for(const [material,geometries] of bins){const geometry=mergeGeometries(geometries,false);owned.add(geometry);group.add(new T.Mesh(geometry,material));for(const g of geometries)g.dispose();}
 }
 function createModel(data,index){
  const target=new T.Group();target.name=`Ω / ${kind} / ${data.id??index}`;target.position.set(data.x||0,data.y||0,data.z||0);root.add(target);
  if(Number.isFinite(data.yaw))target.rotation.y=data.yaw;
  const accentColor=kind==='breach'?0xffbd63:kind==='hunt'?0xffd178:0x82ffe2;
  const accent=new T.MeshStandardMaterial({color:accentColor,emissive:accentColor,emissiveIntensity:1.25,roughness:.25,metalness:.25});
  const glow=new T.MeshBasicMaterial({color:accentColor,transparent:true,opacity:.14,depthWrite:false,side:T.DoubleSide});targetMaterials.add(accent);targetMaterials.add(glow);
  const fixed=new T.Group(),rotor=new T.Group();target.add(fixed,rotor);let core,progressRing=null;
  if(kind==='breach'){
   cyl(fixed,0,.18,0,1.18,.36,mats.armor);cyl(fixed,0,.38,0,.82,.12,mats.steel);cyl(fixed,0,.47,0,.46,.12,mats.black);
   for(let i=0;i<6;i++){const a=i*TAU/6,x=Math.sin(a),z=Math.cos(a);box(fixed,x*.86,.55,z*.86,.28,.66,.38,mats.ceramic,0,a,0);box(fixed,x*.89,.78,z*.89,.11,.13,.39,accent,0,a,0);box(fixed,x*.57,1.2,z*.57,.16,1.05,.25,mats.armor,-x*.18,a,z*.18);}
   rotor.position.y=1.65;ring(rotor,0,0,0,.87,mats.steel,Math.PI/2);ring(rotor,0,0,0,.73,accent,Math.PI*.22);ring(rotor,0,0,0,.73,accent,-Math.PI*.22,Math.PI/2);
   core=mesh(target,coreGeo,accent,0,1.65,0);core.scale.setScalar(.49);const inner=mesh(target,coreGeo,mats.ceramic,0,1.65,0);inner.scale.setScalar(.23);
   ring(fixed,0,.025,0,1.5,accent,Math.PI/2);
  }else if(kind==='relay'){
   cyl(fixed,0,.08,0,1.6,.16,mats.armor);cyl(fixed,0,.18,0,1.16,.05,mats.steel);cyl(fixed,0,.22,0,.73,.04,mats.black);
   for(let i=0;i<8;i++){const a=i*TAU/8;box(fixed,Math.sin(a)*1.36,.18,Math.cos(a)*1.36,.14,.09,.35,i%2?mats.ceramic:accent,0,a,0);}
   for(const s of [-1,1]){box(fixed,s*.68,.62,.3,.19,.88,.3,mats.ceramic,0,0,-s*.12);box(fixed,s*.68,1.1,.3,.21,.13,.32,accent);}
   cyl(fixed,0,.6,0,.23,.8,mats.steel);box(fixed,0,1.28,0,.15,.84,.16,mats.armor);box(fixed,0,1.6,0,1.16,.12,.16,mats.ceramic);box(fixed,0,1.67,0,.91,.035,.18,accent);
   rotor.position.y=1.9;ring(rotor,0,0,0,.42,accent,Math.PI/2);core=mesh(target,coreGeo,accent,0,1.9,0);core.scale.setScalar(.19);
   const progressGeo=new T.TorusGeometry(1.65,.065,5,64);owned.add(progressGeo);progressRing=mesh(target,progressGeo,accent,0,.1,0);progressRing.rotation.x=-Math.PI/2;progressRing.rotation.z=Math.PI/2;
   const field=cyl(target,0,.65,0,1.68,1.3,glow);field.scale.x=field.scale.z=1.68;
  }else if(kind==='route'){
   for(const s of [-1,1]){box(fixed,s*1.24,.13,0,.66,.26,.95,mats.armor);box(fixed,s*1.3,1.47,0,.22,2.7,.34,mats.steel,0,0,-s*.06);box(fixed,s*1.13,1.56,-.02,.055,2.3,.38,accent,0,0,-s*.06);box(fixed,s*1.06,2.93,0,.71,.22,.4,mats.ceramic,0,0,s*.22);}
   box(fixed,0,3.1,0,1.53,.16,.37,mats.armor);box(fixed,0,3.05,-.2,1.1,.04,.04,accent);
   for(let i=0;i<3;i++)arrow(fixed,0,.06,-.3+i*.43,.3,accent,Math.PI/2,0,0);
   rotor.position.y=3.55;const token=ring(rotor,0,0,0,.3,accent);token.scale.y=.75;core=mesh(target,coreGeo,accent,0,3.55,0);core.scale.set(.14,.21,.14);arrow(fixed,0,3.82,0,.26,mats.ceramic,0,0,Math.PI);
   ring(fixed,0,.025,0,1.4,accent,Math.PI/2);
  }else{
   ring(fixed,0,.08,0,1.2,accent,Math.PI/2);rotor.position.y=2.9;ring(rotor,0,0,0,.68,accent,Math.PI/2);
   for(let i=0;i<4;i++){const a=i*TAU/4;arrow(fixed,Math.sin(a)*1.05,1.55,Math.cos(a)*1.05,.22,accent,0,a,Math.PI);}
   core=mesh(target,coreGeo,accent,0,3.3,0);core.scale.set(.18,.3,.18);arrow(fixed,0,2.6,0,.28,mats.ceramic,0,0,Math.PI);
  }
  batch(fixed);
  const model={id:data.id??index,kind,root:target,core,rotor,accent,glow,progressRing,data,done:!!data.done,active:data.active!==false,index,center:{x:data.x||0,y:(data.y||0)+(kind==='breach'?1.65:1.5),z:data.z||0}};
  models.push(model);return model;
 }
 function clear(){for(const model of models)root.remove(model.root);models.length=0;for(const g of owned)g.dispose();owned.clear();for(const m of targetMaterials)m.dispose();targetMaterials.clear();root.visible=false;}
 function setTargets(nextKind,targets=[]){clear();kind=nextKind;elapsed=0;for(const [index,data] of targets.slice(0,3).entries())createModel(data,index);root.visible=models.length>0;return models;}
 function update(dt,{time,completed=false,active=true,progress=0,current=0,low=false}={}){
  elapsed=Number.isFinite(time)?time:elapsed+Math.max(0,dt||0);root.visible=active&&models.length>0;
  for(const model of models){
   const done=model.done||completed,selected=model.active!==false&&(kind!=='route'||model.index===current);
   model.root.visible=!done;if(done)continue;
   model.accent.emissiveIntensity=selected?1.15+Math.sin(elapsed*3.7+model.index)*.18:.15;
   model.glow.opacity=selected?.08+Math.sin(elapsed*2)*.025:.02;
   model.rotor.rotation.y=elapsed*(kind==='breach'?.7:kind==='hunt'?-.55:.4)+model.index;
   if(kind==='breach')model.rotor.rotation.z=Math.sin(elapsed*.8+model.index)*.18;
   if(model.core){model.core.rotation.y=-elapsed*.9;model.core.rotation.z=Math.sin(elapsed*1.3+model.index)*.12;}
   if(model.progressRing){const count=model.progressRing.geometry.index.count,fill=Number.isFinite(model.data.fill)?model.data.fill:progress;model.progressRing.geometry.setDrawRange(0,Math.floor(count*clamp(model.index===current?fill:0)/3)*3);}
   if(low&&model.glow)model.glow.opacity*=.7;
  }
 }
 function stats(){let draws=0,triangles=0;if(root.visible)for(const m of models){if(!m.root.visible)continue;m.root.traverse(o=>{if(o.isMesh&&o.visible){draws++;triangles+=(o.geometry.index?.count||o.geometry.attributes.position.count)/3;}});}return{targets:models.length,draws,triangles};}
 return {root,setTargets,update,clear,getTargets:()=>models,getTarget:id=>models.find(m=>m.id===id),stats,dispose:()=>{clear();scene.remove(root);Object.values(mats).forEach(m=>m.dispose());}};
}
