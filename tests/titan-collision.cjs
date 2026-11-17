const assert=require('assert/strict'),vm=require('vm'),e=require('esbuild'),T=require('three');const m={exports:{}};const out=e.buildSync({entryPoints:['src/titan/collision.js'],bundle:true,platform:'node',format:'cjs',write:false});vm.runInThisContext('(function(module,exports){'+out.outputFiles[0].text+'})')(m,m.exports);
const resolve=m.exports.createBodyResolver(),node=new T.Group(),center=new T.Vector3(),radius=new T.Vector3(2,4,2);
let previous=new T.Vector3(0,0,-6),position=new T.Vector3(0,0,6),velocity=new T.Vector3(0,0,80);
assert(resolve(node,center,radius,previous,position,velocity),'Fast crossing is caught');assert(position.z<-2);assert(velocity.z<=.01,'Into-body velocity is removed');
position.set(6,0,0);assert(!resolve(node,center,radius,previous,position,velocity),'A clear pass stays free');
position.set(0,0,0);assert(resolve(node,center,radius,position.clone(),position,velocity),'Starting inside is recovered');assert(position.toArray().every(Number.isFinite));
node.rotation.y=.7;node.position.set(10,0,20);node.scale.setScalar(3);previous=node.localToWorld(new T.Vector3(0,0,-6));position=node.localToWorld(new T.Vector3(0,0,6));assert(resolve(node,center,radius,previous,position,velocity),'Rotated and scaled giants collide');
console.log('PASS continuous titan collision: fast crossing, glancing pass, inside recovery, rotation and scale');
