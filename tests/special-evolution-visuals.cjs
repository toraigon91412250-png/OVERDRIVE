const assert=require('node:assert/strict'),T=require('three'),Module=require('module'),path=require('path'),{buildSync}=require('esbuild');
const file=path.resolve(__dirname,'../src/special-evolution-visuals.js'),m=new Module(file,module);m.paths=module.paths;m._compile(buildSync({entryPoints:[file],bundle:true,external:['three'],format:'cjs',write:false}).outputFiles[0].text,file);
const scene=new T.Scene(),parents={},muzzles={};for(const i of [3,4,5]){parents[i]=new T.Group();scene.add(parents[i]);muzzles[i]=new T.Object3D();muzzles[i].position.set(0,.065,i===4?-3.6:-.5);parents[i].add(muzzles[i]);}
parents[3].scale.setScalar(.13);parents[3].rotation.x=-Math.PI/2;
const originalMuzzles=Object.values(muzzles).map(o=>o.position.toArray()),fx=m.exports.createSpecialEvolutionVisuals({scene,parents,muzzles});
const routes={3:['nova','reactor'],4:['echo','deadeye'],5:['swarm','hunter']};
for(const i of [3,4,5]){
 for(const tier of [1,2,3])for(const route of tier===1?[null]:routes[i]){
  const build={tier,path:route,color:0xc2dfff};assert(fx.configure(i,build));assert(!fx.configure(i,build),'configuration is idempotent');fx.update(.016,{weapon:i,time:1});
  const s=fx.stats().models[i];assert(s.visible);assert(s.meshes<=25,`weapon ${i} ${route}: ${s.meshes} drawables`);assert(s.triangles>100&&s.triangles<20000);
  const box=new T.Box3().setFromObject(fx.roots[i]);assert(!box.isEmpty());for(const a of [...box.min.toArray(),...box.max.toArray()])assert(Number.isFinite(a));
 }
 fx.configure(i,{tier:0});assert(!fx.stats().models[i].visible,'tier 0 has no upgrade addition');
}
assert.deepEqual(Object.values(muzzles).map(o=>o.position.toArray()),originalMuzzles,'upgrade art preserves actual firing sockets');
const from=new T.Vector3(1,2,3),to=new T.Vector3(2,3,-30),build={tier:3,path:'nova',color:0xb9a1ff};fx.configure(3,build);fx.discharge(3,from,to,{build,charged:true});
assert(fx.stats().active>4);const paused=JSON.stringify(fx.diagnostics());fx.update(1,{weapon:3,time:100,playing:false});assert.equal(JSON.stringify(fx.diagnostics()),paused,'pause freezes effect lifetime');
for(let i=0;i<400;i++){fx.discharge(3+(i%3),from,to,{build,charged:true,low:i%2===0});fx.update(.016,{weapon:3,time:i*.016});assert(fx.stats().active<=fx.stats().capacity);}
for(const f of fx.diagnostics())for(const v of [...f.pos,...f.dir,f.life,f.width,f.length])assert(Number.isFinite(v));assert.equal(fx.stats().drawObjects,3);
for(let i=0;i<20;i++)fx.update(.1,{weapon:3,time:10+i*.1});assert.equal(fx.stats().active,0);fx.reset();assert.equal(fx.stats().shots,0);
const counts=[];for(const opt of [{},{low:true},{reduced:true}]){fx.reset();fx.discharge(3,from,to,{build,...opt});counts.push(fx.stats().active);}assert(counts[0]>counts[1]&&counts[0]>counts[2]);
console.log('SPECIAL EVOLUTION VISUALS: 15 forms, bounded meshes, unchanged sockets, finite pooled effects, low/reduced variants, pause/reset passed');
