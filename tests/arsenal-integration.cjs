const assert=require('node:assert/strict'),T=require('three');
const load=require('./headless-runtime.cjs');
const close=(actual,expected,message='')=>assert(Math.abs(actual-expected)<1e-6,`${message}: ${actual} != ${expected}`);
const defs=[
 [1,'breach','vortex','burst'],[2,'rail','prism','siege'],[3,'astra','nova','reactor'],
 [4,'lance','echo','deadeye'],[5,'seeker','swarm','hunter']
];
function start(options={}){const g=load({seed:246810,...options});g.start();if(options.difficulty==='easy')g.element('tutorial-skip').dispatch('click');g.step(.032);const t=g.api.test;t.clearEnemies();t.holdSpawns();t.set({hp:10000,inv:10000});g.element('assist').checked=false;return g;}
function build(g,index){return g.api.snapshot().arsenal.find(b=>b.weapon===index);}
function target(g,x=0,z=5,hp=100000,type='chaser'){const e=g.api.test.spawn(type,x,z);e.hp=e.max=hp;e.tutorialDummy=true;e.cd=999;e.mesh.position.y=type==='boss'?3:1.4;return e;}
function pick(g,index,id){let card;for(let i=0;i<100&&!card;i++){g.api.test.choose('level');card=g.element('choices').children.find(c=>c.dataset.card===id);}assert(card,`missing ${id} from randomized rewards`);card.onclick();card.onclick();assert.equal(g.api.snapshot().state,'playing');}
function evolve(g,index,prefix,path){pick(g,index,prefix+'_core');pick(g,index,prefix+'_'+path);pick(g,index,prefix+'_apex');g.api.test.weapon(index);g.step(.35);}
function aim(g,e){g.api.test.aim(e.mesh.position.x,e.mesh.position.y,e.mesh.position.z);g.api.test.set({cool:0});}
// All ten routes are reachable through real reward cards, exclusive, and alter
// the actual weapon, HUD, ammo, reload and installed first-person model.
for(const options of [{difficulty:'normal'},{difficulty:'easy',mobile:true}])for(const [index,prefix,...paths] of defs)for(const path of paths){
 const g=start(options),t=g.api.test;assert.equal(t.installArsenalCard(prefix+'_apex'),false);evolve(g,index,prefix,path);const b=build(g,index),snap=g.api.snapshot();
 assert.equal(b.tier,3);assert.equal(b.path,path);assert.equal(snap.weaponMags[index],b.mag);assert.equal(snap.ammo[index],b.mag);assert.equal(t.installArsenalCard(prefix+'_'+paths.find(p=>p!==path)),false);assert.equal(t.installArsenalCard(prefix+'_apex'),false);
 const model=index<3?snap.heavyEvolution.models[index]:snap.specialEvolution.models[index];assert(model.meshes>0,`${prefix} has an installed model`);
 assert(g.element('weaponname').textContent.includes(options.difficulty==='easy'?'完成':b.label),'HUD names the evolved form');
 const e=target(g,0,index===1?7:0);aim(g,e);const initial=g.api.snapshot().ammo[index];if(index===3)t.firePhase({ammo:1});else if(index===5){g.step(.35);t.set({cool:0});t.shoot();g.step(.8);}else t.shoot();
 assert(e.hp<e.max,`${prefix}/${path} deals actual damage`);assert.equal(g.api.snapshot().ammo[index],initial-1,`${prefix} exact per-shot ammunition`);
 if(index!==3){const ammo=Array.from(g.api.snapshot().ammo);ammo[index]=0;t.set({ammo,cool:0,reload:0});t.shoot();close(g.api.snapshot().reloading,b.reload*(options.difficulty==='easy'?.55:1),`${prefix} actual reload`);g.step(b.reload+1);assert.equal(g.api.snapshot().ammo[index],b.mag);}
 t.choose('level',index);assert(!g.element('choices').children.some(c=>c.dataset.card.startsWith(prefix+'_')),'completed weapon has no duplicate evolution cards');
}
// A wave reward heals once and renders four unique cards with no weapon navigation.
{
 const g=start(),t=g.api.test;t.set({hp:30,max:100});t.choose('wave');assert.equal(g.api.snapshot().hp,48);
 const cards=g.element('choices').children;assert.equal(cards.length,4);assert.equal(new Set(cards.map(c=>c.dataset.card)).size,4);assert.equal(g.element('pulse-progress').hidden,true);assert.equal(g.element('pulse-progress').children.length,0);cards[0].onclick();assert.equal(g.api.snapshot().hp,48);
}
// Single-shot identity remains: evolved sniper never receives extra chambered
// rounds, and its kill-triggered route creates bounded actual ricochets.
{
 const g=start(),t=g.api.test;evolve(g,4,'lance','echo');const first=target(g,0,0,1),others=[2,4,6,8,10].map(x=>target(g,x,0));aim(g,first);t.shoot();assert.equal(g.api.snapshot().ammo[4],0);assert.equal(g.api.snapshot().arsenalCombat.echoes,4);assert.equal(others.filter(e=>e.hp<e.max).length,4);
}
// Phase charge gets faster while the resource boundary stays exact: one cell
// for a tap, ten for NOVA and all twenty-four for EXPLOSION.
{
 const base=start(),up=start();evolve(up,3,'astra','nova');for(const g of [base,up]){g.api.test.weapon(3);g.step(.35);g.key('KeyR');g.step(.48);}assert(up.api.snapshot().phaseCharge>base.api.snapshot().phaseCharge*1.4);
 for(const count of [1,10,24]){const g=start(),t=g.api.test;evolve(g,3,'astra','nova');target(g,0,0);t.set({ammo:[50,10,6,24,1,6],cool:0});t.firePhase({ammo:count});assert.equal(g.api.snapshot().ammo[3],24-count);assert.equal(g.api.snapshot().phaseSpent,count);assert.equal(g.api.snapshot().ultimateActive,count===24);}
}
// Reactor route rewards movement with the advertised eighteen-cell refill.
{
 const g=start(),t=g.api.test;evolve(g,3,'astra','reactor');const ammo=Array.from(g.api.snapshot().ammo);ammo[3]=0;t.set({ammo,charge:99.99,over:0,x:-5,z:10});g.key('KeyW');g.step(.032);g.dispatchWindow('keyup',{code:'KeyW'});assert(g.api.snapshot().over>0);assert.equal(g.api.snapshot().ammo[3],18);assert(g.element('notice').textContent.includes('+18'));
}
// Seeker uses the faster lock and physical missile velocity, adds actual swarm
// splash, and preserves the hunter route's distinct anti-boss amplification.
{
 const g=start(),t=g.api.test;evolve(g,5,'seeker','swarm');const main=target(g,0,0),near=target(g,3,0);aim(g,main);g.step(.13);assert(g.api.snapshot().seeker.ready>=1,'apex locks in roughly .11 sec');t.shoot();const m=t.seekerDiagnostics()[0],p0=new T.Vector3().fromArray(m.position);g.step(.032);const p1=new T.Vector3().fromArray(t.seekerDiagnostics()[0].position);close(p1.distanceTo(p0)/.032,36,'apex missile speed');g.step(.65);assert(main.hp<main.max);assert(near.hp<near.max,'swarm impact damages a nearby unacquired enemy');
}
for(const exposed of [0,10]){
 const g=start(),t=g.api.test;evolve(g,5,'seeker','hunter');const boss=target(g,0,0,100000,'boss');boss.exposed=exposed;t.aim(0,3,0);g.step(.25);t.set({cool:0});t.shoot();g.step(.8);close(boss.max-boss.hp,84*3.2*1.8*(exposed?1.8:.55),'hunter boss damage');
}
// All evolved hitscan paths and guided missiles continue to respect the arena
// architecture; power cannot turn a wall into a valid target line.
for(const [index,prefix,path] of [[1,'breach','burst'],[2,'rail','siege'],[4,'lance','deadeye'],[5,'seeker','swarm']]){
 const g=start(),t=g.api.test;evolve(g,index,prefix,path);t.set({x:11,z:-3});g.step(.016);const e=target(g,11,-18);aim(g,e);if(index===5)g.step(.3);t.set({cool:0});t.shoot();g.step(.8);assert.equal(e.hp,e.max,`${prefix} blocked by wall`);
}
// Pause freezes transient pool state, and restart clears every weapon's route,
// installed kit and shot counters rather than retaining a prior run's build.
{
 const g=start({mobile:true}),t=g.api.test;evolve(g,2,'rail','prism');target(g,0,0);t.aim(0,1.4,0);g.element('fire').dispatch('pointerdown');g.step(.032);g.element('fire').dispatch('pointerup');const active=g.api.snapshot().heavyEvolution.active;assert(active>0);t.pause();g.step(.8);assert.equal(g.api.snapshot().heavyEvolution.active,active);g.start();assert(g.api.snapshot().arsenal.every(b=>b.tier===0));assert.equal(g.api.snapshot().heavyEvolution.active,0);assert.equal(g.api.snapshot().specialEvolution.active,0);assert.equal(g.api.snapshot().arsenalCombat.shots,0);
}
// Existing purchased common synergies remain useful after weapon conversion.
for(const [index,prefix] of [[1,'breach'],[2,'rail'],[4,'lance']]){
 const g=start(),t=g.api.test;assert(t.installArsenalCard(prefix+'_core'));t.weapon(index);g.step(.35);const a=target(g,0,7),other=target(g,2.5,7);t.set({up:{...g.api.snapshot().upgrades,chain:1}});aim(g,a);t.shoot();close(other.max-other.hp,index===2?14:10,'one common chain per evolved trigger');
}
{
 const g=start(),t=g.api.test;assert(t.installArsenalCard('rail_core'));t.weapon(2);g.step(.35);const a=target(g,0,0,1),others=[3,5,7].map(x=>target(g,x,0));t.set({up:{...g.api.snapshot().upgrades,fork:2}});aim(g,a);t.shoot();assert(a.hp<=0);assert.equal(others.filter(e=>e.hp<e.max).length,2,'common rail fork affects at most two other enemies');
}
{
 const distances=[];for(const level of [0,2]){const g=start(),t=g.api.test;assert(t.installArsenalCard('breach_core'));t.weapon(1);g.step(.35);const a=target(g,0,7);t.set({up:{...g.api.snapshot().upgrades,breach:level}});aim(g,a);t.shoot();distances.push(7-a.mesh.position.z);}assert(distances[1]>distances[0]*1.5,'common breach upgrade increases evolved knockback');
}
// Reconstruction retains the installed form; restart restores the original
// physical socket rather than leaving an invisible extended barrel emitter.
for(const [index,prefix,path] of [[2,'rail','siege'],[5,'seeker','swarm']]){
 const g=start(),t=g.api.test,baseMuzzle=g.api.snapshot().heavyEvolution.models[2].muzzle;evolve(g,index,prefix,path);const upgradedMuzzle=g.api.snapshot().heavyEvolution.models[2].muzzle;t.choose('wave',index);g.element('choices').children.at(-1).onclick();assert.equal(g.api.snapshot().state,'rebuilding');g.step(g.api.snapshot().world.duration+.03);assert.equal(g.api.snapshot().state,'playing');assert.equal(build(g,index).tier,3);const stats=g.api.snapshot();assert((index<3?stats.heavyEvolution:stats.specialEvolution).models[index].meshes>0);if(index===2)assert.deepEqual(Array.from(stats.heavyEvolution.models[2].muzzle),Array.from(upgradedMuzzle));g.start();g.step(.032);assert.deepEqual(Array.from(g.api.snapshot().heavyEvolution.models[2].muzzle),Array.from(baseMuzzle));
}
// The full resource commitment must beat a nearly full NOVA on the same
// target. Measure actual direct plus splash damage, not just configuration.
for(const path of ['nova','reactor']){
 const damage=[];for(const count of [23,24]){const g=start(),t=g.api.test;evolve(g,3,'astra',path);const e=target(g,0,0);aim(g,e);t.set({ammo:[50,10,6,24,1,6],cool:0});t.firePhase({ammo:count});damage.push(e.max-e.hp);assert.equal(g.api.snapshot().phaseSpent,count);}assert(damage[1]>damage[0],`${path}: full EXPLOSION ${damage[1]} must exceed 23-cell NOVA ${damage[0]}`);
}
// The standalone sniper belongs to the camera, so explicitly check its whole
// parent is hidden after Home rather than only removing the evolution kit.
{
 const g=start(),t=g.api.test;evolve(g,4,'lance','deadeye');const weapon=t.arsenalVisuals().special.roots[4].parent;assert(weapon.visible);g.element('home').onclick();g.step(.032);assert.equal(g.api.snapshot().state,'menu');assert.equal(weapon.visible,false,'sniper cannot remain floating over title menu');
}
console.log('ARSENAL INTEGRATION: all 10 three-card routes, card focus safety, real damage/ammo/reload/models, precise phase costs/refill/charge, seeker splash/boss/velocity, walls, PC/mobile/easy, pause and clean restart passed');
