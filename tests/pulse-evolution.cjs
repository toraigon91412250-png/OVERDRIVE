const assert=require('node:assert/strict'),T=require('three');
const load=require('./headless-runtime.cjs');
const close=(a,b)=>assert(Math.abs(a-b)<1e-6,`${a} != ${b}`);
function start(options={}){const g=load({seed:123456,...options});g.start();if(options.difficulty==='easy')g.element('tutorial-skip').dispatch('click');g.step(.032);g.api.test.clearEnemies();g.api.test.holdSpawns();g.element('assist').checked=false;return g;}
function evolve(g,path='arc',tier=3){const t=g.api.test;assert(t.installPulseCard('pulse_core'));if(tier>=2)assert(t.installPulseCard('pulse_'+path));if(tier>=3)assert(t.installPulseCard('pulse_apex'));g.step(.7);}
function target(g,x,z,hp=10000,type='chaser'){const e=g.api.test.spawn(type,x,z);e.hp=e.max=hp;e.mesh.position.y=1.4;e.tutorialDummy=true;e.cd=999;return e;}
function fire(g,x=0,z=0){const t=g.api.test;t.aim(x,1.4,z);t.set({cool:0});t.shoot();}
// Actual card screens offer a complete, exclusive and reachable 3-pick route.
for(const path of ['arc','lance'])for(const difficulty of ['normal','easy']){
 const g=start({difficulty}),t=g.api.test;
 const pick=id=>{let card;for(let i=0;i<100&&!card;i++){t.choose('level');const cards=g.element('choices').children;assert.equal(cards.length,4);card=cards.find(b=>b.dataset.card===id);}assert(card,id);card.onclick();card.onclick();};
 assert.equal(t.installPulseCard('pulse_apex'),false);
 pick('pulse_core');assert.equal(g.api.snapshot().pulse.tier,1);assert.equal(g.api.snapshot().ammo[0],64);
 pick('pulse_'+path);
 assert.equal(t.installPulseCard(path==='arc'?'pulse_lance':'pulse_arc'),false);
 pick('pulse_apex');assert.equal(g.api.snapshot().pulse.tier,3);assert.equal(g.api.snapshot().weaponMags[0],100);
 t.choose('level');assert(!g.element('choices').children.some(b=>b.dataset.card.startsWith('pulse_')));
}
// Each stage changes real damage, distance, fire cadence, magazines and reloads.
for(const difficulty of ['normal','easy'])for(const tier of [0,1,2,3]){
 const g=start({difficulty,mobile:true}),t=g.api.test;if(tier)evolve(g,'arc',tier);const b=t.pulseBuild();
 close(t.pulseDamageAt(12),7*[1,1.9,2.8,4.3][tier]*(difficulty==='easy'?16/7:1));
 const e=target(g,0,0);fire(g);close(10000-e.hp,t.pulseDamageAt(12)*1);close(g.api.snapshot().cool,b.rate);
 const ammo=Array.from(g.api.snapshot().ammo);ammo[0]=0;t.set({ammo,cool:0});t.shoot();close(g.api.snapshot().reloading,b.reload*(difficulty==='easy'?.55:1));
 const m=t.pulseModel();g.step(b.reload*(difficulty==='easy'?.55:1)*.45);if(tier){const form=m.forms.get(`${b.tier}:${b.path}`);assert(form.magazine.position.y<-.05,'empty-trigger reload animates evolved magazine');}
 g.step(b.reload+1);assert.equal(g.api.snapshot().ammo[0],b.mag);
}
// Arc kills create five unique hops with 140% damage; ordinary hits create three.
for(const lethal of [false,true]){
 const g=start(),t=g.api.test;evolve(g);const a=target(g,0,0,lethal?1:10000),others=[2,4,6,8,10,12].map(x=>target(g,x,0));fire(g);
 const hit=others.filter(e=>e.hp<10000);assert.equal(hit.length,lethal?5:3);assert.equal(g.api.snapshot().pulse.arcs,hit.length);
 for(const e of hit)close(10000-e.hp,t.pulseDamageAt(12)*(lethal?1.4:.85));
 assert(g.api.snapshot().pulseEffects.active>0);assert.equal(g.api.snapshot().pulseEffects.drawObjects,4);assert(g.api.snapshot().pulseEffects.active<=g.api.snapshot().pulseEffects.capacity);
 if(lethal){assert(a.hp<=0);assert.equal(g.api.snapshot().kills,1);assert.equal(g.api.snapshot().pickups,1);}
}
// Electric hops and focused cannon both respect arena walls.
{
 const g=start(),t=g.api.test;evolve(g);t.set({x:11,z:-3});g.step(.016);const a=target(g,11,-7,1),hidden=target(g,11,-18);fire(g,11,-7);assert(a.hp<=0);assert.equal(hidden.hp,10000);
}
for(const tier of [2,3]){
 const g=start(),t=g.api.test;evolve(g,'lance',tier);const front=target(g,0,0),back=target(g,0,-5);const b=t.pulseBuild();
 for(let i=0;i<b.hitsNeeded;i++)fire(g);
 assert(g.api.snapshot().pulse.ready);assert.equal(back.hp,10000,'regular shots do not pierce');
 const before=front.hp;fire(g);assert.equal(g.api.snapshot().pulse.cannons,1);assert.equal(g.api.snapshot().pulse.hits,0);
 close(before-front.hp,7*b.power*(tier===3?8:5));close(10000-back.hp,7*b.power*(tier===3?8:5));
 // A ready cannon is retained across misses, reload and weapon swaps, then resets at restart.
 for(let i=0;i<b.hitsNeeded;i++)fire(g);t.weapon(1);g.step(.2);t.weapon(0);g.step(.2);assert(g.api.snapshot().pulse.ready);
 t.set({x:11,z:-3});g.step(.016);const wallFront=target(g,11,-7),wallBack=target(g,11,-18);fire(g,11,-7);assert(wallFront.hp<10000);assert.equal(wallBack.hp,10000);
 g.api.test.pause();const active=g.api.snapshot().pulseEffects.active;g.step(.5);assert.equal(g.api.snapshot().pulseEffects.active,active);g.start();assert.equal(g.api.snapshot().pulse.tier,0);assert.equal(g.api.snapshot().pulse.cannons,0);assert.equal(g.api.snapshot().pulseEffects.active,0);
}
// Boss windows and existing attack cards apply to the cannon and electric hops.
for(const exposed of [0,10]){
 const g=start(),t=g.api.test;evolve(g,'lance');target(g,0,0);for(let i=0;i<4;i++)fire(g);t.clearEnemies();const boss=target(g,0,0,10000,'boss');boss.exposed=exposed;fire(g);close(10000-boss.hp,7*4.3*8*(exposed?1.8:.55));
}
// Mobile uses the same progression and can continuously fire/reload the final form.
{
 const g=start({mobile:true}),t=g.api.test;evolve(g,'lance');const e=target(g,0,0,100000);t.aim(0,1.4,0);g.element('fire').dispatch('pointerdown');g.step(.8);g.element('fire').dispatch('pointerup');assert(e.hp<100000);assert(g.api.snapshot().pulse.cannons>=1);assert.equal(g.element('pulse-hud').hidden,false);
 t.weapon(1);g.step(.2);assert.equal(g.element('pulse-hud').hidden,true);
}
// Three real card rewards, including queued level rewards, finish before the
// world reconstruction starts, and the evolved gun survives the transition.
{
 const g=start(),t=g.api.test;t.installPulseCard('pulse_core');t.installPulseCard('pulse_arc');t.installPulseCard('pulse_apex');t.gainXP(30);t.choose('wave');g.element('choices').children[0].onclick();assert.equal(g.api.snapshot().state,'upgrade');assert.equal(g.api.snapshot().world.active,false);g.element('choices').children[0].onclick();assert.equal(g.api.snapshot().state,'rebuilding');g.step(g.api.snapshot().world.duration+.02);assert.equal(g.api.snapshot().wave,2);assert.equal(g.api.snapshot().pulse.tier,3);
}
// Full geometry is finite and bounded. Project the actual posed gun/socket on
// PC, landscape phone and portrait phone without pretending this is WebGL QA.
let maximumTriangles=0,maximumMeshes=0;
for(const [mobile,aspect] of [[false,16/9],[true,844/390],[true,390/844]])for(const [tier,path] of [[1,null],[2,'arc'],[3,'arc'],[2,'lance'],[3,'lance']]){
 const g=start({mobile}),t=g.api.test;evolve(g,path||'arc',tier);const root=t.pulseRoot(),model=t.pulseModel(),camera=root.parent.parent;
 camera.aspect=aspect;camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
 const form=model.forms.get(`${tier}:${path}`),point=new T.Vector3();let minY=Infinity,visible=0;
 form.g.traverse(o=>{if(!o.isMesh)return;for(let i=0;i<o.geometry.attributes.position.count;i++){point.fromBufferAttribute(o.geometry.attributes.position,i);assert(Number.isFinite(point.x)&&Number.isFinite(point.y)&&Number.isFinite(point.z));point.applyMatrix4(o.matrixWorld).project(camera);minY=Math.min(minY,(1-point.y)/2);if(Math.abs(point.x)<1&&Math.abs(point.y)<1)visible++;}});
 assert(minY>.53,`sightline blocked: ${tier}:${path} ${minY}`);assert(visible>500);
 point.fromArray(model.stats().muzzle).applyMatrix4(root.matrixWorld).project(camera);assert(Math.abs(point.x)<.9&&point.y<-.05&&point.y>-.8,'actual emitting muzzle remains in lower viewport');
 const stats=model.stats();maximumMeshes=Math.max(maximumMeshes,stats.meshes);maximumTriangles=Math.max(maximumTriangles,stats.triangles);assert(stats.meshes<=32);assert(stats.triangles<=20000);
}
console.log(`PULSE EVOLUTION: 3-card exclusive routes, actual damage/chain/piercing, walls, reload animation, PC/mobile, rewards/reconstruction, boss, pause/reset, finite geometry/framing passed (${maximumMeshes} meshes / ${maximumTriangles} triangles max)`);
