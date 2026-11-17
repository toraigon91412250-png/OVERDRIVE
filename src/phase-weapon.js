import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Adapted from the user's ASTRA × VANTA HYBRID v1 model.
// Original source is retained in assets/astra-vanta/; the game uses no CDN, bloom or extra lights.
export function createPhaseWeapon(parent) {
const metal = new THREE.MeshStandardMaterial({color:0x334b5e,metalness:.78,roughness:.28});
const graphite = new THREE.MeshStandardMaterial({color:0x182a38,metalness:.53,roughness:.40});
const titanium = new THREE.MeshStandardMaterial({color:0x6b8aa1,metalness:.73,roughness:.22});
const pale = new THREE.MeshStandardMaterial({color:0xa9c8d4,metalness:.66,roughness:.19});
const deep = new THREE.MeshStandardMaterial({color:0x1e3040,metalness:.64,roughness:.32});
const edgeMat = new THREE.MeshStandardMaterial({color:0x87bfca,emissive:0x24758f,emissiveIntensity:.20,metalness:.52,roughness:.25});
const energyMat = new THREE.MeshBasicMaterial({color:0x36edff,transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
const energySoft = new THREE.MeshBasicMaterial({color:0x36edff,transparent:true,opacity:.12,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
const emissive = new THREE.MeshStandardMaterial({color:0x3bdff0,emissive:0x17daff,emissiveIntensity:.65,metalness:.28,roughness:.23});
const orange = new THREE.MeshBasicMaterial({color:0xff6eaa,transparent:true,opacity:.84,blending:THREE.AdditiveBlending,depthWrite:false});
const emissiveMaterials=[energyMat,energySoft,emissive];
const assembly = new THREE.Group();parent.add(assembly);
const blade = new THREE.Group();assembly.add(blade);

const box=(w,h,d,mat,parent,x=0,y=0,z=0)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);parent.add(m);return m};
const cylinder=(r1,r2,h,mat,parent,x=0,y=0,z=0,segments=16)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,segments),mat);m.position.set(x,y,z);parent.add(m);return m};
function plate(coords,thickness,mat,parent,z=0,bevel=.017){
 const shape=new THREE.Shape();shape.moveTo(coords[0][0],coords[0][1]);for(let i=1;i<coords.length;i++)shape.lineTo(coords[i][0],coords[i][1]);shape.closePath();
 const geo=new THREE.ExtrudeGeometry(shape,{depth:thickness,steps:1,bevelEnabled:bevel>0,bevelSegments:1,bevelSize:bevel,bevelThickness:bevel,curveSegments:3});
 geo.translate(0,0,z-thickness/2);const mesh=new THREE.Mesh(geo,mat);parent.add(mesh);return mesh;
}
function tube(coords,rad,mat,parent,closed=false){
 const pts=coords.map(p=>new THREE.Vector3(...p));const path=new THREE.CatmullRomCurve3(pts,closed,'catmullrom',.05);
 const mesh=new THREE.Mesh(new THREE.TubeGeometry(path,Math.max(12,coords.length*6),rad,6,closed),mat);parent.add(mesh);return mesh;
}
function torus(radius,thick,mat,parent,x=0,y=0,z=0){const m=new THREE.Mesh(new THREE.TorusGeometry(radius,thick,6,24),mat);m.position.set(x,y,z);parent.add(m);return m}
function gem(x,y,z,r,mat,parent=blade){const m=new THREE.Mesh(new THREE.OctahedronGeometry(r,0),mat);m.position.set(x,y,z);parent.add(m);return m;}

