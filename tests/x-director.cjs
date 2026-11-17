const assert=require('node:assert/strict'),vm=require('node:vm'),{buildSync}=require('esbuild');
const moduleRef={exports:{}};vm.runInNewContext(buildSync({entryPoints:['src/x-director.js'],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text,{module:moduleRef,exports:moduleRef.exports});
const {XDirector,X_RULES,X_MUTATIONS}=moduleRef.exports;
const near=(a,b)=>assert(Math.abs(a-b)<1e-8,`${a} != ${b}`);

// Time only advances on explicit combat ticks; pause/menu/reconstruction callers simply do not tick.
const x=new XDirector();assert.equal(x.seconds,42);assert.equal(x.charge,45);assert.equal(x.enter(1),true);
const paused=JSON.stringify(x.snapshot());assert.equal(JSON.stringify(x.snapshot()),paused);
x.tick(2);near(x.seconds,40);near(x.elapsed,2);
for(const dt of [-1,NaN,Infinity,0])assert.equal(x.tick(dt),false);near(x.seconds,40);
assert.equal(x.enter(1),false);near(x.seconds,40);assert.equal(x.enter(2),true);near(x.seconds,45);assert.equal(x.enter(2),false);near(x.seconds,45);
assert.equal(x.enter(7),false);assert.equal(x.enter(0),false);

// Kill rewards are capped at reactor capacity, and stats count the credited value.
x.seconds=20;let reward=x.kill();near(reward.seconds,1.2);near(reward.charge,18);assert.equal(reward.combo,1);
reward=x.kill({bounty:true});near(reward.seconds,6);near(reward.charge,32);assert.equal(x.bountyKills,1);
x.kill();x.kill();reward=x.kill();near(reward.seconds,1.8);assert.equal(x.combo,5);assert.equal(x.maxCombo,5);
x.tick(3.49);assert.equal(x.combo,5);x.tick(.01);assert.equal(x.combo,0);reward=x.kill();near(reward.seconds,1.2);
x.seconds=59.5;const oldStolen=x.timeStolen;reward=x.kill({bounty:true});near(reward.seconds,.5);near(x.seconds,60);near(x.timeStolen-oldStolen,.5);
x.enter(3);near(x.seconds,60);assert.equal(x.maxCombo,5);

// BREAK cannot activate early or re-enter while already active. Kills use half charge during it.
const b=new XDirector();assert.equal(b.activate(),false);b.charge=100;assert.equal(b.activate(),true);assert.equal(b.breakActivations,1);near(b.breakRemaining,4);near(b.charge,0);
near(b.kill().charge,9);near(b.kill({bounty:true}).charge,16);b.charge=100;assert.equal(b.activate(),false);near(b.breakRemaining,4);
b.tick(3.99);assert.equal(b.breaking,true);b.tick(.01);assert.equal(b.breaking,false);assert.equal(b.activate(),true);assert.equal(b.breakActivations,2);

// Reactor damage is based on applied HP damage, with a six-second maximum per hit.
const h=new XDirector();near(h.hit(10),1.3);near(h.seconds,40.7);near(h.hit(200),6);near(h.hit(-5),0);near(h.hit(NaN),0);near(h.timeLost,7.3);
h.seconds=.5;near(h.hit(10),.5);assert.equal(h.expired,true);assert.equal(h.tick(1),true);assert.equal(h.activate(),false);const killed=h.kills;near(h.kill({bounty:true}).seconds,0);assert.equal(h.kills,killed);near(h.seconds,0);
const expired=new XDirector();assert.equal(expired.tick(42),true);assert.equal(expired.seconds,0);assert.equal(expired.enter(2),false);

// Low-clock recovery is a counted close call, not every kill under a threshold.
const c=new XDirector();c.seconds=3;c.kill();assert.equal(c.closeCalls,0);c.kill({bounty:true});assert.equal(c.closeCalls,1);c.kill();assert.equal(c.closeCalls,1);

// Mutations are unique and offers never contain owned laws or duplicate cards.
const m=new XDirector();assert.equal(X_MUTATIONS.length,6);assert.equal(new Set(X_MUTATIONS.map(l=>l.id)).size,6);
assert.equal(m.install('missing'),false);for(const law of X_MUTATIONS){
 const offers=m.offers(()=>.35);assert.equal(new Set(offers.map(l=>l.id)).size,offers.length);assert(offers.length<=3);assert(offers.every(l=>!m.owns(l.id)));
 assert.equal(m.install(law.id),true);assert.equal(m.install(law.id),false);assert.equal(m.owns(law.id),true);assert.equal(m.rank(law.id),1);
}assert.equal(m.offers().length,0);assert.equal(m.rank('missing'),0);
for(const random of [()=>1,()=>-1,()=>NaN]){const offers=new XDirector().offers(random);assert.equal(offers.length,3);assert(offers.every(Boolean));assert.equal(new Set(offers.map(l=>l.id)).size,3);}

// Sustain extension has an absolute per-activation cap, so crowds cannot freeze a fight forever.
const s=new XDirector();s.install('sustain');s.install('bounty');s.charge=100;s.activate();near(s.breakRemaining,5.5);near(s.kill({bounty:true}).seconds,9);near(s.charge,21);
for(let i=0;i<20;i++)s.kill();near(s.breakRemaining,6.7);near(s.breakExtension,1.2);s.tick(6.7);assert.equal(s.breaking,false);
s.charge=100;s.activate();near(s.breakRemaining,5.5);near(s.breakExtension,0);
s.reset();near(s.seconds,X_RULES.startSeconds);assert.equal(s.kills,0);assert.equal(s.breakActivations,0);assert.equal(s.mutations.size,0);

// Mutating a snapshot cannot mutate the director's selected laws.
const snap=m.snapshot();snap.mutations.length=0;assert.equal(m.mutations.size,6);
console.log('X DIRECTOR: reactor deadline, kill theft, combo, hit cost, break limits, unique laws, low-time recovery and reset passed');
