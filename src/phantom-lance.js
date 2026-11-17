import * as T from 'three';

// PHANTOM LANCE 07: procedural model adapted from the supplied independent prototype.
// Static armor is merged by material; only the core, collars, and muzzle flash animate.
const worldUp = new T.Vector3(0,1,0);
const vec = (x=0,y=0,z=0)=>new T.Vector3(x,y,z);
const M = {
  carbon: new T.MeshStandardMaterial({color:0x151c28,metalness:.72,roughness:.43}),
  steel: new T.MeshStandardMaterial({color:0x283848,metalness:.87,roughness:.33}),
  titanium: new T.MeshStandardMaterial({color:0x596b80,metalness:.83,roughness:.29}),
  charcoal: new T.MeshStandardMaterial({color:0x0b111c,metalness:.66,roughness:.45}),
  edge: new T.MeshStandardMaterial({color:0x9fc3d2,metalness:.86,roughness:.26}),
  brass: new T.MeshStandardMaterial({color:0xb7784d,metalness:.8,roughness:.3}),
  cyan: new T.MeshStandardMaterial({color:0x2ebbd6,emissive:0x1bdbfa,emissiveIntensity:2.2,metalness:.37,roughness:.23}),
  ice: new T.MeshBasicMaterial({color:0x92f7ff}),
  amber: new T.MeshStandardMaterial({color:0xe4984d,emissive:0xff711b,emissiveIntensity:2.3,metalness:.4,roughness:.22}),
  glass: new T.MeshPhysicalMaterial({color:0x0b5374,emissive:0x065374,emissiveIntensity:.5,metalness:.6,roughness:.07,clearcoat:1,clearcoatRoughness:.05,transparent:true,opacity:.91,side:T.DoubleSide}),
  darkglass: new T.MeshPhysicalMaterial({color:0x092338,emissive:0x086a82,emissiveIntensity:.25,metalness:.4,roughness:.13,clearcoat:.9,transparent:true,opacity:.85,side:T.DoubleSide}),
  floor: new T.MeshStandardMaterial({color:0x101c2b,metalness:.43,roughness:.73}),
  floor2: new T.MeshStandardMaterial({color:0x182a38,metalness:.56,roughness:.63}),
  building: new T.MeshStandardMaterial({color:0x10202e,metalness:.65,roughness:.52}),
  cyanBasic: new T.MeshBasicMaterial({color:0x41dbfc}),
  orangeBasic: new T.MeshBasicMaterial({color:0xff894f}),
};
const G = {
  unitBox: new T.BoxGeometry(1,1,1),
  sphere: new T.SphereGeometry(1,16,12),
  ico: new T.IcosahedronGeometry(1,1),
};
function mesh(parent, geometry, material, position, rotation, scale) {
  const o=new T.Mesh(geometry,material);
  if(position)o.position.set(...position);
  if(rotation)o.rotation.set(...rotation);
  if(scale)o.scale.set(...scale);
  parent.add(o);return o;
}
function box(parent, material, x,y,z,w,h,d,rx=0,ry=0,rz=0){return mesh(parent,G.unitBox,material,[x,y,z],[rx,ry,rz],[w,h,d]);}
function cyl(parent, material, x,y,z, rt,rb,h, radial=16,rotX=0,rotY=0,rotZ=0){return mesh(parent,new T.CylinderGeometry(rt,rb,h,radial),material,[x,y,z],[rotX,rotY,rotZ]);}
function tubeZ(parent,material,x,y,z,r,len,radial=18){return cyl(parent,material,x,y,z,r,r,len,radial,Math.PI/2);}
function ringZ(parent,material,x,y,z,r,tube=.035){return mesh(parent,new T.TorusGeometry(r,tube,8,48),material,[x,y,z]);}
function rod(parent, material, a, b, radius=.025, radial=9){
  const vA=vec(...a),vB=vec(...b),dir=vB.clone().sub(vA);
  const o=mesh(parent,new T.CylinderGeometry(radius,radius,dir.length(),radial),material,[(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2]);
  o.quaternion.setFromUnitVectors(worldUp,dir.normalize());return o;
}
function prismSide(parent, points, width, material, xoffset=0, bevel=.025){
  const s=new T.Shape();points.forEach(([z,y],i)=> i?s.lineTo(-z,y):s.moveTo(-z,y));s.closePath();
  const g=new T.ExtrudeGeometry(s,{depth:width,bevelEnabled:bevel>0,bevelThickness:bevel,bevelSize:bevel,bevelSegments:2,steps:1,curveSegments:1});
  g.rotateY(Math.PI/2);
  const o=mesh(parent,g,material,[xoffset-width/2,0,0]);return o;
}
function decalTexture(title,sub,color='#94edff'){
  const c=document.createElement('canvas');c.width=512;c.height=128;const cx=c.getContext('2d');
  cx.clearRect(0,0,512,128);cx.fillStyle='rgba(3,14,23,.75)';cx.fillRect(4,8,504,112);
  cx.strokeStyle=color;cx.lineWidth=3;cx.strokeRect(7,11,498,106);
  cx.font='bold 58px monospace';cx.fillStyle=color;cx.fillText(title,27,72);
  cx.font='20px monospace';cx.fillStyle='#aacad9';cx.fillText(sub,30,102);
  const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;
}
// Soft procedural emissive halos. Created at runtime, so no texture downloads are needed.
const haloCanvas=document.createElement('canvas');haloCanvas.width=128;haloCanvas.height=128;
const haloCtx=haloCanvas.getContext('2d');
const haloGradient=haloCtx.createRadialGradient(64,64,0,64,64,64);
haloGradient.addColorStop(0,'rgba(255,255,255,0.9)');
haloGradient.addColorStop(.15,'rgba(255,255,255,0.48)');
haloGradient.addColorStop(.4,'rgba(255,255,255,0.14)');
haloGradient.addColorStop(1,'rgba(255,255,255,0)');
haloCtx.fillStyle=haloGradient;haloCtx.fillRect(0,0,128,128);
const haloTexture=new T.CanvasTexture(haloCanvas);
function halo(parent,color,x,y,z,sx,sy=sx){
  const material=new T.SpriteMaterial({map:haloTexture,color,transparent:true,opacity:.6,blending:T.AdditiveBlending,depthWrite:false,depthTest:true});
  const sprite=new T.Sprite(material);sprite.position.set(x,y,z);sprite.scale.set(sx,sy,1);parent.add(sprite);return sprite;
}

export function createPhantomLance(parent) {
  const root=new T.Group(), weaponChassis=new T.Group();
  root.name='PHANTOM LANCE / 07';
  root.visible=false;
  parent.add(root);root.add(weaponChassis);
  const gunAnimation={scopeDial:null,rotors:[],powerCore:null,muzzle:null,flashObject:null};
function buildWeapon(){
  const w=weaponChassis;
  // Rigid exoskeleton receiver: layered chamfered plating.
  prismSide(w,[[-.85,-.12],[-.65,-.24],[.37,-.25],[.78,-.12],[.96,.07],[.61,.27],[-.61,.27]],.40,M.carbon,0,.046);
  prismSide(w,[[-.83,-.065],[-.61,-.17],[.29,-.17],[.62,-.07],[.7,.18],[-.58,.18]],.34,M.steel,0,.016);
  for (const sign of [-1,1]) {
    prismSide(w,[[-.68,.11],[-.44,.19],[.36,.19],[.64,.09],[.25,-.035],[-.52,-.035]],.035,M.titanium,sign*.225,.018);
    prismSide(w,[[-.58,-.11],[-.44,-.18],[.28,-.18],[.53,-.09],[.12,-.08]],.023,M.charcoal,sign*.253,.009);
    // Frame cuts, bolts, fins, illuminated receiver stripes.
    for(let i=0;i<4;i++){
      const z=.20-i*.26;
      box(w,M.charcoal,sign*.259,.137,z,.016,.07,.065,0,-.16,0);
      box(w,M.cyan,sign*.27,.092,z,.012,.018,.12);
    }
    for(let j=0;j<5;j++){
      const z=.45-j*.25;
      cyl(w,M.edge,sign*.29,-.04,z,.025,.025,.012,8,0,0,Math.PI/2);
    }
    // Side running stabilizer rods, structural rail segments.
    rod(w,M.titanium,[sign*.23,-.125,.56],[sign*.31,-.125,-1.50],.035);
    rod(w,M.charcoal,[sign*.20,.235,.42],[sign*.21,.23,-1.72],.053);
    box(w,M.cyan,sign*.225,.247,-.45,.017,.012,1.65);
  }
  // Energy core and illuminated open ventilation cradle.
  const cradle=new T.Group();w.add(cradle);cradle.position.set(0,-.04,-.29);
  box(cradle,M.charcoal,0,.02,0,.49,.19,.61);
  for(let i=0;i<4;i++){
    box(cradle,M.titanium,0,.15,-.25+i*.155,.58,.037,.068);
    box(cradle,M.charcoal,0,-.095,-.25+i*.155,.57,.028,.07);
  }
  const core=mesh(cradle,new T.OctahedronGeometry(.15,0),M.cyan,[0,.03,0],null,[1.05,1.25,1.3]);
  gunAnimation.powerCore=core;
  halo(cradle,0x22ccff,0,.03,.01,.63);
  ringZ(cradle,M.edge,0,.03,-.25,.16,.028);ringZ(cradle,M.edge,0,.03,.23,.16,.028);
  // Shoulder stock, open lattice with cheek rest and carbon butt pad.
  rod(w,M.titanium,[-.16,.08,.67],[-.19,.13,1.60],.05);
  rod(w,M.titanium,[ .16,.08,.67],[ .19,.13,1.60],.05);
  rod(w,M.steel,[-.15,-.14,.62],[-.16,-.16,1.51],.041);
  rod(w,M.steel,[ .15,-.14,.62],[ .16,-.16,1.51],.041);
  rod(w,M.titanium,[ -.18,.11,1.17],[ -.16,-.13,1.53],.026);
  rod(w,M.titanium,[  .18,.11,1.17],[  .16,-.13,1.53],.026);
  box(w,M.carbon,0,.215,1.06,.35,.115,.75,0,0,0);
  box(w,M.titanium,0,.289,1.05,.27,.034,.59);
  box(w,M.charcoal,0,-.03,1.61,.56,.49,.16);
  box(w,M.steel,0,-.03,1.72,.62,.52,.15);
  box(w,M.carbon,0,-.03,1.815,.66,.54,.12);
  for(const sign of [-1,1]){
    box(w,M.titanium,sign*.29,.04,1.74,.04,.30,.09);
    box(w,M.cyan,sign*.329,-.14,1.72,.012,.085,.09);
  }
  // Front grip and energy cartridge. Purely fictional interface details.
  box(w,M.charcoal,0,-.48,.48,.25,.58,.34,-.22);
  box(w,M.steel,0,-.57,.52,.29,.27,.36,-.22);
  for(let i=0;i<5;i++)box(w,M.titanium,0,-.31-i*.08,.68,.28,.013,.035,-.2);
  const triggerGuard=mesh(w,new T.TorusGeometry(.185,.027,8,24),M.titanium,[0,-.37,.23],[0,Math.PI/2,0]);
  triggerGuard.scale.set(.7,1.25,1);
  box(w,M.charcoal,0,-.40,-.14,.36,.42,.41,-.21);
  box(w,M.steel,0,-.57,-.21,.35,.35,.32,-.19);
  box(w,M.cyan,0,-.61,-.335,.25,.12,.025);
  box(w,M.brass,0,-.74,-.195,.36,.04,.26,-.18);
  for(const s of [-1,1])box(w,M.amber,s*.187,-.50,-.18,.012,.18,.20,-.19);
  // Main shrouded barrel and magnetic rail channels.
  tubeZ(w,M.charcoal,0,.065,-1.68,.205,2.45,24);
  tubeZ(w,M.steel,0,.065,-1.73,.143,2.67,20);
  tubeZ(w,M.charcoal,0,.065,-1.95,.09,2.6,16);
  for(let i=0;i<9;i++){
    const z=-.98-i*.235;
    const major=i%3===0;
    ringZ(w,major?M.titanium:M.steel,0,.065,z,major?.221:.207,major?.034:.019);
    for(const sign of [-1,1]){
      box(w,M.carbon,sign*.203,.065,z,.074,.17,.15);
      box(w,M.cyan,sign*.246,.065,z,.014,.013,.097);
    }
  }
  for(const sign of [-1,1]){
    rod(w,M.titanium,[sign*.31,.08,-.71],[sign*.31,.08,-2.75],.029);
    rod(w,M.charcoal,[sign*.272,-.08,-.84],[sign*.272,-.08,-2.65],.034);
    for(let j=0;j<7;j++){
      const z=-1.03-j*.25;
      box(w,M.titanium,sign*.285,-.11,z,.07,.05,.085);
    }
  }
  // Serrated armored snout and blue-white optic emitter.
  tubeZ(w,M.titanium,0,.065,-3.09,.252,.42,20);
  tubeZ(w,M.carbon,0,.065,-3.27,.208,.32,20);
  tubeZ(w,M.steel,0,.065,-3.41,.256,.20,20);
  tubeZ(w,M.charcoal,0,.065,-3.53,.142,.11,20);
  ringZ(w,M.cyan,0,.065,-3.585,.125,.024);
  const muzzle=mesh(w,new T.CircleGeometry(.10,20),M.glass,[0,.065,-3.600]);
  gunAnimation.muzzle=muzzle;
  halo(w,0x3bdaff,0,.065,-3.66,.42);
  const flash=mesh(w,new T.SphereGeometry(.15,12,8),new T.MeshBasicMaterial({color:0xc6f9ff,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false}),[0,.065,-3.65]);
  gunAnimation.flashObject=flash;
  for(let i=0;i<8;i++){
    const angle=(i/8)*Math.PI*2;
    const f=box(w,M.titanium,Math.sin(angle)*.27,.065+Math.cos(angle)*.27,-3.36,.09,.075,.35,0,0,-angle);
    f.material=M.titanium;
  }
  // Two energized floating regulator collars. Animate only these, never bend the receiver.
  for(const z of [-1.35,-2.43]){
    const r=new T.Group();r.position.set(0,.065,z);w.add(r);
    const tor=ringZ(r,M.cyan,0,0,0,.292,.013);
    for(let i=0;i<6;i++){
      const a=i*Math.PI/3;
      box(r,M.titanium,Math.cos(a)*.292,Math.sin(a)*.292,0,.09,.035,.05,0,0,a);
    }
    gunAnimation.rotors.push(r);
  }
  // Optic tower and large precision scope.
  for(const z of [-.40,.37]){
    box(w,M.steel,0,.31,z,.28,.16,.22);
    box(w,M.carbon,0,.40,z,.15,.20,.17);
    for(const sign of [-1,1])box(w,M.edge,sign*.119,.37,z,.017,.11,.14);
  }
  const sy=.58;
  tubeZ(w,M.charcoal,0,sy,.03,.168,1.75,28);
  tubeZ(w,M.titanium,0,sy,-.51,.215,.46,28);
  tubeZ(w,M.charcoal,0,sy,-.79,.274,.33,32);
  tubeZ(w,M.steel,0,sy,-.91,.30,.13,32);
  tubeZ(w,M.charcoal,0,sy,.69,.233,.32,28);
  tubeZ(w,M.titanium,0,sy,.86,.245,.16,28);
  tubeZ(w,M.charcoal,0,sy,.98,.227,.18,28);
  for(const z of [-.82,-.58,-.32,.17,.43,.73,.96]){
    ringZ(w,z===-.82||z===.96?M.edge:M.titanium,0,sy,z,z===-.82?.304:z===.96?.242:.178,.025);
  }
  const lensShader=(r,z,front)=>{
    const g=new T.CircleGeometry(r,48);
    mesh(w,g,M.glass,[0,sy,z]);
    ringZ(w,M.cyan,0,sy,z+(front?-.007:.007),r+.018,.012);
    ringZ(w,M.steel,0,sy,z,r+.04,.038);
  };
  lensShader(.257,-.998,true);lensShader(.196,1.077,false);
  for(let i=0;i<10;i++){
    const a=Math.PI*2*i/10;
    const x=Math.sin(a)*.225,y=sy+Math.cos(a)*.225;
    box(w,M.titanium,x,y,.985,.028,.03,.11,0,0,-a);
  }
  // Scope adjustment turrets and rangefinder satellite.
  cyl(w,M.charcoal,0,.82,.06,.17,.17,.29,22);
  cyl(w,M.steel,0,.99,.06,.146,.155,.075,22);
  cyl(w,M.edge,0,1.033,.06,.119,.119,.025,22);
  for(let i=0;i<12;i++){
    const a=i*Math.PI/6;
    box(w,M.titanium,Math.cos(a)*.157,1.0,Math.sin(a)*.157+.06,.027,.08,.025,0,-a);
  }
  const dial=cyl(w,M.steel,.263,sy,.09,.128,.128,.14,20,0,0,Math.PI/2);
  gunAnimation.scopeDial=dial;
  cyl(w,M.charcoal,.344,sy,.09,.141,.141,.045,20,0,0,Math.PI/2);
  cyl(w,M.cyan,.371,sy,.09,.060,.060,.013,20,0,0,Math.PI/2);
  box(w,M.carbon,-.28,.585,-.66,.23,.21,.49);
  box(w,M.glass,-.28,.595,-.919,.18,.13,.027);
  box(w,M.cyan,-.405,.603,-.70,.014,.05,.32);
  // Side data label, markings and fine decorative fasteners.
  const decalMat=new T.MeshBasicMaterial({map:decalTexture('PL-07','ARC / 96.4 // PHANTOM'),transparent:true,depthWrite:false,side:T.DoubleSide});
  mesh(w,new T.PlaneGeometry(.69,.18),decalMat,[.288,.012,.14],[0,Math.PI/2,0]);
  const marks=new T.MeshBasicMaterial({map:decalTexture('AEGIS','EXPERIMENTAL / 09','#ffbc88'),transparent:true,depthWrite:false,side:T.DoubleSide});
  mesh(w,new T.PlaneGeometry(.52,.15),marks,[-.287,.02,.06],[0,-Math.PI/2,0]);
  for(let s of [-1,1])for(let i=0;i<5;i++){
    const z=-.70-i*.43;
    cyl(w,M.edge,s*.326,.18,z,.018,.018,.02,8,0,0,Math.PI/2);
  }
  // Optional decorative folded bipod on the front frame.
  for(const s of [-1,1]){
    rod(w,M.steel,[s*.215,-.16,-2.3],[s*.43,-.37,-1.63],.03);
    box(w,M.titanium,s*.43,-.37,-1.63,.13,.05,.19);
  }
}
  buildWeapon();

function batchStaticWeapon(){
  weaponChassis.updateMatrixWorld(true);
  const inverse = weaponChassis.matrixWorld.clone().invert();
  const excluded = new Set([gunAnimation.powerCore, gunAnimation.flashObject, gunAnimation.scopeDial, ...gunAnimation.rotors]);
  const materials = new Map();
  weaponChassis.traverse(o=>{
    if(!o.isMesh || !o.geometry || !o.material || Array.isArray(o.material))return;
    if(o.material.transparent || o.material.map)return;
    let parent=o, blocked=false;
    while(parent && parent!==weaponChassis){
      if(excluded.has(parent)){blocked=true;break;}
      parent=parent.parent;
    }
    if(blocked)return;
    if(!materials.has(o.material))materials.set(o.material,[]);
    materials.get(o.material).push(o);
  });
  for(const [material,entries] of materials){
    if(entries.length<2)continue;
    const positions=[], normals=[];
    for(const o of entries){
      const g=o.geometry;
      const p=g.getAttribute('position'), n=g.getAttribute('normal');
      if(!p||!n)continue;
      const indices=g.index;
      const transform = new T.Matrix4().multiplyMatrices(inverse,o.matrixWorld);
      const normalMatrix = new T.Matrix3().getNormalMatrix(transform);
      const pos=new T.Vector3(),normal=new T.Vector3();
      const count=indices?indices.count:p.count;
      for(let i=0;i<count;i++){
        const v=indices?indices.getX(i):i;
        pos.fromBufferAttribute(p,v).applyMatrix4(transform);
        normal.fromBufferAttribute(n,v).applyMatrix3(normalMatrix).normalize();
        positions.push(pos.x,pos.y,pos.z);
        normals.push(normal.x,normal.y,normal.z);
      }
    }
    if(!positions.length)continue;
    const combined=new T.BufferGeometry();
    combined.setAttribute('position',new T.Float32BufferAttribute(positions,3));
    combined.setAttribute('normal',new T.Float32BufferAttribute(normals,3));
    const merged=new T.Mesh(combined,material);
    merged.name='Optimized / static weapon plating';
    merged.frustumCulled=false;
    weaponChassis.add(merged);
    for(const o of entries)o.parent.remove(o);
  }
}
  batchStaticWeapon();

  const muzzle=new T.Object3D();muzzle.position.set(0,.065,-3.60);weaponChassis.add(muzzle);
  const hip=new T.Vector3(.63,-.49,-.86), ads=new T.Vector3(.015,-.72,-1.10);
  root.position.copy(hip);root.scale.setScalar(.79);
  let aimBlend=0,flashTimer=0;
  function fire(){
    flashTimer=.09;gunAnimation.flashObject.material.opacity=.98;
    gunAnimation.flashObject.scale.set(1,1,2.8);
    gunAnimation.rotors.forEach((r,i)=>r.rotation.z+=(i?-.7:.7));
  }
  function update(dt,{aim=false,zoom=3,reload=0,kick=0,active=true}={}){
    aimBlend=T.MathUtils.lerp(aimBlend,aim?1:0,1-Math.exp(-dt*13));
    root.visible=active&&aimBlend<.98;
    root.position.lerpVectors(hip,ads,aimBlend);
    root.rotation.set(.008+aimBlend*(-.02)+(reload>0?.22:0)+kick*.3,-.145*(1-aimBlend),-.065*(1-aimBlend)-kick*.11);
    gunAnimation.powerCore.rotation.z+=dt*.6;
    gunAnimation.powerCore.scale.setScalar(1+.075*Math.sin(performance.now()*.0055));
    for(let i=0;i<gunAnimation.rotors.length;i++)gunAnimation.rotors[i].rotation.z+=dt*(i===0?.5:-.47);
    if(gunAnimation.scopeDial)gunAnimation.scopeDial.rotation.x+=(zoom===6?.35:0)*dt;
    flashTimer=Math.max(0,flashTimer-dt);
    gunAnimation.flashObject.material.opacity=Math.min(gunAnimation.flashObject.material.opacity,Math.max(0,flashTimer/.09));
    if(reload>0){const dip=Math.sin(reload*Math.PI);root.position.y-=dip*.07;}
  }
  return {root,muzzle,fire,update,get aimBlend(){return aimBlend;}};
}
