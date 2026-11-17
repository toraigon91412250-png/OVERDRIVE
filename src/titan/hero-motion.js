import * as THREE from 'three';

// The imported model uses rigid pivot groups. Add a waist/chest chain without
// changing its mesh geometry, and measure contact at the visible knuckles.
export function createHeroMotion(model){
 const body=model.getObjectByName('Body_001'),waist=new THREE.Group(),chest=new THREE.Group();
 waist.name='hero-waist';chest.name='hero-chest';waist.position.y=7.4;chest.position.y=2;
 const children=[...body.children];body.add(waist);waist.add(chest);model.updateMatrixWorld(true);
 const box=new THREE.Box3(),center=new THREE.Vector3();
 for(const child of children){if(['Pivot_050','Pivot_073'].includes(child.name))continue;box.setFromObject(child).getCenter(center);body.worldToLocal(center);(center.y>9.4?chest:waist).attach(child);}
 const pairs=names=>names.map(name=>model.getObjectByName(name));
 const arms=pairs(['Pivot_096','Pivot_120']),elbows=pairs(['Pivot_103','Pivot_127']),hands=pairs(['Pivot_108','Pivot_132']),hips=pairs(['Pivot_050','Pivot_073']),knees=pairs(['Pivot_055','Pivot_078']),feet=pairs(['Pivot_061','Pivot_084']);
 // Close the supplied open hands using their existing finger meshes.
 for(const hand of hands){const digits=[...hand.children];for(let i=0;i<4;i++){const pivot=new THREE.Group();pivot.position.set(digits[2+i*2].position.x,-.43,.04);hand.add(pivot);hand.updateWorldMatrix(true,true);pivot.attach(digits[2+i*2]);pivot.attach(digits[3+i*2]);pivot.rotation.x=-2.25;}const thumb=digits[10],pivot=new THREE.Group();pivot.position.copy(thumb.position);hand.add(pivot);hand.updateWorldMatrix(true,true);pivot.attach(thumb);pivot.rotation.z=hand===hands[0]?-.65:.65;}
 model.updateWorldMatrix(true,true);
 const joints=[...arms,...elbows,...hands,...hips,...knees,...feet];const bases=new Map(joints.map(o=>[o,o.quaternion.clone()]));
 const knuckles=hands.map(hand=>{box.setFromObject(hand);const p=box.getCenter(new THREE.Vector3());hand.worldToLocal(p);const marker=new THREE.Object3D();marker.name='hero-knuckles';marker.position.copy(p);hand.add(marker);return marker;});
 // Measure contact before adding the crystal shell. These meshes follow the
 // wrist and lower arm, while the existing knuckles remain the only hit path.
 const hardeningParts=[],crystal=new THREE.MeshStandardMaterial({color:0xc9e6f0,metalness:.28,roughness:.26,flatShading:true,emissive:0x163142,emissiveIntensity:.12});
 const facet=new THREE.MeshStandardMaterial({color:0xedf6f6,metalness:.20,roughness:.32,flatShading:true});
 const crystalGeometry=new THREE.IcosahedronGeometry(1,0),forearmGeometry=new THREE.CylinderGeometry(.38,.47,1.2,6,1,false);
 const plateShape=new THREE.Shape();plateShape.moveTo(-.105,-.25);plateShape.lineTo(.105,-.25);plateShape.lineTo(.105,.25);plateShape.lineTo(-.105,.25);plateShape.closePath();
 const knucklePlate=new THREE.ExtrudeGeometry(plateShape,{depth:.16,bevelEnabled:true,bevelThickness:.035,bevelSize:.025,bevelSegments:1,steps:1});knucklePlate.translate(0,0,-.08);
 function hardeningMesh(parent,geometry,material,position,scale){const mesh=new THREE.Mesh(geometry,material);mesh.position.set(...position);mesh.scale.set(...scale);mesh.castShadow=mesh.receiveShadow=true;parent.add(mesh);return mesh;}
 for(let i=0;i<2;i++){
  const shell=new THREE.Group(),cuff=new THREE.Group();shell.name='hero-hardening-fist-'+i;cuff.name='hero-hardening-forearm-'+i;
  shell.position.copy(knuckles[i].position);hands[i].add(shell);cuff.position.set(i?.16:-.16,-1.85,.12);elbows[i].add(cuff);
  hardeningMesh(shell,crystalGeometry,crystal,[0,0,-.04],[.60,.54,.50]);
  for(let finger=0;finger<4;finger++)hardeningMesh(shell,knucklePlate,[facet,crystal],[(finger-1.5)*.27,-.13,.43],[1,1,1]);
  hardeningMesh(shell,crystalGeometry,facet,[i?.43:-.43,.12,-.04],[.20,.29,.27]);
  hardeningMesh(cuff,forearmGeometry,crystal,[0,0,0],[1,1,1]);
  for(const side of [-1,1])hardeningMesh(cuff,crystalGeometry,facet,[side*.31,-.30,.23],[.24,.45,.29]);
  shell.visible=cuff.visible=false;hardeningParts.push(shell,cuff);
 }
 function setHardening(amount){for(const part of hardeningParts){part.visible=amount>.001;part.scale.setScalar(Math.max(.001,amount));}}
 const smooth=(a,b,t)=>{const f=THREE.MathUtils.clamp((t-a)/(b-a),0,1);return f*f*(3-2*f);};
 const jointRotation=new THREE.Quaternion();
 function aimJoint(node,from,to){const parentRotation=node.parent.getWorldQuaternion(new THREE.Quaternion()).invert();const a=from.clone().normalize().applyQuaternion(parentRotation),b=to.clone().normalize().applyQuaternion(parentRotation);jointRotation.setFromUnitVectors(a,b);node.quaternion.premultiply(jointRotation);model.updateWorldMatrix(true,true);}
 function placeFist(index,target){
  const shoulder=arms[index].getWorldPosition(new THREE.Vector3()),elbow=elbows[index].getWorldPosition(new THREE.Vector3()),fist=knuckles[index].getWorldPosition(new THREE.Vector3());
  const upper=shoulder.distanceTo(elbow),lower=elbow.distanceTo(fist),axis=target.clone().sub(shoulder),distance=THREE.MathUtils.clamp(axis.length(),Math.abs(upper-lower)+.01,upper+lower-.025);axis.normalize();
  // Elbow bends down and outward while the fist travels along the face-height line.
  const bend=new THREE.Vector3(index? .6:-.6,-1,-.1).transformDirection(body.matrixWorld);bend.addScaledVector(axis,-bend.dot(axis)).normalize();
  const along=(upper*upper-lower*lower+distance*distance)/(2*distance),height=Math.sqrt(Math.max(0,upper*upper-along*along)),desiredElbow=shoulder.clone().addScaledVector(axis,along).addScaledVector(bend,height);
  aimJoint(arms[index],elbow.clone().sub(shoulder),desiredElbow.clone().sub(shoulder));
  const actualElbow=elbows[index].getWorldPosition(new THREE.Vector3()),actualFist=knuckles[index].getWorldPosition(new THREE.Vector3());aimJoint(elbows[index],actualFist.sub(actualElbow),target.clone().sub(actualElbow));
 }
 function pose({phase=0,speed=0,grounded=true,attackTime=-1,side=1,air=grounded?0:1,vy=0,land=0,lean=0,bank=0,time=0,roar=0,crouch=0,guard=0,lowStrike=false,direction=1,strafe=0,recoil=0,contact=null}){
  for(const node of joints)node.quaternion.copy(bases.get(node));
  const moving=THREE.MathUtils.clamp(speed/12,0,1),running=THREE.MathUtils.clamp((speed-12)/7,0,1),airWeight=THREE.MathUtils.clamp(air,0,1),groundWeight=1-airWeight;
  const t=attackTime,attacking=t>=0,attackWeight=attacking?1-smooth(.46,.76,t):0,wind=attacking?smooth(0,.16,t)*(1-smooth(.16,.29,t)):0,drive=attacking?smooth(.16,.28,t)*(1-smooth(.36,.66,t)):0;
  const lowWeight=attacking&&lowStrike?drive:0;
  const stride=Math.sin(phase),breath=Math.sin(time*1.6),rising=THREE.MathUtils.clamp(vy/16+.5,0,1),walkTwist=stride*moving*groundWeight;
  const guardWeight=THREE.MathUtils.clamp(guard,0,1)*(1-attackWeight);
  const readyWeight=(1-moving)*groundWeight*(1-crouch)*(1-roar)*(1-attackWeight),recoilWeight=recoil*(1-attackWeight);
  const squat=Math.max(land,crouch,guardWeight*.16)+.11*readyWeight+.15*recoilWeight,roarWeight=roar*(1-attackWeight)*(1-guardWeight),mix=THREE.MathUtils.lerp;
  // Locomotion can lean into a run. A punch keeps its established shoulder
  // position so the face-height target still produces an extended straight.
  const movingWaist=.05*moving+.1*running+lean+squat*.4-.3*roarWeight+.04*breath*(1-moving)*(1-roarWeight);
  const movingChest=.03*moving+.06*running-.22*roarWeight+.015*breath*(1-moving)-.08*airWeight*rising;
  waist.rotation.set(mix(movingWaist,-.035*moving-.075*drive,attackWeight),mix(-.1*walkTwist+.06*readyWeight,side*(.24*wind-.31*drive),attackWeight),mix(bank*.7,-side*.045*drive,attackWeight));
  chest.rotation.set(mix(movingChest,-.04*drive,attackWeight),mix(.14*walkTwist-.12*readyWeight,side*(.32*wind-.43*drive)+stride*.025*moving,attackWeight),bank*.5*(1-attackWeight));
  chest.rotation.x-=recoilWeight*.18;waist.rotation.x-=recoilWeight*.07;
  waist.rotation.x-=guardWeight*.055;chest.rotation.x-=guardWeight*.035;
  // A short opponent needs a visible body drop and downward strike; this
  // changes the real fist path without steering the attack or widening it.
  waist.rotation.x+=lowWeight*.78;chest.rotation.x+=lowWeight*.28;
  let longestLeg=0;
  for(let i=0;i<2;i++){
   const s=i?1:-1,legPhase=phase+(s>0?0:Math.PI),forwardSwing=Math.sin(legPhase),swingLift=Math.cos(legPhase),amplitude=(.4+.2*running)*moving,active=attacking&&s===side;
   let thigh=-forwardSwing*amplitude*direction-.7*squat+(s<0?-.12:.10)*readyWeight,knee=.06+.04*moving+Math.max(0,swingLift)*(.5+.6*running)*moving+Math.max(0,-swingLift)*Math.max(0,forwardSwing)*.18*moving+1.4*squat;
   thigh=mix(thigh,mix(-.32,s>0?-.8:-.22,rising),airWeight);knee=mix(knee,mix(.45,s>0?1.3:.75,rising),airWeight);
   if(attacking){
    const swing=stride*s*moving,attackThigh=(grounded?swing*.25:-.30)+(grounded?(active?-.12*wind+.18*drive:-.16*drive+.12*wind):0),attackKnee=(grounded?.12+Math.max(0,-swing)*.4:.65)+(grounded?(active?.24*wind:.15*drive):0);
    thigh=mix(thigh,attackThigh,attackWeight);knee=mix(knee,attackKnee,attackWeight);
   }
   thigh-=lowWeight*.65;knee+=lowWeight*1.25;
   hips[i].rotateX(thigh);hips[i].rotateZ(s*.045*readyWeight+strafe*forwardSwing*amplitude*.6*groundWeight*(1-attackWeight));
   hips[i].rotateY(s*.08*readyWeight+(attacking&&grounded?s*drive*(active?.13:.04)*attackWeight:0));
   knees[i].rotateX(knee);feet[i].rotateX(-(thigh+knee)*.92*groundWeight-Math.max(0,swingLift)*.18*moving*groundWeight+airWeight*.25);
   feet[i].rotateY(s*.07*readyWeight+(attacking&&grounded&&active?s*.12*drive*attackWeight:0));
   longestLeg=Math.max(longestLeg,3.25*Math.cos(thigh)+3.22*Math.cos(thigh+knee));
   arms[i].rotateX(-.55);arms[i].rotateZ(s*.08);elbows[i].rotateX(-1.22);hands[i].rotateZ(-s*.12);
   if(active){arms[i].rotateY(-s*.22*drive);hands[i].rotateX(-.12*drive);}
  }
  model.updateWorldMatrix(true,true);
  for(let i=0;i<2;i++){
   const s=i?1:-1,active=attacking&&s===side,armSwing=-Math.sin(phase+(s>0?0:Math.PI))*moving*groundWeight;
   // One fist scouts ahead while the rear hand stays beside the jaw. This
   // stance is retained on recovery instead of returning to a symmetric pose.
   const target=new THREE.Vector3(s*(i?1.13:1.20),12.7+(i?.10:-.10)+breath*.04*(1-moving)-.15*moving*Math.abs(Math.cos(phase)),(i?1.22:1.68)+armSwing*.45);
   target.lerp(new THREE.Vector3(s*1.6,10.6+Math.max(0,armSwing)*1.3,.7+armSwing*2.4),running*(1-attackWeight));
   target.lerp(new THREE.Vector3(s*2.7,12.6+rising*.7,.6),airWeight*.75*(1-attackWeight));
   target.y-=land*1.1*(1-attackWeight);target.z+=land*.5*(1-attackWeight);
   target.lerp(new THREE.Vector3(s*1.7,8.4,2.6),crouch*(1-attackWeight));target.lerp(new THREE.Vector3(s*3.5,10.4,-.4),roarWeight);
   if(active)target.set(s*(1.25-.55*drive),12.7,1.35-.35*wind+3.8*drive);
   if(active){target.y-=6.5*lowWeight;target.z-=2*lowWeight;}
   else if(attacking)target.lerp(new THREE.Vector3(s*1.02,12.92,1.65-.1*drive),attackWeight);
   // Close fists and forearms cover the face/chest instead of spreading into
   // the locomotion swing. Attack priority releases this pose immediately.
   target.lerp(new THREE.Vector3(s*.72,13.05+(i?.12:0),2.15),guardWeight);
   target.z-=recoilWeight*.24;target.y+=recoilWeight*.16;
   const worldTarget=body.localToWorld(target);
   if(active&&contact&&contact.side===side){
    // Hold the actual fist at its first contact, then withdraw into guard.
    // No target snapping or additional reach is introduced.
    const stick=1-smooth(.035,.20,contact.age);
    worldTarget.lerp(contact.point,stick);
   }
   placeFist(i,worldTarget);
  }
  return Math.max(0,6.47-longestLeg)*groundWeight;
 }

 return {pose,setHardening,knuckle:side=>knuckles[side>0?1:0].getWorldPosition(new THREE.Vector3()),waist,chest};
}
