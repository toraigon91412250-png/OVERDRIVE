import * as THREE from 'three';
export function createGear(){
const scene=new THREE.Group();
const C={ bg:0x0a121b, metal:0x818c8f, silver:0xb4bdbe, dark:0x222b32, steel:0x4b5962, black:0x12171c, gold:0x9e8564, cloth:0x20272b, leather:0x46352c, trim:0x9caaa9 };
const mat=(color,metalness=.5,roughness=.45,extra={})=>new THREE.MeshStandardMaterial({color,metalness,roughness,...extra});
const m={
 metal:mat(C.metal,.82,.3), silver:mat(C.silver,.9,.26), bright:mat(0xd4d9d6,.91,.21), dark:mat(C.dark,.73,.41), steel:mat(C.steel,.83,.39), black:mat(C.black,.38,.58), gold:mat(C.gold,.84,.32), cloth:mat(C.cloth,.06,.95), leather:mat(C.leather,.03,.88), straps:mat(0x3d3230,.12,.78), rubber:mat(0x15191d,.06,.92), edge:mat(0x9daab0,.8,.36), red:mat(0x734536,.4,.54), glass:mat(0x819e9d,.2,.2,{transparent:true,opacity:.72}), glow:new THREE.MeshBasicMaterial({color:0xb0d9da,transparent:true,opacity:.5,depthWrite:false,blending:THREE.AdditiveBlending}),
 enamel:mat(0x38444a,.8,.3),oil:mat(0x242c30,.74,.24),worn:mat(0x7c796d,.82,.35),copper:mat(0x946d4c,.86,.31)
};
const model=new THREE.Group();scene.add(model);const bodyGroup=new THREE.Group(),gearRoot=new THREE.Group();model.add(bodyGroup,gearRoot);
const cast=(mesh)=>{mesh.castShadow=true;mesh.receiveShadow=true;return mesh};
const mesh=(g,material,parent,pos=[0,0,0],rot=[0,0,0])=>{const o=new THREE.Mesh(g,material);o.position.set(...pos);o.rotation.set(...rot);cast(o);parent.add(o);return o};
function box(parent,w,h,d,material,x=0,y=0,z=0,rx=0,ry=0,rz=0){return mesh(new THREE.BoxGeometry(w,h,d),material,parent,[x,y,z],[rx,ry,rz])}
function sphere(parent,rx,ry,rz,material,x,y,z){const ob=mesh(new THREE.SphereGeometry(1,14,10),material,parent,[x,y,z]);ob.scale.set(rx,ry,rz);return ob}
function cylY(parent,r1,r2,len,material,x,y,z,seg=16){return mesh(new THREE.CylinderGeometry(r1,r2,len,Math.min(seg,16)),material,parent,[x,y,z])}
function cylZ(parent,r1,r2,len,material,x,y,z,seg=16){const o=cylY(parent,r1,r2,len,material,x,y,z,seg);o.rotation.x=Math.PI/2;return o}
function torus(parent,r,t,material,x,y,z,arc=Math.PI*2){return mesh(new THREE.TorusGeometry(r,t,5,24,arc),material,parent,[x,y,z])}
function rod(parent,a,b,r,material,seg=7){seg=Math.min(seg,7);const aV=new THREE.Vector3(...a),bV=new THREE.Vector3(...b),delta=bV.clone().sub(aV);const ob=mesh(new THREE.CylinderGeometry(r,r,delta.length(),seg),material,parent,aV.clone().add(bV).multiplyScalar(.5).toArray());ob.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return ob}
function strap(parent,a,b,w,t,material){const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),d=bv.clone().sub(av);const ob=box(parent,w,d.length(),t,material,...av.add(bv).multiplyScalar(.5).toArray());ob.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return ob}
function pipe(parent,pts,r,material,segments=18){segments=Math.min(segments,18);const curve=new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p)));return mesh(new THREE.TubeGeometry(curve,segments,r,5,false),material,parent)}
function rounded(parent,w,h,d,r,material,x=0,y=0,z=0){let s=new THREE.Shape(),hw=w/2,hh=h/2;s.moveTo(-hw+r,-hh);s.lineTo(hw-r,-hh);s.quadraticCurveTo(hw,-hh,hw,-hh+r);s.lineTo(hw,hh-r);s.quadraticCurveTo(hw,hh,hw-r,hh);s.lineTo(-hw+r,hh);s.quadraticCurveTo(-hw,hh,-hw,hh-r);s.lineTo(-hw,-hh+r);s.quadraticCurveTo(-hw,-hh,-hw+r,-hh);const bevel=Math.min(r*.34,d*.23);let o=mesh(new THREE.ExtrudeGeometry(s,{depth:Math.max(.005,d-bevel*2),steps:1,bevelEnabled:true,bevelThickness:bevel,bevelSize:bevel,bevelSegments:1,curveSegments:2}),material,parent,[x,y,z-d/2+bevel]);return o;}
function bolt(parent,x,y,z,rad=.03,mt=m.gold){cylZ(parent,rad,rad,.02,mt,x,y,z,10);box(parent,rad*.85,.006,.006,m.black,x,y,z+.015)}
function ringHorizontal(parent,r,t,material,x,y,z){const o=torus(parent,r,t,material,x,y,z);o.rotation.x=Math.PI/2;return o}