// Floating grip and modular hilt
const grip=cylinder(.20,.235,1.35,graphite,blade,0,-1.92,0,12);
cylinder(.255,.22,.18,titanium,blade,0,-1.20,0,12);
cylinder(.245,.245,.14,deep,blade,0,-2.63,0,12);
cylinder(.25,.30,.14,titanium,blade,0,-2.71,0,12);
cylinder(.12,.235,.20,graphite,blade,0,-2.83,0,10);
gem(0,-2.97,0,.15,edgeMat);
for(let i=0;i<9;i++){
 const band=torus(.221,.026,i%3===0?titanium:metal,blade,0,-1.36-i*.142,0);band.rotation.x=Math.PI/2;
}
for(const z of [-1,1]){
 const stripe=box(.065,1.18,.016,edgeMat,blade,0,-1.93,z*.218);stripe.rotation.y=0;
 for(let i=0;i<6;i++)box(.036,.054,.028,emissive,blade,0,-1.49-i*.18,z*.234);
}
for(let s of [-1,1]){const gripRail=box(.035,1.3,.16,metal,blade,s*.2,-1.91,0);gripRail.rotation.z=s*.038}
// Metallic throat, modular locking jaws
plate([[-.33,-1.13],[.33,-1.13],[.40,-.94],[.34,-.56],[-.34,-.56],[-.40,-.94]],.3,metal,blade,.02);
plate([[-.22,-1.08],[.22,-1.08],[.27,-.84],[.2,-.64],[-.2,-.64],[-.27,-.84]],.315,deep,blade,.03);
for(let s of [-1,1]){
 box(.10,.32,.11,pale,blade,s*.27,-.86,.16).rotation.z=-s*.25;
 box(.052,.23,.025,emissive,blade,s*.22,-.85,.233);
}

// Pivotal guard wings
const guards=[];
for(const s of [-1,1]){
 const g=new THREE.Group();g.position.set(s*.21,-.69,0);blade.add(g);guards.push({g,s});
 plate([[0,-.17],[s*.37,-.1],[s*.60,.14],[s*.77,.31],[s*.71,.03],[s*.46,-.26],[s*.2,-.31]],.22,metal,g,.02);
 plate([[s*.12,-.12],[s*.38,-.09],[s*.62,.09],[s*.48,.02],[s*.3,-.18]],.24,titanium,g,.065,.014);
 tube([[s*.11,-.14,.18],[s*.37,-.11,.18],[s*.58,.06,.18]],.024,energyMat,g);
 gem(s*.47,-.06,.19,.063,emissive,g);
}

// Fixed central skeleton and phase conduit
plate([[-.23,-.55],[.23,-.55],[.31,-.16],[.25,.40],[.22,1.90],[.14,2.62],[0,3.41],[-.14,2.62],[-.22,1.90],[-.25,.40],[-.31,-.16]],.22,graphite,blade,-.015,.035);
plate([[-.145,-.31],[.145,-.31],[.19,.29],[.135,1.93],[.065,2.91],[0,3.26],[-.065,2.91],[-.135,1.93],[-.19,.29]],.235,metal,blade,.06,.012);
plate([[-.082,-.04],[.082,-.04],[.092,1.12],[.065,2.36],[0,3.13],[-.065,2.36],[-.092,1.12]],.018,energySoft,blade,.226,.004);
const spineLine=tube([[0,-.22,.252],[0,.55,.254],[0,1.57,.255],[0,2.51,.243],[0,3.25,.17]],.027,energyMat,blade);
for(let i=0;i<11;i++){
 const y=.11+i*.212;const w=.155-i*.008;
 for(const s of [-1,1]){
  box(Math.max(.055,w*.55),.026,.039,i%2?edgeMat:titanium,blade,s*(.108-i*.004),y,.21).rotation.z=-s*.22;
 }
}
// Floating channel rails and vents near blade base
for(let s of [-1,1]){
 plate([[s*.19,-.39],[s*.40,-.21],[s*.36,.30],[s*.27,.74],[s*.19,.87]],.19,deep,blade,.13,.01);
 tube([[s*.29,-.25,.245],[s*.315,.15,.245],[s*.238,.65,.24]],.020,energyMat,blade);
 for(let i=0;i<4;i++)box(.065,.034,.018,emissive,blade,s*.31,-.03+i*.15,.26);
}

