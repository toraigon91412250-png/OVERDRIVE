import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Ω modules all share the same grip, sight line and -Z muzzle socket. Only the
// selected assembly exists; static armor is batched by material per moving part.
const TAU=Math.PI*2;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,Number.isFinite(v)?v:a));
const index=v=>clamp(Math.floor(v||0),0,4);
const unitBox=new T.BoxGeometry(1,1,1);
const cylinder=new T.CylinderGeometry(1,1,1,12,1);
const disc=new T.CylinderGeometry(1,1,1,16,1);
const ringGeo=new T.TorusGeometry(1,.055,5,32);
const shardGeo=new T.OctahedronGeometry(1,0);
const finite=v=>v&&Number.isFinite(v.x)&&Number.isFinite(v.y)&&Number.isFinite(v.z);

function modelStats(root){
 let draws=0,triangles=0;root.traverse(o=>{if(!o.isMesh)return;for(let p=o;p&&p!==root;p=p.parent)if(!p.visible)return;draws++;triangles+=(o.geometry.index?o.geometry.index.count:o.geometry.attributes.position.count)/3*(o.isInstancedMesh?o.count:1);});
 return{draws,triangles};
}

export function createOmegaVisuals({camera,scene}){
 const root=new T.Group();root.name='Ω / modular weapon';root.visible=false;camera.add(root);
 root.position.set(.32,-.29,-.55);root.scale.setScalar(.88);
 const chassis=new T.Group(),receiver=new T.Group(),action=new T.Group(),feed=new T.Group(),rotor=new T.Group();
 root.add(chassis);chassis.add(receiver,action,feed,rotor);
 const rankGroups=Array.from({length:3},(_,i)=>{const g=new T.Group();g.name=`Ω / mutation ${i+1}`;chassis.add(g);return g;});
 const muzzle=new T.Object3D(),port=new T.Object3D();muzzle.name='Ω / true bore';port.name='Ω / ejection socket';chassis.add(muzzle,port);
 muzzle.position.set(0,.025,-.92);port.position.set(.132,.035,-.085);
 const metal=(color,roughness=.4,metalness=.7)=>new T.MeshStandardMaterial({color,roughness,metalness});
 const mats={dark:metal(0x14202a,.42),steel:metal(0x46535b,.32),ivory:metal(0xd8d6c9,.4,.4),edge:metal(0x8b9d9e,.3),black:metal(0x07121b,.8,.2),gold:metal(0xbc8c4d,.28),accent:new T.MeshStandardMaterial({color:0xffad71,emissive:0xff8034,emissiveIntensity:1.3,metalness:.3,roughness:.28})};
 let selected=null,elapsed=0,kick=0,flash=0,rank=0,coreIndex=0,lastStats={draws:0,triangles:0};
 const ownGeometries=new Set();
 function mesh(parent,geometry,material,x=0,y=0,z=0){const m=new T.Mesh(geometry,material);m.position.set(x,y,z);parent.add(m);return m;}
 function box(parent,x,y,z,w,h,d,material,rx=0,ry=0,rz=0){const m=mesh(parent,unitBox,material,x,y,z);m.scale.set(w,h,d);m.rotation.set(rx,ry,rz);return m;}
 function armor(parent,x,y,z,w,h,d,material,cut=.22,rz=0){
  const a=w/2,b=h/2,k=Math.min(w,h)*cut,s=new T.Shape();s.moveTo(-a+k,-b);s.lineTo(a-k,-b);s.lineTo(a,-b+k);s.lineTo(a,b-k);s.lineTo(a-k,b);s.lineTo(-a+k,b);s.lineTo(-a,b-k);s.lineTo(-a,-b+k);s.closePath();
  const g=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.0035,bevelThickness:.0035});g.translate(0,0,-d/2);ownGeometries.add(g);const m=mesh(parent,g,material,x,y,z);m.rotation.z=rz;return m;
 }
 function tube(parent,x,y,z,r,len,material,inner=0){
  if(!inner){const m=mesh(parent,cylinder,material,x,y,z);m.scale.set(r,len,r);m.rotation.x=Math.PI/2;return m;}
  const g=new T.CylinderGeometry(r,r,len,16,1,true);ownGeometries.add(g);const outer=mesh(parent,g,material,x,y,z);outer.rotation.x=Math.PI/2;
  const rim=new T.RingGeometry(inner,r,16);ownGeometries.add(rim);mesh(parent,rim,material,x,y,z-len/2-.001);
  const bore=new T.CylinderGeometry(inner,inner,len*.8,16,1,true);ownGeometries.add(bore);const m=mesh(parent,bore,mats.black,x,y,z);m.rotation.x=Math.PI/2;m.material=mats.black;
  const cap=new T.CircleGeometry(inner,16);ownGeometries.add(cap);mesh(parent,cap,mats.black,x,y,z+len*.35);
  return outer;
 }
 function ring(parent,x,y,z,r,t,material,rx=0,ry=0,rz=0){const g=new T.TorusGeometry(r,t,5,24);ownGeometries.add(g);const m=mesh(parent,g,material,x,y,z);m.rotation.set(rx,ry,rz);return m;}
 function batch(group){
  group.updateMatrixWorld(true);const bins=new Map();
  for(const o of [...group.children]){if(!o.isMesh)continue;o.updateMatrix();const g=o.geometry.clone().applyMatrix4(o.matrix);const n=g.index?g.toNonIndexed():g;if(n!==g)g.dispose();const list=bins.get(o.material)||[];list.push(n);bins.set(o.material,list);group.remove(o);}
  for(const [material,geos] of bins){const geometry=mergeGeometries(geos,false);ownGeometries.add(geometry);group.add(new T.Mesh(geometry,material));geos.forEach(g=>g.dispose());}
 }
 function clearModel(){for(const g of [receiver,action,feed,rotor,...rankGroups])g.clear();for(const g of ownGeometries)g.dispose();ownGeometries.clear();}
 function frameBody(frame){
  const widths=[.19,.205,.23,.265,.25],height=[.15,.16,.18,.20,.19],w=widths[frame],h=height[frame];
  // Bevel-cut receiver, inset shoulder plate and exposed central breech.
  armor(receiver,0,-.01,-.055,w,h,.32,mats.dark);
  armor(receiver,0,-.025,.13,w*.86,h*.82,.09,mats.black);
  for(const s of [-1,1]){
   armor(receiver,s*(w/2+.012),.015,-.075,.026,h*.64,.225,mats.steel);
   box(receiver,s*(w/2+.027),.055,-.07,.008,.014,.20,mats.accent);
   for(let i=0;i<3;i++)tube(receiver,s*(w/2+.029),-.03,-.02-i*.07,.009,.012,mats.edge);
   box(receiver,s*.076,-.107,-.05,.012,.024,.15,mats.edge);
  }
  const grip=armor(receiver,0,-.166,.055,.082,.22,.105,mats.black);grip.rotation.x=-.20;
  for(let i=0;i<5;i++)box(receiver,0,-.09-i*.033,.111,.085,.008,.014,mats.steel);
  box(receiver,0,-.155,-.085,.12,.018,.17,mats.edge);box(receiver,0,-.087,-.155,.12,.12,.019,mats.dark);
  armor(receiver,0,.094,-.20,.19,.027,.34,mats.edge);box(receiver,0,.112,-.20,.12,.012,.30,mats.black);
  // Three-dimensional rear sight has an open central channel, not an optic
  // slab covering the reticle. It stays low on every frame.
  for(const s of [-1,1])armor(receiver,s*.025,.132,.025,.012,.025,.04,mats.ivory);
  box(receiver,0,.122,.025,.06,.008,.04,mats.steel);
  if(frame===0){
   armor(receiver,0,-.055,-.29,.14,.12,.24,mats.ivory);
   for(const s of [-1,1]){box(receiver,s*.082,.023,-.34,.015,.026,.26,mats.gold);armor(receiver,s*.071,-.045,-.44,.022,.085,.21,mats.dark);}
   armor(receiver,0,-.03,.20,.12,.115,.09,mats.steel);
  }else if(frame===1){
   for(const s of [-1,1]){armor(receiver,s*.083,.027,-.32,.065,.10,.38,mats.ivory,.25,s*.08);box(receiver,s*.122,.06,-.34,.012,.012,.27,mats.gold);}
   armor(receiver,0,-.055,.21,.11,.15,.12,mats.dark);
  }else if(frame===2){
   armor(receiver,0,-.025,-.34,.23,.16,.29,mats.steel);armor(receiver,0,.012,-.33,.19,.09,.25,mats.ivory);
   for(const s of [-1,1])box(receiver,s*.124,-.025,-.37,.012,.025,.28,mats.gold);
  }else if(frame===3){
   armor(receiver,0,-.025,-.29,.265,.19,.31,mats.steel);
   for(const s of [-1,1]){armor(receiver,s*.15,-.005,-.31,.055,.16,.34,mats.ivory);for(let i=0;i<4;i++)box(receiver,s*.184,.015,-.21-i*.065,.008,.035,.027,mats.black);}
   armor(receiver,0,-.02,.22,.20,.18,.11,mats.dark);
  }else{
   armor(receiver,0,-.025,-.27,.22,.15,.29,mats.dark);
   for(const s of [-1,1]){armor(receiver,s*.128,.02,-.30,.07,.15,.30,mats.gold);armor(receiver,s*.17,-.026,-.33,.027,.10,.25,mats.dark);box(receiver,s*.186,-.02,-.34,.008,.019,.22,mats.accent);}
   armor(receiver,0,-.07,.19,.19,.13,.11,mats.ivory);
  }
  armor(action,.126,.025,-.06,.021,.052,.11,mats.edge);box(action,.141,.035,-.072,.012,.012,.075,mats.accent);
 }
 function coreMechanism(core){
  // All five chambers feed the same forward bore. Distinct silhouette comes
  // from the mechanism that surrounds it, not from moving the projectile exit.
  tube(receiver,0,.025,-.68,.043,.39,mats.black);
  tube(receiver,0,.025,-.886,.052,.065,mats.edge,.029);
  if(core===0){
   for(const s of [-1,1]){
    armor(receiver,s*.066,.022,-.61,.04,.08,.36,mats.steel);box(receiver,s*.045,.04,-.62,.012,.018,.34,mats.accent);
    for(let i=0;i<4;i++)armor(receiver,s*.067,.073,-.48-i*.075,.05,.018,.026,mats.ivory);
   }
   tube(rotor,0,.025,0,.063,.028,mats.gold);for(let i=0;i<6;i++){const a=i*TAU/6;box(rotor,Math.cos(a)*.067,.025+Math.sin(a)*.067,0,.025,.018,.04,mats.edge,0,0,a);}
   rotor.position.z=-.78;
  }else if(core===1){
   for(const s of [-1,1]){
    const jaw=armor(receiver,s*.078,.02,-.68,.044,.085,.30,mats.ivory);jaw.rotation.y=-s*.07;
    box(receiver,s*.101,.03,-.68,.009,.022,.25,mats.accent);
    tube(receiver,s*.105,-.04,-.47,.055,.12,mats.dark);ring(receiver,s*.105,-.04,-.535,.044,.009,mats.gold);
    for(let i=0;i<4;i++)ring(receiver,s*.105,-.04,-.50+i*.02,.049,.004,mats.edge);
   }
   armor(rotor,0,.025,0,.036,.036,.18,mats.gold);rotor.position.z=-.73;
  }else if(core===2){
   armor(receiver,0,.012,-.62,.23,.07,.31,mats.ivory);
   for(const s of [-1,1]){armor(receiver,s*.13,.01,-.63,.045,.055,.25,mats.dark);box(receiver,s*.113,.055,-.64,.018,.009,.22,mats.accent);}
   ring(rotor,0,.025,0,.096,.015,mats.steel);ring(rotor,0,.025,.014,.075,.006,mats.accent);
   for(let i=0;i<4;i++){const a=i*TAU/4;armor(rotor,Math.cos(a)*.103,.025+Math.sin(a)*.103,0,.042,.026,.055,mats.gold,.2,a);}
   rotor.position.z=-.785;
  }else if(core===3){
   for(let i=0;i<3;i++)ring(receiver,0,.025,-.54-i*.105,.096-i*.006,.012,i%2?mats.ivory:mats.steel);
   for(const s of [-1,1]){box(receiver,s*.083,.025,-.61,.014,.023,.31,mats.gold);armor(receiver,s*.087,-.045,-.60,.04,.045,.20,mats.dark);}
   const coreMesh=mesh(rotor,shardGeo,mats.black,0,.025,0);coreMesh.scale.setScalar(.06);ring(rotor,0,.025,0,.069,.007,mats.accent,Math.PI/3);
   rotor.position.z=-.64;
  }else{
   for(const s of [-1,1]){
    const blade=armor(receiver,s*.095,.025,-.65,.065,.06,.32,mats.ivory,.3);blade.rotation.y=-s*.13;
    box(receiver,s*.116,.058,-.65,.013,.009,.25,mats.accent,0,-s*.13);
   }
   ring(rotor,0,.025,0,.112,.012,mats.gold);ring(rotor,0,.025,.006,.092,.008,mats.steel);
   for(let i=0;i<3;i++){const a=i*TAU/3;armor(rotor,Math.cos(a)*.1,.025+Math.sin(a)*.1,0,.065,.023,.035,mats.ivory,.3,a);}
   rotor.position.z=-.70;
  }
 }
 function feedModule(which){
  if(which===0){
   armor(feed,0,-.17,-.13,.10,.15,.12,mats.ivory);armor(feed,0,-.248,-.13,.12,.021,.14,mats.gold);
   for(let i=0;i<2;i++)box(feed,-.054,-.15-i*.039,-.14,.008,.014,.076,mats.accent);
  }else if(which===1){
   armor(feed,0,-.20,-.13,.12,.22,.13,mats.dark);box(feed,0,-.315,-.13,.14,.019,.15,mats.edge);
   for(let i=0;i<4;i++)box(feed,-.064,-.135-i*.043,-.13,.008,.018,.08,mats.accent);
  }else if(which===2){
   const m=mesh(feed,disc,mats.dark,0,-.235,-.13);m.scale.set(.105,.18,.105);m.rotation.z=Math.PI/2;
   for(const s of [-1,1]){const cap=mesh(feed,disc,mats.steel,s*.094,-.235,-.13);cap.scale.set(.103,.018,.103);cap.rotation.z=Math.PI/2;ring(feed,s*.107,-.235,-.13,.064,.008,mats.gold,0,Math.PI/2);}
   for(let i=0;i<6;i++){const a=i*TAU/6;box(feed,0,-.235+Math.sin(a)*.102,-.13+Math.cos(a)*.102,.16,.018,.017,i%2?mats.edge:mats.ivory,a,0,0);}
  }else if(which===3){
   for(const s of [-1,1]){armor(feed,s*.055,-.185,-.13,.074,.19,.13,mats.ivory);box(feed,s*.055,-.289,-.13,.083,.018,.14,mats.gold);box(feed,s*.093,-.19,-.13,.008,.06,.065,mats.accent);}
  }else{
   armor(feed,0,-.17,-.13,.155,.16,.15,mats.dark);
   for(const s of [-1,1]){tube(feed,s*.052,-.19,-.13,.032,.12,mats.accent);for(const z of [-.075,-.13,-.185])ring(feed,s*.052,-.19,z,.038,.005,mats.steel);}
   armor(feed,0,-.26,-.13,.17,.025,.17,mats.ivory);
  }
 }
 function shroudModule(which){
  for(const s of [-1,1]){
   if(which===0){armor(receiver,s*.078,-.022,-.52,.04,.10,.25,mats.dark);box(receiver,s*.101,-.003,-.52,.008,.015,.18,mats.ivory);}
   else if(which===1){for(let i=0;i<4;i++){armor(receiver,s*.085,-.03,-.40-i*.05,.04,.095,.017,mats.steel);box(receiver,s*.111,-.013,-.40-i*.05,.008,.018,.012,mats.gold);}}
   else if(which===2){armor(receiver,s*.092,-.04,-.5,.035,.08,.24,mats.ivory);for(let i=0;i<3;i++)box(receiver,s*.113,-.025,-.42-i*.07,.008,.017,.037,mats.black);}
   else if(which===3){const fin=armor(receiver,s*.10,-.04,-.5,.032,.115,.25,mats.steel);fin.rotation.y=s*.08;box(receiver,s*.122,-.012,-.5,.012,.013,.21,mats.accent,0,s*.08);}
   else{for(let i=0;i<2;i++){armor(receiver,s*.10,-.03,-.43-i*.12,.045,.105,.075,mats.gold);armor(receiver,s*.12,-.03,-.43-i*.12,.022,.071,.052,mats.dark);}}
  }
 }
 function housingModule(which){
  const x=-.116,y=.06,z=-.20;
  if(which===0){tube(receiver,x,y,z,.044,.15,mats.dark);ring(receiver,x,y,z-.08,.041,.007,mats.ivory);tube(receiver,x,y,z-.09,.028,.01,mats.accent);}
  else if(which===1){for(let i=0;i<4;i++)ring(receiver,x,y,z-.06+i*.045,.041,.008,i%2?mats.gold:mats.edge);tube(receiver,x,y,z,.029,.16,mats.accent);}
  else if(which===2){armor(receiver,x,y,z,.07,.07,.19,mats.ivory);for(let i=0;i<4;i++)box(receiver,x-.037,y,z-.065+i*.043,.008,.027,.015,mats.accent);}
  else if(which===3){for(let i=0;i<3;i++)ring(receiver,x,y,z-.06+i*.06,.052,.005,mats.steel);tube(receiver,x,y,z,.021,.17,mats.accent);for(const s of [-1,1])box(receiver,x+s*.04,y,z,.009,.014,.18,mats.gold);}
  else{const crystal=mesh(receiver,shardGeo,mats.accent,x,y,z);crystal.scale.set(.036,.036,.1);for(const s of [-1,1])armor(receiver,x+s*.04,y,z,.018,.075,.18,mats.dark);ring(receiver,x,y,z-.09,.038,.007,mats.gold);ring(receiver,x,y,z+.09,.038,.007,mats.gold);}
 }
 function mutationArmor(){
  const [first,second,third]=rankGroups;
  for(const s of [-1,1]){
   armor(first,s*.14,.005,-.31,.035,.10,.22,mats.ivory);box(first,s*.161,.02,-.31,.008,.018,.18,mats.accent);
   const vane=armor(second,s*.14,.045,-.60,.06,.04,.24,mats.gold);vane.rotation.y=-s*.16;box(second,s*.165,.07,-.60,.012,.009,.18,mats.accent,0,-s*.16);
   for(let i=0;i<2;i++)armor(third,s*.092,.055,-.74-i*.055,.065,.035,.022,mats.ivory,.2);
  }
  ring(third,0,.025,-.862,.109,.012,mats.gold);ring(third,0,.025,-.875,.09,.004,mats.accent);
  for(const g of rankGroups)batch(g);
 }
 function showRank(){for(let i=0;i<rankGroups.length;i++)rankGroups[i].visible=rank>i;lastStats=modelStats(chassis);}
 function configure(build={}){
  const parts=[index(build.frame),index(build.core),index(build.feed),index(build.shroud),index(build.housing)];
  if(typeof build.core==='string'){const found=['echo','tether','ricochet','gravity','boomerang'].indexOf(build.core.toLowerCase());if(found>=0)parts[1]=found;}
  if(typeof build.coreId==='string'){const found=['echo','tether','ricochet','gravity','boomerang'].indexOf(build.coreId.toLowerCase());if(found>=0)parts[1]=found;}
  const next=parts.join(':');rank=clamp(build.rank||0,0,3);if(Number.isFinite(build.color)){mats.accent.color.setHex(build.color);mats.accent.emissive.setHex(build.color);}
  if(selected===next){showRank();return false;}
  selected=next;coreIndex=parts[1];clearModel();for(const group of [receiver,action,feed,rotor]){group.position.set(0,0,0);group.rotation.set(0,0,0);group.scale.set(1,1,1);}
  frameBody(parts[0]);coreMechanism(parts[1]);feedModule(parts[2]);shroudModule(parts[3]);housingModule(parts[4]);
  for(const group of [receiver,action,feed,rotor])batch(group);
  mutationArmor();showRank();root.name=`Ω / ${build.name||'GENERATED'} / ${next}`;return true;
 }

 // Six fixed draw objects cover all beams, pulse rings and physical shards.
 // No generated shot allocates a Mesh or adds objects to the scene graph.
 const fxRoot=new T.Group();fxRoot.name='Ω / bounded discharge';scene.add(fxRoot);
 const capacity=144,fxMats=[0,1,2].map(()=>new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.85,depthWrite:false,blending:T.AdditiveBlending}));
 const fxMeshes=[unitBox,ringGeo,shardGeo].map((geo,k)=>{const o=new T.InstancedMesh(geo,fxMats[k],capacity);o.instanceMatrix.setUsage(T.DynamicDrawUsage);o.frustumCulled=false;o.count=0;o.visible=false;fxRoot.add(o);return o;});
 const pool=Array.from({length:capacity},()=>({life:0,max:0,kind:0,pos:new T.Vector3(),end:new T.Vector3(),color:new T.Color(),width:0,length:0,expand:0,flat:false}));
 const pose=new T.Object3D(),color=new T.Color(),direction=new T.Vector3(),up=new T.Vector3(0,0,1),axisX=new T.Vector3(1,0,0),delta=new T.Vector3();let cursor=0,effects=0,lowQuality=false,reducedMotion=false;
 function emit(kind,from,to,c,width,life,expand=0,flat=false){const f=pool[cursor++%capacity];f.kind=kind;f.life=f.max=Math.max(.03,life||.15);f.pos.copy(from);f.end.copy(to||from);f.color.setHex(Number.isFinite(c)?c:0xffaf75);f.width=width;f.expand=expand;f.flat=flat;effects++;}
 function effect(event={}){
  const from=finite(event.from)?event.from:finite(event.pos)?event.pos:null,to=finite(event.to)?event.to:from;if(!from||!to)return false;
  const c=event.color??0xffad71,kind=event.kind||'beam',life=event.life||.18;
  if(kind==='well'||kind==='gravity'){
   emit(1,to,to,c,event.radius||.6,Math.min(1,event.life||.9),event.radius||1.5,true);
   if(!lowQuality&&!reducedMotion)emit(1,to,to,0xffe3bd,.15,.38,.8,true);
  }else if(kind==='return'||kind==='boomerang'||kind==='disc'){
   emit(1,to,from,c,.16,Math.min(.35,life),.1);if(from.distanceToSquared(to)>.001)emit(0,from,to,c,.018,.10);
  }else if(kind==='impact'||kind==='hit'||kind==='pulse'){
   emit(1,to,from,c,event.radius||.16,Math.min(.35,life),.6);
   if(!lowQuality&&!reducedMotion)for(let i=0;i<3;i++){delta.set(Math.sin(i*2.4)*.12,Math.cos(i*2.4)*.12,0).add(to);emit(2,delta,to,c,.045,.16,.13);}
  }else{
   const width=kind==='tether'?.023:kind==='echo'?.019:.033;emit(0,from,to,c,width,Math.min(.35,life));
   emit(1,to,from,c,.10,.17,.38);
  }
  return true;
 }
 function drawEffects(){
  const counts=[0,0,0];for(const f of pool){if(f.life<=0)continue;const i=counts[f.kind]++,age=1-f.life/f.max,fade=1-age;
   direction.copy(f.end).sub(f.pos);const length=direction.length();if(length>.0001)direction.divideScalar(length);else direction.set(0,0,1);
   pose.quaternion.setFromUnitVectors(up,direction);pose.position.copy(f.pos);
   if(f.kind===0){pose.position.add(f.end).multiplyScalar(.5);pose.scale.set(f.width*Math.max(.2,fade),f.width*Math.max(.2,fade),Math.max(.001,length));}
   else if(f.kind===1){const radius=Math.max(.005,f.width+age*f.expand);pose.scale.set(radius,radius,Math.max(.1,fade));if(f.flat)pose.quaternion.setFromAxisAngle(axisX,Math.PI/2);pose.rotateZ(age*2);}
   else{pose.position.addScaledVector(direction,-age*f.expand);pose.scale.setScalar(Math.max(.001,f.width*fade));pose.rotateZ(age*3);}
   pose.updateMatrix();fxMeshes[f.kind].setMatrixAt(i,pose.matrix);color.copy(f.color).multiplyScalar(Math.max(.01,fade));fxMeshes[f.kind].setColorAt(i,color);
  }
  for(let k=0;k<3;k++){fxMeshes[k].count=counts[k];fxMeshes[k].visible=counts[k]>0;fxMeshes[k].instanceMatrix.needsUpdate=true;if(fxMeshes[k].instanceColor)fxMeshes[k].instanceColor.needsUpdate=true;}
 }
 function update(dt,{active=false,low=false,reduced=false,reload=0,kick:inputKick=0,time}={}){
  dt=clamp(dt,0,.1);elapsed=Number.isFinite(time)?time:elapsed+dt;lowQuality=!!low;reducedMotion=!!reduced;root.visible=!!active;
  kick=Math.max(clamp(inputKick,0,1),Math.max(0,kick-dt*7));flash=Math.max(clamp(inputKick,0,1)*.1,Math.max(0,flash-dt));
  const loading=Math.sin(Math.PI*clamp(reload,0,1));root.position.set(.32,-.29-loading*.055-(reduced?0:kick*.025),-.55+kick*.04);root.rotation.set(-kick*.06,loading*.04,-loading*.12+kick*.035);root.scale.setScalar(low?.84:.88);
  action.position.z=kick*.06;feed.position.y=-loading*.19;feed.rotation.x=loading*.18;
  rotor.rotation.z=reduced?0:elapsed*(coreIndex===3?-.55:coreIndex===4?.65:.35);rotor.scale.setScalar(1+kick*.035);
  mats.accent.emissiveIntensity=1.0+rank*.14+flash*8+(reduced?0:Math.sin(elapsed*2)*.08);
  for(const f of pool)if(f.life>0)f.life=Math.max(0,f.life-dt);drawEffects();
 }
 function reset(){elapsed=kick=flash=cursor=effects=0;for(const f of pool)f.life=0;drawEffects();root.visible=false;action.position.z=0;feed.position.y=0;feed.rotation.x=0;root.rotation.set(0,0,0);root.position.set(.32,-.29,-.55);}
 function stats(){return{...lastStats,assembly:selected,core:coreIndex,rank,effects,poolCapacity:capacity,activeEffects:pool.filter(f=>f.life>0).length,effectDraws:fxMeshes.filter(m=>m.count>0).length,muzzle:muzzle.position.toArray(),modules:5,onlySelectedAssembly:true};}
 configure();reset();
 return{root,muzzle,port,configure,update,effect,reset,stats};
}
