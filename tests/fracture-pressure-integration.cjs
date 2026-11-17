const assert=require('node:assert/strict');
const loadGame=require('./headless-runtime.cjs');
function start(difficulty,seed=4321){
 const g=loadGame({difficulty,seed});g.start();g.step(.016);
 if(g.api.snapshot().state==='upgrade')g.element('choices').children[0].onclick();
 g.step(.016);return g;
}
{
 const g=start('fracture'),t=g.api.test;t.set({hp:10000,max:10000,inv:10000});g.step(9.5);
 const live=t.rushEnemies().filter(e=>e.hp>0&&!e.omegaObjective);
 assert(live.length<=6,'Σ keeps the existing arena cap');
 assert(live.filter(e=>e.type==='shooter'||e.type==='strafer').length<=1,'Σ never stacks long-range enemies');
 assert(!live.some(e=>e.type==='strafer'),'Σ has no orbiting ranged enemy');
 assert(g.api.snapshot().omega.raid.elapsed>9,'the pressure check ran during active Σ combat');
}
for(const [difficulty,expected] of [['fracture',3],['omega',7]]){
 const g=start(difficulty,777),t=g.api.test;t.clearEnemies();t.holdSpawns();t.set({hp:10000,max:10000,inv:10000});
 const boss=t.spawn('boss');boss.cd=-.01;boss.phase=0;g.step(.016);
 assert.equal(t.xBullets().length,expected,`${difficulty} Warden volley count`);
}
console.log('Σ PRESSURE: actual gameplay caps ranged enemies at one, removes strafers, reduces Warden fan to three shots, and keeps Ω’s seven-shot pattern unchanged');
