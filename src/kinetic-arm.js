export const KINETIC_ARM_RULES = Object.freeze({
  capacity: 6,
  window: .55,
  cooldown: .9,
  damagePerCell: 42
});

// Collision and aiming stay in the game. This controller only owns the
// finite catch window and stored ammunition, so menus cannot advance it.
export class KineticArm {
  constructor(){this.reset();}

  reset(){
    this.stored=0;
    this.window=0;
    this.cooldown=0;
    return this.snapshot();
  }

  tick(dt){
    if(!Number.isFinite(dt)||dt<=0)return;
    this.window=Math.max(0,this.window-dt);
    this.cooldown=Math.max(0,this.cooldown-dt);
  }

  press(){
    // A successful catch can be returned immediately. The release starts its
    // own cooldown, preventing another empty catch window from opening at once.
    if(this.stored>0){
      const cells=this.stored;
      this.stored=0;
      this.window=0;
      this.cooldown=KINETIC_ARM_RULES.cooldown;
      return {type:'release',cells,charged:cells===KINETIC_ARM_RULES.capacity};
    }
    if(this.cooldown>0)return null;
    this.window=KINETIC_ARM_RULES.window;
    this.cooldown=KINETIC_ARM_RULES.cooldown;
    return {type:'catch'};
  }

  capture(forceDash=false){
    const dash=forceDash===true||(forceDash&&typeof forceDash==='object'&&forceDash.forceDash===true);
    if(this.stored>=KINETIC_ARM_RULES.capacity||!(this.window>0||dash))return false;
    this.stored++;
    return true;
  }

  snapshot(){
    const catching=this.window>0&&this.stored<KINETIC_ARM_RULES.capacity;
    const ready=this.stored>0||this.cooldown<=0;
    const label=this.stored===KINETIC_ARM_RULES.capacity?'FULL RETURN':this.stored>0?'RETURN':catching?'CATCH':this.cooldown>0?'COOLDOWN':'READY';
    return {stored:this.stored,window:this.window,cooldown:this.cooldown,capacity:KINETIC_ARM_RULES.capacity,catching,ready,label};
  }
}
