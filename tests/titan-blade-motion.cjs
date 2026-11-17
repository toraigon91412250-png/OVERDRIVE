const assert=require('node:assert/strict'),vm=require('node:vm'),esbuild=require('esbuild'),THREE=require('three');
global.self=global;global.createImageBitmap=async()=>({width:16,height:16,close(){}});
global.document={createElement:()=>({width:256,height:256,getContext:()=>new Proxy({measureText:()=>({width:50}),createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>o[k]||(()=>{})})})};
const bundle=esbuild.buildSync({entryPoints:['src/titan/index.js'],bundle:true,platform:'node',format:'cjs',write:false}),models={exports:{}};
vm.runInThisContext('(function(module,exports,require){'+bundle.outputFiles[0].text+'})')(models,models.exports,require);
const {load}=require('./odm-runtime.cjs');

(async()=>{
 const game=load(false,{RaidModels:models.exports});
 for(let i=0;i<200&&!game.api.getModels()?.ready;i++)await new Promise(resolve=>setImmediate(resolve));
 async function start(kind){game.element('#changeLoadout').onclick();await game.api.selectTitan(kind);game.api.beginMission();game.step(.032);}
 function aimRear(){const enemy=game.api.getModels().enemies[0],from=enemy.nape.map((v,i)=>v-enemy.forward[i]*6.5),d=enemy.nape.map((v,i)=>v-from[i]);game.api.setPlayer(from);game.api.setAim(Math.atan2(-d[0],-d[2]),Math.atan2(d[1],Math.hypot(d[0],d[2])));return enemy;}

 // Project the supplied blade triangles through the live gameplay camera. This
 // checks what occupies the sightline, including triangles whose vertices lie
 // outside the center corridor; local scale values cannot establish that.
 function intersectsAimCorridor(triangle){
  const rectangle=[[-.15,-.30],[.15,-.30],[.15,.35],[-.15,.35]],axes=[[1,0],[0,1]];
  for(let i=0;i<3;i++){const a=triangle[i],b=triangle[(i+1)%3];axes.push([b[1]-a[1],a[0]-b[0]]);}
  for(const [x,y] of axes){const a=triangle.map(p=>p[0]*x+p[1]*y),b=rectangle.map(p=>p[0]*x+p[1]*y);if(Math.max(...a)<Math.min(...b)||Math.max(...b)<Math.min(...a))return false;}
  return true;
 }
 function assertReadyBladeFraming(){
  const scene=game.scene(),camera=scene.children.find(object=>object.isPerspectiveCamera),weapons=[];
  assert(camera,'Gameplay exposes its real perspective camera');scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);
  camera.traverse(object=>{if(object.name==='raid-equipped-blade')weapons.push(object);});
  assert.equal(weapons.length,2,'Both first-person hands carry the supplied weapon');
  for(const weapon of weapons){
   const assembly=weapon.getObjectByName('Blade_Assembly');assert(assembly,'Each weapon has its actual imported blade');
   for(let object=assembly;object;object=object.parent)assert(object.visible,'The equipped blade and its ancestors are visible');
   let visibleVertices=0,aimIntersections=0,minDepth=Infinity;
   assembly.traverse(mesh=>{
    if(!mesh.isMesh||!mesh.visible)return;
    const vertices=mesh.geometry.attributes.position,index=mesh.geometry.index,projected=[];
    for(let i=0;i<vertices.count;i++){
     const point=new THREE.Vector3().fromBufferAttribute(vertices,i).applyMatrix4(mesh.matrixWorld).applyMatrix4(camera.matrixWorldInverse);
     minDepth=Math.min(minDepth,-point.z);point.applyMatrix4(camera.projectionMatrix);projected.push([point.x,point.y]);
     if(Math.abs(point.x)<=1&&Math.abs(point.y)<=1&&Math.abs(point.z)<=1)visibleVertices++;
    }
    const count=index?index.count:vertices.count;
    for(let i=0;i+2<count;i+=3){const triangle=[0,1,2].map(offset=>projected[index?index.getX(i+offset):i+offset]);if(intersectsAimCorridor(triangle))aimIntersections++;}
   });
   assert(visibleVertices>0,'Blade geometry occupies visible pixels in the neutral ready pose');
   assert(minDepth>camera.near,'No blade vertex crosses the camera near plane');
   assert.equal(aimIntersections,0,'Resting blades leave the central aiming corridor unobstructed');
  }
  console.log('PASS projected ready blades: visible, clear center sightline and no near-plane clipping');
 }

 await start('attack');game.api.setAim(0,0);game.step(.032);assertReadyBladeFraming();aimRear();const yaw=game.api.getState().yaw;
 game.element('canvas').dispatch('mousedown',{button:0});game.step(.064);
 assert.equal(game.api.getModels().enemies[0].hp,100,'A windup cannot damage the Titan');
 const windup=game.api.bladePose(),left=windup.arms.find(x=>x.side<0),right=windup.arms.find(x=>x.side>0);
 assert(Math.abs(left.rotation[2]+right.rotation[2])>.15,'The two arms no longer perform a mirrored cross');
 assert(Math.abs(left.rotation[0]-right.rotation[0])>.08,'One shoulder leads while the other hand follows');
 assert(Math.abs(windup.body[1])>.1,'The torso participates in the swing');
 let impactPosition;
 for(let i=0;i<30;i++){game.step(.016);if(game.api.getState().lastBladeImpact){impactPosition=game.api.getState().pos;break;}}
 const impact=game.api.getState();
 assert(impact.lastBladeImpact,'The draw cut connects');assert.equal(impact.bladeSwing.connected,true);
 assert(Math.abs(impact.bladeSwing.time-.185)<.045,'Hitstop catches the blade at its contact pose');
 assert.equal(game.api.getModels().enemies[0].hp,32,'One charged pass applies damage once');
 assert.equal(game.api.getModels().assist.dashing,true,'The cut continues through contact into its exit');
 game.step(.5);const exit=game.api.getState();
 assert.equal(game.api.getModels().enemies[0].hp,32,'The trailing blade cannot double the damage');
 assert(Math.hypot(...exit.pos.map((v,i)=>v-impactPosition[i]))>3,'The player travels past the cut');
 assert(Math.hypot(...exit.vel)>10,'The exit keeps useful flight momentum');
 assert(Math.abs(exit.yaw-yaw)<.01,'The slash does not force the camera aim');
 assert.equal(exit.bladeSwing,null,'The arms finish their recovery');

 await start('raid');aimRear();game.api.slash();
 for(let i=0;i<35&&!game.api.getState().lastBladeImpact;i++)game.step(.016);
 const kill=game.api.getState();assert.equal(game.api.getModels().enemies[0].alive,false);
 game.step(.45);assert(Math.hypot(...game.api.getState().pos.map((v,i)=>v-kill.pos[i]))>3,'A killing blow still completes the fly-through');
 assert.equal(game.api.getState().bladeImpactCount,kill.bladeImpactCount,'A lethal pass cannot hit another enemy automatically');
 game.api.reset();assert.equal(game.api.getState().bladeSwing,null,'Replay clears the swing state');

 await start('attack');game.api.setPlayer([0,80,130]);game.api.setAim(Math.PI,0);
 game.api.slash();const side=game.api.getState().bladeSwing.side;game.step(.55);game.api.slash();
 assert.equal(game.api.getState().bladeSwing.side,-side,'Free swings alternate the leading hand');
 game.dispatch('keydown',{code:'KeyV'});game.dispatch('keyup',{code:'KeyV'});game.step(.08);
 const shoulder=game.scene().getObjectByName('raid-human-arm-1');
 assert(shoulder?.children.some(x=>x.children.some(y=>y.children.length>10)),'The imported third-person sword is attached to the elbow chain');
 assert(Math.abs(shoulder.rotation.z)>.1,'The third-person shoulder animates');
 game.api.pressThunder();game.step(.016);
 assert.equal(game.api.getState().spearArmed,true,'A free swing can switch to the spear');
 assert.equal(game.api.getState().bladeSwing,null,'Switching equipment cancels a pending free blade strike');
 console.log('PASS staggered shoulders, torso twist, contact-time hitstop, one hit per pass, lethal fly-through, momentum, manual camera, replay and third-person weapon attachment');
})().catch(error=>{console.error(error);process.exitCode=1});
