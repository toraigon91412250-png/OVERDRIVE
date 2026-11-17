// Real navigation, instance geometry and collision checks; no WebGL renderer.
const assert=require('node:assert/strict'),vm=require('node:vm'),{buildSync}=require('esbuild'),T=require('three');
function moduleAt(entry){const m={exports:{}};vm.runInNewContext(buildSync({entryPoints:[entry],bundle:true,format:'cjs',external:['three'],write:false}).outputFiles[0].text,{module:m,exports:m.exports,require,console});return m.exports;}
const {BOSS_ARENAS,createBossArenaLayout}=moduleAt('src/boss-arenas.js'),{createWorldRebuild}=moduleAt('src/world-rebuild.js');
const fingerprints=new Set();
for(const id of Object.keys(BOSS_ARENAS)){
 const l=createBossArenaLayout(id);assert(l.cells.length<=441&&l.walls.length<=16,'Fixed instance budgets '+id);assert(l.nodes.length>250);
 assert.equal(l.nodes.length,l.reachableNodes.length,'Entire usable arena stays connected '+id);assert(!l.blocked(l.entry.x,l.entry.z));assert(!l.blocked(l.bossSpawn.x,l.bossSpawn.z,id==='siege'?8:4),'Boss body has clear space '+id);assert.equal(l.colors.length,6);
 assert(Math.hypot(l.entry.x-l.bossSpawn.x,l.entry.z-l.bossSpawn.z)>=30,'Entry presents the boss outside immediate melee '+id);
 for(const c of l.nodes){const path=l.path(l.entry.x,l.entry.z,c.x,c.z),end=path.at(-1)||l.entry;assert.equal(end.x,c.x,'Reachable route x '+id);assert.equal(end.z,c.z,'Reachable route z '+id);}
 for(const wall of l.walls)assert(l.cellAt(wall.x,wall.z),'Usable cover stands on real ground '+id);
 fingerprints.add(JSON.stringify({cells:l.cells,walls:l.walls}));
}
assert.equal(fingerprints.size,10,'Each boss has its own physical terrain/cover layout');
const scene=new T.Scene();scene.fog=new T.Fog(0,1,100);const arena=new T.Group();scene.add(arena);
const solids=[],sky={uniforms:{horizon:{value:new T.Color()},zenith:{value:new T.Color()}}},skyObject=new T.Group(),floor=new T.MeshStandardMaterial(),hemi=new T.HemisphereLight(),sun=new T.DirectionalLight(),reactor=new T.Group();
const material=()=>new T.MeshStandardMaterial(),core=new T.Mesh(new T.OctahedronGeometry(1),material()),halo=new T.Mesh(new T.TorusGeometry(1,.1,4,12),material()),rings=Array.from({length:3},()=>new T.Mesh(new T.TorusGeometry(1,.1,4,12),material())),pads=Array.from({length:5},()=>new T.Group()),padMaterials=Array.from({length:5},material);
scene.add(reactor,skyObject,hemi,sun,...pads);reactor.add(core,halo,...rings);const gimmicks=[];
const world=createWorldRebuild({scene,arena,solids,sky,skyObject,floor,hemi,sun,reactor,rings,core,halo,padMaterials,pads,legacyObjects:[],legacySolids:[],getStageGimmicks:()=>({setWave:n=>gimmicks.push(n),updateBuild(){},snapshot(){}})});
const ray=new T.Raycaster();
for(const id of Object.keys(BOSS_ARENAS)){
 world.setBossArena(id);world.setWave(6,false);const l=world.radar();scene.updateMatrixWorld(true);assert.equal(world.snapshot().bossArena,id);assert.equal(world.snapshot().bossScenery.boss,id);assert(world.snapshot().bossScenery.parts>15);assert.equal(reactor.visible,false,'No central display ornament hides the boss');assert.equal(gimmicks.at(-1),7,'Old campaign gimmicks stay outside boss arenas');
 const cover=l.walls[0],origin=new T.Vector3(cover.x,cover.base+cover.h*.5,cover.z+cover.d*.5+6);ray.set(origin,new T.Vector3(0,0,-1));ray.far=12;const hit=ray.intersectObjects(arena.children,false)[0];assert(hit&&Math.abs(hit.distance-6)<.02,'Visible cover matches physical cover '+id);assert(solids.some(s=>s.enabled&&s.x===cover.x&&s.z===cover.z&&s.top===cover.base+cover.h),'Cover collider is registered '+id);
 ray.set(new T.Vector3(l.entry.x,l.entry.y+10,l.entry.z),new T.Vector3(0,-1,0));ray.far=20;assert(Math.abs(ray.intersectObjects(arena.children,false)[0].point.y-l.entry.y)<.01,'Player entry rests on modeled floor '+id);
 world.begin(12,false,1);assert.equal(world.snapshot().bossArena,id,'Random numeric layout cannot replace the chosen boss arena');assert(!world.snapshot().bossScenery.visible,'Backdrop clears during reconstruction blank');world.skip();world.update(.016,2,true);assert(world.snapshot().bossScenery.visible);assert.equal(world.snapshot().active,false);
}
// The sea encounter has real dock floors, open-water bays and fixed-cost waves.
world.setBossArena('leviathan');world.setWave(6,false);world.update(.016,3,true);scene.updateMatrixWorld(true);
const seaLayout=world.radar(),seaState=world.snapshot().bossScenery.sea;
assert.equal(seaLayout.kind,'harbor');assert(seaState&&seaState.waterline>.05&&seaState.waterline<seaLayout.entry.y,'Sea sits just below the playable deck');
assert.equal(world.heightAt(23.2,-17.4),null,'Ocean bay is open water rather than an invisible walkable floor');assert.equal(world.heightAt(0,-17.4),.5,'Broad middle pier provides a real connected crossing');
assert(seaLayout.cells.length<320,'Water bays materially open the sea view');assert(seaLayout.backdrop.base<3&&seaLayout.backdrop.gateHeight<2,'Tall hangar framing cannot hide the ocean horizon');
assert(seaLayout.cells.every(c=>c.h===.5),'Every dock floor has the same stable waterline clearance');
assert(!seaLayout.blocked(seaLayout.bossSpawn.x,seaLayout.bossSpawn.z,11),'Full monster-sized spawn remains clear of real beam shelter');
const ocean=scene.getObjectByName('leviathan-open-ocean'),swells=scene.getObjectByName('leviathan-sea-swell'),foam=scene.getObjectByName('leviathan-shore-foam'),whitecaps=scene.getObjectByName('leviathan-whitecaps');
assert(ocean&&ocean.geometry.parameters.width>1000&&ocean.geometry.parameters.height>1000,'Open sea extends to the horizon');assert(swells.isInstancedMesh&&foam.isInstancedMesh&&whitecaps.isInstancedMesh);
assert.equal(swells.count,192);assert.equal(whitecaps.count,128);assert(foam.count>80&&foam.count<260,'Shore foam uses a fixed perimeter budget');assert.equal(seaState.wrecks,3,'Distant wrecks establish the defended sea lane');assert.equal(seaState.animatedSurface,true,'Ocean surface carries rolling vertex waves');assert.equal(ocean.geometry.parameters.widthSegments,128,'Wave displacement stays on a bounded subdivided plane');
const oldSwell=Array.from(swells.instanceMatrix.array),oldFoam=Array.from(foam.instanceMatrix.array),partCount=world.snapshot().bossScenery.parts;
world.update(.5,4,true);assert.notDeepEqual(Array.from(swells.instanceMatrix.array),oldSwell,'Sea swell moves slowly in world space');assert.notDeepEqual(Array.from(foam.instanceMatrix.array),oldFoam,'White foam washes against actual dock edges');assert.equal(world.snapshot().bossScenery.parts,partCount,'Wave animation does not create new scene objects');
for(const mesh of [swells,foam,whitecaps])assert(Array.from(mesh.instanceMatrix.array).every(Number.isFinite),'Wave transforms remain finite');
world.clearBossArena();world.setWave(2,false);assert.equal(world.snapshot().bossArena,null);assert.equal(world.snapshot().bossScenery.visible,false);assert.equal(reactor.visible,true);assert.equal(gimmicks.at(-1),2);assert.equal(world.snapshot().theme,'蒼の回廊');
console.log('PASS ten model-sized connected boss arenas, unique terrain/cover, exact rendered floor/cover collision, boss spawn clearance, selected arena rebuild, themed backdrops, sea-level docks/open bays/animated swell/foam and campaign reset');
