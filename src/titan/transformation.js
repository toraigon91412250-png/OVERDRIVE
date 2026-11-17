import * as THREE from 'three';
import {loadAsset} from './models.js';
import {createTransformationFX} from './transformation-fx.js';
import {createHeroMotion} from './hero-motion.js';
export function createTransformation(ctx){
 const {scene,P}=ctx,fx=createTransformationFX(scene),root=new THREE.Group();root.name='player-attack-titan';root.visible=false;scene.add(root);
 const foot=new THREE.Vector3(),forward=new THREE.Vector3(),desired=new THREE.Vector3(),old=new THREE.Vector3();
 let state='human',energy=100,health=100,elapsed=0,cooldown=0,attack=0,attackSide=-1,poseTime=0,spawned=false,oldThird=false,motion=null,attackYaw=0,travel=0,previousFist=null,queuedPunch=false,recoil=0,contactResponse=null;
 let guardHeld=false,guardStamina=100,guardBroken=0,guardAge=Infinity,guardRecovery=0,guardPose=0,counterSeconds=0,counterAttack=false,perfectFlash=0,perfectAvailable=false,guardResult=null,lowStrike=false;
 let hardeningRemaining=0,hardeningCooldown=0,hardeningAge=0;
 const previewSweeps=[],previewMatrix=new THREE.Matrix4(),previewRotation=new THREE.Quaternion(),previewPosition=new THREE.Vector3();
 const hitEnemies=new Set();const ready=loadAsset('attack').then(gltf=>{
  const model=gltf.scene.clone(true),box=new THREE.Box3().setFromObject(model),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());
  model.position.set(-center.x,-box.min.y,-center.z);root.scale.setScalar(15/size.y);root.add(model);
  motion=createHeroMotion(model);
  // Cache actual supplied-rig knuckles once. HUD previews never animate the
  // live rig or substitute a broad arbitrary distance for the fist's reach.
  for(const low of [false,true])for(const side of [-1,1]){
   const points=[.144,.16,.20,.24,.28,.32,.38,.43].map(time=>{
    const dip=motion.pose({attackTime:time,side,lowStrike:low}),position=root.worldToLocal(motion.knuckle(side));position.y-=dip;
    return {position,advance:THREE.MathUtils.smoothstep(time,.14,.32)*1.45};
   });
   for(let i=1;i<points.length;i++)previewSweeps.push({from:points[i-1].position,to:points[i].position,fromAdvance:points[i-1].advance,toAdvance:points[i].advance,side,low});
  }
  motion.pose({});
  spawned=true;
 });
 // Visual motion follows physical velocity; collision and attack timing stay in the simulation.
 const gait={};
 function resetGait(){Object.assign(gait,{yaw:P.yaw,forwardSpeed:0,bank:0,lean:0,speed:0,air:0,grounded:true,verticalSpeed:0,land:0,time:0,footstep:0,direction:1,strafe:0});poseTime=0;recoil=0;contactResponse=null;}
 resetGait();
 const active=()=>state==='titan'||state==='emerging';
 const guarding=()=>state==='titan'&&guardHeld&&guardBroken<=0&&guardStamina>0&&attack<=0;
 function resetHardening(){hardeningRemaining=0;hardeningCooldown=0;hardeningAge=0;motion?.setHardening(0);}
 function activateHardening(){
  if(state!=='titan')return false;
  if(hardeningRemaining>0)return false;
  if(hardeningCooldown>0){ctx.notice('硬質化まで '+Math.ceil(hardeningCooldown)+'秒');return false;}
  if(energy<14){ctx.notice('硬質化に必要な巨人化ゲージが足りない');return false;}
  energy-=14;hardeningRemaining=6;hardeningCooldown=8;hardeningAge=0;motion.setHardening(.02);ctx.sound?.(520,.16);ctx.shake?.(.1);return true;
 }
 function resetGuard(){guardHeld=false;guardStamina=100;guardBroken=0;guardAge=Infinity;guardRecovery=0;guardPose=0;counterSeconds=0;counterAttack=false;perfectFlash=0;perfectAvailable=false;guardResult=null;lowStrike=false;}
 function setGuardHeld(held){
  if(!held){guardHeld=false;guardAge=Infinity;perfectAvailable=false;return false;}
  if(state!=='titan'||guardBroken>0)return false;
  if(!guardHeld){guardAge=0;perfectAvailable=attack<=0;queuedPunch=false;}
  guardHeld=true;return guarding();
 }
 function breakGuard(){guardHeld=false;guardBroken=1.2;guardRecovery=1.2;guardStamina=0;guardAge=Infinity;perfectAvailable=false;counterSeconds=0;ctx.shake?.(.5);ctx.thud?.(.65);ctx.notice('ガードが崩れた / 距離を取って回復');}
 function reset(){state='human';energy=100;health=100;cooldown=0;attack=0;queuedPunch=false;attackSide=-1;hitEnemies.clear();previousFist=null;resetGait();resetGuard();resetHardening();root.visible=false;fx.reset();P.titanForm=false;P.titanEntering=false;ctx.humanVisual.visible=true;}
 function exit(reason=''){if(!active())return false;state='human';contactResponse=null;resetGuard();resetHardening();P.titanForm=false;P.titanEntering=false;root.visible=false;fx.reset();ctx.humanVisual.visible=true;P.third=oldThird;P.pos.y=Math.max(P.pos.y,13);P.vel.set(Math.sin(P.yaw)*8,8,Math.cos(P.yaw)*8);P.invulnerable=2;P.gas=100;P.launchAssist=.4;cooldown=8;attack=0;queuedPunch=false;ctx.notice(reason||'巨人から離脱 / 立体機動に復帰');return true;}
 function toggle(){
  if(state==='titan')return exit();if(state==='emerging')return false;
  if(!spawned||energy<40||cooldown>0){ctx.notice(cooldown>0?'再巨人化まで '+Math.ceil(cooldown)+'秒':'巨人化ゲージが足りない');return false;}
  ctx.releaseWires();ctx.disarm();oldThird=P.third;health=100;state='emerging';P.titanForm=true;P.titanEntering=true;elapsed=0;attack=0;queuedPunch=false;resetGait();resetGuard();resetHardening();
  foot.set(P.pos.x,Math.max(0,P.pos.y-1.78),P.pos.z);root.position.copy(foot);root.rotation.y=P.yaw+Math.PI;root.visible=true;ctx.humanVisual.visible=false;P.vel.set(0,0,0);P.pos.y=foot.y+12.8;ctx.resolveWorld(P.pos.clone(),12.8,2.2);foot.set(P.pos.x,P.pos.y-12.8,P.pos.z);P.invulnerable=3;fx.begin(foot);ctx.notice('巨人化 — 雷光が集まる');ctx.sound?.(80,.5);return true;
 }
 function update(dt){
  cooldown=Math.max(0,cooldown-dt);
  if(state==='human'){energy=Math.min(100,energy+dt*.8);return;}
  elapsed+=dt;fx.update(elapsed);
  if(state==='emerging'){
   const progress=THREE.MathUtils.clamp((elapsed-.55)/1.35,0,1);
   const growth=Math.max(.025,1+2.2*(progress-1)**3+1.2*(progress-1)**2);
   root.userData.growth=growth;root.scale.setScalar(root.userData.fullScale*growth);
   const crouch=1-THREE.MathUtils.smoothstep(elapsed,1.05,1.7),roar=THREE.MathUtils.smoothstep(elapsed,1.3,1.8);
   root.position.copy(foot);
   const dip=motion?.pose({grounded:true,air:0,time:elapsed,crouch,roar})||0;
   root.position.y-=dip*root.scale.x;
   if(elapsed>=2.2){
    state='titan';P.titanEntering=false;root.scale.setScalar(root.userData.fullScale);
    gait.grounded=P.grounded;gait.air=P.grounded?0:1;gait.verticalSpeed=P.vel.y;
    ctx.burst?.(foot);ctx.shake?.(.9);ctx.thud?.(1);ctx.notice('巨人化 / クリックで拳・右クリック長押しでガード・Tで離脱');
   }
   // The emergence owns this frame's pose; locomotion must not overwrite its crouch.
   return;
  }
  energy=Math.max(0,energy-dt*(100/40));if(energy<=0||health<=0){exit(health<=0?'巨人体が限界 / 離脱':'巨人化時間終了 / 離脱');return;}
  hardeningCooldown=Math.max(0,hardeningCooldown-dt);hardeningRemaining=Math.max(0,hardeningRemaining-dt);
  if(hardeningRemaining>0)hardeningAge+=dt;
  motion?.setHardening(THREE.MathUtils.smoothstep(hardeningAge,0,.15)*THREE.MathUtils.smoothstep(hardeningRemaining,0,.25));
  guardBroken=Math.max(0,guardBroken-dt);guardRecovery=Math.max(0,guardRecovery-dt);counterSeconds=Math.max(0,counterSeconds-dt);perfectFlash=Math.max(0,perfectFlash-dt);
  if(guardHeld)guardAge+=dt;
  if(guardHeld&&guardBroken<=0&&attack<=0){guardStamina=Math.max(0,guardStamina-dt*9);if(guardStamina<=0)breakGuard();}
  else if(!guardHeld&&guardRecovery<=0&&guardBroken<=0)guardStamina=Math.min(100,guardStamina+dt*24);
  guardPose+=((guarding()?1:0)-guardPose)*Math.min(1,dt*18);
  const wasAttack=attack;attack=Math.max(0,attack-dt);
  if(contactResponse){
   contactResponse.age+=dt;
   const recovery=THREE.MathUtils.smoothstep(contactResponse.age,.035,contactResponse.duration);
   attack=Math.max(0,.76-THREE.MathUtils.lerp(contactResponse.attackTime,.76,recovery));
   if(contactResponse.age>=contactResponse.duration){attack=0;contactResponse=null;}
  }
  recoil=Math.max(0,recoil-dt*3.8);
  const t=attack>0?.76-attack:-1,speed=Math.hypot(P.vel.x,P.vel.z),safeDt=Math.max(dt,1e-4);
  const targetYaw=attack>0?attackYaw:P.yaw,turn=Math.atan2(Math.sin(targetYaw-gait.yaw),Math.cos(targetYaw-gait.yaw))*Math.min(1,dt*(attack>0?16:7));
  gait.yaw+=turn;
  const forwardSpeed=-Math.sin(gait.yaw)*P.vel.x-Math.cos(gait.yaw)*P.vel.z,acceleration=(forwardSpeed-gait.forwardSpeed)/safeDt;
  if(speed>.4){gait.direction+=(forwardSpeed/speed-gait.direction)*Math.min(1,dt*10);gait.strafe+=((Math.cos(gait.yaw)*P.vel.x-Math.sin(gait.yaw)*P.vel.z)/speed-gait.strafe)*Math.min(1,dt*10);}
  gait.forwardSpeed=forwardSpeed;
  gait.bank+=(THREE.MathUtils.clamp(-turn/safeDt*Math.min(1,speed/10)*.07,-.16,.16)-gait.bank)*Math.min(1,dt*6);
  gait.lean+=(THREE.MathUtils.clamp(acceleration*.01,-.1,.14)-gait.lean)*Math.min(1,dt*4);
  gait.speed+=(speed-gait.speed)*Math.min(1,dt*7);
  gait.air+=((P.grounded?0:1)-gait.air)*Math.min(1,dt*(P.grounded?16:5));
  if(P.grounded&&!gait.grounded){
   const impact=THREE.MathUtils.clamp((-gait.verticalSpeed-3)/20,0,1);
   if(impact>0){gait.land=Math.max(gait.land,.3+impact*.7);ctx.shake?.(.25+impact*.9);ctx.thud?.(.5+impact*.5);}
  }
  gait.grounded=P.grounded;gait.verticalSpeed=P.vel.y;gait.land=Math.max(0,gait.land-dt*2.4);gait.time+=dt;
  poseTime+=dt*Math.PI*2*(.4+gait.speed*.045)*Math.min(1,gait.speed/2)*(attack>0?.25:1);
  const footstep=Math.floor(poseTime/Math.PI+.5);
  if(footstep!==gait.footstep){gait.footstep=footstep;if(P.grounded&&gait.speed>3&&attack<=0){ctx.shake?.(.08+.18*Math.min(1,gait.speed/19));ctx.thud?.(.25+.4*Math.min(1,gait.speed/19));}}
  if(P.grounded&&wasAttack>.60&&attack<=.60){ctx.thud?.(.28);ctx.shake?.(.07);}
  root.rotation.y=gait.yaw+Math.PI;root.position.set(P.pos.x,P.pos.y-12.8,P.pos.z);
  const dip=motion?.pose({phase:poseTime,speed:gait.speed,grounded:P.grounded,attackTime:t,side:attackSide,air:gait.air,vy:P.vel.y,land:gait.land,lean:gait.lean,bank:gait.bank,time:gait.time,guard:guardPose,lowStrike,direction:gait.direction,strafe:gait.strafe,recoil,contact:contactResponse,roar:THREE.MathUtils.smoothstep(elapsed,1.3,1.8)*(1-THREE.MathUtils.smoothstep(elapsed,2.4,3))})||0;
  root.position.y-=dip*root.scale.x;
  if(wasAttack>0&&motion){const fist=motion.knuckle(attackSide);if(t>=.16&&t<=.43&&previousFist){ctx.punch?.({origin:P.pos.clone().add(new THREE.Vector3(0,-3,0)),from:previousFist,to:fist,radius:.8,side:attackSide,direction:new THREE.Vector3(-Math.sin(attackYaw),0,-Math.cos(attackYaw)),hitEnemies,counter:counterAttack,hardened:hardeningRemaining>0});}previousFist=fist;}
  if(wasAttack>0&&attack===0){counterAttack=false;lowStrike=false;}
  if(wasAttack>0&&attack===0&&queuedPunch){queuedPunch=false;punch();}
 }
 ready.then(()=>{root.userData.fullScale=root.scale.x;});
 function step(dt,control,boost){if(!active())return false;old.copy(P.pos);if(state==='emerging'){P.vel.set(0,0,0);return true;}
  forward.set(-Math.sin(P.yaw),0,-Math.cos(P.yaw));desired.copy(forward).multiplyScalar(control.f).addScaledVector(new THREE.Vector3(Math.cos(P.yaw),0,-Math.sin(P.yaw)),control.r);if(desired.lengthSq()>1)desired.normalize();const moveSpeed=guarding()?4.2:guardBroken>0?7:boost?19:12;desired.multiplyScalar(moveSpeed*(attack>0&&P.grounded?.55:1));
  P.vel.x+=(desired.x-P.vel.x)*Math.min(1,dt*9);P.vel.z+=(desired.z-P.vel.z)*Math.min(1,dt*9);P.vel.y-=24*dt;P.pos.addScaledVector(P.vel,dt);
  if(attack>0&&P.grounded&&!contactResponse){const t=.76-attack,f=THREE.MathUtils.smoothstep(t,.14,.32),distance=f*1.45,advance=Math.max(0,distance-travel);P.pos.x-=Math.sin(attackYaw)*advance;P.pos.z-=Math.cos(attackYaw)*advance;travel=distance;}
  ctx.resolveWorld(old,12.8,2.2);
  P.pos.x=Math.max(-558,Math.min(558,P.pos.x));P.pos.z=Math.max(-558,Math.min(558,P.pos.z));return true;
 }
 function confirmPunchContact({side=attackSide,guarded=false,hardened=false}={}){
  if(state!=='titan'||attack<=0||side!==attackSide||contactResponse)return false;
  contactResponse={age:0,side,point:motion.knuckle(side),attackTime:.76-attack,duration:guarded?.24:.30,guarded,hardened};
  P.vel.x*=.35;P.vel.z*=.35;return true;
 }
 function jump(){if(state==='titan'&&P.grounded){P.vel.y=19;P.grounded=false;return true;}return false;}
 function punch(){if(state!=='titan'||guardHeld||guardBroken>0)return false;if(attack>0){if(attack<=.22)queuedPunch=true;return false;}counterAttack=counterSeconds>0;counterSeconds=0;lowStrike=!!ctx.punchTarget?.()?.low;guardPose=0;contactResponse=null;attack=.76;attackSide*=-1;attackYaw=P.yaw;travel=0;hitEnemies.clear();previousFist=motion.knuckle(attackSide);ctx.sound?.(counterAttack?180:120,.12);return true;}
 function hurt(amount,context={}){
  if(!active()||state==='emerging')return active();
  guardResult=null;
  if(!Number.isFinite(amount)||amount<=0)return true;
  let damage=amount*24;
  const source=context.source,melee=['melee','punch','swipe','bite','grab'].includes(context.kind||'melee');
  if(guarding()&&melee&&source){
   const dx=source.x-P.pos.x,dz=source.z-P.pos.z,length=Math.hypot(dx,dz),front=length>.01?(-Math.sin(P.yaw)*dx-Math.cos(P.yaw)*dz)/length:-1;
   if(front>=.35){
    const perfect=perfectAvailable&&guardAge<=.25,cost=amount*(perfect?14:29);
    guardRecovery=.65;perfectAvailable=false;
    if(guardStamina>=cost){
     guardStamina-=cost;damage*=perfect?0:.22;
     guardResult=perfect?'perfect':'blocked';
     if(perfect){counterSeconds=.9;perfectFlash=.3;ctx.notice('ジャストガード / 離して打ち返せ');ctx.sound?.(420,.08);}
     else ctx.notice('正面ガード / スタミナに注意');
     recoil=Math.max(recoil,perfect?.18:.45);ctx.thud?.(perfect?.45:.3);ctx.shake?.(perfect?.12:.18);ctx.guardImpact?.({perfect,source,kind:context.kind,broken:false});
    }else{breakGuard();guardResult='broken';ctx.guardImpact?.({perfect:false,source,kind:context.kind,broken:true});}
   }
  }
  if(damage>0)recoil=Math.max(recoil,THREE.MathUtils.clamp(damage/32,.25,.9));health=Math.max(0,health-damage);return true;
 }
 function punchPreview(){
  if(state!=='titan'||guardHeld||guardBroken>0)return [];
  previewPosition.set(P.pos.x,P.pos.y-12.8,P.pos.z);previewRotation.setFromAxisAngle(THREE.Object3D.DEFAULT_UP,P.yaw+Math.PI);previewMatrix.compose(previewPosition,previewRotation,root.scale);
  const advance=P.grounded?1:0,dx=-Math.sin(P.yaw)*advance,dz=-Math.cos(P.yaw)*advance;
  const low=attack>0?lowStrike:!!ctx.punchTarget?.()?.low;
  return previewSweeps.filter(sweep=>sweep.side===-attackSide&&sweep.low===low).map(sweep=>({from:sweep.from.clone().applyMatrix4(previewMatrix).add(new THREE.Vector3(dx*sweep.fromAdvance,0,dz*sweep.fromAdvance)),to:sweep.to.clone().applyMatrix4(previewMatrix).add(new THREE.Vector3(dx*sweep.toAdvance,0,dz*sweep.toAdvance)),radius:.8}));
 }
 function addEnergy(amount){energy=Math.min(100,energy+amount);}
 return {ready,active,update,step,jump,punch,confirmPunchContact,hurt,toggle,exit,reset,addEnergy,setGuardHeld,punchPreview,activateHardening,inspect:()=>({state,energy,health,seconds:Math.max(0,energy*.4),cooldown,attack,attackSide,contactResponse:contactResponse?{age:contactResponse.age,side:contactResponse.side}:null,lowStrike,guarding:guarding(),guardHeld,guardStamina,guardBroken,guardResult,counterSeconds,counterAttack,perfectGuard:perfectFlash>0,hardened:hardeningRemaining>0,hardeningRemaining,hardeningCooldown,fist:motion&&active()?motion.knuckle(attackSide).toArray():null,hitCount:hitEnemies.size,ready:spawned})};
}
