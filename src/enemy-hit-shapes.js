import * as T from 'three';

const raycaster=new T.Raycaster(),rayDirection=new T.Vector3(),rayOrigin=new T.Vector3();
const right=new T.Vector3(),up=new T.Vector3(),center=new T.Vector3(),corePoint=new T.Vector3();
const geometryBounds=new T.Box3(),partBounds=new T.Box3();
const visible=object=>{for(let node=object;node;node=node.parent)if(!node.visible)return false;return true;};
const finite=v=>v&&Number.isFinite(v.x)&&Number.isFinite(v.y)&&Number.isFinite(v.z);

// A boss can supply its real imported body meshes. Ordinary enemies retain
// their established sphere behavior, including the old center-based falloff.
export function enemyHitTargets(enemy){return enemy.hitTargets||enemy.bossVisual?.hitTargets||null;}
export function enemyAimPoint(enemy,out=new T.Vector3()){
 const visual=enemy.bossVisual;
 if(visual?.aimPoint?.getWorldPosition)return visual.aimPoint.getWorldPosition(out);
 if(visual?.bodyCenter&&visual.root){visual.root.updateWorldMatrix(true,false);return out.copy(visual.bodyCenter).applyMatrix4(visual.root.matrixWorld);}
 if(enemyHitTargets(enemy)&&enemy.core?.getWorldPosition)return enemy.core.getWorldPosition(out);
 return out.copy(enemy.mesh.position);
}
function coreHit(enemy,point,targets){
 if(enemy.core?.getWorldPosition){enemy.core.getWorldPosition(corePoint);return point.distanceToSquared(corePoint)<=.55*.55;}
 geometryBounds.makeEmpty();
 for(const mesh of targets){if(!mesh.isMesh||!visible(mesh))continue;if(!mesh.geometry.boundingBox)mesh.geometry.computeBoundingBox();partBounds.copy(mesh.geometry.boundingBox).applyMatrix4(mesh.matrixWorld);geometryBounds.union(partBounds);}
 return !geometryBounds.isEmpty()&&point.y>geometryBounds.min.y+(geometryBounds.max.y-geometryBounds.min.y)*.76;
}
export function traceEnemyRay(enemy,origin,direction,range,{padding=0,sphereScale=1.15,surface=false}={}){
 if(!finite(origin)||!finite(direction)||direction.lengthSq()<1e-12||!Number.isFinite(range)||range<0)return null;
 rayDirection.copy(direction).normalize();
 const targets=enemyHitTargets(enemy);
 if(!targets){
  if(!finite(enemy.mesh?.position)||!(enemy.r>0))return null;
  center.copy(enemy.mesh.position).sub(origin);const along=center.dot(rayDirection),radius=enemy.r*sphereScale+padding;
  if(surface){const disc=along*along-center.lengthSq()+radius*radius;if(disc<0)return null;const distance=center.lengthSq()<=radius*radius?0:along-Math.sqrt(disc);if(distance<0||distance>range)return null;const point=origin.clone().addScaledVector(rayDirection,distance);return {e:enemy,point,distance,along:distance,object:enemy.mesh,head:point.y>enemy.mesh.position.y+enemy.r*.25};}
  if(along<=0||along>range)return null;const point=origin.clone().addScaledVector(rayDirection,along);if(point.distanceToSquared(enemy.mesh.position)>=radius*radius)return null;
  return {e:enemy,point,distance:along,along,object:enemy.mesh,head:point.y>enemy.mesh.position.y+enemy.r*.25};
 }
 enemy.mesh.updateWorldMatrix(true,true);
 const active=targets.filter(mesh=>mesh.isMesh&&visible(mesh));if(!active.length)return null;
 raycaster.near=0;raycaster.far=range;
 let best=null;
 function probe(offsetX=0,offsetY=0){
  rayOrigin.copy(origin).addScaledVector(right,offsetX).addScaledVector(up,offsetY);raycaster.set(rayOrigin,rayDirection);
  const hit=raycaster.intersectObjects(active,false)[0];if(hit&&(!best||hit.distance<best.distance))best=hit;
 }
 // Small projectiles may sweep a radius around the visible surface. Parallel
 // rays preserve the true triangles and the empty space between limbs/wings.
 right.crossVectors(rayDirection,T.Object3D.DEFAULT_UP);if(right.lengthSq()<1e-8)right.set(1,0,0);else right.normalize();up.crossVectors(right,rayDirection).normalize();
 probe();if(padding>0){probe(padding,0);probe(-padding,0);probe(0,padding);probe(0,-padding);}
 if(!best)return null;
 return {...best,e:enemy,along:best.distance,head:coreHit(enemy,best.point,active)};
}
