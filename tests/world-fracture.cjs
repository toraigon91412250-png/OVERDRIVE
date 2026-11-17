const assert=require('node:assert/strict'),vm=require('node:vm'),{buildSync}=require('esbuild'),T=require('three');
function moduleAt(entry){const m={exports:{}};vm.runInNewContext(buildSync({entryPoints:[entry],bundle:true,format:'cjs',external:['three'],write:false}).outputFiles[0].text,{module:m,exports:m.exports,require,console});return m.exports;}
const {createWorldRebuild}=moduleAt('src/world-rebuild.js'),{createOmegaLayout}=moduleAt('src/stage-layouts.js');
for(let n=1;n<=24;n++){const l=createOmegaLayout(n*7919,2);if(!l.walls.length)continue;const count=l.nodes.length,w=l.walls[0];w.destroyed=true;l.refreshNavigation();assert(!l.blocked(w.x,w.z));assert(l.nodes.length>=count);assert.equal(l.nearest(w.x,w.z).x,w.x);assert.equal(l.nearest(w.x,w.z).z,w.z);w.destroyed=false;l.refreshNavigation();assert.equal(l.nodes.length,count,'cover restoration preserves the authored connected navigation graph');}
function arenaLayout(fracture=true){for(let seed=1;seed<1000;seed++){const l=createOmegaLayout(seed*7919,2);if(l.walls.length>=5){if(fracture)l.fracture=true;return l;}}throw new Error('no cover-rich seed');}
function fixture(layout=arenaLayout()){
 const scene=new T.Scene();scene.fog=new T.Fog(0x000000,10,100);const arena=new T.Group();scene.add(arena);
 const solids=[],sky={uniforms:{horizon:{value:new T.Color()},zenith:{value:new T.Color()}}},skyObject=new T.Group(),floor=new T.MeshStandardMaterial(),hemi=new T.HemisphereLight(),sun=new T.DirectionalLight(),reactor=new T.Group();
 const material=()=>new T.MeshStandardMaterial(),core=new T.Mesh(new T.OctahedronGeometry(1),material()),halo=new T.Mesh(new T.TorusGeometry(1,.1,4,12),material()),rings=Array.from({length:3},()=>new T.Mesh(new T.TorusGeometry(1,.1,4,12),material())),pads=Array.from({length:5},()=>new T.Group()),padMaterials=Array.from({length:5},material);
 scene.add(reactor,skyObject,hemi,sun,...pads);reactor.add(core,halo,...rings);
 const world=createWorldRebuild({scene,arena,solids,sky,skyObject,floor,hemi,sun,reactor,rings,core,halo,padMaterials,pads,legacyObjects:[],legacySolids:[]});world.setWave(layout.wave,false,layout);
 return{world,layout,scene,arena,solids};
}
function aiming(w){return{origin:new T.Vector3(w.x,w.base+w.h*.5,w.z+w.d/2+4),direction:new T.Vector3(0,0,-1)};}
function json(x){return JSON.parse(JSON.stringify(x));}
{
 const {world,layout}=fixture(),w=layout.walls[0],{origin,direction}=aiming(w),floor=layout.cells.map(c=>[c.x,c.z,c.h]);
 assert.equal(world.coverSnapshot().total,layout.walls.length);assert.equal(world.damageCover(origin,direction,18,3),null,'range prevents a distant cover hit');assert.equal(world.coverSnapshot().hits,0);
 const hit=world.damageCover(origin,direction,18,8);assert(hit,'a real Three ray strikes an instanced wall');assert.equal(hit.index,0);assert.equal(hit.hp,54);assert.equal(hit.max,72);assert.equal(hit.destroyed,false);assert(hit.point.distanceTo(origin)>3.9&&hit.point.distanceTo(origin)<4.1);assert(hit.normal.z>.99);
 hit.wall.x=999;assert.equal(world.coverSnapshot().walls[0].x,w.x,'events do not expose mutable wall metadata');assert.equal(layout.blocked(w.x,w.z),true);assert.equal(world.canStep(w.x,w.z,w.base),false);
 const broken=world.damageCover(origin,direction,54,8);assert.equal(broken.destroyed,true);assert.equal(world.coverSnapshot().broken,1);assert.equal(world.coverSnapshot().walls[0].colliderEnabled,false);assert.equal(layout.blocked(w.x,w.z),false,'destroying cover clears its navigation obstruction');assert.equal(world.canStep(w.x,w.z,w.base),true,'destroying cover opens a walkable route');
 const nearest=layout.nearest(w.x,w.z);assert.equal(nearest.x,w.x);assert.equal(nearest.z,w.z);const route=world.path(layout.entry.x,layout.entry.z,w.x,w.z);assert.equal(route.at(-1).x,w.x);assert.equal(route.at(-1).z,w.z,'path goal can now be the former cover cell');assert.deepEqual(json(layout.cells.map(c=>[c.x,c.z,c.h])),json(floor),'cover destruction does not delete or lower floors');
 const count=world.coverSnapshot().broken;world.damageCover(origin,direction,999,5);assert.equal(world.coverSnapshot().broken,count,'destroyed cover cannot be destroyed or rewarded twice');
 assert.equal(world.coverSnapshot().shards,10);world.updateFracture(.1,false);assert.equal(world.coverSnapshot().effectTime,0,'pause freezes effects');world.updateFracture(.1,true);assert(world.coverSnapshot().effectTime>.09);for(let i=0;i<20;i++)world.updateFracture(.1,true);assert.equal(world.coverSnapshot().shards,0);assert.equal(world.coverSnapshot().rims,0);
 world.setWave(layout.wave,false,layout);assert.equal(world.coverSnapshot().broken,0);assert.equal(world.coverSnapshot().walls[0].hp,72);assert.equal(world.coverSnapshot().walls[0].colliderEnabled,true);assert.equal(layout.blocked(w.x,w.z),true,'same layout reuse restores cover and navigation');
}
{
 const {world,layout,arena}=fixture(),w=layout.walls[0],{origin,direction}=aiming(w),blocker=new T.Mesh(new T.BoxGeometry(1,1,1),new T.MeshBasicMaterial());blocker.position.copy(origin).addScaledVector(direction,2);arena.add(blocker);
 assert.equal(world.damageCover(origin,direction,100,8),null,'the nearest non-cover obstacle blocks damage to the wall behind it');assert.equal(world.coverSnapshot().hits,0);arena.remove(blocker);
 const node=layout.nodes[0];assert.equal(world.damageCover(new T.Vector3(node.x,node.h+10,node.z),new T.Vector3(0,-1,0),100,20),null,'a floor cannot be mistaken for destructible cover');
 assert.equal(world.damageCover(origin,new T.Vector3(),100,8),null);assert.equal(world.damageCover(origin,direction,-10,8),null);assert.equal(world.damageCover(origin,direction,Infinity,8),null);assert.equal(world.damageCover(origin,direction,100,-8),null);assert.equal(world.coverSnapshot().hits,0);
 const events=world.breakCoverNear(new T.Vector3(0,4,0),500,999);assert.equal(events.length,layout.walls.length);assert.equal(world.coverSnapshot().intact,0);assert.equal(world.coverSnapshot().broken,layout.walls.length);assert(world.coverSnapshot().shards<=48);assert.equal(world.coverSnapshot().shardLimit,48);assert(world.coverSnapshot().rims<=4);assert(events.every(e=>e.destroyed));assert.deepEqual(json(world.breakCoverNear(new T.Vector3(),500,100)),[]);
 world.begin(layout.wave,false,1.55,layout);assert.equal(world.coverSnapshot().enabled,false);assert.equal(world.coverSnapshot().shards,0);assert.equal(world.damageCover(origin,direction,100,8),null,'reconstruction is immune to cover attacks');world.skip();world.update(.016,2,true);assert.equal(world.coverSnapshot().enabled,true);assert.equal(world.coverSnapshot().walls[0].hp,72);
}
{
 const l=arenaLayout(false),{world}=fixture(l),w=l.walls[0],{origin,direction}=aiming(w);assert.equal(world.coverSnapshot().enabled,false,'v7 Omega without the new mode flag retains indestructible cover');assert.equal(world.damageCover(origin,direction,999,8),null);assert.deepEqual(json(world.breakCoverNear(new T.Vector3(),500,999)),[]);assert.equal(w.destroyed,undefined);assert.equal(w.hp,undefined);
 world.setWave(2,false);assert.equal(world.coverSnapshot().enabled,false);assert.equal(world.damageCover(new T.Vector3(-18,2,24),new T.Vector3(0,0,-1),999,80),null,'standard campaign cover remains unchanged');world.setWave(2,true);assert.equal(world.coverSnapshot().total,0);world.setWave(9,false);assert.equal(world.coverSnapshot().enabled,false,'authored ring-shift cover remains unchanged');
}
console.log('WORLD FRACTURE: real instanced hits, nearest occlusion, cover HP, collider and route opening, unchanged floors, fixed particle bounds, pause/reset, rebuild immunity, blast cover and legacy Omega/campaign isolation passed');
