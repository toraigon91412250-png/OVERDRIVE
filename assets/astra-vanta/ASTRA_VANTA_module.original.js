
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// Everything except the Three.js CDN imports is contained in this HTML file.
const $ = sel => document.querySelector(sel);
const container = $('#viewport');
const mobile = matchMedia('(max-width: 680px)').matches;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050a14);
scene.fog = new THREE.FogExp2(0x050a14, .043);
const camera = new THREE.PerspectiveCamera(mobile?45:42, innerWidth/innerHeight, .1, 110);
const startCamera = mobile ? [4.3,1.75,13.6] : [5.0,2.15,13.9];
const startTarget = new THREE.Vector3(0,mobile?-.55:-.80,0);
camera.position.set(...startCamera);
let renderer;
try { renderer = new THREE.WebGLRenderer({antialias:!mobile,alpha:false,powerPreference:'high-performance'}); }
catch(e){ $('#loading .loading-msg').textContent='WEBGL UNAVAILABLE'; $('#error').style.display='block'; throw e; }
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio||1,mobile?1.4:1.8));
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.30;
container.appendChild(renderer.domElement);
const controls = new OrbitControls(camera,renderer.domElement);
controls.target.copy(startTarget);controls.enableDamping=true;controls.dampingFactor=.065;controls.enablePan=false;
controls.minDistance=5.3;controls.maxDistance=16;controls.maxPolarAngle=Math.PI*.91;
controls.rotateSpeed=.7;controls.zoomSpeed=.9;controls.update();
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),mobile?.82:1.13,.62,.22);
composer.addPass(bloom);
composer.addPass(new OutputPass());
composer.setPixelRatio(Math.min(devicePixelRatio||1,mobile?1.4:1.8));

scene.add(new THREE.HemisphereLight(0x9fcfff,0x0a1023,2.0));
const key = new THREE.DirectionalLight(0xc4eaff,3.8); key.position.set(3,6,5); scene.add(key);
const rim = new THREE.DirectionalLight(0x5263ff,2.8);rim.position.set(-5,2,-5);scene.add(rim);
const front = new THREE.PointLight(0x26e5ff,18,7,1.5);front.position.set(0,.1,2.1);scene.add(front);
const rear = new THREE.PointLight(0x8470ff,8,7,1.5);rear.position.set(1,2,-3);scene.add(rear);

