import * as THREE from 'three';
export function createCombatAssist(ctx){
 const {P,hooks,entries}=ctx,point=new THREE.Vector3(),delta=new THREE.Vector3(),forward=new THREE.Vector3(),right=new THREE.Vector3(),segment=new THREE.Vector3(),closest=new THREE.Vector3(),aimDirection=new THREE.Vector3();let focus=null,dash=null;
 const NAPE_REAR_MIN=.78,NAPE_STAGE_REAR_MIN=.86,NAPE_STAGE_RADIUS=.9;
 const wrap=x=>Math.atan2(Math.sin(x),Math.cos(x));
 function part(entry){const v=entry.V,choices=[];if(v.armorL)choices.push(['armorL',v.armorPlateL]);if(v.armorR)choices.push(['armorR',v.armorPlateR]);if(!choices.length)return {name:'nape',mesh:v.weak};let best=choices[0],distance=Infinity;for(const choice of choices){choice[1].getWorldPosition(point);const d=point.distanceToSquared(P.pos);if(d<distance){distance=d;best=choice;}}return {name:best[0],mesh:best[1]};}
 function select(direction,preferred=null){let best=null,cost=Infinity;for(const entry of entries){if(!entry.enabled||!entry.V.alive)continue;if(preferred&&entry.V!==preferred)continue;
  const target=part(entry);target.mesh.getWorldPosition(point);delta.copy(point).sub(P.pos);const closeDistance=delta.length();
  // At blade range the neck can fill the view while the giant's torso is far below it.
  // Acquire the visible weak point directly before applying the distant body cone.
  if(closeDistance>=.5&&closeDistance<=8.5&&delta.dot(direction)/closeDistance>=.75&&(!ctx.canReach||ctx.canReach(P.pos,point))){const score=-1+closeDistance*.006;if(score<cost){cost=score;best=entry;}continue;}
  const h=ctx.height(entry);point.copy(entry.V.root.position);point.y+=h*.62;delta.copy(point).sub(P.pos);const along=delta.dot(direction),distance=delta.length();if(along<1||distance>110)continue;const perpendicular=Math.sqrt(Math.max(0,delta.lengthSq()-along*along));if(perpendicular>Math.max(h*.28+1.5,along*.10))continue;target.mesh.getWorldPosition(point);if(ctx.canReach&&!ctx.canReach(P.pos,point))continue;const score=perpendicular/Math.max(1,along)*12+distance*.006;if(score<cost){cost=score;best=entry;}}return best;}
 function lock(entry){if(focus?.entry===entry)return focus;const target=part(entry),local=entry.V.root.worldToLocal(P.pos.clone());const aim=entry.V.root.worldToLocal(target.mesh.getWorldPosition(new THREE.Vector3()));const angle=Math.atan2(aim.x,aim.z);focus={entry,part:target.name,side:Math.abs(angle)<2.6?Math.sign(angle)||1:Math.sign(local.x)||1,phase:'orbit',atStage:false,arrived:false,hold:1,charged:target.mesh.getWorldPosition(point).distanceTo(P.pos)>12};ctx.setTarget(entry.V);return focus;}
 function targetPoint(){if(!focus)return null;const target=part(focus.entry);focus.part=target.name;target.mesh.getWorldPosition(point);return {target,point:point.clone()};}
 function route(){
  const data=targetPoint();if(!data)return null;const {target,point:attackPoint}=data,v=focus.entry.V,local=v.root.worldToLocal(P.pos.clone());
  forward.set(0,0,1).applyQuaternion(v.root.quaternion);right.set(1,0,0).applyQuaternion(v.root.quaternion);
  const nape=target.name==='nape',offset=P.pos.clone().sub(attackPoint),distance=offset.length(),rearAlignment=nape&&distance>.1?-offset.dot(forward)/distance:1,approach=attackPoint.clone();
  if(nape){approach.addScaledVector(forward,-6.5).addScaledVector(right,focus.side*1.8);approach.y-=.8;}
  const approachLocal=v.root.worldToLocal(approach.clone()),current=Math.atan2(local.x,local.z),goal=Math.atan2(approachLocal.x,approachLocal.z);let difference=wrap(goal-current);if(Math.abs(difference)>2.6)difference=focus.side*Math.abs(difference);
  if(nape&&focus.atStage){if(rearAlignment>=NAPE_REAR_MIN&&distance<=8.5){focus.phase='staging';return {target,point:approach,attackPoint,atStage:true};}focus.atStage=false;focus.arrived=false;}
  if(nape&&P.pos.distanceTo(approach)<=NAPE_STAGE_RADIUS&&rearAlignment>=NAPE_STAGE_REAR_MIN){focus.atStage=true;focus.phase='staging';return {target,point:approach,attackPoint,atStage:true};}
  if(Math.abs(difference)<.38){focus.phase=nape?'approach':'strike';return {target,point:approach,attackPoint};}
  focus.phase='orbit';const angle=current+Math.max(-.8,Math.min(.8,difference)),height=ctx.height(focus.entry),radiusX=height*.19+.5,radiusZ=height*.12+.4;
  right.set(1,0,0).applyQuaternion(v.root.quaternion);forward.set(0,0,1).applyQuaternion(v.root.quaternion);
  const waypoint=v.root.position.clone().addScaledVector(right,Math.sin(angle)*radiusX).addScaledVector(forward,Math.cos(angle)*radiusZ);waypoint.y=attackPoint.y+.2;
  return {target,point:waypoint,attackPoint};
 }
 function anchor(side,direction,direct){let entry=focus?.entry?.V.alive&&hooks.some(h=>h.state!=='idle'&&h.combatAssist)?focus.entry:select(direction);if(!entry)return null;
  const distance=entry.V.root.position.distanceTo(P.pos);if(direct&&!direct.object.userData.titanPart&&direct.distance<distance*.7)return null;
  lock(entry);focus.hold=1;const data=route(),mesh=focus.phase!=='staging'&&data.target.name==='nape'?(focus.side<0?entry.V.armorPlateL:entry.V.armorPlateR):data.target.mesh,attachment=mesh.getWorldPosition(new THREE.Vector3()),normal=attachment.clone().sub(entry.V.root.position);normal.y=0;normal.normalize();const inverse=mesh.matrixWorld.clone().invert();normal.transformDirection(inverse);
  return {object:mesh,point:attachment,distance:P.pos.distanceTo(attachment),face:{normal},combatAssist:true,combatGuide:data.point.clone(),combatPhase:focus.phase};
 }
 function update(dt){P.lookOverride=Math.max(0,(P.lookOverride||0)-dt);if(!focus)return;if(!focus.entry.enabled||!focus.entry.V.alive||P.titanForm){if(dash?.hit&&!P.titanForm)return;reset();return;}
  const active=hooks.filter(h=>h.state!=='idle'&&h.combatAssist&&h.followObject?.userData.enemy===focus.entry.V);const heldPoint=focus.atStage?targetPoint()?.point:null;if(focus.atStage&&heldPoint&&P.pos.distanceTo(heldPoint)<20)focus.hold=2.5;else focus.hold-=dt;
  if(!active.length&&!dash&&focus.hold<=0){focus=null;return;}
  const data=route();const offset=P.pos.clone().sub(data.attackPoint),distance=offset.length();forward.set(0,0,1).applyQuaternion(focus.entry.V.root.quaternion);const rearAlignment=data.target.name==='nape'&&distance>.1?-offset.dot(forward)/distance:1,behind=data.target.name!=='nape'||rearAlignment>=NAPE_REAR_MIN;const arrived=data.target.name==='nape'?rearAlignment>=NAPE_REAR_MIN&&distance<8:focus.phase==='strike'&&behind&&distance<6;if(arrived&&!focus.arrived){focus.arrived=true;focus.entry.system.stagger?.(.55);}for(const hook of active){const mesh=focus.phase!=='staging'&&data.target.name==='nape'?(focus.side<0?focus.entry.V.armorPlateL:focus.entry.V.armorPlateR):data.target.mesh;hook.followObject=mesh;hook.followPoint=new THREE.Vector3();mesh.getWorldPosition(hook.anchor);hook.combatGuide=data.point.clone();hook.combatPhase=focus.phase;hook.combatCanRelease=focus.phase==='staging'||behind;}
  if(active.length)focus.hold=1;
  ctx.setTarget(focus.entry.V);
  if(active.length&&focus.phase!=='staging'&&P.lookOverride===0){if(data.target.name==='nape'){point.copy(focus.entry.V.root.position);point.y+=ctx.height(focus.entry)*.62;}else data.target.mesh.getWorldPosition(point);delta.copy(point).sub(P.pos);const distance=delta.length();if(distance<35&&distance>1.5){const yaw=Math.atan2(-delta.x,-delta.z),pitch=Math.atan2(delta.y,Math.hypot(delta.x,delta.z));P.yaw+=Math.max(-dt*1.1,Math.min(dt*1.1,wrap(yaw-P.yaw)*Math.min(1,dt*3)));P.pitch+=Math.max(-dt*.8,Math.min(dt*.8,(pitch-P.pitch)*Math.min(1,dt*3)));}}
 }
 function beginSlash(direction){if(P.titanForm||dash)return false;let entry=select(direction)||(focus?.entry?.V.alive?focus.entry:null);if(!entry)return false;lock(entry);const data=targetPoint(),distance=data.point.distanceTo(P.pos);if(distance>8.5||distance<.5)return false;
  forward.set(0,0,1).applyQuaternion(entry.V.root.quaternion);delta.copy(P.pos).sub(data.point);
  if(data.target.name==='nape'&&(delta.dot(forward)>.35||-delta.dot(forward)/distance<NAPE_REAR_MIN))return false;
  const to=data.point.clone().sub(P.pos).normalize();if(to.dot(direction)<.75||ctx.canReach&&!ctx.canReach(P.pos,data.point))return false;
  if(data.target.name!=='nape'){const local=entry.V.root.worldToLocal(P.pos.clone()),target=entry.V.root.worldToLocal(data.point.clone());if(Math.abs(wrap(Math.atan2(local.x,local.z)-Math.atan2(target.x,target.z)))>.9)return false;}
  const away=P.pos.clone().sub(data.point).normalize();right.set(1,0,0).applyQuaternion(entry.V.root.quaternion);
  const side=Math.abs(P.vel.dot(right))>5?Math.sign(P.vel.dot(right)):focus.side;
  const contact=data.point.clone().addScaledVector(away,1.2).addScaledVector(right,side*.35),exit=data.point.clone().addScaledVector(away,2.4).addScaledVector(right,side*5.5);
  dash={entry,part:data.target.name,from:P.pos.clone(),target:data.point.clone(),follow:new THREE.Vector3(),to:contact,exit,side,time:0,duration:.3,hit:false,charged:focus.charged||distance>6,launchSpeed:Math.hypot(P.vel.x,P.vel.z),launchVertical:P.vel.y};
  if(P.bladeSwing){const cameraRight=new THREE.Vector3(Math.cos(P.yaw),0,-Math.sin(P.yaw));P.bladeSwing.side=-Math.sign(right.dot(cameraRight)*side)||side;P.bladeSwing.assisted=true;}focus.phase='strike';focus.hold=1.1;P.combatGrace=.9;return true;
 }
 function step(dt){if(!dash)return false;if(P.titanForm||!dash.entry.V.alive&&!dash.hit){dash=null;return false;}const d=dash,previous=P.pos.clone();d.time+=dt;const t=Math.min(1,d.time/d.duration);
  const movingTarget=part(d.entry);movingTarget.mesh.getWorldPosition(point);
  if(!d.hit){d.follow.copy(point).sub(d.target);if(d.follow.lengthSq()>2.25)d.follow.setLength(1.5);}
  const contact=d.to.clone().add(d.follow),exit=d.exit.clone().add(d.follow);
  if(d.time<.065)P.pos.copy(d.from);
  else if(d.time<.185){const u=(d.time-.065)/.12;P.pos.lerpVectors(d.from,contact,u*u*(3-2*u));}
  else {const u=Math.min(1,(d.time-.185)/.115);P.pos.lerpVectors(contact,exit,u);}
  P.vel.copy(P.pos).sub(previous).multiplyScalar(1/Math.max(dt,.001));ctx.resolveWorld(previous,1.78,.43);
  segment.subVectors(P.pos,previous);const length=segment.lengthSq(),along=length?Math.max(0,Math.min(1,point.clone().sub(previous).dot(segment)/length)):0;closest.copy(previous).addScaledVector(segment,along);const contactDistance=point.distanceTo(closest);
  if(!d.hit&&d.time>=.13&&d.time<=.225&&contactDistance<=3){
   d.hit=ctx.slash(d.entry.V,d.part,d.charged,{from:d.from,to:d.to,contactDistance,impactPoint:point.clone(),playerPoint:closest.clone()});
   if(d.hit){if(P.bladeSwing){P.bladeSwing.time=.185;P.bladeSwing.connected=true;}ctx.releaseWires?.();if(focus){focus.charged=false;focus.hold=1;}}
  }
  if(t>=1){dash=null;ctx.releaseWires?.();
   if(d.hit){right.set(1,0,0).applyQuaternion(d.entry.V.root.quaternion);P.vel.copy(right).multiplyScalar(d.side*Math.max(22,Math.min(38,d.launchSpeed*.42+22)));P.vel.y=Math.max(4,d.launchVertical*.25);P.combatGrace=.8;}else {ctx.missFeedback?.(d.entry.V,d.part);P.vel.multiplyScalar(.25);}}
  return true;
 }
 function shot(direction,hit){const entry=hit?.object.userData.enemy?entries.find(e=>e.V===hit.object.userData.enemy):select(direction);if(!entry||!entry.V.alive)return null;const target=part(entry);target.mesh.getWorldPosition(point);delta.copy(point).sub(P.pos);if(delta.length()>160||delta.normalize().dot(direction)<.9||ctx.canReach&&!ctx.canReach(P.pos,point))return null;ctx.setTarget(entry.V);return {object:target.mesh,point:point.clone(),distance:P.pos.distanceTo(point)};}
 function reset(){focus=null;dash=null;P.combatGrace=0;for(const hook of hooks){hook.combatAssist=false;hook.combatCanRelease=false;hook.combatGuide=null;hook.combatPhase=null;}}
 function status(direction){if(!focus||!focus.entry.V.alive)return null;const data=targetPoint(),offset=P.pos.clone().sub(data.point),distance=offset.length();forward.set(0,0,1).applyQuaternion(focus.entry.V.root.quaternion);aimDirection.copy(direction||aimDirection.set(-Math.sin(P.yaw)*Math.cos(P.pitch),Math.sin(P.pitch),-Math.cos(P.yaw)*Math.cos(P.pitch)));const rearAlignment=data.target.name==='nape'&&distance>.1?-offset.dot(forward)/distance:1,aimAlignment=distance>.1?data.point.clone().sub(P.pos).normalize().dot(aimDirection):0,reachable=!ctx.canReach||ctx.canReach(P.pos,data.point);return {id:focus.entry.V.id,part:data.target.name,phase:focus.phase,atStage:!!focus.atStage,range:distance,rearAlignment,aimAlignment,ready:distance<=8.5&&distance>=.5&&rearAlignment>=NAPE_REAR_MIN&&aimAlignment>=.75&&reachable,dashing:!!dash};}
 return {anchor,update,beginSlash,step,shot,reset,status};
}
