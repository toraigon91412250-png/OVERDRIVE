// The five IDs are the complete, reproducible recipe. Only the first three
// affect combat: 5 x 5 x 5 builds, with 25 additional exterior assemblies.
export const OMEGA_FRAMES=Object.freeze([
 {id:'strider',name:'STRIDER',label:'ストライダー',recoil:.8},
 {id:'blade',name:'BLADE',label:'ブレード',recoil:.9},
 {id:'standard',name:'STANDARD',label:'スタンダード',recoil:1},
 {id:'bulwark',name:'BULWARK',label:'ブルワーク',recoil:1.1},
 {id:'anchor',name:'ANCHOR',label:'アンカー',recoil:1.2}
].map(Object.freeze));
export const OMEGA_CORES=Object.freeze([
 {id:'echo',name:'ECHO',label:'反響弾',damage:60,echoDamage:18,rate:.65,mag:12,reload:1.5,range:35,color:0x84eeff,nominalDamage:78,hint:'着弾位置に0.3秒後、18ダメージの反響。動く敵には先を読もう。'},
 {id:'tether',name:'TETHER',label:'拘束針',damage:84,rate:.62,mag:8,reload:1.5,range:28,color:0xffcb79,nominalDamage:84,hint:'命中した敵の移動を短く減速。1体ずつ動きを止めて撃ち切ろう。'},
 {id:'ricochet',name:'RICOCHET',label:'跳弾盤',damage:72,rate:.58,mag:10,reload:1.5,range:40,color:0xa8ffb9,nominalDamage:72,hint:'壁で一度だけ反射。反射後は威力65%。壁越しの角度を作ろう。'},
 {id:'gravity',name:'GRAVITY',label:'重力弾',damage:38,pulseDamage:18,rate:.8,mag:8,reload:1.4,range:32,color:0xd0a5ff,nominalDamage:92,hint:'直撃38＋重力波18×3。半径4m、最大3体。井戸は重ならない。'},
 {id:'boomerang',name:'BOOMERANG',label:'往復刃',damage:48,rate:.72,mag:9,reload:1.45,range:32,color:0xff9db7,nominalDamage:96,hint:'往路48＋復路48。通り道をそろえると強い。各経路で最大3体。'}
].map(Object.freeze));
export const OMEGA_FEEDS=Object.freeze([
 {id:'light',name:'LIGHT',label:'軽量弾倉',mag:.65,reload:.5},
 {id:'standard',name:'STANDARD',label:'標準弾倉',mag:1,reload:1},
 {id:'drum',name:'DRUM',label:'ドラム',mag:1.5,reload:1.35},
 {id:'quick',name:'QUICK',label:'クイック',mag:.85,reload:.8},
 {id:'capacitor',name:'CAPACITOR',label:'蓄電弾倉',mag:1.2,reload:1.15}
].map(Object.freeze));
export const OMEGA_SHROUDS=Object.freeze(['WEDGE','VENTED','COLLAR','FIN','SPLIT']);
export const OMEGA_HOUSINGS=Object.freeze(['LENS','COIL','BARS','ORBIT','PRISM']);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const part=v=>clamp(Number.isFinite(v)?Math.floor(v):0,0,4);
export function generateOmega(seed=1){
 let state=(Number(seed)>>>0)||1;
 const pick=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return Math.floor(state/4294967296*5);};
 return {frame:pick(),core:pick(),feed:pick(),shroud:pick(),housing:pick(),seed:Number(seed)>>>0};
}
export function omegaBuild(descriptor={},rank=0){
 const d={frame:part(descriptor.frame),core:part(descriptor.core),feed:part(descriptor.feed),shroud:part(descriptor.shroud),housing:part(descriptor.housing),seed:Number(descriptor.seed)>>>0};
 const c=OMEGA_CORES[d.core],f=OMEGA_FRAMES[d.frame],m=OMEGA_FEEDS[d.feed];
 rank=clamp(Number.isFinite(rank)?Math.floor(rank):0,0,3);
 const echoDelay=.3-.05*rank,tetherDuration=.6+.1*rank,bossTetherDuration=.3+.03*rank,bounceRetention=.65+.05*rank,gravityPull=.5+.1*rank,returnSpeed=44+6*rank;
 const mutation=[`反響まで${echoDelay.toFixed(2)}秒`, `拘束${tetherDuration.toFixed(1)}秒 / ボス${bossTetherDuration.toFixed(2)}秒`, `跳弾威力${Math.round(bounceRetention*100)}%`, `引き寄せ強度${gravityPull.toFixed(1)}`, `復路速度${returnSpeed}m/s`][d.core];
 return {...d,...c,coreId:c.id,coreName:c.name,name:`${f.name} / ${c.name}`,label:`${f.label}・${c.label}`,frameName:f.name,feedName:m.name,
  mag:clamp(Math.round(c.mag*m.mag),6,18),reload:clamp(c.reload*m.reload,.7,2.1),recoil:f.recoil,rank,power:1+.08*rank,
  echoDelay,tetherDuration,bossTetherDuration,bounceRetention,gravityPull,returnSpeed,mutation,
  recipe:`${d.frame}${d.core}${d.feed}${d.shroud}${d.housing}`};
}
