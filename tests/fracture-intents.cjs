const assert=require('node:assert/strict'),vm=require('node:vm'),{buildSync}=require('esbuild');
const moduleRef={exports:{}};
vm.runInNewContext(buildSync({entryPoints:['src/fracture-intents.js'],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text,{module:moduleRef,exports:moduleRef.exports});
const {FractureDirector,createFractureLayout,composeIntentEncounter}=moduleRef.exports;
const kinds=['breach','relay','route','hunt'];

for(let seed=1;seed<=160;seed++)for(const kind of kinds){
 const layout=createFractureLayout(seed*7919,kind);
 assert.equal(layout.intent.kind,kind);
 assert(layout.cells.length>35&&layout.cells.length<441,`${kind} seed ${seed} has a useful bounded footprint`);
 assert(layout.walls.length<=16,`${kind} fits the existing wall instance buffer`);
 assert.equal(layout.nodes.length,layout.reachableNodes.length,`${kind} seed ${seed} floor stays connected`);
 assert(!layout.blocked(layout.entry.x,layout.entry.z),`${kind} entry remains walkable`);
 for(const target of layout.intent.targets){
  assert(layout.cellAt(target.x,target.z),`${kind} target sits on a floor tile`);
  assert(!layout.blocked(target.x,target.z),`${kind} target does not overlap cover`);
  const route=layout.path(layout.entry.x,layout.entry.z,target.x,target.z),end=route.at(-1)||layout.entry;
  assert(Math.hypot(end.x-target.x,end.z-target.z)<.01,`${kind} target is reachable`);
 }
 for(const zone of layout.intent.spawnZones){
  assert(layout.cellAt(zone.x,zone.z),`${kind} spawn zone sits on a floor tile`);
  assert(!layout.blocked(zone.x,zone.z,.95),`${kind} spawn zone leaves room for an actor`);
 }
 for(const angle of [0,.7,1.8,2.9,4.2,5.8]){
  const player=layout.intent.targets[(seed+Math.floor(angle*10))%layout.intent.targets.length];
  const occupied=[];
  for(let i=0;i<6;i++){
   const spawn=layout.spawnPoint('chaser',angle+i*.91,player.x,player.z,occupied);
   assert(spawn,`${kind} finds a safe spawn for a common reinforcement load`);
   assert(Math.hypot(spawn.x-player.x,spawn.z-player.z)>=10,`${kind} never spawns inside the 10m player exclusion`);
   assert(!layout.blocked(spawn.x,spawn.z,.95),`${kind} spawn avoids blocked floor`);
   occupied.push(spawn);
  }
 }
 const opening=composeIntentEncounter(layout.intent,6,()=>((seed*17)%101)/101,true);
 assert.equal(opening.length,6);assert(opening.filter(type=>type==='shooter').length<2);
 if(!layout.intent.propHints)assert.fail('each intention owns its stage prop hints');
}

const breach=createFractureLayout(9,'breach');
assert.equal(breach.walls.length,3,'breach has three gates to break');
assert(breach.intent.targets.every(target=>breach.path(breach.entry.x,breach.entry.z,target.x,target.z).length>0));
const relay=createFractureLayout(10,'relay');
assert(Math.abs(relay.intent.targets[0].y-relay.intent.targets[1].y)>=1,'relay controls are on visibly separate terraces');
const route=createFractureLayout(11,'route');
assert.equal(route.intent.targets.length,3);assert(route.laneMarks.length>20,'the circuit has readable continuous route inlays');
assert.equal(route.cellAt(0,0),undefined,'the racing line does not cross the central void');
const hunt=createFractureLayout(12,'hunt');
assert(hunt.walls.length>=4,'hunt keeps multiple charge-breaking baffles');

for(const kind of kinds){
 const queue=composeIntentEncounter({kind},3,Math.random,false);
 assert.equal(queue.length,3);assert(queue.every(type=>type==='chaser'||type==='charger'));
 if(kind==='route'||kind==='hunt')assert(queue.every(type=>type!=='shooter'));
}
const d=new FractureDirector(3433),sequence=Array.from({length:16},()=>d.next().intent.kind);
for(let i=0;i<sequence.length;i+=4)assert.deepEqual([...sequence.slice(i,i+4)].sort(),[...kinds].sort(),'every shuffled block contains every intention');
for(let i=1;i<sequence.length;i++)assert.notEqual(sequence[i],sequence[i-1],'a reconstruction never repeats its preceding intention');
assert.deepEqual(Array.from({length:8},()=>new FractureDirector(18).next().intent.kind),Array.from({length:8},()=>new FractureDirector(18).next().intent.kind),'the shuffled sequence reproduces from the run seed');
for(const kind of kinds){
 const a=createFractureLayout(8462,kind),b=createFractureLayout(8462,kind);
 assert.deepEqual(a.cells,b.cells,`${kind} repeats from its layout seed`);
}

// Start the actual game for one deterministic seed per intent. Pure layout
// tests cannot catch a menu/mission director mismatch.
const loadGame=require('./headless-runtime.cjs'),seedByKind=new Map();
for(let i=1;i<=200&&seedByKind.size<kinds.length;i++){
 const seed=i*7919;
 const kind=new FractureDirector(seed).next().intent.kind;
 if(!seedByKind.has(kind))seedByKind.set(kind,seed);
}
assert.equal(seedByKind.size,kinds.length,'deterministic run seeds cover every opening intent');
for(const kind of kinds){
 const g=loadGame({difficulty:'fracture',seed:seedByKind.get(kind)});
 g.start();g.step(.016);
 assert.equal(g.api.snapshot().state,'upgrade','Σ begins with its existing weapon selection');
 g.element('choices').children[0].onclick();g.step(.016);
 const snapshot=g.api.snapshot();
 assert.equal(snapshot.world.intent.kind,kind);
 assert.equal(snapshot.world.intent.mission,kind);
 assert.equal(snapshot.omega.raid.kind,kind,'the active contract is generated by the same recipe as its floor');
 assert.equal(g.element('raid-title').textContent,snapshot.world.intent.name.split(' / ')[0],'the UI identifies the active arena');
 if(kind==='hunt'){
  const marks=g.api.test.raidTargets();
  assert.deepEqual(JSON.parse(JSON.stringify(marks.map(mark=>mark.enemy.type))),['chaser','charger'],'hunt names the two authored, attackable melee roles');
  assert(marks.every(mark=>mark.enemy.hp>0&&mark.enemy.omegaHunt),'both hunt indicators track actual living enemies');
 }
}
console.log('Σ COMBAT INTENTS: 640 seeded layouts keep connected routes, walkable targets/props, safe actor-sized spawns, the existing wall budget, four distinct encounter recipes and deterministic shuffled intent blocks');
console.log('Σ INTENT INTEGRATION: the actual start flow selects the matching objective and arena for all four deterministic openings; hunt markers use the intended living enemies');
