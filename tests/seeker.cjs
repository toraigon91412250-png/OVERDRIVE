const assert=require('node:assert/strict');
const loadGame=require('./headless-runtime.cjs');
function start(options={}){const g=loadGame(options);g.start();if(options.difficulty==='easy')g.api.test.tutorialSet(-1);g.step(.03);g.api.test.clearEnemies();g.api.test.holdSpawns();g.key('Digit6');if(options.mobile)g.api.test.weapon(5);g.step(.2);return g;}
function target(g,x=0,z=5,hp=1000){const e=g.api.test.spawn('strafer',x,z);e.hp=e.max=hp;e.tutorialDummy=true;return e;}
function aim(g,x=0,z=5){g.api.test.aim(x,1.7,z);g.step(.3);}
// All six slots and both control paths, including mobile GUN wraparound.
{
 const g=start();assert.equal(g.api.snapshot().weapon,5);assert.deepEqual(Array.from(g.api.snapshot().weaponMags),[50,10,6,24,1,6]);
 const m=start({mobile:true});assert.equal(m.api.snapshot().weapon,5);m.element('swap').dispatch('pointerdown');assert.equal(m.api.snapshot().weapon,0);
}
// Distinct target locks launch exactly three physical missiles and consume three cells.
{
 const g=start(),a=target(g,-2.2,-5),b=target(g,0,-5),c=target(g,2.2,-5);aim(g,0,-5);
 assert.equal(g.api.snapshot().seeker.ready,3);g.api.test.shoot();
 assert.equal(g.api.snapshot().ammo[5],3);assert.equal(g.api.snapshot().seeker.active,3);
 const missiles=g.api.test.seekerDiagnostics();assert.equal(new Set(missiles.map(m=>m.target)).size,3);
 for(const m of missiles){assert(m.guided);assert(m.origin[0]>.1,'launch originates at visible gun on right');assert(m.origin[2]<12,'launch is ahead of player');}
 g.step(.7);for(const e of [a,b,c])assert.equal(e.hp,916,'each unique target takes one 84-damage missile');assert.equal(g.api.snapshot().seeker.active,0);
}
// Single target costs one cell, and an unlocked shot has reduced straight-fire damage.
{
 const g=start(),e=target(g);aim(g);g.api.test.shoot();assert.equal(g.api.snapshot().ammo[5],5);g.step(.5);assert.equal(e.hp,916);
}
{
 const g=start(),e=target(g);g.api.test.aim(0,1.7,5);g.api.test.set({cool:0});g.api.test.shoot();g.step(.5);assert.equal(e.hp,968);assert.equal(g.api.snapshot().seeker.shots,1);
}
// Moving targets are followed after launch; target death never transfers the missile.
{
 const g=start(),e=target(g);aim(g);g.api.test.shoot();e.mesh.position.x=2;g.step(.65);assert.equal(e.hp,916);
}
{
 const g=start(),e=target(g),other=target(g,2,5);aim(g);g.api.test.shoot();e.hp=0;g.step(.5);assert.equal(other.hp,1000);assert.equal(g.api.snapshot().seeker.active,0);
}
// No lock through architecture. Unlocked physical missiles stop at its surface.
{
 const g=start();g.api.test.set({x:11,z:-3});g.step(.02);const e=target(g,11,-18);aim(g,11,-18);assert.equal(g.api.snapshot().seeker.ready,0);
 g.api.test.shoot();g.step(.6);assert.equal(e.hp,1000);assert.equal(g.api.snapshot().seeker.wallHits,1);
}
// Partial magazines, reload + upgrade multiplier, and no AUTO FEED on the sixth gun.
{
 const g=start();target(g,-2.2,-5);target(g,0,-5);target(g,2.2,-5);g.api.test.set({ammo:[50,10,6,12,1,2]});aim(g,0,-5);g.api.test.shoot();assert.equal(g.api.snapshot().ammo[5],0);
 g.step(.9);g.api.test.shoot();assert(Math.abs(g.api.snapshot().reloading-1.9)<1e-8);g.step(2);assert.equal(g.api.snapshot().ammo[5],6);
}
{
 const g=start();const e=target(g,0,5,65);g.api.test.set({up:{feed:3}});aim(g);g.api.test.shoot();g.step(.4);assert(e.hp<=0);assert.equal(g.api.snapshot().ammo[5],5);
}
// In-flight missiles survive a weapon swap, freeze on pause, and clear on restart.
{
 const g=start();target(g,0,-10);aim(g,0,-10);g.api.test.shoot();g.api.test.weapon(0);assert.equal(g.api.snapshot().seeker.locks,0);g.step(.1);
 const before=g.api.test.seekerDiagnostics()[0].position;g.api.test.pause();g.step(.8);assert.deepEqual(Array.from(g.api.test.seekerDiagnostics()[0].position),Array.from(before));g.start();assert.equal(g.api.snapshot().seeker.active,0);assert.equal(g.api.snapshot().seeker.shots,0);
}
// Mobile + easy share the weapon rules; the tutorial itself still blocks special guns.
{
 const g=start({mobile:true,difficulty:'easy'});target(g);aim(g);g.api.test.shoot();g.step(.5);assert.equal(g.api.snapshot().seeker.hits,1);g.api.test.set({ammo:[50,10,6,12,1,0],cool:0});g.api.test.shoot();assert(Math.abs(g.api.snapshot().reloading-1.045)<1e-8);
}
{
 const g=loadGame({difficulty:'easy'});g.start();g.api.test.weapon(5);g.step(.05);assert.equal(g.api.snapshot().weapon,0);assert.equal(g.api.snapshot().tutorialActive,true);
}
// The finished model stays inside its mobile budget and exposes real per-cell sockets.
{
 const g=start(),model=g.api.test.seekerModel();assert(model.stats().meshes<100);assert(model.stats().triangles<15000);
 model.root.traverse(o=>{if(o.isMesh)for(const n of o.geometry.attributes.position.array)assert(Number.isFinite(n));});
 const sockets=[0,1,2].map(i=>model.getMuzzleWorldPosition(i).toArray().join(','));assert.equal(new Set(sockets).size,3);
}
// Shielded/exposed WARDEN uses the same damage windows as the other weapons.
for(const exposed of [0,10]){
 const g=start(),e=g.api.test.spawn('boss',0,-5);e.hp=e.max=1000;e.cd=999;e.exposed=exposed;
 g.api.test.aim(0,3,-5);g.step(.3);g.api.test.shoot();g.step(.8);
 assert(Math.abs(e.hp-(1000-84*(exposed?1.8:.55)))<1e-6);
}
// Locks require dwell time, cannot reach beyond 42m, and expire after looking away.
{
 const g=start();target(g,0,-40);aim(g,0,-40);assert.equal(g.api.snapshot().seeker.ready,0);
 g.api.test.clearEnemies();target(g);g.api.test.aim(0,1.7,5);g.step(.1);assert.equal(g.api.snapshot().seeker.ready,0);
 g.step(.2);assert.equal(g.api.snapshot().seeker.ready,1);g.api.test.aim(20,1.7,12);g.step(.8);assert.equal(g.api.snapshot().seeker.locks,0);
}
// Salvos never exceed the six-missile pool or spend ammunition on a full pool.
{
 const g=start();target(g,-2.2,-5);target(g,0,-5);target(g,2.2,-5);aim(g,0,-5);
 for(let i=0;i<5;i++){g.api.test.set({ammo:[50,10,6,12,1,6],cool:0});g.api.test.shoot();g.api.test.set({cool:0});}
 assert.equal(g.api.snapshot().seeker.active,6);assert.equal(g.api.snapshot().ammo[5],6,'full pool spends no ammo');
}
// A shoulder hold continues below the screen while every launch port stays visible.
{
 const T=require('three');
 for(const [mobile,aspect] of [[false,16/9],[true,844/390],[true,390/844]]){
  const g=start({mobile}),model=g.api.test.seekerModel(),root=model.root,camera=root.parent,v=new T.Vector3();
  camera.aspect=aspect;camera.updateProjectionMatrix();model.update(0,{active:true,mobile,ammo:6});camera.updateMatrixWorld(true);
  let minY=Infinity,maxY=-Infinity,visible=0;
  root.traverse(o=>{if(!o.isMesh)return;for(let i=0;i<o.geometry.attributes.position.count;i++){
   v.fromBufferAttribute(o.geometry.attributes.position,i).applyMatrix4(o.matrixWorld).project(camera);
   const x=(1+v.x)/2,y=(1-v.y)/2;minY=Math.min(minY,y);maxY=Math.max(maxY,y);
   if(x>0&&x<1&&y>0&&y<1)visible++;
  }});
  assert(minY>.54,'weapon leaves the sightline and the horizon clear');
  assert(minY<.7&&visible>1000,'launcher remains visible');
  assert(maxY>1.05,'grip continues below the frame rather than floating');
  for(let i=0;i<3;i++){
   v.copy(model.getMuzzleWorldPosition(i)).project(camera);
   assert(Math.abs(v.x)<.85&&v.y<-.1&&v.y>-.8,'launch ports stay in the lower viewport');
   assert(model.getMuzzleWorldDirection(i).angleTo(camera.getWorldDirection(new T.Vector3()))<.04,'tube faces the sight direction');
  }
 }
}
// Missiles leave each visible port along its actual axis before steering, even
// with a rotated view or weapon recoil. No camera-forward shortcut or fan offset.
{
 const T=require('three');
 for(const mobile of [false,true])for(const kick of [0,.16]){
  const g=start({mobile}),t=g.api.test;target(g,-2.2,-5);target(g,0,-5);target(g,2.2,-5);aim(g,0,-5);
  const model=t.seekerModel();model.update(0,{active:true,mobile,ammo:6,recoil:kick});
  const expected=[0,1,2].map(i=>({origin:model.getMuzzleWorldPosition(i),direction:model.getMuzzleWorldDirection(i)}));
  t.shoot();const before=t.seekerDiagnostics();assert.equal(before.length,3);
  for(const m of before){const p=new T.Vector3().fromArray(m.origin),port=expected.find(port=>port.origin.distanceTo(p)<1e-8);assert(port);assert(new T.Vector3().fromArray(m.initialDirection).angleTo(port.direction)<1e-7);}
  g.step(.032);const after=t.seekerDiagnostics();assert.equal(after.length,3);
  after.forEach((m,i)=>{const moved=new T.Vector3().fromArray(m.position).sub(new T.Vector3().fromArray(before[i].origin)).normalize();assert(moved.angleTo(new T.Vector3().fromArray(m.initialDirection))<1e-7);});
 }
 for(const mobile of [false,true]){
  const g=start({mobile}),t=g.api.test;t.aim(6,4,-8);g.step(.03);
  const expected=t.seekerModel().getMuzzleWorldDirection(0);t.shoot();
  assert(new T.Vector3().fromArray(t.seekerDiagnostics()[0].initialDirection).angleTo(expected)<1e-7);
 }
}
// Straight fire still hits a centered target over the useful range.
for(const distance of [5,15,35]){
 const g=start(),t=g.api.test,e=target(g,0,12-distance);t.aim(0,1.7,12-distance);g.step(.016);t.set({cool:0});t.shoot();g.step(distance/28+.15);assert.equal(e.hp,968);
}
console.log('SEEKER: PC/mobile, locks, physical homing, 3-cell salvos, damage, walls, ammo/reload, pause/reset and model budget passed');
