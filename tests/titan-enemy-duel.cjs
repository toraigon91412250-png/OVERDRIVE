// Real imported limb geometry and encounter simulation. The renderer is omitted:
// these checks establish contact/timing rules, not browser animation appearance.
const assert=require('node:assert/strict'),vm=require('node:vm'),esbuild=require('esbuild'),THREE=require('three');
global.self=global;global.createImageBitmap=async()=>({width:16,height:16,close(){}});
global.document={createElement:()=>({width:256,height:256,getContext:()=>new Proxy({measureText:()=>({width:50})},{get:(o,k)=>o[k]||(()=>{})})})};
const bundle=esbuild.buildSync({entryPoints:['src/titan/models.js'],bundle:true,platform:'node',format:'cjs',write:false});
const m={exports:{}};vm.runInThisContext('(function(module,exports,require){'+bundle.outputFiles[0].text+'})')(m,m.exports,require);
async function fixture(type){
 const scene=new THREE.Scene(),V={root:new THREE.Group(),slamRing:new THREE.Mesh(),alive:true};scene.add(V.root,V.slamRing);
 const P={pos:new THREE.Vector3(0,12.8,7),vel:new THREE.Vector3(),titanForm:true,health:3,thunderAmmo:4};
 const hits=[],warnings=[];let displacement=type==='jaw',clearSight=true;
 const api=m.exports.create({scene,V,P,targets:[],anchors:[],hooks:[],missiles:[],skipEquipment:true,spawn:[0,0,0],hud(){},notice:message=>warnings.push(message),loading(){},targetChanged(){},
  hurt:(label,source,amount,kind)=>hits.push({label,source:source.clone(),amount,kind,attackNumber:api.inspect().encounter.number}),
  canReach:()=>clearSight,moveEnemy:()=>false,displaceEnemy:(position,proposal)=>{if(!displacement)return false;position.copy(proposal);return true;}});
 await api.select(type);
 function run(seconds,onFrame=()=>{}){for(let i=0;i<Math.ceil(seconds/.016);i++){api.update(.016);onFrame(api.inspect());}}
 return {api,V,P,hits,warnings,run,blockMotion:()=>displacement=false,blockSight:()=>clearSight=false};
}
(async()=>{
 for(const type of ['attack','armored']){
  const f=await fixture(type),attacks=new Set(),heights=[];
  f.run(6,state=>{if(state.encounter.attack)attacks.add(state.encounter.attack);if(state.encounter.phase==='active'){const hand=state.hands[state.encounter.number%2];if(hand)heights.push(hand[1]);}});
  assert.deepEqual([...attacks],['punch'],type+': giant opponent selects an upper-body punch, not a ground stomp');
  assert(f.hits.length>0,type+': visible fist movement actually contacts the giant body');
  assert(f.hits.every(h=>h.kind==='punch'),type+': guard receives the melee attack kind');
  assert(Math.min(...heights)>9&&Math.max(...heights)<14,type+': the attacking fist travels at chest/face height');
  assert.equal(new Set(f.hits.map(h=>h.attackNumber)).size,f.hits.length,type+': each attack deals at most one hit');
  if(type==='armored')assert(f.hits[0].amount>1,'The armored heavy strike has additional weight');
  f.api.reset();f.hits.length=0;f.blockSight();f.run(6);assert.equal(f.hits.length,0,'World cover blocks an upper-body punch');
 }
 console.log('PASS normal/armored chest-height punches, actual contact, one hit per attack, heavy strike and cover');
 const jaw=await fixture('jaw'),jawAttacks=new Set();jaw.run(7,state=>{if(state.encounter.attack)jawAttacks.add(state.encounter.attack);});
 assert(jawAttacks.has('lunge'),'Jaw selects a telegraphed lunge against a giant');assert(jaw.V.root.position.z>2,'The jaw physically advances during its lunge');
 assert(jaw.hits.some(h=>h.kind==='bite'),'Its moving mouth contacts the giant body and uses a blockable bite kind');
 const blockedJaw=await fixture('jaw');blockedJaw.blockMotion();blockedJaw.run(7);assert.equal(blockedJaw.V.root.position.z,0,'A blocked displacement cannot cross the wall');assert.equal(blockedJaw.hits.length,0,'A wall-stopped jaw cannot hit from its old position');
 console.log('PASS jaw physical lunge/mouth contact and wall-blocked miss');
 const colossal=await fixture('colossal');colossal.run(8);assert(colossal.hits.some(h=>h.kind==='steam'),'Colossal retains its warned, unguardable steam attack');assert(colossal.warnings.some(x=>/蒸気/.test(x)),'Steam announces its area danger');
 console.log('PASS colossal steam warning and correct area attack kind');
 const duel=await fixture('attack'),direction=new THREE.Vector3(0,0,-1);duel.run(.032);duel.api.punchReact(direction);
 assert(duel.api.inspect().stagger>0,'The first clean punch briefly staggers');assert(duel.api.inspect().stunResistance>0,'The stagger starts a resistance interval');
 duel.run(.35);assert.equal(duel.api.inspect().stagger,0);const resistance=duel.api.inspect().stunResistance;duel.api.punchReact(direction);
 assert.equal(duel.api.inspect().stagger,0,'An ordinary repeated punch does not restart stagger during resistance');assert.equal(duel.api.inspect().stunResistance,resistance,'A resisted punch does not refresh immunity');
 duel.api.punchReact(direction,{counter:true});assert(duel.api.inspect().stagger>.3,'An earned counter still breaks posture during resistance');assert.equal(duel.api.inspect().encounter.phase,'recovery','Inspect immediately exposes the real stagger state');
 duel.api.reset();assert.equal(duel.api.inspect().stunResistance,0,'Reset clears stun resistance');assert.equal(duel.api.inspect().stagger,0,'Reset clears stagger');
 let nextPunch=.3,activeFrames=0;for(let t=0;t<9;t+=.016){if(t>=nextPunch){duel.api.punchReact(direction);nextPunch+=.76;}duel.api.update(.016);if(duel.api.inspect().encounter.phase==='active')activeFrames++;}
 assert(activeFrames>0,'Continuous player punch timing still allows an enemy active attack');assert(duel.hits.length>0,'The enemy can physically retaliate through ordinary punch spam');
 console.log('PASS repeat-stagger resistance, counter exception, reset and enemy retaliation during punch spam');
})().catch(error=>{console.error(error);process.exitCode=1});
