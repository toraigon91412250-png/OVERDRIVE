const assert=require('node:assert/strict'),path=require('node:path'),Module=require('node:module');
const {buildSync}=require('esbuild'),T=require('three');
function load(name){const file=path.resolve(__dirname,'../src/'+name+'.js'),m=new Module(file,module);m.paths=module.paths;m._compile(buildSync({entryPoints:[file],bundle:true,external:['three'],format:'cjs',write:false}).outputFiles[0].text,file);return m.exports;}
const {PhaseControl,PHASE}=load('phase-control'),{tracePhaseShot}=load('phase-combat'),{createPhaseWeapon}=load('phase-weapon');
const control=new PhaseControl();
assert.equal(control.update(.016,true,true,12),null);
assert.deepEqual(control.update(.016,true,false,12),{kind:'bolt',ammo:1});
control.update(.03,true,true,12);control.update(.2,true,true,12);assert(control.charging,'Held input survives cooldown');control.cancelHold();
control.reset();control.update(1.22,true,true,12);assert.equal(control.cost,10);
assert.deepEqual(control.update(.01,true,false,12),{kind:'nova',ammo:10});
control.reset();control.update(2.9,true,true,24);assert.equal(control.cost,24);assert.deepEqual(control.update(.01,true,false,24),{kind:'explosion',ammo:24});
control.reset();control.update(3,true,true,1);assert.equal(control.cost,1);assert.deepEqual(control.update(.01,true,false,1),{kind:'bolt',ammo:1});
control.reset();assert.equal(control.update(2,true,true,0),null);
control.reset();control.update(.01,true,false);control.chargeOnce();
let shots=[];for(let i=0;i<150;i++){const shot=control.update(.016,true,false,12);if(shot)shots.push(shot)}
assert.deepEqual(shots,[{kind:'nova',ammo:12}]);control.cancelHold();assert.equal(control.progress,0);
const enemy=(z,x=0)=>({hp:100,r:.7,mesh:new T.Mesh(new T.IcosahedronGeometry(.7)),type:'chaser'});
const enemies=Array.from({length:5},(_,i)=>{const e=enemy(-5-i*3);e.mesh.position.set(0,0,-5-i*3);return e});
const origin=new T.Vector3(),direction=new T.Vector3(0,0,-1);
assert.equal(tracePhaseShot({origin,direction,enemies,obstacles:[]}).hits.length,1);
assert.equal(tracePhaseShot({origin,direction,enemies,obstacles:[],charged:true}).hits.length,PHASE.pierce);
const wall=new T.Mesh(new T.BoxGeometry(5,5,1),new T.MeshBasicMaterial());wall.position.z=-3;wall.updateMatrixWorld(true);
assert.equal(tracePhaseShot({origin,direction,enemies,obstacles:[wall],charged:true}).hits.length,0,'Charge never shoots through cover');
wall.visible=false;assert.equal(tracePhaseShot({origin,direction,enemies,obstacles:[wall],charged:true}).hits.length,4);

const parent=new T.Group(),model=createPhaseWeapon(parent);let count=0,triangles=0;
model.root.traverse(o=>{assert(!o.isLight);if(o.isMesh){if(o.material.transparent)assert(o.material.forceSinglePass);count++;const a=o.geometry.attributes.position;assert(a&&Array.from(a.array).every(Number.isFinite));triangles+=(o.geometry.index?.count??a.count)/3;}});
assert(count<100,'Batch the original detailed model into fewer than 100 meshes');
const camera=new T.PerspectiveCamera(84,844/390,.08,130),gun=new T.Group();camera.add(gun);gun.add(model.root);gun.position.set(.32,-.28,-.55);gun.scale.setScalar(.9);
for(const charge of [0,.5,1]){
 model.update(.5,{active:true,charge,time:2});camera.updateMatrixWorld(true);
 const socket=model.muzzle.getWorldPosition(new T.Vector3()).project(camera);
 assert(socket.x>0&&socket.x<1&&socket.y<0&&socket.y>-1,'Muzzle stays right and below the aiming reticle');
}
model.update(.016,{active:false});assert.equal(model.root.visible,false);
console.log(`PASS: phase controls, wall occlusion/piercing, geometry/framing (${count} meshes / ${Math.round(triangles)} triangles).`);


