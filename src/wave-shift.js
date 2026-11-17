// Active combat time only; one opportunity per ordinary sector, never before 30 seconds.
export class WaveShift {
 constructor(random=Math.random){this.random=random;this.reset();}
 reset(){this.enabled=false;this.elapsed=0;this.deadline=Infinity;this.used=false;this.pending=0;this.layout=null;}
 start(wave,normal){this.reset();this.enabled=normal&&wave>=1&&wave<=5;if(this.enabled)this.deadline=30+this.random()*15;}
 tick(dt,remaining){if(!this.enabled||this.used)return false;this.elapsed+=dt;if(this.elapsed>=this.deadline&&remaining>0){this.used=true;return true;}return false;}
 snapshot(){return {enabled:this.enabled,elapsed:this.elapsed,deadline:this.enabled?this.deadline:null,used:this.used,pending:this.pending,layout:this.layout};}
}
