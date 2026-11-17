export const OMEGA_RAID_RULES = Object.freeze({
  seconds: 30,
  coresToBoss: 3,
  maxMisses: 6,
  rewardHeal: 12,
  rewardScore: 1000
});

const MISSIONS = Object.freeze({
  breach: Object.freeze({title:'封鎖装置を破壊',instruction:'光る封鎖装置を3基撃ち壊せ。',needed:3,label:'BREACH'}),
  relay: Object.freeze({title:'中継点を制圧',instruction:'光る中継点2か所に入り、占拠を完了しろ。',needed:2,label:'RELAY'}),
  route: Object.freeze({title:'裂け目を走破',instruction:'順番に光るチェックポイント2個を通過しろ。',needed:2,label:'ROUTE'}),
  hunt: Object.freeze({title:'指名標的を排除',instruction:'金色の標的2体を倒せ。',needed:2,label:'HUNT'}),
  boss: Object.freeze({title:'世界の心臓を破壊',instruction:'WARDENを撃破し、再構築を止めろ。',needed:1,label:'WORLD HEART'})
});
const KINDS = Object.freeze(['breach','relay','route','hunt']);

export class OmegaRaid {
  constructor(seed=1){this.reset(seed);}

  reset(seed=1){
    this.seed=(Number(seed)>>>0)||1;
    this.randomState=this.seed;
    this.cores=0;
    this.misses=0;
    this.round=0;
    this.kind=null;
    this.lastKind=null;
    this.elapsed=0;
    this.value=0;
    this.completed=false;
    this.expired=false;
    this.active=false;
    this.gameOver=false;
    this.rerollAvailable=false;
    this.completedTypes=[];
    this.history=[];
    return this.snapshot();
  }

  random(){
    this.randomState=(Math.imul(this.randomState,1664525)+1013904223)>>>0;
    return this.randomState/4294967296;
  }

  begin({bossAlive=false,kind}={}){
    if(this.gameOver)return false;
    const options=KINDS.filter(kind=>kind!==this.lastKind);
    this.kind=this.cores>=OMEGA_RAID_RULES.coresToBoss||bossAlive?'boss':KINDS.includes(kind)?kind:options[Math.floor(this.random()*options.length)];
    if(this.kind!=='boss')this.lastKind=this.kind;
    this.round++;
    this.elapsed=0;
    this.value=0;
    this.completed=false;
    this.expired=false;
    this.active=true;
    this.rerollAvailable=true;
    return this.snapshot();
  }

  get remaining(){return Math.max(0,OMEGA_RAID_RULES.seconds-this.elapsed);}
  get needed(){return MISSIONS[this.kind]?.needed||0;}
  get bossReady(){return this.cores>=OMEGA_RAID_RULES.coresToBoss;}

  // Progress is monotonic within a rift. A completed objective cannot be
  // credited twice by overlapping hits, pickups or a repeated frame callback.
  setProgress(value){
    if(!this.active||this.expired||this.gameOver||this.completed||this.kind==='boss'||!Number.isFinite(value))return null;
    this.value=Math.max(this.value,Math.min(this.needed,Math.max(0,value)));
    if(this.value<this.needed)return null;
    this.completed=true;
    this.cores=Math.min(OMEGA_RAID_RULES.coresToBoss,this.cores+1);
    this.completedTypes.push(this.kind);
    return {type:'complete',kind:this.kind,cores:this.cores,progress:this.value,needed:this.needed,round:this.round,reward:{heal:OMEGA_RAID_RULES.rewardHeal,score:OMEGA_RAID_RULES.rewardScore}};
  }

  advanceProgress(amount=1){
    if(!Number.isFinite(amount)||amount<=0)return null;
    return this.setProgress(this.value+amount);
  }

  progress(amount=1){return this.advanceProgress(amount);}

  tick(dt,{progress}={}){
    if(!this.active||this.expired||this.gameOver||!Number.isFinite(dt)||dt<=0)return [];
    const events=[];
    if(progress!==undefined){const complete=this.setProgress(progress);if(complete)events.push(complete);}
    this.elapsed=Math.min(OMEGA_RAID_RULES.seconds,this.elapsed+dt);
    if(this.elapsed<OMEGA_RAID_RULES.seconds)return events;
    this.active=false;
    this.expired=true;
    const boss=this.kind==='boss',failed=!boss&&!this.completed;
    if(failed)this.misses=Math.min(OMEGA_RAID_RULES.maxMisses,this.misses+1);
    this.gameOver=this.misses>=OMEGA_RAID_RULES.maxMisses;
    const shift={type:'shift',success:this.completed,boss,failed,gameOver:this.gameOver,cores:this.cores,misses:this.misses,round:this.round};
    this.history.push({...shift,kind:this.kind});
    if(this.history.length>32)this.history.shift();
    events.push(shift);
    return events;
  }

  consumeReroll(){
    if(!this.active||this.expired||this.gameOver||!this.rerollAvailable)return false;
    this.rerollAvailable=false;
    return true;
  }

  snapshot(){
    const mission=MISSIONS[this.kind];
    return {seed:this.seed,round:this.round,kind:this.kind,title:mission?.title||'RIFT RAID',label:mission?.label||'STANDBY',instruction:mission?.instruction||'世界へ接続中。',progress:this.value,needed:this.needed,elapsed:this.elapsed,remaining:this.remaining,cores:this.cores,coresToBoss:OMEGA_RAID_RULES.coresToBoss,misses:this.misses,maxMisses:OMEGA_RAID_RULES.maxMisses,bossReady:this.bossReady,boss:this.kind==='boss',completed:this.completed,expired:this.expired,active:this.active,gameOver:this.gameOver,rerollAvailable:this.rerollAvailable,completedTypes:[...this.completedTypes],history:this.history.map(item=>({...item}))};
  }
}
