import * as T from 'three';

export const OMEGA_COVER_HP=72;
const SHARD_LIMIT=48,SEAM_LIMIT=48,RIM_LIMIT=4;
const finitePoint=p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&Number.isFinite(p.z);

// Cover keeps stable instance IDs. Geometry, materials and transient particles
// are shared and bounded independently of the number of hits in a run.
export function createWorldFracture({scene,arena,walls,caps,wallColliders,getLayout,isRebuilding}){
 const root=new T.Group();root.name='Ω / fractured cover';root.visible=false;scene.add(root);
 const cube=new T.BoxGeometry(1,1,1),ring=new T.TorusGeometry(1,.027,4,40);
 const chunkMaterial=new T.MeshStandardMaterial({color:0xb0c5c9,metalness:.55,roughness:.57});
 const seamMaterial=new T.MeshBasicMaterial({color:0xa4ffe5});
 const rimMaterial=new T.MeshBasicMaterial({color:0xa4ffe5,transparent:true,opacity:.48,depthWrite:false});
 const chunks=new T.InstancedMesh(cube,chunkMaterial,SHARD_LIMIT),seams=new T.InstancedMesh(cube,seamMaterial,SEAM_LIMIT);
 chunks.frustumCulled=seams.frustumCulled=false;root.add(chunks,seams);
 const matrix=new T.Matrix4(),position=new T.Vector3(),size=new T.Vector3(),rotation=new T.Quaternion(),axis=new T.Vector3(0,0,1),white=new T.Color(0xffffff),color=new T.Color();
 const hidden=new T.Matrix4().makeScale(0,0,0),raycaster=new T.Raycaster(),direction=new T.Vector3();
 const shards=Array.from({length:SHARD_LIMIT},()=>({position:new T.Vector3(),velocity:new T.Vector3(),rotation:new T.Euler(),spin:new T.Vector3(),size:new T.Vector3(),life:0,max:1,ground:0}));
 const rims=Array.from({length:RIM_LIMIT},()=>{const mesh=new T.Mesh(ring,rimMaterial);mesh.visible=false;root.add(mesh);return{mesh,life:0,max:.38};});
 const flash=new Float32Array(16);let shardCursor=0,rimCursor=0,effectTime=0,hits=0,broken=0;
 function enabled(){return getLayout()?.fracture===true&&!isRebuilding();}
 function hideParticles(){for(let i=0;i<SHARD_LIMIT;i++){shards[i].life=0;chunks.setMatrixAt(i,hidden);}for(let i=0;i<SEAM_LIMIT;i++)seams.setMatrixAt(i,hidden);for(const r of rims){r.life=0;r.mesh.visible=false;}chunks.instanceMatrix.needsUpdate=seams.instanceMatrix.needsUpdate=true;}
 function reset(){const layout=getLayout();hits=broken=effectTime=0;shardCursor=rimCursor=0;flash.fill(0);hideParticles();root.visible=false;
  for(let i=0;i<16;i++){walls.setColorAt(i,white);caps.setColorAt(i,white);}if(walls.instanceColor)walls.instanceColor.needsUpdate=true;if(caps.instanceColor)caps.instanceColor.needsUpdate=true;
  if(layout?.fracture===true){for(const w of layout.walls){w.hp=OMEGA_COVER_HP;w.maxHP=OMEGA_COVER_HP;w.destroyed=false;}layout.refreshNavigation?.();paintCover();}
 }
 function paintCover(){const layout=getLayout();let seamIndex=0;
  for(let i=0;i<layout.walls.length;i++){const w=layout.walls[i],damage=1-(w.hp??OMEGA_COVER_HP)/OMEGA_COVER_HP,hit=flash[i]>0;
   color.setHex(hit?0xffd59a:damage>0?0x88d8ce:0xffffff);walls.setColorAt(i,color);color.setHex(hit?0xffffff:0xffce95);caps.setColorAt(i,color);
   if(!w.destroyed&&damage===0)for(const side of [-1,1])for(const edge of [-1,1]){if(seamIndex>=SEAM_LIMIT)break;position.set(w.x+edge*w.w*.38,w.base+w.h*.57,w.z+side*(w.d*.5+.018));rotation.identity();size.set(.025,w.h*.5,.025);matrix.compose(position,rotation,size);seams.setMatrixAt(seamIndex++,matrix);}
   if(!w.destroyed&&damage>0)for(const side of [-1,1])for(let part=0;part<3&&seamIndex<SEAM_LIMIT;part++){
    const y=(part-1)*w.h*.19,x=part===1?-w.w*.1:w.w*.12;position.set(w.x+x,w.base+w.h*.52+y,w.z+side*(w.d*.5+.018));rotation.setFromAxisAngle(axis,(part%2?-.6:.55)*side);
    size.set(w.w*(.36+damage*.32),.018+(hit?.024:0),.025);matrix.compose(position,rotation,size);seams.setMatrixAt(seamIndex++,matrix);
   }
  }
  while(seamIndex<SEAM_LIMIT)seams.setMatrixAt(seamIndex++,hidden);
  walls.instanceColor.needsUpdate=caps.instanceColor.needsUpdate=seams.instanceMatrix.needsUpdate=true;
 }
 function burst(w,index,point,normal){
  const seed=(index+1)*17+hits*11;
  for(let n=0;n<10;n++){const i=shardCursor++%SHARD_LIMIT,s=shards[i],a=n*2.399963+seed,up=.5+(n%4)*.24;
   s.position.set(w.x+Math.sin(a)*w.w*.35,w.base+w.h*(.25+(n%5)*.12),w.z+Math.cos(a)*w.d*.35);s.velocity.set(Math.sin(a)*(3+n%3),up*5,Math.cos(a)*(3+n%3));if(normal)s.velocity.addScaledVector(normal,2);
   s.rotation.set(a,a*.7,a*.2);s.spin.set(2+n*.7,3+n*.3,-2-n*.4);s.size.set(Math.min(w.w*.3,.38+(n%3)*.1),.19+(n%4)*.11,Math.min(w.d*.4,.26+(n%2)*.18));s.life=s.max=.72+(n%4)*.12;s.ground=w.base;
   color.setHex(n%3===0?0xc3ffe9:n%3===1?0x4d6979:0xc9d7da);chunks.setColorAt(i,color);
  }
  const r=rims[rimCursor++%RIM_LIMIT];r.life=r.max;r.mesh.visible=true;r.mesh.position.copy(point);r.mesh.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),normal||new T.Vector3(0,1,0));r.mesh.scale.setScalar(.3);
  chunks.instanceColor.needsUpdate=true;root.visible=true;
 }
 function safeWall(w){return{x:w.x,z:w.z,base:w.base,w:w.w,d:w.d,h:w.h,destroyed:!!w.destroyed};}
 function applyDamage(index,damage,point,normal){const layout=getLayout(),w=layout.walls[index];if(!w||w.destroyed)return null;
  w.hp=Math.max(0,(w.hp??OMEGA_COVER_HP)-damage);flash[index]=.15;hits++;const destroyed=w.hp===0;
  if(destroyed){w.destroyed=true;broken++;wallColliders[index].enabled=false;walls.setMatrixAt(index,hidden);caps.setMatrixAt(index,hidden);walls.instanceMatrix.needsUpdate=caps.instanceMatrix.needsUpdate=true;walls.boundingSphere=null;caps.boundingSphere=null;layout.refreshNavigation?.();burst(w,index,point,normal);}
  paintCover();root.visible=true;return{point:point.clone(),normal:normal?.clone()||null,destroyed,wall:safeWall(w),index,hp:w.hp,max:OMEGA_COVER_HP};
 }
 function damageCover(origin,aim,damage,range=80){
  if(!enabled()||!finitePoint(origin)||!finitePoint(aim)||!Number.isFinite(damage)||damage<=0||!Number.isFinite(range)||range<=0)return null;
  direction.copy(aim);if(direction.lengthSq()<1e-12)return null;direction.normalize();arena.updateWorldMatrix(true,true);raycaster.set(origin,direction);raycaster.near=0;raycaster.far=range;
  const meshes=[];function collect(o){if(!o.visible)return;if(o.isMesh)meshes.push(o);for(const c of o.children)collect(c);}collect(arena);
  const hit=raycaster.intersectObjects(meshes,false)[0];if(!hit||hit.object!==walls||!Number.isInteger(hit.instanceId))return null;
  const normal=hit.face?.normal.clone().transformDirection(walls.matrixWorld)||direction.clone().negate(),event=applyDamage(hit.instanceId,damage,hit.point,normal);if(event)event.distance=hit.distance;return event;
 }
 function breakCoverNear(point,radius,damage){
  if(!enabled()||!finitePoint(point)||!Number.isFinite(radius)||radius<=0||!Number.isFinite(damage)||damage<=0)return[];
  const events=[],layout=getLayout();for(let i=0;i<Math.min(8,layout.walls.length);i++){const w=layout.walls[i];if(w.destroyed)continue;
   const closest=new T.Vector3(Math.max(w.x-w.w/2,Math.min(w.x+w.w/2,point.x)),Math.max(w.base,Math.min(w.base+w.h,point.y)),Math.max(w.z-w.d/2,Math.min(w.z+w.d/2,point.z)));if(closest.distanceToSquared(point)>radius*radius)continue;
   const normal=closest.clone().sub(point);if(normal.lengthSq()<1e-8)normal.set(0,1,0);else normal.normalize();const event=applyDamage(i,damage,closest,normal);if(event)events.push(event);
  }return events;
 }
 function update(dt,playing){root.visible=enabled();if(!root.visible||!playing||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(dt,.1);effectTime+=dt;
  let recolor=false;for(let i=0;i<flash.length;i++)if(flash[i]>0){flash[i]=Math.max(0,flash[i]-dt);recolor=true;}if(recolor)paintCover();
  for(let i=0;i<SHARD_LIMIT;i++){const s=shards[i];if(s.life<=0)continue;s.life=Math.max(0,s.life-dt);if(!s.life){chunks.setMatrixAt(i,hidden);continue;}s.velocity.y-=14*dt;s.position.addScaledVector(s.velocity,dt);if(s.position.y<s.ground+.08){s.position.y=s.ground+.08;s.velocity.y=Math.abs(s.velocity.y)*.22;s.velocity.x*=.82;s.velocity.z*=.82;}s.rotation.x+=s.spin.x*dt;s.rotation.y+=s.spin.y*dt;s.rotation.z+=s.spin.z*dt;rotation.setFromEuler(s.rotation);size.copy(s.size).multiplyScalar(Math.min(1,s.life/.25));matrix.compose(s.position,rotation,size);chunks.setMatrixAt(i,matrix);}
  chunks.instanceMatrix.needsUpdate=true;for(const r of rims){if(r.life<=0)continue;r.life=Math.max(0,r.life-dt);r.mesh.visible=r.life>0;const t=1-r.life/r.max;r.mesh.scale.setScalar(.3+t*3.1);}
 }
 function snapshot(){const layout=getLayout(),omega=layout?.fracture===true;return{enabled:enabled(),total:omega?layout.walls.length:0,intact:omega?layout.walls.filter(w=>!w.destroyed).length:0,broken:omega?broken:0,hits:omega?hits:0,shards:shards.filter(s=>s.life>0).length,shardLimit:SHARD_LIMIT,rims:rims.filter(r=>r.life>0).length,effectTime,walls:omega?layout.walls.map((w,index)=>({index,...safeWall(w),hp:w.hp??OMEGA_COVER_HP,max:OMEGA_COVER_HP,colliderEnabled:!!wallColliders[index]?.enabled})):[]};}
 reset();return{reset,damageCover,breakCoverNear,update,snapshot};
}
