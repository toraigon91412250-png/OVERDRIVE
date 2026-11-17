export function createRunStats(storage){
 let state=null,finished=false,lastHealth=3,lastAmmo=4,air=0;
 function reset(type,ammo=4){finished=false;lastHealth=3;lastAmmo=ammo;air=0;state={type,time:0,maxSpeed:0,longestAir:0,damage:0,spears:0,won:false,best:null};}
 function step(dt,speed,airborne,health,ammo){if(!state||finished)return;state.time+=dt;state.maxSpeed=Math.max(state.maxSpeed,speed);air=airborne?air+dt:0;state.longestAir=Math.max(state.longestAir,air);state.damage+=Math.max(0,lastHealth-health);state.spears+=Math.max(0,lastAmmo-ammo);lastHealth=health;lastAmmo=ammo;}
 function finish(won){if(!state)return null;if(finished)return {...state};finished=true;state.won=won;try{const key='odm-titan-best-'+state.type,raw=Number(storage?.getItem(key));const previous=raw>0&&Number.isFinite(raw)?raw:null;if(won){state.best=previous===null?state.time:Math.min(previous,state.time);storage?.setItem(key,String(state.best));}else state.best=previous;}catch{}return {...state};}
 return {reset,step,finish,get:()=>state?{...state}:null};
}
