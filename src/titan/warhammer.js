import * as THREE from 'three';

// Keep the supplied articulated enemy and weapon. Crystal_Hardening was an
// asset showcase: its eighteen independent spikes have no combat collision.
export function prepareWarhammerAsset(gltf){
 const showcase=[];gltf.scene.traverse(node=>{if(/^Crystal_\d+$/.test(node.name))showcase.push(node);});
 for(const node of showcase)node.removeFromParent();
 for(const clip of gltf.animations)clip.tracks=clip.tracks.filter(track=>!/^Crystal_/.test(track.name));
 const hammer=gltf.scene.getObjectByName('WarHammer_Rig');
 if(!hammer||!hammer.children[19])throw new Error('Warhammer GLB has no articulated hammer head.');
 hammer.userData.raidWeapon=true;hammer.children[19].name='WarHammer_Head';
}

export function warhammerBodyBounds(model){
 model.updateWorldMatrix(true,true);const result=new THREE.Box3(),relative=new THREE.Matrix4(),inverse=model.matrixWorld.clone().invert();
 function visit(node){
  if(node.userData.raidWeapon)return;
  if(node.isMesh){node.geometry.computeBoundingBox();relative.multiplyMatrices(inverse,node.matrixWorld);result.union(node.geometry.boundingBox.clone().applyMatrix4(relative));}
  for(const child of node.children)visit(child);
 }
 visit(model);return result;
}

export function createWarhammerMotion(model,mixer,actions){
 const head=model.getObjectByName('WarHammer_Head'),weapon=model.getObjectByName('WarHammer_Rig');
 const idle=actions.Idle_Breathing,smash=actions.Hammer_Smash;
 const hips=['Left_Hip','Right_Hip'].map(name=>model.getObjectByName(name));
 const knees=['Left_Knee','Right_Knee'].map(name=>model.getObjectByName(name));
 const headBounds=new THREE.Box3(),inverse=head.matrixWorld.clone().invert(),relative=new THREE.Matrix4();
 head.updateWorldMatrix(true,true);inverse.copy(head.matrixWorld).invert();
 head.traverse(node=>{if(!node.isMesh)return;node.geometry.computeBoundingBox();relative.multiplyMatrices(inverse,node.matrixWorld);headBounds.union(node.geometry.boundingBox.clone().applyMatrix4(relative));});
 const previous=new THREE.Matrix4(),currentInverse=new THREE.Matrix4(),sample=new THREE.Vector3(),a=new THREE.Vector3(),b=new THREE.Vector3(),scale=new THREE.Vector3(),expanded=new THREE.Box3();
 let mode='',primed=false,gait=0,clipTime=0;
 function use(action,name){if(mode===name)return;for(const a of Object.values(actions))a.stop();action.reset().play();mode=name;}
 function reset(){mode='';primed=false;gait=0;use(idle,'idle');mixer.update(0);}
 function pose(state,dt,moved){
  if(state.attack==='hammer'&&state.phase!=='idle'){
   use(smash,'hammer');smash.paused=true;
   clipTime=state.phase==='warning'?state.progress*1.26:state.phase==='active'?1.26+state.progress*.52:1.78+state.progress*1.48;
   smash.time=Math.min(3.259,clipTime);mixer.update(0);
  }else {
   use(idle,'idle');idle.paused=false;mixer.update(dt);clipTime=idle.time;
   if(moved){gait+=dt*2.3;for(let i=0;i<2;i++){hips[i]?.rotateX(Math.sin(gait+i*Math.PI)*.19);knees[i]?.rotateX(Math.max(0,-Math.sin(gait+i*Math.PI))*.24);}}
  }
 }
 function crossesBox(from,to,box){
  let low=0,high=1;
  for(const key of ['x','y','z']){const delta=to[key]-from[key];if(Math.abs(delta)<1e-9){if(from[key]<box.min[key]||from[key]>box.max[key])return false;continue;}let enter=(box.min[key]-from[key])/delta,leave=(box.max[key]-from[key])/delta;if(enter>leave)[enter,leave]=[leave,enter];low=Math.max(low,enter);high=Math.min(high,leave);if(low>high)return false;}
  return true;
 }
 function contact(player,height,bodyRadius,enabled,canReach){
  head.updateWorldMatrix(true,true);currentInverse.copy(head.matrixWorld).invert();head.getWorldScale(scale);
  expanded.copy(headBounds);const padding=bodyRadius/Math.max(.001,Math.min(Math.abs(scale.x),Math.abs(scale.y),Math.abs(scale.z)));expanded.expandByScalar(padding);
  let hit=false;
  if(enabled&&primed)for(let offset=0;offset<=height+.001;offset+=.55){sample.copy(player);sample.y-=offset;a.copy(sample).applyMatrix4(previous);b.copy(sample).applyMatrix4(currentInverse);if(crossesBox(a,b,expanded)){
   const nearest=b.clone().clamp(headBounds.min,headBounds.max).applyMatrix4(head.matrixWorld);
   if(!canReach||canReach(nearest)){hit=true;break;}
  }}
  previous.copy(currentInverse);primed=true;return hit;
 }
 function inspect(){head.updateWorldMatrix(true,true);return {clip:mode,clipTime,head:head.getWorldPosition(new THREE.Vector3()).toArray(),headBounds:{min:headBounds.min.toArray(),max:headBounds.max.toArray()},strikeHeading:1.13};}
 return {reset,pose,contact,inspect,weapon,strikeHeading:1.13};
}
