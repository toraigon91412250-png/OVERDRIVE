import * as T from 'three';

// This module owns only Omega's bounded shot simulation. The host supplies the
// existing enemy, cover, damage and movement callbacks, so campaign rules stay
// outside the generated weapon and all damage is credited through one path.
export function createOmegaCombat({getEnemies,wallDistance=()=>Infinity,wallHit,damage,onEffect=()=>{},knockback=()=>{},onWallHit=()=>{}}){
 const MAX_PROJECTILES=32,MAX_ECHOES=32,MAX_WELLS=8;
 const shots=[],echoes=[],wells=[],slowed=new Set(),tetherCooldown=new Map();
 let elapsed=0;
 const counters={shots:0,hits:0,kills:0,totalDamage:0,echoes:0,bounces:0,pulses:0,returns:0};
 const valid=v=>!!v&&Number.isFinite(v.x)&&Number.isFinite(v.y)&&Number.isFinite(v.z);
 const enemyValid=e=>e&&e.hp>0&&valid(e.mesh?.position)&&e.r>0;
 const cap=(v,a,b)=>Math.max(a,Math.min(b,v));
 function cover(origin,dir,range){const d=wallDistance(origin,dir,range);return Number.isFinite(d)?cap(d,0,range):range;}
 function visible(from,to){const dir=to.clone().sub(from),length=dir.length();return length<.001||cover(from,dir.divideScalar(length),length)>=length-.09;}
 function effect(kind,from,to,color,extra={}){if(valid(from)&&valid(to))onEffect({kind,from:from.clone(),to:to.clone(),color,...extra});}
 function wallImpact(origin,direction,point,context,range){onWallHit({origin:origin.clone(),direction:direction.clone(),point:point.clone(),damage:context.damage*context.power,range});}
 function physicalWallReached(origin,direction,travel,rawWall){if(Number.isFinite(rawWall)&&rawWall<travel-.001)return true;if(typeof wallHit!=='function')return false;const surface=wallHit(origin,direction,travel+.01);return !!surface&&Number.isFinite(surface.distance)&&surface.distance<=travel+.001;}
 function candidates(origin,dir,range,excluded=null){
  const list=[];
  for(const e of getEnemies()){
   if(!enemyValid(e)||excluded?.has(e))continue;
   const offset=e.mesh.position.clone().sub(origin),along=offset.dot(dir);
   if(along<-.02||along>range)continue;
   const point=origin.clone().addScaledVector(dir,cap(along,0,range));
   if(point.distanceToSquared(e.mesh.position)<=Math.pow(e.r*1.15,2))list.push({e,point,along:Math.max(0,along)});
  }
  return list.sort((a,b)=>a.along-b.along);
 }
 function apply(e,amount,context,secondary=false){
  if(!enemyValid(e)||!(amount>0))return false;
  const before=e.hp;
  damage(e,amount*context.power,{omega:true,weapon:'omega',core:context.coreId,attackId:context.attackId,direct:!secondary,head:false,secondary});
  counters.hits++;counters.totalDamage+=Math.min(before,Math.max(0,before-e.hp));if(e.hp<=0)counters.kills++;
  effect('impact',e.mesh.position,e.mesh.position,context.color,{radius:secondary?.3:.45,life:.18});return true;
 }
 function makeWell(at,primary,context){
  if(wells.length>=MAX_WELLS)return;
  const occupied=new Set(wells.flatMap(w=>w.targets.map(t=>t.e)));
  const targets=[];
  if(enemyValid(primary)&&!occupied.has(primary))targets.push({e:primary,scale:1});
  const nearby=getEnemies().filter(e=>enemyValid(e)&&e!==primary&&!occupied.has(e)&&e.mesh.position.distanceTo(at)<=4&&visible(at,e.mesh.position))
   .sort((a,b)=>a.mesh.position.distanceToSquared(at)-b.mesh.position.distanceToSquared(at));
  // An impact target has already used one of this trigger's three target
  // slots, even if the direct hit killed it or another well owns its DoT.
  let secondaryBudget=primary?2:3;
  for(const e of nearby){if(!secondaryBudget--)break;targets.push({e,scale:.6});}
  // A primary in another well stays there; no reassignment refreshes its DoT.
  const w={at:at.clone(),targets,context,age:0,ticks:0};wells.push(w);
  effect('well',at,at,context.color,{radius:4,life:.9});
 }
 function newProjectile(kind,from,end,context){
  if(shots.length>=MAX_PROJECTILES)return false;
  const distance=from.distanceTo(end),dir=end.clone().sub(from);if(distance<.01)return false;dir.divideScalar(distance);
  shots.push({kind,pos:from.clone(),start:from.clone(),end:end.clone(),dir,speed:kind==='boomerang'?44:28,remaining:distance,context,age:0,leg:0,hits:new Set(),hitCount:0});return true;
 }
 function fire({build,origin,direction,muzzle=origin,attackId=0}={}){
  if(!build||!valid(origin)||!valid(direction)||direction.lengthSq()<1e-8||!valid(muzzle)||!Number.isFinite(build.damage)||build.damage<=0||!Number.isFinite(build.range)||build.range<=0||!['echo','tether','ricochet','gravity','boomerang'].includes(build.coreId))return {fired:false};
  const beforeHits=counters.hits;
  const dir=direction.clone().normalize(),distance=cap(build.range||32,1,60),context={...build,attackId,power:cap(build.power||1,1,1.24)};
  let start=muzzle.clone();const muzzleOffset=start.clone().sub(origin),muzzleLength=muzzleOffset.length();
  if(muzzleLength>.001&&cover(origin,muzzleOffset.divideScalar(muzzleLength),muzzleLength)<muzzleLength-.04)start.copy(origin);
  const limit=cover(origin,dir,distance),hit=candidates(origin,dir,limit)[0],end=origin.clone().addScaledVector(dir,hit?hit.along:limit);
  if(build.coreId==='gravity'||build.coreId==='boomerang'){
   // Camera chooses the desired point; the simulated projectile leaves the
   // visible muzzle and converges on that point, including near-cover checks.
   const destination=origin.clone().addScaledVector(dir,limit);
   if(!newProjectile(build.coreId,start,destination,context))return {fired:false};
   effect(build.coreId==='boomerang'?'return':'beam',start,start.clone().addScaledVector(dir,.65),build.color,{radius:.14,life:.12});
  }else{
   effect(build.coreId==='tether'?'tether':'beam',start,end,build.color,{life:.14});
   if(hit){
    apply(hit.e,build.damage,context);
    if(build.coreId==='echo'&&echoes.length<MAX_ECHOES)echoes.push({e:hit.e,at:hit.e.mesh.position.clone(),from:origin.clone(),age:0,context});
    if(build.coreId==='tether'&&elapsed>=(tetherCooldown.get(hit.e)??-Infinity)&&hit.e.hp>0){
     tetherCooldown.set(hit.e,elapsed+1);hit.e.omegaSlow=hit.e.type==='boss'?.08:.25;hit.e.omegaSlowLife=hit.e.type==='boss'?(context.bossTetherDuration??.3):(context.tetherDuration??.6);slowed.add(hit.e);
    }
   }
   let bounced=false;
   if(build.coreId==='ricochet'&&typeof wallHit==='function'){
    const wall=wallHit(origin,dir,distance),normal=wall?.normal;
    if(wall&&Number.isFinite(wall.distance)&&wall.distance>0&&wall.distance<distance&&valid(normal)){
     const n=new T.Vector3(normal.x,normal.y,normal.z).normalize(),at=origin.clone().addScaledVector(dir,wall.distance),reflected=dir.clone().reflect(n).normalize(),from=at.clone().addScaledVector(reflected,.06),remaining=distance-wall.distance;
     const second=candidates(from,reflected,cover(from,reflected,remaining),new Set(hit?[hit.e]:[]))[0],to=from.clone().addScaledVector(reflected,second?second.along:cover(from,reflected,remaining));
     effect('beam',at,to,build.color,{life:.18});counters.bounces++;bounced=true;
     if(second)apply(second.e,build.damage*(context.bounceRetention??.65),context,true);
     wallImpact(origin,dir,at,context,wall.distance+.05);
     if(!second&&to.distanceTo(from)<remaining-.001)wallImpact(from,reflected,to,{...context,damage:context.damage*(context.bounceRetention??.65)},to.distanceTo(from)+.05);
    }
   }
   if(!hit&&!bounced&&limit<distance-.001)wallImpact(origin,dir,end,context,limit+.05);
  }
  counters.shots++;return {fired:true,end,hits:counters.hits-beforeHits};
 }
 function update(dt){
  if(!Number.isFinite(dt)||dt<=0)return;elapsed+=dt;
  for(const e of slowed){e.omegaSlowLife=Math.max(0,(e.omegaSlowLife||0)-dt);if(e.omegaSlowLife<=0||e.hp<=0){e.omegaSlow=0;slowed.delete(e);}}
  for(const [e,until] of tetherCooldown)if(until<=elapsed||e.hp<=0)tetherCooldown.delete(e);
  for(let i=echoes.length-1;i>=0;i--){const q=echoes[i];q.age+=dt;if(q.age+1e-9<(q.context.echoDelay??.3))continue;echoes.splice(i,1);
   if(enemyValid(q.e)&&q.e.mesh.position.distanceTo(q.at)<=q.e.r*1.15&&visible(q.from,q.at)){apply(q.e,q.context.echoDamage??18,q.context,true);effect('beam',q.from,q.at,q.context.color,{life:.12});counters.echoes++;}
  }
  for(let i=shots.length-1;i>=0;i--){const s=shots[i];s.age+=dt;if(s.age>3){shots.splice(i,1);continue;}
   const travel=Math.min(s.remaining,s.speed*dt),before=s.pos.clone(),rawWall=wallDistance(before,s.dir,travel),wall=Number.isFinite(rawWall)?cap(rawWall,0,travel):travel,distance=Math.min(travel,wall),hits=candidates(before,s.dir,distance,s.hits);
   s.pos.addScaledVector(s.dir,distance);s.remaining-=distance;
   if(s.kind==='gravity'){
    const h=hits[0];if(h)s.pos.copy(h.point);
    if(h||wall<travel-.001||s.remaining<.01){if(h)apply(h.e,s.context.damage,s.context);else if(physicalWallReached(before,s.dir,travel,rawWall))wallImpact(before,s.dir,s.pos,s.context,Math.min(travel,rawWall)+.05);const back=s.dir.clone().multiplyScalar(-.08);makeWell(s.pos.clone().add(back),h?.e,s.context);shots.splice(i,1);continue;}
   }else{
    for(const h of hits){if(s.hitCount>=3)break;s.hits.add(h.e);s.hitCount++;apply(h.e,s.context.damage,s.context,s.leg===1);}
    if(wall<travel-.001||s.remaining<.01){
     if(physicalWallReached(before,s.dir,travel,rawWall))wallImpact(before,s.dir,s.pos,s.context,Math.min(travel,rawWall)+.05);
     if(s.leg===0){s.leg=1;s.hits.clear();s.hitCount=0;s.remaining=s.pos.distanceTo(s.start);s.dir.copy(s.start).sub(s.pos).normalize();s.speed=s.context.returnSpeed??44;counters.returns++;if(s.remaining<.01){shots.splice(i,1);continue;}
      // Raycasters can report the exact surface we're leaving at distance 0.
      // Step inward on reversal so a valid wall return is not deleted there.
      const inset=Math.min(.06,s.remaining);s.pos.addScaledVector(s.dir,inset);s.remaining-=inset;
     }
     else{shots.splice(i,1);continue;}
    }
   }
   effect(s.kind==='boomerang'?'return':'beam',before,s.pos,s.context.color,{radius:.14,life:.09});
  }
  for(let i=wells.length-1;i>=0;i--){const w=wells[i];w.age+=dt;
   while(w.ticks<3&&w.age+1e-8>=(w.ticks+1)*.3){w.ticks++;counters.pulses++;for(const t of w.targets){const e=t.e;if(!enemyValid(e)||e.mesh.position.distanceTo(w.at)>4+e.r||!visible(w.at,e.mesh.position))continue;apply(e,(w.context.pulseDamage??18)*t.scale,w.context,true);if(e.hp>0&&e.type!=='boss')knockback(e,w.at,w.context.gravityPull??.5,{pull:true});}effect('well',w.at,w.at,w.context.color,{radius:4,life:.12});}
   if(w.ticks===3)wells.splice(i,1);
  }
 }
 function reset(){shots.length=echoes.length=wells.length=0;elapsed=0;for(const e of slowed){e.omegaSlow=0;e.omegaSlowLife=0;}slowed.clear();tetherCooldown.clear();for(const k of Object.keys(counters))counters[k]=0;}
 return {fire,update,reset,stats:()=>({...counters,projectiles:shots.length,pendingEchoes:echoes.length,wells:wells.length,limits:{projectiles:MAX_PROJECTILES,echoes:MAX_ECHOES,wells:MAX_WELLS}})};
}
