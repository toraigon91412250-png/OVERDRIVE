const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),e=require('esbuild');
global.self=global;global.createImageBitmap=async()=>({width:16,height:16,close(){}});global.document={createElement:()=>({width:256,height:256,getContext:()=>new Proxy({measureText:()=>({width:50}),createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>o[k]||(()=>{})})})};
const out=e.buildSync({entryPoints:['src/titan/index.js'],bundle:true,platform:'node',format:'cjs',write:false});const m={exports:{}};vm.runInThisContext('(function(module,exports,require){'+out.outputFiles[0].text+'})')(m,m.exports,require);
const {load}=require('./odm-runtime.cjs');
(async()=>{
 const g=load(false,{RaidModels:m.exports});for(let i=0;i<200&&!g.api.getModels()?.ready;i++)await new Promise(r=>setImmediate(r));
 g.element('#changeLoadout').onclick();await g.api.selectTitan('attack');g.api.beginMission();g.api.setPlayer([400,1.78,420]);g.api.transform();g.step(2.5);
 const actor=g.scene().getObjectByName('titan-0');actor.position.set(400,0,400);g.api.setPlayer([400,12.8,406]);g.api.setAim(0,0);g.step(.016);
 const root=g.scene().getObjectByName('player-attack-titan'),waist=root.getObjectByName('hero-waist'),chest=root.getObjectByName('hero-chest');
 const head=root.getObjectByName('Head_149'),faceMesh=head.getObjectByName('Mesh_150'),faceSkin=faceMesh.material;let bodySkin,hair;root.traverse(o=>{if(!o.isMesh)return;if(o.material.name==='skin')bodySkin=o.material;if(o.material.name==='Mat_141110')hair=o.material;});
 assert(faceSkin&&bodySkin&&faceSkin!==bodySkin,'Face correction is scoped to its own material');assert(faceMesh.geometry.attributes.normal,'The face has explicit smooth lighting normals');assert(faceMesh.geometry.attributes.color&&faceSkin.vertexColors,'The original facial colours remain');assert.equal(faceSkin.side,2,'The face renders both sides');assert(faceSkin.emissiveIntensity>.1&&bodySkin.emissive.r===0,'The face receives modest indirect fill');assert(hair&&hair.emissive.r===0&&hair.color.r<.1,'Dark hair keeps its original material');
 function punch(){g.dispatch('keydown',{code:'KeyF'});g.dispatch('keyup',{code:'KeyF'});}
 const before=g.api.getState().pos.slice();punch();g.step(.12);assert.equal(g.api.getModels().enemies[0].hp,100,'Windup deals no damage');assert(waist.rotation.y>.05&&chest.rotation.y>.05,'Both waist and chest wind up');
 const fistHeights=[],fistPositions=[];let hit=false,atHit=100,side;
 for(let i=0;i<45;i++){
  g.step(.016);const hero=g.api.getModels().hero;
  if(hero.attack>.33&&hero.attack<.60&&!hero.contactResponse){fistHeights.push(hero.fist[1]);fistPositions.push(hero.fist);}
  const enemy=g.api.getModels().enemies[0];
  if(enemy.hp<100&&!hit){
   hit=true;atHit=enemy.hp;side=hero.attackSide;
   assert.equal(hero.hitCount,1);assert(g.api.getState().hitStop>0,'Contact creates hitstop');assert(hero.contactResponse,'Only a real contact starts contact recovery');
   assert.equal(g.api.getState().lastPunchImpact.side,1);assert.equal(g.element('#impactLabel').textContent,'','Contact uses the scene instead of hit text');assert.equal(Number(g.element('#impactLines').style.opacity),0);
   assert(chest.rotation.y<0,'Torso rotates through the strike');
   const reaction=actor.getObjectByName('raid-impact-upper-body');assert(reaction&&Math.hypot(reaction.rotation.x,reaction.rotation.z)>.05,'The enemy upper body reacts immediately at contact');
   assert(Math.abs(actor.rotation.x)+Math.abs(actor.rotation.z)<.001,'The hit does not tip the entire target from its feet');
   const contactFist=hero.fist.slice(),contactEnemy=enemy.position.slice();g.step(.032);
   assert(Math.hypot(...g.api.getModels().hero.fist.map((v,k)=>v-contactFist[k]))<.02,'The real fist holds its contact pose during hitstop');
   assert(Math.hypot(...g.api.getModels().enemies[0].position.map((v,k)=>v-contactEnemy[k]))<.02,'Target knockback waits for the compression beat');
  }
 }
 assert(fistHeights.length>1&&Math.max(...fistHeights)-Math.min(...fistHeights)<.35,'The incoming strike stays level');
 assert(hit,'The visible fist sweep connects');assert.equal(atHit,40);assert.equal(g.api.getModels().enemies[0].hp,40,'One swing hits a target once');
 assert(g.api.getState().pos[2]<before[2]-.1,'The strike plants a forward step');assert(g.api.getModels().enemies[0].position[2]<400-.5,'The enemy recoils away after contact');
 assert.equal(g.api.getModels().hero.contactResponse,null,'Contact returns the fist to guard');
 let enemy=g.api.getModels().enemies[0];g.api.setPlayer([enemy.position[0],12.8,enemy.position[2]+6]);g.api.setAim(0,0);punch();g.step(.95);assert.equal(g.api.getModels().hero.attackSide,-side,'The next punch uses the other hand');assert.equal(g.api.getModels().enemies[0].alive,false);
 console.log('PASS whole body windup, step, right/left fist contact, once per swing, hitstop, recoil and kill');
 g.api.reset();g.api.setPlayer([400,1.78,420]);g.api.transform();g.step(2.5);actor.position.set(400,0,400);g.api.setPlayer([400,12.8,406]);g.api.setAim(Math.PI,0);punch();
 let fullExtension=false;
 for(let i=0;i<57;i++){g.step(.016);const h=g.api.getModels().hero;if(h.attack>.43&&h.attack<.46){const a=root.getObjectByName('Pivot_120').matrixWorld.elements.slice(12,15),b=root.getObjectByName('Pivot_127').matrixWorld.elements.slice(12,15),u=b.map((v,k)=>v-a[k]),v=h.fist.map((v,k)=>v-b[k]);fullExtension=u.reduce((sum,x,k)=>sum+x*v[k],0)/Math.hypot(...u)/Math.hypot(...v)>.90;}}
 assert(fullExtension,'An unobstructed straight still extends its real arm');assert.equal(g.api.getModels().enemies[0].hp,100,'A nearby enemy behind the fist is not hit');assert.equal(g.api.getModels().hero.hitCount,0);
 g.api.setPlayer([400,12.8,406]);actor.position.set(406,0,400);g.api.setAim(0,0);punch();g.step(.9);assert.equal(g.api.getModels().enemies[0].hp,100,'An enemy in the old wide cone but outside the fist sweep is not hit');
 const hip=root.getObjectByName('Pivot_050'),start=hip.rotation.x;g.dispatch('keydown',{code:'KeyW'});g.step(.4);g.dispatch('keyup',{code:'KeyW'});assert(Math.abs(hip.rotation.x-start)>.08,'Locomotion animates the legs');
 g.api.reset();assert.equal(g.api.getModels().hero.hitCount,0);assert.equal(g.api.getModels().hero.attack,0);assert.equal(g.api.getModels().hero.state,'human');
 console.log('PASS off-axis and behind misses, leg movement and reset');
 // Exercise the real R input, imported hardened fists, and actual contact path.
 g.api.setPlayer([400,1.78,420]);g.api.transform();g.step(2.5);
 actor.position.set(400,0,400);g.api.setPlayer([400,12.8,406]);g.api.setAim(Math.PI,0);
 const energy=g.api.getModels().hero.energy;g.api.pressThunder();
 assert(g.api.getModels().hero.hardened,'R activates hardening in giant form');
 assert(Math.abs(g.api.getModels().hero.energy-(energy-14))<1e-5,'Hardening pays its energy once');
 g.api.pressThunder();assert(Math.abs(g.api.getModels().hero.energy-(energy-14))<1e-5,'Repeated R cannot refresh or charge hardening again');
 g.step(.2);assert(root.getObjectByName('hero-hardening-fist-0').visible,'Crystal armor grows on the actual hand');
 punch();g.step(.9);assert.equal(g.api.getModels().enemies[0].hp,100,'A hardened punch aimed away still misses');
 const impacts=g.scene().getObjectByName('raid-hardened-punch-impacts');assert(!impacts.children.some(burst=>burst.visible),'A miss emits no contact explosion');
 actor.position.set(400,0,400);g.api.setPlayer([400,12.8,406]);g.api.setAim(0,0);punch();
 for(let i=0;i<45&&g.api.getModels().enemies[0].hp===100;i++)g.step(.016);
 const hardenedHit=g.api.getModels();assert.equal(hardenedHit.enemies[0].hp,18,'A real hardened contact deals increased damage');assert.equal(hardenedHit.hero.hitCount,1);
 assert(impacts.children.some(burst=>burst.visible),'Actual hardened contact emits crystal debris');
 g.api.setPlayer([450,12.8,450]);g.step(5.3);assert(!g.api.getModels().hero.hardened,'Hardening expires');assert(!root.getObjectByName('hero-hardening-fist-0').visible,'Expired hardening hides its crystal shell');
 g.api.pressThunder();assert(!g.api.getModels().hero.hardened,'Cooldown prevents immediate reuse');
 g.element('#changeLoadout').onclick();await g.api.selectTitan('armored');g.api.beginMission();g.api.setPlayer([400,1.78,420]);g.api.transform();g.step(2.5);
 actor.position.set(400,0,400);actor.rotation.y=0;g.api.setPlayer([400,12.8,406]);g.api.setAim(0,0);g.api.pressThunder();punch();
 for(let i=0;i<45&&g.api.getModels().enemies[0].armor.every(Boolean);i++)g.step(.016);
 const broken=g.api.getModels();assert.equal(broken.enemies[0].armor.filter(Boolean).length,1,'A hardened contact breaks one armor plate');assert(broken.enemies[0].hp<100,'Armor break also applies damage');
 g.api.reset();assert(!g.api.getModels().hero.hardened);assert.equal(g.api.getModels().hero.hardeningCooldown,0);assert(!impacts.children.some(burst=>burst.visible),'Replay clears impact debris');
 console.log('PASS R hardening, one energy charge, manual misses, visible fist armor, physical impact, armor break, expiry, cooldown and replay');

})().catch(err=>{console.error(err);process.exitCode=1});