// Magnetic segmented side blades, both are articulated independently.
const wings=[];
for(const s of [-1,1]){
 const w=new THREE.Group();w.position.set(s*.145,-.035,.015);blade.add(w);wings.push({w,s});
 const outline=[[s*.012,-.26],[s*.20,-.32],[s*.41,.04],[s*.49,.46],[s*.42,.82],[s*.59,1.10],[s*.48,1.46],[s*.43,2.19],[s*.21,2.95],[s*.03,3.31],[s*.13,2.40],[s*.12,1.28],[s*.06,.42]];
 plate(outline,.19,metal,w,.015,.026);
 plate([[s*.12,-.12],[s*.27,-.08],[s*.39,.30],[s*.37,.71],[s*.29,1.07],[s*.35,1.30],[s*.31,1.99],[s*.19,2.56],[s*.095,2.87],[s*.19,1.35],[s*.15,.40]],.22,titanium,w,.068,.014);
 plate([[s*.35,.06],[s*.48,.47],[s*.40,.85],[s*.52,1.10],[s*.42,1.4],[s*.38,2.18],[s*.20,2.78],[s*.30,2.16],[s*.32,1.35],[s*.28,1.08],[s*.36,.72]],.025,edgeMat,w,.205,.004);
 tube([[s*.28,-.14,.216],[s*.43,.27,.218],[s*.39,.71,.21],[s*.51,1.11,.20],[s*.41,1.46,.20],[s*.38,2.18,.20],[s*.16,2.93,.145]],.025,energyMat,w);
 tube([[s*.095,.12,.246],[s*.25,.61,.245],[s*.24,1.36,.242],[s*.16,2.51,.206]],.017,energyMat,w);
 for(let i=0;i<7;i++){
  const y=.34+i*.27;
  const x=(.32-i*.015)*s;
  box(.105,.028,.024,deep,w,x,y,.225).rotation.z=s*.37;
  if(i%2===0)gem(x,y,.254,.030,emissive,w);
 }
 const fin=plate([[s*.32,-.2],[s*.55,-.05],[s*.59,.39],[s*.40,.16]],.10,graphite,w,-.14,.016);
 const slot=box(.04,.32,.022,emissive,w,s*.465,.17,-.065);slot.rotation.z=-s*.26;
}

// Reactor: concentric armored ring + luminous rotating toroids
const core=new THREE.Group();core.position.set(0,-.59,.27);blade.add(core);
const coreBack=cylinder(.37,.37,.125,metal,core,0,0,-.06,32);coreBack.rotation.x=Math.PI/2;
const coreFace=cylinder(.27,.27,.135,deep,core,0,0,.034,32);coreFace.rotation.x=Math.PI/2;
const reactorRing=torus(.300,.065,titanium,core,0,0,.106);
const ringBright=torus(.255,.019,energyMat,core,0,0,.178);
const reactorSpin=new THREE.Group();reactorSpin.position.z=.19;core.add(reactorSpin);
for(let i=0;i<8;i++){
 const a=i*Math.PI/4;
 const tick=box(.07,.038,.029,i%2===0?emissive:pale,reactorSpin,Math.cos(a)*.220,Math.sin(a)*.220,0);
 tick.rotation.z=a+Math.PI/2;
}
const reactorInner=cylinder(.145,.145,.035,emissive,core,0,0,.168,40);reactorInner.rotation.x=Math.PI/2;
const reactorIris=gem(0,0,.243,.185,energyMat,core);
const orbit1=torus(.37,.009,energySoft,core,0,0,.13);
const orbit2=torus(.42,.007,energySoft,core,0,0,.09);

