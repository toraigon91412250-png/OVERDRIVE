const assert=require('node:assert/strict'),vm=require('node:vm'),{buildSync}=require('esbuild'),T=require('three');
const loadGame=require('./headless-runtime.cjs');
const v=(x=0,y=0,z=0)=>new T.Vector3(x,y,z),plain=x=>JSON.parse(JSON.stringify(x));
const near=(a,b,epsilon=1e-6,message='values match')=>assert(Math.abs(a-b)<=epsilon,`${message}: ${a} vs ${b}`);
function loadModule(path){const m={exports:{}};vm.runInNewContext(buildSync({entryPoints:[path],bundle:true,format:'cjs',external:['three'],write:false}).outputFiles[0].text,{module:m,exports:m.exports,require});return m.exports;}
// Projectile callbacks represent actual impact, never target-lock sensing.
{
 const {createSeekerSystem}=loadModule('src/seeker-system.js'),events=[];
 const plane=(o,d,r)=>{const at=(-5-o.z)/d.z;return Number.isFinite(at)&&at>=0&&at<=r?at:Infinity;};
 const seeker=createSeekerSystem(new T.Scene(),{wallDistance:plane,onHit:()=>{},onWallHit:event=>events.push(event)});
 const camera=new T.PerspectiveCamera();camera.position.set(0,0,0);camera.lookAt(0,0,-1);camera.updateMatrixWorld(true);
 for(let i=0;i<3;i++)seeker.updateLocks(.1,{active:true,camera,enemies:[],ammo:6});assert.equal(events.length,0,'lock visibility queries never fracture cover');
 seeker.launch({origins:[v(),v(),v()],directions:[v(0,0,-1),v(0,0,-1),v(0,0,-1)],ammo:6});assert.equal(events.length,0,'launch does not damage a wall before the missile arrives');
 seeker.update(.1,[]);assert.equal(events.length,0);seeker.update(.1,[]);assert.equal(events.length,1);near(events[0].point.z,-5);assert(events[0].damage>0);assert(events[0].range>0);seeker.update(1,[]);assert.equal(events.length,1,'retired missile does not repeat wall damage');
 const {createOmegaCombat}=loadModule('src/omega-combat.js'),{omegaBuild}=loadModule('src/omega-weapon.js');
 for(let core=0;core<5;core++){
  const hits=[],combat=createOmegaCombat({getEnemies:()=>[],wallDistance:plane,wallHit:(o,d,r)=>{const distance=plane(o,d,r);return Number.isFinite(distance)?{distance,normal:v(0,0,1)}:null;},damage:()=>{},onWallHit:e=>hits.push(e)});
  combat.update(.1);assert.equal(hits.length,0);combat.fire({build:omegaBuild({core}),origin:v(),muzzle:v(),direction:v(0,0,-1)});
  if(core>=3)assert.equal(hits.length,0,'simulated projectiles cannot fracture cover at trigger time');for(let i=0;i<100;i++)combat.update(.016);
  assert.equal(hits.length,1,`generated core ${core} reports exactly one actual cover impact`);near(hits[0].point.z,-5,.08);assert(hits[0].damage>0);
  const openHits=[],open=createOmegaCombat({getEnemies:()=>[],wallDistance:(_o,_d,range)=>range,damage:()=>{},onWallHit:e=>openHits.push(e)});open.fire({build:omegaBuild({core}),origin:v(),muzzle:v(),direction:v(0,0,-1)});for(let i=0;i<200;i++)open.update(.016);assert.equal(openHits.length,0,'open maximum-range sentinels are not wall impacts');
 }
}
function start(difficulty='fracture',seed=1234,mobile=false){const g=loadGame({difficulty,seed,mobile});g.start();g.step(.016);if(g.api.snapshot().state==='upgrade')g.element('choices').children[0].onclick();g.step(.016);return g;}
function cleanArena(g){const t=g.api.test;t.clearEnemies();t.holdSpawns();t.raidDirector().active=false;t.setStage(1);t.set({x:0,y:0,z:6,vy:0,grounded:true,hp:100,max:100,inv:0,dashing:0,over:0,cool:0,reload:0});g.step(.016);t.kinetic().reset();return t;}
function incoming(t,x,y,z,dx,dy,dz,speed=100){t.xProjectile({mesh:{position:v(x,y,z)}},v(dx,dy,dz),speed);}
function store(t,count){const arm=t.kinetic();arm.reset();assert.equal(arm.press().type,'catch');for(let i=0;i<count;i++)assert(arm.capture());return arm;}
function dummy(t,x,z,y=1){const e=t.spawn('shooter',x,z);e.mesh.position.set(x,y,z);e.hp=e.max=1000;e.tutorialDummy=true;e.cd=9999;return e;}
{
 const g=start(),t=cleanArena(g);g.key('KeyF');assert(t.kinetic().snapshot().window>0);incoming(t,0,.9,1,0,0,1);g.step(.016);assert.equal(t.kinetic().snapshot().stored,1,'a swept incoming front bullet is caught');assert.equal(t.xBullets().length,0);near(g.api.snapshot().hp,100);assert(t.set({}).inv<=0,'capture does not grant invulnerability');
 const window=t.kinetic().snapshot().window;t.pause();g.step(.5);near(t.kinetic().snapshot().window,window,1e-8,'pause freezes the catch window');g.element('resume').onclick();g.step(.032);assert(t.kinetic().snapshot().window<window);
}
{
 const g=start(),t=cleanArena(g);g.key('KeyF');incoming(t,0,.9,11,0,0,-1);g.step(.08);assert.equal(t.kinetic().snapshot().stored,0,'rear bullets bypass the front catch cone');assert(g.api.snapshot().hp<100,'a rear hit still hurts without invulnerability');
 const h=start(),u=cleanArena(h);incoming(u,0,.9,1,0,0,1);h.step(.08);assert.equal(u.kinetic().snapshot().stored,0);assert(h.api.snapshot().hp<100,'an unopened catch window provides no passive shield');
}
{
 const g=start(),t=cleanArena(g);t.set({dashing:.19,inv:0});incoming(t,0,.9,11,0,0,-1);g.step(.064);assert.equal(t.kinetic().snapshot().stored,1,'dash captures a nearby rear projectile');near(g.api.snapshot().hp,100);assert(t.set({}).inv<=0);
 const h=start(),u=cleanArena(h);h.key('KeyF');for(let i=0;i<7;i++)incoming(u,0,.9,2.2,0,0,1,20);h.step(.016);assert.equal(u.kinetic().snapshot().stored,6,'capture capacity cannot exceed six');
}
{
 const g=start(),t=cleanArena(g),targets=[dummy(t,0,-2),dummy(t,.8,-4),dummy(t,-.8,-6)],outside=dummy(t,8,-2);t.aim(0,1,-4);store(t,3);const before=g.api.snapshot(),beforeAmmo=plain(before.ammo),beforeTimer=before.omega.raid.elapsed;t.kineticPress();const total=targets.reduce((sum,e)=>sum+1000-e.hp,0);near(total,126,.0001,'three captured cells deal 42 each through the real damage path');assert(targets.every(e=>e.hp<1000),'a three-cell salvo spreads to up to three visible targets');near(outside.hp,1000,1e-8,'return does not auto-target outside the aim cone');assert.equal(t.kinetic().snapshot().stored,0);assert.deepEqual(plain(g.api.snapshot().ammo),beforeAmmo,'returning bullets does not recharge gun magazines');near(g.api.snapshot().omega.raid.elapsed,beforeTimer,1e-8);near(g.api.snapshot().hp,before.hp);const hp=targets.map(e=>e.hp);t.kineticPress();assert.deepEqual(targets.map(e=>e.hp),hp,'release cooldown prevents a second free attack');
}
function coverSetup(seed=1234){const g=start('fracture',seed),t=g.api.test;t.clearEnemies();t.holdSpawns();t.raidDirector().active=false;const cover=g.api.snapshot().world.cover;assert(cover.enabled&&cover.walls.length,'fracture arenas provide destructible cover');const w=cover.walls.find(w=>!w.destroyed),axis=w.w<=w.d?'x':'z',origin=v(w.x,w.base+1.65,w.z),behind=v(w.x,w.base+1.65,w.z);origin[axis]+=(axis==='x'?w.w:w.d)/2+3;behind[axis]-=(axis==='x'?w.w:w.d)/2+3;t.set({x:origin.x,y:w.base,z:origin.z,vy:0,grounded:false,hp:100,max:100,inv:10000,dashing:0,over:0,cool:0,reload:0});g.step(.016);return{g,t,w,origin,behind};}
{
 const {g,t,w,behind}=coverSetup(),e=dummy(t,behind.x,behind.z,behind.y);t.aim(e.mesh.position.x,e.mesh.position.y,e.mesh.position.z);store(t,1);t.kineticPress();near(e.hp,1000,1e-6,'one returned round cannot damage a target through intact cover');let cover=g.api.snapshot().world.cover;assert(cover.walls[w.index].hp<72);assert.equal(cover.walls[w.index].destroyed,false);store(t,6);t.kineticPress();cover=g.api.snapshot().world.cover;assert(cover.walls[w.index].destroyed,'a full six-cell return fractures the aimed cover');assert.equal(cover.walls[w.index].colliderEnabled,false);assert(cover.shards<=cover.shardLimit,'fracture effects remain inside their pool');
}
{
 const {g,t,w,behind}=coverSetup(99991);t.omegaSelect(0);t.set({cool:0,reload:0});t.aim(w.x,w.base+1.65,w.z);let shots=0;while(!g.api.snapshot().world.cover.walls[w.index].destroyed&&shots++<30){t.set({cool:0,reload:0});t.shoot();}assert(g.api.snapshot().world.cover.walls[w.index].destroyed,'ordinary rifle fire opens destructible cover');const enemy=dummy(t,behind.x,behind.z,behind.y);t.aim(enemy.mesh.position.x,enemy.mesh.position.y,enemy.mesh.position.z);t.set({cool:0,reload:0});t.shoot();assert(enemy.hp<1000,'a subsequent rifle ray reaches the enemy through the opened wall');
}
// Each actual weapon path must reach cover, including physical missile/core flights
// and the conventional guns' evolved tracing path.
{
 const coreIds=['pulse_core','breach_core','rail_core','astra_core','lance_core','seeker_core'];
 const cases=[...Array.from({length:6},(_,weapon)=>({weapon,evolved:false})),...Array.from({length:6},(_,weapon)=>({weapon,evolved:true})),...Array.from({length:5},(_,core)=>({weapon:6,core}))];
 for(const test of cases){const {g,t,w,origin}=coverSetup(1234),id=test.weapon;t.omegaSelect(id);if(id===6)t.omegaDescriptor({core:test.core,feed:1});if(test.evolved)assert(id===0?t.installPulseCard(coreIds[id]):t.installArsenalCard(coreIds[id]));let attempts=0;
  while(!g.api.snapshot().world.cover.walls[w.index].destroyed&&attempts++<12){t.set({x:origin.x,y:w.base,z:origin.z,vy:0,grounded:false,cool:0,reload:0});g.step(.016);t.aim(w.x,w.base+1.65,w.z);t.set({cool:0,reload:0});if(id===3)t.firePhase({kind:'bolt',ammo:1});else t.shoot();g.step(id>=5?.4:.016);}
  assert(g.api.snapshot().world.cover.walls[w.index].destroyed,`weapon ${id}${test.evolved?' evolved':''}${id===6?' core '+test.core:''} fractures cover through its actual attack simulation`);
 }
}
{
 const g=start(),t=cleanArena(g);store(t,2);t.omegaShift();assert.equal(g.api.snapshot().state,'rebuilding');assert.equal(t.kinetic().snapshot().stored,0,'a new world clears stored hostile energy');g.step(g.api.snapshot().world.duration+.08);assert.equal(g.api.snapshot().state,'playing');store(t,2);g.element('home').onclick();assert.equal(t.kinetic().snapshot().stored,0,'returning to title clears stored energy');assert.equal(g.element('kinetic-hud').hidden,true);
 for(const difficulty of ['omega','normal','easy','x']){const h=start(difficulty),u=h.api.test;const before=h.api.snapshot();h.key('KeyF');h.element('kinetic-action').dispatch('click');assert.equal(u.kinetic().snapshot().stored,0);assert.equal(u.kinetic().snapshot().window,0,`${difficulty} does not activate the fracture glove`);assert.equal(h.element('kinetic-hud').hidden,true);assert.equal(h.api.snapshot().world.cover.enabled,false);assert.equal(h.api.snapshot().state,before.state);}
}
// Exercise the new difficulty's complete inherited raid lifecycle, then verify
// that its record and title preview stay independent from the published Omega.
{
 const g=start('fracture',654321),t=g.api.test;t.set({hp:10000,inv:10000});
 for(let core=1;core<=5;core++){t.clearEnemies();t.holdSpawns();t.raidStart('breach');for(const target of [...t.raidTargets()])t.damage(target.enemy,100000,false);assert.equal(g.api.snapshot().omega.raid.cores,core);t.raidTick(20);assert.equal(g.api.snapshot().state,'rebuilding');g.step(g.api.snapshot().world.duration+.08);assert.equal(g.api.snapshot().state,'playing');}
 const reached=g.api.snapshot();assert.equal(reached.omega.raid.kind,'boss');assert.equal(reached.wave,6);const bosses=t.rushEnemies().filter(e=>e.hp>0&&e.type==='boss');assert.equal(bosses.length,1,'Sigma creates one final boss after five actual completed contracts');t.damage(bosses[0],100000,false);assert.equal(g.api.snapshot().state,'victory');assert.match(g.element('paneltag').textContent,/^Σ /);assert.equal(g.element('kinetic-hud').hidden,true,'victory clears the kinetic HUD');
 g.element('home').onclick();assert.match(g.element('record').textContent,/^Σ BEST .*CLEARS 1$/);assert.equal(g.element('rift-mode-name').textContent,'FRACTURE RAID');assert.equal(g.element('rift-emblem').textContent,'Σ');assert.match(g.element('difficulty-summary').textContent,/^Σ /);
 g.element('difficulty').value='omega';g.element('difficulty').dispatch('change');assert.match(g.element('record').textContent,/^Ω RAID BEST .*CLEARS 0$/,'Sigma victories do not alter old Omega records');assert.equal(g.element('rift-mode-name').textContent,'RIFT RAID');assert.equal(g.element('rift-emblem').textContent,'Ω');assert.match(g.element('difficulty-summary').textContent,/^Ω /);assert.equal(g.document.body.classList.contains('fracture-preview'),false);
 g.element('difficulty').value='fracture';g.element('difficulty').dispatch('change');assert.match(g.element('record').textContent,/^Σ BEST .*CLEARS 1$/,'Sigma keeps its own completed run when previews switch');
 const fs=require('node:fs'),markup=fs.readFileSync('src/omega-ui.html','utf8')+fs.readFileSync('src/shell.html','utf8');for(const id of ['rift-mode-name','rift-emblem','kinetic-action'])assert(markup.includes('id="'+id+'"'),`real HTML contains ${id}`);assert(markup.includes('value="fracture"'),'the new difficulty is selectable in real HTML');
}
console.log('FRACTURE COMBAT: actual projectile-only wall callbacks, swept front/dash catches, rear-hit risk, finite capacity/cooldown, pause/reset, three-target cover-aware return, six-cell fracture, rifle-opened fire lanes, full Sigma boss victory, separate records/previews and prior-mode isolation passed');
