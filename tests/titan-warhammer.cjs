// Real supplied GLB and animation/contact checks; no WebGL renderer is used.
const assert=require('node:assert/strict'),vm=require('node:vm'),esbuild=require('esbuild'),THREE=require('three');
global.self=global;global.createImageBitmap=async()=>({width:512,height:512,close(){}});
global.document={createElement:()=>({width:256,height:256,getContext:()=>new Proxy({measureText:()=>({width:50})},{get:(o,k)=>o[k]||(()=>{})})})};
const bundle=esbuild.buildSync({entryPoints:['src/titan/models.js'],bundle:true,platform:'node',format:'cjs',write:false});
const m={exports:{}};vm.runInThisContext('(function(module,exports,require){'+bundle.outputFiles[0].text+'})')(m,m.exports,require);
async function fixture({giant=false,sight=true,position=[0,1.78,7]}={}){
 const scene=new THREE.Scene(),V={root:new THREE.Group(),slamRing:new THREE.Mesh(),alive:true};scene.add(V.root,V.slamRing);
 const P={pos:new THREE.Vector3(...position),vel:new THREE.Vector3(),titanForm:giant,health:3,thunderAmmo:4},hits=[],warnings=[];
 const targets=[],anchors=[];
 const api=m.exports.create({scene,V,P,targets,anchors,hooks:[],missiles:[],skipEquipment:true,spawn:[0,0,0],hud(){},notice:x=>warnings.push(x),loading(){},targetChanged(){},hurt:(label,source,amount,kind)=>hits.push({label,source:source.clone(),amount,kind,number:api.inspect().encounter.number}),canReach:()=>sight,moveEnemy:()=>false,displaceEnemy:()=>false});
 await api.select('warhammer');
 function run(seconds,onFrame=()=>{}){for(let i=0;i<Math.ceil(seconds/.016);i++){api.update(.016);onFrame(api.inspect());}}
 return {api,V,P,scene,hits,warnings,run,targets,anchors};
}
(async()=>{
 const f=await fixture(),model=f.V.root.getObjectByName('WarHammerTitan'),head=f.V.root.getObjectByName('Head_Rig'),hammer=f.V.root.getObjectByName('WarHammer_Head');
 assert(model&&head&&hammer,'Supplied articulated body, head and weapon exist');
 assert(!f.V.root.getObjectByName('Crystal_01'),'Uncollidable showcase spikes are excluded');
 assert(!f.V.root.getObjectByName('raid-impact-head'),'Imported animated head hierarchy stays intact');
 assert.deepEqual(f.api.inspect().clips.sort(),['Crystal_Hardening','Hammer_Smash','Idle_Breathing','Intimidation']);
 const bodyBox=new THREE.Box3();model.updateWorldMatrix(true,true);
 model.traverse(o=>{if(!o.isMesh)return;for(let parent=o;parent;parent=parent.parent)if(parent.name==='WarHammer_Rig')return;bodyBox.union(new THREE.Box3().setFromObject(o));});
 assert(Math.abs(bodyBox.getSize(new THREE.Vector3()).y-15)<.05,'Body height is 15m independent of raised hammer');
 assert(Math.abs(bodyBox.min.y)<.02,'Boots meet the ground');
 assert(f.V.napeOpen,'Nape is accessible without finite-ammo armor gates');
 assert.equal(f.V.weak.parent,head,'Weakpoint follows authored head animation');
 const phases=new Set(),activeHeights=[],napeWorld=[],headLocal=head.position.clone();
 f.run(8,state=>{phases.add(state.encounter.phase);if(state.encounter.phase==='active'){activeHeights.push(state.warhammer.head[1]);napeWorld.push(state.nape);}});
 assert(phases.has('warning')&&phases.has('active')&&phases.has('recovery'),'Authored smash uses clear windup, impact and recovery');
 assert(f.hits.length>0,'A grounded player in the visible hammer strike is hit');
 assert(f.hits.every(h=>h.kind==='punch'&&h.amount===1.4),'Guard receives a heavy physical weapon attack');
 assert.equal(new Set(f.hits.map(h=>h.number)).size,f.hits.length,'Each smash can damage the player only once');
 assert(Math.max(...activeHeights)-Math.min(...activeHeights)>6,'The actual hammer head visibly descends through the impact window');
 assert(head.position.distanceTo(headLocal)<.2,'Animation never applies absolute head translation under an offset reaction pivot');
 assert(napeWorld.every(p=>p.every(Number.isFinite)),'Nape remains finite during every active animation frame');
 const cover=await fixture({sight:false});cover.run(8);assert.equal(cover.hits.length,0,'World cover blocks the physical hammer');
 const miss=await fixture({position:[0,1.78,7]});let dodged=false;miss.run(8,state=>{if(!dodged&&state.encounter.phase==='warning'&&state.encounter.progress>.65){miss.P.pos.set(-9,1.78,4);dodged=true;}});assert(dodged);assert.equal(miss.hits.length,0,'A late sideways dodge after aim locks avoids the real strike');
 const high=await fixture({position:[0,28,7]});high.run(8);assert.equal(high.hits.length,0,'A player flying above the weapon path avoids the ground attack');
 const titan=await fixture({giant:true,position:[0,12.8,8]});titan.run(8);assert(titan.hits.length>0,'Visible hammer sweep also contacts transformed giant capsule');
 f.api.reset();f.run(.016);assert.equal(f.api.inspect().warhammer.clip,'idle');assert.equal(f.api.inspect().encounter.phase,'idle');
 f.api.punchReact(new THREE.Vector3(0,0,-1));f.run(.08);assert(Math.abs(f.V.root.rotation.x)<.1,'Punch recoil stays bounded without restructuring tracked joints');
 f.api.kill();f.run(3.5);assert(!f.V.root.visible,'Death collapses and removes the enemy');assert.equal(f.anchors.length,0,'Defeated body cannot retain wire anchors');
 f.api.reset();f.run(.016);assert(f.V.root.visible&&f.V.alive);assert.equal(f.V.root.rotation.x,0);assert.equal(f.api.inspect().warhammer.clip,'idle');assert(new Set(f.anchors).size===f.anchors.length,'Reset restores exactly one set of anchors');
 console.log('PASS Warhammer supplied model scale, articulated smash timing, human/giant actual weapon contact, cover, dodge, altitude, nape, reset and death');
})().catch(error=>{console.error(error);process.exitCode=1});
