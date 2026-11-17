import {Vector3,Matrix3} from 'three';
// Coarse, continuous ellipsoid contact. Keeps the player outside a torso/head without
// adding expensive triangle collisions to every physics step.
export function createBodyResolver(){
 const a=new Vector3(),b=new Vector3(),d=new Vector3(),hit=new Vector3(),remaining=new Vector3(),normal=new Vector3(),world=new Vector3(),scale=new Vector3(),normalMatrix=new Matrix3();
 return function resolve(node,center,radius,previous,position,velocity){
  node.updateWorldMatrix(true,false);node.getWorldScale(scale);const padding=.32/Math.max(.001,Math.min(Math.abs(scale.x),Math.abs(scale.y),Math.abs(scale.z)));
  const rx=radius.x+padding,ry=radius.y+padding,rz=radius.z+padding;
  a.copy(previous);node.worldToLocal(a).sub(center);a.set(a.x/rx,a.y/ry,a.z/rz);
  b.copy(position);node.worldToLocal(b).sub(center);b.set(b.x/rx,b.y/ry,b.z/rz);d.copy(b).sub(a);
  let touched=false;
  if(a.lengthSq()>=1&&d.lengthSq()>1e-10){
   const aa=d.lengthSq(),bb=2*a.dot(d),cc=a.lengthSq()-1,disc=bb*bb-4*aa*cc;
   if(disc>=0){const t=(-bb-Math.sqrt(disc))/(2*aa);if(t>=0&&t<=1){hit.copy(a).addScaledVector(d,t).normalize();remaining.copy(d).multiplyScalar(1-t);remaining.addScaledVector(hit,-Math.min(0,remaining.dot(hit)));b.copy(hit).multiplyScalar(1.002).add(remaining);touched=true;}}
  }
  if(b.lengthSq()<1){if(b.lengthSq()<1e-8)b.copy(a.lengthSq()>1e-8?a:new Vector3(0,0,-1));b.normalize().multiplyScalar(1.002);touched=true;}
  if(!touched)return false;
  world.set(b.x*rx,b.y*ry,b.z*rz).add(center);node.localToWorld(world);position.copy(world);
  normal.set(b.x/rx,b.y/ry,b.z/rz).applyMatrix3(normalMatrix.getNormalMatrix(node.matrixWorld)).normalize();
  const inward=velocity.dot(normal);if(inward<0)velocity.addScaledVector(normal,-inward);
  return true;
 };
}