// Detached energy filament above the tip. Extends during overdrive.
const overTip=new THREE.Group();overTip.position.set(0,2.72,.05);blade.add(overTip);
const tipShape=plate([[-.105,-.18],[.105,-.18],[.10,.25],[0,1.17],[-.10,.25]],.01,energySoft,overTip,.09,.006);
tube([[0,-.16,.15],[0,.31,.15],[0,.96,.12],[0,1.17,.08]],.043,energyMat,overTip);
overTip.scale.y=.20;

// ASTRA PHASE MODULE: telescoping sci-fi carbine structure hidden inside the sword.
// Purely visual fantasy components; no physical firearm engineering.
const rifleRig=new THREE.Group();blade.add(rifleRig);
const rifleMetal=new THREE.MeshStandardMaterial({color:0x3a5466,metalness:.84,roughness:.27});
const rifleDark=new THREE.MeshStandardMaterial({color:0x172733,metalness:.55,roughness:.51});
const rifleSilver=new THREE.MeshStandardMaterial({color:0x789aaa,metalness:.8,roughness:.19});
const rifleEmission=new THREE.MeshStandardMaterial({color:0x6bf4ff,emissive:0x21dfff,emissiveIntensity:.8,metalness:.20,roughness:.19});
const chamberGlassMat=new THREE.MeshPhysicalMaterial({color:0x82d9ff,transparent:true,opacity:.18,metalness:.12,roughness:.13,depthWrite:false,side:THREE.DoubleSide});
// Reinforced rear and stock: the sword hilt becomes the core's support structure.
plate([[-.29,-2.78],[.30,-2.78],[.47,-2.46],[.38,-1.30],[.22,-1.08],[-.22,-1.08],[-.37,-1.34],[-.45,-2.43]],.16,rifleMetal,rifleRig,-.04,.014);
plate([[-.17,-2.54],[.18,-2.54],[.24,-1.48],[-.24,-1.48]],.17,rifleDark,rifleRig,.09,.012);
box(.82,.18,.38,rifleDark,rifleRig,0,-2.85,.08);
box(.86,.055,.41,rifleEmission,rifleRig,0,-2.80,.09);
// Angled energy handle and decorative module under the receiver.
const sideGrip=cylinder(.15,.20,1.03,rifleDark,rifleRig,.75,-1.17,.02,14);
sideGrip.rotation.z=-Math.PI*.52;
for(let i=0;i<5;i++){
 const band=box(.09,.07,.31,i%2?rifleMetal:rifleSilver,rifleRig,.48+i*.116,-1.18,.02);
 band.rotation.z=.11;
}
plate([[.24,-.85],[.45,-1.16],[.85,-1.30],[.76,-1.07],[.42,-.67]],.16,rifleMetal,rifleRig,.02,.012);
// Main receiver and mounting rails are aligned with the sword's energy spine.
plate([[-.40,-1.17],[.35,-1.17],[.48,-.47],[.35,.37],[-.36,.37],[-.48,-.50]],.33,rifleMetal,rifleRig,.26,.03);
plate([[-.25,-1.08],[.27,-1.08],[.30,-.55],[.22,.11],[-.22,.11],[-.30,-.55]],.35,rifleDark,rifleRig,.38,.015);
for(const s of [-1,1]){
 box(.084,1.63,.12,rifleSilver,rifleRig,s*.38,.98,.36);
 box(.034,1.53,.022,rifleEmission,rifleRig,s*.435,1,.40);
 box(.065,1.47,.15,rifleDark,rifleRig,s*.28,.99,.66);
 for(let k=0;k<5;k++)box(.095,.045,.08,rifleMetal,rifleRig,s*.37,.43+k*.30,.50);
}
// Transparent nebula chamber, loosely based on the APR model's swirling reactor.
const chamberGlass=new THREE.Mesh(new THREE.CylinderGeometry(.29,.29,1.41,30,1,true),chamberGlassMat);
chamberGlass.position.set(0,1.0,.46);rifleRig.add(chamberGlass);
const chamberBack=new THREE.Mesh(new THREE.CylinderGeometry(.30,.30,.12,30),rifleMetal);
chamberBack.position.set(0,.30,.46);rifleRig.add(chamberBack);
for(const y of [.33,1.04,1.70]){
 const rim=torus(.31,.036,rifleSilver,rifleRig,0,y,.46);rim.rotation.x=Math.PI/2;
 const glowingRim=torus(.255,.022,rifleEmission,rifleRig,0,y+.047,.46);glowingRim.rotation.x=Math.PI/2;
}
const nebulaCore=new THREE.Group();nebulaCore.position.set(0,.99,.46);rifleRig.add(nebulaCore);
const innerCore=new THREE.Mesh(new THREE.CylinderGeometry(.085,.11,1.13,16),rifleEmission);nebulaCore.add(innerCore);
const nebulaPointsCount=96,nebulaPositions=new Float32Array(nebulaPointsCount*3),nebulaColors=new Float32Array(nebulaPointsCount*3);
const nebulaCyan=new THREE.Color(0x42e9ff),nebulaPurple=new THREE.Color(0xa976ff);
for(let i=0;i<nebulaPointsCount;i++){
 const f=i/nebulaPointsCount,theta=f*Math.PI*14;
 const radius=.09+Math.random()*.14;
 nebulaPositions[i*3]=Math.cos(theta)*radius;
 nebulaPositions[i*3+1]=(f-.5)*1.13;
 nebulaPositions[i*3+2]=Math.sin(theta)*radius;
 const mixed=nebulaCyan.clone().lerp(nebulaPurple,Math.random());
 nebulaColors[i*3]=mixed.r;nebulaColors[i*3+1]=mixed.g;nebulaColors[i*3+2]=mixed.b;
}
const nebulaGeometry=new THREE.BufferGeometry();
nebulaGeometry.setAttribute('position',new THREE.BufferAttribute(nebulaPositions,3));
nebulaGeometry.setAttribute('color',new THREE.BufferAttribute(nebulaColors,3));
const nebulaMaterial=new THREE.PointsMaterial({size:.006,transparent:true,opacity:.65,vertexColors:true,blending:THREE.AdditiveBlending,depthWrite:false});
const nebulaCloud=new THREE.Points(nebulaGeometry,nebulaMaterial);nebulaCore.add(nebulaCloud);
// Auxiliary sci-fi sight and floating muzzle iris, oriented along the barrel.
const sight=cylinder(.13,.13,.89,rifleDark,rifleRig,-.57,.13,.40,20);
cylinder(.155,.155,.10,rifleSilver,rifleRig,-.57,-.25,.40,20);
cylinder(.17,.17,.065,rifleEmission,rifleRig,-.57,.55,.40,20);
for(let i=0;i<3;i++)box(.06,.16,.10,rifleMetal,rifleRig,-.47,-.3+i*.25,.36);
const muzzleBase=cylinder(.27,.30,.60,rifleMetal,rifleRig,0,2.36,.46,28);
const muzzleIris=new THREE.Group();muzzleIris.position.set(0,2.68,.46);rifleRig.add(muzzleIris);
for(let k=0;k<8;k++){
 const a=k*Math.PI/4;
 const tooth=box(.075,.20,.16,k%2?rifleSilver:rifleMetal,muzzleIris,Math.cos(a)*.20,.08,Math.sin(a)*.20);
 tooth.rotation.y=a;
}
const muzzleRing=torus(.27,.043,rifleEmission,muzzleIris,0,.14,0);muzzleRing.rotation.x=Math.PI/2;
const innerMuzzleRing=torus(.15,.024,energyMat,muzzleIris,0,.20,0);innerMuzzleRing.rotation.x=Math.PI/2;


