import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Low-profile first-person conversion kits: retain the recognizable receiver,
// replace its exposed barrel/powertrain silhouette, and keep every shot socket
// at the end of the installed hardware. Repeated detail is batched by material.
export function createHeavyEvolutionVisuals({scene,parents,muzzles}) {
 const box=new T.BoxGeometry(1,1,1),forms=new Map(),roots={},selected={},baseMuzzles={};
 const steel=new T.MeshStandardMaterial({color:0x69818b,metalness:.85,roughness:.27});
 const dark=new T.MeshStandardMaterial({color:0x142530,metalness:.74,roughness:.31});
 const black=new T.MeshStandardMaterial({color:0x09141d,metalness:.35,roughness:.62});
 const ceramic=new T.MeshStandardMaterial({color:0xc7d8dc,metalness:.6,roughness:.26});
 const bronze=new T.MeshStandardMaterial({color:0x9c6438,metalness:.83,roughness:.28});
 const pearl=new T.MeshStandardMaterial({color:0x889fbb,metalness:.83,roughness:.23});
 const accent=hex=>new T.MeshStandardMaterial({color:hex,emissive:hex,emissiveIntensity:1.45,metalness:.38,roughness:.22});
 const colors={1:{core:accent(0xffba61),vortex:accent(0x9ffff2),burst:accent(0xff8b52)},2:{core:accent(0x8ac9ff),prism:accent(0xb69dff),siege:accent(0xd8eeff)}};
 for(const index of [1,2]){const g=new T.Group();g.name=index===1?'BREACH CONVERSION KIT':'RAIL CONVERSION KIT';parents[index]?.add(g);roots[index]=g;baseMuzzles[index]=muzzles[index]?.position.clone();}
 function mesh(g,geo,mat,x=0,y=0,z=0){const o=new T.Mesh(geo,mat);o.position.set(x,y,z);g.add(o);return o;}
 function block(g,x,y,z,w,h,d,m){const o=mesh(g,box,m,x,y,z);o.scale.set(w,h,d);return o;}
 function panel(g,x,y,z,w,h,d,m){const shape=new T.Shape(),a=w/2,b=h/2,k=Math.min(w,h)*.22;shape.moveTo(-a+k,-b);shape.lineTo(a-k,-b);shape.lineTo(a,-b+k);shape.lineTo(a,b-k);shape.lineTo(a-k,b);shape.lineTo(-a+k,b);shape.lineTo(-a,b-k);shape.lineTo(-a,-b+k);shape.closePath();const geo=new T.ExtrudeGeometry(shape,{depth:d,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.003,bevelThickness:.003});geo.translate(0,0,-d/2);return mesh(g,geo,m,x,y,z);}
 function tube(g,x,y,z,r,length,m,open=false){const o=mesh(g,new T.CylinderGeometry(r,r,length,12,1,open),m,x,y,z);o.rotation.x=Math.PI/2;return o;}
 function ring(g,x,y,z,r,thickness,m){return mesh(g,new T.TorusGeometry(r,thickness,5,24),m,x,y,z);}
 function batch(g){const bins=new Map();for(const o of [...g.children]){if(!o.isMesh)continue;o.updateMatrix();let bin=bins.get(o.material)||[];const geo=o.geometry.clone().applyMatrix4(o.matrix);bin.push(geo.index?geo.toNonIndexed():geo);bins.set(o.material,bin);g.remove(o);}for(const [m,geos] of bins){g.add(new T.Mesh(mergeGeometries(geos,false),m));geos.forEach(x=>x.dispose());}}
 function create(index,tier,path){
  const apex=tier===3,g=new T.Group(),body=new T.Group(),iris=new T.Group(),rails=[];
  g.name=`${index===1?'BREACH':'RAIL'} / ${path||'CORE'} / ${tier}`;g.add(body,iris);roots[index].add(g);g.visible=false;
  const glow=colors[index][path||'core'],hot=index===1?bronze:pearl;
  const length=index===1?(apex?.98:tier===2?.88:.79):(apex?1.24:tier===2?1.09:.98),barrelY=index===1?.055:.025;
  // Receiver-side armored power couplings, flush with the old shell.
  for(const side of [-1,1]){
   panel(body,side*.143,.025,-.19,.048,.126,.27,dark);
   panel(body,side*.161,.04,-.18,.018,.085,.19,hot);
   block(body,side*.173,.047,-.18,.008,.019,.145,glow);
   for(let j=0;j<3;j++){const bolt=mesh(body,new T.CylinderGeometry(.01,.01,.009,6),black,side*.176,-.002,-.11-j*.07);bolt.rotation.z=Math.PI/2;}
   panel(body,side*.135,-.06,-.055,.036,.055,.12,steel);
  }
  panel(body,0,.145,-.13,.136,.026,.14,black);
  block(body,0,.162,-.13,.026,.009,.095,glow);
  // A visible tier-count on both sides reads as installed hardware, not UI.
  for(const side of [-1,1])for(let j=0;j<tier;j++)block(body,side*.179,.082,-.10-j*.047,.009,.012,.023,ceramic);
  if(index===1){
   // The breach gun becomes a pressure engine, with a genuine open muzzle.
   tube(body,0,barrelY,-.47,.081,.40,black,true);
   for(let j=0;j<(apex?6:4);j++){
    const z=-.35-j*(length-.39)/(apex?6:4);ring(body,0,barrelY,z,.091,.012,j%2?steel:hot);
    for(const side of [-1,1])block(body,side*.092,barrelY,z,.015,.047,.025,glow);
   }
   const pressure=new T.Group();pressure.position.set(0,-.10,-.48);g.add(pressure);
   tube(pressure,0,0,0,.056,.38,hot);ring(pressure,0,0,-.20,.063,.012,dark);ring(pressure,0,0,.19,.061,.012,steel);
   for(let i=0;i<5;i++)panel(pressure,0,0,-.15+i*.072,.13,.12,.022,dark);
   block(pressure,0,-.066,0,.034,.014,.31,glow);batch(pressure);
   if(path==='vortex'){
    // Canted pressure vanes form an open six-leaf turbine crown.
    for(const side of [-1,1]){
     const rail=new T.Group();rail.position.set(side*(apex?.172:.143),barrelY,-.48);g.add(rail);rails.push(rail);
     const blade=panel(rail,0,0,-.20,apex?.073:.056,.14,apex?.62:.45,ceramic);blade.rotation.y=-side*.105;
     block(rail,-side*.031,.02,-.23,.012,.028,apex?.54:.40,glow);
     for(let j=0;j<(apex?6:4);j++)panel(rail,side*.008,0,-.03-j*.08,.083,.155,.023,hot);
     batch(rail);
    }
    iris.position.set(0,barrelY,-length+.025);ring(iris,0,0,0,apex?.132:.107,.014,steel);ring(iris,0,0,-.022,apex?.112:.09,.009,glow);
    for(let i=0;i<6;i++){const a=i*Math.PI/3,leaf=panel(iris,Math.cos(a)*.115,Math.sin(a)*.115,0,.042,.083,.045,ceramic);leaf.rotation.z=a-Math.PI/2;}
   }else if(path==='burst'){
    // A squared reinforced chamber, exposed copper coolant coils and twin jaws.
    panel(body,0,barrelY,-.52,.235,.205,.30,dark);tube(body,0,barrelY,-.53,.093,.33,hot,true);
    for(let j=0;j<(apex?7:5);j++)ring(body,0,barrelY,-.39-j*.062,.104,.009,j%2?steel:hot);
    for(const side of [-1,1]){
     const rail=new T.Group();rail.position.set(side*(apex?.132:.116),barrelY,-.57);g.add(rail);rails.push(rail);
     panel(rail,0,0,-.19,.061,.145,apex?.49:.36,dark);block(rail,-side*.031,0,-.19,.01,.046,apex?.43:.30,glow);
     for(let j=0;j<(apex?5:3);j++)panel(rail,0,.014,-.05-j*.083,.078,.18,.025,hot);batch(rail);
    }
    iris.position.set(0,barrelY,-length+.03);ring(iris,0,0,0,.10,.016,steel);ring(iris,0,0,-.024,.082,.01,glow);
    if(apex)for(const side of [-1,1])panel(body,side*.123,-.058,-.29,.072,.065,.22,bronze);
   }else{
    panel(body,0,-.033,-.40,.23,.10,.16,dark);
    for(const side of [-1,1]){panel(body,side*.101,.035,-.54,.035,.12,.33,steel);block(body,side*.124,.035,-.54,.008,.034,.24,glow);}
    iris.position.set(0,barrelY,-length+.02);ring(iris,0,0,0,.10,.014,hot);ring(iris,0,0,-.02,.081,.009,glow);
   }
   if(apex){
    // Rear pressure reservoirs make the final form read as an entire weapon.
    for(const side of [-1,1]){tube(body,side*.139,.098,-.22,.034,.25,hot);ring(body,side*.139,.098,-.35,.04,.009,steel);ring(body,side*.139,.098,-.09,.04,.009,dark);block(body,side*.139,.134,-.22,.018,.012,.18,glow);}
   }
  }else{
   // Segmented twin rail extensions, with an unobstructed central bore.
   const count=apex?9:tier===2?7:5;
   for(const side of [-1,1]){
    const rail=new T.Group();rail.position.set(side*(path==='siege'?.139:.117),barrelY,-.31);g.add(rail);rails.push(rail);
    panel(rail,0,0,-(length-.34)/2,.071,.151,length-.31,dark);
    block(rail,-side*.036,0,-(length-.33)/2,.012,.035,length-.34,glow);
    block(rail,0,-.083,-(length-.34)/2,.046,.019,length-.34,hot);
    for(let j=0;j<count;j++){
     const z=-j*(length-.37)/(count-1);panel(rail,0,0,z,.103,.183,.027,hot);block(rail,0,.097,z,.055,.009,.021,glow);
     for(const edge of [-1,1])block(rail,edge*.048,-.016,z,.009,.039,.032,steel);
    }
    panel(rail,0,0,-length+.31,.11,.18,.065,ceramic);batch(rail);
   }
   // The receiver capacitor connects the old mag well to the new accelerator.
   panel(body,0,-.105,-.19,.22,.055,.24,black);for(const side of [-1,1])for(let j=0;j<4;j++)block(body,side*.12,-.105,-.11-j*.055,.012,.021,.028,glow);
   if(path==='prism'){
    for(const side of [-1,1]){
     const wing=panel(body,side*(apex?.179:.15),.078,-.40,.046,.066,apex?.44:.28,ceramic);wing.rotation.y=side*.19;
     block(body,side*.18,.112,-.38,.015,.012,.24,glow);
    }
    iris.position.set(0,barrelY,-length+.04);const prism=ring(iris,0,0,0,.105,.012,hot);prism.scale.set(1,1.2,1);ring(iris,0,0,-.027,.084,.008,glow);
    if(apex){for(let i=0;i<4;i++){const a=i*Math.PI/2+Math.PI/4,panelMesh=panel(iris,Math.cos(a)*.12,Math.sin(a)*.12,0,.055,.055,.06,ceramic);panelMesh.rotation.z=a;}}
   }else if(path==='siege'){
    panel(body,0,.096,-.27,.16,.077,.30,black);for(let j=0;j<(apex?6:4);j++){const z=-.15-j*.055;panel(body,0,.12,z,.18,.067,.02,hot);block(body,0,.16,z,.073,.008,.026,glow);}
    for(const side of [-1,1]){panel(body,side*.17,-.035,-.25,.05,.095,.24,hot);block(body,side*.199,-.012,-.25,.009,.03,.18,glow);}
    iris.position.set(0,barrelY,-length+.05);ring(iris,0,0,0,.124,.012,steel);ring(iris,0,0,-.034,.102,.01,glow);
    if(apex){const keel=panel(body,0,-.09,-.70,.10,.073,.78,dark);block(body,0,-.13,-.70,.038,.013,.70,glow);}
   }else{iris.position.set(0,barrelY,-length+.035);ring(iris,0,0,0,.099,.01,steel);ring(iris,0,0,-.024,.079,.007,glow);}
  }
  batch(body);batch(iris);
  const form={index,tier,path,g,body,iris,rails,glow,length,barrelY,flash:0,key:`${index}:${tier}:${path||''}`};forms.set(form.key,form);return form;
 }
 for(const index of [1,2]){create(index,1,null);for(const path of index===1?['vortex','burst']:['prism','siege'])for(const tier of [2,3])create(index,tier,path);}
 function configure(index,build={}){
  if(index!==1&&index!==2)return false;
  const tier=Math.max(0,Math.min(3,build.tier||0)),path=tier>1?build.path:null,key=`${index}:${tier}:${path||''}`;
  if(selected[index]?.key===key||!selected[index]&&!tier)return false;
  for(const form of forms.values())if(form.index===index)form.g.visible=false;
  const form=selected[index]=tier?forms.get(key)||forms.get(`${index}:1:`):null;
  if(form){form.g.visible=true;if(muzzles[index])muzzles[index].position.set(0,form.barrelY,-form.length-.028);}
  else if(muzzles[index]&&baseMuzzles[index])muzzles[index].position.copy(baseMuzzles[index]);
  return true;
 }

 // Three fixed instanced draws shared by both weapons. No shot allocates a
 // geometry, material, Mesh or timer. Replaced slots expire deterministically.
 const fxRoot=new T.Group();fxRoot.name='HEAVY EVOLUTION SHOT POOL';fxRoot.visible=false;scene.add(fxRoot);
 const zero=new T.Matrix4().makeScale(0,0,0),white=new T.Color(),pool={},units=[];
 for(const [kind,count] of Object.entries({beam:44,ring:24,shard:48})){
  const geo=kind==='ring'?new T.TorusGeometry(1,.026,4,32):kind==='shard'?new T.IcosahedronGeometry(1,0):box;
  const material=new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.84,depthWrite:false,blending:T.AdditiveBlending});
  const draw=new T.InstancedMesh(geo,material,count);draw.frustumCulled=false;draw.instanceMatrix.setUsage(T.DynamicDrawUsage);fxRoot.add(draw);pool[kind]=[];
  for(let i=0;i<count;i++){draw.setMatrixAt(i,zero);draw.setColorAt(i,white.setHex(0));const u={kind,draw,index:i,pose:new T.Object3D(),color:new T.Color(),life:0,max:1,expansion:0,spin:0,drift:new T.Vector3()};pool[kind].push(u);units.push(u);}
 }
 const forward=new T.Vector3(0,0,1);let shots=0;
 function write(u){if(u.life<=0)u.draw.setMatrixAt(u.index,zero);else{u.pose.updateMatrix();u.draw.setMatrixAt(u.index,u.pose.matrix);white.copy(u.color).multiplyScalar(Math.min(1,u.life/u.max));u.draw.setColorAt(u.index,white);}u.draw.instanceMatrix.needsUpdate=true;u.draw.instanceColor.needsUpdate=true;}
 function take(kind,life,color){const a=pool[kind],u=a.find(x=>x.life<=0)||a.reduce((x,y)=>x.life<y.life?x:y);u.life=u.max=life;u.color.setHex(color);u.expansion=u.spin=0;u.drift.set(0,0,0);u.pose.rotation.set(0,0,0);return u;}
 function line(a,b,color,width,life){const u=take('beam',life,color),d=b.clone().sub(a);u.pose.position.copy(a).add(b).multiplyScalar(.5);u.pose.scale.set(width,width,Math.max(.001,d.length()));u.pose.lookAt(b);write(u);}
 function circle(at,normal,color,radius,life,expand=2){const u=take('ring',life,color);u.pose.position.copy(at);u.pose.quaternion.setFromUnitVectors(forward,normal);u.pose.scale.setScalar(radius);u.base=radius;u.expansion=expand;write(u);}
 function shard(at,direction,color,scale,life){const u=take('shard',life,color);u.pose.position.copy(at);u.pose.scale.set(scale*.65,scale*1.8,scale*.65);u.pose.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),direction);u.drift.copy(direction).multiplyScalar(3);u.spin=3;write(u);}
 function discharge(index,from,to,{build={},charged=false,low=false,reduced=false}={}){
  if((index!==1&&index!==2)||!build.tier)return false;
  shots++;const form=selected[index];if(form)form.flash=1;
  const apex=build.tier===3,path=build.path,direction=to.clone().sub(from);if(direction.lengthSq()<.00001)direction.set(0,0,-1);else direction.normalize();
  const side=new T.Vector3().crossVectors(direction,new T.Vector3(0,1,0));if(side.lengthSq()<.001)side.set(1,0,0);else side.normalize();const up=new T.Vector3().crossVectors(side,direction).normalize();
  const color=index===1?(path==='vortex'?0x99fff1:path==='burst'?0xff995c:0xffc880):(path==='prism'?0xb89dff:0xb1e5ff),duration=reduced?.12:apex?.25:.18;
  fxRoot.visible=true;
  if(index===1){
   line(from,to,color,path==='burst'?(apex?.10:.065):.036,duration*.75);line(from,to,0xfff1c9,.016,duration*.65);
   circle(from,direction,color,path==='vortex'?.20:.13,.14,1);
   circle(to,direction,color,path==='vortex'?(apex?1.15:.75):apex?.65:.4,duration,1.9);
   if(path==='vortex'){
    for(let i=0;i<(low||reduced?1:apex?4:2);i++)circle(from.clone().lerp(to,.15+i*.16),direction,i%2?0xffd29b:color,.25+i*.13,duration*.8,1.2);
   }else if(path==='burst'&&!reduced){
    for(let i=0;i<(low?3:apex?8:5);i++){const a=i*Math.PI*2/(low?3:apex?8:5),d=side.clone().multiplyScalar(Math.cos(a)).addScaledVector(up,Math.sin(a)).addScaledVector(direction,.2).normalize();shard(to,d,color,.07,duration+.1);}
   }
  }else{
   const width=path==='siege'?(apex?.14:.09):apex?.09:.06;
   line(from,to,color,width,duration);line(from,to,0xf1fbff,width*.28,duration*.82);
   circle(from,direction,0xdff8ff,.13,.16,1.1);
   const rings=low||reduced?2:apex?6:4;
   for(let i=0;i<rings;i++){const t=(i+1)/(rings+1),at=from.clone().lerp(to,t*(path==='prism'?.72:.8));circle(at,direction,color,(path==='siege'?.16:.11)+i*.035,duration*(.7+i*.045),1.3);}
   circle(to,direction,color,apex?.85:.5,duration+.06,1.8);
   if(path==='prism'&&!reduced){
    for(let i=0;i<(low?3:6);i++){const a=i*Math.PI*2/(low?3:6),d=side.clone().multiplyScalar(Math.cos(a)).addScaledVector(up,Math.sin(a)).normalize();const point=to.clone().addScaledVector(d,apex?1.1:.7);line(to,point,i%2?0xa1eaff:color,.018,duration);shard(point,d,0xe0d0ff,.045,duration+.08);}
   }else if(path==='siege'&&!low&&!reduced){
    for(const sign of [-1,1]){let previous=from.clone();for(let i=1;i<=5;i++){const t=i/5,at=from.clone().lerp(to,t*.62).addScaledVector(side,Math.cos(t*Math.PI*3)*.1*sign).addScaledVector(up,Math.sin(t*Math.PI*3)*.1*sign);line(previous,at,color,.015,duration*.9);previous=at;}}
   }
  }
  return true;
 }
 function update(dt,{weapon,time=0,reduced=false,low=false,playing=true}={}){
  fxRoot.visible=playing;if(!playing)return;
  for(const index of [1,2]){const f=selected[index];if(!f)continue;f.flash=Math.max(0,f.flash-dt*5);f.iris.rotation.z=reduced?0:time*(index===1&&f.path==='vortex'?1.3:index===2?.65:.2);f.glow.emissiveIntensity=1.3+f.flash*4+(weapon===index&&!reduced?Math.sin(time*2.8)*.12:0);for(let i=0;i<f.rails.length;i++)f.rails[i].rotation.y=(i%2?1:-1)*f.flash*(f.path==='vortex'?.13:.065);}
  for(const u of units){if(u.life<=0)continue;u.life=Math.max(0,u.life-dt);if(u.kind==='ring')u.pose.scale.setScalar(u.base*(1+(1-u.life/u.max)*u.expansion));if(u.kind==='shard'){u.pose.position.addScaledVector(u.drift,dt);u.pose.rotateZ(dt*u.spin);}write(u);}
 }
 function reset(){for(const index of [1,2]){if(selected[index])selected[index].flash=0;configure(index,{tier:0});}for(const u of units){u.life=0;write(u);}shots=0;fxRoot.visible=false;}
 function stats(){const models={};for(const index of [1,2]){let meshes=0,triangles=0;const f=selected[index];if(f)f.g.traverse(o=>{if(o.isMesh){meshes++;triangles+=(o.geometry.index?.count??o.geometry.attributes.position.count)/3;}});models[index]={tier:f?.tier||0,path:f?.path||null,meshes,triangles,muzzle:muzzles[index]?.position.toArray()||null};}return {models,active:units.filter(u=>u.life>0).length,capacity:units.length,drawObjects:3,shots};}
 return {configure,update,discharge,reset,stats,roots,forms,diagnostics:()=>units.filter(u=>u.life>0).map(u=>({kind:u.kind,life:u.life,matrix:u.pose.matrix.toArray()}))};
}
