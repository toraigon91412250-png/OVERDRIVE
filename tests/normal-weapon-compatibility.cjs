const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const loadGame=require('./headless-runtime.cjs');
const fixture=path.join(__dirname,'normal-weapons-v5.6.json');
function start(seed=123456){const g=loadGame({seed});g.start();g.step(.032);g.api.test.clearEnemies();g.api.test.holdSpawns();return g;}
function target(g,distance,hp=100000){const e=g.api.test.spawn('charger',0,12-distance);e.hp=e.max=hp;e.mesh.position.y=1.4;e.tutorialDummy=true;return e;}
function measure(){
 const out={profiles:[],shots:[],phase:[],cards:[],rules:{}};
 for(let lv=0;lv<=3;lv++){
  const g=start();g.api.test.set({up:{range:lv}});
  out.profiles.push({lv,band:g.api.snapshot().pulseBand,damage:[0,3,7,8,9,12,15,18,24,27,35].map(d=>g.api.test.pulseDamageAt(d))});
 }
 for(const [weapon,distances] of [[0,[3,10,20,29]],[1,[3,8,18]],[2,[5,18,30]],[4,[20]]])for(const distance of distances){
  const g=start(),t=g.api.test;t.weapon(weapon);g.step(.2);const e=target(g,distance);
  t.aim(0,1.4,12-distance);t.set({cool:0});t.shoot();const shot=g.api.snapshot();
  out.shots.push({weapon,distance,damage:e.max-e.hp,position:e.mesh.position.toArray(),stun:e.stun,ammo:shot.ammo,cool:shot.cool,casings:shot.casingCount});
 }
 for(const weapon of [0,1,2,4,5]){
  const g=start(),t=g.api.test;t.weapon(weapon);g.step(.2);const ammo=[50,10,6,12,1,6];ammo[weapon]=0;t.set({ammo,cool:0});t.shoot();out.shots.push({weapon,reload:g.api.snapshot().reloading});
 }
 for(const count of [1,6,12,24]){
  const g=start(),t=g.api.test;t.weapon(3);g.step(.2);const e=target(g,11);t.aim(0,1.4,1);t.set({ammo:[50,10,6,24,1,6],cool:0});t.firePhase({ammo:count});
  const s=g.api.snapshot();out.phase.push({count,damage:e.max-e.hp,ammo:s.ammo,shots:s.phaseShots,nova:s.novaShots,explosion:s.explosionShots,active:s.ultimateActive,spent:s.phaseSpent});
 }
 for(const seed of [123456,987654,246810]){const g=start(seed);g.api.test.choose('level');out.cards.push(g.element('choices').children.map(b=>b.innerHTML));}
 {
  const g=start(),t=g.api.test;t.weapon(2);g.step(.2);const a=target(g,7,50),b=t.spawn('chaser',3,5);b.hp=b.max=1000;b.mesh.position.y=1.4;b.tutorialDummy=true;
  t.set({cool:0,up:{fork:2,feed:1}});t.aim(0,1.4,5);t.shoot();const s=g.api.snapshot();out.rules.fork={front:a.hp,other:b.hp,ammo:s.ammo,kills:s.kills,score:s.score,pickups:s.pickups};
 }
 {
  const g=start(),t=g.api.test;const initial=g.api.snapshot();const hp=['chaser','shooter','strafer','charger','boss'].map(type=>t.spawn(type,20,20).hp);
  t.hurt(10);t.dash();out.rules.base={mags:initial.weaponMags,ammo:initial.ammo,hp:initial.hp,enemies:hp,afterHurt:g.api.snapshot().hp,speedMove:initial.position};
 }
 return JSON.parse(JSON.stringify(out));
}
if(process.argv.includes('--capture')){
 fs.writeFileSync(fixture,JSON.stringify({sourceCommit:'552317131901ca9b8c55b207ae171784352d1513',result:measure()},null,2)+'\n');
 console.log('Captured the pre-change v5.6 normal weapon baseline');
}else{
 // Weapon evolution intentionally changes card offers; the new routes are
 // exercised by pulse-evolution.cjs. The scheduled wave shift now consumes a
 // gameplay RNG draw, which changes the deterministic pellet phase for the
 // single-target shotgun sample at 18 m. Keep its designed falloff bounded,
 // while comparing all other baseline fields exactly.
 const {cards:currentCards,...actual}=measure();
 const {cards:priorCards,...expected}=JSON.parse(fs.readFileSync(fixture,'utf8')).result;
 const longShotgun=actual.shots.find(s=>s.weapon===1&&s.distance===18);
 const baselineShotgun=expected.shots.find(s=>s.weapon===1&&s.distance===18);
 assert(longShotgun&&baselineShotgun);
 assert(Math.abs(longShotgun.damage-baselineShotgun.damage)<=1,
  `18 m shotgun variance remains within one damage (${longShotgun.damage} vs ${baselineShotgun.damage})`);
 longShotgun.damage=baselineShotgun.damage;
 assert.deepEqual(actual,expected);
 console.log('NORMAL COMPATIBILITY: v5.6 baseline match for weapon rules and combat; seeded 18 m shotgun sample allows ±1 damage for randomized pellet phase (evolution offers tested separately)');
}
