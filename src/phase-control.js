export const PHASE = Object.freeze({boltDamage:45, cellTime:.12, chargeTime:2.88, boltCooldown:.16, beamCooldown:.32, range:65, pierce:4, refill:12, capacity:24, novaThreshold:10, explosionThreshold:24, novaMultiplier:1.6, blastMultiplier:.6, explosionRadius:16, explosionDirectMultiplier:1.35, explosionBlastMultiplier:.75});
export class PhaseControl {
 constructor(){this.reset();}
 reset(){this.active=false;this.cooldown=0;this.cancelHold();}
 cancelHold(){this.held=false;this.pending=false;this.charging=false;this.charge=0;this.automatic=false;this.limit=24;}
 chargeOnce(){if(this.active)this.automatic=true;}
 get cost(){return Math.min(this.limit,Math.max(1,Math.floor((this.charge+1e-6)/PHASE.cellTime)));}
 get progress(){return Math.min(1,this.charge/PHASE.chargeTime);}
 update(dt,active,held,ammo=24,speed=1,pressed=false){
  if(!active){this.reset();return null;}
  this.active=true;this.cooldown=Math.max(0,this.cooldown-dt);
  const rising=(held&&!this.held)||pressed;this.held=held;this.pending=this.pending||rising;
  if(ammo<=0){this.cancelHold();return null;}
  this.limit=Math.min(24,Math.floor(ammo));
  if(this.cooldown>0)return null;
  if(held||this.pending||this.automatic)this.charging=true;this.pending=false;
  if(!this.charging)return null;
  if(held||this.automatic)this.charge=Math.min(this.limit*PHASE.cellTime,this.charge+dt*speed);
  if(!held&&!this.automatic||this.automatic&&this.charge>=this.limit*PHASE.cellTime){
   const count=this.cost,kind=count>=PHASE.explosionThreshold?'explosion':count>=10?'nova':count>1?'beam':'bolt';
   this.cancelHold();this.cooldown=count>1?PHASE.beamCooldown:PHASE.boltCooldown;
   return {kind,ammo:count};
  }
  return null;
 }
}