rifleRig.visible=false;rifleRig.scale.setScalar(.02);


const muzzle = new THREE.Object3D();
muzzle.position.set(0,2.90,.46);blade.add(muzzle);
assembly.scale.setScalar(.13);assembly.rotation.x=-Math.PI/2;assembly.position.z=-.18;
assembly.visible=false;
nebulaGeometry.setDrawRange(0,64);
// Readable under the arena's existing lights, without the viewer's overexposed point lights.
assembly.traverse(o=>{if(!o.isMesh)return;if(o.material.transparent)o.material.forceSinglePass=true;if(o.material.isMeshStandardMaterial&&o.material!==chamberGlassMat){o.material.metalness=Math.min(o.material.metalness,.45);o.material.roughness=Math.max(o.material.roughness,.38);}});
// Preserve articulated groups and the breathing central core; merge static parts by material.
const groups=[];assembly.traverse(o=>{if(o.isGroup)groups.push(o)});
for(const group of groups.reverse()){
 const batches=new Map();
 for(const mesh of [...group.children]){
  if(!mesh.isMesh||mesh===innerCore)continue;
  mesh.updateMatrix();
  const geometry=mesh.geometry.clone().applyMatrix4(mesh.matrix);
  const prepared=geometry.index?geometry.toNonIndexed():geometry;
  if(prepared!==geometry)geometry.dispose();
  const list=batches.get(mesh.material)||[];list.push(prepared);batches.set(mesh.material,list);
  group.remove(mesh);mesh.geometry.dispose();
 }
 for(const [material,geometries] of batches){
  const geometry=mergeGeometries(geometries,false);
  if(!geometry)throw new Error('ASTRA geometry merge failed');
  group.add(new THREE.Mesh(geometry,material));geometries.forEach(g=>g.dispose());
 }
}
let deploy=0;
const cyan=new THREE.Color(0x53dce6),purple=new THREE.Color(0xb698ff),color=new THREE.Color();
function update(dt,{active=false,charge=0,flash=0,time=0,low=false}={}){
 assembly.visible=active;
 if(!active){deploy=0;return;}
 deploy=THREE.MathUtils.lerp(deploy,1,1-Math.exp(-dt*9));
 const amount=THREE.MathUtils.clamp(charge,0,1),nova=THREE.MathUtils.smoothstep(amount,9/24,10/24),explosion=THREE.MathUtils.smoothstep(amount,23/24,1);
 color.copy(cyan).lerp(purple,amount).lerp(new THREE.Color(0xffa44b),explosion);
 for(const {w,s} of wings){
  w.position.set(s*(.145+deploy*.22+amount*.30+nova*.25+explosion*.22),-.035-deploy*.18,.015-deploy*.06);
  w.rotation.set(s*deploy*.08,s*(.04+amount*.10),-s*(.12+deploy*.10+amount*.18+nova*.26+explosion*.24));
  w.scale.y=1-deploy*.20;
 }
 for(const {g,s} of guards){g.rotation.z=-s*(.18+deploy*.18+amount*.22);g.position.x=s*(.21+deploy*.05)}
 overTip.scale.y=.10+amount*.32+nova*.34+explosion*.45;
 rifleRig.visible=deploy>.025;rifleRig.scale.setScalar(Math.max(.02,deploy));rifleRig.rotation.y=nova*.12;
 assembly.rotation.z=(1-deploy)*-.17;
 reactorSpin.rotation.z=time*(1.05+amount*1.2);
 nebulaCore.rotation.y=time*(1.1+amount*2.0);
 muzzleIris.rotation.y=time*(.6+amount*2.0);
 innerCore.scale.set(1+Math.sin(time*6)*.06,1,1+Math.cos(time*6)*.06);
 for(const material of [energyMat,energySoft,emissive,rifleEmission])material.color.copy(color);
 for(const material of [emissive,rifleEmission]){material.emissive.copy(color);material.emissiveIntensity=.65+amount*.4+Math.min(flash,.15)*2;}
 energyMat.opacity=.42+amount*.12;energySoft.opacity=.08+amount*.08;
 nebulaGeometry.setDrawRange(0,low?40:64);
}
return {root:assembly,muzzle,update};
}
