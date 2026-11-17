import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Authored additions to the three special weapons. Every tier/route is built
// once; fixed world-effect pools never allocate GPU resources while firing.
export function createSpecialEvolutionVisuals({scene,parents,muzzles={}}){
 const unitBox=new T.BoxGeometry(1,1,1),unitCylinder=new T.CylinderGeometry(1,1,1,12);
 const steel=new T.MeshStandardMaterial({color:0x637d8c,metalness:.78,roughness:.31});
 const shell=new T.MeshStandardMaterial({color:0x172a39,metalness:.64,roughness:.39});
 const ceramic=new T.MeshStandardMaterial({color:0xb8d6dc,metalness:.48,roughness:.29});
 const black=new T.MeshStandardMaterial({color:0x0b1723,metalness:.37,roughness:.57});
 const gold=new T.MeshStandardMaterial({color:0xb29166,metalness:.8,roughness:.29});
 const forms=new Map(),selected=new Map(),roots={};
 const paths={3:['nova','reactor'],4:['echo','deadeye'],5:['swarm','hunter']};
 const baseColors={3:0xc2a3ff,4:0xa8e7ff,5:0x92ffe0};
 let modelTime=0;
 const mesh=(g,geo,mat,x=0,y=0,z=0)=>{const m=new T.Mesh(geo,mat);m.position.set(x,y,z);g.add(m);return m;};
 const box=(g,x,y,z,w,h,d,mat)=>{const m=mesh(g,unitBox,mat,x,y,z);m.scale.set(w,h,d);return m;};
 function panel(g,x,y,z,w,h,d,mat){
  const a=w/2,b=h/2,k=Math.min(a,b)*.38,s=new T.Shape();s.moveTo(-a+k,-b);s.lineTo(a-k,-b);s.lineTo(a,-b+k);s.lineTo(a,b-k);s.lineTo(a-k,b);s.lineTo(-a+k,b);s.lineTo(-a,b-k);s.lineTo(-a,-b+k);s.closePath();
  const geo=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSize:.003,bevelThickness:.003,bevelSegments:1,steps:1});geo.translate(0,0,-d/2);return mesh(g,geo,mat,x,y,z);
 }
 function tube(g,x,y,z,r,len,mat){const m=mesh(g,unitCylinder,mat,x,y,z);m.scale.set(r,len,r);m.rotation.x=Math.PI/2;return m;}
 const ring=(g,x,y,z,r,t,mat)=>mesh(g,new T.TorusGeometry(r,t,5,24),mat,x,y,z);
 function batch(g){
  const bins=new Map();for(const o of [...g.children])if(o.isMesh){o.updateMatrix();const geo=o.geometry.clone().applyMatrix4(o.matrix),ready=geo.index?geo.toNonIndexed():geo;if(ready!==geo)geo.dispose();const list=bins.get(o.material)||[];list.push(ready);bins.set(o.material,list);g.remove(o);}
  for(const [material,geometries] of bins){g.add(new T.Mesh(mergeGeometries(geometries,false),material));geometries.forEach(g=>g.dispose());}
 }
 const createGlow=color=>new T.MeshStandardMaterial({color,emissive:color,emissiveIntensity:1.3,metalness:.28,roughness:.25});
 function createForm(weapon,tier,path){
  const g=new T.Group(),body=new T.Group(),rotors=[],vanes=[];
  const accent=createGlow(path==='reactor'?0x7bffe8:path==='deadeye'?0xffcf92:path==='hunter'?0xffc183:baseColors[weapon]);
  g.name=`EVOLUTION / ${weapon} / ${tier} / ${path||'core'}`;g.visible=false;g.add(body);roots[weapon].add(g);
  const final=tier===3;
  if(weapon===3){
   // The imported firing socket is 0.377 m forward of its converted origin.
   // Keep the final projector petals behind that socket, so the actual beam
   // still exits the visible front of the weapon after upgrading.
   g.scale.z=.74;
   // The original sword-carbine retains its open central chamber. A low truss
   // wraps its edges; the nova form unfolds a four-petal field projector.
   for(const side of [-1,1]){
    panel(body,side*.095,.045,-.25,.043,.09,.31,steel);
    box(body,side*.12,.06,-.25,.015,.016,.29,accent);
    for(let i=0;i<3;i++){panel(body,side*.103,.091,-.13-i*.095,.055,.018,.04,ceramic);box(body,side*.124,.071,-.13-i*.095,.012,.025,.02,black);}
    panel(body,side*.075,-.075,-.13,.045,.06,.20,shell);
   }
   if(path==='nova'){
    for(let i=0;i<(final?4:2);i++){
     const angle=i*Math.PI/(final?2:1),v=new T.Group();v.position.set(Math.cos(angle)*.14,Math.sin(angle)*.14+.045,-.36);v.rotation.z=angle;g.add(v);
     panel(v,.01,0,-.04,.085,.045,final?.30:.23,ceramic);panel(v,.025,.032,-.06,.071,.035,final?.24:.19,shell);
     box(v,.037,.014,-.07,.014,.012,final?.25:.17,accent);for(let j=0;j<3;j++)box(v,.01,.056,-.12+j*.07,.042,.012,.021,gold);
     batch(v);vanes.push({g:v,axis:'z',home:angle,amount:i%2?-.06:.06});
    }
    const rotor=new T.Group();rotor.position.set(0,.047,-.50);g.add(rotor);ring(rotor,0,0,0,final?.175:.13,.012,steel);ring(rotor,0,0,.014,final?.148:.105,.006,accent);
    for(let j=0;j<(final?8:6);j++){const a=j*Math.PI/(final?4:3),s=panel(rotor,Math.cos(a)*(final?.175:.13),Math.sin(a)*(final?.175:.13),0,.036,.025,.03,gold);s.rotation.z=a;}
    batch(rotor);rotors.push({g:rotor,speed:.38});
   }else if(path==='reactor'){
    for(const side of [-1,1]){
     const x=side*(final?.16:.14);tube(body,x,.02,-.22,.046,final?.32:.24,shell);
     for(let j=0;j<(final?5:3);j++){const z=-.12-j*.055;ring(body,x,.02,z,.05,.008,j%2?gold:ceramic);ring(body,x,.02,z-.012,.041,.004,accent);}
     panel(body,x,-.046,-.22,.06,.019,.27,gold);
    }
    const rotor=new T.Group();rotor.position.set(0,.047,-.45);g.add(rotor);for(let j=0;j<(final?3:2);j++)ring(rotor,0,0,-j*.025,.12+j*.012,.007,j%2?accent:ceramic);batch(rotor);rotors.push({g:rotor,speed:-.52});
    if(final){panel(body,0,.16,-.24,.07,.034,.28,shell);box(body,0,.183,-.24,.02,.01,.25,accent);}
   }else{
    ring(body,0,.047,-.44,.112,.01,steel);ring(body,0,.047,-.455,.095,.005,accent);
   }
  }else if(weapon===4){
   // Long but narrow accelerator jacket. The scope and central bore stay open;
   // receiver trusses and segment collars communicate one heavy precision shot.
   for(const side of [-1,1]){
    panel(body,side*.31,.04,-.48,.075,.15,1.10,shell);
    box(body,side*.354,.06,-.48,.012,.025,.91,accent);
    for(let i=0;i<4;i++){const z=-.08-i*.29;panel(body,side*.31,.133,z,.095,.025,.055,steel);box(body,side*.36,.04,z,.014,.05,.025,gold);}
    panel(body,side*.24,.035,-2.03,.048,.12,1.65,steel);
    box(body,side*.212,.05,-2.09,.012,.026,1.52,accent);
   }
   for(let i=0;i<(final?7:4);i++){const z=-1.28-i*(final?.30:.46);ring(body,0,.065,z,.205,.02,i%2?steel:black);for(const side of [-1,1])panel(body,side*.20,.065,z,.058,.17,.035,ceramic);}
   if(path==='echo'){
    for(const side of [-1,1]){
     const v=new T.Group();v.position.set(side*(final?.34:.30),.025,-1.75);g.add(v);
     const rail=panel(v,0,0,-.1,.085,.15,final?1.65:1.20,shell);rail.rotation.y=side*.025;
     box(v,-side*.042,.04,-.15,.012,.025,final?1.52:1.08,accent);
     for(let j=0;j<(final?5:3);j++){panel(v,0,.11,-.72+j*.27,.105,.033,.11,ceramic);box(v,0,.13,-.72+j*.27,.044,.009,.055,accent);}
     batch(v);vanes.push({g:v,axis:'y',home:0,amount:side*.035});
    }
    const rotor=new T.Group();rotor.position.set(0,.065,-3.13);g.add(rotor);ring(rotor,0,0,0,final?.31:.25,.017,steel);ring(rotor,0,0,.025,final?.27:.215,.008,accent);
    for(let j=0;j<6;j++){const a=j*Math.PI/3,s=panel(rotor,Math.cos(a)*(final?.31:.25),Math.sin(a)*(final?.31:.25),0,.075,.044,.12,ceramic);s.rotation.z=a;}
    batch(rotor);rotors.push({g:rotor,speed:.22});
   }else if(path==='deadeye'){
    for(const side of [-1,1]){
     panel(body,side*.30,.035,-2.48,.09,.18,final?1.18:.87,black);
     panel(body,side*.36,.055,-2.48,.028,.095,final?1.08:.75,gold);
     for(let j=0;j<(final?6:4);j++)box(body,side*.38,.06,-2.08-j*.15,.017,.03,.048,accent);
    }
    const rotor=new T.Group();rotor.position.set(0,.065,-3.32);g.add(rotor);for(let j=0;j<(final?3:2);j++)ring(rotor,0,0,j*.04,.24-j*.012,.015,j%2?gold:ceramic);ring(rotor,0,0,-.016,.192,.007,accent);batch(rotor);rotors.push({g:rotor,speed:-.16});
    if(final){for(const side of [-1,1]){panel(body,side*.33,.21,-.28,.10,.09,.36,gold);box(body,side*.33,.26,-.28,.034,.012,.26,accent);}}
   }
  }else{
   // Guidance electronics sit beside the tri-cell bank rather than masking its
   // actual missile mouths. The shoulder-mounted frame stays compact.
   for(const side of [-1,1]){
    panel(body,side*.184,-.025,-.13,.054,.15,.40,steel);
    panel(body,side*.215,-.014,-.11,.035,.09,.28,shell);
    box(body,side*.235,.01,-.12,.009,.016,.23,accent);
    for(let j=0;j<3;j++)box(body,side*.236,-.04,-.04-j*.075,.012,.015,.035,gold);
   }
   panel(body,0,-.19,-.13,.20,.035,.32,shell);box(body,0,-.214,-.14,.10,.01,.22,accent);
   if(path==='swarm'){
    for(const side of [-1,1]){
     const v=new T.Group();v.position.set(side*(final?.31:.27),.005,-.22);v.rotation.z=side*.10;g.add(v);
     panel(v,0,0,0,.105,.19,final?.34:.27,shell);panel(v,0,.10,0,.12,.023,final?.36:.29,ceramic);
     for(let j=0;j<(final?3:2);j++){
      const z=.07-j*.10;tube(v,0,.015,z,.038,.075,steel);ring(v,0,.015,z-.041,.031,.006,accent);
      box(v,side*.06,.01,z,.012,.047,.041,gold);
     }
     box(v,-side*.03,.13,0,.016,.016,.25,accent);batch(v);vanes.push({g:v,axis:'z',home:side*.10,amount:side*.07});
    }
    if(final){panel(body,0,.24,-.10,.18,.045,.20,shell);for(const side of [-1,1])panel(body,side*.11,.265,-.1,.043,.017,.17,accent);}
   }else if(path==='hunter'){
    for(const side of [-1,1]){
     const v=new T.Group();v.position.set(side*(final?.27:.24),.10,-.25);g.add(v);
     const fin=panel(v,0,0,0,.065,.16,final?.46:.34,ceramic);fin.rotation.y=-side*.15;
     box(v,-side*.034,.025,-.01,.012,.025,final?.39:.27,accent);for(let j=0;j<(final?4:3);j++)panel(v,0,.10,.09-j*.095,.073,.025,.032,gold);
     batch(v);vanes.push({g:v,axis:'y',home:0,amount:side*.045});
    }
    const rotor=new T.Group();rotor.position.set(0,.205,-.20);g.add(rotor);tube(rotor,0,0,0,.066,.20,black);ring(rotor,0,0,-.105,.071,.009,gold);ring(rotor,0,0,-.116,.051,.006,accent);batch(rotor);rotors.push({g:rotor,speed:.38});
    if(final){for(const side of [-1,1]){panel(body,side*.19,-.18,-.25,.09,.06,.30,gold);box(body,side*.19,-.216,-.26,.045,.01,.25,accent);}}
   }else{
    panel(body,0,.20,-.10,.15,.035,.23,black);box(body,0,.225,-.10,.09,.012,.17,accent);
   }
  }
  batch(body);const f={g,body,accent,rotors,vanes,weapon,tier,path,kick:0};forms.set(`${weapon}:${tier}:${path||''}`,f);return f;
 }
 for(const weapon of [3,4,5]){
  if(!parents[weapon])continue;
  const root=new T.Group();root.name=`SPECIAL EVOLUTION / ${weapon}`;parents[weapon].add(root);roots[weapon]=root;
  // ASTRA's imported art uses +Y forward and 0.13 units. Cancel only the
  // fixed conversion inside our child; its deployment/recoil still carries us.
  if(weapon===3){root.rotation.x=Math.PI/2;root.scale.setScalar(1/.13);}
  createForm(weapon,1,null);for(const path of paths[weapon])for(const tier of [2,3])createForm(weapon,tier,path);
 }

 const effectRoot=new T.Group();effectRoot.name='SPECIAL EVOLUTION / pooled discharge';scene.add(effectRoot);
 const kinds=['beam','ring','shard'],capacity=120;
 const geometries=[unitBox,new T.TorusGeometry(1,.027,5,32),new T.OctahedronGeometry(1,0)];
 const fxMeshes=geometries.map(geometry=>{const material=new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.82,depthWrite:false,blending:T.AdditiveBlending});const m=new T.InstancedMesh(geometry,material,capacity);m.instanceMatrix.setUsage(T.DynamicDrawUsage);m.frustumCulled=false;m.count=0;effectRoot.add(m);return m;});
 const pool=Array.from({length:capacity},()=>({life:0,max:0,kind:0,pos:new T.Vector3(),dir:new T.Vector3(0,0,-1),color:new T.Color(),width:0,length:0,expand:0,spin:0}));
 const pose=new T.Object3D(),forward=new T.Vector3(0,0,1),direction=new T.Vector3(),right=new T.Vector3(),up=new T.Vector3(),mid=new T.Vector3(),color=new T.Color();let cursor=0,shots=0;
 function emit(kind,pos,dir,c,width,length,life,expand=0,spin=0){const f=pool[cursor++%capacity];Object.assign(f,{kind,width,length,life,max:life,expand,spin});f.pos.copy(pos);f.dir.copy(dir);f.color.setHex(c);}
 function drawEffects(){
  const counts=[0,0,0];for(const f of pool){if(f.life<=0)continue;const k=f.kind,i=counts[k]++,age=1-f.life/f.max;pose.position.copy(f.pos);pose.quaternion.setFromUnitVectors(forward,f.dir);pose.rotateZ(f.spin+age*.6);
   const fade=Math.max(.015,1-age);if(k===0)pose.scale.set(f.width*fade,f.width*fade,Math.max(.001,f.length));else if(k===1){const r=Math.max(.001,f.width+age*f.expand);pose.scale.set(r,r,Math.max(.15,fade));}else pose.scale.setScalar(Math.max(.001,f.width*fade));
   pose.updateMatrix();fxMeshes[k].setMatrixAt(i,pose.matrix);color.copy(f.color).multiplyScalar(fade);fxMeshes[k].setColorAt(i,color);
  }for(let k=0;k<3;k++){fxMeshes[k].count=counts[k];fxMeshes[k].visible=counts[k]>0;fxMeshes[k].instanceMatrix.needsUpdate=true;if(fxMeshes[k].instanceColor)fxMeshes[k].instanceColor.needsUpdate=true;}
 }
 function configure(index,build={}){
  if(!roots[index])return false;const tier=Math.max(0,Math.min(3,build.tier|0)),path=tier>1&&paths[index].includes(build.path)?build.path:null;
  const key=`${index}:${tier}:${path||''}`,previous=selected.get(index);if(previous?.key===key)return false;
  if(previous?.form)previous.form.g.visible=false;
  const form=tier?forms.get(key):null;if(form){form.g.visible=true;form.kick=0;if(Number.isFinite(build.color)){form.accent.color.setHex(build.color);form.accent.emissive.setHex(build.color);}}
  selected.set(index,{key,form});return true;
 }
 function discharge(index,from,to,{build={},charged=false,low=false,reduced=false}={}){
  if(!build.tier||!roots[index]||!from||!to)return 0;
  direction.copy(to).sub(from);const distance=direction.length();if(!Number.isFinite(distance)||distance<.001)return 0;direction.divideScalar(distance);
  const before=cursor,c=build.color??baseColors[index],final=build.tier===3;
  const f=selected.get(index)?.form;if(f)f.kick=1;
  shots++;mid.copy(from).add(to).multiplyScalar(.5);
  emit(0,mid,direction,c,index===3?(charged?.065:.035):index===4?.038:.025,distance,reduced?.10:.19);
  // Fine offset threads preserve the precision ray's direction instead of
  // multiplying broad muzzle flashes. Impact rings sit at the target only.
  right.set(0,1,0).cross(direction);if(right.lengthSq()<.001)right.set(1,0,0);right.normalize();up.crossVectors(direction,right).normalize();
  if(!low&&!reduced&&final){
   for(const side of [-1,1]){mid.copy(from).add(to).multiplyScalar(.5).addScaledVector(right,side*(index===4?.08:.05));emit(0,mid,direction,c,.012,distance,.14);}
  }
  const ringCount=reduced?1:low?1:final?3:2;
  for(let i=0;i<ringCount;i++){mid.copy(to).addScaledVector(direction,-i*.10);emit(1,mid,direction,c,.12+i*.12,0,.22+i*.045,(charged?2.4:index===4?1.2:.8)+i*.15,i*.4);}
  if(!reduced){const n=low?2:final?6:3;for(let j=0;j<n;j++){const angle=j*Math.PI*2/n;mid.copy(to).addScaledVector(right,Math.cos(angle)*.24).addScaledVector(up,Math.sin(angle)*.24);emit(2,mid,direction,c,final?.095:.065,0,.22+ j*.012,0,angle);}}
  drawEffects();return cursor-before;
 }
 function update(dt,{weapon,time,reduced=false,low=false,playing=true}={}){
  const step=playing?Math.max(0,Math.min(.1,Number.isFinite(dt)?dt:0)):0;if(step>0)modelTime=Number.isFinite(time)?time:modelTime+step;
  for(const [index,entry] of selected){const f=entry.form;if(!f)continue;f.g.visible=Number(weapon)===index;f.kick=Math.max(0,f.kick-step*5.5);f.g.position.z=f.kick*.025;
   f.accent.emissiveIntensity=1.25+f.kick*2+(reduced?0:Math.sin(modelTime*2.5)*.11);
   for(const r of f.rotors)r.g.rotation.z=reduced?0:modelTime*r.speed;
   for(const v of f.vanes)v.g.rotation[v.axis]=v.home+(reduced?0:Math.sin(modelTime*2)*v.amount)+f.kick*v.amount*2;
  }
  for(const f of pool)if(f.life>0)f.life=Math.max(0,f.life-step);drawEffects();
 }
 function reset(){for(const f of pool)f.life=0;shots=cursor=0;modelTime=0;for(const {form} of selected.values())if(form)form.kick=0;drawEffects();}
 function stats(){const models={};for(const [index,entry] of selected){let meshes=0,triangles=0;entry.form?.g.traverse(o=>{if(o.isMesh){meshes++;triangles+=(o.geometry.index?.count??o.geometry.attributes.position.count)/3;}});models[index]={key:entry.key,meshes,triangles,visible:entry.form?.g.visible||false};}return{models,shots,active:pool.filter(f=>f.life>0).length,capacity,drawObjects:3,forms:forms.size};}
 return{configure,update,discharge,reset,stats,roots,forms,diagnostics:()=>pool.filter(f=>f.life>0).map(f=>({kind:kinds[f.kind],life:f.life,pos:f.pos.toArray(),dir:f.dir.toArray(),width:f.width,length:f.length}))};
}