// Tailored matte mannequin makes the straps legible without distracting from the machine.
const pelvis=sphere(bodyGroup,.48,.32,.33,m.cloth,0,-.03,0);
sphere(bodyGroup,.48,.65,.30,m.cloth,0,.75,-.015);sphere(bodyGroup,.57,.42,.31,m.cloth,0,1.17,-.012);
const waist=sphere(bodyGroup,.42,.28,.275,m.cloth,0,.18,0);cylY(bodyGroup,.19,.21,.18,m.cloth,0,1.62,0);
// Flat and featureless bust / head. This is equipment display, not a character replica.
sphere(bodyGroup,.235,.285,.23,m.cloth,0,1.95,.01);
for(const s of [-1,1]){
 sphere(bodyGroup,.215,.23,.23,m.cloth,s*.62,1.34,0);
 strap(bodyGroup,[s*.65,1.3,0],[s*.76,.65,.07],.29,.31,m.cloth);
 sphere(bodyGroup,.164,.15,.18,m.cloth,s*.76,.65,.04);
 strap(bodyGroup,[s*.76,.58,.07],[s*.95,.19,.26],.21,.21,m.cloth);
 sphere(bodyGroup,.16,.15,.17,m.rubber,s*.96,.16,.28);
 sphere(bodyGroup,.23,.31,.25,m.cloth,s*.26,-.44,0);
 strap(bodyGroup,[s*.28,-.40,0],[s*.32,-1.10,.01],.45,.45,m.cloth);
 sphere(bodyGroup,.25,.26,.25,m.cloth,s*.32,-1.09,.02);
 strap(bodyGroup,[s*.32,-1.15,.02],[s*.33,-1.84,.06],.31,.34,m.cloth);
 sphere(bodyGroup,.22,.18,.33,m.rubber,s*.34,-1.94,.19);
 // leather wraps on legs; vertical restraint straps.
 for(let y of [-.58,-.91,-1.35]){const rr=ringHorizontal(bodyGroup,.25,.038,m.straps,s*.29,y,0);rr.scale.set(1,1,.85)}
 strap(bodyGroup,[s*.48,.06,.21],[s*.42,-.53,.20],.084,.028,m.straps);
 strap(bodyGroup,[s*.44,-.70,.21],[s*.36,-1.50,.22],.070,.028,m.straps);
 strap(bodyGroup,[s*.14,-.45,.22],[s*.48,-1.25,.19],.055,.022,m.straps);
}
// Chest crossed harnesses, rear reinforcement, belt and clasp.
strap(bodyGroup,[-.49,1.54,.22],[.36,.40,.278],.092,.038,m.straps);
strap(bodyGroup,[.49,1.54,.22],[-.36,.40,.278],.092,.038,m.straps);
strap(bodyGroup,[-.49,1.54,-.22],[.31,.35,-.28],.09,.04,m.straps);
strap(bodyGroup,[.49,1.54,-.22],[-.31,.35,-.28],.09,.04,m.straps);
for(const s of [-1,1]){strap(bodyGroup,[s*.42,1.54,.25],[s*.52,1.54,-.22],.105,.034,m.straps);box(bodyGroup,.14,.11,.025,m.metal,s*.30,.48,.31);box(bodyGroup,.082,.05,.032,m.dark,s*.30,.48,.335);}
// Waist belt is built as articulated plates in order to keep a convincing curved wrap.
for(let i=0;i<16;i++){let a=i/16*Math.PI*2,x=Math.sin(a)*.51,z=Math.cos(a)*.335;const pl=box(bodyGroup,.17,.155,.034,i%4?m.straps:m.steel,x,.07,z);pl.rotation.y=a;}
rounded(bodyGroup,.23,.18,.06,.032,m.metal,0,.06,.36);rounded(bodyGroup,.12,.09,.075,.018,m.gold,0,.06,.41);

