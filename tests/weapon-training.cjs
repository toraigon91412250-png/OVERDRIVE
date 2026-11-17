const assert=require('node:assert/strict');
const loadGame=require('./headless-runtime.cjs');
function start(mobile=false){const g=loadGame({mobile,difficulty:'easy'});g.start();g.element('tutorial-practice-start').dispatch('click');g.step(.05);return g;}
function next(g){g.element('tutorial-skip').dispatch('click');g.step(.05);}
function aim(g,e){g.api.test.aim(e.mesh.position.x,e.mesh.position.y,e.mesh.position.z);g.step(.05);g.api.test.set({cool:0});}
// Easy onboarding leads into weapon practice. Normal mode cannot enter it.
{
 const g=loadGame({difficulty:'easy'});g.start();const t=g.api.test;
 assert.equal(g.api.snapshot().tutorialStage,0);assert.equal(g.api.snapshot().tutorialMarker,true);
 t.set({x:-4,z:7});g.step(.02);assert.equal(g.api.snapshot().tutorialRouteStep,0,'later waypoint cannot be reached out of order');t.set({x:0,z:12});g.step(.02);
 for(const [index,key,duration] of [[1,'KeyW',.48],[2,'KeyA',.38],[3,'KeyS',.38],[4,'KeyD',.38]]){g.key(key);g.step(duration);g.dispatchWindow('keyup',{code:key});g.step(.02);assert.equal(g.api.snapshot().tutorialRouteStep,index);assert.equal(g.api.snapshot().tutorialStage,index===4?1:0)}
 assert.equal(g.api.snapshot().tutorialRouteStep,4);
 t.damage(t.tutorialTarget(),999);g.step(.02);assert.equal(g.api.snapshot().tutorialStage,2);
 t.set({x:0,z:2});g.step(.15);assert.equal(g.api.snapshot().tutorialStage,3);
 t.set({x:0,z:0,y:0});g.step(.02);assert.equal(g.api.snapshot().tutorialStage,4);
 t.damage(t.tutorialTarget(),999);g.step(.02);assert.equal(g.api.snapshot().weaponTraining.index,0);assert.equal(g.api.snapshot().wave,0);
}
{
 const g=loadGame();g.start();const before=g.api.snapshot();assert.equal(g.api.test.startWeaponPractice(),false);
 g.element('tutorial-practice-start').dispatch('click');g.key('Enter');assert.equal(g.api.snapshot().weaponTraining,null);assert.equal(g.api.snapshot().tutorialActive,false);assert.equal(g.api.snapshot().wave,1);assert.equal(g.api.snapshot().queue,5);
 const e=g.api.test.spawn('chaser',0,5);assert.equal(e.hp,65);g.api.test.damagePlayer(10);assert.equal(g.api.snapshot().hp,before.hp-10);
}
// Each of the six lessons persists after kills and waiting. Only Skip advances.
for(const mobile of [false,true]){
 const g=start(mobile),t=g.api.test;const easyNames=['連射ライフル','近距離ショットガン','貫通ライフル','チャージ砲','スナイパーライフル','追尾ミサイル'];
 for(let index=0;index<6;index++){
  let snap=g.api.snapshot();assert.equal(snap.weaponTraining.index,index);assert.equal(snap.weapon,index);assert.equal(snap.wave,0);assert.equal(snap.queue,0);
  assert(g.element('tutorial-title').textContent===easyNames[index]);g.step(.02);assert.equal(g.element('weaponname').textContent,easyNames[index]);assert(g.element('tutorial-controls').textContent.includes(mobile?(index===4?'右画面':'FIRE'):(index===4?'右クリック':'クリック')));
  const hp=snap.hp;t.hurt(9999);assert.equal(g.api.snapshot().hp,hp);
  const targets=t.practiceTargets();for(const e of targets)t.damage(e,999999);
  g.step(1.1);snap=g.api.snapshot();assert.equal(snap.weaponTraining.index,index);assert(snap.weaponTraining.targets>0);assert.equal(snap.weaponTraining.eliminations,targets.length);
  assert.equal(snap.kills,0);assert.equal(snap.score,0);assert.equal(snap.pickups,0);assert.equal(snap.pendingLevels,0);assert.equal(snap.state,'playing');
  t.gainXP(9999);assert.equal(g.api.snapshot().xp,0);t.weapon((index+1)%6);g.step(.02);assert.equal(g.api.snapshot().weapon,index);
  g.step(4);assert.equal(g.api.snapshot().weaponTraining.index,index);assert(g.element('tutorial').classList.contains('compact'));
  next(g);
 }
 const end=g.api.snapshot();assert.equal(end.weaponTraining,null);assert.equal(end.tutorialActive,false);assert.equal(end.wave,1);assert.equal(end.weapon,0);assert.deepEqual(Array.from(end.ammo),[50,10,6,12,1,6]);assert.equal(end.xp,0);assert.equal(end.kills,0);assert(end.runTime<.1);
}
// Practice uses real finite magazines and reloads, including the single-shot sniper.
{
 const g=start(),t=g.api.test;t.set({ammo:[1,6,4,24,1,6],cool:0});t.shoot();assert.equal(g.api.snapshot().ammo[0],0);t.set({cool:0});t.shoot();assert(g.api.snapshot().reloading>0);g.step(.8);assert.equal(g.api.snapshot().ammo[0],50);
 for(let i=0;i<4;i++)next(g);assert.equal(g.api.snapshot().weapon,4);const e=t.practiceTargets()[0];t.sniperScope(true);t.aim(0,e.mesh.position.y+e.r*.55,e.mesh.position.z);g.step(.05);t.set({cool:0});t.shoot();assert.equal(g.api.snapshot().ammo[4],0);assert.equal(g.api.snapshot().weaponTraining.eliminations,1);g.step(.7);t.shoot();assert(g.api.snapshot().reloading>0);g.step(1.4);assert.equal(g.api.snapshot().ammo[4],1);
}
// All real firing paths are active: shotgun, rail penetration, phase/EXPLOSION,
// sniper scope and actual seeker tracking. EXPLOSION cannot finish the lesson.
{
 const g=start(),t=g.api.test;next(g);let e=t.practiceTargets()[0];aim(g,e);t.shoot();assert(e.hp<e.max);
 next(g);const line=t.practiceTargets();t.aim(0,1.35,-8);g.step(.03);t.set({cool:0});t.shoot();assert(line.every(e=>e.hp<=0),'rail pierces the target line');
 next(g);assert(g.api.snapshot().phaseActive);t.firePhase({ammo:1});assert.equal(g.api.snapshot().ammo[3],23);assert.equal(g.api.snapshot().weaponTraining.index,3);
 t.set({ammo:[50,10,6,24,1,6],cool:0});t.firePhase({ammo:24});assert(g.api.snapshot().ultimateActive);assert(g.api.snapshot().ultimateKills>0);g.step(3.7);assert(!g.api.snapshot().ultimateActive);assert.equal(g.api.snapshot().weaponTraining.index,3);assert.equal(g.api.snapshot().ammo[3],24);g.step(1);assert(g.api.snapshot().weaponTraining.targets>0);
 next(g);g.element('game').dispatch('mousedown',{button:2});assert(g.api.snapshot().sniperAim);g.dispatchWindow('mouseup',{button:2});assert(!g.api.snapshot().sniperAim);
 next(g);t.aim(0,1.7,-3);g.step(.4);assert(g.api.snapshot().seeker.ready>=2);t.shoot();assert(g.api.snapshot().seeker.active>0);g.step(.8);assert(g.api.snapshot().weaponTraining.eliminations>=2);
}
// Next, skip-all, pause/resume, home and restart cancel inputs, effects and charges.
for(const mobile of [false,true]){
 const g=start(mobile),t=g.api.test;const easyNames=['連射ライフル','近距離ショットガン','貫通ライフル','チャージ砲','スナイパーライフル','追尾ミサイル'];
 for(let index=0;index<6;index++){
  const e=t.practiceTargets()[0];t.aim(e.mesh.position.x,e.mesh.position.y+.25,e.mesh.position.z);g.step(.3);
  const before=g.api.snapshot().ammo[index];
  if(mobile)g.element('fire').dispatch('pointerdown');else g.element('game').dispatch('mousedown',{button:0});
  g.step(.05);
  if(mobile)g.element('fire').dispatch('pointerup');else g.dispatchWindow('mouseup',{button:0});
  g.step(.05);assert(g.api.snapshot().ammo[index]<before,'real fire input consumes the current magazine');
  assert.notEqual(g.element('ammo').textContent,'∞','practice displays real loaded rounds');next(g);
 }
 const auto=start(mobile);for(let i=0;i<3;i++)next(auto);
 if(mobile)auto.element('reload').dispatch('pointerdown');else auto.key('KeyR');
 auto.step(3);assert(auto.api.snapshot().ultimateActive,'auto-charge input reaches EXPLOSION during practice');
 next(auto);assert(!auto.api.snapshot().ultimateActive);assert.equal(auto.api.snapshot().weapon,4);assert.equal(auto.api.snapshot().ammo[4],1);
}
{
 const g=start(true);for(let i=0;i<3;i++)next(g);
 g.element('fire').dispatch('pointerdown');g.step(.5);assert(g.api.snapshot().phaseCharge>0);
 next(g);g.step(.5);assert.equal(g.api.snapshot().phaseCharge,0);assert.equal(g.api.snapshot().ammo[4],1,'held touch fire does not carry into the next lesson');
}
{
 const g=start(),t=g.api.test;g.key('Enter');assert.equal(g.api.snapshot().weapon,1);g.dispatchWindow('keydown',{code:'Enter',repeat:true});assert.equal(g.api.snapshot().weapon,1);
 g.key('Tab');assert.equal(g.api.snapshot().state,'playing');
 t.pause();g.step(1);assert.equal(g.api.snapshot().state,'paused');g.element('resume').onclick();assert.equal(g.api.snapshot().weaponTraining.index,1);
 next(g);next(g);t.firePhase({ammo:24});assert(g.api.snapshot().ultimateActive);next(g);assert.equal(g.api.snapshot().weapon,4);assert(!g.api.snapshot().ultimateActive);assert.equal(g.api.snapshot().phaseCharge,0);
 next(g);g.element('tutorial-finish').dispatch('click');assert.equal(g.api.snapshot().weaponTraining,null);assert.equal(g.api.snapshot().wave,1);assert.equal(g.api.snapshot().seeker.active,0);
}
{
 const g=start(),t=g.api.test;for(let i=0;i<3;i++)next(g);t.firePhase({ammo:24});g.element('tutorial-finish').dispatch('click');assert(!g.api.snapshot().ultimateActive);assert.equal(g.api.snapshot().weapon,0);assert.equal(g.api.snapshot().ammo[3],12);assert.equal(g.api.snapshot().phaseShots,0);
}
{
 const g=start();g.element('home').onclick();assert(g.element('tutorial').hidden);assert.equal(g.api.snapshot().weaponTraining,null);g.element('difficulty').value='normal';g.start();assert.equal(g.api.snapshot().tutorialActive,false);assert.equal(g.api.snapshot().queue,5);assert.equal(g.api.snapshot().weaponTraining,null);
}
{
 const g=start();next(g);g.start();assert.equal(g.api.snapshot().tutorialStage,0);assert.equal(g.api.snapshot().weaponTraining,null);assert.equal(g.api.snapshot().weapon,0);
}
// The original all-skip on the movement tutorial still goes straight into battle.
{
 const g=loadGame({difficulty:'easy'});g.start();g.element('tutorial-skip').dispatch('click');assert.equal(g.api.snapshot().wave,1);assert.equal(g.api.snapshot().tutorialActive,false);
}
console.log('WEAPON TRAINING: easy-only six lessons, manual progression, repeat targets, real weapons/reloads, immunity, no rewards, keyboard/touch, pause, skips and clean battle reset passed');
