// Real embedded actors and the actual campaign loop, with a stub renderer.
const assert=require('node:assert/strict'),THREE=require('three'),load=require('./headless-runtime.cjs');
const ids=Object.keys(require('../assets/bosses/models.json'));
(async()=>{
 const g=load({seed:123});g.start();assert.equal(g.api.snapshot().state,'playing','Ordinary campaign starts immediately');
 await g.api.bossAssetsReady();
 for(const id of ids){
  g.api.test.rushStart(id);g.api.test.set({inv:9999,hp:100});g.step(.032);
  const boss=g.api.test.rushBoss();assert.equal(boss.rushId,id);assert(boss.bossVisual&&boss.hitTargets.length>20,'Actual supplied model is combat target: '+id);
  assert.equal(g.api.snapshot().world.bossArena,id,'Arena follows the selected model: '+id);
  const surface=g.api.test.stageHeight(boss.mesh.position.x,boss.mesh.position.z)||0;
  assert(boss.mesh.position.y>=surface+.9,'Body root remains above its own arena floor: '+id);
  const core=boss.core.getWorldPosition(new THREE.Vector3());assert(core.y>surface+.5,'Physical weakpoint remains above the floor: '+id);
  g.step(7);assert.equal(g.api.snapshot().state,'playing');assert(boss.phase>0,'Each boss really enters an attack: '+id);assert(boss.mesh.position.toArray().every(Number.isFinite));
  boss.mesh.updateWorldMatrix(true,true);for(const mesh of boss.hitTargets)assert(mesh.matrixWorld.elements.every(Number.isFinite),'Finite imported animation '+id);
  assert(boss.mesh.userData.animation,'Authored animation is selected: '+id);
 }
 // A committed physical dash cannot silently track a sideways dodge.
 g.api.test.rushStart('ram');const ram=g.api.test.rushBoss(),z=ram.mesh.position.z;g.api.test.set({x:ram.mesh.position.x,y:0,z:z+9,inv:0,hp:100});ram.cd=0;g.api.test.update(.016);
 const direction=ram.dir.clone();g.api.test.set({x:ram.mesh.position.x+11,z:z+9});g.step(.65);assert.equal(g.api.snapshot().hp,100,'Windup does no invisible damage');g.step(1);assert(ram.dir.distanceTo(direction)<.001,'Dash keeps its committed direction');assert.equal(g.api.snapshot().hp,100,'Sideways dodge escapes the visible dash');
 // Repeated contact during one committed dash cannot deal multiple hits, even
 // after the ordinary invulnerability expires (e.g. a stalled wall contact).
 g.api.test.rushStart('ram');const charging=g.api.test.rushBoss();charging.cd=0;g.api.test.set({x:charging.mesh.position.x,y:0,z:charging.mesh.position.z+1,hp:100,inv:0});g.step(1);
 for(let frame=0;frame<35;frame++){g.api.test.set({x:charging.mesh.position.x,y:0,z:charging.mesh.position.z+.8,inv:0});g.step(.016);}
 assert.equal(g.api.snapshot().hp,75,'A single RAM dash delivers one damage event');
 // Every bullet weapon follows real meshes; the chest/core can be shot.
 g.api.test.rushStart('warden');const actor=g.api.test.rushBoss(),target=actor.core.getWorldPosition(new THREE.Vector3());
 g.api.test.set({x:target.x,y:Math.max(0,target.y-1.65),z:target.z+12,inv:9999,cool:0,weapon:0});g.step(.016);g.api.test.aim(target.x,target.y,target.z);const before=actor.hp;g.api.test.shoot();assert(actor.hp<before,'Public rifle action hits actual imported body/core');
 // Campaign restart and menu cleanup may not retain old actors or arena profiles.
 g.element('home').onclick();assert(actor.bossVisual.inspect().disposed,'Menu exit releases imported mixer and weakpoint resources');assert.equal(g.api.snapshot().state,'menu');assert(!g.api.snapshot().world.bossArena);g.start();assert.equal(g.api.snapshot().wave,1);assert.equal(g.api.snapshot().bossRush.active,false);
 console.log('PASS supplied boss campaign integration:',ids.length,'models,matching arenas,authored attacks,body/weakpoint transforms,RAM dodge,real rifle contact,home/restart');
})().catch(error=>{console.error(error);process.exitCode=1});