// Back-mounted central control body.
const center=new THREE.Group();gearRoot.add(center);center.position.set(0,.15,-.57);
rounded(center,.83,.49,.22,.08,m.dark,0,0,0);
rounded(center,.62,.36,.08,.055,m.steel,0,.017,-.145);
for(const s of [-1,1]){
 rounded(center,.19,.52,.2,.03,m.metal,s*.42,.02,-.01);
 for(let i=0;i<3;i++)bolt(center,s*.41,-.13+i*.145,-.155,.027,m.black);
}
for(let i=-3;i<=3;i++){box(center,.038,.19,.04,i%2?m.dark:m.black,i*.072,-.018,-.206);}
cylZ(center,.155,.155,.13,m.black,0,.03,-.25);torus(center,.137,.019,m.gold,0,.03,-.325);cylZ(center,.076,.076,.15,m.steel,0,.03,-.31);bolt(center,0,.03,-.4,.045,m.gold);
for(const s of [-1,1]){
 // Supporting V-shaped braces which join each drum to the spine.
 rod(center,[s*.16,.18,-.08],[s*.63,.40,-.20],.043,m.metal);
 rod(center,[s*.16,-.12,-.1],[s*.63,-.25,-.24],.05,m.steel);
 rod(center,[s*.35,.18,-.09],[s*.65,-.08,-.20],.028,m.gold);
}
// Power distribution spine with articulated fasteners, metal glands and turbine conduit housings.
for(const s of [-1,1]){
 const edge=rounded(center,.29,.18,.21,.04,m.metal,s*.32,-.025,-.215);
 edge.rotation.z=s*.12;
 cylZ(center,.088,.088,.08,m.oil,s*.345,.04,-.333,18);
 torus(center,.082,.015,m.gold,s*.345,.04,-.379);
 rod(center,[s*.19,.14,-.32],[s*.42,.26,-.22],.026,m.metal);
 rod(center,[s*.17,-.13,-.32],[s*.46,-.24,-.17],.028,m.steel);
}
// The characteristic pair of circular reel/fan drums, intentionally dense in rim/spoke detail.
const fans=[],movingDiscs=[];
for(const s of [-1,1]){
 const fan=new THREE.Group();center.add(fan);fan.position.set(s*.63,.07,-.17);fan.rotation.y=s*.21;fan.rotation.z=s*.13;fans.push({s,fan,baseX:s*.63});
 cylZ(fan,.345,.335,.24,m.dark,0,0,0,48);cylZ(fan,.29,.29,.25,m.steel,0,0,-.025,48);
 torus(fan,.35,.033,m.silver,0,0,-.145);torus(fan,.286,.015,m.gold,0,0,-.165);torus(fan,.195,.012,m.dark,0,0,-.165);
 const disc=new THREE.Group();fan.add(disc);disc.position.z=-.16;movingDiscs.push({s,disc});
 cylZ(disc,.10,.10,.065,m.black,0,0,-.03,32);cylZ(disc,.066,.066,.07,m.gold,0,0,-.07,24);
 for(let i=0;i<12;i++){
  const a=i/12*Math.PI*2, b=a+.19;
  const p1=new THREE.Vector2(Math.sin(a)*.11,Math.cos(a)*.11),p2=new THREE.Vector2(Math.sin(a+.42)*.267,Math.cos(a+.42)*.267),p3=new THREE.Vector2(Math.sin(b+.38)*.271,Math.cos(b+.38)*.271),p4=new THREE.Vector2(Math.sin(b)*.12,Math.cos(b)*.12);
  let sh=new THREE.Shape();sh.moveTo(p1.x,p1.y);sh.lineTo(p2.x,p2.y);sh.lineTo(p3.x,p3.y);sh.lineTo(p4.x,p4.y);sh.closePath();mesh(new THREE.ShapeGeometry(sh),i%2?m.metal:m.silver,disc,[0,0,-.035]);
 }
 for(let i=0;i<8;i++){
  let a=(i+.5)/8*Math.PI*2;const x=Math.cos(a)*.326,y=Math.sin(a)*.326;
  cylZ(fan,.021,.021,.034,m.gold,x,y,-.171,9);
 }
 for(let i=0;i<16;i++){let a=i/16*Math.PI*2,xx=Math.cos(a)*.365,yy=Math.sin(a)*.365;const tooth=box(fan,.067,.025,.070,m.steel,xx,yy,-.035);tooth.rotation.z=a;}
 // V3 turbine cowling: multiple sculpted vanes and stepped outer shroud.
 for(let i=0;i<10;i++){
  const a=i*Math.PI/5, b=a+.50;
  const sh=new THREE.Shape();
  sh.moveTo(.292*Math.cos(a),.292*Math.sin(a));
  sh.lineTo(.388*Math.cos(a+.025),.388*Math.sin(a+.025));
  sh.quadraticCurveTo(.43*Math.cos(a+.21),.43*Math.sin(a+.21),.388*Math.cos(b),.388*Math.sin(b));
  sh.lineTo(.294*Math.cos(b+.03),.294*Math.sin(b+.03));sh.closePath();
  const shell=mesh(new THREE.ExtrudeGeometry(sh,{depth:.065,bevelEnabled:true,bevelSize:.012,bevelThickness:.012,bevelSegments:1,curveSegments:2}),i%3===0?m.worn:m.enamel,fan,[0,0,-.182]);
  shell.castShadow=true;
  const ang=a+.23;
  const rib=rod(fan,[Math.cos(ang)*.301,Math.sin(ang)*.301,-.198],[Math.cos(ang)*.393,Math.sin(ang)*.393,-.198],.014,m.gold,7);
 }
 // Raised bimetal safety rim and external cage lugs.
 torus(fan,.407,.014,m.silver,0,0,-.15);
 torus(fan,.364,.012,m.dark,0,0,-.207);
 for(let i=0;i<8;i++){
   const a=i*Math.PI/4,xx=.41*Math.cos(a),yy=.41*Math.sin(a);
   const lug=rounded(fan,.087,.085,.115,.022,m.metal,xx,yy,-.095);lug.rotation.z=a;
   cylZ(fan,.024,.024,.024,m.black,xx,yy,-.163,10);
   cylZ(fan,.011,.011,.027,m.gold,xx,yy,-.18,8);
 }
 // Recessed rotor spindle and open mechanical throat.
 cylZ(fan,.130,.130,.035,m.oil,0,0,-.228,28);
 cylZ(fan,.086,.086,.046,m.silver,0,0,-.248,24);
 torus(fan,.108,.011,m.copper,0,0,-.262);
 // Support lattice on the rear outer shell.
 for(const a of [-1,1]){
   const p0=[a*.33,-.08,.04],p1=[a*.41,-.31,.12];
   rod(fan,p0,p1,.025,m.steel);
   const p2=[a*.19,.29,.065];rod(fan,p2,[a*.36,.20,.12],.023,m.metal);
 }
 // Rear curved brackets and lower cradle support arms.
 rod(fan,[-.26,-.25,.015],[-.36,-.40,.07],.03,m.metal);
 rod(fan,[.25,-.28,.015],[.36,-.39,.08],.03,m.metal);
 for(const angle of [-.63,.63]){const x=Math.sin(angle)*.26,y=Math.cos(angle)*.26;bolt(fan,x,y,-.17,.031,m.gold)}
}
// Side storage/canister modules: one complex assembly on each outer thigh.
const pods=[], grips=[];
for(const s of [-1,1]){
 const pod=new THREE.Group();gearRoot.add(pod);pod.position.set(s*1.055,-.54,-.08);pod.rotation.z=s*.065;pods.push({s,pod,baseX:s*1.055});
 rounded(pod,.38,.41,1.75,.052,m.dark,0,0,0);
 rounded(pod,.34,.25,1.78,.04,m.steel,0,-.065,.015);
 // Two-layer carapace with segmented gearbox skirts and a recessed spine.
 rounded(pod,.355,.12,1.75,.04,m.black,0,.225,-.015);
 rounded(pod,.298,.062,1.56,.025,m.worn,0,.271,-.04);
 for(let i=0;i<7;i++){
   let z=-.73+i*.24;
   const fin=rounded(pod,.408,.095,.115,.018,i%2?m.enamel:m.steel,s*.01,-.216,z);
   fin.rotation.x=(i%2?1:-1)*.04;
   for(const xx of [-.15,.15])cylZ(pod,.012,.012,.019,m.gold,xx,-.217,z+.067,8);
 }
 // Thin etched rim on the external panel.
 for(let z of [-.77,.77]){
   const sideBracket=rounded(pod,.46,.27,.078,.025,m.enamel,0,.06,z);
   sideBracket.rotation.z=s*.04;
 }
 for(let k=0;k<3;k++){
   const zz=-.55+k*.53;
   rod(pod,[s*.242,.12,zz-.15],[s*.248,-.12,zz+.15],.013,m.copper,6);
 }
 // Long bevel-edged protective rails on the exterior.
 box(pod,.048,.39,1.78,m.metal,s*.199,-.02,0);
 box(pod,.052,.25,1.73,m.silver,-s*.195,-.08,.01);
 box(pod,.10,.04,1.75,m.black,0,-.22,0);
 for(const z of [-.77,-.40,.06,.50,.76]){
  rounded(pod,.445,.44,.071,.025,m.metal,0,-.006,z);
  rounded(pod,.30,.27,.075,.019,m.steel,0,-.015,z+.017);
  bolt(pod,s*.18,.155,z+.045,.024,m.gold);
 }
 // Mechanical body panel: slots are visual grooves, not physical mechanisms.
 for(let k=0;k<4;k++){const zz=-.56+k*.36;rounded(pod,.016,.17,.18,.008,m.black,s*.224,-.045,zz);box(pod,.02,.02,.145,m.gold,s*.239,-.09,zz);}
 // Cartridge receiver with five sculpted slots and removable lid details.
 rounded(pod,.33,.075,1.36,.022,m.dark,0,.287,-.11);
 for(let slot=0;slot<5;slot++){
   let x=(slot-2)*.06;
   box(pod,.045,.039,.98,m.black,x,.315,-.10);
   for(let mark=0;mark<4;mark++)box(pod,.034,.005,.016,m.worn,x,.340,-.50+mark*.16);
 }
 for(let z of [-.7,.41]){
   const latch=rounded(pod,.34,.055,.14,.017,m.enamel,0,.329,z);
   for(let x of [-.11,.11])cylY(pod,.018,.018,.035,m.gold,x,.36,z,10);
 }
 // Removable blade storage is indicated by parallel steel fins and dark separation grooves.
 for(let j=0;j<5;j++){
  const x=(j-2)*.060;
  box(pod,.038,.022,1.25,m.black,x,.233,-.09);
  box(pod,.029,.022,1.20,j%2?m.bright:m.silver,x,.249,-.10);
  box(pod,.036,.037,.08,m.gold,x,.24,.53);
 }
 for(let z of [-.6,-.1,.42]){box(pod,.42,.055,.055,m.gold,0,.27,z)}
 // Long silver gas casing with collar bands, end caps, and stepped connector silhouette.
 cylZ(pod,.185,.185,1.59,m.silver,0,.435,-.02,40);
 cylZ(pod,.155,.155,1.56,m.metal,0,.435,-.02,40);
 for(let z of [-.72,-.38,.30,.70]){cylZ(pod,.204,.204,.076,m.steel,0,.435,z);cylZ(pod,.207,.207,.021,m.gold,0,.435,z+.037);}
 // Fine metallic longitudinal ridges and engraved cylinder seam.
 for(let k=0;k<8;k++){
   const a=k*Math.PI/4,xx=Math.cos(a)*.157,yy=.435+Math.sin(a)*.157;
   rod(pod,[xx,yy,-.66],[xx,yy,.71],.005,k%2?m.silver:m.dark,5);
 }
 // Fitted turbine brackets around the cylinder and small pressure-panel look.
 for(const z of [-.56,.05,.53]){
   box(pod,.44,.046,.088,m.enamel,0,.53,z);
   for(const x of [-.16,.16])cylZ(pod,.018,.018,.023,m.gold,x,.539,z+.05,8);
 }
 cylZ(pod,.17,.17,.12,m.dark,0,.435,.79,36);
 torus(pod,.12,.014,m.gold,0,.435,.86);cylZ(pod,.065,.065,.08,m.gold,0,.435,.87);
 cylZ(pod,.18,.18,.11,m.dark,0,.435,-.82);cylZ(pod,.095,.095,.13,m.steel,0,.435,-.90);
 for(let i=0;i<9;i++){const z=-.54+i*.145;box(pod,.14,.012,.012,m.dark,s*.155,.565,z);}
 // L-shaped carrier for thigh and hose feed.
 rod(pod,[0,.37,-.64],[-s*.28,.55,-.92],.045,m.dark);
 rod(pod,[-s*.28,.55,-.92],[-s*.44,.75,-.92],.045,m.metal);
 rounded(pod,.17,.22,.17,.035,m.dark,s*.20,-.01,.91);
 cylZ(pod,.095,.095,.12,m.black,s*.22,.015,.99,24);
 torus(pod,.072,.015,m.gold,s*.22,.015,1.058);
 // Blade case front is a capped magazine housing, NOT an anchor launcher.
 // Remove the former misleading triangular hook symbol from this surface.
 rounded(pod,.30,.22,.064,.025,m.steel,0,-.018,.950);
 for(const zz of [-.085,0,.085])box(pod,.21,.014,.014,m.black,0,zz,.991);
 for(let z of [-.59,.42]){rod(pod,[s*.14,.27,z],[s*.30,.06,z],.03,m.dark);}
 // Recessed front-face detailing and tiny brass fasteners.
 for(let k=0;k<5;k++){box(pod,.075,.033,.017,k%2?m.gold:m.black,-s*.13,-.03+k*.065,.933);}
 for(const zz of [-.67,-.17,.33,.65]){bolt(pod,0,-.016,zz+.10,.027,m.gold)}
 // A two-handed visual prop mounted near the glove, including its characteristic L-grip.
 const sword=new THREE.Group();gearRoot.add(sword);sword.position.set(s*1.07,.16,.53);sword.rotation.z=s*.245;sword.rotation.x=-.055;grips.push({s,sword,baseX:s*1.07});
 // Pistol-shaped grip and collar, a non-operational art mesh.
 rounded(sword,.23,.13,.185,.025,m.steel,0,.12,0);
 rounded(sword,.14,.36,.13,.031,m.leather,-s*.035,.31,.01);
 for(let i=0;i<8;i++){box(sword,.15,.012,.145,m.black,-s*.034,.19+i*.04,.016);}
 rounded(sword,.24,.105,.22,.023,m.dark,0,.03,0);
 box(sword,.30,.045,.25,m.metal,0,.055,-.025);
 cylZ(sword,.055,.055,.23,m.gold,-s*.14,.05,0);
 for(let i=-1;i<=1;i++){bolt(sword,i*.085,.047,.142,.017,m.gold);}
 // 3D curved guard loop, small lever forms, and blade coupling collar.
 pipe(sword,[[s*.07,.12,.05],[s*.20,.05,.09],[s*.19,-.12,.10],[s*.035,-.16,.07]],.015,m.gold,17);
 rod(sword,[s*.06,.06,.12],[s*.025,-.12,.12],.022,m.black);
 rounded(sword,.19,.12,.19,.015,m.metal,0,-.13,0);
 // Replaceable blade as an independent model, physically animated at exchange time.
 const bladeGroup=new THREE.Group();sword.add(bladeGroup);
 const blade=new THREE.Shape();
 blade.moveTo(-.064,-.17);blade.lineTo(.064,-.17);blade.lineTo(.082,-.43);
 blade.lineTo(.078,-1.48);blade.lineTo(.048,-1.66);blade.lineTo(-.04,-1.75);
 blade.lineTo(-.078,-1.62);blade.lineTo(-.079,-.43);blade.closePath();
 mesh(new THREE.ExtrudeGeometry(blade,{depth:.033,steps:1,bevelEnabled:true,bevelThickness:.011,bevelSize:.006,bevelSegments:1}),m.bright,bladeGroup,[0,0,-.018]);
 box(bladeGroup,.014,1.39,.049,m.silver,-.009,-.96,.011);
 for(let k=0;k<6;k++){
  let y=-.39-k*.21;
  rod(bladeGroup,[-.073,y,.038],[.071,y-.080,.038],.005,m.steel,5);
 }
 // Replacement coupling collar, clips and hinge on the grip (animated during swap).
 const lock=new THREE.Group();sword.add(lock);lock.position.set(0,-.16,.035);
 for(const xx of [-.093,.093]){
  let l=rounded(lock,.032,.12,.083,.009,m.gold,xx,0,0);l.rotation.z=xx<0?-.12:.12;
 }
 cylZ(lock,.045,.045,.027,m.black,0,-.02,.053,12);
 grips[grips.length-1].blade=bladeGroup;
 grips[grips.length-1].lock=lock;
 // Tang and twin fasteners.
 box(sword,.083,.105,.04,m.dark,0,-.20,-.02);
 bolt(sword,0,-.20,.048,.021,m.gold);
}
// Fictional rubber conduits, plotted as curves in 3D, follow each decorative module.
for(const s of [-1,1]){
 pipe(gearRoot,[[s*.43,.32,-.67],[s*.72,.19,-.76],[s*.90,-.15,-.80],[s*1.08,-.30,-.79]],.026,m.rubber);
 pipe(gearRoot,[[s*.32,.17,-.69],[s*.72,.05,-.70],[s*1.01,-.22,-.45]],.018,m.gold);
 pipe(gearRoot,[[s*.58,.21,-.88],[s*.85,.45,-.7],[s*1.00,.30,-.39],[s*1.05,-.09,-.18]],.023,m.dark);
 rod(gearRoot,[s*.56,-.05,-.68],[s*.89,-.40,-.71],.033,m.steel);
 box(gearRoot,.13,.19,.12,m.steel,s*.72,-.14,-.60);
}
// Small engraved identification on the rear brace, painted by CanvasTexture.
function textPlate(parent,txt,x,y,z,w=.28,h=.067){let cv=document.createElement('canvas');cv.width=512;cv.height=128;let cx=cv.getContext('2d');cx.clearRect(0,0,512,128);cx.fillStyle='#1a232b';cx.fillRect(0,0,512,128);cx.strokeStyle='#9d856b';cx.lineWidth=7;cx.strokeRect(6,6,500,116);cx.fillStyle='#d0c4a8';cx.font='bold 55px monospace';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(txt,256,67);let t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;const ob=mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}),parent,[x,y,z]);return ob;}
textPlate(center,'ODM / 01',0,-.195,-.271,.38,.085);
for(let i=0;i<2;i++){let s=i?1:-1;textPlate(pods[i].pod,'SHEATH 0'+(i+1),0,-.073,.951,.23,.052)}

