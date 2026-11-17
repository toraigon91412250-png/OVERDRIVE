// Real Three.js scene and flight simulation; pixel rendering is outside this runner.
const assert=require('assert/strict');
const {load}=require('./odm-runtime.cjs');
const tap=(g,id)=>{g.element(id).dispatch('pointerdown');g.element(id).dispatch('pointerup')};
for(const mobile of [false,true]){
 const g=load(mobile);g.api.beginMission();g.step(.2);
 g.api.setPlayer([0,1.78,50]);g.api.setAim(0,0);g.step(.05);
 if(mobile)tap(g,'#leftTouch');else g.element('canvas').dispatch('mousedown',{button:2});
 g.step(.3);let launch=g.api.getState();
 assert(!launch.grounded&&launch.pos[1]>4,'A ground-level hook takes off without holding jump or gas');
 assert(launch.hookAnchors[0][1]>9,'Ground assist selects a real elevated anchor');
 const cable=g.scene().getObjectByName('odm-steel-cable-0');
 assert(cable?.isInstancedMesh&&cable.material.metalness>.85&&cable.visible,'The rendered scene contains a physical metallic cable');
 assert(Array.from(cable.instanceMatrix.array).every(Number.isFinite),'Cable segments stay finite while extending/reeling');
 const releaseSpeed=Math.hypot(...launch.vel);
 if(mobile)tap(g,'#leftTouch');else g.dispatch('mouseup',{button:2});
 let released=g.api.getState();assert.equal(released.hooks[0],'idle');assert(Math.hypot(...released.vel)>=releaseSpeed*.99,'Releasing the wire preserves flight momentum');
 g.step(1.2);let glide=g.api.getState();assert(!glide.grounded&&glide.pos[1]>10&&glide.airTime>1.3,'Flight continues after the wire is released');
 assert(!cable.visible,'Detaching removes the physical cable');
 g.api.reset();g.api.setPlayer([0,1.78,76]);g.step(.04);tap(g,'#jumpTouch');g.step(.4);assert(g.api.getState().pos[1]>7,'Jump provides a useful takeoff');g.step(1.6);assert(g.api.getState().pos[1]>10,'A takeoff lasts more than a brief hop');
 g.api.reset();g.api.setPlayer([0,28,100]);g.api.setAim(0,0);g.step(.5);let before=g.api.getState();assert(before.vel[1]<0);tap(g,'#jumpTouch');let dash=g.api.getState();assert(dash.vel[1]>=17&&dash.gas<=before.gas-8,'Air jump trades gas for renewed upward flight');tap(g,'#jumpTouch');assert.equal(g.api.getState().gas,dash.gas,'Air boost cooldown prevents repeated instant charges');
 g.api.reset();g.api.setPlayer([0,45,150]);g.api.setAim(0,.4);g.step(.02);g.element('#gasTouch').dispatch('pointerdown');g.step(.8);g.element('#gasTouch').dispatch('pointerup');let boosted=g.api.getState();const horizontal=Math.hypot(boosted.vel[0],boosted.vel[2]);g.step(2);let coast=g.api.getState();assert(!coast.grounded&&coast.airTime>2.5,'Boost links into several seconds of airborne travel');assert(Math.hypot(coast.vel[0],coast.vel[2])>horizontal*.85,'Gliding keeps horizontal speed');assert(coast.gas>boosted.gas,'Gas recovers while coasting in the air');
 g.api.reset();g.api.setPlayer([0,24,70]);g.step(.02);
 const aimAt=target=>{let p=g.api.getState().pos,dx=target[0]-p[0],dy=target[1]-p[1],dz=target[2]-p[2];g.api.setAim(Math.atan2(-dx,-dz),Math.atan2(dy,Math.hypot(dx,dz)))};
 aimAt([-64,18,-4]);g.api.fireHook(0);g.step(.55);aimAt([64,18,-4]);g.api.fireHook(1);g.step(.55);assert(g.api.getState().hooks.every(h=>h==='locked'),'Both separate anchors can connect');
 let maxStep=0;for(let n=0;n<180;n++){let a=g.api.getState().pos;g.step(.016);let b=g.api.getState().pos;maxStep=Math.max(maxStep,Math.hypot(...b.map((v,j)=>v-a[j])))}assert(maxStep<4,'Different left/right anchors do not create a teleporting tug of war');
 g.api.reset();g.api.setPlayer([0,15,76]);g.api.setAim(0,1.5);g.step(.02);g.api.fireHook(0);assert.equal(g.api.getState().hooks[0],'idle','Open sky never creates a fake anchor');
 console.log('PASS ODM flight',mobile?'mobile':'desktop','automatic takeoff, sustained glide, aerial boost, fuel recovery, steel cable scene');
}
// Compare the same route with/without its older support rope: it must affect the arc.
function supportArc(keepSupport){
 const g=load(false);g.api.beginMission();g.api.setPlayer([0,24,70]);g.step(.02);
 const aim=t=>{const p=g.api.getState().pos,dx=t[0]-p[0],dy=t[1]-p[1],dz=t[2]-p[2];g.api.setAim(Math.atan2(-dx,-dz),Math.atan2(dy,Math.hypot(dx,dz)))};
 aim([-64,18,-4]);g.api.fireHook(0);g.step(.55);aim([64,18,-4]);g.api.fireHook(1);g.step(.55);if(!keepSupport)g.api.releaseHook(0);g.step(1.3);return g.api.getState().pos;
}
const supported=supportArc(true),single=supportArc(false);assert(Math.hypot(...supported.map((v,i)=>v-single[i]))>2,'The older wire contributes to the flight arc');
console.log('PASS ODM secondary wire contributes without fighting the main reel');
