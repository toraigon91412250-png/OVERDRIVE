// Exercises the real city/roster/collision integration. Renderer is stubbed;
// geometry, animations, rays, resources, combat and mission lifecycle are real.
const assert=require('node:assert/strict'),vm=require('node:vm'),esbuild=require('esbuild');
global.self=global;global.createImageBitmap=async()=>({width:16,height:16,close(){}});
global.document={createElement:()=>({width:256,height:256,getContext:()=>new Proxy({measureText:()=>({width:50}),createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>o[k]||(()=>{})})})};
const m={exports:{}};const r=esbuild.buildSync({entryPoints:['src/titan/index.js'],bundle:true,platform:'node',format:'cjs',write:false});vm.runInThisContext('(function(module,exports,require){'+r.outputFiles[0].text+'})')(m,m.exports,require);
const {load}=require('./odm-runtime.cjs');
(async()=>{
 const g=load(false,{RaidModels:m.exports});
 for(let i=0;i<300&&!g.api.getModels()?.ready;i++)await new Promise(resolve=>setImmediate(resolve));
 assert(g.api.getModels()?.ready,'Full district loads and enables mission start');
 assert.equal(g.api.getModels().enemies.length,13);assert(g.api.getModels().enemies.some(e=>e.type==='warhammer'));
 assert(g.api.getCity()?.buildingCount>300,'Supplied architecture replaces the city');
 assert(!g.api.worldColliders().some(c=>c.name==='raid-district-house'),'Hidden old town cannot leave invisible solid walls');
 const field=g.api.getBattlefield();assert.equal(field.supply.stations.length,3,'Three actual supply camps occupy separate districts');
 g.api.beginMission();g.step(.016);
 assert(g.api.getState().running&&!g.api.getState().missionOver,'Mission runs after startup');
 for(const enemy of g.api.getModels().enemies){const radius=enemy.type==='colossal'?10:enemy.type==='jaw'?2:3;assert(!g.api.worldColliders().some(c=>c.name==='raid-shiganshina-city'&&c.bottom<15&&Math.abs(c.x-enemy.position[0])<c.hx+radius-.01&&Math.abs(c.z-enemy.position[2])<c.hz+radius-.01),'Enemy starts outside solid district geometry: '+enemy.type);}
 for(const station of field.supply.stations){g.api.setPlayer([station.x,5,station.z]);g.api.setVelocity([0,-10,0]);g.step(.6);assert(g.api.getState().grounded,'Supply platform can be landed on');g.api.setResources(15,1);g.step(1.5);assert.equal(g.api.getState().gas,100,'Cache supplies gas');assert.equal(g.api.getState().spares,5,'Cache supplies blades');g.step(8.5);}
 // Ammo-only depletion also triggers a camp refill; aiming upward avoids enemy hits.
 g.api.setAim(0,1.1);g.api.pressThunder();g.api.pressThunder();assert.equal(g.api.getState().ammo,3,'A fired spear consumes one round');g.api.sheathe();g.step(1.5);assert.equal(g.api.getState().ammo,4,'Supply camp restores spear ammunition without a kill');
 // Land on both orientations of real supplied roofs, and on a hip roof.
 for(const style of ['x','z','hip']){
  const roof=g.api.worldColliders().find(c=>c.name==='raid-shiganshina-city'&&c.roofHeight>3&&(style==='hip'?c.roofShape==='hip':c.roofAxis===style&&c.roofShape!=='hip')&&Math.abs(c.x)<400&&Math.abs(c.z)<350);
  assert(roof,'Rendered roof exists in orientation '+style);
  g.api.setPlayer([roof.x,roof.top+4,roof.z]);g.api.setVelocity([0,-8,0]);g.step(.7);
  assert(g.api.getState().grounded,'Player lands on imported roof '+style);assert(Math.abs(g.api.getState().pos[1]-roof.top-1.78)<.15,'Collision follows imported roof crest '+style);
 }
 g.api.setRoute('forest');assert(!g.api.getCity().visible);assert(!g.api.worldColliders().some(c=>c.name==='raid-shiganshina-city'));g.api.setRoute('city');assert(g.api.getCity().visible);
 // Fight the new enemy with the existing public human blade controls.
 g.element('#changeLoadout').onclick();await g.api.selectTitan('warhammer');g.api.beginMission();g.step(.016);
 let before=g.api.getModels().enemies[0];const aimAt=(point,from)=>{g.api.setPlayer(from);g.api.setVelocity([0,0,0]);const d=point.map((v,i)=>v-from[i]);g.api.setAim(Math.atan2(-d[0],-d[2]),Math.atan2(d[1],Math.hypot(d[0],d[2])));};
 const from=before.nape.map((v,i)=>v-before.forward[i]*3);aimAt(before.nape,from);g.api.fireHook(0);g.step(.35);assert(['firing','locked'].includes(g.api.getState().hooks[0]),'Human wire can attach to the supplied enemy');g.api.releaseHook(0);
 for(let i=0;i<8&&g.api.getModels().enemies[0].alive;i++){const e=g.api.getModels().enemies[0];aimAt(e.nape,e.nape.map((v,j)=>v-e.forward[j]*3));g.api.slash();g.step(.4);}
 assert(!g.api.getModels().enemies[0].alive,'Existing blade action can kill the actual animated warhammer nape');assert(g.api.getState().pendingVictory>0);g.step(3.6);assert(g.api.getState().missionOver,'Defeat animation completes into a real victory');
 g.element('#changeLoadout').onclick();await g.api.selectTitan('raid');g.api.beginMission();g.step(.016);assert.equal(g.api.getModels().enemies.filter(e=>e.alive).length,13,'Replay restores all independent enemies');
 const rules=esbuild.buildSync({entryPoints:['src/titan/combat-rules.js'],bundle:true,platform:'node',format:'cjs',write:false});const combat={exports:{}};new Function('module','exports','require',rules.outputFiles[0].text)(combat,combat.exports,require);const resolve=combat.exports.resolveTitanPunch;assert(resolve({kind:'warhammer',facing:1}).damage<resolve({kind:'warhammer',facing:-1}).damage,'Warhammer rewards flank attacks');assert(resolve({kind:'warhammer',facing:1,phase:'recovery'}).damage>resolve({kind:'warhammer',facing:1}).damage,'Committed hammer attack creates a punishable opening');
 console.log('PASS district startup,13 independent enemies,clear spawns,three real supply caches,route transitions,warhammer wire/blade kill,victory,replay and flank/opening combat');
})().catch(error=>{console.error(error);process.exitCode=1});
