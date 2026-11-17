// Real supplied rig and physics state, without WebGL: emergence, gait transitions,
// landing feedback, repeatable reset and punch extension under competing poses.
const assert=require('node:assert/strict'),vm=require('node:vm'),e=require('esbuild'),THREE=require('three');
global.self=global;global.createImageBitmap=async()=>({width:16,height:16,close(){}});
global.document={createElement:()=>({width:256,height:256,getContext:()=>new Proxy({measureText:()=>({width:50})},{get:(o,k)=>o[k]||(()=>{})})})};
const built=e.buildSync({stdin:{contents:"export {createTransformation} from './src/titan/transformation.js';export {loadAsset} from './src/titan/models.js';export {createHeroMotion} from './src/titan/hero-motion.js';",resolveDir:process.cwd()},bundle:true,platform:'node',format:'cjs',write:false});
const m={exports:{}};vm.runInThisContext('(function(module,exports,require){'+built.outputFiles[0].text+'})')(m,m.exports,require);
(async()=>{
 const scene=new THREE.Scene(),humanVisual=new THREE.Group();scene.add(humanVisual);
 const P={pos:new THREE.Vector3(400,1.78,420),vel:new THREE.Vector3(),yaw:0,third:false,grounded:true};
 const thuds=[],shakes=[];let punches=0;
 const hero=m.exports.createTransformation({scene,P,humanVisual,notice(){},releaseWires(){},disarm(){},burst(){},sound(){},thud:x=>thuds.push(x),shake:x=>shakes.push(x),punch(){punches++},resolveWorld(previous,height){P.grounded=P.pos.y<=height;if(P.grounded){P.pos.y=height;P.vel.y=Math.max(0,P.vel.y);}}});
 await hero.ready;hero.toggle();const root=scene.getObjectByName('player-attack-titan'),knee=root.getObjectByName('Pivot_055');
 const tick=(seconds,control={f:0,r:0},run=false)=>{for(let left=seconds;left>1e-8;){const dt=Math.min(1/120,left);hero.step(dt,{f:0,r:0,...control},run);hero.update(dt);scene.updateMatrixWorld(true);left-=dt;}};
 tick(.9);const crouched=knee.rotation.x;assert(crouched>1,'Emergence retains the crouched knees at the end of the frame');
 tick(.9);assert(knee.rotation.x<crouched-.7,'The titan stands up before control begins');assert.equal(hero.inspect().state,'emerging');
 tick(.5);assert.equal(hero.inspect().state,'titan');assert(thuds.length&&shakes.length,'Emergence has weight feedback');tick(1);
 const fullScale=root.scale.x;
 tick(.8,{f:1});assert(P.vel.length()>10,'Walking retains normal movement');const walking=knee.rotation.x;
 tick(.8,{f:1},true);assert(P.vel.length()>17,'Running retains its distinct speed');assert(Math.abs(knee.rotation.x-walking)>.1,'Running and walking produce distinct leg poses');assert(thuds.length>2,'Footfalls create feedback while moving');
 P.yaw=Math.PI/2;tick(1/120,{f:1},true);const shortTurn=root.rotation.y-Math.PI;assert(shortTurn>0&&shortTurn<Math.PI/2,'The visible body turns smoothly');tick(.2,{f:1},true);assert(root.getObjectByName('hero-waist').rotation.z!==0,'Turning at speed banks the body');
 tick(2);const idleSounds=thuds.length;tick(.5);assert.equal(thuds.length,idleSounds,'A stopped titan does not keep playing footsteps');
 assert(hero.jump());tick(.3);assert(!P.grounded&&P.pos.y>15,'Jump has an airborne phase');
 const airKnee=knee.rotation.x;let landed=false,maxLandingKnee=0;const beforeLand=thuds.length;
 for(let i=0;i<240;i++){tick(1/120);if(P.grounded){landed=true;maxLandingKnee=Math.max(maxLandingKnee,knee.rotation.x);if(i>200)break;}}
 assert(landed&&thuds.length>beforeLand,'Landing triggers a weight cue');assert(maxLandingKnee>airKnee+.1,'Landing bends the knees to absorb impact');
 hero.reset();P.pos.set(400,1.78,420);P.vel.set(0,0,0);P.yaw=0;P.grounded=true;hero.toggle();tick(.9);assert(Math.abs(knee.rotation.x-crouched)<1e-8,'Reset clears gait state and repeats the emergence pose');
 assert(root.scale.x<=fullScale*1.06,'The growth overshoot remains small');
 // Competing locomotion, roar and landing poses must not curl the active punch.
 const gltf=await m.exports.loadAsset('attack'),model=gltf.scene.clone(true),motion=m.exports.createHeroMotion(model);
 for(const side of [-1,1])for(const options of [{},{speed:19,phase:1.2},{grounded:false,air:1,vy:19},{land:1,roar:1,lean:.14,bank:.16}]){
  motion.pose({...options,attackTime:.3,side});const shoulder=model.getObjectByName(side>0?'Pivot_120':'Pivot_096').getWorldPosition(new THREE.Vector3()),elbow=model.getObjectByName(side>0?'Pivot_127':'Pivot_103').getWorldPosition(new THREE.Vector3()),fist=motion.knuckle(side);
  assert(elbow.clone().sub(shoulder).normalize().dot(fist.clone().sub(elbow).normalize())>.90,'The straight extends despite competing motion');
 }
 console.log('PASS emergence crouch/stand, walk/run, turn, airborne/landing, footfalls, reset and straight-punch priority');
})().catch(err=>{console.error(err);process.exitCode=1});
