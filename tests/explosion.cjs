// Real game logic/input with Three.js math; no GPU rendering or browser/Safari claims.
const assert=require('node:assert/strict');
const loadGame=require('./headless-runtime.cjs');
const path=require('node:path'),Module=require('node:module'),T=require('three'),{buildSync}=require('esbuild');
const modelFile=path.resolve(__dirname,'../src/explosion-visuals.js'),modelModule=new Module(modelFile,module);modelModule.paths=module.paths;
modelModule._compile(buildSync({entryPoints:[modelFile],bundle:true,external:['three'],format:'cjs',write:false}).outputFiles[0].text,modelFile);
const scene=new T.Scene(),visuals=modelModule.exports.createExplosionVisuals(scene);
let drawableCount=0;const geometries=new Set(),materials=new Set();scene.traverse(o=>{if(o.isMesh||o.isPoints||o.isLine){drawableCount++;geometries.add(o.geometry);materials.add(o.material);}});
assert(drawableCount<=32&&scene.children.length===2,'The spectacle stays bounded');
for(const low of [false,true])for(let run=0;run<3;run++){
 visuals.start(new T.Vector3(0,1,-12),{low});assert(visuals.active);assert.equal(visuals.age,0);
 for(let frame=0;frame<240;frame++){
  visuals.update(.016,{low});
  scene.traverse(o=>{assert([...o.position.toArray(),...o.scale.toArray(),...o.rotation.toArray().slice(0,3)].every(Number.isFinite));if(o.geometry){assert(geometries.has(o.geometry));assert(materials.has(o.material));const positions=o.geometry.attributes.position;assert(Array.from(positions.array).every(Number.isFinite));}});
 }
 assert.equal(visuals.active,false);assert.equal(visuals.metrics.particles,low?112:256);assert.equal(scene.children.length,2,'Repeated casts reuse scene objects');
 visuals.update(.016,{charge:1,origin:new T.Vector3(0,1,-1),low});assert(scene.children[1].visible);
 visuals.reset();assert.equal(visuals.active,false);assert(scene.children.every(o=>!o.visible),'Reset hides cast and charge effects');
}


function begin(options={}){
 const g=loadGame(options);g.start();
 if(options.difficulty==='easy')g.element('tutorial-skip').dispatch('click');
 g.api.test.holdSpawns();
 return g;
}

for(const mobile of [false,true])for(const difficulty of ['normal','easy']){
 const g=begin({mobile,difficulty}),t=g.api.test;
 t.weapon(3);t.set({ammo:[50,10,6,24],inv:999});
 // Aim into a local pack. A wall protects one nearby target; remote enemies and the wave reserve must survive.
 const direct=t.spawn('chaser',0,-7),near=t.spawn('chaser',3,-7),survivor=t.spawn('charger',5,-8),covered=t.spawn('shooter',-13,-7),remote=t.spawn('charger',-28,-28),boss=t.spawn('boss',4,-9);
 survivor.hp=survivor.max=10000;const oldSurvivor=survivor.mesh.position.clone();
 const before=g.api.snapshot(),queueBefore=before.queue;
 t.gainXP(35); // Ready to open a reward: it must wait for the spectacle.
 t.aim(0,1,-7);t.firePhase({ammo:24,kind:'explosion'});
 const fired=g.api.snapshot();
 assert.equal(fired.ultimateActive,true,'Finisher starts its presentation');
 assert.equal(fired.ammo[3],0,'Exactly twenty-four cells are spent');
 assert.equal(fired.explosionShots,1);
 assert.equal(fired.queue,queueBefore,'Unspawned enemies remain in the wave');
 assert(direct.hp<0,'The aimed target receives the amplified lance');
 assert(near.hp<0,'Nearby enemies take damaging shockwave splash');
 assert(survivor.hp>0&&survivor.hp<survivor.max,'Tough survivors take meaningful but nonlethal shockwave damage');
 assert(survivor.mesh.position.distanceTo(oldSurvivor)>2&&survivor.stun>0,'Shockwave pushes back and stuns surviving chargers');
 assert(covered.hp>0,'Solid cover blocks shockwave damage');
 assert(remote.hp>0,'Enemies outside the 16 m impact radius survive');
 assert(boss.hp<boss.max&&boss.hp>boss.max-250,'Boss takes a restrained share of the shockwave damage');
 assert.equal(fired.ultimateKills,2,'The cinematic reports only actual kills');
 assert.equal(fired.activeEnemies,4,'Living targets remain after the impact');
 assert.equal(fired.state,'playing','No reward obscures the finisher');
 assert(fired.score>before.score&&fired.kills===2,'Kills still award score normally');
 t.firePhase({ammo:24,kind:'explosion'});
 assert.equal(g.api.snapshot().explosionShots,1,'A repeated call cannot duplicate the shot');
 const hp=fired.hp;t.set({inv:0});t.rawHurt(9999);assert.equal(g.api.snapshot().hp,hp,'Caster is protected during cinematic');
 g.step(.6);assert.equal(g.api.snapshot().state,'playing');assert(g.api.snapshot().ultimateAge>.4);
 g.element('pause').onclick();const paused=g.api.snapshot();
 g.step(1);assert.equal(g.api.snapshot().ultimateAge,paused.ultimateAge,'Pause freezes cinematic age');
 assert.equal(g.api.snapshot().state,'paused');
 g.element('resume').onclick();g.step(.4);
 assert(g.api.snapshot().ultimateAge>paused.ultimateAge,'Resume continues the same presentation');
 assert.equal(g.api.snapshot().state,'playing');
 g.step(4.5);assert.equal(g.api.snapshot().ultimateActive,false);
 assert.equal(g.api.snapshot().state,'upgrade','Deferred XP/wave rewards remain reachable');
 g.element('restart').onclick();if(difficulty==='easy')g.element('tutorial-skip').dispatch('click');
 const fresh=g.api.snapshot();assert.equal(fresh.ultimateActive,false);assert.equal(fresh.ultimateKills,0);assert.equal(fresh.explosionShots,0);assert.equal(fresh.ammo[3],12);
}

