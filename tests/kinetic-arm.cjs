const assert=require('node:assert/strict'),vm=require('node:vm'),{buildSync}=require('esbuild');
const moduleRef={exports:{}};
vm.runInNewContext(buildSync({entryPoints:['src/kinetic-arm.js'],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text,{module:moduleRef,exports:moduleRef.exports});
const {KineticArm,KINETIC_ARM_RULES}=moduleRef.exports;
const plain=value=>JSON.parse(JSON.stringify(value));
const near=(actual,expected)=>assert(Math.abs(actual-expected)<1e-8,`${actual} != ${expected}`);

// Pressing early has a finite defensive window. A projectile outside that
// window is still dangerous even while the cooldown is not yet ready.
const guard=new KineticArm();
assert.equal(guard.capture(),false);
assert.deepEqual(plain(guard.press()),{type:'catch'});
assert.equal(guard.snapshot().catching,true);
guard.tick(.5);assert.equal(guard.capture(),true);
guard.tick(.051);assert.equal(guard.capture(),false,'expired catch cannot absorb a late projectile');
near(guard.cooldown,.349);

// Releasing a successful catch is responsive during the original cooldown,
// consumes all energy once and does not create another defensive window.
const partial=guard.press();assert.deepEqual(plain(partial),{type:'release',cells:1,charged:false});
assert.equal(guard.stored,0);assert.equal(guard.window,0);near(guard.cooldown,.9);
assert.equal(guard.press(),null,'repeated input cannot manufacture another release');
assert.equal(guard.capture(),false,'release supplies no implicit invulnerability or catch window');
guard.tick(.899);assert.equal(guard.press(),null);
guard.tick(.002);assert.equal(guard.press().type,'catch');

// A burst can fill the six-cell arm but additional collision callbacks are
// rejected. Only a full arm marks its returned volley as charged.
const full=new KineticArm();full.press();
for(let i=0;i<6;i++)assert.equal(full.capture(),true);
for(let i=0;i<5;i++)assert.equal(full.capture(),false,'capacity is a hard collision budget');
assert.equal(full.stored,6);assert.equal(full.snapshot().catching,false);assert.equal(full.snapshot().label,'FULL RETURN');
const volley=full.press();assert.deepEqual(plain(volley),{type:'release',cells:6,charged:true});
assert.equal(volley.cells*KINETIC_ARM_RULES.damagePerCell,252);
assert.equal(full.press(),null);

// Dashing can catch outside the manual window, including while recharging,
// but it does not bypass capacity or start an additional catch window.
const dash=new KineticArm();dash.press();dash.tick(.6);
assert.equal(dash.window,0);assert(dash.cooldown>0);
assert.equal(dash.capture(true),true);assert.equal(dash.capture({forceDash:true}),true);
assert.equal(dash.window,0);
for(const invalid of [false,undefined,null,0,1,'true',{}, {forceDash:1}])assert.equal(dash.capture(invalid),false);
for(let i=0;i<4;i++)assert.equal(dash.capture(true),true);
assert.equal(dash.capture(true),false);

// Time advances only through a valid combat tick. Repeated snapshot reads,
// paused frames and invalid dt cannot alter the parry or cooldown budget.
const pause=new KineticArm();pause.press();pause.tick(.1);
const frozen=plain(pause.snapshot());for(let i=0;i<20;i++)pause.snapshot();
for(const dt of [0,-1,NaN,Infinity,-Infinity,'1',undefined])pause.tick(dt);
assert.deepEqual(plain(pause.snapshot()),frozen);
pause.tick(.2);near(pause.window,.25);near(pause.cooldown,.6);

// World reconstruction clears both banked shots and the manual catch state.
pause.capture();pause.reset();assert.equal(pause.stored,0);assert.equal(pause.window,0);assert.equal(pause.cooldown,0);assert.equal(pause.snapshot().ready,true);
const copied=pause.snapshot();copied.stored=999;assert.equal(pause.stored,0,'diagnostic snapshots do not mutate the controller');
console.log('KINETIC ARM: finite catch timing, responsive partial/full returns, six-cell collision cap, dash capture, cooldown gating, pause-safe clocks and world reset passed');

// The first-person model keeps geometry/material ownership bounded even when
// many bullets converge in one frame, and reset removes old-world effects.
const THREE=require('three'),visualRef={exports:{}};
vm.runInNewContext(buildSync({entryPoints:['src/kinetic-arm-visuals.js'],bundle:true,external:['three'],platform:'node',format:'cjs',write:false}).outputFiles[0].text,{require,module:visualRef,exports:visualRef.exports});
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(78,1.8,.05,400);scene.add(camera);
const arm=visualRef.exports.createKineticArmVisuals({scene,camera});
arm.update(.016,{active:true,stored:6,window:.5});const visualStats=arm.stats();assert(visualStats.draws<=32&&visualStats.triangles<4000,'gauntlet stays within its fixed model budget');
const geometryIds=new Set(),materialIds=new Set();scene.traverse(o=>{if(o.isMesh){geometryIds.add(o.geometry.uuid);materialIds.add(o.material.uuid);}});
for(let i=0;i<20;i++)arm.capture(new THREE.Vector3(i*.1,1,-4));assert.equal(arm.stats().effects,30,'capture bursts cannot exceed the pooled effect budget');
arm.release({from:new THREE.Vector3(0,1,0),to:new THREE.Vector3(0,1,-20),cells:6,charged:true});arm.update(0,{active:true,stored:0});assert.equal(arm.stats().effects,30,'a paused visual update does not age active effects');
for(let i=0;i<30;i++)arm.update(.016,{active:true,stored:0});assert.equal(arm.stats().effects,0,'capture and return effects expire');
const afterGeometry=new Set(),afterMaterials=new Set();scene.traverse(o=>{if(o.isMesh){afterGeometry.add(o.geometry.uuid);afterMaterials.add(o.material.uuid);}});assert.deepEqual([...afterGeometry].sort(),[...geometryIds].sort(),'combat effects reuse existing geometry');assert.deepEqual([...afterMaterials].sort(),[...materialIds].sort(),'combat effects reuse existing materials');
arm.capture(new THREE.Vector3(0,1,-4));arm.reset();assert.equal(arm.stats().effects,0);assert.equal(arm.root.visible,false);arm.dispose();assert.equal(arm.root.parent,null);assert.equal(camera.children.length,0,'disposing the arm detaches its first-person model');
console.log('KINETIC VISUALS: articulated model budget, bounded capture/return pools, pause, shared GPU assets, expiry and reset/dispose passed');
