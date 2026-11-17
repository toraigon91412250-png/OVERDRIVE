const assert=require('node:assert/strict'),load=require('./headless-runtime.cjs');
(async()=>{
for(const difficulty of ['normal','easy']){
 const g=load({difficulty});g.start();if(difficulty==='normal'||difficulty==='easy')await g.api.bossAssetsReady();if(difficulty==='easy')g.element('tutorial-skip').dispatch('click');
 const t=g.api.test;assert.equal(g.api.snapshot().world.wave,1);const initial=g.api.snapshot().world;
 for(let target=2;target<=6;target++){
  t.clearEnemies();t.choose('wave');assert.equal(g.api.snapshot().state,'upgrade');g.step(.2);assert.equal(g.api.snapshot().world.active,false);
  g.element('choices').children.at(-1).onclick();assert.equal(g.api.snapshot().state,'rebuilding');assert.equal(g.api.snapshot().world.target,target);
  assert.equal(g.api.snapshot().world.duration,4,'standard wave reconstruction should take four seconds');
  assert.equal(g.api.snapshot().world.blank,true);assert.equal(g.api.snapshot().world.legacyVisible,false);assert.equal(g.api.snapshot().world.terrainVisible,false);const hp=g.api.snapshot().hp;t.damagePlayer(1000);assert.equal(g.api.snapshot().hp,hp);
  g.step(.8);t.pause();const age=g.api.snapshot().world.age;g.step(1);assert.equal(g.api.snapshot().world.age,age);g.element('resume').onclick();assert.equal(g.api.snapshot().state,'rebuilding');
  g.step(g.api.snapshot().world.duration);assert.equal(g.api.snapshot().state,'playing');assert.equal(g.api.snapshot().wave,target);assert.equal(g.api.snapshot().world.wave,target);assert.equal(g.element('rebuild').hidden,true);
  // Test campaign deck collision before the finale chooses a boss-specific
  // arena, whose intended floor can be flat.
  if(target===5){const decks=g.api.snapshot().world.decks;assert(decks.some(d=>d.top>2));t.clearEnemies();const deck=decks[0];t.set({x:deck.x,z:deck.z,y:deck.top+.2,vy:-1});g.step(.3);assert.equal(g.api.snapshot().position.y,deck.top);}
 }
 const final=g.api.snapshot().world;assert.notEqual(initial.floor,final.floor);assert.notEqual(initial.horizon,final.horizon);assert.notEqual(initial.ringColor,final.ringColor);assert.notEqual(initial.padColor,final.padColor);assert(final.ringScale>initial.ringScale*1.5);if(difficulty==='normal')assert(final.bossArena,'Normal finale builds its selected boss arena');g.start();assert.equal(g.api.snapshot().world.wave,1);assert(g.api.snapshot().world.decks.every(d=>d.top===0));
}
console.log('WORLD: reward timing, five reconstructions, immunity, pause/resume, stage decks, restart, both difficulties passed');

{const g=load();g.start();const t=g.api.test;t.clearEnemies();t.gainXP(30);t.choose('wave');g.element('choices').children.at(-1).onclick();assert.equal(g.api.snapshot().state,'upgrade');assert.equal(g.api.snapshot().world.active,false);g.element('choices').children.at(-1).onclick();assert.equal(g.api.snapshot().state,'rebuilding');g.element('pause').onclick();g.element('home').onclick();assert.equal(g.api.snapshot().world.wave,1);assert.equal(g.element('rebuild').hidden,true);}

})().catch(error=>{console.error(error);process.exitCode=1});
