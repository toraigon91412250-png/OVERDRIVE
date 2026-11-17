import * as T from 'three';
import {createExplosionVisuals} from './explosion-visuals.js';
const clamp=T.MathUtils.clamp;
// All choreography uses game time: pausing never leaves an asynchronous detonation behind.
export function createExplosionDirector(scene,{getAudio=()=>null,soundEnabled=()=>false}={}){
 const visuals=createExplosionVisuals(scene),$=id=>document.getElementById(id);
 const overlay=$('ultimate'),title=$('ultimate-title'),result=$('ultimate-result'),status=$('ultimate-status');
 const reducedMotion=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 let kills=0,phase='idle',charge=0,low=false,sources=[],chargeVoice=null,center=new T.Vector3();
 const audio=()=>soundEnabled()?getAudio():null;
 function stop(){for(const n of sources){if(typeof n.stop==='function'){try{n.stop()}catch{}}try{n.disconnect()}catch{}}sources=[];chargeVoice=null;}
 function tone(ctx,type,start,end,length,gain,delay=0){
  const o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime+delay;o.type=type;o.frequency.setValueAtTime(start,t);o.frequency.exponentialRampToValueAtTime(Math.max(12,end),t+length);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.025);g.gain.exponentialRampToValueAtTime(.0001,t+length);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+length+.03);sources.push(o,g);
 }
 function boom(){stop();const ctx=audio();if(!ctx)return;tone(ctx,'sine',110,24,1.9,.22);tone(ctx,'triangle',220,34,.8,.10,.05);tone(ctx,'sine',880,110,.6,.04,.04);
  // One bounded noise buffer, heavily filtered into a low rolling detonation.
  const length=1.7,b=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*length),ctx.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=(Math.random()*2-1)*Math.pow(1-i/a.length,1.3);
  const src=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),g=ctx.createGain();src.buffer=b;filter.type='lowpass';filter.frequency.setValueAtTime(1600,ctx.currentTime);filter.frequency.exponentialRampToValueAtTime(80,ctx.currentTime+length);g.gain.setValueAtTime(.13,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+length);src.connect(filter);filter.connect(g);g.connect(ctx.destination);src.start();sources.push(src,filter,g);
 }
 function chargingAudio(value){const ctx=audio();if(!ctx){if(chargeVoice)stop();return;}if(value<=.35){if(chargeVoice)stop();return;}if(!chargeVoice){const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';g.gain.value=0;o.connect(g);g.connect(ctx.destination);o.start();sources.push(o,g);chargeVoice={o,g};}chargeVoice.o.frequency.setTargetAtTime(90+value*560,ctx.currentTime,.05);chargeVoice.g.gain.setTargetAtTime(.009+value*.025,ctx.currentTime,.08);}
 function paint(){
  const active=visuals.active,a=visuals.age,ready=charge>=.999;
  overlay.hidden=!active&&charge<.12;overlay.className=active?'ultimate cast':ready?'ultimate charging ready':'ultimate charging';
  if(active){
   const blast=clamp((a-.08)/.14,0,1)*(1-clamp((a-.25)/.8,0,1));
   overlay.style.setProperty('--flash',String(blast*(reducedMotion?.32:.8)));overlay.style.setProperty('--heat',String((1-clamp((a-.7)/2.6,0,1))*.72));overlay.style.setProperty('--iris',String(clamp(a/1.0,0,1)));
   overlay.style.setProperty('--title',String(clamp((a-.23)/.18,0,1)*(1-clamp((a-2.5)/.6,0,1))));
   title.textContent='EXPLOSION';status.textContent=a<.3?'LIMIT RELEASE // 24 CELLS':a<1.8?'衝撃波 / IMPACT ZONE':'残響 / SYSTEM RECOVERY';result.textContent=String(kills).padStart(2,'0')+' HOSTILES ELIMINATED';
  }else{
   overlay.style.setProperty('--flash','0');overlay.style.setProperty('--heat',String(charge*.17));overlay.style.setProperty('--iris',String(charge));overlay.style.setProperty('--title',ready?'1':'0');
   title.textContent='EXPLOSION';status.textContent=ready?'離して、衝撃を解き放て':'LIMIT BREAK // '+Math.round(charge*100)+'%';result.textContent='24 CELLS / NOVA IMPACT';
  }
 }
 function reset(){visuals.reset();stop();phase='idle';charge=0;kills=0;paint();}
 return {
  start(at,{low:reduced=false,eliminated=0}={}){kills=eliminated;charge=0;low=reduced;center.copy(at);visuals.start(at,{low});phase='cast';boom();paint();},
  setKills(value){kills=Math.max(0,Math.floor(value));paint();},
  update(dt,{playing=true,charge:value=0,low:reduced=false,origin=null}={}){
   if(!playing)return;if(!soundEnabled())stop();low=reduced;charge=visuals.active?0:clamp(value,0,1);visuals.update(dt,{charge,low,origin});
   if(!visuals.active){if(phase==='cast'){phase='idle';stop();}chargingAudio(charge);}paint();
  },
  applyCamera(camera){if(!visuals.active)return;const a=visuals.age,shake=reducedMotion?0:Math.exp(-a*2.3)*.022,dip=Math.sin(clamp((a-1.4)/1.9,0,1)*Math.PI)*.24;camera.position.y-=dip;camera.rotation.z+=Math.sin(a*48)*shake;camera.rotation.x+=Math.sin(a*59)*shake*.5;if(!reducedMotion)camera.fov+=Math.sin(Math.min(1,a/.7)*Math.PI)*8;camera.updateProjectionMatrix();},
  pause(){stop();},reset,
  get active(){return visuals.active;},get age(){return visuals.age;},get kills(){return kills;},get duration(){return visuals.duration;},get metrics(){return visuals.metrics;}
 };
}
