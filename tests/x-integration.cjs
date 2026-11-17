const assert=require('node:assert/strict');
const THREE=require('three');
const load=require('./headless-runtime.cjs');
const near=(a,b,epsilon=1e-6,message='values match')=>assert(Math.abs(a-b)<=epsilon,`${message}: ${a} vs ${b}`);
function start(seed=12345){const g=load({difficulty:'x',seed});g.start();return g;}
function keep(g,{stage=10}={}){const t=g.api.test;t.clearEnemies();t.holdSpawns();if(stage)t.setStage(stage);t.set({hp:10000,inv:10000});const e=t.spawn('chaser',16,16);e.tutorialDummy=true;e.cd=999;return e;}
{
 const signatures=new Set();for(const seed of [1,2,3,11,4321,8675309,123456789]){const g=start(seed),s=g.api.snapshot();signatures.add(s.xMode.signature);assert(s.world.wave>=9&&s.world.wave<=16);assert.equal(s.wave,1);assert.equal(s.xMode.seconds,42);assert.equal(s.xMode.charge,45);assert.equal(s.waveShift.enabled,false);assert.equal(s.bossRush.active,false);assert.equal(g.api.test.pulseBuild().tier,s.xMode.signature===0?3:1);for(let i=1;i<6;i++)assert.equal(s.arsenal[i-1].tier,s.xMode.signature===i?3:1);assert.equal(s.weapon,s.xMode.signature);assert.equal(s.hp,125);assert.equal(g.document.body.classList.contains('x-mode'),true);}assert(signatures.size>=3,'different run seeds change the signature loadout');
}
{
 const g=start(),t=g.api.test;keep(g);const before=g.api.snapshot().xMode.seconds;g.step(.32);near(g.api.snapshot().xMode.seconds,before-.32,.001,'clock runs on real active dt');t.pause();const paused=g.api.snapshot().xMode.seconds;g.step(3);near(g.api.snapshot().xMode.seconds,paused,1e-9,'pause freezes clock');g.element('resume').onclick();g.step(.16);near(g.api.snapshot().xMode.seconds,paused-.16,.001,'resume unfreezes clock');
 t.choose('level');const cards=g.api.snapshot().xMode.seconds;g.step(3);near(g.api.snapshot().xMode.seconds,cards,1e-9,'cards freeze clock');
}
{
 const g=start(),t=g.api.test;keep(g);t.xDirector().seconds=.05;g.step(.08);assert.equal(g.api.snapshot().state,'dead');assert.equal(g.api.snapshot().xMode.seconds,0);assert.equal(g.element('paneltag').textContent,'X / REACTOR EMPTY');assert.equal(g.element('x-break').hidden,true);g.element('restart').onclick();assert.equal(g.api.snapshot().xMode.seconds,42);assert.equal(g.api.snapshot().xMode.breakActivations,0);assert.equal(g.api.snapshot().wave,1);
}
{
 for(const difficulty of ['normal','easy']){const g=load({difficulty,seed:1});g.start();g.step(.16);assert.equal(g.api.snapshot().xMode,null);near(g.api.test.xDirector().seconds,42);assert.equal(g.document.body.classList.contains('x-mode'),false);assert.equal(g.element('x-break').hidden,true);assert.equal(g.api.test.xBreak(),false);assert.equal(g.api.test.pulseBuild().tier,0);assert(g.api.snapshot().arsenal.every(b=>b.tier===0));}
}
{
 const g=start(),t=g.api.test,e=keep(g);e.t=0;t.xDirector().charge=100;assert.equal(t.xBreak(),true);assert.equal(t.xBreak(),false);t.set({cool:2});const pos=new THREE.Vector3(0,12,0);t.xProjectile({mesh:{position:pos}},new THREE.Vector3(1,0,0),11);const bullet=t.xBullets()[0],x=bullet.mesh.position.x,life=bullet.life;g.step(.16);near(e.t,.16*.18,.0001,'BREAK slows AI time');near(bullet.mesh.position.x-x,11*.16*.18,.0001,'BREAK slows hostile projectile');near(life-bullet.life,.16*.18,.0001,'projectile lifespan uses enemy time');near(g.api.snapshot().cool,1.84,.0001,'player cooldown stays at real speed');near(g.api.snapshot().xMode.breakRemaining,3.84,.0001,'BREAK duration uses real time');
 const seconds=g.api.snapshot().xMode.seconds;t.set({inv:0,hp:100});t.damagePlayer(10);near(g.api.snapshot().xMode.seconds,seconds-1.3,.0001,'actual incoming HP hit also steals time');assert.equal(g.api.snapshot().hp,90);const after=g.api.snapshot().xMode.seconds;t.damagePlayer(10);near(g.api.snapshot().xMode.seconds,after,1e-9,'invulnerability stops repeat time drain');
}
{
 // A nested ARC LINK kill must mint one time reward, never two.
 const g=start(),t=g.api.test;keep(g);t.clearEnemies();t.holdSpawns();t.set({up:{chain:1},hp:10000,inv:10000});const a=t.spawn('chaser',0,-8),b=t.spawn('chaser',4,-8);a.tutorialDummy=b.tutorialDummy=true;b.hp=10;const s=g.api.snapshot();t.damage(a,1,true,{direct:true,attackId:1,distance:8,weapon:0});t.damage(b,1,true,{direct:true,attackId:2,distance:8,weapon:0});const out=g.api.snapshot();assert.equal(b.hp<=0,true);assert.equal(out.kills-s.kills,1);assert.equal(out.xMode.kills-s.xMode.kills,1);near(out.xMode.seconds-s.xMode.seconds,1.2,.0001,'one nested death grants one ordinary reward');t.damage(b,999);assert.equal(g.api.snapshot().xMode.kills,out.xMode.kills);
}
{
 const g=start(),t=g.api.test;keep(g);t.clearEnemies();t.holdSpawns();t.set({x:0,y:0,z:0,inv:10000,grounded:true});t.xDirector().charge=100;t.xBreak();t.dash();for(let i=0;i<5;i++)t.xProjectile({mesh:{position:new THREE.Vector3(1,1,0)}},new THREE.Vector3(1,0,0),1);t.update(.01);assert.equal(g.api.snapshot().xMode.reflected,3,'reflection is capped at three projectiles per dash');assert.equal(t.xBullets().filter(b=>b.life>0).length,2);
}
{
 // A Warden shock ring travels at enemy time, rather than real player time.
 function sample(breaking){const g=start(),t=g.api.test;keep(g);t.clearEnemies();t.holdSpawns();t.set({x:12,y:0,z:0,hp:1000,inv:0,grounded:true});const boss=t.spawn('boss',0,0);boss.phase=2;boss.cd=-.01;if(breaking){t.xDirector().charge=100;t.xBreak();}g.step(1.15);return g.api.snapshot().hp;}
 assert(sample(false)<1000,'ordinary shock ring reaches player');assert.equal(sample(true),1000,'slowed shock ring has not reached player');
}
{
 const g=start(654321),t=g.api.test;let safety=0,mutations=0,rebuilds=0,lastLayout=g.api.snapshot().world.wave;
 while(!['victory','dead'].includes(g.api.snapshot().state)&&safety++<1500){const s=g.api.snapshot();t.set({hp:10000,inv:10000});
  if(s.state==='playing'){g.step(.16);if(g.api.snapshot().state==='playing')for(const e of [...t.rushEnemies()])if(e.hp>0)t.damage(e,100000);}
  else if(s.state==='upgrade'){const options=g.element('choices').children;assert(options.length>0,'every upgrade has clickable options');const isMutation=String(options[0].dataset.card||'').startsWith('x_');if(s.choiceReason==='wave'){assert.equal(isMutation,[1,3,5].includes(s.wave),'X laws belong only to vaults 1,3,5');if(isMutation){assert.equal(options.length,3);mutations++;}}const before=s.xMode.seconds;g.step(.32);near(g.api.snapshot().xMode.seconds,before,1e-9,'all reward screens freeze the clock');options[0].onclick();}
  else if(s.state==='rebuilding'){const target=s.world.target,before=s.xMode.seconds;assert.notEqual(target,lastLayout,'consecutive vaults use different layouts');assert(target>=9&&target<=16);g.step(s.world.duration+.016);const after=g.api.snapshot();assert.equal(after.world.wave,target,'cinematic destination equals actual vault terrain');assert.equal(after.state,'playing');assert(after.xMode.seconds>=Math.min(60,before+5)-.1,'next vault awards five seconds');lastLayout=target;rebuilds++;}
  else assert.fail('unexpected state '+s.state);
 }
 assert(safety<1500,'X campaign terminates');assert.equal(g.api.snapshot().state,'victory');assert.equal(g.api.snapshot().wave,6);assert.equal(rebuilds,5);assert.equal(mutations,3);assert.equal(g.api.snapshot().xMode.mutations.length,3);assert.equal(g.api.snapshot().bossRush.active,false);assert.equal(g.element('x-break').hidden,true);
 g.element('home').onclick();g.step(.016);assert.equal(g.api.snapshot().state,'menu');assert.equal(g.document.body.classList.contains('x-mode'),false);assert.equal(g.element('x-hud').hidden,true);assert.match(g.element('record').textContent,/ESCAPES 1/,'X menu refreshes run records after a win');
}

