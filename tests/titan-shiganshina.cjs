// Checks the supplied district's real geometry and physical traversal spaces.
// No WebGL renderer: raycasting, matrices and collisions use real Three.js.
const assert=require('node:assert/strict'),esbuild=require('esbuild'),THREE=require('three');
global.document={createElement:()=>({width:512,height:128,getContext:()=>new Proxy({measureText:()=>({width:50})},{get:(o,k)=>o[k]||(()=>{})})})};
const moduleObj={exports:{}};
const code=esbuild.buildSync({entryPoints:['src/titan/shiganshina-city.js'],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text;
new Function('module','exports','require',code)(moduleObj,moduleObj.exports,require);
const scene=new THREE.Scene(),targets=[],colliders=[];
const city=moduleObj.exports.createShiganshinaCity({scene,targets,colliders});scene.updateMatrixWorld(true);
const info=city.inspect();assert(info.buildingCount>300&&info.batches<80,'Original district retains hundreds of varied homes in compact instance batches');
assert(!city.root.getObjectByName('WallMaria_MainGate'),'District does not create a duplicate Maria wall or gate');
for(const c of colliders){for(const k of ['x','z','hx','hz','h','bottom'])assert(Number.isFinite(c[k]),'Finite collision '+k);assert(c.h>c.bottom&&c.hx>0&&c.hz>0);assert(c.mesh.userData.cityOnly);}
for(const point of [[0,76],[-20,146],[-270,-160],[260,150],[220,-180]])assert(!colliders.some(c=>c.bottom<2&&Math.abs(point[0]-c.x)<c.hx+1&&Math.abs(point[1]-c.z)<c.hz+1),'Player/clock/supply lot stays clear: '+point);
for(let z=-55;z<=105;z+=5)assert(!colliders.some(c=>c.bottom<2&&Math.abs(c.x)<4+c.hx&&Math.abs(z-c.z)<c.hz+1),'Main avenue is connected through the combat arena');
// A downward ray must find the actual supplied roof, close to the sloped
// collider crest. This checks both rotated roof directions and hip roofs.
const ray=new THREE.Raycaster(),down=new THREE.Vector3(0,-1,0);
for(const style of ['x','z','hip']){
 const roof=colliders.find(c=>c.roofHeight>3&&(style==='hip'?c.roofShape==='hip':c.roofAxis===style&&c.roofShape!=='hip')&&Math.abs(c.x)<400&&Math.abs(c.z)<350);
 assert(roof,'At least one roof in style '+style);
 ray.set(new THREE.Vector3(roof.x,roof.h+roof.roofHeight+5,roof.z),down);
 const hits=ray.intersectObjects(targets,false);assert(hits.length,'Roof can be grappled from above: '+style);
 assert(Math.abs(hits[0].point.y-(roof.h+roof.roofHeight))<2,'Roof collider crest matches supplied rendered geometry: '+style);
}
// Cached grid queries must return the exact native triangle hits, including
// normals and original instance IDs, for distant, upward and vertical wires.
const cases=[
 [[-1300,15,-250],[1,.002,.1],2200],
 [[127.4,1,-114.4],[0,1,0],140],
 [[165,150,276],[0,-1,0],180],
 [[0,18,76],[.4,.05,-1],300],
 [[600,20,150],[-1,.01,-.07],1400],
 [[0,5,76],[1,0,0],15]
];
let queriedInstances=0,triangleTests=0;
function compareRay(origin,direction,far){
 ray.set(new THREE.Vector3(...origin),new THREE.Vector3(...direction).normalize());ray.near=.05;ray.far=far;
 const actual=ray.intersectObjects(targets,false),expected=[];
 for(const target of targets){
  if(target.isInstancedMesh){THREE.InstancedMesh.prototype.raycast.call(target,ray,expected);queriedInstances+=target.count;triangleTests+=target.userData.raycastGrid.lastTested;}
  else target.raycast(ray,expected);
 }
 expected.sort((a,b)=>a.distance-b.distance);assert.equal(actual.length,expected.length,'Indexed query returns every native hit');
 for(let i=0;i<actual.length;i++){
  assert.equal(actual[i].object,expected[i].object);assert.equal(actual[i].instanceId,expected[i].instanceId);
  assert(actual[i].point.distanceTo(expected[i].point)<1e-7,'Indexed surface point matches native geometry');
  assert(Math.abs(actual[i].distance-expected[i].distance)<1e-7);assert.equal(actual[i].faceIndex,expected[i].faceIndex);
  if(actual[i].normal)assert(actual[i].normal.distanceTo(expected[i].normal)<1e-7,'Surface normal remains native');
 }
}
for(const args of cases)compareRay(...args);
for(let i=0;i<32;i++)compareRay([Math.sin(i*2.4)*650,2+(i%8)*13,Math.cos(i*2.4)*500],[Math.cos(i*1.7),Math.sin(i*.8)*.35,Math.sin(i*1.7)],500);
// The broadphase transforms rays to the batch frame, including a nonuniform
// parent scale; its triangle result still uses the untouched world matrices.
city.root.position.set(17,2,-31);city.root.rotation.y=.22;city.root.scale.set(1.1,1.2,.9);scene.updateMatrixWorld(true);
for(const [origin,direction,far] of cases.slice(0,3)){
 const point=new THREE.Vector3(...origin).applyMatrix4(city.root.matrixWorld),dir=new THREE.Vector3(...direction).transformDirection(city.root.matrixWorld);
 compareRay(point.toArray(),dir.toArray(),far*1.2);
}
city.root.position.set(0,0,0);city.root.rotation.y=0;city.root.scale.setScalar(1);scene.updateMatrixWorld(true);
assert(triangleTests<queriedInstances*.1,'Grid reduces real triangle tests by at least 90%');
console.log('PASS exact native city rays:',queriedInstances,'potential instances ->',triangleTests,'triangle-tested instances ('+(100*triangleTests/queriedInstances).toFixed(2)+'%)');
city.setVisible(false);assert(!city.root.visible&&targets.every(x=>!x.visible),'Forest switch disables render meshes and target visibility');
city.setVisible(true);assert(city.root.visible&&targets.every(x=>x.visible),'Return to city restores real targets');
console.log('PASS supplied Shiganshina district:',info.buildingCount,'buildings;',info.batches,'batches;',info.colliderCount,'colliders; open spawn/supply/clock lots, connected avenue, actual roof rays and visibility');
