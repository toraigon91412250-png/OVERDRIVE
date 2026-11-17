const assert=require('node:assert/strict'),vm=require('node:vm'),{buildSync}=require('esbuild');
const moduleRef={exports:{}};vm.runInNewContext(buildSync({entryPoints:['src/omega-raid.js'],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text,{module:moduleRef,exports:moduleRef.exports});
const {OmegaRaid,OMEGA_RAID_RULES}=moduleRef.exports;
const data=value=>JSON.parse(JSON.stringify(value));
const near=(a,b)=>assert(Math.abs(a-b)<1e-8,`${a} != ${b}`);

// Identical seeds reproduce the mission sequence; a reconnected rift never
// repeats the preceding non-boss objective, including after a failed attempt.
const a=new OmegaRaid(8675309),b=new OmegaRaid(8675309),sequence=[];
for(let i=0;i<40;i++){
 if(a.gameOver){a.reset(8675309+i);b.reset(8675309+i);}
 const as=a.begin(),bs=b.begin();assert.equal(as.kind,bs.kind);
 if(sequence.length&&as.round>1)assert.notEqual(as.kind,sequence[sequence.length-1]);
 sequence.push(as.kind);assert.equal(as.rerollAvailable,true);
 assert.deepEqual(data(a.tick(20)),data(b.tick(20)));
}
assert.equal(new Set(sequence).size,4,'seeds expose all four mission behaviors');

// There is no implicit wall clock: snapshots, menus and invalid combat ticks
// cannot consume the thirty-second budget or manufacture objective progress.
const clock=new OmegaRaid(17);clock.begin();const paused=JSON.stringify(clock.snapshot());
for(let i=0;i<10;i++)clock.snapshot();assert.equal(JSON.stringify(clock.snapshot()),paused);
for(const dt of [0,-1,NaN,Infinity])assert.deepEqual(data(clock.tick(dt,{progress:999})),[]);
assert.equal(clock.elapsed,0);assert.equal(clock.snapshot().progress,0);
clock.tick(29.999);near(clock.remaining,.001);assert.equal(clock.expired,false);
const deadline=clock.tick(.001);assert.equal(deadline.length,1);assert.equal(deadline[0].type,'shift');assert.equal(deadline[0].failed,true);assert.equal(clock.misses,1);
assert.deepEqual(data(clock.tick(100)),[],'a deadline cannot emit or penalize twice');assert.equal(clock.misses,1);
assert.equal(clock.advanceProgress(999),null,'a late hit cannot credit an expired objective');

// Progress from duplicate collision callbacks or an oversized weapon hit is
// credited once, cannot regress, and does not end the current rift early.
const success=new OmegaRaid(42);success.begin();const required=success.needed;
assert.equal(success.advanceProgress(-1),null);assert.equal(success.advanceProgress(NaN),null);
success.advanceProgress(1);success.setProgress(0);assert.equal(success.snapshot().progress,1);
const reward=success.advanceProgress(999);assert.equal(reward.type,'complete');assert.equal(reward.cores,1);assert.equal(reward.progress,required);assert.equal(reward.reward.heal,12);assert.equal(reward.reward.score,1000);
assert.equal(success.active,true);assert.equal(success.remaining,30);
for(let i=0;i<5;i++){assert.equal(success.advanceProgress(1),null);assert.equal(success.setProgress(999),null);}
assert.equal(success.cores,1);assert.equal(success.completedTypes.length,1);
const shift=success.tick(30)[0];assert.equal(shift.success,true);assert.equal(shift.failed,false);assert.equal(success.misses,0);

// Optional absolute progress on an active tick emits completion before the
// shift, so the final in-budget collision is treated as a successful objective.
const boundary=new OmegaRaid(2);boundary.begin();boundary.tick(29.9);
const simultaneous=boundary.tick(.1,{progress:boundary.needed});assert.deepEqual(data(simultaneous.map(e=>e.type)),['complete','shift']);assert.equal(simultaneous[1].success,true);assert.equal(boundary.cores,1);

// Three successes unlock the persistent boss phase. Its thirty-second world
// shifts never add failure strikes, and ordinary progress cannot farm cores.
const boss=new OmegaRaid(1234);
for(let i=0;i<3;i++){boss.begin();boss.advanceProgress(boss.needed);assert.equal(boss.cores,i+1);boss.tick(30);}
assert.equal(boss.bossReady,true);assert.equal(boss.begin().kind,'boss');
assert.equal(boss.advanceProgress(999),null);assert.equal(boss.cores,3);
for(let i=0;i<6;i++){const event=boss.tick(30)[0];assert.equal(event.boss,true);assert.equal(event.failed,false);assert.equal(event.gameOver,false);assert.equal(boss.misses,0);boss.begin({bossAlive:true});}
const alive=new OmegaRaid(1);assert.equal(alive.begin({bossAlive:true}).kind,'boss','an existing boss remains a boss encounter across reconnection');

// Six failures are an explicit terminal state; later callbacks cannot restart
// the run or emit additional shifts/rewards without a reset.
const lost=new OmegaRaid(1);
for(let i=0;i<6;i++){lost.begin();const event=lost.tick(50)[0];assert.equal(event.misses,i+1);assert.equal(event.gameOver,i===5);assert.equal(lost.elapsed,OMEGA_RAID_RULES.seconds);}
assert.equal(lost.gameOver,true);assert.equal(lost.begin(),false);assert.deepEqual(data(lost.tick(1)),[]);assert.equal(lost.advanceProgress(999),null);

// A redeal can only be spent once while combat is active; every rebuilt world
// supplies exactly one new use. Reset clears all progression and copied state.
const reroll=new OmegaRaid(9);assert.equal(reroll.consumeReroll(),false);reroll.begin();assert.equal(reroll.consumeReroll(),true);assert.equal(reroll.consumeReroll(),false);reroll.tick(30);assert.equal(reroll.consumeReroll(),false);reroll.begin();assert.equal(reroll.consumeReroll(),true);
const copied=boss.snapshot();copied.completedTypes.length=0;copied.history[0].kind='changed';assert.equal(boss.completedTypes.length,3);assert.notEqual(boss.history[0].kind,'changed');
lost.reset(777);assert.equal(lost.cores,0);assert.equal(lost.misses,0);assert.equal(lost.gameOver,false);assert.equal(lost.kind,null);assert.equal(lost.round,0);assert.equal(lost.completedTypes.length,0);assert.equal(lost.history.length,0);assert.equal(lost.rerollAvailable,false);
console.log('OMEGA RAID: seeded nonrepeating objectives, active-combat deadlines, single objective rewards, progress boundaries, three-core boss unlock, six-strike loss, boss persistence, one-reroll budget and reset/snapshot isolation passed');