const metal = new THREE.MeshStandardMaterial({color:0x263747,metalness:.78,roughness:.28});
const graphite = new THREE.MeshStandardMaterial({color:0x0c1424,metalness:.53,roughness:.40});
const titanium = new THREE.MeshStandardMaterial({color:0x6b8aa1,metalness:.73,roughness:.22});
const pale = new THREE.MeshStandardMaterial({color:0xa9c8d4,metalness:.66,roughness:.19});
const deep = new THREE.MeshStandardMaterial({color:0x101a2c,metalness:.64,roughness:.32});
const edgeMat = new THREE.MeshStandardMaterial({color:0x87bfca,emissive:0x24758f,emissiveIntensity:.20,metalness:.52,roughness:.25});
const energyMat = new THREE.MeshBasicMaterial({color:0x36edff,transparent:true,opacity:.88,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
const energySoft = new THREE.MeshBasicMaterial({color:0x36edff,transparent:true,opacity:.27,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
const emissive = new THREE.MeshStandardMaterial({color:0x3bdff0,emissive:0x17daff,emissiveIntensity:2.1,metalness:.28,roughness:.23});
const orange = new THREE.MeshBasicMaterial({color:0xff6eaa,transparent:true,opacity:.84,blending:THREE.AdditiveBlending,depthWrite:false});
const emissiveMaterials=[energyMat,energySoft,emissive];
const assembly = new THREE.Group();scene.add(assembly);
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
 const mesh=new THREE.Mesh(new THREE.TubeGeometry(path,Math.max(12,coords.length*8),rad,6,closed),mat);parent.add(mesh);return mesh;
}
function torus(radius,thick,mat,parent,x=0,y=0,z=0){const m=new THREE.Mesh(new THREE.TorusGeometry(radius,thick,7,64),mat);m.position.set(x,y,z);parent.add(m);return m}
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

// Holographic halo sprite, softened additive glow.
function glowTexture(){
 const c=document.createElement('canvas');c.width=c.height=128;const cx=c.getContext('2d');
 const g=cx.createRadialGradient(64,64,2,64,64,64);
 g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.08,'rgba(197,250,255,.86)');g.addColorStop(.31,'rgba(73,226,255,.29)');g.addColorStop(1,'rgba(20,90,220,0)');
 cx.fillStyle=g;cx.fillRect(0,0,128,128);return new THREE.CanvasTexture(c);
}
const glowTex=glowTexture();
function aura(parent,x,y,z,size,opacity){const sm=new THREE.SpriteMaterial({map:glowTex,color:0x36edff,transparent:true,opacity,blending:THREE.AdditiveBlending,depthWrite:false});const spr=new THREE.Sprite(sm);spr.position.set(x,y,z);spr.scale.set(size,size,1);parent.add(spr);return spr}
const coreAura=aura(blade,0,-.59,.47,1.6,.58);
const tipAura=aura(blade,0,3.20,.13,.54,.39);
const bladeAura=aura(blade,0,1.12,.0,1.05,.17);


// ASTRA PHASE MODULE: telescoping sci-fi carbine structure hidden inside the sword.
// Purely visual fantasy components; no physical firearm engineering.
const rifleRig=new THREE.Group();blade.add(rifleRig);
const rifleMetal=new THREE.MeshStandardMaterial({color:0x24394b,metalness:.84,roughness:.27});
const rifleDark=new THREE.MeshStandardMaterial({color:0x0b1424,metalness:.55,roughness:.51});
const rifleSilver=new THREE.MeshStandardMaterial({color:0x789aaa,metalness:.8,roughness:.19});
const rifleEmission=new THREE.MeshStandardMaterial({color:0x6bf4ff,emissive:0x21dfff,emissiveIntensity:2.6,metalness:.20,roughness:.19});
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
const nebulaPointsCount=260,nebulaPositions=new Float32Array(nebulaPointsCount*3),nebulaColors=new Float32Array(nebulaPointsCount*3);
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
const nebulaMaterial=new THREE.PointsMaterial({size:.044,transparent:true,opacity:.95,vertexColors:true,blending:THREE.AdditiveBlending,depthWrite:false});
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
const rifleAura=aura(rifleRig,0,1.03,.76,1.20,.47);
const muzzleAura=aura(rifleRig,0,2.90,.49,.68,.36);
rifleRig.visible=false;rifleRig.scale.setScalar(.02);

// Arc particles around the reactor and morphing panels
const count=120,positions=new Float32Array(count*3),speeds=[],seeds=[];
for(let i=0;i<count;i++){seeds.push(Math.random()*Math.PI*2);speeds.push(.13+Math.random()*.34)}
const geoParticles=new THREE.BufferGeometry();geoParticles.setAttribute('position',new THREE.BufferAttribute(positions,3));
const particleMat=new THREE.PointsMaterial({color:0x49f6ff,size:.047,transparent:true,opacity:.74,blending:THREE.AdditiveBlending,depthWrite:false,sizeAttenuation:true});
const particleMesh=new THREE.Points(geoParticles,particleMat);assembly.add(particleMesh);
const starsPos=new Float32Array(350*3);
for(let i=0;i<350;i++){
 const a=Math.random()*Math.PI*2,rad=9+Math.random()*35;
 starsPos[3*i]=Math.cos(a)*rad;starsPos[3*i+1]=(Math.random()-.5)*30;starsPos[3*i+2]=Math.sin(a)*rad;
}
const starGeo=new THREE.BufferGeometry();starGeo.setAttribute('position',new THREE.BufferAttribute(starsPos,3));
scene.add(new THREE.Points(starGeo,new THREE.PointsMaterial({color:0x5b9ab1,size:.028,transparent:true,opacity:.46,depthWrite:false})));

// Docking arena hologram
const stage=new THREE.Group();scene.add(stage);
const ringMat=new THREE.MeshBasicMaterial({color:0x1b88ab,transparent:true,opacity:.35,blending:THREE.AdditiveBlending,depthWrite:false});
const stageGlow=new THREE.MeshBasicMaterial({color:0x2caacc,transparent:true,opacity:.11,blending:THREE.AdditiveBlending,depthWrite:false});
for(const [radius,t,mat] of [[1.70,.012,ringMat],[2.35,.012,ringMat],[2.49,.008,stageGlow]]){const r=torus(radius,t,mat,stage,0,-3.24,0);r.rotation.x=Math.PI/2;}
for(let i=0;i<60;i++){
 const a=(i/60)*Math.PI*2,r=2.38;const tick=box(i%5===0?.045:.018,.009,i%5===0?.22:.09,ringMat,stage,Math.sin(a)*r,-3.235,Math.cos(a)*r);tick.rotation.y=a;
}
for(let i=0;i<8;i++){
 const a=i*Math.PI/4;const line=box(.012,.008,.79,stageGlow,stage,Math.sin(a)*1.12,-3.24,Math.cos(a)*1.12);line.rotation.y=a;
}
const grid=new THREE.GridHelper(27,32,0x174660,0x12344a);grid.position.y=-3.27;grid.material.transparent=true;grid.material.opacity=.16;scene.add(grid);
const floorGlow=aura(stage,0,-3.13,0,3.4,.19);floorGlow.material.rotation=Math.PI/2;

const modes=[
 {name:'収束形態',en:'01 // CORE CONFIG',desc:'磁気装甲を中心軸に固定。<br/>星雲炉の出力を位相刃へ集中。',color:0x39e9ff,rgb:'57,233,255',angle:0,spread:0,guard:0,tip:.2,rifle:0},
 {name:'分離形態',en:'02 // TWIN CONFIG',desc:'左右の位相刃を展開。<br/>2本の光脈が星雲コアへ接続。',color:0xa389ff,rgb:'163,137,255',angle:.16,spread:.38,guard:.28,tip:.60,rifle:0},
 {name:'星雲砲形態',en:'03 // ASTRAL RIFLE',desc:'刀身を90°回転、銃身を展開。<br/>通常光弾と星雲チャージ砲を切替。',color:0x39edfc,rgb:'57,237,252',angle:.10,spread:.16,guard:.23,tip:.12,rifle:1},
 {name:'過負荷形態',en:'04 // NOVA OVERDRIVE',desc:'両翼を最大展開。<br/>星雲炉の全出力で位相刃が発光。',color:0xff79b7,rgb:'255,121,183',angle:.29,spread:.70,guard:.47,tip:1.14,rifle:0}
];
let targetMode=0,power=.85,autoSpin=true,autoMorph=false,burst=0,lastModeSwitch=0;
let isCharged=false,rifleBlend=0,recoil=0,shotCooldown=0;
let toastTimer;
const shots=[];
const shotYAxis=new THREE.Vector3(0,1,0);
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1500)}
function paintAccent(){
 const m=modes[targetMode],color=(targetMode===2&&isCharged)?0xb68bff:m.color;
 const r=(color>>16)&255,g=(color>>8)&255,b=color&255;
 document.documentElement.style.setProperty('--accent','#'+color.toString(16).padStart(6,'0'));
 document.documentElement.style.setProperty('--accent-rgb',`${r},${g},${b}`);
}
function setMode(index,quiet=false){
 if(index<0||index>=modes.length||index===targetMode&&!quiet)return;
 targetMode=index;const m=modes[index];paintAccent();
 document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.mode===index)));
 $('#stateEN').textContent=m.en;$('#stateJP').textContent=m.name;$('#stateDesc').innerHTML=m.desc;
 $('#hudLock').textContent=index===0?'ENGAGED':index===1?'RELEASED':index===2?'RECONFIGURED':'OVERRIDE';
 $('#hudMeter').style.width=([68,83,91,99][index])+'%';
 $('#hudOutput').textContent=index===2?(isCharged?'ASTRAL CHARGE':'PHASE BOLT'):(index===3?'NOVA IMPULSE':'BLADE WAVE');
 $('#fireBtn').textContent=index===2?'◎ FIRE / 発射':'✦ エネルギー放出';
 if(!quiet)toast(['CORE : LOCKED','TWIN BLADES : DEPLOYED','ASTRAL RIFLE : ONLINE','NOVA PROTOCOL : ONLINE'][index]);
 burst=Math.max(burst,index===0?.3:.65);lastModeSwitch=elapsed;
}
function setCharge(){
 isCharged=!isCharged;
 $('#chargeBtn').setAttribute('aria-pressed',String(isCharged));
 $('#chargeBtn').textContent=isCharged?'◈ CHARGED':'◈ CHARGE OFF';
 paintAccent();
 if(targetMode===2)$('#hudOutput').textContent=isCharged?'ASTRAL CHARGE':'PHASE BOLT';
 toast(isCharged?'NEBULA CORE : OVERCHARGED':'CORE : STANDARD OUTPUT');
 burst=Math.max(burst,.5);
}
function disposeEffect(group){
 group.traverse(node=>{
  if(node.geometry)node.geometry.dispose();
  if(node.material){for(const mat of (Array.isArray(node.material)?node.material:[node.material]))mat.dispose();}
 });
 scene.remove(group);
}
function fireWeapon(){
 if(shotCooldown>0)return;
 shotCooldown=.22;
 burst=isCharged?3.25:2.30;
 if(targetMode!==2){toast(isCharged?'◈ CHARGED PHASE WAVE':'✦ PHASE ENERGY DISCHARGE');return;}
 // Transform the fictional muzzle's point and axis through the actual model matrix.
 scene.updateMatrixWorld(true);
 const pos=blade.localToWorld(new THREE.Vector3(0,2.90,.46));
 const axis=new THREE.Vector3(0,1,0).transformDirection(blade.matrixWorld).normalize();
 const fx=new THREE.Group();fx.position.copy(pos);fx.quaternion.setFromUnitVectors(shotYAxis,axis);
 const purple=isCharged,bright=purple?0xd5b7ff:0xbaffff,halo=purple?0xb580ff:0x36edff;
 const materials=[];
 function brightMesh(geo,hex,opacity=1){
  const mat=new THREE.MeshBasicMaterial({color:hex,transparent:true,opacity,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
  materials.push({mat,opacity});const mesh=new THREE.Mesh(geo,mat);fx.add(mesh);return mesh;
 }
 const flash=brightMesh(new THREE.SphereGeometry(purple?.29:.19,14,10),bright,.94);flash.position.y=.15;
 if(purple){
  const beam=brightMesh(new THREE.CylinderGeometry(.055,.12,12,14),bright,.88);beam.position.y=6.0;
  const spiralPoints=[];
  for(let i=0;i<=85;i++){
   const f=i/85,angle=f*Math.PI*17,r=.10+f*.27;
   spiralPoints.push(new THREE.Vector3(Math.cos(angle)*r,f*12,Math.sin(angle)*r));
  }
  const arc=brightMesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(spiralPoints),120,.037,7,false),halo,.91);
  const positions=new Float32Array(66*3);
  for(let i=0;i<66;i++){
   const r=Math.random()*.46,angle=Math.random()*Math.PI*2;
   positions[i*3]=Math.cos(angle)*r;positions[i*3+1]=Math.random()*12;positions[i*3+2]=Math.sin(angle)*r;
  }
  const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(positions,3));
  const pm=new THREE.PointsMaterial({color:halo,size:.095,transparent:true,opacity:.88,blending:THREE.AdditiveBlending,depthWrite:false});
  fx.add(new THREE.Points(pg,pm));materials.push({mat:pm,opacity:.88});
  shots.push({group:fx,direction:axis,life:.72,maxLife:.72,materials,kind:'beam'});
  recoil=.36;toast('ASTRAL WARP BEAM');
 }else{
  const orb=brightMesh(new THREE.SphereGeometry(.13,16,12),bright,1);orb.position.y=.58;
  const trail=brightMesh(new THREE.CylinderGeometry(.10,.015,1.1,12),halo,.78);trail.position.y=.04;
  shots.push({group:fx,direction:axis,life:1.05,maxLife:1.05,materials,kind:'bolt'});
  recoil=.16;toast('PHASE BOLT');
 }
 // Prevent long sessions from retaining excessive transient visual effects.
 scene.add(fx);
 while(shots.length>14){disposeEffect(shots.shift().group);}
}
$('.modes').addEventListener('click',e=>{const btn=e.target.closest('[data-mode]');if(btn)setMode(+btn.dataset.mode)});
$('#energy').addEventListener('input',e=>{power=+e.target.value/100;$('#energyLabel').textContent=e.target.value+'%';$('#hudPower').textContent=(power*100).toFixed(1).padStart(5,'0')+' %'});
$('#rotateBtn').addEventListener('click',()=>{autoSpin=!autoSpin;$('#rotateBtn').setAttribute('aria-pressed',String(autoSpin));$('#rotateBtn').textContent=autoSpin?'⟳ 自動回転 ON':'⟳ 自動回転 OFF';toast(autoSpin?'AUTO ROTATION ENABLED':'ROTATION PAUSED')});
$('#autoBtn').addEventListener('click',()=>{autoMorph=!autoMorph;$('#autoBtn').setAttribute('aria-pressed',String(autoMorph));$('#autoBtn').textContent=autoMorph?'↔ 自動変形 ON':'↔ 自動変形';lastModeSwitch=elapsed;toast(autoMorph?'AUTO MORPH ACTIVE':'AUTO MORPH STOPPED')});
$('#resetBtn').addEventListener('click',()=>{camera.position.set(...startCamera);controls.target.copy(startTarget);controls.update();assembly.rotation.y=0;toast('CAMERA RECENTERED')});
$('#chargeBtn').addEventListener('click',setCharge);
$('#fireBtn').addEventListener('click',fireWeapon);
window.addEventListener('keydown',e=>{
 if(['1','2','3','4'].includes(e.key))setMode(+e.key-1);
 if(e.code==='Space'&&!['INPUT','BUTTON'].includes(document.activeElement.tagName)){e.preventDefault();fireWeapon()}
 if(e.key.toLowerCase()==='c'&&e.code!=='Space')setCharge();
 if(e.key.toLowerCase()==='r')$('#resetBtn').click();
});
let dragging=false;
renderer.domElement.addEventListener('pointerdown',()=>dragging=true);
renderer.domElement.addEventListener('pointerup',()=>dragging=false);
renderer.domElement.addEventListener('pointercancel',()=>dragging=false);

