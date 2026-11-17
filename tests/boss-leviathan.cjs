// Real paired GLBs: phase/color interpolation, actual animated head/tail rays,
// stable gameplay references, source-cache isolation and replay origin.
const assert=require('node:assert/strict'),esbuild=require('esbuild'),THREE=require('three');
global.self=global;global.createImageBitmap=async()=>({width:16,height:16,close(){}});
const bundle=esbuild.buildSync({entryPoints:['src/boss-models.js'],bundle:true,platform:'node',format:'cjs',write:false});const m={exports:{}};
new Function('module','exports','require',bundle.outputFiles[0].text)(m,m.exports,require);
(async()=>{
 await m.exports.preloadBossModels(['leviathan']);assert(m.exports.bossModelsReady(['leviathan']));
 const boss=m.exports.createBossModel('leviathan'),other=m.exports.createBossModel('leviathan'),scene=new THREE.Scene();scene.add(boss.root);boss.root.position.set(13,1,-20);boss.root.rotation.y=.6;scene.updateMatrixWorld(true);
 const references={root:boss.root,core:boss.core,muzzle:boss.muzzle,targets:boss.hitTargets},normalTargets=[...boss.hitTargets];
 assert.deepEqual(boss.metrics.clips,['Idle','Swim','Breach','Bite','WaterBlast','TailSweep','Rage']);assert.equal(boss.inspect().form,'normal');assert.equal(boss.metrics.flying,false);assert(Math.abs(boss.metrics.size[2]-22)<.01);
 const colorFor=(visual,name)=>{let result;visual.root.traverse(node=>{if(node.isMesh&&!result)for(const material of Array.isArray(node.material)?node.material:[node.material])if(material.name===name){result=material.color.clone();break;}});return result;};
 const untouched=colorFor(other,'glow'),blue=colorFor(boss,'glow');assert(blue.b>blue.r*3,'NORMAL starts with its supplied blue emission');
 boss.update(.08,{phase:'idle',health:.51});assert.equal(boss.inspect().awakened,false);
 boss.update(.10,{phase:'windup',phaseProgress:.2,phaseDuration:1.2,telegraph:true,health:.5,attackName:'waterblast'});
 assert.equal(boss.inspect().awakened,true);assert.equal(boss.inspect().animation,'Rage');assert(boss.inspect().awakeningProgress>0&&boss.inspect().awakeningProgress<1);
 const changing=colorFor(boss,'glow');assert(changing.r>blue.r&&changing.b<blue.b,'Authored blue and red materials interpolate over time');
 for(let i=0;i<40;i++)boss.update(.016,{phase:'windup',phaseProgress:i/39,phaseDuration:1.2,telegraph:true,health:.4,attackName:'waterblast'});
 assert.equal(boss.inspect().form,'awakened');assert.equal(boss.inspect().awakeningProgress,1);assert(boss.hitTargets.some(target=>!normalTargets.includes(target)),'Live hit targets switch to the awakened meshes');
 assert.equal(boss.root,references.root);assert.equal(boss.core,references.core);assert.equal(boss.muzzle,references.muzzle);assert.equal(boss.hitTargets,references.targets);
 assert(colorFor(other,'glow').toArray().every((v,i)=>Math.abs(v-untouched.toArray()[i])<1e-7),'Awakening never changes another boss or cached source materials');
 const publicCore=boss.core.getWorldPosition(new THREE.Vector3());assert(publicCore.distanceTo(boss.root.position)<15,'Retained weakpoint stays attached to reactor');assert(boss.muzzle.getWorldPosition(new THREE.Vector3()).distanceTo(boss.root.position)<15);
 const ray=new THREE.Raycaster();
 function physicalHit(){scene.updateMatrixWorld(true);const mesh=boss.hitTargets.find(target=>target!==boss.core&&target.geometry.attributes.position.count>100),box=new THREE.Box3().setFromObject(mesh),center=box.getCenter(new THREE.Vector3());for(const direction of [new THREE.Vector3(0,-1,0),new THREE.Vector3(0,0,-1),new THREE.Vector3(-1,0,0)]){const from=center.clone().addScaledVector(direction,-30);ray.set(from,direction);ray.far=60;if(ray.intersectObjects(boss.hitTargets,false).length)return true;}return false;}
 assert(physicalHit(),'The awakened visible body receives real triangle ray hits');
 for(const kind of ['waterblast','tailsweep','waterblast']){
  boss.update(.016,{phase:'attack',attack:true,phaseProgress:0,health:.4,attackName:kind});assert.equal(boss.inspect().animation,kind==='tailsweep'?'TailSweep':'WaterBlast');assert(boss.inspect().animationTime<.04);
  for(let i=0;i<45;i++)boss.update(.016,{phase:'attack',attack:true,phaseProgress:i/44,health:.4,attackName:kind});
  for(let i=0;i<25;i++)boss.update(.016,{phase:'recovery',health:.4,attackName:kind});
  for(let i=0;i<25;i++)boss.update(.016,{phase:'windup',telegraph:true,phaseDuration:1.2,phaseProgress:i/24,health:.4,attackName:kind});
  boss.root.traverse(node=>assert(node.matrixWorld.elements.every(Number.isFinite)));
 }
 boss.update(.016,{phase:'idle',health:1});assert(boss.inspect().awakened,'Restoring HP cannot repeatedly toggle awakening');
 boss.dispose();other.dispose();assert(!boss.root.parent);assert(boss.inspect().disposed);
 const replay=m.exports.createBossModel('leviathan');assert.equal(replay.inspect().form,'normal');assert.equal(replay.inspect().awakened,false);assert(colorFor(replay,'glow').b>colorFor(replay,'glow').r*3,'A new encounter resets to supplied NORMAL colors');
 assert.equal(replay.metrics.groundedBase,-1);assert.equal(replay.root.position.lengthSq(),0);replay.dispose();
 console.log('PASS both actual Leviathan GLBs,22m normalization,reactor/mouth anchors,HP50% continuous colors,live mesh rays,stable references,three authored attacks,isolated caches and replay');
})().catch(error=>{console.error(error);process.exitCode=1;});