{
 const g=start(),t=g.api.test;keep(g);t.weapon(3);t.set({cool:0,reload:0,ammo:[50,10,6,24,1,6]});t.firePhase({ammo:24});assert.equal(g.api.snapshot().ultimateActive,true);const before=g.api.snapshot().xMode.seconds;g.step(.32);near(g.api.snapshot().xMode.seconds,before-.32,.001,'EXPLOSION does not freeze X reactor time');t.xDirector().seconds=.01;g.step(.032);assert.equal(g.api.snapshot().state,'dead');assert.equal(g.api.snapshot().ultimateActive,false,'reactor expiry cancels ultimate cleanly');
}
{
 const g=start(),t=g.api.test;keep(g);t.clearEnemies();t.holdSpawns();t.set({x:0,y:0,z:0,hp:10000,inv:10000,grounded:true});const e=t.spawn('charger',4,0);e.hp=e.max=1000;e.tutorialDummy=true;t.xMutation('dash');const before=e.hp;t.dash();near(before-e.hp,70*1.15,.001,'dash mutation actually damages nearby targets');
 t.xMutation('airborne');t.set({grounded:false});const air=e.hp;t.damage(e,10,false);near(air-e.hp,10*1.15*1.6,.001,'airborne mutation actually boosts damage');
}
{
 const g=start(),t=g.api.test;keep(g);t.clearEnemies();t.holdSpawns();t.xMutation('hotswap');const weapon=(g.api.snapshot().weapon+1)%6;t.set({ammo:[0,0,0,0,0,0]});t.weapon(weapon);assert.equal(g.api.snapshot().ammo[weapon],Math.ceil(t.magSize(weapon)*.4),'hotswap fills the selected magazine');const next=(weapon+1)%6;t.weapon(next);assert.equal(g.api.snapshot().ammo[next],0,'hotswap cooldown prevents cycling free ammo');const e=t.spawn('charger',4,0);e.hp=1000;const hp=e.hp;t.damage(e,10,false);near(hp-e.hp,10*1.15*1.35,.001,'hotswap damage window is active');
}
{
 const g=start(),t=g.api.test;keep(g);t.clearEnemies();t.holdSpawns();t.xMutation('implosion');const a=t.spawn('chaser',0,-8),b=t.spawn('chaser',4,-8),c=t.spawn('charger',8,-8);b.hp=40;c.hp=1000;const before=g.api.snapshot().xMode.kills;t.damage(a,100000,false);assert(b.hp<=0,'implosion can kill a nearby enemy');assert.equal(c.hp,1000,'secondary implosion kills cannot recursively cascade without limit');assert.equal(g.api.snapshot().xMode.kills-before,2);
}
{
 const g=start(),t=g.api.test;t.clearEnemies();t.holdSpawns();t.setStage(10);t.xMutation('bounty');const e=t.spawn('chaser',0,-8);assert.equal(e.xBounty,true);t.xDirector().seconds=20;t.xDirector().charge=0;t.damage(e,100000,false);near(g.api.snapshot().xMode.seconds,29,.001,'bounty mutation increases marked time reward');near(g.api.snapshot().xMode.charge,42,.001,'bounty mutation increases marked charge reward');
 t.xMutation('sustain');t.xDirector().charge=100;t.xBreak();near(g.api.snapshot().xMode.breakRemaining,5.5,.001,'sustain extends initial BREAK');const f=t.spawn('chaser',4,-8);t.damage(f,100000,false);near(g.api.snapshot().xMode.breakRemaining,5.7,.001,'sustain kill extends active BREAK');
}
{
 const g=load({difficulty:'x',mobile:true,seed:2345});g.start();g.api.test.xDirector().charge=100;g.element('x-break').dispatch('click');assert.equal(g.api.snapshot().xMode.breaking,true,'mobile BREAK button invokes the skill');g.step(.016);assert.equal(g.element('x-break').hidden,false);assert.equal(g.element('x-hud').hidden,false);g.api.test.pause();g.step(.016);assert.equal(g.element('x-hud').hidden,true,'paused X HUD does not cover menu');
 g.element('difficulty').value='normal';g.element('start').onclick();assert.equal(g.api.snapshot().xMode,null);assert.equal(g.api.test.pulseBuild().tier,0);assert(g.api.snapshot().arsenal.every(b=>b.tier===0));assert.equal(g.api.test.xDirector().charge,45);assert.equal(g.api.snapshot().hp,100,'starting normal after X restores normal durability');
}

{
 const g=start(),t=g.api.test;t.clearEnemies();t.holdSpawns();const pack=Array.from({length:4},(_,i)=>t.spawn('chaser',i*4,-8));assert.equal(pack[0].xBounty,true,'first eligible carrier is marked');assert.equal(pack.filter(e=>e.xBounty).length,1,'only one active carrier');t.damage(pack[0],100000,false);assert.equal(pack.filter(e=>e.hp>0&&e.xBounty).length,0,'carrier death does not transfer the bounty to every enemy');const fifth=t.spawn('chaser',16,-8);assert.equal(fifth.xBounty,true,'next eligible fourth spawn can bring a new carrier');
}
console.log('X INTEGRATION: timer/expiry, mode isolation, pause/cards, signature evolution, AI/projectile/hazard slowdown, player timing, damage, nested death rewards, capped reflection, EXPLOSION timing, all six mutation effects, mobile BREAK, six vaults, mutation choices, cinematic destinations and result cleanup passed');