let currentAngle=0,currentSpread=0,currentGuard=0,currentTip=.20,currentHue=new THREE.Color(modes[0].color);
const clock=new THREE.Clock();let elapsed=0;
const targetColor=new THREE.Color();
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
function animate(){
 const dt=Math.min(clock.getDelta(),.06),t=elapsed+=dt;
 requestAnimationFrame(animate);
 if(autoMorph&&t-lastModeSwitch>6.0)setMode((targetMode+1)%modes.length);
 const m=modes[targetMode],smooth=1-Math.exp(-dt*3.2);
 rifleBlend=THREE.MathUtils.lerp(rifleBlend,m.rifle,smooth*.90);
 currentAngle=THREE.MathUtils.lerp(currentAngle,m.angle,smooth);
 currentSpread=THREE.MathUtils.lerp(currentSpread,m.spread,smooth);
 currentGuard=THREE.MathUtils.lerp(currentGuard,m.guard,smooth);
 currentTip=THREE.MathUtils.lerp(currentTip,m.tip,smooth);
 currentHue.lerp(targetColor.setHex(targetMode===2&&isCharged?0xb68bff:m.color),1-Math.exp(-dt*2.5));
 // Existing side blades physically move to shroud the revealed nebula cannon.
 for(const {w,s} of wings){
  w.position.x=s*(.145+currentSpread+rifleBlend*.14);
  w.position.y=-.035-rifleBlend*.35;
  w.position.z=.015+currentSpread*.11-rifleBlend*.09;
  w.rotation.z=-s*(currentAngle+rifleBlend*.18);
  w.rotation.y=s*(currentAngle*.22+rifleBlend*.13);
  w.rotation.x=s*rifleBlend*.16;
  w.scale.y=1-rifleBlend*.29;
 }
 for(const {g,s} of guards){g.rotation.z=-s*(currentGuard+rifleBlend*.31);g.position.x=s*(.21+currentSpread*.13+rifleBlend*.13)}
 overTip.scale.y=currentTip*(1-rifleBlend*.95);
 overTip.position.y=2.72+currentSpread*.08;
 // Blade becomes the same horizontal hybrid frame, not a separate swapped model.
 blade.rotation.z=-Math.PI*.5*rifleBlend+Math.sin(t*.48)*.012*(1-rifleBlend);
 blade.position.y=Math.sin(t*1.2)*.095*(1-rifleBlend)-.10*rifleBlend;
 recoil*=Math.exp(-dt*12);
 blade.position.x=-recoil*rifleBlend;
 blade.scale.setScalar(1-rifleBlend*(mobile?.34:.08));
 rifleRig.scale.setScalar(Math.max(.002,rifleBlend));
 rifleRig.visible=rifleBlend>.015;
 rifleRig.position.y=Math.sin(t*2.8)*.012*rifleBlend;
 if(autoSpin&&!dragging)assembly.rotation.y+=dt*(reducedMotion?.018:.12);
 reactorSpin.rotation.z+=dt*(1.05+currentSpread);
 orbit1.rotation.z=t*.63;orbit2.rotation.z=-t*.44;
 nebulaCore.rotation.y+=dt*(isCharged?3.9:1.0);
 nebulaCloud.rotation.y=t*(isCharged?3.7:1.3);
 muzzleIris.rotation.y=t*(isCharged?2.8:.8);
 const beat=.8+Math.sin(t*(2.5+targetMode))*.20;
 burst=Math.max(0,burst-dt*1.6);
 shotCooldown=Math.max(0,shotCooldown-dt);
 const boost=burst*1.25;
 const intensity=power*(.82+beat*.17)+boost;
 emissiveMaterials[0].color.copy(currentHue);
 emissiveMaterials[1].color.copy(currentHue);
 emissive.color.copy(currentHue).multiplyScalar(.83);
 emissive.emissive.copy(currentHue);
 emissive.emissiveIntensity=1.4+intensity*1.7;
 energyMat.opacity=clamp(.45+.45*power+boost*.13,.23,1);
 energySoft.opacity=clamp(.11+.20*power+boost*.11,.09,.7);
 coreAura.material.color.copy(currentHue);coreAura.material.opacity=clamp(.35+.18*intensity,.25,.92);
 coreAura.scale.setScalar(1.35+beat*.17+boost*.46);
 tipAura.material.color.copy(currentHue);tipAura.material.opacity=.30+power*.16;
 bladeAura.material.color.copy(currentHue);bladeAura.material.opacity=clamp(.08+power*.085+boost*.055,.06,.35);
 ringBright.material.color.copy(currentHue);
 front.color.copy(currentHue);front.intensity=10+power*8+boost*9;
 rear.intensity=6+power*3;
 particleMat.color.copy(currentHue);particleMat.opacity=.30+power*.48;
 // Rifle's reactor inherits the blade's color pipeline and charged output.
 rifleEmission.color.copy(currentHue).multiplyScalar(.86);
 rifleEmission.emissive.copy(currentHue);
 rifleEmission.emissiveIntensity=1.7+power*2+boost;
 rifleAura.material.color.copy(currentHue);
 rifleAura.material.opacity=clamp(.31+power*.25+boost*.10,.18,.95);
 muzzleAura.material.color.copy(currentHue);
 muzzleAura.material.opacity=clamp(.26+power*.17+boost*.13,.16,.95);
 innerCore.scale.set(1+Math.sin(t*6)*.08,1,1+Math.cos(t*6)*.08);
 const visibleParticles=Math.round(count*(.23+power*.54+(currentSpread/.7)*.22));
 geoParticles.setDrawRange(0,Math.min(count,visibleParticles));
 for(let i=0;i<count;i++){
  const a=t*(.30+speeds[i])+seeds[i],r=.35+(i%9)*.11+currentSpread*.43;
  const f=i/count;
  positions[i*3]=Math.sin(a*2.5+i)*r;
  positions[i*3+1]=(-1.10+((t*(.18+speeds[i]*.7)+f*5.7)%5.4))+.06*Math.cos(a*3);
  positions[i*3+2]=Math.cos(a*2.5+i)*(.25+r*.45);
 }
 geoParticles.attributes.position.needsUpdate=true;
 for(let i=shots.length-1;i>=0;i--){
  const shot=shots[i];shot.life-=dt;
  const f=clamp(shot.life/shot.maxLife,0,1);
  shot.materials.forEach(({mat,opacity})=>mat.opacity=opacity*(shot.kind==='beam'?f*f:f));
  if(shot.kind==='bolt')shot.group.position.addScaledVector(shot.direction,dt*17);
  else shot.group.scale.set(1+(1-f)*.7,1,1+(1-f)*.7);
  if(shot.life<=0){disposeEffect(shot.group);shots.splice(i,1)}
 }
 stage.rotation.y=-assembly.rotation.y*.17;
 controls.update();
 composer.render();
}
function resize(){const w=container.clientWidth,h=container.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);composer.setSize(w,h);bloom.setSize(w,h)}
window.addEventListener('resize',resize,{passive:true});
setMode(0,true);
resize();
$('#loading').style.opacity='0';setTimeout(()=>$('#loading').remove(),600);
animate();
