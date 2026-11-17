// Each weapon evolves through three card picks: a core, one exclusive route,
// and an apex. Tier zero is deliberately identical to the shipped weapon.
const definitions={
 1:{prefix:'breach',name:'BREACH',base:'BREACH',routes:['vortex','burst'],
  mag:[10,14,18,24],rate:[.7,.6,.5,.38],reload:[1.65,1.4,1.15,.9],power:[1,1.65,2.4,3.6],
  colors:[0xffcb79,0xffd99b],labels:{vortex:['VORTEX / 渦流型','CYCLONE / サイクロン'],burst:['BURST / 破砕型','CALDERA / カルデラ']}},
 2:{prefix:'rail',name:'RAILGUN',base:'RAILGUN',routes:['prism','siege'],
  mag:[6,8,10,14],rate:[.95,.8,.66,.48],reload:[1.9,1.55,1.3,1],power:[1,1.65,2.4,3.5],
  colors:[0xa4d8ff,0xffc18a],labels:{prism:['PRISM / 屈折型','CHROMA / クロマ'],siege:['SIEGE / 攻城型','OBELISK / オベリスク']}},
 3:{prefix:'astra',name:'ASTRA',base:'ASTRA × VANTA',routes:['nova','reactor'],
  mag:[24,24,24,24],rate:[.16,.16,.16,.16],reload:[0,0,0,0],power:[1,1.3,1.6,2],
  colors:[0xd2b0ff,0x91fff1],labels:{nova:['NOVA / 星震型','SUPERNOVA / スーパーノヴァ'],reactor:['REACTOR / 循環型','INFINITY / インフィニティ']}},
 4:{prefix:'lance',name:'PHANTOM LANCE',base:'PHANTOM LANCE',routes:['echo','deadeye'],
  mag:[1,1,1,1],rate:[.65,.6,.55,.5],reload:[2.4,1.8,1.5,1.15],power:[1,1.8,2.6,4.2],
  colors:[0x92f5ff,0xffd79d],labels:{echo:['ECHO / 反響型','REQUIEM / レクイエム'],deadeye:['DEADEYE / 精密型','SINGULARITY / シンギュラリティ']}},
 5:{prefix:'seeker',name:'SEEKER',base:'SEEKER',routes:['swarm','hunter'],
  mag:[6,9,12,15],rate:[.82,.7,.6,.48],reload:[1.9,1.6,1.3,1.05],power:[1,1.55,2.2,3.2],
  colors:[0x92ffdc,0xffb784],labels:{swarm:['SWARM / 群体型','HORNET / ホーネット'],hunter:['HUNTER / 追撃型','PREDATOR / プレデター']}}
};

const cardWeapons=new Map();
for(const [weapon,d] of Object.entries(definitions))for(const part of ['core',...d.routes,'apex'])cardWeapons.set(`${d.prefix}_${part}`,Number(weapon));

export function arsenalBuild(weapon,up={}){
 const d=definitions[weapon];if(!d)return null;up=up||{};
 const core=!!up[`${d.prefix}_core`];
 const path=core?d.routes.find(route=>up[`${d.prefix}_${route}`])||null:null;
 const tier=core?(path?(up[`${d.prefix}_apex`]?3:2):1):0;
 const b={weapon:Number(weapon),tier,path,mag:d.mag[tier],rate:d.rate[tier],reload:d.reload[tier],power:d.power[tier],
  color:d.colors[path===d.routes[1]?1:0],label:path?d.labels[path][tier===3?1:0]:tier===1?'AMPLIFIED / 増幅':d.base};
 if(Number(weapon)===1)Object.assign(b,{
  pellets:[8,10,12,14][tier],spread:path==='vortex'?(tier===3?.28:.23):path==='burst'?(tier===3?.065:.09):.16,
  shockRadius:path==='vortex'?(tier===3?7:5):0,shockPower:path==='vortex'?(tier===3?.55:.35):0,
  knockback:[3,4,6,8][tier],blastRadius:path==='burst'?(tier===3?5:3.5):0,blastPower:path==='burst'?(tier===3?1:.65):0
 });
 if(Number(weapon)===2)Object.assign(b,{
  prismTargets:path==='prism'?(tier===3?4:2):0,prismRange:path==='prism'?(tier===3?24:18):0,
  prismPower:path==='prism'?(tier===3?.9:.65):0,siegeMultiplier:path==='siege'?(tier===3?1.8:1.35):1
 });
 if(Number(weapon)===3)Object.assign(b,{
  phaseChargeScale:[1,.88,.78,.65][tier],phaseRefill:path==='reactor'?(tier===3?18:16):12,
  novaMultiplier:path==='nova'?(tier===3?1.65:1.25):1,explosionMultiplier:[1,1.1,1.2,1.3][tier]
 });
 if(Number(weapon)===4)Object.assign(b,{
  echoTargets:path==='echo'?(tier===3?4:2):0,echoRange:path==='echo'?(tier===3?30:20):0,
  echoPower:path==='echo'?(tier===3?1.1:.7):0,weakpointMultiplier:path==='deadeye'?(tier===3?1.9:1.4):1
 });
 if(Number(weapon)===5)Object.assign(b,{
  lockTime:[.22,.19,.15,.11][tier],missileSpeed:[28,30,33,36][tier],
  splashRadius:path==='swarm'?(tier===3?6:4):0,splashPower:path==='swarm'?(tier===3?1:.6):0,
  hunterMultiplier:path==='hunter'?(tier===3?1.8:1.4):1
 });
 return b;
}

