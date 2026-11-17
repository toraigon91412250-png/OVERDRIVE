// Model-independent rules. Model assets can be replaced without changing the encounter IDs.
export const BOSSES=[
 {id:'warden',name:'WARDEN',color:0xff875e,hp:1500,tip:'弾幕と衝撃波。露出したコアを狙え'},
 {id:'ram',name:'RAM',color:0xff4564,hp:1350,tip:'赤い突進予告を横へかわす'},
 {id:'siege',name:'SIEGE',color:0xffc354,hp:1450,tip:'足元の砲撃マーカーから離れる'},
 {id:'phoenix',name:'PHOENIX',color:0xffa64d,hp:1400,tip:'炎を溜める翼を見て横へ。滑空後の隙を撃て'},
 {id:'bulwark',name:'BULWARK',color:0x91adbe,hp:1700,tip:'正面装甲を避けて側面・背面へ回れ'},
 {id:'tempest',name:'TEMPEST',color:0xaa87ff,hp:1400,tip:'雷が集まる足元を離れ、落雷後に撃ち返せ'},
 {id:'gravity',name:'GRAVITY',color:0x7388ff,hp:1450,tip:'吸引と反発に逆らって位置を取れ'},
 {id:'leviathan',name:'LEVIATHAN',color:0x81d9ed,hp:1550,tip:'海流砲を横へ避け、尾の波を跳び越えろ。赤い覚醒後は広い射線に注意'},
 {id:'mirror',name:'MIRROR',color:0xf49ce6,hp:1400,tip:'構えている武器に応じて弾幕が変わる'},
 {id:'devourer',name:'DEVOURER',color:0xffd6e7,hp:1600,tip:'吸収弾をかわし、露出中に集中攻撃'}
];
// Durations also drive imported animation phases; damage is emitted at impact.
export const BOSS_ATTACKS=Object.freeze({
 warden:{windup:.9,active:.18,recovery:1.0,cooldown:1.5,kind:'fire'},
 ram:{windup:.95,active:.8,recovery:1.0,cooldown:1.8,kind:'charge'},
 siege:{windup:1.25,active:.18,recovery:1.5,cooldown:1.5,kind:'fire'},
 phoenix:{windup:1.1,active:.7,recovery:1.25,cooldown:1.4,kind:'flight'},
 bulwark:{windup:1.2,active:.22,recovery:1.4,cooldown:1.65,kind:'slam'},
 tempest:{windup:1.1,active:.2,recovery:1.3,cooldown:1.5,kind:'lightning'},
 gravity:{windup:1.0,active:.75,recovery:1.3,cooldown:1.5,kind:'pulse'},
 leviathan:{windup:1.15,active:.6,recovery:1.4,cooldown:1.7,kind:'waterblast'},
 mirror:{windup:.6,active:.15,recovery:.7,cooldown:1.0,kind:'fire'},
 devourer:{windup:1.35,active:.7,recovery:1.4,cooldown:1.65,kind:'breath'}
});
export const SCARS=[
 {id:'recoil',name:'反動駆動',text:'射撃のたびに後方へ跳ねる。銃を移動装置に変える。'},
 {id:'close',name:'至近距離の契約',text:'8m以内の敵へ与えるダメージ +65%。'},
 {id:'far',name:'遠雷の契約',text:'18m以上の敵へ与えるダメージ +65%。'},
 {id:'air',name:'空中要塞',text:'空中で与えるダメージ +65%。'},
 {id:'blood',name:'赤い共鳴',text:'体力40%以下で与えるダメージ +80%。'},
 {id:'slide',name:'滑走砲台',text:'スライド中のダメージ +90%。スライド時間 +0.5秒。'}
];
export const PENALTIES=[
 {health:1,speed:1,enemyHP:1,enemySpeed:1,damage:1},
 {health:.97,speed:.99,enemyHP:1.65,enemySpeed:1.02,damage:1.03},
 {health:.90,speed:.95,enemyHP:2.3,enemySpeed:1.08,damage:1.12},
 {health:.72,speed:.82,enemyHP:3.2,enemySpeed:1.18,damage:1.3},
 {health:.42,speed:.60,enemyHP:4.6,enemySpeed:1.35,damage:1.65},
 {health:.08,speed:.15,enemyHP:8,enemySpeed:1.8,damage:3}
];
export const EASY_PENALTIES=[
 {health:1,speed:1,enemyHP:1,enemySpeed:.78,damage:1},
 {health:.98,speed:.98,enemyHP:1.08,enemySpeed:.82,damage:1.03},
 {health:.95,speed:.96,enemyHP:1.2,enemySpeed:.86,damage:1.08},
 {health:.92,speed:.94,enemyHP:1.38,enemySpeed:.9,damage:1.15},
 {health:.88,speed:.91,enemyHP:1.62,enemySpeed:.95,damage:1.25},
 {health:.82,speed:.87,enemyHP:1.9,enemySpeed:1,damage:1.4}
];
export class BossRush{
 constructor(random=Math.random){this.random=random;this.reset();}
 reset(){this.active=false;this.phase='idle';this.round=0;this.wins=0;this.misses=0;this.remaining=30;this.deck=[];this.deckIndex=0;this.leviathanDefeated=false;this.cards={};this.current=null;this.layout=6;this.escorts=2;this.easy=false;}
 start(easy=false){this.reset();this.easy=!!easy;this.active=true;this.deck=BOSSES.map((_,i)=>i);for(let i=this.deck.length-1;i>0;i--){let j=Math.floor(this.random()*(i+1));[this.deck[i],this.deck[j]]=[this.deck[j],this.deck[i]];}return this.next();}
 next(){
  if(this.round>=this.deck.length)throw new Error('Boss deck exhausted');
  let index;
  // Leviathan is the fifth victory gate. Losses can delay it, but no other boss
  // can take its place once four victories have been earned.
  if(this.wins>=4&&!this.leviathanDefeated)index=BOSSES.findIndex(b=>b.id==='leviathan');
  else{while(this.deckIndex<this.deck.length){const candidate=this.deck[this.deckIndex++];if(BOSSES[candidate].id!=='leviathan'){index=candidate;break;}}}
  if(index===undefined)throw new Error('Boss deck exhausted before Leviathan gate');
  this.current=BOSSES[index];this.round++;this.remaining=30;this.phase='fight';return this.current;
 }
 tick(dt){if(this.phase==='fight')this.remaining=Math.max(0,this.remaining-dt);return this.remaining===0;}
 resolve(killed){if(this.phase!=='fight')return null;if(killed){this.wins++;if(this.current?.id==='leviathan')this.leviathanDefeated=true;}else this.misses++;this.phase=this.wins>=5&&this.leviathanDefeated?'won':this.misses>=5||this.round>=this.deck.length?'lost':killed?'rebuild':'card';return this.phase;}
 get penalty(){return (this.easy?EASY_PENALTIES:PENALTIES)[this.misses];}
 offers(){const pool=SCARS.filter(c=>(this.cards[c.id]||0)<2);for(let i=pool.length-1;i>0;i--){let j=Math.floor(this.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}return pool.slice(0,3);}
 install(id){if(this.phase!=='card'||!SCARS.some(c=>c.id===id)||(this.cards[id]||0)>=2)return false;this.cards[id]=(this.cards[id]||0)+1;this.phase='rebuild';return true;}
 multiplier({distance=0,air=false,slide=false,health=1}){const c=this.cards;return 1+(distance<=8?.65*(c.close||0):0)+(distance>=18?.65*(c.far||0):0)+(air?.65*(c.air||0):0)+(slide?.9*(c.slide||0):0)+(health<=.4?.8*(c.blood||0):0);}
 snapshot(){return {active:this.active,easy:this.easy,phase:this.phase,round:this.round,wins:this.wins,misses:this.misses,remaining:this.remaining,boss:this.current?.id,leviathanDefeated:this.leviathanDefeated,layout:this.layout,cards:{...this.cards},penalty:{...this.penalty}};}
}
