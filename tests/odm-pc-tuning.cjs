// Behavioral checks against the full bundled simulation with real Three math.
// Renderer is stubbed: this suite does not establish pixel quality or human play feel.
const fs=require('fs'),assert=require('assert/strict');
const {load}=require('./odm-runtime.cjs');
const html=fs.readFileSync(process.argv[2]||'src/odm-titan-raid-trial.html','utf8');
for(const id of ['motionReadout','motionState','motionHint','speedIndicator','guideTip','centerMessage','bottomHelp','flightClock','setTrail']){
 assert(!html.includes(`id="${id}"`),`${id} is absent from the visible document`);
}
assert(!html.includes('qn.push('),'The persistent flight trail is not generated');
const begin=()=>{let g=load(false);g.api.beginMission();g.step(.032);return g};
const speed=s=>Math.hypot(...s.vel);
const g=begin();g.api.setPlayer([220,100,0]);g.api.setAim(0,0);g.step(.032);g.api.fireHook(0);g.step(.9);
assert.equal(g.api.getState().hooks[0],'locked','A long wire attaches to the clock tower');
let maxSpeed=0,maxActualSpeed=0;
for(let i=0;i<90;i++){
 const before=g.api.getState();g.step(.016);const after=g.api.getState();
 maxSpeed=Math.max(maxSpeed,speed(after));
 const elapsed=after.simTime-before.simTime;
 maxActualSpeed=Math.max(maxActualSpeed,Math.hypot(...after.pos.map((x,j)=>x-before.pos[j]))/elapsed);
}
// The user later restored normal flight speed; the default 80m/s setting reels at about 61m/s.
assert(maxSpeed>50&&maxSpeed<64,`Neutral wire speed is controllable: ${maxSpeed}`);
assert(maxActualSpeed<65,`Reeling cannot bypass the speed cap through position corrections: ${maxActualSpeed}`);
const release=speed(g.api.getState());g.api.releaseHook(0);assert.equal(speed(g.api.getState()),release,'Releasing the wire does not remove momentum');
const gas=begin();gas.api.setPlayer([0,80,150]);gas.api.setAim(0,0);gas.element('#gasTouch').dispatch('pointerdown');gas.step(1);gas.element('#gasTouch').dispatch('pointerup');
let boosted=gas.api.getState();assert(speed(boosted)>20&&speed(boosted)<42,'Gas accelerates without an immediate top-speed launch');assert(boosted.pos[1]<80,'Horizontal gas is not a vertical jet');assert(boosted.gas>80,'Tuning does not punish the player with a fuel restriction');
const close=begin();close.api.setPlayer([64,14,9.5]);close.api.setAim(0,0);close.step(.016);close.api.fireHook(0);close.step(.08);
assert.equal(close.api.getState().hooks[0],'locked','A four-meter anchor stays attached instead of immediately dropping');
close.step(.6);assert.equal(close.api.getState().hooks[0],'idle','A close anchor still releases when approached');
assert(!/慣性|巻取|牽引/.test(close.element('#notice').textContent),'Routine movement no longer produces text notices');
const camera=begin();camera.api.setPlayer([64,8,8]);camera.api.setAim(Math.PI,0);camera.step(.016);camera.api.toggleView();camera.step(.032);
const lens=camera.scene().children.find(x=>x.isPerspectiveCamera);assert(lens.position.z>=5.8&&lens.position.z<8,'Third-person boom stops in front of a nearby wall');
const roof=begin();roof.api.setPlayer([64,33,-4]);roof.step(1.4);const landed=roof.api.getState();assert(landed.grounded&&landed.pos[1]>27&&landed.pos[1]<28,'The red gable roof is a solid landing surface');
const scene=g.scene();const houses=scene.children.filter(x=>x.name==='raid-district-house');assert.equal(houses.length,22,'The designed district has a bounded set of houses');assert(houses.every(x=>Math.abs(x.position.x)>50||x.position.z<-50||x.position.z>80),'The combat plaza and main avenue stay clear');
for(let i=0;i<houses.length;i++)for(let j=i+1;j<houses.length;j++){
 const a=houses[i],b=houses[j];assert(Math.abs(a.position.x-b.position.x)>=(a.scale.x+b.scale.x)/2||Math.abs(a.position.z-b.position.z)>=(a.scale.z+b.scale.z)/2,'District buildings do not overlap');
}
const tower=begin();tower.api.setPlayer([233,40,-180]);tower.step(.032);assert(Math.abs(tower.api.getState().pos[0]-233)<.01,'The overhanging clock room does not create an invisible wall below it');
assert(scene.getObjectByName('raid-stone-avenue')?.material.map,'Stone paving is present');assert(scene.getObjectByName('odm-steel-cable-0')?.material.metalness>.85,'The steel wire remains intact');
const outside=load(false);outside.element('#start').dispatch('click');outside.step(.016);outside.unlock();outside.element('canvas').dispatch('mousedown',{button:2});assert(outside.api.getState().hooks.every(x=>x==='idle'),'Right click outside pointer lock cannot fire wires');
console.log('PASS ODM PC tuning',JSON.stringify({maxWireSpeed:+maxSpeed.toFixed(2),maxActualSpeed:+maxActualSpeed.toFixed(2),gasOneSecondSpeed:+speed(boosted).toFixed(2),roofHeight:+landed.pos[1].toFixed(2)}));