const descriptions={
 breach:{
  core:['散弾砲・圧縮コア','散弾威力×1.65・14発。散弾10粒、連射と装填を加速。次に渦流型か破砕型へ進化。'],
  vortex:['渦流型へ進化','散弾威力×2.4・18発。散弾12粒を広く拡散。半径5mの衝撃波で群れを押し返す。'],
  burst:['破砕型へ進化','散弾威力×2.4・18発。12粒を狭く集め、命中地点に半径3.5mの破砕爆発。'],
  apex_vortex:['最終進化・サイクロン','散弾威力×3.6・24発・散弾14粒。半径7mの衝撃波と強烈な吹き飛ばしで近距離を制圧。'],
  apex_burst:['最終進化・カルデラ','散弾威力×3.6・24発・散弾14粒。集束した命中地点から半径5mへ破砕爆発を広げる。']
 },
 rail:{
  core:['レールガン・加速コア','威力×1.65・8発。射撃間隔0.8秒、装填1.55秒。次に屈折型か攻城型へ進化。'],
  prism:['屈折型へ進化','威力×2.4・10発。65%威力の屈折光線が最大2体へ連鎖。連鎖1回の距離18m。'],
  siege:['攻城型へ進化','基礎威力×2.4・10発。貫通光線をさらに×1.35へ増幅し、一列の強敵を撃ち抜く。'],
  apex_prism:['最終進化・クロマ','威力×3.5・14発。90%威力の屈折光線が最大4体へ連鎖。連鎖1回24m、射撃間隔0.48秒。'],
  apex_siege:['最終進化・オベリスク','基礎威力×3.5・14発。貫通砲の追加倍率×1.8、射撃間隔0.48秒。直線上の敵を殲滅。']
 },
 astra:{
  core:['チャージ砲・位相コア','通常弾とNOVAの威力×1.3、チャージ時間12%短縮。EXPLOSIONは合計威力×1.43、24発を全消費。'],
  nova:['星震型へ進化','通常弾とNOVAの基礎威力×1.6。NOVAはさらに×1.25、チャージ時間22%短縮。EXPLOSIONは合計威力×2.4、24発を全消費。'],
  reactor:['循環型へ進化','通常弾とNOVAの威力×1.6。移動ゲージで16発補充、チャージ時間22%短縮。EXPLOSIONは合計威力×1.92、24発を全消費。'],
  apex_nova:['最終進化・スーパーノヴァ','通常弾とNOVAの基礎威力×2。NOVAはさらに×1.65、チャージ時間35%短縮。EXPLOSIONは合計威力×4.29、24発を全消費。'],
  apex_reactor:['最終進化・インフィニティ','通常弾とNOVAの威力×2。移動ゲージで18発補充、チャージ時間35%短縮。EXPLOSIONは合計威力×2.6、24発を全消費。']
 },
 lance:{
  core:['狙撃銃・精密コア','威力×1.8、装填2.4秒→1.8秒。装弾1発のまま、一撃を研ぎ澄ます。次に反響型か精密型へ進化。'],
  echo:['反響型へ進化','威力×2.6、装填1.5秒。撃破で70%威力の反響弾が最大2体へ連鎖。連鎖1回20m。'],
  deadeye:['精密型へ進化','基礎威力×2.6、装填1.5秒。上部コアへの命中をさらに×1.4へ増幅。強敵の弱点を狙い撃つ。'],
  apex_echo:['最終進化・レクイエム','威力×4.2、装填1.15秒。撃破で110%威力の反響弾が最大4体へ連鎖。連鎖1回30m。'],
  apex_deadeye:['最終進化・シンギュラリティ','基礎威力×4.2、装填1.15秒。上部コア命中に追加倍率×1.9。一発装填の究極精密砲。']
 },
 seeker:{
  core:['ミサイル・誘導コア','威力×1.55・9発。ロック時間0.19秒、装填1.6秒。次に群体型か追撃型へ進化。'],
  swarm:['群体型へ進化','威力×2.2・12発。命中時に半径4mへ60%威力の爆風。ロック時間0.15秒。'],
  hunter:['追撃型へ進化','基礎威力×2.2・12発。対ボス直撃威力をさらに×1.4へ増幅。ロック時間0.15秒。'],
  apex_swarm:['最終進化・ホーネット','威力×3.2・15発。半径6mへ100%威力の爆風。ロック時間0.11秒、装填1.05秒。'],
  apex_hunter:['最終進化・プレデター','基礎威力×3.2・15発。対ボス直撃に追加倍率×1.8。ロック時間0.11秒、装填1.05秒。']
 }
};

export function arsenalCards(weapon,up={}){
 const d=definitions[weapon],b=arsenalBuild(weapon,up);if(!d||!b||b.tier===3)return [];
 const parts=b.tier===0?['core']:b.tier===1?d.routes:['apex'];
 return parts.map(part=>{
  const description=descriptions[d.prefix][part==='apex'?`apex_${b.path}`:part];
  const stage=b.tier+1,english=part==='apex'?d.labels[b.path][1].split(' / ')[0]:part.toUpperCase();
  return [`${d.prefix}_${part}`,`${d.name} / ${english} ${['','I','II','III'][stage]}`,...description];
 });
}
export function arsenalCardWeapon(id){return cardWeapons.get(id)??null;}
export function isArsenalCard(id){return cardWeapons.has(id);}
export function canInstallArsenal(up,id){const weapon=arsenalCardWeapon(id);return weapon!==null&&arsenalCards(weapon,up).some(card=>card[0]===id);}