// ANIME-STYLE HIP LAUNCHER ASSEMBLIES / visual-only 3D art.
// The rear twin drums STORE the cables; they do not fire cables directly.
// Separate small launchers are attached to the left and right waist above the sheath boxes.
// No functioning propellant or physical firing mechanism is modeled.
const launchers=[];
for(const s of [-1,1]){
  const unit=new THREE.Group();gearRoot.add(unit);
  unit.name=(s<0?'LEFT':'RIGHT')+'_WAIST_ANCHOR_LAUNCHER';
  unit.position.set(s*.70,.105,-.19);unit.rotation.y=s*.19;
  // Pivoted mounting fork with a visibly independent rotating launcher barrel.
  for(const xx of [-.19,.19]){
    rod(unit,[xx,-.09,-.25],[xx,.07,.23],.032,m.steel);
    cylZ(unit,.049,.049,.047,m.copper,xx,-.05,-.19,18);
    cylZ(unit,.036,.036,.052,m.black,xx,-.05,-.225,16);
  }
  // Distinctive hinged cradle, rotating armored casing, forward mouth.
  rounded(unit,.30,.22,.44,.045,m.dark,0,.005,.125);
  rounded(unit,.24,.16,.34,.032,m.metal,0,.030,.18);
  box(unit,.28,.055,.47,m.steel,0,-.110,.125);
  box(unit,.24,.043,.39,m.black,0,.14,.12);
  rounded(unit,.070,.145,.43,.014,m.silver,s*.153,.011,.105);
  rounded(unit,.070,.145,.43,.014,m.silver,-s*.153,.011,.105);
  // Small positioning carriage visible from the outside of the hip.
  cylZ(unit,.085,.085,.15,m.black,0,0,-.115,24);
  cylZ(unit,.061,.061,.16,m.gold,0,0,-.12,24);
  for(const z of [-.015,.19]){
    box(unit,.32,.025,.032,m.gold,0,-.06,z);
    bolt(unit,s*.151,.091,z,.020,m.dark);
  }
  // The dark central bore and bright mouth ring show the exact departure point.
  cylZ(unit,.079,.079,.10,m.silver,0,.014,.405,28);
  cylZ(unit,.061,.061,.07,m.black,0,.014,.469,28);
  torus(unit,.077,.015,m.gold,0,.014,.513);
  for(let k=0;k<8;k++){
    const t=k*Math.PI/4;
    const xx=Math.cos(t)*.098, yy=.014+Math.sin(t)*.098;
    cylZ(unit,.011,.011,.027,m.dark,xx,yy,.484,8);
  }
  // Structural side arm joins the launcher to the spine-mounted twin reels.
  rod(gearRoot,[s*.45,.19,-.66],[s*.65,.23,-.36],.044,m.metal);
  rod(gearRoot,[s*.60,.23,-.36],[s*.70,.11,-.20],.032,m.steel);
  rod(gearRoot,[s*.52,-.11,-.62],[s*.70,-.025,-.30],.029,m.dark);
  pipe(gearRoot,[[s*.48,.09,-.67],[s*.66,.105,-.54],[s*.73,.10,-.35],[s*.72,.105,-.25]],.017,m.rubber,28);
  // Decorative waist-side pivot plate and fasteners.
  const carrier=rounded(gearRoot,.20,.22,.105,.028,m.dark,s*.56,.11,-.27);
  carrier.rotation.y=s*.22;
  for(let y of [.03,.20])bolt(gearRoot,s*.55,y,-.202,.026,m.gold);
  // An Object3D is deliberately placed on the exact model muzzle face.
  // Dynamic cable geometry will use its calculated position every frame.
  const muzzle=new THREE.Object3D();unit.add(muzzle);
  muzzle.name='EXACT_CABLE_ORIGIN';muzzle.position.set(0,.014,.527);
  launchers.push({s,unit,muzzle});
}

