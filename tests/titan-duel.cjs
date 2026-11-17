// Real imported rig and transformation state. No renderer: this checks defense,
// directional/area damage, resource exhaustion and a single earned counter.
const assert=require('node:assert/strict'),vm=require('node:vm'),esbuild=require('esbuild'),THREE=require('three');
global.self=global;global.createImageBitmap=async()=>({width:16,height:16,close(){}});
global.document={createElement:()=>({width:256,height:256,getContext:()=>new Proxy({measureText:()=>({width:50})},{get:(o,k)=>o[k]||(()=>{})})})};
const compiled=esbuild.buildSync({stdin:{contents:"export {createTransformation} from './src/titan/transformation.js';",resolveDir:process.cwd()},bundle:true,platform:'node',format:'cjs',write:false});
const moduleObject={exports:{}};vm.runInThisContext('(function(module,exports,require){'+compiled.outputFiles[0].text+'})')(moduleObject,moduleObject.exports,require);
(async()=>{
 const scene=new THREE.Scene(),humanVisual=new THREE.Group();scene.add(humanVisual);
 const P={pos:new THREE.Vector3(400,1.78,420),vel:new THREE.Vector3(),yaw:0,third:false,grounded:true};
 const hits=[],notices=[];
 const hero=moduleObject.exports.createTransformation({scene,P,humanVisual,notice:x=>notices.push(x),releaseWires(){},disarm(){},burst(){},sound(){},thud(){},shake(){},punch:event=>hits.push(event),resolveWorld(previous,height){P.grounded=P.pos.y<=height;if(P.grounded){P.pos.y=height;P.vel.y=Math.max(0,P.vel.y);}}});
 await hero.ready;
 const tick=(seconds,control={f:0,r:0})=>{for(let left=seconds;left>1e-8;){const dt=Math.min(1/120,left);hero.step(dt,control,false);hero.update(dt);scene.updateMatrixWorld(true);left-=dt;}};
 function start(){hero.reset();P.pos.set(400,1.78,420);P.vel.set(0,0,0);P.yaw=0;P.grounded=true;assert(hero.toggle());tick(3.3);assert.equal(hero.inspect().state,'titan');hits.length=0;}
 const front=()=>P.pos.clone().add(new THREE.Vector3(0,0,-6)),rear=()=>P.pos.clone().add(new THREE.Vector3(0,0,6));
 start();hero.hurt(1,{source:front(),kind:'punch'});const ordinaryLoss=100-hero.inspect().health;assert(ordinaryLoss>0);
 start();hero.setGuardHeld(true);tick(.4);assert(hero.inspect().guarding,'Held guard enters the defensive stance');const health=hero.inspect().health,stamina=hero.inspect().guardStamina;
 hero.hurt(1,{source:front(),kind:'punch'});const guardLoss=health-hero.inspect().health;assert(guardLoss<ordinaryLoss*.5,'Frontal melee guard prevents most body damage');assert(hero.inspect().guardStamina<stamina,'Blocking spends guard stamina');assert.equal(hero.punch(),false,'Held guard cannot attack at the same time');
 const guardedSpeedStart=P.pos.clone();tick(.5,{f:1,r:0});const guardedTravel=P.pos.distanceTo(guardedSpeedStart);hero.setGuardHeld(false);P.vel.set(0,0,0);const normalSpeedStart=P.pos.clone();tick(.5,{f:1,r:0});assert(P.pos.distanceTo(normalSpeedStart)>guardedTravel*1.5,'Guarding slows movement');
 start();hero.setGuardHeld(true);tick(.4);hero.hurt(1,{source:rear(),kind:'punch'});assert.equal(100-hero.inspect().health,ordinaryLoss,'A back attack bypasses frontal guard');
 start();hero.setGuardHeld(true);tick(.4);hero.hurt(1,{source:front(),kind:'steam'});assert.equal(100-hero.inspect().health,ordinaryLoss,'Steam cannot be blocked by raised fists');assert.equal(hero.inspect().counterSeconds,0,'Area damage does not award a counter');
 // Time the defense shortly before contact and check that release opens an attack.
 start();hero.setGuardHeld(true);tick(.05);hero.hurt(1,{source:front(),kind:'punch'});assert(hero.inspect().counterSeconds>0,'A well-timed frontal guard earns a counter window');
 hero.setGuardHeld(false);assert(hero.punch(),'Releasing the guard allows an immediate counter');tick(.8);assert(hits.length>0&&hits.every(x=>x.counter===true),'The earned punch carries counter damage through its sweep');assert.equal(hero.inspect().counterSeconds,0,'The counter is consumed by the attack');
 hits.length=0;assert(hero.punch());tick(.8);assert(hits.length>0&&hits.every(x=>!x.counter),'A following ordinary punch does not inherit the counter');
 start();hero.setGuardHeld(true);let broke=false;
 for(let i=0;i<2400;i++){tick(1/120);if(hero.inspect().guardBroken>0){broke=true;break;}}
 assert(broke,'Holding defense indefinitely exhausts stamina and breaks the guard');assert(!hero.inspect().guarding,'A broken guard cannot continue blocking');const depleted=hero.inspect().guardStamina;
 hero.setGuardHeld(false);tick(3);assert(hero.inspect().guardStamina>depleted,'Stamina regenerates after releasing defense');
 hero.reset();assert.equal(hero.inspect().state,'human');assert.equal(hero.inspect().guarding,false);assert.equal(hero.inspect().counterSeconds,0);assert.equal(hero.inspect().guardBroken,0);assert(hero.inspect().guardStamina>depleted,'Mission reset restores the defensive resource');
 start();hero.setGuardHeld(true);tick(.1);hero.exit();assert.equal(hero.inspect().guarding,false,'Ejection clears held defense');assert.equal(hero.inspect().counterSeconds,0);
 console.log('PASS frontal guard, back/steam bypass, movement cost, timed counter, one-punch consumption, guard break, recovery and reset');
})().catch(error=>{console.error(error);process.exitCode=1});
