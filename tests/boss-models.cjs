// Real GLB parsing, authored motion and weakpoint geometry; no WebGL renderer.
const assert=require('node:assert/strict'),esbuild=require('esbuild'),THREE=require('three');
global.self=global;global.createImageBitmap=async()=>({width:16,height:16,close(){}});
const compiled=esbuild.buildSync({entryPoints:['src/boss-models.js'],bundle:true,platform:'node',format:'cjs',write:false}),m={exports:{}};
new Function('module','exports','require',compiled.outputFiles[0].text)(m,m.exports,require);
(async()=>{
 const api=m.exports;assert.equal(api.bossModelsReady(),false);assert.throws(()=>api.createBossModel('warden'),/preloaded/);
 await Promise.all([api.preloadBossModels(),api.preloadBossModels(['warden'])]);assert(api.bossModelsReady());assert.equal(api.bossModelIds.length,10);
 const expected={warden:6,ram:4.5,siege:8,mirror:4.8,bulwark:9,phoenix:8.108,gravity:7,tempest:9.623,devourer:8.924,leviathan:6.544};
 for(const id of api.bossModelIds){
  const visual=api.createBossModel(id),other=api.createBossModel(id),scene=new THREE.Scene();scene.add(visual.root);scene.updateMatrixWorld(true);
  assert(visual.hitTargets.length>20,'Actual supplied meshes loaded for '+id);assert(visual.metrics.clips.length>=2);
  assert(Math.abs(visual.metrics.height-expected[id])<.05,'Body scale is intentional: '+id);
  const body=new THREE.Box3();for(const mesh of visual.hitTargets)if(mesh!==visual.core)body.union(new THREE.Box3().setFromObject(mesh));
  assert(Math.abs(body.min.y-(visual.metrics.flying?.5:-1))<.02,'Ground/hover origin is consistent: '+id);
  assert(visual.bodyCenter.toArray().every(Number.isFinite));assert(visual.core.position.y>body.min.y+.5,'Weakpoint is on the actual body, not underground: '+id);
  const original=[];visual.root.traverse(node=>original.push([node,node.matrixWorld.clone()]));
  for(let i=0;i<30;i++)visual.update(.016,{phase:'windup',telegraph:true,health:1});
  visual.update(.016,{phase:'attack',attack:true,attackName:id==='bulwark'?'slam':'fire',health:1});
  for(let i=0;i<30;i++)visual.update(.016,{phase:'attack',attack:true,health:1});
  scene.updateMatrixWorld(true);let moved=false;visual.root.traverse(node=>{assert(node.matrixWorld.elements.every(Number.isFinite),'Finite animation transforms: '+id);});
  for(const [node,matrix] of original)if(node.matrixWorld.elements.some((v,i)=>Math.abs(v-matrix.elements[i])>.001))moved=true;
  assert(moved,'Actual articulated world transforms move during the authored action: '+id);
  // Several clips move articulated parents, not directly named Mesh children.
  assert(visual.inspect().animation!=='rest','An authored attack clip is actually selected: '+id);
  assert(visual.core.getWorldPosition(new THREE.Vector3()).toArray().every(Number.isFinite));
  assert.notEqual(visual.root,other.root);assert.notEqual(visual.core.material,other.core.material,'Per-instance weakpoint effects are isolated');
  visual.dispose();other.dispose();assert(!visual.root.parent&&visual.inspect().disposed);assert(api.bossModelsReady(),'Disposal does not invalidate shared parsed geometry');
  console.log('PASS supplied boss',id,'size',visual.metrics.size.map(n=>n.toFixed(2)).join('x'),'meshes',visual.hitTargets.length,'clips',visual.metrics.clips.length);
 }
 // Each boss must visibly animate twice, including Tempest, whose imported
 // model has no idle/telegraph clips and used to remain in the old attack mode.
 for(const id of api.bossModelIds){
  const visual=api.createBossModel(id),scene=new THREE.Scene();scene.add(visual.root);
  const attackName=id==='bulwark'?'slam':'fire';
  for(let cycle=0;cycle<2;cycle++){
   for(let i=0;i<45;i++)visual.update(.016,{phase:'windup',telegraph:true,phaseProgress:i/44,phaseDuration:.72,attackName,health:1});
   visual.update(.016,{phase:'attack',attack:true,phaseProgress:0,attackName,health:1});
   assert(visual.inspect().animationTime<(id==='bulwark'?1.65:.05),'New attack restarts its authored clip, cycle '+cycle+' '+id);
   scene.updateMatrixWorld(true);const start=[];visual.root.traverse(node=>{if(node.name!=='BOSS_WEAKPOINT_'+id&&node!==visual.root)start.push([node,node.matrixWorld.clone()]);});
   for(let i=0;i<20;i++)visual.update(.016,{phase:'attack',attack:true,phaseProgress:i/19,attackName,health:1});
   scene.updateMatrixWorld(true);assert(start.some(([node,before])=>node.matrixWorld.elements.some((v,k)=>Math.abs(v-before.elements[k])>.001)),'Second visible articulated strike moves: '+id+' cycle '+cycle);
   for(let i=0;i<30;i++)visual.update(.016,{phase:'recovery',phaseProgress:i/29,attackName,health:1});
  }
  visual.root.traverse(node=>assert(node.matrixWorld.elements.every(Number.isFinite)));visual.dispose();
 }
 const slam=api.createBossModel('bulwark');for(let i=0;i<40;i++)slam.update(.016,{phase:'windup',phaseProgress:.65,phaseDuration:1.2,telegraph:true,attackName:'slam',health:1});
 const raised=slam.root.getObjectByName('right_fist_energy').getWorldPosition(new THREE.Vector3()).y;
 slam.update(.016,{phase:'attack',phaseProgress:0,attack:true,attackName:'slam',health:1});
 const landed=slam.root.getObjectByName('right_fist_energy').getWorldPosition(new THREE.Vector3()).y;
 assert(raised>landed+2,'GroundSlam visibly lands exactly when the gameplay impact begins');assert(landed<.8,'Visible fist is close to the grounded impact');slam.dispose();
 console.log('PASS two complete authored attack cycles for all ten bosses and synchronized GroundSlam impact');
 const bulwark=api.createBossModel('bulwark');let rock,moss;bulwark.root.traverse(node=>{if(!node.isMesh)return;for(const mat of Array.isArray(node.material)?node.material:[node.material]){if(mat.name==='PBR_AncientRock_VertexColor')rock=mat;if(mat.name==='PBR_NaturalMoss_VertexColor')moss=mat;}});assert(rock&&moss);assert(Math.abs(rock.color.r-.22)<.001&&Math.abs(moss.color.g-.34)<.001,'Viewer rock/moss color correction is carried into the game');bulwark.dispose();
 console.log('PASS ten bosses with both Leviathan GLBs, model origins, finite authored animation, independent instances, weakpoints, color correction and disposal');
})().catch(error=>{console.error(error);process.exitCode=1;});
