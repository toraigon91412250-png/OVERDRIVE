// Focused regression: both dragon models retain their corrected front
// after the game updates animation phases, while host steering stays intact.
const assert=require('node:assert/strict');
const esbuild=require('esbuild');
const THREE=require('three');
global.self=global;
global.createImageBitmap=async()=>({width:16,height:16,close(){}});
const compiled=esbuild.buildSync({entryPoints:['src/boss-models.js'],bundle:true,platform:'node',format:'cjs',write:false});
const mod={exports:{}};
new Function('module','exports','require',compiled.outputFiles[0].text)(mod,mod.exports,require);
(async()=>{
 const api=mod.exports;
 await api.preloadBossModels(['tempest','devourer']);
 for(const id of ['tempest','devourer']){
  const actor=api.createBossModel(id),pivot=actor.root.children[0];
  assert(pivot,'Imported model keeps its orientation pivot');
  const states=[
   {phase:'idle',health:1},
   {phase:'windup',telegraph:true,phaseProgress:.8,health:1},
   {phase:'attack',attack:true,phaseProgress:.35,health:1},
   {phase:'recovery',phaseProgress:.7,health:1},
   {phase:'idle',health:1},
  ];
  for(const state of states){
   actor.update(.016,state);
   assert(Math.cos(pivot.rotation.y)<-.98,`${id}: forward axis flipped in ${state.phase}`);
   assert(actor.core.getWorldPosition(new THREE.Vector3()).toArray().every(Number.isFinite),`${id}: weakpoint transform is finite`);
   assert.equal(actor.root.rotation.y,0,`${id}: visual correction must not alter gameplay steering`);
  }
  actor.dispose();
 }
 console.log('PASS TEMPEST and DEVOURER keep corrected facing across attack phases');
})().catch(error=>{console.error(error);process.exitCode=1;});
