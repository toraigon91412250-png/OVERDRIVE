const assert=require('node:assert/strict'),vm=require('node:vm'),{buildSync}=require('esbuild'),T=require('three');
function load(path){const m={exports:{}};vm.runInNewContext(buildSync({entryPoints:[path],bundle:true,format:'cjs',external:['three'],write:false}).outputFiles[0].text,{module:m,exports:m.exports,require});return m.exports;}
const {generateOmega,omegaBuild,OMEGA_CORES}=load('src/omega-weapon.js'),{createOmegaCombat}=load('src/omega-combat.js');
const vector=(x=0,y=0,z=0)=>new T.Vector3(x,y,z),near=(a,b)=>assert(Math.abs(a-b)<1e-6,`${a} != ${b}`),plain=v=>JSON.parse(JSON.stringify(v));
assert.deepEqual(plain(generateOmega(99)),plain(generateOmega(99)),'seed recreates gun');
assert.notDeepEqual(plain(generateOmega(99)),plain(generateOmega(100)));
const recipes=new Set(),combatIds=new Set();
for(let frame=0;frame<5;frame++)for(let core=0;core<5;core++)for(let feed=0;feed<5;feed++){
 const b=omegaBuild({frame,core,feed});combatIds.add(`${b.frame}:${b.core}:${b.feed}`);
 assert(b.mag>=6&&b.mag<=18);assert(b.reload>=.7&&b.reload<=2.1);assert(b.recoil>=.8&&b.recoil<=1.2);assert(b.rate>=.58&&b.rate<=.8);assert(b.range>=28&&b.range<=40);
 const sustained=b.nominalDamage*b.mag/(b.mag*b.rate+b.reload);assert(sustained>85&&sustained<120,`DPS outlier ${b.name} ${feed}: ${sustained}`);
 for(let shroud=0;shroud<5;shroud++)for(let housing=0;housing<5;housing++){
  const cosmetic=omegaBuild({frame,core,feed,shroud,housing});recipes.add(cosmetic.recipe);
  for(const field of ['damage','rate','mag','reload','range','recoil'])assert.equal(cosmetic[field],b[field],'exterior does not change combat');
 }
 assert.equal(omegaBuild({frame,core,feed},3).power,1.24);
 for(let rank=0;rank<4;rank++){
  const ranked=omegaBuild({frame,core,feed},rank);assert(ranked.mutation.length>0);
  assert(ranked.echoDelay>=.15-1e-9&&ranked.echoDelay<=.3);assert(ranked.tetherDuration>=.6&&ranked.tetherDuration<=.9+1e-9);assert(ranked.bounceRetention<=.8);assert(ranked.gravityPull<=.8);assert(ranked.returnSpeed<=62);
 }
}
assert.equal(recipes.size,3125);assert.equal(combatIds.size,125);
const bad=omegaBuild({frame:NaN,core:Infinity,feed:-10,shroud:100});assert.equal(bad.frame,0);assert.equal(bad.core,0);assert.equal(bad.feed,0);assert.equal(bad.shroud,4);
function enemy(x=0,z=-10,hp=1000){return {hp,max:hp,r:1,type:'shooter',mesh:{position:vector(x,0,z)}};}
function harness(enemies=[],options={}){
 const events=[],hits=[];
 const combat=createOmegaCombat({getEnemies:()=>enemies,wallDistance:options.wallDistance||(()=>Infinity),wallHit:options.wallHit,damage:(e,d,meta)=>{hits.push({e,d,meta});e.hp-=d;},onEffect:e=>events.push(e),knockback:options.knockback});
 return {combat,enemies,events,hits,fire:(core,extra={})=>combat.fire({build:omegaBuild({core}),origin:vector(),muzzle:vector(.2,-.1,-.5),direction:vector(0,0,-1),attackId:42,...extra})};
}
// Every functional assembly is fired through the real simulation, including
// both projectile legs, reload-independent secondary work and a cover case.
for(let frame=0;frame<5;frame++)for(let core=0;core<5;core++)for(let feed=0;feed<5;feed++){
 const build=omegaBuild({frame,core,feed}),e=enemy(0,-10,10000),h=harness([e]);
 assert(h.fire(core,{build}).fired);for(let i=0;i<150;i++)h.combat.update(.016);
 near(10000-e.hp,OMEGA_CORES[core].nominalDamage);
 const wall=(o,d,r)=>{const at=(-5-o.z)/d.z;return at>=0&&at<=r?at:r;},behind=enemy(0,-12),b=harness([behind],{wallDistance:wall});
 b.fire(core,{build});for(let i=0;i<150;i++)b.combat.update(.016);near(behind.hp,1000);
}
// ECHO only repeats once to the same still-present target. No transfer after
// death, recursion, or ray through newly blocked cover is possible.
{
 const e=enemy(),h=harness([e]);assert(h.fire(0).fired);near(e.hp,940);h.combat.update(.299);near(e.hp,940);h.combat.update(.001);near(e.hp,922);h.combat.update(5);near(e.hp,922);assert.equal(h.hits.length,2);assert(h.hits.every(q=>q.meta.attackId===42));
 const moved=enemy(),m=harness([moved]);m.fire(0);moved.mesh.position.x=10;m.combat.update(.4);near(moved.hp,940);
 const dead=enemy(0,-10,50),next=enemy(0,-11),d=harness([dead,next]);d.fire(0);d.combat.update(.4);near(next.hp,1000);
 const blocked=enemy(),b=harness([blocked],{wallDistance:()=>5});b.fire(0);near(blocked.hp,1000);
}
// TETHER cooldown and slow duration use time, not number of update calls.
{
 const e=enemy(),h=harness([e]);h.fire(1);near(e.omegaSlow,.25);near(e.omegaSlowLife,.6);h.combat.update(.5);near(e.omegaSlowLife,.1);h.fire(1);near(e.omegaSlowLife,.1);h.combat.update(.1);near(e.omegaSlow,0);h.combat.update(.4);h.fire(1);near(e.omegaSlowLife,.6);
 const boss=enemy();boss.type='boss';const b=harness([boss]);b.fire(1);near(boss.omegaSlow,.08);near(boss.omegaSlowLife,.3);b.combat.reset();near(boss.omegaSlow,0);
}
// One wall reflection, at most one enemy on each segment, excluding its first
// victim. A fake wall at z=-20 reflects back along +Z to the x=0 line.
{
 const first=enemy(0,-10),second=enemy(0,-5),h=harness([first,second],{wallDistance:(o,d,r)=>d.z<0?Math.max(0,20+o.z):r,wallHit:()=>({distance:20,normal:vector(0,0,1)})});
 h.fire(2);assert.equal(h.hits.length,2);near(second.hp,928);near(first.hp,953.2);assert.equal(h.combat.stats().bounces,1);
 const noWall=harness([enemy()]);noWall.fire(2);assert.equal(noWall.hits.length,1);
}
// Gravity targets include primary (three total), pulse counts are fixed, and
// a second shot cannot add a second well to any already captured enemy.
{
 const es=[enemy(),enemy(1.5,-10),enemy(-1.5,-10),enemy(2.5,-10)],h=harness(es);h.fire(3);h.combat.update(.4);assert.equal(h.combat.stats().wells,1);h.combat.update(.9);
 near(es[0].hp,908);near(es[1].hp,967.6);near(es[2].hp,967.6);near(es[3].hp,1000);assert.equal(h.combat.stats().pulses,3);
 const e=enemy(),d=harness([e]);d.fire(3);d.combat.update(.4);d.fire(3);d.combat.update(.4);d.combat.update(.6);near(e.hp,870,'two direct hits but one DoT');assert(d.combat.stats().wells<=8);
 const deadPrimary=[enemy(0,-10,20),enemy(1.5,-10),enemy(-1.5,-10),enemy(2.5,-10)],k=harness(deadPrimary);k.fire(3);k.combat.update(.4);k.combat.update(.9);assert.equal(new Set(k.hits.map(v=>v.e)).size,3,'dead primary still occupies one of three target slots');
 const occupied=[enemy(),enemy(1.5,-10),enemy(-1.5,-10),enemy(2.5,-10),enemy(-2.5,-10),enemy(3,-10)],o=harness(occupied);o.fire(3,{attackId:1});o.combat.update(.4);o.fire(3,{attackId:2});o.combat.update(.4);o.combat.update(.9);assert.equal(new Set(o.hits.filter(v=>v.meta.attackId===2).map(v=>v.e)).size,3,'occupied primary still reserves one target slot');
}
// Boomerang never hits a target more than once on a leg and never more than
// three different targets per leg, even under small repeated time steps.
{
 const es=[enemy(0,-5),enemy(0,-10),enemy(0,-15),enemy(0,-20)],h=harness(es);h.fire(4);for(let i=0;i<150;i++)h.combat.update(.016);
 assert.equal(h.hits.length,6);assert.equal(h.combat.stats().returns,1);assert.equal(h.combat.stats().projectiles,0);
 const counts=es.map(e=>h.hits.filter(q=>q.e===e).length);assert(counts.every(v=>v<=2));assert.equal(h.hits.filter(q=>!q.meta.secondary).length,3);assert.equal(h.hits.filter(q=>q.meta.secondary).length,3);
 const wall=(o,d,r)=>{if(Math.abs(o.z+20)<1e-8)return 0;const at=(-20-o.z)/d.z;return at>=0&&at<=r?at:r;},e=enemy(),b=harness([e],{wallDistance:wall});b.fire(4,{muzzle:vector()});for(let i=0;i<150;i++)b.combat.update(.016);assert.equal(b.hits.length,2,'wall reversal leaves the zero-distance surface and returns through target');assert.equal(b.combat.stats().projectiles,0);
}
// Each rank changes that core's distinctive mechanic, not merely its damage.
{
 const echo=enemy(),e=harness([echo]);e.fire(0,{build:omegaBuild({core:0},3)});e.combat.update(.149);assert.equal(e.hits.length,1);e.combat.update(.001);assert.equal(e.hits.length,2);near(echo.hp,1000-78*1.24);
 const ordinary=enemy(),t=harness([ordinary]);t.fire(1,{build:omegaBuild({core:1},3)});near(ordinary.omegaSlowLife,.9);const boss=enemy();boss.type='boss';const tb=harness([boss]);tb.fire(1,{build:omegaBuild({core:1},3)});near(boss.omegaSlowLife,.39);
 const first=enemy(0,-10),second=enemy(0,-5),r=harness([first,second],{wallDistance:(o,d,q)=>d.z<0?Math.max(0,20+o.z):q,wallHit:()=>({distance:20,normal:vector(0,0,1)})});r.fire(2,{build:omegaBuild({core:2},3)});near(first.hp,1000-72*.8*1.24);
 const pulls=[],g=harness([enemy()],{knockback:(target,center,force,meta)=>pulls.push({force,meta})});g.fire(3,{build:omegaBuild({core:3},3)});g.combat.update(.4);g.combat.update(.9);assert.equal(pulls.length,3);assert(pulls.every(p=>p.force===.8&&p.meta.pull));
 const duration=rank=>{const b=harness([]);b.fire(4,{build:omegaBuild({core:4},rank)});let age=0;while(b.combat.stats().projectiles&&age<3){b.combat.update(.001);age+=.001;}return age;};assert(duration(3)<duration(0)-.15,'return velocity gains speed; outbound stays the same');
}
// All physics and delayed work are bounded and reset removes every reference.
{
 const h=harness([]);for(let i=0;i<40;i++)h.fire(4);assert.equal(h.combat.stats().projectiles,32);h.combat.update(4);assert.equal(h.combat.stats().projectiles,0);h.combat.reset();assert.equal(h.combat.stats().shots,0);assert.equal(h.combat.stats().wells,0);
 assert.equal(h.fire(0,{direction:vector()}).fired,false);assert.equal(h.fire(0,{build:null}).fired,false);
}
console.log('Ω weapon: 125 combat builds / 3125 recipes, seed reproducibility, stats budgets, cover, echo, tether cooldown, reflection, three-target nonstacking wells, boomerang caps and fixed pools passed');
