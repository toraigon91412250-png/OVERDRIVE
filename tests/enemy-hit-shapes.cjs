const assert=require('node:assert/strict'),path=require('node:path'),Module=require('node:module');
const {buildSync}=require('esbuild'),T=require('three');
function load(name){const file=path.resolve(__dirname,'../src/'+name+'.js'),m=new Module(file,module);m.paths=module.paths;m._compile(buildSync({entryPoints:[file],bundle:true,external:['three'],format:'cjs',write:false}).outputFiles[0].text,file);return m.exports;}
const {traceEnemyRay,enemyAimPoint}=load('enemy-hit-shapes'),{createArsenalCombat}=load('arsenal-combat'),{arsenalBuild}=load('arsenal-evolution');
const {tracePhaseShot}=load('phase-combat'),{createSeekerSystem}=load('seeker-system');
function boss(z=-12){
 const root=new T.Group(),body=new T.Mesh(new T.BoxGeometry(2,2,2),new T.MeshBasicMaterial());body.position.set(0,6,0);root.add(body);root.position.z=z;
 const left=new T.Mesh(new T.BoxGeometry(1,3,1),new T.MeshBasicMaterial());left.position.set(-3,1.5,0);root.add(left);const right=left.clone();right.position.x=3;root.add(right);
 const core=new T.Object3D();core.position.set(0,6,1);root.add(core);root.updateMatrixWorld(true);
 return {hp:10000,max:10000,r:2.2,type:'boss',mesh:root,core,hitTargets:[body,left,right],bossVisual:{root,core,aimPoint:core,hitTargets:[body,left,right]},body};
}
const origin=new T.Vector3(0,6,0),direction=new T.Vector3(0,0,-1),e=boss();
{
 const hit=traceEnemyRay(e,origin,direction,40);assert(hit,'Visible elevated torso is hit even though the root is at ground level');assert(Math.abs(hit.distance-11)<1e-6);assert.equal(hit.object,e.body);assert(hit.head,'Real core hit retains weakpoint metadata');
 assert(enemyAimPoint(e).distanceTo(new T.Vector3(0,6,-11))<1e-7,'Aim follows visible core, not ground origin');
 assert.equal(traceEnemyRay(e,new T.Vector3(0,1,0),direction,40),null,'Empty gap between the imported legs is a miss');
 assert.equal(traceEnemyRay(e,origin,direction,8),null,'Cover/range ending before the real surface blocks contact');
 e.mesh.position.x=4;e.mesh.rotation.y=Math.PI/2;assert(traceEnemyRay(e,new T.Vector3(4,6,0),direction,40),'Moving and rotating the imported body keeps physical hits aligned');
 e.mesh.position.x=0;e.mesh.rotation.y=0;e.body.visible=false;assert.equal(traceEnemyRay(e,origin,direction,40),null,'Hidden meshes never leave hit volumes');e.body.visible=true;
}
{
 const normal={hp:100,r:.7,mesh:new T.Group()};normal.mesh.position.set(0,6,-8);
 const hit=traceEnemyRay(normal,origin,direction,30);assert.equal(hit.distance,8,'Ordinary enemies preserve center-based damage falloff');
 const surface=traceEnemyRay(normal,origin,direction,30,{sphereScale:1.12,padding:.07,surface:true});assert(Math.abs(surface.distance-(8-(.7*1.12+.07)))<1e-7,'Ordinary missiles preserve sphere entry contact');
 assert.equal(traceEnemyRay(normal,new T.Vector3(3,6,0),direction,30),null);
}
{
 const damage=(target,n)=>target.hp-=n,make=(limit)=>createArsenalCombat({getEnemies:()=>[e],wallDistance:()=>limit,damage});
 const exposed=make(Infinity);exposed.fire({weapon:4,build:arsenalBuild(4,{lance_core:1}),origin,direction});assert(e.hp<e.max,'Evolved precision weapon hits the visible elevated body');
 e.hp=e.max;make(8).fire({weapon:4,build:arsenalBuild(4,{lance_core:1}),origin,direction});assert.equal(e.hp,e.max,'Architecture occludes imported boss geometry');
 assert.equal(tracePhaseShot({origin,direction,enemies:[e],obstacles:[]}).hits[0].e,e,'Phase gun shares the actual body geometry');
 const wall=new T.Mesh(new T.BoxGeometry(10,12,1),new T.MeshBasicMaterial());wall.position.set(0,5,-5);wall.updateMatrixWorld(true);
 assert.equal(tracePhaseShot({origin,direction,enemies:[e],obstacles:[wall],charged:true}).hits.length,0,'Charged beam cannot shoot imported geometry through cover');
 assert.equal(tracePhaseShot({origin:new T.Vector3(0,1,0),direction,enemies:[e],obstacles:[]}).hits.length,0,'Phase fire cannot hit the space between legs');
}
{
 const scene=new T.Scene();scene.add(e.mesh);const camera=new T.PerspectiveCamera();camera.position.copy(origin);camera.lookAt(new T.Vector3(0,6,-12));camera.updateMatrixWorld(true);let hits=0;
 const seeker=createSeekerSystem(scene,{wallDistance:()=>Infinity,onHit:target=>{assert.equal(target,e);hits++;}});
 for(let i=0;i<20;i++)seeker.updateLocks(.016,{active:true,camera,enemies:[e]});assert.equal(seeker.metrics().ready,1,'Seeker locks onto the elevated visible core');
 const rays=[direction,direction,direction];seeker.launch({origins:[origin,origin,origin],directions:rays,ammo:6});for(let i=0;i<40;i++)seeker.update(.016,[e]);assert.equal(hits,1,'Guided missile contacts the actual body once');
 seeker.reset();seeker.launch({origins:[new T.Vector3(0,1,0),origin,origin],directions:rays,ammo:6});for(let i=0;i<40;i++)seeker.update(.016,[e]);assert.equal(hits,1,'Unguided missile through the empty leg gap does not hit an enclosing sphere');
}
console.log('PASS imported boss geometry hits, empty-space misses, moving/hidden bodies, real weakpoint aim, cover, ordinary sphere parity, phase/evolved weapons and guided/unguided missiles');