// Twin cinematic cable rigs: independent left/right launches, return travel and drum motion.
// Entirely visual fiction. Each line starts at the exact world position of the muzzle marker.
const wires=[];
for(const launcher of launchers){
 const {s}=launcher;
 const N=28,arr=new Float32Array(N*3),geom=new THREE.BufferGeometry();
 geom.setAttribute('position',new THREE.BufferAttribute(arr,3));
 const line=new THREE.Line(geom,new THREE.LineBasicMaterial({color:0xe9eded,transparent:true,opacity:.98,depthWrite:false}));
 line.visible=false;gearRoot.add(line);
 const tip=new THREE.Group();gearRoot.add(tip);tip.visible=false;
 cylZ(tip,.035,.040,.185,m.steel,0,0,0,14);
 cylZ(tip,.063,.063,.05,m.gold,0,0,-.083,16);
 const point=mesh(new THREE.ConeGeometry(.059,.16,6),m.bright,tip,[0,0,.150]);point.rotation.x=Math.PI/2;
 for(const a of [-1,1]){
   const wing=box(tip,.040,.043,.175,m.silver,a*.083,.017,-.067,0,0,a*.33);
   const detail=box(tip,.028,.012,.112,m.dark,a*.084,.042,-.047,0,0,a*.25);
 }
 // Parked projectile in the launcher mouth, hidden while fired.
 const parked=new THREE.Group();launcher.unit.add(parked);parked.position.set(0,.014,.55);
 cylZ(parked,.039,.039,.086,m.steel,0,0,0,10);
 const n=mesh(new THREE.ConeGeometry(.047,.107,6),m.silver,parked,[0,0,.099]);n.rotation.x=Math.PI/2;
 // Thin guide sleeve that moves back slightly during ejection.
 const collar=new THREE.Group();launcher.unit.add(collar);collar.position.set(0,.014,.48);
 torus(collar,.083,.012,m.gold,0,0,.002);
 for(let j=0;j<4;j++){
   let a=j*Math.PI/2;
   const p=box(collar,.023,.026,.063,m.steel,Math.cos(a)*.093,Math.sin(a)*.093,0);
   p.rotation.z=a;
 }
 wires.push({s,launcher,line,geom,arr,N,tip,parked,collar,mode:'idle',amount:0,velocity:0,phase:0,recoil:0});
}
// Decorative vapor bursts, rendered as translucent billboards/spheres.
const vapor=[];for(const s of [-1,1])for(let j=0;j<10;j++){
 let material=new THREE.MeshBasicMaterial({color:j%3?0xa6cad0:0xffe9c5,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending});
 let o=mesh(new THREE.SphereGeometry(1,6,5),material,gearRoot,[s*1.07,-.31,-.7]);o.visible=false;vapor.push({o,s,j});
}


