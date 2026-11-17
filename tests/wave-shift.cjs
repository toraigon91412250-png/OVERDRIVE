const assert=require('node:assert/strict'),vm=require('node:vm'),{buildSync}=require('esbuild'),load=require('./headless-runtime.cjs');
const m={exports:{}};vm.runInNewContext(buildSync({entryPoints:['src/wave-shift.js'],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text,{module:m,exports:m.exports});
const {WaveShift}=m.exports;
for(let wave=1;wave<=6;wave++)for(const value of [0,.2,.9,.999]){
 const s=new WaveShift(()=>value);s.start(wave,true);if(wave===6){assert.equal(s.tick(1000,4),false);continue;}
 assert(s.deadline>=30&&s.deadline<45);assert.equal(s.tick(29.999,4),false);assert.equal(s.tick(45,0),false);assert.equal(s.tick(.01,4),true);assert.equal(s.tick(1000,4),false);
}
const disabled=new WaveShift();disabled.start(2,false);assert.equal(disabled.tick(1000,4),false);
for(const mobile of [false,true]){
 const g=load({seed:123,mobile});g.start();const t=g.api.test;t.set({inv:9999});
 let previousLayout=0;
 for(let wave=1;wave<=5;wave++){
  let s=g.api.snapshot();assert.equal(s.wave,wave);assert.equal(s.waveShift.enabled,true);assert.equal(s.waveShift.used,false);
  // Leave one active enemy plus queued enemies, verifying both count toward the replacement.
  g.step(.5);s=g.api.snapshot();const count=s.activeEnemies+s.queue;
  t.shiftClock(29-g.api.snapshot().waveShift.elapsed);g.step(.1);assert.equal(g.api.snapshot().state,'playing');
  t.pause();const age=g.api.snapshot().waveShift.elapsed;g.step(1);assert.equal(g.api.snapshot().waveShift.elapsed,age);g.element('resume').onclick();
  t.shiftClock(g.api.snapshot().waveShift.deadline-g.api.snapshot().waveShift.elapsed-.02);g.step(.032);
  s=g.api.snapshot();assert.equal(s.state,'rebuilding');assert.equal(s.wave,wave);assert.equal(s.waveShift.pending,count);assert.equal(s.world.duration,wave>=4?4:2.7);assert(s.world.target>=9&&s.world.target<=16,'ring shift uses a purpose-built anomaly arena');assert.equal(s.waveShift.layout,s.world.target);assert.notEqual(s.world.target,previousLayout,'consecutive ring shifts do not revisit the same anomaly');previousLayout=s.world.target;assert.notEqual(s.world.target,wave);
  assert.deepEqual(Array.from(s.ammo),Array.from(s.weaponMags));
  g.element('rebuild-skip').onclick();g.step(.032);s=g.api.snapshot();assert.equal(s.state,'playing');assert.equal(s.wave,wave);assert.equal(s.activeEnemies,count);assert.equal(s.queue,0);
  for(const e of t.rushEnemies()){assert.notEqual(e.type,'boss');assert(Math.hypot(e.mesh.position.x-s.position.x,e.mesh.position.z-s.position.z)>=11);assert.notEqual(t.stageHeight(e.mesh.position.x,e.mesh.position.z),null);}
  {const start=g.api.snapshot().position;t.setInput({y:-1});g.step(.5);t.setInput({y:0});const end=g.api.snapshot().position;assert.notEqual(t.stageHeight(end.x,end.z),null,'forward movement after ring shift stays on constructed terrain');assert(Number.isFinite(start.y)&&Number.isFinite(end.y));}
  // An expired deadline cannot start a second shift in this wave.
  t.shiftClock(100);g.step(.05);assert.equal(g.api.snapshot().state,'playing');
  t.clearEnemies();t.choose('wave');g.element('choices').children.at(-1).onclick();assert.equal(g.api.snapshot().state,'rebuilding');g.element('rebuild-skip').onclick();g.step(.032);
 }
 assert.equal(g.api.snapshot().wave,6);assert.equal(g.api.snapshot().bossRush.active,true);assert.equal(g.api.snapshot().waveShift.enabled,false);
 g.element('restart').onclick();assert.equal(g.api.snapshot().waveShift.used,false);assert.equal(g.api.snapshot().wave,1);
}
// Dead enemies cannot trigger a rebuild while the wave completes; easy never enables it.
{const g=load();g.start();g.api.test.clearEnemies();g.api.test.shiftClock(50);g.step(.1);assert.equal(g.api.snapshot().waveShift.used,false);}
{const g=load({difficulty:'easy'});g.start();g.element('tutorial-skip').dispatch('click');g.api.test.shiftClock(100);g.api.test.set({inv:9999});g.step(.1);assert.equal(g.api.snapshot().waveShift.enabled,false);assert.equal(g.api.snapshot().state,'playing');}
console.log('WAVE SHIFT: 30-second minimum, randomized scheduling, once per wave, remaining+queued count, safe layout/spawns, reload, pause, progression, boss isolation and easy passed');
