const assert=require('node:assert/strict');
const load=require('./headless-runtime.cjs');
function start(){const g=load({seed:456});g.start();g.step(.032);g.api.test.clearEnemies();g.api.test.holdSpawns();return g;}
function target(g,x,z,hp=100){const e=g.api.test.spawn('chaser',x,z);e.hp=e.max=hp;e.mesh.position.y=1.4;e.tutorialDummy=true;return e;}
// Arc Link is a two-shot connection: no proc from the same firing event.
{
 const g=start(),t=g.api.test;t.set({up:{chain:1}});const a=target(g,0,4),b=target(g,3,4);
 t.damage(a,5,true,{direct:true,attackId:1,distance:5});assert.equal(a.hp,95);
 t.damage(b,5,true,{direct:true,attackId:1,distance:5});assert.equal(b.hp,95,'pellets in one attack cannot complete the link');
 t.damage(b,5,true,{direct:true,attackId:2,distance:5});assert.equal(a.hp,80);assert.equal(b.hp,75,'next attack arcs for 15 to both marked targets');
}
// Far mark and weapon swap bonuses are single-trigger, capped, and expire safely.
{
 const g=start(),t=g.api.test;t.set({up:{spotter:1}});const e=target(g,0,-18,1000);
 t.damage(e,10,true,{direct:true,attackId:1,distance:30});assert.equal(e.hp,990);
 t.damage(e,10,true,{direct:true,attackId:2,distance:5});assert.equal(e.hp,977.5);
}
{
 const g=start(),t=g.api.test;t.set({up:{hotswap:1}});const e=target(g,0,4,1000);t.weapon(1);
 t.damage(e,100,true,{direct:true,attackId:3,distance:5});assert.equal(e.hp,880,'bonus is +30%, capped at +20');
 t.damage(e,10,true,{direct:true,attackId:4,distance:5});assert.equal(e.hp,870,'bonus is consumed once');
}
// Emergency revive, aerial reset, Overdrive Echo and focused weapon cards.
{
 const g=start(),t=g.api.test;t.set({up:{secondwind:1},hp:10});t.hurt(30);assert.equal(g.api.snapshot().hp,20);assert.equal(g.api.snapshot().state,'playing');t.hurt(999);assert.equal(g.api.snapshot().state,'dead','once-per-run revive cannot trigger twice');
}
{
 const g=start(),t=g.api.test;t.set({up:{overecho:1},over:8});for(let i=0;i<3;i++){const e=target(g,i,4,1);t.damage(e,2)}assert.equal(g.api.snapshot().over,9);
}
// Cards are drawn across the complete arsenal; no weapon navigation is rendered.
{
 const g=start(),t=g.api.test,seen=new Set();
 for(let i=0;i<100;i++){t.choose('level');const cards=g.element('choices').children;assert.equal(cards.length,4);assert.equal(new Set(cards.map(c=>c.dataset.card)).size,4);for(const c of cards)seen.add(c.dataset.card);assert.equal(g.element('pulse-progress').hidden,true);assert.equal(g.element('pulse-progress').children.length,0);}
 for(const id of ['pulse_core','breach_core','rail_core','astra_core','lance_core','seeker_core','range','breach','fork','feed','pointblank','secondwind'])assert(seen.has(id),'random pool contains '+id);
 t.set({up:{pointblank:1,secondwind:1}});for(let i=0;i<20;i++){t.choose('level');assert(!g.element('choices').children.some(c=>['pointblank','secondwind'].includes(c.dataset.card)));}
}
{
 const g=start(),t=g.api.test;t.gainXP(200);t.openReward();const card=g.element('choices').children[0];card.onclick();const pending=g.api.snapshot().pendingLevels;card.onclick();assert.equal(g.api.snapshot().pendingLevels,pending,'stale callback cannot consume a queued reward');assert.equal(g.api.snapshot().state,'upgrade');assert.equal(g.element('pulse-progress').children.length,0);
}
{
 const g=start(),t=g.api.test;t.choose('level');g.element('choices').children[0].onclick();assert.equal(g.api.snapshot().state,'playing');assert.equal(g.element('choices').children.length,0);assert.equal(g.element('pulse-progress').hidden,true);
}
console.log('AUGMENTS: combat effects, randomized arsenal/common offers, caps, no weapon selector and clean queued rewards passed');
