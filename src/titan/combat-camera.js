import {MathUtils,Vector3} from 'three';

// Player yaw remains authoritative. A nearby opponent only shifts the framing;
// this does not turn the player, steer a punch or lock the mouse to an enemy.
export function chooseTitanOpponent({position,yaw,enemies,maxDistance=40,canReach}){
 const forward=new Vector3(-Math.sin(yaw),0,-Math.cos(yaw)),delta=new Vector3(),point=new Vector3();
 let best=null,bestScore=Infinity;
 for(const enemy of enemies||[]){
  if(enemy.alive===false||enemy.enabled===false)continue;
  const origin=enemy.position;
  if(!origin)continue;
  if(Array.isArray(origin))point.fromArray(origin);else point.copy(origin);
  delta.copy(point).sub(position);delta.y=0;
  const distance=delta.length();if(distance<.01||distance>maxDistance)continue;
  const facing=delta.dot(forward)/distance;if(facing<.35)continue;
  point.y+=Math.min(enemy.height||15,18)*.62;
  if(canReach&&!canReach(position,point))continue;
  const score=distance*(1+(1-facing)*1.25);
  if(score<bestScore){bestScore=score;best=enemy;}
 }
 return best;
}

export function createTitanCamera(){
 const eye=new Vector3(),lookAt=new Vector3(),desired=new Vector3(),aim=new Vector3(),forward=new Vector3(),right=new Vector3(),pivot=new Vector3(),enemyAim=new Vector3(),delta=new Vector3(),lastPlayer=new Vector3();
 let initialized=false,fov=64;
 function reset(){initialized=false;fov=64;}
 function clip(point,occlude){
  if(!occlude)return false;
  const safe=occlude(pivot,point.clone());
  if(!safe||!Number.isFinite(safe.x+safe.y+safe.z))return false;
  const blocked=safe.distanceToSquared(point)>.0001;point.copy(safe);return blocked;
 }
 function update({position,yaw,pitch=0,target=null,dt=1/60,occlude}){
  forward.set(-Math.sin(yaw),0,-Math.cos(yaw));right.set(Math.cos(yaw),0,-Math.sin(yaw));
  pivot.copy(position).add(new Vector3(0,-2,0));
  const distance=target?Math.hypot(target.position.x-position.x,target.position.z-position.z):40;
  const close=target?1-MathUtils.smoothstep(distance,6,24):0;
  const back=17+close*3.2,side=4.5+close*.8;
  desired.copy(position).addScaledVector(forward,-back).addScaledVector(right,side);desired.y+=1+close*.6;
  aim.copy(position).add(new Vector3(0,-3,0)).addScaledVector(forward,4+close*1.5);
  aim.y+=MathUtils.clamp(pitch,-.75,.75)*4;
  if(target){
   enemyAim.copy(target.position);enemyAim.y+=Math.min(target.height||15,22)*.62;
   delta.copy(enemyAim).sub(aim);
   // Framing stays close to manual aim even for a 60m colossal titan.
   delta.y=MathUtils.clamp(delta.y,-4,4);
   const horizontal=Math.hypot(delta.x,delta.z);if(horizontal>8){delta.x*=8/horizontal;delta.z*=8/horizontal;}
   aim.addScaledVector(delta,.24*close);
  }
  const blocked=clip(desired,occlude),teleported=!initialized||lastPlayer.distanceToSquared(position)>35*35;
  const blend=1-Math.exp(-Math.max(0,dt)*8);
  if(teleported||blocked)eye.copy(desired);else eye.lerp(desired,blend);
  clip(eye,occlude);eye.y=Math.max(.4,eye.y);
  if(teleported)lookAt.copy(aim);else lookAt.lerp(aim,1-Math.exp(-Math.max(0,dt)*12));
  const desiredFov=64+close*7;
  fov=teleported?desiredFov:MathUtils.lerp(fov,desiredFov,blend);
  lastPlayer.copy(position);initialized=true;
  return {position:eye,lookAt,fov};
 }
 return {update,reset};
}
