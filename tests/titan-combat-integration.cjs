// Full source game with real imported geometry and a stub renderer. Exercises
// mouse routing, defensive HUD, actual-rig reach hints, camera and a real counter.
const assert=require('node:assert/strict'),vm=require('node:vm'),esbuild=require('esbuild');
global.self=global;global.createImageBitmap=async()=>({width:16,height:16,close(){}});
global.document={createElement:()=>({width:256,height:256,getContext:()=>new Proxy({measureText:()=>({width:50}),createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>o[k]||(()=>{})})})};
const built=esbuild.buildSync({entryPoints:['src/titan/index.js'],bundle:true,platform:'node',format:'cjs',write:false}),m={exports:{}};
vm.runInThisContext('(function(module,exports,require){'+built.outputFiles[0].text+'})')(m,m.exports,require);
const {load}=require('./odm-runtime.cjs');
(async()=>{
 const g=load(false,{RaidModels:m.exports});for(let i=0;i<200&&!g.api.getModels()?.ready;i++)await new Promise(r=>setImmediate(r));
 g.element('#changeLoadout').onclick();await g.api.selectTitan('attack');g.api.beginMission();
 const key=code=>{g.dispatch('keydown',{code});g.dispatch('keyup',{code});},down=()=>g.element('canvas').dispatch('mousedown',{button:2}),up=()=>g.dispatch('mouseup',{button:2});
 function transform(){g.api.setPlayer([400,1.78,420]);g.api.setAim(0,0);g.api.transform();g.step(3.3);assert.equal(g.api.getModels().hero.state,'titan');}
 transform();down();g.step(.016);assert(g.api.getModels().hero.guarding,'Right hold raises transformed guard');assert(g.api.getState().hooks.every(x=>x==='idle'),'Guard input does not launch ODM wires');assert.match(g.element('#guardRead').textContent,/ガード中/);up();g.step(.016);assert(!g.api.getModels().hero.guarding,'Mouse release lowers the guard');
 down();g.dispatch('blur');assert(!g.api.getModels().hero.guardHeld,'Focus loss clears held guard immediately');assert(g.api.getState().paused);g.element('#pauseHint').dispatch('click');g.step(.016);
 down();g.api.reset();g.step(.016);assert.equal(g.api.getModels().hero.guardHeld,false,'Mission reset clears held defense');assert.equal(g.api.getModels().hero.state,'human');
 // In human form the same held button keeps its wire behavior.
 g.api.setPlayer([0,10,50]);g.api.setAim(0,0);g.step(.02);down();assert(g.api.getState().hooks.every(x=>x==='firing'),'Human right hold still fires both wires');up();assert(g.api.getState().hooks.every(x=>x==='idle'),'Human right release still detaches both wires');
 g.api.reset();transform();const actor=g.scene().getObjectByName('titan-0');actor.position.set(400,0,400);g.api.setPlayer([400,12.8,406]);g.api.setAim(0,0);g.step(.016);
 assert(g.api.getCombatStatus().canPunch,'A target inside the actual fist sweep is advertised as reachable');assert.match(g.element('#midPrompt').textContent,/拳が届く/);
 g.api.setPlayer([400,12.8,430]);g.step(.016);assert.equal(g.api.getCombatStatus().canPunch,false,'A distant visible target is not advertised as reachable');
 g.api.setPlayer([400,12.8,406]);g.api.setAim(Math.PI,0);g.step(.016);assert.equal(g.api.getCombatStatus().canPunch,false,'A target behind the player cannot receive a forward punch hint');
 // Place a real, tall city house between player and enemy, within selection range.
 const wall=g.api.worldColliders().find(x=>x.hx>4&&x.hz>4&&x.top>17&&x.top<40&&x.bottom<=0&&Math.abs(x.x)<200&&Math.abs(x.z)<200);
 assert(wall,'A suitable visible house exists for the cover case');actor.position.set(wall.x,0,wall.z-wall.hz-3);g.api.setPlayer([wall.x,12.8,wall.z+wall.hz+3]);g.api.setAim(0,0);g.step(.032);assert.equal(g.api.getCombatStatus().canPunch,false,'A house blocks the fist hint');
 const view=g.api.camera();assert(view.position.every(Number.isFinite)&&Number.isFinite(view.fov),'Combat camera remains finite beside cover');assert(view.fov>=55&&view.fov<=83,'Combat camera uses a bounded field of view');assert(!(Math.abs(view.position[0]-wall.x)<wall.hx&&Math.abs(view.position[2]-wall.z)<wall.hz&&view.position[1]<wall.top),'The camera does not end up inside the blocking house');
 console.log('PASS transformed right-hold guard, release/blur/reset cleanup, human wire parity, real fist reach, cover and camera');
 // Wait for an actual imported enemy punch, then defend just after commitment.
 g.api.reset();transform();actor.position.set(400,0,400);g.api.setPlayer([400,12.8,406]);g.api.setAim(0,0);g.step(.016);
 let guarded=false,perfect=false;
 for(let i=0;i<700;i++){
  const enemy=g.api.getModels().encounter;
  if(!guarded&&enemy?.phase==='active'&&enemy.attack==='punch'&&enemy.progress>.08){down();guarded=true;}
  g.step(.016);
  if(g.api.getModels().hero.counterSeconds>0){perfect=true;break;}
 }
 assert(guarded,'The enemy actually commits to an upper-body punch');assert(perfect,'A timely right-click guard earns the counter against the real enemy hand');
 const defense=g.api.getModels().hero;assert.equal(defense.guardResult,'perfect');assert.equal(defense.health,100,'A timed block prevents body damage');assert(defense.guardStamina<100,'The real block spends guard stamina');
 up();key('KeyF');g.step(.8);assert.equal(g.api.getModels().enemies[0].hp,10,'The counter fist deals the intended 90 damage once');assert.equal(g.api.getState().lastPunchImpact?.counter,true,'The actual contact consumes the earned counter');assert.equal(g.api.getState().punchImpactCount,1,'The counter produces one physical impact event');assert.equal(g.element('#impactLabel').textContent,'','The counter does not add large screen text');assert.equal(Number(g.element('#impactLines').style.opacity||0),0,'The counter does not add a focus-line overlay');assert.equal(g.api.getModels().hero.counterSeconds,0,'The counter window is consumed');
 console.log('PASS real enemy upper-body punch, timely mouse guard, stamina cost and 90-damage counter contact');
 // A 15m player must be able to strike the actual 5m jaw model on the ground.
 // The same public punch input selects a low strike instead of swinging over it.
 g.element('#changeLoadout').onclick();await g.api.selectTitan('jaw');g.api.beginMission();transform();
 const jaw=g.scene().getObjectByName('titan-0');jaw.position.set(400,0,400);g.api.setPlayer([400,12.8,406]);g.api.setAim(0,0);g.step(.016);
 assert(g.api.getCombatStatus().canPunch,'The low-strike preview reaches a grounded jaw titan six meters ahead');
 key('KeyF');const lowTrace=[];for(let i=0;i<57;i++){g.step(.016);const h=g.api.getModels().hero;if(h.attack>.30&&h.attack<.62)lowTrace.push({attack:h.attack,low:h.lowStrike,fist:h.fist,player:g.api.getState().pos,enemy:g.api.getModels().enemies[0].position});}assert(g.api.getModels().enemies[0].hp<100,'A real low fist sweep damages the grounded jaw titan '+JSON.stringify(lowTrace));assert.equal(g.api.getModels().hero.hitCount,1,'The low strike hits a jaw only once');
 console.log('PASS ground-level jaw reach preview and actual low-strike fist contact');
 // Rules and core armor destruction must agree: a normal frontal punch chips
 // armor, while an earned counter breaks exactly one shoulder plate.
 g.element('#changeLoadout').onclick();await g.api.selectTitan('armored');g.api.beginMission();transform();
 const armored=g.scene().getObjectByName('titan-0');armored.position.set(400,0,400);g.api.setPlayer([400,12.8,406]);g.api.setAim(0,0);g.step(.016);key('KeyF');g.step(.8);
 let armoredState=g.api.getModels().enemies[0];assert.equal(armoredState.hp,92,'A frontal armored punch only deals eight chip damage');assert(armoredState.armor.every(Boolean),'A normal frontal punch cannot instantly remove shoulder armor');
 g.api.reset();transform();armored.position.set(400,0,400);g.api.setPlayer([400,12.8,406]);g.api.setAim(0,0);g.step(.016);
 let heavyGuard=false,heavyCounter=false;
 for(let i=0;i<800;i++){const encounter=g.api.getModels().encounter;if(!heavyGuard&&encounter?.phase==='active'&&encounter.attack==='punch'&&encounter.progress>.08){down();heavyGuard=true;}g.step(.016);if(g.api.getModels().hero.counterSeconds>0){heavyCounter=true;break;}}
 assert(heavyGuard&&heavyCounter,'A heavy armored blow can be timed and countered');up();key('KeyF');g.step(.8);armoredState=g.api.getModels().enemies[0];assert.equal(armoredState.armor.filter(Boolean).length,1,'A counter breaks exactly one armored shoulder');assert.equal(armoredState.hp,13,'Counter damage and one shoulder break apply exactly once');
 console.log('PASS armored frontal chip keeps both plates and an earned counter breaks exactly one');
})().catch(error=>{console.error(error);process.exitCode=1});
