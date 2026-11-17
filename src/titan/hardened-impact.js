import * as THREE from 'three';

// Four reusable contact bursts. A sharp fracture marks the touch; pressure and
// debris release afterward, along the punch, rather than covering it in a ring.
export function createHardenedImpact(scene) {
 const root = new THREE.Group(); root.name = 'raid-hardened-punch-impacts'; scene.add(root);
 const resources = new Set(), own = value => (resources.add(value), value);
 const shardGeometry = own(new THREE.OctahedronGeometry(1, 0));
 const dustGeometry = own(new THREE.IcosahedronGeometry(1, 0));
 const crescentGeometry = own(new THREE.TorusGeometry(1, .013, 3, 18, Math.PI * .64));
 const dummy = new THREE.Object3D(), normal = new THREE.Vector3(0, 0, 1);
 const gravity = new THREE.Vector3(0, -8, 0), inverse = new THREE.Quaternion();
 const point = new THREE.Vector3(), direction = new THREE.Vector3(), color = new THREE.Color();
 const random = (min, max) => min + Math.random() * (max - min);
 const fractureAngles=[-.85,.25,1.1,2.6,3.6];
 const slots = []; let disposed = false;
 const palettes = {hardened:[0xeefcff,0x8abed3,0xc9e9f2],normal:[0xffdeb0,0xcdad84,0x897867],guarded:[0xffe7b2,0xffbc65,0x9b8b73]};
 function particles(count) {
  return Array.from({length:count},()=>({origin:new THREE.Vector3(),velocity:new THREE.Vector3(),rotation:new THREE.Vector3(),spin:new THREE.Vector3(),scale:new THREE.Vector3(),delay:0}));
 }
 function instances(geometry,material,count) {
  const mesh = own(new THREE.InstancedMesh(geometry,material,count));
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); mesh.frustumCulled=false; return mesh;
 }
 for(let i=0;i<4;i++){
  const group=new THREE.Group();group.visible=false;root.add(group);
  const shardMaterial=own(new THREE.MeshStandardMaterial({color:0xffffff,emissive:0x294c5b,emissiveIntensity:.12,metalness:.28,roughness:.4,flatShading:true,transparent:true,opacity:0,depthWrite:false}));
  const dustMaterial=own(new THREE.MeshBasicMaterial({color:0xbeb6a3,transparent:true,opacity:0,depthWrite:false}));
  const pressureMaterial=own(new THREE.MeshBasicMaterial({color:0xe0edf0,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));
  const contactMaterial=own(new THREE.MeshBasicMaterial({color:0xf3fbff,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));
  const shards=instances(shardGeometry,shardMaterial,18),dust=instances(dustGeometry,dustMaterial,8),contact=instances(shardGeometry,contactMaterial,5);
  const pressureA=new THREE.Mesh(crescentGeometry,pressureMaterial),pressureB=new THREE.Mesh(crescentGeometry,pressureMaterial);
  pressureA.rotation.z=-.75;pressureB.rotation.z=2.5;
  group.add(shards,dust,contact,pressureA,pressureB);
  slots.push({group,shards,dust,contact,pressureA,pressureB,shardMaterial,dustMaterial,pressureMaterial,contactMaterial,
   splinters:particles(18),clouds:particles(8),gravity:new THREE.Vector3(),age:1,duration:.54,power:1,hardened:true,guarded:false,fractureAngle:0});
 }
 function readVector(value,out){
  if(Array.isArray(value))out.set(value[0],value[1],value[2]);else if(value)out.copy(value);else return false;
  return Number.isFinite(out.x)&&Number.isFinite(out.y)&&Number.isFinite(out.z);
 }
 function trigger(at,along,strength=1,options={}){
  if(disposed||!readVector(at,point)||!readVector(along,direction))return false;
  if(direction.lengthSq()<1e-8)direction.set(0,0,1);else direction.normalize();
  let slot=slots[0];for(const candidate of slots){if(!candidate.group.visible){slot=candidate;break;}if(candidate.age>slot.age)slot=candidate;}
  slot.power=Number.isFinite(strength)?THREE.MathUtils.clamp(strength,.55,1.6):1;
  slot.hardened=options.hardened!==false;slot.guarded=!!options.guarded;
  slot.duration=slot.hardened?.54:.44;slot.age=0;slot.fractureAngle=random(-.6,.6);
  slot.group.position.copy(point).addScaledVector(direction,-.04);
  slot.group.quaternion.setFromUnitVectors(normal,direction);
  slot.gravity.copy(gravity).applyQuaternion(inverse.copy(slot.group.quaternion).invert());slot.group.visible=true;
  const power=slot.power,mode=slot.guarded?'guarded':slot.hardened?'hardened':'normal',palette=palettes[mode];
  slot.shards.count=slot.hardened?18:slot.guarded?10:6;
  slot.dust.count=slot.guarded?4:8;
  slot.shardMaterial.emissive.setHex(slot.hardened?0x294c5b:0x5b3414);
  slot.shardMaterial.metalness=slot.hardened?.28:.05;
  slot.dustMaterial.color.setHex(slot.hardened?0xb7c4c8:0xb6a68c);
  slot.pressureMaterial.color.setHex(slot.hardened?0xd6eff7:0xe8d4b5);
  slot.contactMaterial.color.setHex(slot.guarded?0xffd599:slot.hardened?0xe6f9ff:0xffe5b8);
  for(let i=0;i<18;i++){
   slot.shards.setColorAt(i,color.setHex(palette[i%3]));
   const p=slot.splinters[i],angle=random(-Math.PI,Math.PI),radial=random(.8,3.2)*power;
   p.origin.set(Math.cos(angle)*.09,Math.sin(angle)*.09,0);
   p.velocity.set(Math.cos(angle)*radial,Math.sin(angle)*radial,random(2.5,5.5)*power);
   p.rotation.set(random(0,Math.PI),random(0,Math.PI),random(0,Math.PI));p.spin.set(random(-6,6),random(-6,6),random(-6,6));
   const size=random(slot.hardened?.055:.02,slot.hardened?.1:.045)*power;
   p.scale.set(size,size*random(1.6,2.8),size*.65);p.delay=random(.025,.045);
  }
  slot.shards.instanceColor.needsUpdate=true;
  for(let i=0;i<8;i++){
   const p=slot.clouds[i],angle=random(-Math.PI,Math.PI),radial=random(.6,1.5)*power;
   p.origin.set(Math.cos(angle)*.18,Math.sin(angle)*.18,.1);
   p.velocity.set(Math.cos(angle)*radial,Math.sin(angle)*radial,random(.9,2.2)*power);
   p.rotation.set(random(0,Math.PI),random(0,Math.PI),random(0,Math.PI));p.spin.set(.1,-.2,.15);
   p.scale.setScalar(random(.16,.29)*power);p.delay=random(.035,.065);
  }
  updateSlot(slot);return true;
 }
 function updateInstances(slot,particles,mesh,drifting){
  for(let i=0;i<mesh.count;i++){
   const p=particles[i],t=Math.max(0,slot.age-p.delay);
   dummy.position.copy(p.origin).addScaledVector(p.velocity,t);
   if(!drifting)dummy.position.addScaledVector(slot.gravity,.5*t*t);
   dummy.rotation.set(p.rotation.x+p.spin.x*t,p.rotation.y+p.spin.y*t,p.rotation.z+p.spin.z*t);
   if(slot.age<p.delay)dummy.scale.setScalar(0);
   else dummy.scale.copy(p.scale).multiplyScalar(drifting?.5+t*2.2:1-.45*t/slot.duration);
   dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate=true;
 }
 function updateSlot(slot){
  const age=slot.age,fade=Math.max(0,1-age/slot.duration);
  slot.shardMaterial.opacity=fade*(slot.hardened?.95:.8);
  slot.dustMaterial.opacity=Math.min(1,Math.max(0,(age-.035)/.075))*fade*(slot.hardened?.16:.2);
  slot.contactMaterial.opacity=Math.max(0,1-age/.055)*(slot.guarded?.85:.75);
  // Five uneven fracture slashes remain tight at the actual contact point.
  for(let i=0;i<5;i++){
   const angle=slot.fractureAngle+fractureAngles[i];
   dummy.position.set(Math.cos(angle)*.09,Math.sin(angle)*.09,-.035);
   dummy.rotation.set(.2*(i%2),0,angle-Math.PI/2);
   dummy.scale.set(.018*slot.power,(i===1?.55:.25+i*.025)*slot.power,.014*slot.power);dummy.updateMatrix();slot.contact.setMatrixAt(i,dummy.matrix);
  }
  slot.contact.instanceMatrix.needsUpdate=true;
  const release=Math.max(0,age-.025);
  slot.pressureMaterial.opacity=release>0?Math.max(0,1-release/.16)*(slot.guarded?.14:.24):0;
  const radius=(.45+release*5.5)*slot.power;
  slot.pressureA.scale.set(radius,radius*.72,radius);slot.pressureB.scale.set(radius*.82,radius*.56,radius*.8);
  slot.pressureA.position.set(-.12,.06,release*2);slot.pressureB.position.set(.16,-.08,release*2.2+.08);
  updateInstances(slot,slot.splinters,slot.shards,false);updateInstances(slot,slot.clouds,slot.dust,true);
 }
 function update(dt){
  if(disposed||!Number.isFinite(dt)||dt<=0)return;
  for(const slot of slots){if(!slot.group.visible)continue;slot.age=Math.min(slot.duration,slot.age+dt);if(slot.age>=slot.duration){slot.group.visible=false;continue;}updateSlot(slot);}
 }
 function reset(){
  if(disposed)return;for(const slot of slots){slot.group.visible=false;slot.age=slot.duration;slot.shardMaterial.opacity=slot.dustMaterial.opacity=slot.pressureMaterial.opacity=slot.contactMaterial.opacity=0;}
 }
 function dispose(){if(disposed)return;reset();root.removeFromParent();for(const resource of resources)resource.dispose();resources.clear();disposed=true;}
 return {trigger,update,reset,dispose};
}
