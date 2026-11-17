const assert=require('node:assert/strict');
const THREE=require('three');
const load=require('./headless-runtime.cjs');
const near=(a,b,eps=1e-7,message='values match')=>assert(Math.abs(a-b)<=eps,`${message}: ${a} vs ${b}`);
function boot(seed=1122){const g=load({difficulty:'x',seed});g.start();const t=g.api.test;t.advance();t.set({hp:10000,inv:10000,xpNeed:100000});g.step(2);t.holdSpawns();for(const e of t.rushEnemies())if(!e.xChronarch&&!e.xSeal){e.tutorialDummy=true;e.cd=999;}return g;}
const bossOf=g=>g.api.test.rushEnemies().find(e=>e.xChronarch&&e.hp>0);
const sealsOf=g=>g.api.test.rushEnemies().filter(e=>e.xSeal&&e.hp>0);
function breakSeals(g){for(const e of sealsOf(g))g.api.test.damage(e,100000,false);}
function nextPhase(g){breakSeals(g);const b=bossOf(g);g.api.test.damage(b,1e9,false);g.step(.672);}
function aimAt(g,e,weapon,distance){const t=g.api.test;t.weapon(weapon);t.set({x:e.mesh.position.x,z:e.mesh.position.z+distance,y:e.mesh.position.y-1.65,grounded:false,vy:0,cool:0,reload:0,inv:10000});t.update(.001);t.aim(e.mesh.position.x,e.mesh.position.y,e.mesh.position.z);t.set({cool:0,reload:0});}
{
 const g=load({difficulty:'x',seed:42});g.start();const t=g.api.test;t.xDirector().seconds=2;t.advance();assert.equal(g.api.snapshot().xMode.seconds,35,'the final vault provides35 seconds even after a low-time entry');assert.equal(g.api.snapshot().world.wave,10);
}
{
 const g=boot(),t=g.api.test,b=bossOf(g),seals=sealsOf(g),s=g.api.snapshot();
 assert.equal(s.wave,6);assert.equal(s.world.wave,10);assert(s.xMode.seconds>=35);assert.equal(s.bossRush.active,false);assert.equal(seals.length,2);assert.equal(b.r,2.3);
 for(const e of seals){assert.equal(e.r,.85);assert.equal(e.hp,90);assert(!e.xBounty,'seals do not enter ordinary carrier lottery');e.mesh.updateWorldMatrix(true,true);const root=e.mesh.position.clone();let radius=0;e.mesh.traverse(o=>{if(!o.isMesh)return;const p=o.geometry.attributes.position,v=new THREE.Vector3();for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).applyMatrix4(o.matrixWorld);radius=Math.max(radius,v.distanceTo(root));}});assert(radius<=e.r*1.15+.02,`seal visual stays within practical hit sphere (${radius})`);}
 const hp=b.hp;t.damage(b,1e9,true,{direct:true,attackId:1,weapon:0});assert.equal(b.hp,hp,'sealed core blocks all direct damage');
 const beforeKills=s.xMode.kills;t.xMutation('bounty');t.xDirector().seconds=10;t.xDirector().charge=0;t.damage(seals[0],100000,false);near(t.xDirector().seconds,14);near(t.xDirector().charge,18);assert.equal(t.xDirector().kills,beforeKills+1);t.damage(seals[0],100000,false);near(t.xDirector().seconds,14);assert.equal(t.xDirector().kills,beforeKills+1,'seal reward is credited exactly once');
}
{
 const g=boot(123),t=g.api.test,b=bossOf(g);let expectedSeals=0;
 for(let phase=0;phase<3;phase++){
  assert.equal(t.xChronarch().phase,phase);assert.equal(t.xChronarch().mode,'sealed');assert.equal(sealsOf(g).length,2);breakSeals(g);expectedSeals+=2;assert.equal(t.xChronarch().mode,'open');assert.equal(b.exposed,999);t.damage(b,1e9,false);near(b.hp,t.xChronarch().hp,1e-9,'rendered enemy HP exactly follows controller clamp');near(b.hp,1700*(2-phase)/3,1e-8,'one large hit never crosses multiple phases');
  if(phase<2){assert.equal(t.xChronarch().mode,'transition');const hp=b.hp;t.damage(b,1e9,false);assert.equal(b.hp,hp,'phase transition blocks overflow and a second shot');g.step(.32);assert.equal(sealsOf(g).length,0);g.step(.352);assert.equal(sealsOf(g).length,2);}
 }
 assert.equal(expectedSeals,6);assert.equal(t.xChronarch().totalBroken,6);assert.equal(b.hp,0,'last third reaches exact zero rather than a positive floating remainder');assert.equal(t.xChronarch().defeated,true);for(const e of [...t.rushEnemies()])if(e.hp>0)t.damage(e,100000,false);g.step(1.4);assert.equal(g.api.snapshot().state,'victory');assert.equal(t.xHazards().length,0);assert.equal(t.xBullets().length,0);assert.equal(sealsOf(g).length,0);g.element('home').onclick();assert.equal(t.rushEnemies().length,0);assert.equal(t.xChronarch().active,false);
}
{
 const g=boot(234),t=g.api.test;breakSeals(g);t.xDirector().charge=100;t.xBreak();t.damage(bossOf(g),1e9,false);g.step(.32);near(t.xChronarch().transition,.33,.001);assert.equal(sealsOf(g).length,0);t.pause();const before=g.api.snapshot().xMode.seconds;g.step(2);near(t.xChronarch().transition,.33,.001);near(g.api.snapshot().xMode.seconds,before);g.element('resume').onclick();g.step(.352);assert.equal(sealsOf(g).length,2,'seals reveal after .65 real seconds even during BREAK');const attacks=t.xChronarch().attacks;g.step(.5);assert.equal(t.xChronarch().attacks,attacks,'BREAK still slows attacks after real-time seal reveal');
}
{
 const g=boot(345),t=g.api.test;nextPhase(g);const c=t.xChronarch();assert.equal(c.phase,1);t.xHazards().splice(0);t.xBullets().splice(0);c.attackTimer=.01;t.update(.02);const marks=t.xHazards().filter(h=>h.kind==='strike');assert.equal(marks.length,2);assert.equal(marks[0].damage,20);const m=marks[0];t.set({x:m.mesh.position.x,z:m.mesh.position.z,y:t.stageHeight(m.mesh.position.x,m.mesh.position.z),grounded:true,hp:1000,inv:0});t.update(.85);near(g.api.snapshot().hp,980,1e-6,'time marks apply actual20 damage');
 nextPhase(g);assert.equal(c.phase,2);t.xHazards().splice(0);t.xBullets().splice(0);c.attackTimer=.01;c.phaseAttacks=1;t.set({x:0,z:0,y:0,hp:1000,inv:0,grounded:true});t.update(.02);const laser=t.xHazards().find(h=>h.kind==='laser');assert(laser);assert.equal(laser.damage,22);t.update(.85);near(g.api.snapshot().hp,978,1e-6,'clock laser applies actual22 damage');
}
{
 for(const weapon of [0,1,5]){const g=boot(500+weapon),t=g.api.test,e=sealsOf(g)[0];aimAt(g,e,weapon,weapon===1?4:12);const hp=e.hp;if(weapon===5){g.step(.35);assert(g.api.snapshot().seeker.ready>0,'seeker can lock a time seal');t.shoot();g.step(.9);}else t.shoot();assert(e.hp<hp,`weapon${weapon} actually hits a time seal`);}
}
{
 const g=boot(567),t=g.api.test,e=sealsOf(g)[0];e.hp=e.max=10000;aimAt(g,e,1,4);const p=e.mesh.position.clone();t.shoot();near(e.mesh.position.distanceTo(p),0,1e-9,'shotgun displacement never moves a seal');
 t.set({x:p.x,y:p.y-1,z:p.z,up:{ram:1,capacitor:1},grounded:false,vy:0,dash:0,charge:99.9});const a=e.mesh.position.clone();t.dash();t.update(.016);assert(e.mesh.position.distanceTo(a)<.05,'RAM/capacitor leave seals on their bounded orbit');
}
{
 const g=boot(678),t=g.api.test;t.xDirector().seconds=.01;g.step(.032);assert.equal(g.api.snapshot().state,'dead');g.element('restart').onclick();assert.equal(g.api.snapshot().wave,1);assert.equal(t.xChronarch().mode,'inactive');assert(!t.rushEnemies().some(e=>e.xChronarch||e.xSeal));t.advance();t.set({inv:10000});g.step(.6);assert(bossOf(g));g.element('home').onclick();assert.equal(t.rushEnemies().length,0);assert.equal(t.xHazards().length,0);assert.equal(t.xBullets().length,0);assert.equal(g.api.snapshot().queue,0);g.element('difficulty').value='normal';g.element('start').onclick();t.advance();assert.equal(g.api.snapshot().bossRush.active,true);assert(!t.rushEnemies().some(e=>e.xChronarch||e.xSeal));const easy=load({difficulty:'easy',seed:678});easy.start();easy.api.test.advance();easy.step(.6);assert(!easy.api.test.rushEnemies().some(e=>e.xChronarch||e.xSeal));
}
{
 const g=load({difficulty:'x',seed:98765});g.start();const t=g.api.test;let previous=g.api.snapshot().world.wave,safety=0,seenFive=false,rebuiltSix=false;
 while(!['victory','dead'].includes(g.api.snapshot().state)&&safety++<1500){t.set({hp:10000,inv:10000});const s=g.api.snapshot();if(s.state==='playing'){g.step(.16);if(g.api.snapshot().state==='playing')for(const e of [...t.rushEnemies()])if(e.hp>0)t.damage(e,100000,false);if(g.api.snapshot().wave===5){seenFive=true;assert.notEqual(g.api.snapshot().world.wave,10,'vault5 reserves the boss basin to avoid consecutive repetition');}}else if(s.state==='upgrade'){assert(g.element('choices').children.length>0);g.element('choices').children[0].onclick();}else if(s.state==='rebuilding'){const target=s.world.target;assert.notEqual(target,previous);if(s.wave===5){assert.equal(target,10);rebuiltSix=true;}g.step(s.world.duration+.016);assert.equal(g.api.snapshot().world.wave,target);previous=target;}else assert.fail(s.state);}
 assert(safety<1500);assert.equal(g.api.snapshot().state,'victory');assert(seenFive&&rebuiltSix);assert.equal(t.xChronarch().totalBroken,6);assert.equal(g.api.snapshot().wave,6);
}
{
 const g=boot(887),t=g.api.test,b=bossOf(g);for(const e of [...t.rushEnemies()])if(!e.xChronarch&&!e.xSeal)t.damage(e,100000,false);const y=t.stageHeight(0,-12);t.set({x:0,z:-12,y,grounded:true,dash:0,inv:10000});t.xDirector().charge=100;t.xBreak();t.dash();t.xProjectile({mesh:{position:new THREE.Vector3(1,y+1,-12)}},new THREE.Vector3(1,0,0),1);const hp=b.hp;t.update(.01);assert.equal(g.api.snapshot().xMode.reflected,1);assert.equal(b.hp,hp,'reflected auto-target never wastes a shot on the sealed core');assert.equal(sealsOf(g).length,1,'the countershot picks a visible vulnerable seal instead');
}
console.log('X CHRONARCH INTEGRATION: final basin/cinematic, seal hit geometry/real weapons, guarded phases/exact HP, six seals/rewards, real-time reveal vs BREAK attacks, mark20/laser22 damage, immutable orbit, full campaign, victory/restart/home and normal/easy isolation passed');