const {tracePhaseBlast}=load('phase-combat');
wall.visible=true;assert.equal(tracePhaseBlast({center:origin,from:new T.Vector3(0,0,1),radius:20,enemies,obstacles:[wall]}).length,0);
wall.visible=false;assert(tracePhaseBlast({center:origin,from:new T.Vector3(0,0,1),radius:20,enemies,obstacles:[wall]}).length>0);
const loadGame=require('./headless-runtime.cjs');
(async()=>{
for(const mobile of [false,true]){
 const g=loadGame({mobile}),t=g.api.test;g.start();t.holdSpawns();t.set({inv:999});
 const down=()=>mobile?g.element('fire').dispatch('pointerdown'):g.element('game').dispatch('mousedown');
 const up=()=>mobile?g.element('fire').dispatch('pointerup'):g.dispatchWindow('mouseup');
 if(mobile){for(let i=0;i<3;i++)g.element('swap').dispatch('pointerdown');}else g.key('Digit4');
 g.step(.03);assert.equal(g.api.snapshot().weapon,3);assert.equal(g.api.snapshot().phaseVisible,true);
 down();up();g.step(.032);assert.equal(g.api.snapshot().ammo[3],11);assert.equal(g.api.snapshot().phaseShots,1,'Quick tap fires once');
 g.step(.2);down();g.step(.5);g.element('pause').onclick();g.step(.1);up();g.element('resume').onclick();g.step(.032);assert.equal(g.api.snapshot().ammo[3],11,'Pause cancels without consuming');
 down();g.step(1.3);up();g.step(.032);assert.equal(g.api.snapshot().novaShots,1);assert(g.api.snapshot().phaseSpent>=11);
 t.set({ammo:[50,10,6,1]});g.step(.4);down();g.step(2);up();g.step(.032);assert.equal(g.api.snapshot().ammo[3],0);assert.equal(g.api.snapshot().novaShots,1,'Last cell cannot create NOVA');
 t.set({ammo:[50,10,6,12]});g.step(.4);g.element('reload').dispatch('pointerdown');g.step(1.7);assert.equal(g.api.snapshot().ammo[3],0);const n=g.api.snapshot().phaseShots;g.step(.3);assert.equal(g.api.snapshot().phaseShots,n,'Auto-charge produces one shot');
 t.set({charge:100,over:0,ammo:[50,10,6,20]});t.dash();g.step(.016);assert.equal(g.api.snapshot().ammo[3],24);assert(g.api.snapshot().over>0);assert.equal(g.api.snapshot().weapon,3);
 t.weapon(0);t.set({charge:100,over:0,ammo:[50,10,6,0]});t.dash();g.step(.016);assert.equal(g.api.snapshot().ammo[3],12);assert.equal(g.api.snapshot().weapon,0,'Refill never forces weapon selection');
 t.set({over:0,charge:0});t.weapon(3);g.step(.02);assert(g.api.snapshot().phaseActive,'Fourth weapon works outside OVERDRIVE');
 // Real game damage: NOVA has multiplied direct damage AND damaging radial impact.
 t.set({inv:999,x:0,z:12,dashing:0});g.step(.016);const main=t.spawn('charger',0,6),near=t.spawn('charger',3,6);main.hp=main.max=10000;near.hp=near.max=10000;t.aim(0,1,6);t.set({ammo:[50,10,6,12]});t.firePhase({ammo:10,kind:'nova'});
 assert(main.hp<10000-720,'Main target receives multiplied lance plus blast');assert(near.hp<10000-100,'Off-axis target receives large blast damage');assert.equal(g.api.snapshot().ammo[3],2);
 // Partial charge, swap cancellation, standard reload, effect expiry and restart.
 g.step(.4);down();g.step(.3);t.weapon(0);up();g.step(.1);assert.equal(g.api.snapshot().phaseCharge,0);assert.equal(g.api.snapshot().phaseVisible,false);
 t.set({ammo:[0,10,6,2],over:0});t.reload?.();g.key('KeyR');if(mobile)g.element('reload').dispatch('pointerdown');g.step(1.4);assert.equal(g.api.snapshot().ammo[0],50,JSON.stringify(g.api.snapshot()));
 g.element('restart').onclick();g.step(.03);assert.equal(g.api.snapshot().ammo[3],12);assert.equal(g.api.snapshot().novaShots,0);
}
for(const difficulty of ['normal','easy']){
 const g=loadGame({difficulty}),t=g.api.test;g.start();if(difficulty==='normal')await g.api.bossAssetsReady();if(difficulty==='easy')g.element('tutorial-skip').dispatch('click');t.set({inv:999});
 for(let wave=1;wave<=6;wave++){
  assert.equal(g.api.snapshot().wave,wave);t.killWave();g.step(1.4);
  for(let i=0;i<30&&g.api.snapshot().state==='upgrade';i++){g.element('choices').children[0].onclick();g.step(.032);}if(g.api.snapshot().state==='rebuilding')g.step(g.api.snapshot().world.duration+.02);
 }
 if(difficulty==='normal'){for(let n=0;n<50&&g.api.snapshot().state!=='victory';n++){const state=g.api.snapshot().state;if(state==='upgrade')g.element('choices').children[0].onclick();else if(state==='rebuilding'){g.element('rebuild-skip').onclick();g.step(.032);}else{t.damage(t.rushBoss(),1e9);t.update(.016);}}}
 assert.equal(g.api.snapshot().state,'victory');
}
console.log('PASS: PC/touch fourth slot, quick taps, variable costs, last cell, NOVA direct/radial damage, auto charge, refill/cap, pause/swap/restart, cover, both difficulty progressions.');

})().catch(error=>{console.error(error);process.exitCode=1});
