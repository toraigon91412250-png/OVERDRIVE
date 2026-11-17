// Exercises the real GLTF parser, supplied geometry, equipment extraction and target switching.
// No renderer: these checks cover scene/data integration, not WebGL output.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const THREE=require('three'),esbuild=require('esbuild');
global.self=global;global.createImageBitmap=async(blob)=>{const b=new Uint8Array(await blob.arrayBuffer());assert(b.length>20);return{width:16,height:16,close(){}}};
global.document={createElement:()=>({width:512,height:128,getContext:()=>new Proxy({measureText:()=>({width:50})},{get:(o,k)=>o[k]||(()=>{})})})};
const compiled=esbuild.buildSync({entryPoints:['src/titan/models.js'],bundle:true,platform:'node',format:'cjs',write:false});
const moduleObj={exports:{}};vm.runInThisContext('(function(module,exports,require){'+compiled.outputFiles[0].text+'\n})')(moduleObj,moduleObj.exports,require);
const {create,types}=moduleObj.exports;
const scene=new THREE.Scene(),player=new THREE.Group(),camera=new THREE.PerspectiveCamera(),oldGear=new THREE.Group();scene.add(player,camera,oldGear);
const V={root:new THREE.Group(),slamRing:new THREE.Mesh(),alive:true,attackState:'idle',armorCutsL:0,armorCutsR:0};scene.add(V.root);
const P={pos:new THREE.Vector3(0,2,76),vel:new THREE.Vector3(),third:false,thunderAmmo:4,thunderReload:0,boost:false};
const targets=[],anchors=[],hooks=[{state:'idle'},{state:'idle'}],missiles=[];
const arms=[-1,1].map(side=>{const arm=new THREE.Group(),sword=new THREE.Group();sword.userData.bladeParts=[];arm.add(sword);return{arm,sword,side}});
let errors=[],hurtEvents=0,allowContacts=true,allowEnemyMovement=true;
const api=create({scene,V,P,targets,anchors,hooks,player,arms,thirdSwords:[],oldGear,camera,missiles,hud(){},notice(){},loading(busy,e){if(e)errors.push(e)},targetChanged(){},hurt(){hurtEvents++},canReach:()=>allowContacts,moveEnemy:(position,proposal)=>{if(allowEnemyMovement)position.copy(proposal);return allowEnemyMovement;},steam(){}});
(async()=>{
 await api.equipmentReady;
 assert(api.inspect().gearMetrics.after<api.inspect().gearMetrics.before*.7,'Equipment batching removes at least 30% of drawable meshes');console.log('Gear mesh batching',api.inspect().gearMetrics);assert.equal(oldGear.visible,false);
 scene.updateMatrixWorld(true);
 for(const arm of arms){
  const parts=arm.sword.userData.bladeParts;
  assert.equal(parts.length,1,'Blade swap owns one detachable assembly');
  const blade=parts[0];blade.updateWorldMatrix(true,true);
  const sword=arm.arm.children.find(child=>child.name==='raid-equipped-blade'),palm=sword.getObjectByName('raid-blade-palm');
  const bounds=new THREE.Box3(),point=new THREE.Vector3(),inverse=sword.matrixWorld.clone().invert();
  blade.traverse(object=>{if(!object.isMesh)return;const vertices=object.geometry.attributes.position;for(let i=0;i<vertices.count;i++)bounds.expandByPoint(point.fromBufferAttribute(vertices,i).applyMatrix4(object.matrixWorld).applyMatrix4(inverse));});
  const dimensions=bounds.getSize(new THREE.Vector3()).toArray().sort((a,b)=>b-a);
  assert(dimensions[0]>1.2&&dimensions[0]<1.7,`Imported blade has a usable real length, received ${dimensions[0]}m`);
  assert(dimensions[1]>.06&&dimensions[1]<.20,'Blade width stays proportional to the grip');
  assert(palm&&palm.getWorldPosition(new THREE.Vector3()).distanceTo(arm.arm.localToWorld(new THREE.Vector3(0,-.08,-.01)))<.001,'Leather grip center sits inside the glove');
  assert(blade.visible&&blade.children.some(child=>child.isMesh&&child.visible),'The actual supplied blade meshes are visible');
 }
 console.log('PASS real blade dimensions, leather grip attachment, visible geometry and detachable swap assembly');
 for(const type of Object.keys(types)){
  await api.select(type);assert.equal(errors.length,0);assert.equal(api.ready(),true);assert.equal(api.type(),type);
  scene.updateMatrixWorld(true);const size=new THREE.Box3().setFromObject(V.root).getSize(new THREE.Vector3());assert(Math.abs(size.y-types[type].height)<2,`${type}: world height ${size.y}`);
  assert.equal(V.napeOpen,!types[type].armor);assert.equal(V.armorL,types[type].armor);assert(targets.length>10);assert.equal(new Set(anchors).size,anchors.length,'No stale or duplicate anchors');
  const count=targets.length;api.update(.016);api.reset();assert.equal(targets.length,count);assert.equal(api.inspect().equipment,true);
  assert(V.weak.parent!==V.root,'Weakpoint follows a real head group');assert(V.weak.userData.baseScale,'Weakpoint pulse preserves imported parent scale');
  if(type==='jaw')assert.deepEqual(api.inspect().clips.sort(),['bite','idle','roar','run']);
  // Anchors on the moving target follow its local point through translation.
  const body=targets.find(t=>t.userData.titanPart==='body');const point=new THREE.Vector3(0,0,0);hooks[0]={state:'locked',followObject:body,followPoint:point,anchor:new THREE.Vector3()};api.update(.016);scene.updateMatrixWorld(true);assert(hooks[0].anchor.distanceTo(body.localToWorld(point.clone()))<1e-5);hooks[0]={state:'idle'};
  console.log('PASS model',type,api.inspect().meshCount,'hit meshes','height',size.y.toFixed(2));
 }
 for(let round=0;round<3;round++)for(const type of ['jaw','armored','colossal','attack']){await api.select(type);scene.updateMatrixWorld(true);const h=new THREE.Box3().setFromObject(V.root).getSize(new THREE.Vector3()).y;assert(Math.abs(h-types[type].height)<2,'Repeated selection preserves model size: '+type);}
 await assert.rejects(api.select('not-a-titan'),/Unknown titan/);
 const previousWeak=V.weak;let disposed=false;previousWeak.geometry.addEventListener('dispose',()=>disposed=true);await api.select('armored');assert(disposed,'Switching disposes generated hit geometry');
 const roundA=new THREE.Group(),roundB=new THREE.Group();api.attachProjectile(roundA);api.attachProjectile(roundB);let meshA,meshB;roundA.traverse(o=>{if(o.isMesh)meshA=o});roundB.traverse(o=>{if(o.isMesh)meshB=o});assert.equal(meshA.geometry,meshB.geometry,'Projectile instances share geometry');
 // A visible launcher is a transient shot effect, not idle/reload equipment.
 assert(api.inspect().spears.every(s=>!s.visible),'Spears are hidden by default');api.showSpear(-1);assert.equal(api.inspect().spears.filter(s=>s.visible).length,1);api.update(.1);assert(api.inspect().spears.find(s=>s.side===-1).visible);P.thunderReload=1;api.update(.15);assert(api.inspect().spears.every(s=>!s.visible),'Spears hide after the shot even while reloading');P.thunderReload=0;api.reset();assert(api.inspect().spears.every(s=>!s.visible));
 // Imported limb geometry, not a whole 18m half-circle, controls arm hits.
 allowEnemyMovement=false;await api.select('attack');P.pos.set(0,10,26.5);hurtEvents=0;for(let i=0;i<440;i++)api.update(.016);assert.equal(hurtEvents,0,'A player outside the actual hand path is not hit');
 api.reset();P.pos.set(0,10,24);hurtEvents=0;let active=false;for(let i=0;i<500;i++){api.update(.016);const state=api.inspect().encounter;if(state.phase==='active'&&state.progress>.12){active=true;break;}}assert(active,'Arm swing reaches an active window');
 assert.deepEqual(api.inspect().joints.filter(j=>j.role==='arms').map(j=>j.name),['Pivot_096','Pivot_120'],'The real arms are used');assert(api.inspect().joints.filter(j=>j.role==='hips').every(j=>Math.abs(j.angle)<.02),'Arm sweeps do not rotate the legs');
 const hand=api.inspect().hands[0];P.pos.set(hand[0],hand[1]+.65,hand[2]);hurtEvents=0;allowContacts=false;api.update(.016);assert.equal(hurtEvents,0,'Cover blocks actual limb damage');allowContacts=true;api.update(.016);assert.equal(hurtEvents,1,'Contact with the moving hand deals one hit');api.update(.016);assert.equal(hurtEvents,1,'The same attack cannot hit repeatedly');allowEnemyMovement=true;
 console.log('PASS hidden spears, shot-only presentation, imported arm animation, actual limb contact and cover');
 // Simultaneous selection resolves to the latest requested target.
 await Promise.all([api.select('armored'),api.select('jaw')]);assert.equal(api.type(),'jaw');
 const html=fs.readFileSync('dist/ODM_TITAN_RAID.html','utf8'),scripts=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);for(const s of scripts)new vm.Script(s);
 assert(!html.includes('window.RAID_CINEMA='),'Cinematic is excluded from gameplay loading');assert(!html.includes('id="cinemaBtn"'));
 assert(!html.includes('PLACEHOLDER'));const hosted=fs.readFileSync('dist/index.html','utf8');assert(hosted.length<2*1024*1024,'Hosted menu does not embed all titan assets');assert(/data-src="OVERDRIVE_TITAN\.html\?v=[a-f0-9]{12}"/.test(hosted),'The hosted iframe URL invalidates cached older gameplay');const download=fs.readFileSync('dist/OVERDRIVE.html','utf8'),payload=download.match(/id="overdrive-package"[^>]*>([^<]+)</);const unpacked=payload?require('node:zlib').gunzipSync(Buffer.from(payload[1],'base64')).toString():download;assert(unpacked.includes('data-srcdoc='),'Download remains standalone');
 const {load:loadGame}=require('./odm-runtime.cjs');const game=loadGame(false,{RaidModels:moduleObj.exports});
 for(let i=0;i<100&&!game.api.getModels()?.ready;i++)await new Promise(r=>setImmediate(r));
 assert.equal(game.api.getModels().ready,true,'Game boot completes equipment and target loading');
 for(const type of Object.keys(types)){
  if(game.element('#changeLoadout').onclick)game.element('#changeLoadout').onclick();
  await game.api.selectTitan(type);game.api.beginMission();game.step(.032);assert.equal(game.api.getState().running,true);assert.equal(game.api.getModels().type,type);if(type==='colossal')assert(game.api.getState().pos[2]>120,'Colossal mission uses its configured distant spawn');
  if(type==='armored'){
   for(const [side,x] of game.api.getModels().shoulders.entries()){
    const pos=[x[0],x[1],x[2]+3];game.api.setPlayer(pos);game.api.setAim(0,0);game.step(.016);assert.equal(game.api.getAimTarget()?.part,side?'armorR':'armorL');game.api.fireThunder();game.step(.1);
   }
   assert.equal(game.api.getState().napeOpen,true,'Imported armor breaks and exposes nape');
  }
  // Execute repeated real blade attacks from behind the imported nape.
  if(type==='jaw'){
   for(let cut=0;cut<4&&!game.api.getState().missionOver;cut++){const n=game.api.getModels().nape;game.api.setPlayer([n[0],n[1],n[2]-2]);game.api.setAim(Math.PI,0);game.api.slash();game.step(.42);}
   assert.equal(game.api.getState().titanHp,0,'Imported jaw can be killed by close rear blade hits');assert.equal(game.api.getState().missionOver,true);assert.match(game.element('#endCopy').textContent,/最高速度/);assert.match(game.element('#endCopy').textContent,/自己ベスト/);
  }
  game.api.reset();game.step(.016);assert.equal(game.api.getState().missionOver,false);assert.equal(game.api.getState().titanHp,100);
 }
 game.api.beginMission();game.step(.04);game.dispatch('keydown',{code:'ShiftLeft'});const beforePause=game.api.getState();game.dispatch('blur');game.step(1);assert.equal(game.api.getState().simTime,beforePause.simTime,'Focus loss pauses the simulation');assert.equal(game.element('#pauseHint').style.display,'block');game.element('#pauseHint').dispatch('click');game.step(.032);assert(game.api.getState().simTime>beforePause.simTime);assert.equal(game.api.getState().hooks[0],'idle');
 // Spending every missile cannot lock the imported armored encounter.
 game.element('#changeLoadout').onclick();await game.api.selectTitan('armored');game.element('#missileCount').value='2';game.api.beginMission();game.api.setAim(Math.PI,0);game.api.fireThunder();game.step(.12);game.api.fireThunder();game.step(.12);assert.equal(game.api.getState().ammo,0);
 for(let side=0;side<2;side++)for(let cut=0;cut<3;cut++){const shoulder=game.api.getModels().shoulders[side];game.api.setPlayer([shoulder[0],shoulder[1],shoulder[2]+3]);game.api.setAim(0,0);game.api.slash();game.step(.4);}
 assert.equal(game.api.getState().napeOpen,true,'Blades open imported armor after missiles run out');
 for(let cut=0;cut<4&&!game.api.getState().missionOver;cut++){const n=game.api.getModels().nape;game.api.setPlayer([n[0],n[1],n[2]-3]);game.api.setAim(Math.PI,0);game.api.slash();game.step(.4);}assert.equal(game.api.getState().titanHp,0,'Ammo-empty armored fight is still winnable');game.api.reset();game.step(.016);
 // Void-returning legacy Pointer Lock and rejected Promise both recover safely.
 const canvas=game.element('canvas'),lock=canvas.requestPointerLock;canvas.requestPointerLock=()=>undefined;game.dispatch('blur');game.element('#pauseHint').dispatch('click');assert.equal(game.api.getState().paused,false);
 canvas.requestPointerLock=()=>Promise.reject(Error('denied'));game.dispatch('blur');game.element('#pauseHint').dispatch('click');await new Promise(resolve=>setImmediate(resolve));assert.equal(game.api.getState().paused,true,'Rejected pointer lock pauses safely');canvas.requestPointerLock=lock;game.element('#pauseHint').dispatch('click');
 // Finish must require a blade, including after all carried spears land.
 game.element('#changeLoadout').onclick();await game.api.selectTitan('colossal');game.element('#missileCount').value='6';game.api.beginMission();game.step(.016);
 function rear(){const n=game.api.getModels().nape;game.api.setPlayer([n[0],n[1],n[2]-3]);game.api.setAim(Math.PI,0);}
 for(let i=0;i<2;i++){rear();game.api.slash();game.step(.42);}assert.equal(game.api.getState().titanHp,32);
 for(let i=0;i<6;i++){if(game.api.getState().mag===0)game.step(1.5);rear();game.api.fireThunder();game.step(.12);}assert.equal(game.api.getState().titanHp,1,'Thunder cannot land the finishing blow');assert.equal(game.api.getState().missionOver,false);rear();game.api.slash();game.step(.016);assert.equal(game.api.getState().titanHp,0);assert.equal(game.api.getState().missionOver,true);
 game.element('#changeLoadout').onclick();await game.api.selectTitan('attack');game.api.beginMission();game.step(.016);
 let root=game.scene().getObjectByName('raid-nape');while(root.parent&&!root.parent.isScene)root=root.parent;
 const neck=game.api.getModels().nape;game.api.setPlayer([neck[0],neck[1],neck[2]+2]);game.api.setAim(0,0);game.api.slash();assert.equal(game.api.getState().titanHp,100,'Front-of-nape slash is rejected');
 root.position.set(64,0,-30);root.updateMatrixWorld(true);game.api.setPlayer([64,10,30]);game.api.setAim(0,0);assert.equal(game.api.getAimTarget(),null,'Building blocks titan target lock');
 console.log('PASS pointer lock variants, spear nonlethal limit, blade finish, frontal rejection and building occlusion');
 console.log('PASS focus-loss pause, visible resume and clock reset');
 console.log('PASS integrated game startup, all target missions, imported armor missile hits, rear blade kill and retry');
 console.log('PASS equipment, race handling, moving anchors, standalone script syntax');
})().catch(e=>{console.error(e);process.exitCode=1});