// A real held mouse/touch gesture arms and releases a 24-cell finisher.
for(const mobile of [false,true]){
 const g=begin({mobile}),t=g.api.test;t.weapon(3);t.set({ammo:[50,10,6,24],inv:999});g.step(.03);
 if(mobile)g.element('fire').dispatch('pointerdown');else g.element('game').dispatch('mousedown');
 g.step(2.95);assert.equal(g.api.snapshot().ultimateActive,false,'Manual charge waits for release');
 assert.equal(g.api.snapshot().ammo[3],24,'Charging does not spend ammunition early');
 if(mobile)g.element('fire').dispatch('pointerup');else g.dispatchWindow('mouseup');
 g.step(.032);assert.equal(g.api.snapshot().ultimateActive,true);assert.equal(g.api.snapshot().explosionShots,1);
 g.element('restart').onclick();assert.equal(g.api.snapshot().ultimateActive,false,'Restart can interrupt cinematic without leftovers');
}

// Accessible R/touch charge fires the same ultimate once, and home clears it.
for(const mobile of [false,true]){
 const g=begin({mobile}),t=g.api.test;t.weapon(3);t.set({ammo:[50,10,6,24],inv:999});g.step(.03);
 if(mobile)g.element('reload').dispatch('pointerdown');else g.key('KeyR');
 g.step(3.05);assert.equal(g.api.snapshot().explosionShots,1);assert.equal(g.api.snapshot().ammo[3],0);assert.equal(g.api.snapshot().ultimateActive,true);
 g.element('pause').onclick();g.element('home').onclick();
 assert.equal(g.api.snapshot().state,'menu');assert.equal(g.api.snapshot().ultimateActive,false,'Home clears cinematic/overlay state');
 g.start();assert.equal(g.api.snapshot().ultimateActive,false);assert.equal(g.api.snapshot().explosionShots,0);
}

// Both campaign difficulties enter the same boss rush; easy receives its softer tuning.
// EXPLOSION must not end either run early.
;(async()=>{for(const difficulty of ['normal','easy']){
 const g=begin({difficulty});await g.api.bossAssetsReady();const t=g.api.test;t.advance();t.weapon(3);t.set({ammo:[50,10,6,24],inv:999});
 t.holdSpawns();
 assert.equal(g.api.snapshot().wave,6);
 const before=g.api.snapshot(),queueBefore=before.queue;
 if(difficulty==='normal'){
  assert.equal(before.bossRush.active,true,'Standard sector six starts the boss rush');
  assert.equal(before.bossRush.round,1);
  assert.equal(before.queue,0);
 }else{assert.equal(before.bossRush.active,true,'Easy sector six enters the same boss rush');assert.equal(before.bossRush.easy,true);assert.equal(before.queue,0);}
 t.firePhase({ammo:24,kind:'explosion'});
 const fired=g.api.snapshot();
 assert.equal(fired.ultimateActive,true);assert.equal(fired.explosionShots,1);
 assert.equal(fired.queue,0,'Boss-rush encounter has no stale campaign reserve');
 assert.equal(fired.bossRush.active,true);assert.equal(fired.bossRush.wins,0);
 assert(fired.activeEnemies>0,'The boss rush remains a live encounter after the blast');
 g.step(1);assert.equal(g.api.snapshot().state,'playing','The spectacle does not skip the encounter');
 g.step(5);assert.equal(g.api.snapshot().state,'playing','The surviving reserve / boss encounter prevents an automatic victory');
 assert.equal(g.api.snapshot().bossRush.wins,0);
}
console.log('PASS: EXPLOSION focused lance and 16 m cover-aware shockwave, distance/cover survivors, restrained boss damage, standard/easy boss rushes, exact ammo, score/XP, protected cinematic, deferred rewards, pause/resume/reset, manual PC/touch charge.');})().catch(error=>{console.error(error);process.exitCode=1});
