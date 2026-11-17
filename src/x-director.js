// Difficulty X rules are independent of render rate, enemy meshes and campaign state.
export const X_RULES=Object.freeze({
 startSeconds:42,maxSeconds:60,waveSeconds:5,
 killSeconds:1.2,bountySeconds:6,sealSeconds:4,killCharge:18,bountyCharge:32,
 initialCharge:45,maxCharge:100,breakSeconds:4,timeScale:.18,
 damageTimeScale:.13,maxHitSeconds:6,comboWindow:3.5,comboThreshold:5,comboSeconds:.6,
 closeCallSeconds:8
});

export const X_MUTATIONS=Object.freeze([
 Object.freeze({id:'implosion',name:'撃破爆縮',tag:'CHAIN REACTION',text:'撃破した敵が爆縮。半径7mの敵へ45ダメージ。',radius:7,damage:45}),
 Object.freeze({id:'dash',name:'衝撃ダッシュ',tag:'BREACH RUNNER',text:'ダッシュ開始時、半径6mの敵へ70ダメージ。',radius:6,damage:70}),
 Object.freeze({id:'airborne',name:'空中処刑',tag:'SKY EXECUTION',text:'空中から与えるダメージが1.6倍。',damageMultiplier:1.6}),
 Object.freeze({id:'hotswap',name:'強奪装填',tag:'HOT SWAP',text:'武器切替で装弾40%を補充、2秒間の威力1.35倍。再使用2.5秒。',refill:.4,damageMultiplier:1.35,duration:2,cooldown:2.5}),
 Object.freeze({id:'sustain',name:'時間拡張',tag:'STOLEN MOMENT',text:'BREAK時間+1.5秒。BREAK中の撃破ごとに+0.2秒、延長上限1.2秒。',durationBonus:1.5,killExtension:.2,maxExtension:1.2}),
 Object.freeze({id:'bounty',name:'指名手配',tag:'BOUNTY HUNTER',text:'指名対象の撃破で奪う時間+3秒、BREAKチャージ+10。',timeBonus:3,chargeBonus:10})
]);
const mutationById=new Map(X_MUTATIONS.map(m=>[m.id,m]));
const positive=value=>Number.isFinite(value)&&value>0?value:0;
const subtractTime=(value,dt)=>value-dt>1e-9?value-dt:0;

export class XDirector{
 constructor(){this.reset();}
 reset(){
  this.wave=0;this.seconds=X_RULES.startSeconds;this.charge=X_RULES.initialCharge;
  this.breakRemaining=0;this.breakExtension=0;this.combo=0;this.comboAge=0;
  this.kills=0;this.bountyKills=0;this.maxCombo=0;this.breakActivations=0;
  this.timeStolen=0;this.timeLost=0;this.closeCalls=0;this.elapsed=0;this.expired=false;
  this.mutations=new Set();return this.snapshot();
 }
 get breaking(){return this.breakRemaining>0;}
 owns(id){return this.mutations.has(id);}
 rank(id){return this.owns(id)?1:0;}
 enter(wave){
  if(!Number.isInteger(wave)||wave<1||wave>6||wave<=this.wave||this.expired)return false;
  this.wave=wave;
  if(wave>1)this.seconds=Math.min(X_RULES.maxSeconds,this.seconds+X_RULES.waveSeconds);
  this.combo=0;this.comboAge=0;return true;
 }
 tick(dt){
  dt=positive(dt);if(this.expired||!dt)return this.expired;
  this.elapsed+=dt;
  this.seconds=subtractTime(this.seconds,dt);
  this.breakRemaining=subtractTime(this.breakRemaining,dt);
  if(this.combo){this.comboAge+=dt;if(this.comboAge>=X_RULES.comboWindow){this.combo=0;this.comboAge=0;}}
  this.expired=this.seconds===0;return this.expired;
 }
 kill({bounty=false,seal=false}={}){
  if(this.expired)return {seconds:0,charge:0,combo:this.combo,bounty:!!bounty};
  const wasBreaking=this.breaking,beforeSeconds=this.seconds,beforeCharge=this.charge;
  this.kills++;if(bounty)this.bountyKills++;
  this.combo++;this.comboAge=0;this.maxCombo=Math.max(this.maxCombo,this.combo);
  let seconds=seal?X_RULES.sealSeconds:bounty?X_RULES.bountySeconds:X_RULES.killSeconds;
  let charge=bounty?X_RULES.bountyCharge:X_RULES.killCharge;
  if(bounty&&this.owns('bounty')){const m=mutationById.get('bounty');seconds+=m.timeBonus;charge+=m.chargeBonus;}
  if(this.combo>=X_RULES.comboThreshold)seconds+=X_RULES.comboSeconds;
  this.seconds=Math.min(X_RULES.maxSeconds,this.seconds+seconds);
  this.charge=Math.min(X_RULES.maxCharge,this.charge+charge*(wasBreaking?.5:1));
  const stolen=this.seconds-beforeSeconds;this.timeStolen+=stolen;
  if(beforeSeconds<=X_RULES.closeCallSeconds&&this.seconds>X_RULES.closeCallSeconds)this.closeCalls++;
  if(wasBreaking&&this.owns('sustain')){
   const m=mutationById.get('sustain'),extension=Math.max(0,Math.min(m.killExtension,m.maxExtension-this.breakExtension));
   this.breakRemaining+=extension;this.breakExtension+=extension;
  }
  return {seconds:stolen,charge:this.charge-beforeCharge,combo:this.combo,bounty:!!bounty};
 }
 hit(actual){
  if(this.expired)return 0;
  const loss=Math.min(this.seconds,X_RULES.maxHitSeconds,positive(actual)*X_RULES.damageTimeScale);
  this.seconds-=loss;this.timeLost+=loss;this.expired=this.seconds===0;return loss;
 }
 activate(){
  if(this.expired||this.breaking||this.charge<X_RULES.maxCharge)return false;
  this.charge=0;this.breakRemaining=X_RULES.breakSeconds+(this.owns('sustain')?mutationById.get('sustain').durationBonus:0);
  this.breakExtension=0;this.breakActivations++;return true;
 }
 offers(rng=Math.random){
  const pool=X_MUTATIONS.filter(m=>!this.owns(m.id));
  for(let i=pool.length-1;i>0;i--){const value=rng(),unit=Number.isFinite(value)?Math.max(0,Math.min(.999999999999,value)):0,j=Math.floor(unit*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  return pool.slice(0,3);
 }
 install(id){
  if(this.expired||!mutationById.has(id)||this.owns(id))return false;
  this.mutations.add(id);return true;
 }
 snapshot(){
  return {wave:this.wave,seconds:this.seconds,charge:this.charge,breakRemaining:this.breakRemaining,breaking:this.breaking,
   combo:this.combo,kills:this.kills,bountyKills:this.bountyKills,maxCombo:this.maxCombo,breakActivations:this.breakActivations,
   timeStolen:this.timeStolen,timeLost:this.timeLost,closeCalls:this.closeCalls,elapsed:this.elapsed,expired:this.expired,
   mutations:[...this.mutations]};
 }
}
