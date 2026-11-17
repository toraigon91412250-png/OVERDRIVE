import * as THREE from 'three';
import {create,types} from './models.js';
import {createTransformation} from './transformation.js';
import {createRunStats} from './stats.js';
import {createCombatAssist} from './combat-assist.js';
import {resolveTitanPunch} from './combat-rules.js';
import {chooseTitanOpponent} from './combat-camera.js';
import {createHardenedImpact} from './hardened-impact.js';
const deployment=[
 ['attack',0,18],['attack',-28,62],['jaw',29,39],
 ['attack',-120,24],['armored',90,-80],['jaw',-280,-120],
 ['attack',275,150],['attack',-340,180],['jaw',290,-260],
 ['armored',-140,-300],['attack',0,280],['colossal',0,-360],
 ['warhammer',0,-117]
];
export function createRoster(ctx){
 const {scene,P,targets,anchors,hooks,missiles}=ctx,entries=[];let selected=0,mode='raid',loaded=false,serial=0,armed=false;
 let storage;try{storage=globalThis.localStorage}catch{}const stats=createRunStats(storage);
 const point=new THREE.Vector3(),delta=new THREE.Vector3(),forward=new THREE.Vector3();
 const originalV=ctx.V;
 for(let index=0;index<deployment.length;index++){
  const V=index===0?originalV:{root:new THREE.Group(),hp:100,maxHp:100,alive:true,armL:new THREE.Group(),armR:new THREE.Group(),armorL:false,armorR:false,weak:null,armorPlateL:null,armorPlateR:null,slamRing:new THREE.Mesh(new THREE.TorusGeometry(1,.08,5,48),new THREE.MeshBasicMaterial({color:0xff9e60,transparent:true,opacity:.65,depthWrite:false}))};
  if(index){scene.add(V.root,V.slamRing);V.slamRing.rotation.x=-Math.PI/2;V.slamRing.visible=false;}
  V.id='titan-'+index;V.root.name=V.id;
  const local={...ctx,V,spawn:[deployment[index][1],0,deployment[index][2]],skipEquipment:index>0,hooks:index?[]:hooks,missiles:index?[]:missiles,
   loading(){},targetChanged(){},hud(){},notice:message=>{if(V.alive&&Math.hypot(V.root.position.x-P.pos.x,V.root.position.z-P.pos.z)<45)ctx.notice(message);},
   moveEnemy:(position,proposal,radius,height,yaw)=>{const before=position.clone();const result=ctx.moveEnemy?ctx.moveEnemy(position,proposal,radius,height,yaw):(position.copy(proposal),true);for(const other of entries){if(other.V===V||!other.V.alive||!other.enabled)continue;const min=radius+(other.kind==='jaw'?1.2:2);if(Math.hypot(position.x-other.V.root.position.x,position.z-other.V.root.position.z)<min){position.copy(before);return typeof result==='object'?{...result,moved:false}:false;}}return result;}

  };
  const system=create(local);entries.push({V,system,kind:deployment[index][0],spawn:[deployment[index][1],0,deployment[index][2]],enabled:false});
 }
 const primary=entries[0].system,hardenedImpact=createHardenedImpact(scene);
 const assist=createCombatAssist({...ctx,entries,height:entry=>types[entry.kind].height,setTarget:enemy=>setTarget(enemy),resolveWorld:ctx.resolveAvatar,slash:ctx.assistedSlash});
 const hero=createTransformation({...ctx,resolveWorld:ctx.resolveAvatar,punchTarget:()=>{
  const enemy=chooseTitanOpponent({position:P.pos,yaw:P.yaw,maxDistance:10,canReach:ctx.canReach,enemies:entries.filter(e=>e.enabled&&e.V.alive).map(entry=>({entry,position:entry.V.root.position,height:types[entry.kind].height,alive:true}))});
  return {low:enemy?.entry.kind==='jaw'};
 },burst:position=>{for(const entry of entries)if(entry.enabled&&entry.V.alive&&entry.V.root.position.distanceTo(position)<13){ctx.damage(entry.V,30,'burst');entry.system.stagger?.(2);}ctx.sound?.(65,.4);},punch:({origin,from,to,radius,side,direction,hitEnemies,counter=false,hardened=false})=>{
  for(const entry of entries){if(!entry.enabled||!entry.V.alive||hitEnemies.has(entry.V.id))continue;
   const hit=entry.system.punchContact(from,to,radius);if(!hit||ctx.canReach&&(!ctx.canReach(origin,hit)||!ctx.canReach(from,hit)))continue;
   const offset=P.pos.clone().sub(entry.V.root.position);offset.y=0;offset.normalize();
   const facing=offset.dot(new THREE.Vector3(0,0,1).applyQuaternion(entry.V.root.quaternion));
   const result=resolveTitanPunch({kind:entry.kind,armor:entry.V.armorL||entry.V.armorR,facing,phase:entry.system.inspect().encounter?.phase,counter,hardened,hp:entry.V.hp});
   hitEnemies.add(entry.V.id);ctx.punchImpact?.(entry.V,hit,side,{counter,hardened,guarded:result.armorHit&&!result.stagger,label:result.label});
   hero.confirmPunchContact?.({side,guarded:result.armorHit&&!result.stagger,hardened});
   if(result.damage>0)hardenedImpact.trigger(hit,direction,counter?1.25:1,{hardened,guarded:result.armorHit&&!result.stagger});
   entry.system.punchReact(direction,{counter,hardened,side,point:hit,guarded:!result.stagger});
   if(result.breakArmor)ctx.breakArmor?.(entry.V,entry.V.armorL?'armorL':'armorR');
   ctx.damage(entry.V,result.damage,result.source);
   if(result.armorHit&&!result.stagger)ctx.notice(result.label);
  }
 }});
 const equipmentReady=Promise.all([primary.equipmentReady,hero.ready]);
 function choose(entry){if(!entry||!entry.enabled||!entry.V.alive)return;const i=entries.indexOf(entry);if(i!==selected){selected=i;ctx.targetChanged(entry.kind,mode==='raid'&&entry.kind==='attack'?{...types.attack,name:'通常巨人'}:types[entry.kind]);}ctx.setTarget(entry.V);}
 async function select(choice){const ticket=++serial;loaded=false;hardenedImpact.reset();ctx.loading(true);mode=choice==='raid'?'raid':'single';disarm();hero.reset();
  try{
   const active=mode==='raid'?entries:[entries[0]];
   for(const entry of entries){entry.enabled=active.includes(entry);entry.V.root.visible=entry.enabled;entry.V.slamRing.visible=false;if(!entry.enabled)entry.system.deactivate();}
   for(const [index,entry] of active.entries()){
    if(ticket!==serial)return;
    entry.kind=mode==='raid'?deployment[index][0]:choice;
    if(!types[entry.kind])throw Error('Unknown titan '+entry.kind);
    entry.V.kind=entry.kind;entry.V.maxHp=mode==='raid'?({attack:68,jaw:68,armored:134,colossal:204,warhammer:168}[entry.kind]):100;entry.spawn=mode==='raid'?[deployment[index][1],0,deployment[index][2]]:[0,0,18];
    if(ctx.findSpawn)entry.spawn=ctx.findSpawn(entry.spawn,entry.kind);
    entry.system.setVariant(mode==='raid'&&entry.kind==='attack');entry.system.setSpawn(entry.spawn);await entry.system.select(entry.kind);
   }
   if(ticket!==serial)return;
   for(const entry of entries)if(!entry.enabled){entry.V.root.visible=false;entry.V.alive=false;}
   selected=0;loaded=true;reset();ctx.targetChanged(active[0].kind,mode==='raid'&&active[0].kind==='attack'?{...types.attack,name:'通常巨人'}:types[active[0].kind]);ctx.loading(false);
  }catch(error){if(ticket===serial)ctx.loading(false,error);throw error;}
 }
 function reset(){assist.reset();disarm();hero.reset();hardenedImpact.reset();stats.reset(mode,P.thunderAmmo);for(const entry of entries){if(entry.enabled)entry.system.reset();else {entry.V.root.visible=false;entry.V.alive=false;}}selected=0;ctx.setTarget(entries[0].V);renderHud();}
 function disarm(){armed=false;P.spearArmed=false;primary.setSpearArmed(false);}
 function equipSpear(){if(hero.active())return false;armed=true;P.spearArmed=true;primary.setSpearArmed(true);return true;}
 function update(dt){if(!loaded)return;hero.update(dt);hardenedImpact.update(dt);stats.step(dt,P.vel.length(),!P.grounded,P.health,P.thunderAmmo);
  let nearest=null,distance=Infinity;
  for(const entry of entries){if(!entry.enabled)continue;const d=Math.hypot(P.pos.x-entry.V.root.position.x,P.pos.z-entry.V.root.position.z);if(entry.V.alive&&d<distance){distance=d;nearest=entry;}if(d<230||!entry.V.alive)entry.system.update(dt);}
  if(!entries[selected]?.V.alive||distance<50&&Math.hypot(P.pos.x-entries[selected].V.root.position.x,P.pos.z-entries[selected].V.root.position.z)>120)choose(nearest);
  assist.update(dt);
  for(const hook of hooks){if(hook.state!=='idle'&&hook.followObject){const owner=hook.followObject.userData.enemy;if(owner&&!owner.alive){ctx.releaseWires();break;}hook.followObject.updateWorldMatrix(true,false);hook.anchor.copy(hook.followPoint).applyMatrix4(hook.followObject.matrixWorld);}}
  for(const missile of missiles)if(missile.followObject){missile.followObject.updateWorldMatrix(true,false);missile.target.copy(missile.followPoint).applyMatrix4(missile.followObject.matrixWorld);}
  renderHud();
 }
 function renderHud(){const state=hero.inspect();ctx.renderHud?.({combat:getCombatStatus(false),remaining:entries.filter(e=>e.enabled&&e.V.alive).length,total:entries.filter(e=>e.enabled).length,hero:state,entries:entries.filter(e=>e.enabled),target:entries[selected],armed});
 }
 function getCombatStatus(checkReach=true){
  if(!hero.active())return null;
  const candidates=entries.filter(e=>e.enabled&&e.V.alive).map(entry=>({entry,position:entry.V.root.position,height:types[entry.kind].height,alive:true}));
  const selected=chooseTitanOpponent({position:P.pos,yaw:P.yaw,enemies:candidates,maxDistance:45,canReach:ctx.canReach});
  if(!selected)return {opponent:null,canPunch:false,phase:'idle',attack:null};
  const entry=selected.entry,status=entry.system.inspect().encounter;
  let canPunch=false;
  for(const probe of checkReach?(hero.punchPreview?.()||[]):[]){const hit=entry.system.punchContact(probe.from,probe.to,probe.radius);if(hit&&(!ctx.canReach||ctx.canReach(probe.from,hit)&&ctx.canReach(P.pos.clone().add(new THREE.Vector3(0,-3,0)),hit))){canPunch=true;break;}}
  return {opponent:{position:selected.position.clone(),height:selected.height,distance:Math.hypot(P.pos.x-selected.position.x,P.pos.z-selected.position.z),kind:entry.kind},canPunch,phase:status?.phase||'idle',attack:status?.attack||null};
 }
 function rayCandidates(origin,direction,range){const result=new Set();for(const entry of entries){if(!entry.enabled||!entry.V.alive)continue;const height=types[entry.kind].height;delta.copy(entry.V.root.position).add(new THREE.Vector3(0,height*.5,0)).sub(origin);const along=delta.dot(direction),radius=height*.65+3;if(along>=-radius&&along<=range+radius&&delta.lengthSq()-along*along<=radius*radius)result.add(entry.V);}return result;}
 function setTarget(enemy){choose(entries.find(e=>e.V===enemy));}
 function hitReact(enemy,part){entries.find(e=>e.V===enemy)?.system.hitReact?.(part);}
 function supportEnemy(id,duration=1.2){const entry=entries.find(e=>e.enabled&&e.V.alive&&e.V.id===id);if(!entry)return false;entry.system.stagger?.(duration);entry.system.hitReact?.('glance');return true;}
 function supportTargets(){return entries.filter(e=>e.enabled&&e.V.alive);}
 function findBladeTarget(position,direction,armorOnly=false){let best=null,bestScore=Infinity;for(const entry of entries){if(!entry.enabled||!entry.V.alive)continue;const V=entry.V,candidates=[];if(V.armorL)candidates.push(['armorL',V.armorPlateL,6.8]);if(V.armorR)candidates.push(['armorR',V.armorPlateR,6.8]);if(!candidates.length&&!armorOnly&&V.napeOpen)candidates.push(['nape',V.weak,5.5]);for(const [part,mesh,range] of candidates){mesh.getWorldPosition(point);delta.copy(point).sub(position);const distance=delta.length();if(distance>range||distance<.1)continue;const alignment=delta.clone().normalize().dot(direction);if(alignment<(part==='nape' ? .45 : -.08))continue;if(part==='nape'){forward.set(0,0,1).applyQuaternion(V.root.quaternion);const toPlayer=position.clone().sub(point);if(toPlayer.dot(forward)>.4||-toPlayer.dot(forward)/distance<.78)continue;}if(ctx.canReach&&!ctx.canReach(position,point))continue;const score=distance+(1-alignment)*1.25;if(score<bestScore){bestScore=score;best={entry,enemy:V,part,object:mesh,point:point.clone(),distance};}}}if(best)choose(best.entry);return best;}
 function findSlashTarget(position,direction){const best=findBladeTarget(position,direction);return best?.part==='nape'?best.enemy:null;}
 function enemyDown(enemy){const entry=entries.find(e=>e.V===enemy);if(!entry||!entry.enabled||entry.V.hp>0)return false;entry.system.kill();ctx.sound?.(260,.13);hero.addEnergy(18);P.gas=100;P.health=Math.min(3,P.health+1);P.thunderAmmo=Math.min(ctx.maxAmmo(),P.thunderAmmo+2);P.thunderMag=Math.min(2,P.thunderAmmo);P.thunderReload=0;const left=entries.filter(e=>e.enabled&&e.V.alive).length;ctx.notice('巨人を討伐 / 残り '+left+'体');if(left){const next=entries.filter(e=>e.enabled&&e.V.alive).sort((a,b)=>a.V.root.position.distanceToSquared(P.pos)-b.V.root.position.distanceToSquared(P.pos))[0];choose(next);}renderHud();return left===0;}
 function resolvePlayer(previous){if(hero.active())return false;let hit=false;for(const entry of entries)if(entry.enabled&&entry.V.alive)hit=entry.system.resolvePlayer(previous)||hit;return hit;}
 function finish(won){disarm();hero.exit();hardenedImpact.reset();for(const e of entries)e.V.slamRing.visible=false;stats.step(0,P.vel.length(),!P.grounded,P.health,P.thunderAmmo);primary.finish(won);const result=stats.finish(won);renderHud();return result;}
 function inspect(){const focused=entries[selected];return {...focused.system.inspect(),operation:mode,ready:loaded,enemies:entries.filter(e=>e.enabled).map(e=>({id:e.V.id,type:e.kind,hp:e.V.hp,maxHp:e.V.maxHp,alive:e.V.alive,armor:[e.V.armorL,e.V.armorR],position:e.V.root.position.toArray(),forward:new THREE.Vector3(0,0,1).applyQuaternion(e.V.root.quaternion).toArray(),nape:e.V.weak?.getWorldPosition(new THREE.Vector3()).toArray(),shoulders:[e.V.armorPlateL,e.V.armorPlateR].map(m=>m?.getWorldPosition(new THREE.Vector3()).toArray())})),hero:hero.inspect(),assist:assist.status(),spears:primary.inspect().spears,spearArmed:armed,stats:stats.get()};}
 return {select,reset,update,finish,getCombatStatus,setGuardHeld:hero.setGuardHeld,getAssistedAnchor:assist.anchor,getAssistedShot:assist.shot,beginAssistedSlash:assist.beginSlash,getAssistStatus:assist.status,rayCandidates,resolvePlayer,equipmentReady,ready:()=>loaded&&entries.filter(e=>e.enabled).every(e=>e.system.ready()),retry:select,type:()=>entries[selected].kind,inspect,supportTargets,attachProjectile:primary.attachProjectile,showSpear:primary.showSpear,setTarget,findSlashTarget,findBladeTarget,hitReact,supportEnemy,enemyDown,equipSpear,disarm,isSpearArmed:()=>armed,isTitan:hero.active,toggleTransformation:()=>{if(!loaded)return false;assist.reset();return hero.toggle();},stepPlayer:(dt,control,boost)=>{if(!hero.active()&&assist.step(dt))return true;if(!hero.step(dt,control,boost))return false;if(P.titanEntering)return true;for(const entry of entries){if(!entry.enabled||!entry.V.alive||P.pos.y-12.8>types[entry.kind].height)continue;const dx=P.pos.x-entry.V.root.position.x,dz=P.pos.z-entry.V.root.position.z,d=Math.hypot(dx,dz),radius=2.2+(entry.kind==='colossal'?5.8:entry.kind==='jaw'?1.1:1.8);if(d<radius&&d>.001){P.pos.x=entry.V.root.position.x+dx/d*radius;P.pos.z=entry.V.root.position.z+dz/d*radius;}}return true;},jump:hero.jump,punch:hero.punch,activateHardening:hero.activateHardening,absorbDamage:hero.hurt};
}
