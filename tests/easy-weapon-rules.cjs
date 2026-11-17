const assert=require('node:assert/strict');
const loadGame=require('./headless-runtime.cjs');
const near=(a,b,msg)=>assert(Math.abs(a-b)<1e-8,msg||`${a} != ${b}`);
function start(difficulty='easy',mobile=true){const g=loadGame({difficulty,mobile,seed:123456});g.start();if(difficulty==='easy')g.element('tutorial-skip').dispatch('click');g.step(.032);g.api.test.clearEnemies();g.api.test.holdSpawns();g.element('assist').checked=false;return g;}
function shot(difficulty,weapon,distance,{radius=.95,up={},hp=100000,height=1.4}={}){
 const g=start(difficulty),t=g.api.test;t.weapon(weapon);g.step(.2);if(height>1.65){t.set({y:height-1.65,vy:0});t.update(0);}const e=t.spawn('charger',0,12-distance);e.hp=e.max=hp;e.r=radius;e.mesh.position.y=height;e.tutorialDummy=true;e.attack=.4;e.cd=.1;
 t.set({up,cool:0});t.aim(0,height,12-distance);t.shoot();return {g,e,damage:hp-e.hp,push:Math.abs(e.mesh.position.z-(12-distance))};
}
// Same magazine sizes, distance breakpoints, tuning-card effects and range cutoff.
for(let level=0;level<4;level++){
 const normal=start('normal'),easy=start();for(const g of [normal,easy])g.api.test.set({up:{range:level}});
 assert.deepEqual(Array.from(easy.api.snapshot().weaponMags),Array.from(normal.api.snapshot().weaponMags));assert.deepEqual(Array.from(easy.api.snapshot().ammo),[50,10,6,12,1,6]);
 assert.deepEqual(JSON.parse(JSON.stringify(easy.api.snapshot().pulseBand)),JSON.parse(JSON.stringify(normal.api.snapshot().pulseBand)));
 for(const distance of [0,3,7,8,9,12,15,18,24,27,35])near(easy.api.test.pulseDamageAt(distance),normal.api.test.pulseDamageAt(distance)*16/7);
}
{
 const g=start();assert.equal(g.api.test.pulseDamageAt(12),16);assert(g.api.test.pulseDamageAt(3)<16);assert.equal(g.api.test.pulseDamageAt(40),0);
 for(const distance of [3,10,20,29])near(shot('easy',0,distance).damage,shot('normal',0,distance).damage*16/7,'actual pulse shot applies shared profile + easy boost');
}
// The weapon core communicates effective distance in easy as it does in normal.
for(const [distance,color] of [[3,0xffa16f],[10,0x77ffe0],[20,0x80adff]]){
 const g=start(),t=g.api.test;const e=t.spawn('chaser',0,12-distance);e.tutorialDummy=true;e.mesh.position.y=1.4;t.aim(0,1.4,12-distance);g.step(.016);assert.equal(g.api.snapshot().pulseCoreColor,color);
}
// Large target keeps all pellets/head multipliers constant despite the retained
// narrower easy spread. This isolates the real shotgun distance/knockback rules.
const shotgun=[];
for(const distance of [3,8,18]){
 const easy=shot('easy',1,distance,{radius:8,height:3.65}),normal=shot('normal',1,distance,{radius:8,height:3.65});
 near(easy.damage,normal.damage);near(easy.push,normal.push);assert(easy.push>0);shotgun.push(easy.damage);
}
assert(shotgun[0]>shotgun[1]&&shotgun[1]>shotgun[2]);
for(const level of [0,1,2,3]){
 const easy=shot('easy',1,6,{up:{breach:level}}),normal=shot('normal',1,6,{up:{breach:level}});
 near(easy.push,3*(1+.4*level));near(easy.push,normal.push);assert(easy.e.stun>=.42+.08*level);assert.equal(easy.e.attack,0);assert(easy.e.cd>=.9);
}
// Rail gets the same distance bonus and kill-triggered forks.
const rail=[];
for(const distance of [5,18,30]){const easy=shot('easy',2,distance),normal=shot('normal',2,distance);near(easy.damage,normal.damage);rail.push(easy.damage);}
assert(rail[0]<rail[1]&&rail[1]<rail[2]);
for(const difficulty of ['normal','easy']){
 const g=start(difficulty),t=g.api.test;t.weapon(2);g.step(.2);const a=t.spawn('chaser',0,5),b=t.spawn('chaser',3,5);a.hp=a.max=50;b.hp=b.max=1000;a.mesh.position.y=b.mesh.position.y=1.4;
 t.set({up:{fork:2},cool:0});t.aim(0,1.4,5);t.shoot();assert(a.hp<=0);near(b.hp,944);
}
// Dedicated modules remain in the shared randomized reward pool in easy.
{
 for(const [id,label] of [['range','パルスライフル専用'],['breach','散弾砲専用'],['pointblank','散弾砲専用'],['fork','レールガン専用']]){const g=start(),t=g.api.test;let card;for(let i=0;i<100&&!card;i++){t.choose('level');card=g.element('choices').children.find(c=>c.dataset.card===id);}assert(card,id);assert(card.innerHTML.includes(label));assert.equal(g.element('pulse-progress').hidden,true);if(id==='range'){card.onclick();near(g.api.snapshot().pulseBand.peakEnd,16.5);}}
}
// Easy assists are preserved: reload, HP, incoming damage, enemy HP/speed, player
// movement and off-center aim assistance. These do not change the weapon roles.
for(const weapon of [0,1,2,4,5]){
 const times=[];for(const difficulty of ['normal','easy']){const g=start(difficulty),t=g.api.test;t.weapon(weapon);g.step(.2);const ammo=Array.from(g.api.snapshot().ammo);ammo[weapon]=0;t.set({ammo,cool:0});t.shoot();times.push(g.api.snapshot().reloading);}near(times[1],times[0]*.55);
}
{
 const normal=start('normal'),easy=start();assert.equal(normal.api.snapshot().hp,100);assert.equal(easy.api.snapshot().hp,125);
 normal.api.test.hurt(10);easy.api.test.hurt(10);assert.equal(normal.api.snapshot().hp,90);assert.equal(easy.api.snapshot().hp,121);
 for(const type of ['chaser','shooter','strafer','charger','boss'])near(easy.api.test.spawn(type,20,20).hp,normal.api.test.spawn(type,20,20).hp*.5);
}
{
 const moved=[];for(const difficulty of ['normal','easy']){const g=start(difficulty),e=g.api.test.spawn('chaser',20,12);g.step(.112);moved.push(20-e.mesh.position.x);}near(moved[1],moved[0]*.65);
 const player=[];for(const difficulty of ['normal','easy']){const g=start(difficulty,false);g.key('KeyW');g.step(.112);player.push(12-g.api.snapshot().position.z);}near(player[1],player[0]*1.18);
}
{
 const damage=[];for(const difficulty of ['normal','easy']){const g=start(difficulty,false),t=g.api.test;const e=t.spawn('chaser',2,2);e.hp=e.max=1000;e.mesh.position.y=1.4;t.aim(0,1.4,2);t.set({cool:0});t.shoot();damage.push(1000-e.hp);}assert.equal(damage[0],0);assert(damage[1]>0);
}
// Updated practice teaches the range core and actual shotgun knockback.
{
 const g=loadGame({difficulty:'easy',seed:123456});g.start();g.element('tutorial-practice-start').dispatch('click');g.step(.1);
 assert(g.element('tutorial-copy').textContent.includes('中距離'));assert(g.element('tutorial-goal').textContent.includes('コアが緑'));assert.equal(g.api.snapshot().pulseCoreColor,0x77ffe0);
 g.element('tutorial-skip').dispatch('click');g.step(.1);assert(g.element('tutorial-copy').textContent.includes('押し戻し'));const e=g.api.test.practiceTargets()[0],z=e.mesh.position.z;
 g.api.test.aim(e.mesh.position.x,e.mesh.position.y,e.mesh.position.z);g.api.test.set({cool:0});g.api.test.shoot();assert(e.mesh.position.z<z);
 g.element('tutorial-skip').dispatch('click');assert(g.element('tutorial-copy').textContent.includes('遠距離'));
}
console.log('EASY WEAPONS: shared roles/magazines/cards, range-core colors, pulse boost, shotgun falloff/knockback, rail bonus/forks, retained assists and updated practice passed');