for(const w of wires){w.line.removeFromParent();w.tip.removeFromParent();}
for(const g of grips)g.sword.removeFromParent();
let before=0,after=0;const roots=[gearRoot,...grips.map(g=>g.sword)];for(const root of roots)root.traverse(o=>{if(o.isMesh)before++});for(const root of roots)batchTree(root);for(const root of roots)root.traverse(o=>{if(o.isMesh)after++});
return {root:gearRoot,grips,rotors:movingDiscs,launchers,metrics:{before,after}};
}
function batchDirectMeshes(parent){
 const buckets=new Map();
 for(const o of parent.children){
   if(!o.isMesh || o.userData.noBatch || !o.geometry?.attributes?.position || !o.geometry?.attributes?.normal)continue;
   if(!Array.isArray(o.material)&&o.material){
     if(!buckets.has(o.material))buckets.set(o.material,[]);
     buckets.get(o.material).push(o);
   }
 }
 let collapsed=0;
 for(const [material,objects] of buckets){
   if(objects.length<2)continue;
   let verts=0,indices=0;
   for(const o of objects){
     const g=o.geometry;
     verts+=g.getAttribute('position').count;
     indices+=g.index?g.index.count:g.getAttribute('position').count;
   }
   const positions=new Float32Array(verts*3),normals=new Float32Array(verts*3),uvs=new Float32Array(verts*2);
   const ids=new (verts>65535?Uint32Array:Uint16Array)(indices);
   let vertexOffset=0,indexOffset=0;
   const vec=new THREE.Vector3(),normal=new THREE.Vector3(),normalMatrix=new THREE.Matrix3();
   for(const o of objects){
     o.updateMatrix();
     normalMatrix.getNormalMatrix(o.matrix);
     const g=o.geometry,p=g.getAttribute('position'),n=g.getAttribute('normal'),uv=g.getAttribute('uv');
     for(let j=0;j<p.count;j++){
       vec.fromBufferAttribute(p,j).applyMatrix4(o.matrix);
       const base=(vertexOffset+j)*3;positions[base]=vec.x;positions[base+1]=vec.y;positions[base+2]=vec.z;
       normal.fromBufferAttribute(n,j).applyMatrix3(normalMatrix).normalize();
       normals[base]=normal.x;normals[base+1]=normal.y;normals[base+2]=normal.z;
       if(uv){const t=(vertexOffset+j)*2;uvs[t]=uv.getX(j);uvs[t+1]=uv.getY(j);}
     }
     if(g.index){for(let i=0;i<g.index.count;i++)ids[indexOffset+i]=vertexOffset+g.index.getX(i);indexOffset+=g.index.count;}
     else{for(let i=0;i<p.count;i++)ids[indexOffset+i]=vertexOffset+i;indexOffset+=p.count;}
     vertexOffset+=p.count;
   }
   const out=new THREE.BufferGeometry();
   out.setAttribute('position',new THREE.BufferAttribute(positions,3));
   out.setAttribute('normal',new THREE.BufferAttribute(normals,3));
   out.setAttribute('uv',new THREE.BufferAttribute(uvs,2));
   out.setIndex(new THREE.BufferAttribute(ids,1));
   out.computeBoundingSphere();
   const merged=new THREE.Mesh(out,material);merged.castShadow=true;merged.receiveShadow=true;
   for(const o of objects){parent.remove(o);o.geometry.dispose();}
   parent.add(merged);collapsed+=objects.length-1;
 }
 return collapsed;
}
function batchTree(root){
 // Snapshot the hierarchy: batching changes the children array only, not the Groups.
 const parents=[];root.traverse(o=>{if(o.isObject3D&&o.children.length)parents.push(o)});
 let collapsed=0;for(const p of parents)collapsed+=batchDirectMeshes(p);
 return collapsed;
}

export {batchTree};
