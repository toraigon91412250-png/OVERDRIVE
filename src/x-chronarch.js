// X's final encounter owns its phase gates and seal identities here. Rendering,
// collision, rewards and scene mutation stay in the integration layer.
export const CHRONARCH=Object.freeze({
 hp:1700,sealHP:90,sealCount:2,sealRadius:.85,sealReward:4,sealCharge:18,
 transitionSeconds:.65,firstAttackSeconds:1.2,
 intervals:Object.freeze([2.6,3.1,2.4])
});

const positive=value=>Number.isFinite(value)&&value>0?value:0;
const sealIds=phase=>Array.from({length:CHRONARCH.sealCount},(_,i)=>`chrono-${phase}-${i}`);
const emptyDamage=()=>({applied:0,nextPhase:false,defeated:false});

export class ChronarchController{
 constructor(){this.reset();}
 reset(){
  this.active=false;this.hp=this.max=CHRONARCH.hp;this.phase=0;
  this.mode='inactive';this.seals=new Set();this.broken=0;this.totalBroken=0;
  this.transition=0;this.attacks=0;this.defeated=false;
  this.attackTimer=CHRONARCH.firstAttackSeconds;this.phaseAttacks=0;
  return this.snapshot();
 }
 begin(){
  this.reset();this.active=true;this.mode='sealed';this.seals=new Set(sealIds(0));
  return this.snapshot();
 }
 breakSeal(id){
  if(!this.active||this.mode!=='sealed'||!this.seals.has(id))return null;
  this.seals.delete(id);this.broken++;this.totalBroken++;
  const opened=this.seals.size===0;if(opened)this.mode='open';
  return {id,phase:this.phase,seconds:CHRONARCH.sealReward,charge:CHRONARCH.sealCharge,opened};
 }
 damageCore(amount){
  amount=positive(amount);if(!this.active||this.mode!=='open'||!amount)return emptyDamage();
  const floor=this.max*(2-this.phase)/3,available=Math.max(0,this.hp-floor);
  const applied=Math.min(amount,available);this.hp-=applied;
  if(amount<available)return {applied,nextPhase:false,defeated:false};
  // Overflow is intentionally discarded. The new seal entities are not ready
  // until a later tick, so one shot cannot damage every phase at once.
  this.hp=floor;
  if(this.phase===2){
   this.hp=0;this.active=false;this.mode='defeated';this.defeated=true;
   this.seals.clear();this.transition=0;
   return {applied,nextPhase:false,defeated:true};
  }
  this.phase++;this.mode='transition';this.transition=CHRONARCH.transitionSeconds;
  this.seals.clear();this.broken=0;this.phaseAttacks=0;this.attackTimer=CHRONARCH.firstAttackSeconds;
  return {applied,nextPhase:true,defeated:false};
 }
 tick(enemyDt,realDt=enemyDt){
  if(!this.active)return [];
  enemyDt=positive(enemyDt);realDt=positive(realDt);
  if(this.mode==='transition'){
   this.transition=Math.max(0,this.transition-realDt);
   if(this.transition>1e-9)return [];
   this.transition=0;this.mode='sealed';this.seals=new Set(sealIds(this.phase));
   return [{type:'seals',ids:[...this.seals]}];
  }
  if(!enemyDt)return [];
  const events=[];this.attackTimer-=enemyDt;
  while(this.attackTimer<=1e-9){
   if(this.phase===0)events.push({type:'fan',count:5,speed:11});
   else if(this.phase===1)events.push({type:'marks',count:2,radius:3,delay:.9,damage:20});
   else if(this.phaseAttacks%2===0)events.push({type:'fan',count:7,speed:13});
   else events.push({type:'laser',delay:.9,damage:22});
   this.attacks++;this.phaseAttacks++;this.attackTimer+=CHRONARCH.intervals[this.phase];
  }
  return events;
 }
 snapshot(){
  return {active:this.active,hp:this.hp,max:this.max,phase:this.phase,mode:this.mode,
   seals:[...this.seals],broken:this.broken,totalBroken:this.totalBroken,
   transition:this.transition,attacks:this.attacks,defeated:this.defeated};
 }
}
