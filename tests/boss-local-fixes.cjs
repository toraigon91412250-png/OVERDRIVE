// Minimal dependency-free regressions for connected MIRROR and atmosphere transitions.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
async function loadSource(relative){
 const data=fs.readFileSync(path.join(root,relative));
 return import('data:text/javascript;base64,'+data.toString('base64'));
}
(async()=>{
 const {BOSS_ARENAS,createBossArenaLayout}=await loadSource('src/boss-arenas.js');
 const l=createBossArenaLayout('mirror');
 assert.equal(l.nodes.length,269,'MIRROR should include eight walkable bridge cells');
 assert.equal(l.reachableNodes.length,l.nodes.length,'All four MIRROR corner decks are connected');
 assert(l.cells.length<=441&&l.walls.length<=16,'Instance budgets must be preserved');
 for(const [px,pz] of BOSS_ARENAS.mirror.pads){
  const p=l.nearest(px,pz);
  assert(p&&l.reachableNodes.includes(p),'All MIRROR jump pads should be reachable on foot');
  const route=l.path(l.entry.x,l.entry.z,p.x,p.z);
  const last=route.at(-1)||l.entry;
  assert.equal(last.x,p.x);assert.equal(last.z,p.z);
 }
 for(const node of l.nodes){
  const route=l.path(l.entry.x,l.entry.z,node.x,node.z);
  const last=route.at(-1)||l.entry;
  assert.equal(last.x,node.x);assert.equal(last.z,node.z);
 }
 console.log('PASS MIRROR: all',l.nodes.length,'walkable nodes and all 5 pad locations are connected');
 const {applyUnderwaterFog}=await loadSource('src/underwater-fog.js');
 const fog={color:{hex:0,setHex(n){this.hex=n;return this}},near:105,far:440};
 const seaSurface={color:0x213547,near:105,far:440};
 assert.equal(applyUnderwaterFog(fog,seaSurface,true,false),'underwater');
 assert.deepEqual([fog.color.hex,fog.near,fog.far],[0x15516b,1.5,52]);
 assert.equal(applyUnderwaterFog(fog,seaSurface,true,true),'crimson');
 assert.deepEqual([fog.color.hex,fog.near,fog.far],[0x3b0611,1,23]);
 assert.equal(applyUnderwaterFog(fog,seaSurface,false,true),'surface');
 assert.deepEqual([fog.color.hex,fog.near,fog.far],[0x213547,105,440]);
 const otherStage={color:0x133557,near:32,far:110};
 applyUnderwaterFog(fog,otherStage,false,false);
 assert.deepEqual([fog.color.hex,fog.near,fog.far],[0x133557,32,110]);
 console.log('PASS sea fog: normal -> crimson -> resurfaced -> other stage');
})().catch(err=>{console.error(err);process.exitCode=1});
