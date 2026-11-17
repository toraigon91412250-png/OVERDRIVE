const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),e=require('esbuild');
global.self=global;global.createImageBitmap=async()=>({width:16,height:16,close(){}});global.document={createElement:()=>({width:256,height:256,getContext:()=>new Proxy({measureText:()=>({width:50}),createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>o[k]||(()=>{})})})};
const out=e.buildSync({entryPoints:['src/titan/index.js'],bundle:true,platform:'node',format:'cjs',write:false});const m={exports:{}};vm.runInThisContext('(function(module,exports,require){'+out.outputFiles[0].text+'})')(m,m.exports,require);
const {load}=require('./odm-runtime.cjs');
(async()=>{
 const g=load(false,{RaidModels:m.exports});for(let i=0;i<200&&!g.api.getModels()?.ready;i++)await new Promise(r=>setImmediate(r));
 const initial=g.api.getModels();assert.equal(initial.ready,true);assert.equal(initial.operation,'raid');assert.equal(initial.enemies.length,13);assert.equal(new Set(initial.enemies.map(x=>x.id)).size,13);assert.equal(initial.enemies.filter(x=>x.alive).length,13);assert.equal(new Set(initial.enemies.map(x=>x.position.join(','))).size,13,'Distinct live spawn positions');assert.equal(initial.hero.ready,true);assert(initial.enemies.some(e=>e.type==='colossal'));assert.equal(initial.enemies.filter(e=>e.type==='armored').length,2);
 g.api.beginMission();g.step(.032);assert.equal(g.api.getState().running,true);
 function key(code){g.dispatch('keydown',{code});g.dispatch('keyup',{code});}
 const ammo=g.api.getState().ammo;key('KeyR');g.step(.016);assert.equal(g.api.getState().ammo,ammo,'First R equips without consuming ammo');assert.equal(g.api.getState().spearArmed,true);assert(g.api.getModels().spears.some(s=>s.visible));key('KeyR');g.step(.016);assert.equal(g.api.getState().ammo,ammo-1,'Second R fires');key('KeyF');assert.equal(g.api.getState().spearArmed,false);
 key('KeyT');assert.equal(g.api.getState().titanForm,true);assert.equal(g.api.getModels().hero.state,'emerging');g.step(2.5);assert.equal(g.api.getModels().hero.state,'titan');
 key('KeyQ');key('KeyE');assert(g.api.getState().hooks.every(x=>x==='idle'),'ODM wires cannot fire while transformed');const energy=g.api.getModels().hero.energy;g.dispatch('blur');g.step(1);assert.equal(g.api.getModels().hero.energy,energy,'Pause freezes transformation energy');g.element('#pauseHint').dispatch('click');
 const start=g.api.getState().pos;g.dispatch('keydown',{code:'KeyW'});g.step(.5);g.dispatch('keyup',{code:'KeyW'});assert(Math.hypot(...g.api.getState().pos.map((v,i)=>v-start[i]))>2,'The transformed player moves');key('Space');g.step(.2);assert(g.api.getState().vel[1]>0,'The transformed player jumps');
 const enemy=g.api.getModels().enemies.find(x=>x.type==='attack'&&x.alive);g.api.setPlayer([enemy.position[0],12.8,enemy.position[2]+4]);g.api.setAim(0,0);g.step(6);assert(g.api.getModels().hero.health<100,'Enemy attacks can damage the playable titan');assert.equal(g.api.getState().health,3,'Titan body damage is separate from human vitals');g.api.setPlayer([enemy.position[0],12.8,enemy.position[2]+6]);g.api.setAim(0,0);key('KeyF');g.step(.8);let damaged=g.api.getModels().enemies.find(x=>x.id===enemy.id);assert(damaged.hp<enemy.maxHp,'Player titan punch damages an enemy');g.api.setPlayer([damaged.position[0],12.8,damaged.position[2]+6]);g.api.setAim(0,0);key('KeyF');g.step(.8);damaged=g.api.getModels().enemies.find(x=>x.id===enemy.id);assert.equal(damaged.alive,false,'Player titan can defeat an enemy');assert.equal(g.api.getState().missionOver,false,'One kill does not end a 13-enemy raid');assert.equal(g.api.getModels().enemies.filter(x=>x.alive).length,12);
 key('KeyT');assert.equal(g.api.getState().titanForm,false);assert.equal(g.api.getModels().hero.state,'human');
 console.log('PASS simultaneous 13-enemy raid, R equip/fire, playable transformation, movement, jump, punch kill, ejection');
 g.api.reset();g.step(.032);assert.equal(g.api.getModels().enemies.filter(x=>x.alive).length,13);assert.equal(g.api.getModels().hero.state,'human');assert.equal(g.api.getState().spearArmed,false);
 // A missile must retain its owner even when the reticle switches to another titan.
 const armored=g.api.getModels().enemies.find(e=>e.type==='armored');const otherArmor=g.api.getModels().enemies.filter(e=>e.type==='armored')[1];const normal=g.api.getModels().enemies.find(e=>e.type==='attack');
 const aim=(point,from)=>{g.api.setPlayer(from);const d=point.map((v,i)=>v-from[i]);g.api.setAim(Math.atan2(-d[0],-d[2]),Math.atan2(d[1],Math.hypot(d[0],d[2])));};
 let point=armored.shoulders[0],f=armored.forward;aim(point,[point[0]+f[0]*3,point[1],point[2]+f[2]*3]);key('KeyR');key('KeyR');point=normal.nape;f=normal.forward;aim(point,[point[0]-f[0]*3,point[1],point[2]-f[2]*3]);g.api.getAimTarget();g.step(.12);
 assert.equal(g.api.getModels().enemies.find(e=>e.id===armored.id).armor[0],false,'Missile damages its original target');assert.equal(g.api.getModels().enemies.find(e=>e.id===otherArmor.id).armor[0],true,'Another titan keeps its own armor');assert.equal(g.api.getModels().enemies.find(e=>e.id===normal.id).hp,normal.hp,'Changing reticle does not redirect damage');g.api.reset();g.step(.016);
 console.log('PASS missile ownership while switching targets');
 // Kill through public blade actions, checking owner-specific armor/HP and mission completion.
 function aimAt(point,from){g.api.setPlayer(from);const d=point.map((v,i)=>v-from[i]);g.api.setAim(Math.atan2(-d[0],-d[2]),Math.atan2(d[1],Math.hypot(d[0],d[2])));}
 const ids=g.api.getModels().enemies.map(x=>x.id);
 for(const id of ids){
  let enemy=g.api.getModels().enemies.find(x=>x.id===id);if(!enemy.alive)continue;
  if(enemy.type==='armored')for(let side=0;side<2;side++)for(let cut=0;cut<3;cut++){enemy=g.api.getModels().enemies.find(x=>x.id===id);const point=enemy.shoulders[side],f=enemy.forward;aimAt(point,[point[0]+f[0]*2.8,point[1],point[2]+f[2]*2.8]);g.api.slash();g.step(.4);}
  for(let cut=0;cut<8;cut++){enemy=g.api.getModels().enemies.find(x=>x.id===id);if(!enemy.alive)break;const point=enemy.nape,f=enemy.forward;aimAt(point,[point[0]-f[0]*3,point[1],point[2]-f[2]*3]);g.api.slash();g.step(.4);}
  enemy=g.api.getModels().enemies.find(x=>x.id===id);assert.equal(enemy.alive,false,'Real blade actions defeat '+id+' '+enemy.type+' hp '+enemy.hp);
 }
 assert.equal(g.api.getState().missionOver,false,'The final titan gets its collapse and steam animation before the result screen');assert.equal(g.api.getModels().enemies.filter(x=>x.alive).length,0);assert(g.api.getState().pendingVictory>3,'The victory screen waits for the defeat animation');g.step(1);assert.equal(g.api.getModels().deathSteam,true,'The defeated final titan emits steam while collapsing');assert(g.scene().getObjectByName('titan-12').rotation.x<-.5,'The giant leans into its fall');g.step(2.5);assert.equal(g.api.getState().missionOver,true,'The result screen appears after the titan disappears');assert.equal(g.scene().getObjectByName('titan-12').visible,false,'The defeated final titan has disappeared');assert.match(g.element('#raidObjective').textContent,/13 \/ 13/);
assert.match(g.element('#endTitle').textContent,/市街地/);
 g.api.reset();g.api.setPlayer([400,1.78,400]);g.api.setAim(0,0);key('KeyT');g.step(2.3);assert.equal(g.api.getModels().hero.state,'titan');key('KeyT');assert.equal(g.scene().getObjectByName('player-transformation-fx').visible,false,'Early ejection clears transformation light and lightning');
 g.api.reset();g.api.setPlayer([400,1.78,400]);key('KeyT');g.step(44);assert.equal(g.api.getModels().hero.state,'human','Energy exhaustion ejects the player');assert.equal(g.api.getState().titanForm,false);assert(g.api.getState().pos.every(Number.isFinite));
 g.element('#changeLoadout').onclick();const switching=Promise.all([g.api.selectTitan('raid'),g.api.selectTitan('armored')]);await switching;g.step(.016);assert.equal(g.api.getModels().enemies.length,1);assert.equal(g.scene().children.filter(o=>/^titan-/.test(o.name)&&o.visible).length,1,'Canceled raid loads do not reveal inactive enemies');
 await g.api.selectTitan('raid');g.api.beginMission();g.step(.016);assert.equal(g.api.getModels().enemies.filter(e=>e.alive).length,13,'Raid can restart after single-target training');
 console.log('PASS transformation pause, blocked wire input, early FX cleanup, automatic ejection, rapid mode switching and replay');
 // An imported actor routes around actual supplied architecture.
 g.element('#changeLoadout').onclick();await g.api.selectTitan('attack');g.api.beginMission();g.step(.016);const actor=g.scene().children.find(o=>o.name==='titan-0');
 const solids=g.api.worldColliders().filter(c=>c.name==='raid-shiganshina-city'&&c.bottom<15);
 const clear=(x,z)=>!solids.some(c=>Math.abs(x-c.x)<c.hx+2&&Math.abs(z-c.z)<c.hz+2);
 const house=solids.find(c=>c.bottom<1&&c.top>10&&c.top<30&&c.hx<10&&c.hz<12&&Math.abs(c.x)>100&&Math.abs(c.z)<150&&clear(c.x,c.z+c.hz+8)&&clear(c.x,c.z-c.hz-8));
 assert(house,'A supplied street house has reachable street space on both sides');actor.position.set(house.x,0,house.z+house.hz+8);let passedHouse=false;
 for(let i=0;i<600;i++){g.api.setPlayer([house.x,90,house.z-house.hz-8]);g.step(.1);if(Math.abs(actor.position.z-house.z)<house.hz){passedHouse=true;assert(Math.abs(actor.position.x-house.x)>house.hx+1.5,'Pursuit stays outside supplied masonry');}}
 assert(passedHouse,'The imported titan actually navigates around the supplied building');assert(Math.hypot(actor.position.x-house.x,actor.position.z-(house.z-house.hz-8))<8,'The titan reaches the target street');
 console.log('PASS imported titan city pursuit around supplied houses without crossing walls');
 console.log('PASS independent enemy health/armor, all 13 blade kills, final victory and full reset');
})().catch(err=>{console.error(err);process.exitCode=1});
