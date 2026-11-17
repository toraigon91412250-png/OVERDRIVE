import * as T from 'three';
import {traceEnemyRay,enemyAimPoint} from './enemy-hit-shapes.js';

// The three conventional evolved weapons share cover-aware traces, but retain
// separate combat jobs: close-range displacement, penetrating/reflected rails,
// and a single precision shot with a kill-triggered ricochet route.
export function createArsenalCombat({getEnemies,wallDistance,damage,attackMeta=()=>({}),knockback=()=>{},discharge=()=>{},onRay=()=>{},onTrace=()=>{}}){
 const counters={shots:0,pellets:0,directHits:0,secondaryHits:0,kills:0,shocks:0,detonations:0,prismLinks:0,echoes:0};
 const finiteVector=v=>!!v&&Number.isFinite(v.x)&&Number.isFinite(v.y)&&Number.isFinite(v.z);
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 function limitAt(origin,direction,range){
  const wall=wallDistance(origin,direction,range);
  return Number.isFinite(wall)?clamp(wall,0,range):range;
 }
 function visible(from,to){
  const delta=to.clone().sub(from),length=delta.length();
  return length<.001||limitAt(from,delta.divideScalar(length),length)>=length-.08;
 }
 function trace(origin,direction,range,piercing=false){
  onRay(origin,direction);
  const limit=limitAt(origin,direction,range),hits=[];
  for(const e of getEnemies()){
   if(!(e.hp>0)||!finiteVector(e.mesh?.position)||!(e.r>0))continue;
   const hit=traceEnemyRay(e,origin,direction,limit);
   if(hit)hits.push(hit);
  }
  hits.sort((a,b)=>a.along-b.along);
  if(!piercing)hits.splice(1);
  const result={hits,limit,end:origin.clone().addScaledVector(direction,hits.length?hits[hits.length-1].along:limit)};onTrace({...result,origin,direction,range,piercing});return result;
 }
 function emit(weapon,from,to,build,charged=false){
  if(finiteVector(from)&&finiteVector(to))discharge(weapon,from.clone(),to.clone(),{build,charged});
 }
 function shotResult(){return{fired:false,hits:0,kills:0,totalDamage:0,end:null};}
 function apply(e,raw,head,multiplier,result,secondary=false){
  if(!(e.hp>0))return;
  const factor=multiplier(e,head),amount=raw*factor;
  if(!Number.isFinite(amount)||amount<=0)return;
  const before=e.hp;
  damage(e,amount,!secondary,{...attackMeta(e),direct:!secondary,head});
  result.hits++;result.totalDamage+=Math.min(before,Math.max(0,before-e.hp));
  counters[secondary?'secondaryHits':'directHits']++;
  if(e.hp<=0){result.kills++;counters.kills++;}
 }
 function radial({weapon,build,center,from,radius,power,multiplier,result,push=false,pushed=new Set()}){
  if(!(radius>0)||!(power>0))return;
  // Bias the blast toward the shooter. A wall at the impact point must not
  // become a convenient origin on the far side of its own collision surface.
  const toward=from.clone().sub(center),length=toward.length();
  const origin=center.clone();if(length>.001)origin.addScaledVector(toward,.14/length);
  for(const e of getEnemies()){
   if(!(e.hp>0)||!finiteVector(e.mesh?.position))continue;
   const aim=enemyAimPoint(e),distance=aim.distanceTo(center);
   if(distance>radius||!visible(origin,aim))continue;
   const falloff=1-.55*clamp(distance/radius,0,1);
   if(push&&e.type!=='boss'&&!pushed.has(e))knockback(e,from,build.knockback*.7);
   apply(e,power*falloff,false,multiplier,result,true);
  }
 }
 function chain({weapon,build,start,visited,count,range,power,multiplier,result,kind}){
  let from=start.clone();
  for(let hop=0;hop<count;hop++){
   const candidates=getEnemies().filter(e=>e.hp>0&&!visited.has(e)&&finiteVector(e.mesh?.position)&&enemyAimPoint(e).distanceTo(from)<=range)
    .sort((a,b)=>enemyAimPoint(a).distanceToSquared(from)-enemyAimPoint(b).distanceToSquared(from));
   const target=candidates.find(e=>visible(from,enemyAimPoint(e)));
   if(!target)break;
   visited.add(target);const to=enemyAimPoint(target);
   emit(weapon,from,to,build,true);apply(target,power,false,multiplier,result,true);counters[kind]++;
   from=to;
  }
 }
 function fire({weapon,build,origin,direction,muzzle=origin,multiplier=()=>1,random=Math.random}={}){
  const result=shotResult();
  if(![1,2,4].includes(weapon)||!build||!(build.tier>0)||!finiteVector(origin)||!finiteVector(direction)||direction.lengthSq()<1e-8||!finiteVector(muzzle)||!Number.isFinite(build.power)||!(build.power>0))return result;
  const dir=direction.clone().normalize();result.fired=true;counters.shots++;
  if(weapon===1){
   const pellets=clamp(Math.floor(build.pellets||8),1,32),spread=clamp(build.spread||0,0,.7);
   const right=new T.Vector3().crossVectors(dir,new T.Vector3(0,1,0));
   if(right.lengthSq()<1e-6)right.set(1,0,0);else right.normalize();
   const up=new T.Vector3().crossVectors(right,dir).normalize();
   const roll=random(),phase=(Number.isFinite(roll)?roll:0)*Math.PI*2;
   const pushed=new Set();let first=null;
   for(let i=0;i<pellets;i++){
    counters.pellets++;
    const radius=i?spread*.5*Math.sqrt((i-1)/Math.max(1,pellets-1)):0,angle=phase+Math.max(0,i-1)*2.399963229728653;
    const ray=dir.clone().addScaledVector(right,Math.cos(angle)*radius).addScaledVector(up,Math.sin(angle)*radius).normalize();
    const shot=trace(origin,ray,45);
    const h=shot.hits[0];
    if(!h)continue;
    if(!first||h.along<first.along)first=h;
    if(h.e.type!=='boss')pushed.add(h.e);
    const falloff=h.along<=8?1.25:h.along<=14?.45:.06;
    apply(h.e,12.5*build.power*falloff,h.head,multiplier,result);
   }
   const straightLimit=limitAt(origin,dir,45);
   // Pressure stays in front of the gun. A stray pellet at long range cannot
   // teleport the full shockwave to a distant pack of enemies.
   const end=build.path==='vortex'?origin.clone().addScaledVector(dir,Math.min(straightLimit,first?.along??6,6)):
    first?first.point.clone():origin.clone().addScaledVector(dir,straightLimit);
   result.end=end;emit(weapon,muzzle,end,build,build.tier===3);
   const hitFalloff=first?(first.along<=8?1.25:first.along<=14?.45:.06):1;
   const total=12.5*build.power*pellets*hitFalloff;
   if(build.path==='vortex'&&build.shockRadius>0){counters.shocks++;radial({weapon,build,center:end,from:origin,radius:build.shockRadius,power:total*build.shockPower,multiplier,result,push:true,pushed});}
   if(build.path==='burst'&&first&&build.blastRadius>0){counters.detonations++;radial({weapon,build,center:end,from:origin,radius:build.blastRadius,power:total*build.blastPower,multiplier,result});}
   for(const e of pushed)if(e.hp>0)knockback(e,origin,build.knockback||3);
   return result;
  }
  const shot=trace(origin,dir,100,weapon===2);result.end=shot.end;
  emit(weapon,muzzle,shot.end,build,build.tier===3);
  if(!shot.hits.length)return result;
  const visited=new Set(shot.hits.map(h=>h.e));
  if(weapon===2){
   for(const h of shot.hits){const rangeBonus=1.3+clamp((h.along-10)/35,0,.65);apply(h.e,92*build.power*rangeBonus*(build.siegeMultiplier||1),h.head,multiplier,result);}
   if(build.path==='prism'&&build.prismTargets>0){
    const first=shot.hits[0];
    chain({weapon,build,start:enemyAimPoint(first.e),visited,count:build.prismTargets,range:build.prismRange,power:92*build.power*(1.3+clamp((first.along-10)/35,0,.65))*build.prismPower,multiplier,result,kind:'prismLinks'});
   }
  }else{
   const h=shot.hits[0],before=h.e.hp;
   apply(h.e,120*build.power,h.head,multiplier,result);
   if(build.path==='echo'&&before>0&&h.e.hp<=0&&build.echoTargets>0){
    chain({weapon,build,start:enemyAimPoint(h.e),visited,count:build.echoTargets,range:build.echoRange,power:120*build.power*build.echoPower,multiplier,result,kind:'echoes'});
   }
  }
  return result;
 }
 return{fire,stats:()=>({...counters}),reset:()=>{for(const key of Object.keys(counters))counters[key]=0;}};
}
