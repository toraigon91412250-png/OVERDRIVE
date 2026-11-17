// A run has one irreversible route. Three card picks complete it; no hidden rolls.
export function pulseBuild(up={}) {
 const path=up.pulse_arc?'arc':up.pulse_lance?'lance':null;
 const tier=path?(up.pulse_apex?3:2):up.pulse_core?1:0;
 return {tier,path,mag:[50,64,80,100][tier],rate:[.105,.085,.077,.064][tier],
  reload:[1.25,1.05,.95,.8][tier],power:[1,1.9,2.8,4.3][tier],
  start:[7,5.5,4.5,3][tier],end:[15,18,21,25][tier],tail:[12,16,20,25][tier],
  hitsNeeded:path==='lance'?(tier===3?4:6):0,
  color:path==='lance'?0xffc481:path==='arc'?0x8dfbf3:0x8affda,
  label:tier===3?(path==='arc'?'TEMPEST / テンペスト':'HELIX / ヘリックス'):tier===2?(path==='arc'?'ARC / 連鎖型':'LANCE / 貫通型'):tier===1?'AMPLIFIED / 増幅':'PULSE'};
}

const core=['pulse_core','PULSE / CORE I','パルス・コア増幅','威力 ×1.9・64発・連射と装填を加速。得意距離も拡張。次に連鎖型か貫通型へ進化。'];
const arc=['pulse_arc','PULSE / ARC II','連鎖型へ進化','威力 ×2.8・80発。命中で1体へ電弧、撃破なら最大3体へ連鎖。次は最終形態。'];
const lance=['pulse_lance','PULSE / LANCE II','貫通型へ進化','威力 ×2.8・80発。6命中で次弾が威力5倍の貫通砲。遮蔽物の手前まで全ての敵を貫く。'];
export function pulseCards(up={}) {
 const b=pulseBuild(up);
 if(!b.tier)return [core];
 if(b.tier===1)return [arc,lance];
 if(b.tier===2)return [[ 'pulse_apex',b.path==='arc'?'PULSE / TEMPEST III':'PULSE / HELIX III',
  b.path==='arc'?'最終進化・テンペスト':'最終進化・ヘリックス',
  b.path==='arc'?'威力 ×4.3・100発・連射加速。毎命中3体、撃破時は最大5体へ140%の雷撃。分岐導電機構へ完全変形。':'威力 ×4.3・100発・連射加速。4命中で次弾が威力8倍の大型貫通砲。加速器が展開する最終形態。' ]];
 return [];
}
export function isPulseCard(id){return ['pulse_core','pulse_arc','pulse_lance','pulse_apex'].includes(id);}
export function canInstallPulse(up,id){return pulseCards(up).some(c=>c[0]===id);}

export class PulseResonance {
 constructor(){this.reset();}
 reset(){this.hits=0;this.flash=0;this.shots=0;this.cannons=0;this.arcs=0;this.key='';}
 sync(build){const key=build.tier+':'+build.path;if(this.key!==key){this.hits=0;this.flash=0;this.key=key;}}
 fire(build){this.sync(build);this.shots++;const charged=build.path==='lance'&&this.hits>=build.hitsNeeded;if(charged){this.hits=0;this.cannons++;this.flash=1;}return charged;}
 hit(build){if(build.path==='lance')this.hits=Math.min(build.hitsNeeded,this.hits+1);}
 update(dt){this.flash=Math.max(0,this.flash-dt*3.5);}
 progress(build){return build.hitsNeeded?Math.min(1,this.hits/build.hitsNeeded):0;}
 snapshot(build){return {tier:build.tier,path:build.path,hits:this.hits,needed:build.hitsNeeded,ready:!!build.hitsNeeded&&this.hits>=build.hitsNeeded,shots:this.shots,cannons:this.cannons,arcs:this.arcs};}
}
