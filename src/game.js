import {generateOmega,omegaBuild,OMEGA_CORES,OMEGA_FRAMES,OMEGA_FEEDS} from './omega-weapon.js';
import {composeOmegaEncounter,remixOmegaQueue,composeFractureEncounter,remixFractureQueue} from './omega-encounters.js';
import {createOmegaCombat} from './omega-combat.js';
import {createOmegaVisuals} from './omega-model.js';
import {OmegaRaid} from './omega-raid.js';
import {KineticArm} from './kinetic-arm.js';
import {createKineticArmVisuals} from './kinetic-arm-visuals.js';
import {createOmegaRaidVisuals} from './omega-raid-visuals.js';
import {CHRONARCH,ChronarchController} from './x-chronarch.js';
import {createChronarchModel,createChronoSealModel} from './x-chronarch-model.js';
import {XDirector,X_MUTATIONS,X_RULES} from './x-director.js';
import {createXEffects} from './x-effects.js';
import {WaveShift} from './wave-shift.js';
import {BossRush,BOSS_ATTACKS,BOSSES} from './boss-rush.js';
import {preloadBossModels,createBossModel} from './boss-models.js';
import {traceEnemyRay,enemyAimPoint} from './enemy-hit-shapes.js';
import {arsenalBuild,arsenalCards,isArsenalCard,canInstallArsenal,arsenalCardWeapon} from './arsenal-evolution.js';
import {createArsenalCombat} from './arsenal-combat.js';
import {createHeavyEvolutionVisuals} from './heavy-evolution-visuals.js';
import {createSpecialEvolutionVisuals} from './special-evolution-visuals.js';
import {pulseBuild,pulseCards,isPulseCard,canInstallPulse,PulseResonance} from './pulse-evolution.js';
import {createPulseEvolutionModel} from './pulse-model.js';
import {createPulseEffects} from './pulse-effects.js';
import {createWorldRebuild} from './world-rebuild.js';
import {RING_SHIFT_LAYOUT_IDS,createOmegaLayout} from './stage-layouts.js';
import {FractureDirector,composeIntentEncounter} from './fracture-intents.js';
import {createStageGimmicks} from './stage-gimmicks.js';
import {WeaponTraining} from './weapon-training.js';
import {createExplosionDirector} from './explosion-director.js';
import {createPhaseWeapon} from './phase-weapon.js';
import {PhaseControl,PHASE} from './phase-control.js';
import {tracePhaseShot,tracePhaseBlast} from './phase-combat.js';
import {applyEnemyReadability} from './enemy-visuals.js';
import {createArmory} from './armory.js';
import {createPhantomLance} from './phantom-lance.js';
import {createSeekerWeapon} from './seeker-weapon.js';
import {createSeekerSystem,SEEKER} from './seeker-system.js';
import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
const $=id=>document.getElementById(id), clamp=T.MathUtils.clamp;
const easyPreview=$('difficulty').value==='easy';
let mobile=matchMedia('(pointer:coarse)').matches;
const pcHint='WASD / 矢印 移動 / マウス視点・左クリック射撃 / 右クリック照準 / SPACE ジャンプ / SHIFT ダッシュ / C スライド / 1–6 武器 / R リロード / ESC 一時停止',mobileHint='左スティック 移動 / 右ドラッグ 照準 / FIRE 射撃 / 右画面タップで狙撃照準 3×→6×→解除';
function syncControls(){document.body.classList.toggle('mobile',mobile);$('mobile-instructions').hidden=!mobile;$('inputhelp').textContent=mobile?mobileHint:pcHint;$('controlsHint').textContent=(mobile?mobileHint:pcHint)+($('difficulty').value==='x'?' / Q・BREAK 時間減速 / 二段ジャンプ':'');if($('difficulty').value==='x')$('inputhelp').textContent=$('controlsHint').textContent;}
$(mobile?'device-mobile':'device-pc').checked=true;
document.querySelectorAll('input[name="device"]').forEach(el=>el.addEventListener('change',()=>{mobile=el.value==='mobile';syncControls();syncOmegaPreview();syncTitanPreview()}));
function syncDifficultyPreview(){const easy=$('difficulty').value==='easy';$('difficulty-summary').textContent=easy?'操作練習から始める、ボスラッシュ付きのやさしいキャンペーン。':'OVERDRIVE本来のスピードと戦闘を楽しめます。';$('menu-tagline').textContent=easy?'はじめてでも、気軽に楽しもう。':'止まるな。限界を、撃ち抜け。';$('menu-intro').innerHTML=easy?'操作を練習して5つのウェーブを突破。<br>最終区画は、やさしめのボスラッシュ。':'移動が力になる。6つの戦闘区画を突破。最終区画は30秒制ボスラッシュ。<br>5体撃破で勝利、5体逃すと敗北。';$('how').innerHTML=easy?'<b>遊び方</b><p>移動しながら敵を撃とう。青いオーブを集めるとレベルアップ。レベルアップとウェーブクリアで強化を選べます。武器の強化は3段階。カードに書かれた武器名を見て、育てたい強化を選ぼう。</p><p>武器は6種類。弾が切れたらリロード。移動やダッシュで攻撃を避けよう。</p><p>かんたんでは、最初に基本操作と武器を練習できます。練習中は無敵。いつでもスキップできます。5つの通常ウェーブの後はボスラッシュ。10種のボスからランダムに登場し、5体撃破で勝利。5体逃すと敗北します。リヴァイアサンは必ず5勝目に現れます。ボスの体力と攻撃を抑え、時間切れ後の弱体化も軽くしています。</p>':'<b>MOVE → CHARGE → OVERDRIVE</b><p>最終区画：10種のボスからランダムに交代。1戦30秒、5撃破で勝利／5失敗で敗北。時間切れは能力強奪＋専用カード。再構築中は全武器を装填。</p><p>高速移動で熱量が上昇。最大で8秒間、連射と威力が加速。<br>青いオーブでレベルアップ。レベルごと＋ウェーブクリア時に強化を選ぶ。</p><p>全6武器が強化カード3枚で最終形態へ進化。コア増幅 → 2系統から分岐 → 最終形態。ランダムな強化カードから、育てたい武器の進化を選ぼう。</p><p>4番武器〈ASTRA × VANTA〉。移動ゲージ満タンで弾＋12。<br>短押しで光弾、長押し→離して発射。10〜23発でNOVA、24発全消費で照準地点に大爆発を起こす最終奥義「EXPLOSION」。<br>Rキー／スマホのチャージボタンでもチャージ砲を撃てます。</p><p>5番武器〈PHANTOM LANCE〉。装弾1発・胴体120／コア264ダメージ。3×/6×照準は右クリック（PC）または画面右側タップ（スマホ）。射撃後にFIREかRで2.4秒リロード。単発狙撃、貫通なし。</p><p>6番武器〈SEEKER〉。6発装填、最大3体をロックして追尾ミサイルを一斉発射。敵へ照準を約0.22秒合わせるとロック。ロックなしでも直進弾を発射。R／リロードで再装填。</p>';syncControls()}
$('difficulty').addEventListener('change',syncDifficultyPreview);
$('difficulty').addEventListener('change',syncXPreview);
$('difficulty').addEventListener('change',syncOmegaPreview);$('difficulty').addEventListener('change',syncTitanPreview);
syncDifficultyPreview();
syncControls();
let saved={best:0,runs:0,wins:0};try{Object.assign(saved,JSON.parse(localStorage.getItem('overdrive-v1')||'{}'))}catch{}function record(){ $('record').textContent=`BEST ${saved.best.toLocaleString()} / RUNS ${saved.runs} / CLEARS ${saved.wins}` }record();
let xSaved={best:0,runs:0,wins:0};try{Object.assign(xSaved,JSON.parse(localStorage.getItem('overdrive-x-v1')||'{}'))}catch{}syncXPreview();
let renderer;try{renderer=new T.WebGLRenderer({canvas:$('game'),antialias:true,powerPreference:'high-performance'})}catch(e){$('start').disabled=true;$('start').textContent='WebGLを利用できません';throw e}renderer.setClearColor(0x081422);renderer.outputColorSpace=T.SRGBColorSpace;renderer.setPixelRatio(Math.min(devicePixelRatio, mobile?1.3:1.7));
const scene=new T.Scene();scene.fog=new T.Fog(easyPreview?0x102536:0x081422,easyPreview?32:24,easyPreview?92:75);const camera=new T.PerspectiveCamera(78,innerWidth/innerHeight,.08,400);camera.rotation.order='YXZ';scene.add(camera);const sky=new T.Mesh(new T.SphereGeometry(115,32,20),new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{horizon:{value:new T.Color(0x163344)},zenith:{value:new T.Color(0x030c20)}},vertexShader:'varying vec3 vPos;void main(){vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform vec3 horizon;uniform vec3 zenith;varying vec3 vPos;void main(){float h=normalize(vPos).y;float blend=smoothstep(-.18,.78,h);vec3 col=mix(horizon,zenith,blend);float stars=step(.9985,fract(sin(dot(floor(vPos.xz*1.7),vec2(12.9898,78.233)))*43758.5453));col+=stars*max(0.0,h)*.75;gl_FragColor=vec4(col,1.0);}'}));scene.add(sky);const hemi=new T.HemisphereLight(0xa1dcff,0x172533,2.4);scene.add(hemi);const sun=new T.DirectionalLight(0xe1fff9,easyPreview?2.8:2.3);sun.position.set(-10,25,8);scene.add(sun);
const mats={};function mat(color,em=0){let k=color+':'+em;return mats[k]||(mats[k]=new T.MeshStandardMaterial({color,roughness:.65,metalness:.3,emissive:color,emissiveIntensity:em}))}const boxGeo=new T.BoxGeometry(1,1,1),sphereGeo=new T.IcosahedronGeometry(1,0);
function box(parent,x,y,z,w,h,d,color,em=0){const m=new T.Mesh(boxGeo,mat(color,em));m.position.set(x,y,z);m.scale.set(w,h,d);parent.add(m);return m}function orb(parent,x,y,z,r,color,em=.5){const m=new T.Mesh(sphereGeo,mat(color,em));m.position.set(x,y,z);m.scale.setScalar(r);parent.add(m);return m}
const arena=new T.Group();scene.add(arena);const easyCover=new T.Group();easyCover.userData.easyCover=true;arena.add(easyCover);const solids=[];function solid(x,y,z,w,h,d,removeInEasy=false){const parent=removeInEasy?easyCover:arena;box(parent,x,y,z,w,h,d,0x253b4c);solids.push({x,z,w:w/2,d:d/2,top:y+h/2,removeInEasy});box(parent,x,y+h/2+.015,z,w,.03,d,0x40606b);box(parent,x,y+h/2+.05,z-d/2,w,.07,.06,0x70ffda,1)}
let floorMaterial;floorMaterial=box(arena,0,-.4,0,64,.8,64,easyPreview?0x1a3441:0x122632).material;const grid=new T.GridHelper(64,32,0x42606c,0x223b49);grid.position.y=.015;arena.add(grid);
for(let i=0;i<4;i++){let a=i*Math.PI/2;let g=new T.Group();g.rotation.y=a;arena.add(g);box(g,0,2,-32,64,4,1,0x1e3445);box(g,0,4.1,-32,64,.12,.2,0x73ffe0,.9);for(let j=-28;j<=28;j+=8){box(g,j,5,-34,3,10,3,0x172b3c);box(g,j,8,-32.45,.15,3,.1,0x81ffdd,1);box(g,j,1.7,-31.4,2,.3,.15,0xf7b455,.8)}}
solid(-9,1.25,-7,6,2.5,5);solid(9,1.25,7,6,2.5,5);solid(11,2.5,-12,5,5,5);solid(-11,2.5,12,5,5,5);solid(0,.65,-17,9,1.3,3);solid(0,.65,17,9,1.3,3,true);
const pads=[];for(const [x,z] of [[-21,-16],[21,16],[0,0],[-18,13],[18,-13]]){let g=new T.Group();g.userData.pad=true;g.position.set(x,.08,z);arena.add(g);box(g,0,-.04,0,3.4,.32,3.8,0x183c4b,.35);box(g,0,.18,.45,2.9,.16,2.25,0x245262,.35);let ramp=box(g,0,.42,-.85,2.8,.24,1.75,0x55e6d1,.55);ramp.rotation.x=-.27;for(const side of [-1,1]){let rail=box(g,side*1.48,.31,-.72,.16,.38,2.3,0x356979,.25);rail.rotation.x=-.18}for(let i=0;i<3;i++){let arrow=box(g,0,.57,-1.28+i*.37,1.95,.045,.09,0xcafff3,1);arrow.rotation.x=-.27}let lip=box(g,0,.16,-1.78,3.1,.16,.18,0x78ffdc,1);pads.push(g)}
for(let i=0;i<28;i++){let a=i/28*Math.PI*2,r=49+Math.random()*10;box(arena,Math.cos(a)*r,4+Math.random()*10,Math.sin(a)*r,3+Math.random()*6,16+Math.random()*20,4,0x102333)}
const ring=new T.Mesh(new T.TorusGeometry(9,.12,6,60),mat(0x76ffdf,1));ring.rotation.x=Math.PI/2;ring.position.y=.07;arena.add(ring);
const padMaterials=[...new Set(pads.flatMap(g=>{const a=[];g.traverse(o=>{if(o.isMesh&&o.material.emissiveIntensity>.5)a.push(o.material)});return a}))];
// Batch static architecture by material to keep mobile draw calls bounded.
arena.updateMatrixWorld(true);const batches=new Map();arena.traverse(o=>{if(o.isMesh&&!o.parent?.userData.easyCover&&!o.parent?.userData.pad){let list=batches.get(o.material)||[];list.push(o.geometry.clone().applyMatrix4(o.matrixWorld));batches.set(o.material,list)}});const gridKeep=grid;gridKeep.raycast=()=>{};arena.clear();arena.add(easyCover);arena.add(gridKeep);pads.forEach(pad=>arena.add(pad));for(const [material,geometries] of batches){const geometry=mergeGeometries(geometries);arena.add(new T.Mesh(geometry,material));geometries.forEach(g=>g.dispose())}
// A floating reactor gives the standard arena a dramatic focal point without adding collision or obscuring the combat lanes.
const normalSpectacle=new T.Group();scene.add(normalSpectacle);normalSpectacle.position.set(0,0,0);const reactorCore=new T.Mesh(new T.OctahedronGeometry(1.05,1),new T.MeshStandardMaterial({color:0x73eaff,metalness:.55,roughness:.22,emissive:0x168cff,emissiveIntensity:2.1}));reactorCore.position.y=4.1;normalSpectacle.add(reactorCore);const reactorRings=[];for(const [radius,tube,color,tilt] of [[2.25,.09,0x58e8ff,.18],[2.9,.055,0xffc76e,-.35],[3.45,.045,0x9d83ff,.62]]){const ringMesh=new T.Mesh(new T.TorusGeometry(radius,tube,8,64),new T.MeshStandardMaterial({color,metalness:.5,roughness:.25,emissive:color,emissiveIntensity:1.6,transparent:true,opacity:.88}));ringMesh.position.y=4.1;ringMesh.rotation.x=Math.PI/2+tilt;normalSpectacle.add(ringMesh);reactorRings.push(ringMesh)}const reactorHalo=new T.Mesh(new T.TorusGeometry(1.35,.12,8,40),new T.MeshStandardMaterial({color:0xc8fbff,emissive:0x65dfff,emissiveIntensity:2.4,metalness:.35,roughness:.2}));reactorHalo.position.y=4.1;reactorHalo.rotation.x=Math.PI/2;normalSpectacle.add(reactorHalo);
let stageGimmicks;
const world=createWorldRebuild({scene,arena,solids,sky:sky.material,floor:floorMaterial,hemi,sun,reactor:normalSpectacle,rings:reactorRings,core:reactorCore,halo:reactorHalo,padMaterials,pads,skyObject:sky,legacyObjects:arena.children.filter(o=>!pads.includes(o)),legacySolids:[...solids],getStageGimmicks:()=>stageGimmicks});
stageGimmicks=createStageGimmicks({scene,arena,getLayout:()=>world.radar(),notify:(message,time)=>notify(message,time),sound:(...args)=>sound(...args)});
let rebuildPending=false,resumeState='playing';
function beginReconstruction(){if(isRiftMode()){beginOmegaReconstruction('sector');return;}resetArsenal(false);pulseEffects.reset();$('pulse-hud').hidden=true;rebuildPending=false;state='rebuilding';input.fire=input.firePressed=false;input.keys={};input.jump=false;input.x=input.y=0;seeker.clearFlight();clearObjects(bullets);clearObjects(hazards);clearObjects(fx);phaseControl.cancelHold();sniperScope(false);p.x=0;p.z=12;p.y=0;p.vy=0;p.dashing=p.slide=0;yaw=pitch=0;seekerModel.root.visible=false;phantomLance.root.visible=false;hitTime=hurtTime=0;document.body.classList.add('reconstructing');world.begin(isRiftMode()?(omegaNextLayout||9):difficulty==='x'?(xNextLayout=pickXLayout(wave+1)):wave+1,difficulty==='easy',difficulty==='x'?2.4:undefined);$('rebuild').hidden=false;sound(110,.7,'sine',.05);document.exitPointerLock?.();}
const gun=new T.Group();camera.add(gun);
const armory=createArmory(gun),gunModels=armory.models,mechanisms=armory.actions;const pulseCoreMaterial=armory.pulseMaterial;
const pulseModel=createPulseEvolutionModel(gunModels[0],{muzzle:armory.muzzles[0],port:armory.ports[0]}),pulseResonance=new PulseResonance(),pulseEffects=createPulseEffects(scene);
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const muzzle=new T.Group();gun.add(muzzle);muzzle.position.set(0,.02,-.7);const flashMaterial=new T.MeshBasicMaterial({color:0xdffff4,transparent:true,opacity:.85,depthWrite:false,blending:T.AdditiveBlending});for(let i=0;i<3;i++){const f=new T.Mesh(boxGeo,flashMaterial);f.scale.set(.018,.12,.19);f.rotation.z=i*Math.PI/3;muzzle.add(f)}
const phaseModel=createPhaseWeapon(gun),phaseControl=new PhaseControl(),phantomLance=createPhantomLance(camera);
const seekerModel=createSeekerWeapon();camera.add(seekerModel.root);seekerModel.root.visible=false;
const heavyEvolution=createHeavyEvolutionVisuals({scene,parents:{1:gunModels[1],2:gunModels[2]},muzzles:{1:armory.muzzles[1],2:armory.muzzles[2]}});
const specialEvolution=createSpecialEvolutionVisuals({scene,parents:{3:phaseModel.root,4:phantomLance.root,5:seekerModel.root},muzzles:{3:phaseModel.muzzle,4:phantomLance.muzzle,5:seekerModel.muzzleMarkers[0]}});
const arsenalCombat=createArsenalCombat({onTrace:trace=>{if(difficulty==='fracture'&&(trace.piercing||!trace.hits.length))arsenalCoverTraces.push({origin:trace.origin.clone(),direction:trace.direction.clone(),range:trace.limit+.08,damage:weapons[p.weapon].damage*arsenalBuild(p.weapon,p.up).power});},getEnemies:()=>enemies,wallDistance:seekerWallDistance,damage,attackMeta:e=>({attackId:attackSerial,distance:e.mesh.position.distanceTo(camera.position),weapon:p?.weapon}),knockback:arsenalKnockback,discharge:arsenalDischarge,onRay:(origin,direction)=>{arena.updateWorldMatrix(true,true);ray.set(origin,direction);stageGimmicks.handleRayHits(ray.intersectObjects(arena.children,false),enemies,bossRef)}});
const seeker=createSeekerSystem(scene,{onWallHit:event=>damageOmegaCover(event.origin,event.direction,event.damage,event.range),wallDistance:seekerWallDistance,onHit:seekerHit,onLock:()=>sound(880,.055,'sine',.012)});
const seekerMarkers=Array.from({length:3},()=>{const e=document.createElement('div');e.classList.add('seeker-lock');$('seeker-hud').append(e);return e;});
function seekerWallDistance(origin,direction,length){
 arena.updateWorldMatrix(true,true);const meshes=[];
 function visit(o){if(!o.visible)return;if(o.isMesh)meshes.push(o);for(const c of o.children)visit(c);}visit(arena);
 ray.set(origin,direction);const hit=ray.intersectObjects(meshes,false)[0];return hit&&hit.distance<=length?hit.distance:Infinity;
}
function seekerHit(e,amount,missile){
 const b=missile?.evolution||arsenalBuild(5,p.up),raw=amount;
 if(b.tier&&e.type==='boss')amount*=b.hunterMultiplier;
 if(b.tier&&b.splashRadius){for(const other of enemies){if(other===e||other.hp<=0)continue;const delta=other.mesh.position.clone().sub(e.mesh.position),distance=delta.length();if(distance>b.splashRadius||seekerWallDistance(e.mesh.position,delta.normalize(),distance)<distance-.12)continue;const falloff=1-.6*distance/b.splashRadius;damage(other,raw*b.splashPower*falloff*(other.type==='boss'?(other.exposed>0?1.8:.55):1),false);}}
 if(b.tier)arsenalDischarge(5,e.mesh.position.clone().add(new T.Vector3(0,.1,.1)),e.mesh.position,{build:b,charged:b.tier===3});
 if(e.type==='boss')amount*=e.exposed>0?1.8:.55;
 if(p.up.execution&&e.hp<e.max*.35)amount*=1+.3*p.up.execution;
 damage(e,amount,true,{direct:true,head:false,attackId:missile?.attackId??-1,distance:e.mesh.position.distanceTo(camera.position),weapon:5});sound(90,.13,'triangle',.035);
 if(false&&p.up.chain){const next=enemies.find(n=>n!==e&&n.hp>0&&n.mesh.position.distanceTo(e.mesh.position)<6);if(next){beam(e.mesh.position,next.mesh.position,0x91cdff,.035,.14);damage(next,(10+p.charge*.15)*p.up.chain,false);}}
}
function shootSeeker(){
 if(p.cool>0||p.reload>0||p.exhaust>0||ultimate.active||state!=='playing')return;
 if(p.ammo[5]<=0){reload();return;}
 const viewDirection=new T.Vector3(0,0,-1).applyQuaternion(camera.quaternion);ray.set(camera.position,viewDirection);stageGimmicks.handleRayHits(ray.intersectObjects(arena.children,false),enemies,bossRef);
 const origins=[0,1,2].map(i=>seekerModel.getMuzzleWorldPosition(i)),directions=[0,1,2].map(i=>seekerModel.getMuzzleWorldDirection(i));
 for(const origin of origins){const delta=origin.clone().sub(camera.position),length=delta.length(),hit=seekerWallDistance(camera.position,delta.normalize(),length);if(Number.isFinite(hit))origin.copy(camera.position).addScaledVector(delta,Math.max(.02,hit-.05));}
 const power=(p.over>0?1.35:1)*((terrainStage()>1?!p.grounded:p.y>.5)&&p.up.air?1+.4*p.up.air:1)*(p.slide>0&&p.up.slide?1+.45*p.up.slide:1);
 const b=arsenalBuild(5,p.up),attackId=++attackSerial;const cells=seeker.launch({origins,directions,ammo:p.ammo[5],power:power*b.power,evolution:b,attackId});
 if(!cells.length)return;
 if(!tutorialActive||weaponPractice())p.ammo[5]-=cells.length;p.cool=b.rate*(p.over>0?.65:1);recoil=.19;cells.forEach(i=>seekerModel.fire(i));sound(125,.2,'sawtooth',.045);
}
function drawSeeker(){
 const active=state==='playing'&&p?.weapon===5&&!ultimate.active;
 $('seeker-hud').hidden=!active;
 if(!active)return;
 const markers=seeker.hud(camera,innerWidth,innerHeight);
 seekerMarkers.forEach((el,i)=>{const m=markers[i];el.hidden=!m||!m.onScreen;if(!m)return;el.style.transform=`translate(${m.x}px,${m.y}px) translate(-50%,-50%)`;el.classList.toggle('ready',m.progress>=1);el.style.setProperty('--progress',m.progress);});
 const count=seeker.metrics().ready;
 $('seeker-status').textContent=p.reload>0?'CELL RELOAD':p.ammo[5]<=0?'EMPTY / RELOAD':count?`LOCK ${count} / FIRE`:'敵を捉えてロック';
}
let phaseShots=0,phaseBeams=0,novaShots=0,explosionShots=0,phaseSpent=0,phaseWasActive=false;
let shotFlash=0,swapAnim=0,attackSerial=0;
let augmentRuntime={secondwind:false,hotSwapUntil:0,hotSwapReady:false,hotSwapCd:0,spotter:null,arcMark:null,precisionAt:0,overKills:0,overEchoUsed:false,parryUsed:false,ramUsed:false,airJumpReady:false};
const ultimate=createExplosionDirector(scene,{getAudio:()=>audio,soundEnabled:()=>$('sound').checked});
let audio;function sound(f=300,d=.08,type='sawtooth',v=.045){if(!$('sound').checked||!audio)return;const o=audio.createOscillator(),g=audio.createGain();o.type=type;o.frequency.setValueAtTime(f,audio.currentTime);o.frequency.exponentialRampToValueAtTime(Math.max(30,f*.3),audio.currentTime+d);g.gain.setValueAtTime(v,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+d);o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+d)}
const weapons=[{name:'PULSE / パルスライフル',mag:50,easyMag:50,rate:.105,damage:16,reload:1.25,pellets:1,spread:.008,color:0x8affda},{name:'BREACH / 散弾砲',mag:10,easyMag:10,rate:.7,damage:12.5,reload:1.65,pellets:8,spread:.16,easySpread:.11,color:0xffcb79},{name:'RAILGUN / レールガン',mag:6,easyMag:6,rate:.95,damage:92,reload:1.9,pellets:1,spread:0,color:0x9cbdff}];
const upgrades=[['chain','ARC LINK','電弧伝導','敵Aに直撃後、次の射撃で別の敵Bに当てると、電弧が両者に追加ダメージ。'],['leech','RECOVERY','回生回路','撃破で即座に耐久を4回復。回復片の効果も増加。'],['capacitor','CAPACITOR','慣性蓄電','移動中の熱量獲得 +35%。OVERDRIVE開始時、周囲の通常敵を押し戻す。'],['air','SKY BREAKER','空中制圧','空中射撃の威力 +40%。ジャンプ後も攻め続けろ。'],['dash','PHASE ENGINE','位相機関','ダッシュの再使用時間 -25%。無敵時間を延長。'],['blast','AFTERSHOCK','誘爆弾頭','撃破時に爆発。密集した敵に連鎖ダメージ。'],['feed','AUTO FEED','自動装填','撃破時、通常3武器の使用中の銃に弾を20%補充。'],['armor','REINFORCE','強化外殻','最大耐久 +25、耐久を35回復。'],['focus','CORE HUNTER','コア狙撃','敵の上部コアへの命中ダメージをさらに +60%。'],['slide','GROUND ZERO','地走電流','スライド中の射撃威力 +45%。スライドの時間延長。']];
upgrades.push(['range','RANGE TUNER','中距離調整','パルスライフル専用 / 得意距離の上限 +1.5m、近距離側も拡張。'],['breach','CONCUSSIVE LOAD','衝撃装填','散弾砲専用 / 押し戻し +40%、よろめき +0.08秒。'],['fork','FORKED ARC','分裂導体','レールガン専用 / 撃破時、近くの敵へ最大2本の28ダメージ弾。']);
upgrades.push(['magnet','BLUE HARVEST','青晶収集','オーブ吸引 +3m、取得XP +15%。'],['reload','QUICK CHAMBER','高速装填','リロード時間 -18%。'],['momentum','HOT START','熱量回収','撃破で熱量 +8（OVERDRIVE中を除く）。'],['execution','FINISHER','追撃回路','耐久35%以下の敵への射撃ダメージ +30%。']);
upgrades.push(
 ['secondwind','SECOND WIND','緊急再起動','致死ダメージを1回だけ耐え、耐久20・ダッシュ準備完了・熱量50で復帰。'],
 ['spotter','SPOTTER','遠距離標識','20m以上の直撃で4秒マーキング。次の別攻撃は+25%ダメージ（追加上限20）。'],
 ['hotswap','HOT SWAP','高速持ち替え','武器変更後1.5秒以内の次の攻撃に+30%（追加上限20）。全体クールダウン2秒。'],
 ['precision','PRECISION ECHO','精密反響','弱点撃破でダッシュ残り時間 -1.2秒。準備済みなら熱量 +10。1.5秒に1回。'],
 ['airjump','AIR REBOOT','空中再起動','空中撃破で、着地までに1回だけ空中ジャンプを再使用可能。'],
 ['overecho','OVERDRIVE ECHO','過熱余韻','OVERDRIVE中に3体撃破で持続 +1秒。1回の発動につき1回。'],
 ['parry','KINETIC PARRY','位相迎撃','ダッシュ中に敵弾を1発破壊すると熱量 +12。1ダッシュ1回。'],
 ['pointblank','POINT-BLANK PATTERN','至近散弾','散弾砲専用 / 6m以内の敵を狙うと散弾の拡散 -25%。'],
 ['ram','PHASE RAM','位相ラム','ダッシュ接触で通常敵へ45ダメージ + 0.4秒よろめき。接触後、残り無敵時間終了。']
);
const targetedAugments=new Set(['range','breach','fork','feed','pointblank']);
const singleUseAugments=new Set(['secondwind','spotter','hotswap','precision','airjump','overecho','parry','pointblank','ram']);
const augmentMeta={
 chain:{target:'全武器',trigger:'敵Aに直撃 → 次の射撃で敵Bに直撃',detail:'18m以内の別の敵へ電弧。両方に15ダメージ、3秒以内・射撃1回につき1組。'},
 leech:{target:'全武器',trigger:'敵を撃破 / 青い回復片を取得',detail:'撃破時に耐久 +4。回復片の回復量も +2。'},
 air:{target:'全武器',trigger:'空中で射撃',detail:'射撃ダメージ +40%。'},
 dash:{target:'全武器',trigger:'ダッシュ',detail:'再使用時間 -25%、無敵時間 +0.1秒。'},
 blast:{target:'全武器',trigger:'敵を撃破',detail:'半径4.5mの敵に32ダメージ。爆風からの連鎖はしない。'},
 armor:{target:'全武器',trigger:'カード取得時',detail:'最大耐久 +25、耐久を +35回復。'},
 focus:{target:'全武器',trigger:'敵の上部コアを狙撃',detail:'弱点ダメージ倍率 +0.6。'},
 slide:{target:'全武器',trigger:'スライド中に射撃',detail:'射撃ダメージ +45%、スライド時間 +0.3秒。'},
 magnet:{target:'全武器',trigger:'青い経験値片の近くに接近',detail:'吸引範囲 +3m、取得XP +15%。'},
 reload:{target:'全武器',trigger:'リロード',detail:'リロード時間 -18%。'},
 momentum:{target:'全武器',trigger:'OVERDRIVE外で敵を撃破',detail:'熱量 +8。'},
 execution:{target:'全武器',trigger:'耐久35%以下の敵を攻撃',detail:'その敵への射撃ダメージ +30%。'},
 capacitor:{target:'全武器',trigger:'移動で熱量満タン',detail:'蓄積 +35%。発動時、半径3mの通常敵を押し戻す。'},
 secondwind:{target:'全武器',trigger:'致死ダメージ（1ラン1回）',detail:'HP20で踏みとどまり、ダッシュ準備完了・熱量50。追加無敵なし。'},
 spotter:{target:'全武器',trigger:'20m以上から直撃',detail:'4秒以内の次の別攻撃に +25%（追加上限20）。'},
 hotswap:{target:'全武器',trigger:'武器変更後の次の攻撃',detail:'1.5秒以内に +30%（追加上限20）。2秒クールダウン。'},
 precision:{target:'全武器',trigger:'弱点撃破',detail:'ダッシュ残り時間 -1.2秒。準備済みなら熱量 +10。'},
 airjump:{target:'全武器',trigger:'空中で敵を撃破',detail:'着地まで1回、同じジャンプ入力で再ジャンプ。'},
 overecho:{target:'全武器',trigger:'OVERDRIVE中に3体撃破',detail:'持続時間 +1秒。各OVERDRIVEで1回。'},
 parry:{target:'全武器',trigger:'ダッシュ中に敵弾をかすめる',detail:'敵弾を1発破壊し、熱量 +12。1ダッシュ1回。'},
 pointblank:{target:'散弾砲専用',trigger:'狙った敵が6m以内',detail:'散弾の拡散 -25%。距離倍率・威力は変化なし。'},
 ram:{target:'全武器',trigger:'ダッシュ中に通常敵へ接触',detail:'45ダメージ + 0.4秒よろめき。接触後は無敵終了。'},
 range:{target:'パルスライフル専用',trigger:'装備中は常時',detail:'得意距離を拡張。'},
 breach:{target:'散弾砲専用',trigger:'装備中は常時',detail:'押し戻しとよろめきを強化。'},
 fork:{target:'レールガン専用',trigger:'レールで敵を撃破',detail:'近くの敵へ分裂弾。'},
 feed:{target:'パルス / 散弾 / レール',trigger:'対象武器で敵を撃破',detail:'装填数の20%を補充。'}
};
weapons.push({name:"ASTRA × VANTA / アストラ・ヴァンタ",mag:24,easyMag:24,rate:.16,damage:45,reload:0,pellets:1,spread:0,color:0xa99fff});weapons.push({name:'PHANTOM LANCE / ファントム・ランス',mag:1,easyMag:1,rate:.65,damage:120,reload:2.4,pellets:1,spread:.024,color:0x72eaff,headMultiplier:2.2});
weapons.push({name:'SEEKER / シーカーミサイル',mag:SEEKER.mag,easyMag:6,rate:SEEKER.rate,damage:SEEKER.damage,reload:SEEKER.reload,pellets:1,spread:0,color:0x78eddf});
function magSize(i){if(isRiftMode()&&i===6&&omegaDescriptor)return currentOmega().mag;return i===0?pulseBuild(p?.up).mag:arsenalBuild(i,p?.up).mag}
function reloadDuration(i=p.weapon){if(isRiftMode()&&i===6)return currentOmega().reload*Math.pow(.95,omegaReload);return (i===0?pulseBuild(p.up).reload:arsenalBuild(i,p.up).reload)*Math.pow(isRiftMode()?.95:.82,isRiftMode()?omegaReload:p.up.reload||0)*(difficulty==='easy'?.55:1);}
function pulseBand(){const lv=p?.up?.range||0,b=pulseBuild(p?.up);return{peakStart:Math.max(b.tier?2:5,b.start-lv*.65),peakEnd:b.end+lv*1.5}}
// Shared distance profile; easy retains its previous 16-damage peak as a boost.
function pulseDamageAt(distance){return pulseBaseDamageAt(distance)*pulseBuild(p?.up).power*(difficulty==='easy'?weapons[0].damage/7:1)}
function pulseBaseDamageAt(distance){const band=pulseBand();if(distance<band.peakStart)return 2;if(distance<band.peakStart+2)return T.MathUtils.lerp(2,7,(distance-band.peakStart)/2);if(distance<=band.peakEnd)return 7;return 7*Math.pow(clamp(1-(distance-band.peakEnd)/pulseBuild(p?.up).tail,0,1),2)}

const weaponTraining=new WeaponTraining();let tutorialCardTime=0;
function weaponPractice(){return difficulty==='easy'&&tutorialActive&&weaponTraining.active;}
let pendingLevels=0,waveReward=false,choiceReason='wave',rewardSerial=0;
let difficulty='normal',easyCombo=0,easyComboTimer=0,tutorialActive=false,tutorialStage=-1,tutorialMoveOrigin=null,tutorialMoveIndex=0,tutorialTarget=null,tutorialXPStart=0,tutorialPadHits=0;let state='menu',p, enemies=[],bullets=[],fx=[],pickups=[],hazards=[],wave=0,score=0,kills=0,runTime=0,spawnQueue=[],spawnTimer=0,transition=0,noticeTimer=0,hitTime=0,hurtTime=0,recoil=0,clock=0,seed=1,rngState=1,offered=[],bossRef=null;
const input={keys:{},fire:false,firePressed:false,jump:false,dive:false,x:0,y:0}, V=new T.Vector3(), ray=new T.Raycaster();let yaw=0,pitch=0,sniperAim=false,sniperZoom=3;
const xChronarch=new ChronarchController(),xChronarchModel=createChronarchModel(),xSealModels=Array.from({length:2},()=>createChronoSealModel());
const xDirector=new XDirector(),xEffects=createXEffects(scene);let xNextLayout=0,xSpawnSerial=0,xSwapCd=0,xSwapBuff=0,xAnnouncement=0,xStartWeapon=0,xFailure='',xReflected=0,xReflections=0;
const rush=new BossRush(()=>random());const waveShift=new WaveShift(()=>random());let waveShiftTransition=false;let rushTransition=false,viewKick=0,lastRingShiftLayout=0,leviathanDive=null;
function random(){rngState=(Math.imul(rngState,1664525)+1013904223)>>>0;return rngState/4294967296}function pickRingShiftLayout(){const pool=RING_SHIFT_LAYOUT_IDS.filter(id=>id!==lastRingShiftLayout);lastRingShiftLayout=pool[Math.floor(random()*pool.length)];return lastRingShiftLayout}function notify(s,t=2.5){$('notice').textContent=s;noticeTimer=t}function clearObjects(arr){for(const e of arr){e.bossVisual?.dispose();scene.remove(e.mesh);if(e.owned)e.mesh.traverse(o=>{if(o.material)o.material.dispose()});}arr.length=0}function reset(){bossLoadToken++;world.clearBossArena?.();resetKinetic();clearOmegaRaidTargets();omegaRaid.reset(1);raidStarted=false;raidBossSpawned=false;omegaCombat.reset();omegaVisuals.reset();resetX();$('boss').querySelector('small').textContent='WARDEN / 露出したコアを狙え';rush.reset();leviathanDive=null;waveShift.reset();waveShiftTransition=false;rushTransition=false;viewKick=0;lastRingShiftLayout=0;resetArsenal();pulseResonance.reset();pulseEffects.reset();pulseModel.configure(pulseBuild());$('pulse-hud').hidden=true;world.setWave(1,difficulty==='easy');rebuildPending=false;document.body.classList.remove('reconstructing','underwater');$('rebuild').hidden=true;resetTutorialState();seeker.reset();ultimate.reset();phaseControl.reset();phaseShots=0;phaseBeams=0;novaShots=0;explosionShots=0;phaseSpent=0;phaseWasActive=false;phaseModel.update(0);document.body.classList.remove('phase-active');[enemies,bullets,fx,pickups,hazards].forEach(clearObjects);bossRef=null;easyCombo=0;easyComboTimer=0;$('killstreak').hidden=true;pendingLevels=0;waveReward=false;shotFlash=0;swapAnim=0;wave=0;score=0;kills=0;runTime=0;seed=(Date.now()>>>0);rngState=seed;p={x:0,y:0,z:12,vy:0,exhaust:0,grounded:true,floatCharge:1.8,accelTime:0,accelX:0,accelZ:-1,liftId:null,hp:100,max:100,charge:0,over:0,dash:0,dashing:0,slide:0,slideCD:0,inv:0,swimming:false,forcedUnderwater:false,weapon:0,ammo:[50,10,6,12,1,6],cool:0,reload:0,up:{},speed:1,chargeMult:1,level:1,xp:0,xpNeed:30};if($('loadout').value==='runner')p.speed=1.12;if($('loadout').value==='tank')p.hp=p.max=125;if($('loadout').value==='conductor')p.chargeMult=1.3;if(difficulty==='easy'){p.speed*=1.18;p.hp=p.max=Math.max(p.max,125);p.hp=p.max}yaw=0;pitch=0;input.keys={};input.fire=false;input.firePressed=false;input.jump=false;input.dive=false;input.x=input.y=0;sniperZoom=3;sniperScope(false);transition=0;attackSerial=0;augmentRuntime={secondwind:false,hotSwapUntil:0,hotSwapReady:false,hotSwapCd:0,spotter:null,arcMark:null,precisionAt:0,overKills:0,overEchoUsed:false,parryUsed:false,ramUsed:false,airJumpReady:false};if(difficulty==='x')xLoadout();if(isRiftMode())omegaLoadout();}
function resetTutorialState(){
 weaponTraining.reset();tutorialActive=false;tutorialStage=-1;tutorialTarget=null;tutorialCardTime=0;tutorialMoveIndex=0;
 $('tutorial').hidden=true;$('tutorial').classList.remove('weapon-practice');document.body.classList.remove('weapon-practice');
 for(const id of ['tutorial-controls','tutorial-goal','tutorial-feedback','tutorial-practice-start','tutorial-finish'])$(id).hidden=true;
 $('tutorial-skip').textContent='チュートリアルをすべてスキップ';$('swap').disabled=false;
 tutorialMarker.visible=false;markerBeam.visible=true;
}
function showTutorialCard(){ $('tutorial').hidden=false;$('tutorial').classList.remove('compact');tutorialCardTime=2; }
function finishEasyTutorial(){
 if(difficulty!=='easy'||!tutorialActive)return;
 reset();recoil=0;state='playing';$('panel').hidden=true;
 nextWave(true);notify('チュートリアル完了！ / ここから本番',3);tutorialCue(true);lock();
}
const movementRoute=[
 {x:0,z:7,key:'W',direction:'前'},
 {x:-4,z:7,key:'A',direction:'左'},
 {x:-4,z:11,key:'S',direction:'後ろ'},
 {x:0,z:11,key:'D',direction:'右'},
];
function refreshMovementTutorial(){
 const step=movementRoute[tutorialMoveIndex];if(!step)return;
 $('tutorial-step').textContent=`移動練習 ${tutorialMoveIndex+1} / ${movementRoute.length}`;
 $('tutorial-title').textContent=`目印まで${step.direction}へ進もう！`;
 $('tutorial-copy').textContent=`${step.key}を押しながら、光る目印まで歩こう。視点操作はこの後で練習するよ。`;
 $('tutorial-feedback').hidden=false;
 $('tutorial-feedback').textContent=`ルート ${tutorialMoveIndex+1} / ${movementRoute.length}　次は ${step.key}：${step.direction}`;
}
function updateMovementTutorial(){
 const step=movementRoute[tutorialMoveIndex];if(!step||Math.hypot(p.x-step.x,p.z-step.z)>1.35)return;
 tutorialMoveIndex++;
 if(tutorialMoveIndex>=movementRoute.length){tutorialSet(1);return;}
 refreshMovementTutorial();tutorialMarkerSet(0);tutorialCue(false);
}
function tutorialSet(stage){
 if(difficulty!=='easy')return;
 const previous=tutorialStage;
 if(stage<0){finishEasyTutorial();return;}
 if(stage>=5){startWeaponPractice();return;}
 tutorialStage=stage;
 const steps=mobile?[
 ['まずは移動','左スティックを少し倒して進もう。'],['敵を狙って撃つ','中央の敵を見て、FIREを押そう。'],['青い玉を拾う','青い経験値オーブへ近づこう。'],['ジャンプ台へ','光る立体の板に乗って飛ぼう。'],['模擬戦闘','無敵・弾無限。敵を倒して操作確認！']
 ]:[
 ['移動してみよう','Wで前、Aで左、Sで後ろ、Dで右。それぞれ押して歩いてみよう。'],['敵を狙って撃つ','マウスで敵を狙い、左クリックで攻撃。'],['青い玉を拾う','青い経験値オーブへ近づこう。'],['ジャンプ台へ','光る立体の板に乗って飛ぼう。'],['模擬戦闘','無敵・弾無限。敵を倒して操作確認！']
 ];
 showTutorialCard();$('tutorial-practice-start').hidden=false;
 $('tutorial-step').textContent='かんたん / '+(stage+1)+' of '+steps.length;
 $('tutorial-title').textContent=steps[stage][0];$('tutorial-copy').textContent=steps[stage][1];$('tutorial-feedback').hidden=!(stage===0&&!mobile);if(stage===0&&!mobile)refreshMovementTutorial();
 if(stage===1||stage===4){tutorialTarget=spawn('chaser',0,stage===1?2:-7);tutorialTarget.tutorialDummy=true;tutorialTarget.r=stage===1?1.05:.9;tutorialTarget.hp=tutorialTarget.max=stage===1?16:24;}
 if(stage>previous)tutorialCue(false);tutorialMarkerSet(stage);
}
function startWeaponPractice(){
 if(difficulty!=='easy'||!['playing','paused'].includes(state)||!weaponTraining.start(difficulty))return false;
 tutorialActive=true;tutorialStage=5;prepareWeaponLesson();return true;
}
function prepareWeaponLesson(){
 ultimate.reset();seeker.clearFlight();phaseControl.reset();sniperScope(false);
 [enemies,bullets,hazards,pickups,fx].forEach(clearObjects);bossRef=null;spawnQueue=[];spawnTimer=9999;transition=0;
 input.fire=input.firePressed=false;input.keys={};input.jump=false;input.x=input.y=0;
 state='playing';$('panel').hidden=true;document.activeElement?.blur();
 Object.assign(p,{x:0,y:0,z:12,vy:0,grounded:true,hp:p.max,charge:0,over:0,exhaust:0,dashing:0,dash:0,slide:0,slideCD:0,reload:0,cool:0,weapon:weaponTraining.index,level:1,xp:0,xpNeed:30,up:{}});
 p.ammo=weapons.map((_,i)=>magSize(i));p.ammo[3]=PHASE.capacity;
 score=kills=0;pendingLevels=0;waveReward=false;easyCombo=0;easyComboTimer=0;$('killstreak').hidden=true;
 recoil=shotFlash=swapAnim=0;phaseWasActive=false;sniperZoom=3;
 camera.position.set(0,1.65,12);camera.lookAt(0,1.35,weaponTraining.lesson.targets[weaponTraining.index===2?2:0][2]);yaw=camera.rotation.y;pitch=camera.rotation.x;camera.fov=78;camera.updateProjectionMatrix();
 $('tutorial').classList.add('weapon-practice');document.body.classList.add('weapon-practice');
 for(const id of ['tutorial-controls','tutorial-goal','tutorial-feedback','tutorial-finish'])$(id).hidden=false;
 $('tutorial-practice-start').hidden=true;$('swap').disabled=true;
 const lesson=weaponTraining.lesson;
 $('tutorial-step').textContent=`武器の練習 ${weaponTraining.index+1} / 6 · 無敵`;
 $('tutorial-title').textContent=lesson.title;$('tutorial-copy').textContent=lesson.role;
 $('tutorial-controls').textContent=mobile?lesson.mobile:lesson.pc;
 $('tutorial-goal').textContent=lesson.goal;
 $('tutorial-skip').textContent=weaponTraining.index===5?'スキップ / 本番へ':'スキップ / 次の武器へ';
 $('tutorial-skip').setAttribute('aria-keyshortcuts','Enter');
 $('tutorial-finish').textContent='全部スキップ';
 $('wave').textContent=`PRACTICE / 0${weaponTraining.index+1} OF 06`;
 showTutorialCard();spawnPracticeTargets();updatePracticeFeedback();tutorialCue(false);
 // The card buttons are immediately clickable; Enter also works after mouse lock.
 document.exitPointerLock?.();
}
function spawnPracticeTargets(){
 for(const [type,x,z,hp] of weaponTraining.lesson.targets){
  const e=spawn(type,x,z);e.hp=e.max=hp;e.tutorialDummy=true;e.practiceTarget=true;e.practiceAnchor={x,z};
 }
 tutorialTarget=enemies.find(e=>e.practiceTarget&&e.hp>0)||null;tutorialMarkerSet(5);
}
function nextWeaponLesson(){
 if(!weaponPractice())return;
 if(weaponTraining.next())prepareWeaponLesson();else finishEasyTutorial();
}
function updatePracticeFeedback(){
 if(!weaponPractice())return;
 $('tutorial-feedback').textContent=`撃破 ${weaponTraining.eliminations} · 予備弾∞`+(mobile?' · スキップまで自由練習':' · Enterで次へ / Tabでボタン操作');
}
function updateWeaponPractice(dt){
 if(!weaponPractice())return;
 const alive=enemies.filter(e=>e.practiceTarget&&e.hp>0);
 if(weaponTraining.index===5)for(const e of alive)e.mesh.position.x=e.practiceAnchor.x+Math.sin(clock*1.3+e.practiceAnchor.x)*.6;
 if(weaponTraining.update(dt,alive.length))spawnPracticeTargets();
 tutorialTarget=enemies.find(e=>e.practiceTarget&&e.hp>0)||null;
 if(tutorialTarget){tutorialMarker.visible=true;tutorialMarker.position.set(tutorialTarget.mesh.position.x,.15,tutorialTarget.mesh.position.z);}else tutorialMarker.visible=false;
 if(p.weapon===3&&p.ammo[3]<=0&&!ultimate.active)p.ammo[3]=PHASE.capacity;
 updatePracticeFeedback();
}
function tutorialCue(finalCue){if(!$('sound').checked)return;sound(finalCue?660:760,.12,'sine',.04);window.setTimeout(()=>sound(finalCue?990:1040,.16,'sine',.035),95)}
const tutorialMarker=new T.Group();const markerBeam=new T.Mesh(new T.CylinderGeometry(.07,.16,4,8),new T.MeshBasicMaterial({color:0x77eaff,transparent:true,opacity:.58,depthWrite:false}));markerBeam.position.y=2;tutorialMarker.add(markerBeam);const markerRing=new T.Mesh(new T.TorusGeometry(.7,.09,6,20),new T.MeshBasicMaterial({color:0xa4f5ff,transparent:true,opacity:.9}));markerRing.rotation.x=Math.PI/2;tutorialMarker.add(markerRing);scene.add(tutorialMarker);tutorialMarker.visible=false;function tutorialMarkerSet(stage){if(weaponPractice()){tutorialMarker.visible=!!tutorialTarget;markerBeam.visible=false;if(tutorialTarget)tutorialMarker.position.set(tutorialTarget.mesh.position.x,.15,tutorialTarget.mesh.position.z);return;}markerBeam.visible=true;tutorialMarker.visible=tutorialActive&&((stage===0&&!mobile)||(stage>=1&&stage<=4));if(!tutorialMarker.visible)return;if(stage===0&&!mobile){const point=movementRoute[tutorialMoveIndex];if(point)tutorialMarker.position.set(point.x,.15,point.z)}else if(stage===1&&tutorialTarget)tutorialMarker.position.set(0,1,2);else if(stage===2&&tutorialTarget)tutorialMarker.position.set(0,.5,2);else if(stage===4&&tutorialTarget)tutorialMarker.position.set(0,1,-7);else{const pad=pads.reduce((best,pad)=>pad.position.distanceTo(camera.position)<best.position.distanceTo(camera.position)?pad:best,pads[0]);tutorialMarker.position.set(pad.position.x,.15,pad.position.z)}}
function startTutorial(){tutorialActive=true;tutorialStage=0;tutorialMoveOrigin={x:p.x,z:p.z};tutorialMoveIndex=0;tutorialTarget=null;tutorialXPStart=p.xp;tutorialPadHits=0;tutorialSet(0)}
$('tutorial-skip').addEventListener('click',()=>{if(weaponPractice())nextWeaponLesson();else if(tutorialActive)tutorialSet(-1)});
$('tutorial-practice-start').addEventListener('click',startWeaponPractice);
$('tutorial-finish').addEventListener('click',finishEasyTutorial);
function begin(){document.activeElement?.blur();difficulty=$('difficulty').value;if(difficulty==='normal'||difficulty==='easy')setTimeout(()=>prepareRushAssets().catch(()=>{}),0);if(difficulty==='titan'){state='titan';$('menu').hidden=true;$('panel').hidden=true;$('hud').hidden=true;const frame=$('titan-frame');frame.hidden=false;$('titan-back').hidden=false;if(frame.dataset.src){if(!frame.getAttribute('src'))frame.src=frame.dataset.src;}else if(!frame.srcdoc)frame.srcdoc=frame.dataset.srcdoc;return;}reset();document.body.classList.toggle('easy-mode',difficulty==='easy');document.body.classList.toggle('x-mode',difficulty==='x');document.body.classList.toggle('omega-mode',isRiftMode());document.body.classList.toggle('fracture-mode',difficulty==='fracture');if($('sound').checked){audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();}state='playing';$('menu').hidden=true;$('panel').hidden=true;$('hud').hidden=false;quality();hemi.intensity=difficulty==='easy'?3.35:2.4;sun.intensity=difficulty==='easy'?3:2.3;scene.fog.color.setHex(difficulty==='easy'?0x102536:0x081422);scene.fog.near=difficulty==='easy'?32:24;scene.fog.far=difficulty==='easy'?92:75;easyCover.visible=difficulty!=='easy';normalSpectacle.visible=difficulty!=='easy';floorMaterial.color.setHex(difficulty==='easy'?0x1d3a49:0x122632);floorMaterial.needsUpdate=true;quality();if(difficulty==='easy')startTutorial();else{nextWave();if(isRiftMode())openOmegaDraft('opening');}lock()}
function lock(){if(state!=='playing'||new URLSearchParams(location.search).has('test'))return;if(!mobile){try{const r=$('game').requestPointerLock();r?.catch(()=>{})}catch{}}}function quality(){let q=$('quality').value;renderer.setPixelRatio(q==='low'?1:Math.min(devicePixelRatio,q==='high'?2:q==='max'?3:mobile?1.3:1.7));resize()}
function nextWave(quiet=false){if(isRiftMode()){nextOmegaWave(quiet);return;}if(difficulty==='x'){nextXWave(quiet);return;}if(weaponPractice())return;seeker.clearFlight();clearObjects(bullets);clearObjects(hazards);wave++;waveShift.start(wave,difficulty==='normal');p.accelTime=0;p.floatCharge=1.8;p.liftId=null;input.jump=false;world.setWave(wave,difficulty==='easy');if(terrainStage()>1){const entry=world.entry();Object.assign(p,{x:entry.x,y:entry.y,z:entry.z,vy:0,grounded:true,swimming:false});yaw=entry.yaw??Math.atan2(entry.x,entry.z);pitch=0;}transition=0;const patterns=[['chaser','chaser','chaser','shooter','chaser'],['chaser','shooter','chaser','strafer','shooter','chaser'],['strafer','chaser','shooter','charger','chaser','strafer','shooter'],['charger','shooter','strafer','chaser','charger','shooter','strafer','chaser'],['charger','strafer','shooter','charger','strafer','shooter','chaser','charger','shooter'],['boss','shooter','strafer']];spawnQueue=difficulty==='easy'?(wave===1?['chaser']:patterns[wave-1].slice(0,wave===6?2:Math.ceil(patterns[wave-1].length*.7))):[...patterns[wave-1]];spawnTimer=.4;if(wave===6&&(difficulty==='normal'||difficulty==='easy')){spawnQueue=[];rush.start(difficulty==='easy');world.setBossArena?.(rush.current.id);world.setWave(6,false);if(bossAssetsReady)startRushRound();else waitRushAssets();return;}if(!quiet)notify(terrainStage()>1?world.rule():`SECTOR 0${wave} / 敵性反応を排除`,4);$('wave').textContent=difficulty==='easy'?`ウェーブ ${wave} / 6`:`SECTOR 0${wave} / 06`}
function spawn(type,x,z){if(difficulty==='x'&&wave===6&&type==='boss')return spawnXChronarch();let angle=random()*Math.PI*2;let ground=0;if(terrainStage()>1){const point=x===undefined?world.spawnPoint(type,angle,p.x,p.z):world.snapPoint(x,z);if(!point)return null;x=point.x;z=point.z;ground=point.y;}else if(x===undefined){x=Math.cos(angle)*25;z=Math.sin(angle)*25}let g=new T.Group();g.position.set(x,ground+1,z);scene.add(g);let colors={chaser:0xff796d,shooter:0xffc06a,strafer:0xb6a2ff,charger:0xf55382,boss:0xff704f},c=colors[type];let boss=type==='boss',r=boss?2.2:type==='charger'?.95:.7;let limbs=[];let core=orb(g,0,r*.55,r*.32,r*.45,c,1);
if(type==='chaser'){box(g,0,-.05,0,.6,.8,.8,0x344657);for(const side of [-1,1]){let leg=box(g,side*.48,-.35,0,.16,.8,.18,c,.15);leg.rotation.z=side*.4;limbs.push(leg);let blade=box(g,side*.7,0,.25,.12,.08,.9,0xff9b86,.5);blade.rotation.y=side*.35}box(g,0,.35,-.2,.3,.5,.25,0x263c49)}
else if(type==='shooter'){box(g,0,0,0,1,.9,.7,0x343d4b);box(g,0,.08,.75,.24,.24,1.15,c,.25);for(const side of [-1,1]){let foot=box(g,side*.5,-.65,0,.2,.5,.5,0x6d654c);limbs.push(foot)}box(g,0,.95,-.15,.08,.65,.08,c,.6)}
else if(type==='strafer'){box(g,0,0,0,.7,.35,.7,0x393456);for(const side of [-1,1]){let wing=box(g,side*.8,0,0,1,.12,.55,c,.3);wing.rotation.z=side*.18;limbs.push(wing);box(g,side*.95,-.16,0,.22,.2,.4,0x30364b);orb(g,side*.95,-.3,0,.14,0xc2a0ff,1)} }
else {box(g,0,0,0,r*1.65,r*1.1,r*1.2,0x3f3546);for(const side of [-1,1]){box(g,side*r*.85,.15,.3,r*.5,r*.9,r*.8,c,.2);let leg=box(g,side*r*.5,-r*.65,0,r*.4,r*.6,r*.65,0x435365);limbs.push(leg);box(g,side*r*.55,r*.55,.5,.18,r*.65,.2,c,.7)}}
if(boss){let crown=new T.Mesh(new T.TorusGeometry(2.7,.12,5,24),mat(c,1));crown.rotation.x=Math.PI/2;g.add(crown)}
applyEnemyReadability(g,type,core);let hp=boss?1700:type==='charger'?140:type==='chaser'?65:80;if(difficulty==='easy')hp*=.5;let e={mesh:g,core,limbs,type,r,hp,max:hp,t:random()*2,cd:1.5+random(),attack:0,dir:new T.Vector3(),flash:0,phase:0,exposed:0};enemies.push(e);if(boss)bossRef=e;if(difficulty==='x'&&type!=='boss'){xSpawnSerial++;if((xSpawnSerial-1)%4===0&&!enemies.some(other=>other!==e&&other.hp>0&&other.xBounty))markXBounty(e);}return e}
function blocked(x,z,y=0,r=.4){return solids.some(s=>s.enabled!==false&&!(difficulty==='easy'&&s.removeInEasy)&&y<s.top-.15&&Math.abs(x-s.x)<s.w+r&&Math.abs(z-s.z)<s.d+r)}
function move(e,dx,dz,r=.4){
 const player=e===p;
 // The Leviathan arena is an above-water dock. Its deck tiles and pillars
 // must not block swimming below the sea surface (or in open water).
 const underwater=player&&e.swimming&&world.radar().bossArena==='leviathan';
 const can=(x,z)=>{if(underwater)return true;if(blocked(x,z,e.y,r))return false;if(terrainStage()<=1)return true;const h=world.heightAt(x,z);return player?(h===null||h<=e.y+.66):world.canStep(x,z,e.y);};
 const bounds=terrainStage()>1?world.bounds():{x:30.8,z:30.8};
 const nx=clamp(e.x+dx,-bounds.x,bounds.x),nz=clamp(e.z+dz,-bounds.z,bounds.z);if(can(nx,e.z))e.x=nx;if(can(e.x,nz))e.z=nz;
 if(player&&p.grounded&&terrainStage()>1){const h=world.heightAt(p.x,p.z);if(h!==null&&h>p.y&&h<=p.y+.66)p.y=h;}
}

function beam(a,b,color,width=.025,life=.1){if(fx.length>220)return;const delta=b.clone().sub(a),len=delta.length();let m=new T.Mesh(boxGeo,mat(color,1));m.position.copy(a).add(b).multiplyScalar(.5);m.scale.set(width,width,len);m.lookAt(b);scene.add(m);fx.push({mesh:m,life,max:life})}function burst(pos,color,n=7){for(let i=0;i<n;i++){if(fx.length>150)break;let m=new T.Mesh(sphereGeo,mat(color,1));m.position.copy(pos);m.scale.setScalar(.06+random()*.09);scene.add(m);fx.push({mesh:m,life:.25+random()*.3,max:.6,vel:new T.Vector3((random()-.5)*7,random()*5,(random()-.5)*7)})}}
function beginLeviathanDive(e){
 if(!e||e.diveStarted||e.hp<=0||e.hp>e.max*.5||e.rushId!=='leviathan'||!p)return false;
 e.diveStarted=true;e.bossAction=null;e.exposed=0;e.cd=Math.max(e.cd||0,1.4);
 const waterline=world.radar().seaLevel??.12;
 leviathanDive={boss:e,elapsed:0,duration:1.75,startX:p.x,startY:p.y,startZ:p.z,startYaw:yaw,startPitch:pitch,waterline};
 p.forcedUnderwater=true;p.swimming=true;p.grounded=false;p.vy=0;p.slide=0;p.dashing=0;p.inv=Math.max(p.inv,2.25);
 phaseControl.reset();ultimate.reset();sniperScope(false);seeker.clearLocks();input.fire=input.firePressed=false;
 // Keep held movement controls. The cinematic gates movement below, rather
 // than clearing the touch-stick state and leaving a held stick at zero.
 clearObjects(bullets);clearObjects(hazards);
 burst(new T.Vector3(p.x,waterline,p.z),0x9cefff,24);
 notify('潜航 / 水中戦へ',2.2);sound(82,.55,'sawtooth',.055);
 return true;
}
function damage(e,n,chain=true,meta=null){
 if(e.hp<=0)return;
 if(e.omegaObjective){e.hp-=n;e.flash=.12;hitTime=.12;if(e.hp<=0){e.raidVisual.done=true;e.raidVisual.root.visible=false;scene.remove(e.mesh);burst(e.mesh.position,0x8affdf,10);omegaRaidReward(omegaRaid.advanceProgress());sound(840,.15,'triangle',.045);}return;}
 if(difficulty==='x'){n*=1.15*(xDirector.breaking?1.4:1)*(xDirector.owns('airborne')&&!p.grounded?1.6:1)*(xSwapBuff>0?1.35:1);}
 if(rush.active&&rush.phase==='fight'){n*=rush.multiplier({distance:Math.hypot(p.x-e.mesh.position.x,p.z-e.mesh.position.z),air:!p.grounded,slide:p.slide>0,health:p.hp/p.max});if(e.rushId==='bulwark'&&e.exposed<=0){const angle=Math.atan2(p.x-e.mesh.position.x,p.z-e.mesh.position.z);if(Math.cos(angle-e.mesh.rotation.y)>.4)n*=.35;}}
 const direct=!!meta?.direct, attackId=meta?.attackId??-1;
 if(direct&&p.up.hotswap&&augmentRuntime.hotSwapReady&&clock<=augmentRuntime.hotSwapUntil){n+=Math.min(n*.3,20);augmentRuntime.hotSwapReady=false;augmentRuntime.hotSwapCd=2;burst(e.mesh.position,0xffd28a,5);}
 if(direct&&p.up.spotter&&augmentRuntime.spotter?.enemy===e&&clock<augmentRuntime.spotter.until&&attackId!==augmentRuntime.spotter.attackId){n+=Math.min(n*.25,20);augmentRuntime.spotter=null;burst(e.mesh.position,0x8cecff,5);}
 n*=stageGimmicks.damageMultiplier(e);if(e.xChronarch){const result=xChronarch.damageCore(n);n=result.applied;if(!n){e.shieldFlash=.15;return;}if(result.nextPhase){e.exposed=0;clearObjects(bullets);clearObjects(hazards);xEffects.burst(e.mesh.position,{kind:'break'});notify('CHRONARCH / 次の封印を破壊せよ',1.5);}}e.hp=e.xChronarch?xChronarch.hp:e.hp-n;if(n>=35&&e.type!=='boss')e.stun=.1;e.flash=.09;hitTime=.12;
 if(e.rushId==='leviathan'&&e.hp>0&&e.hp<=e.max*.5)beginLeviathanDive(e);
 if(direct&&p.up.spotter&&meta.distance>=20)augmentRuntime.spotter={enemy:e,until:clock+4,attackId};
 if(direct&&p.up.chain){const mark=augmentRuntime.arcMark;if(mark&&mark.enemy!==e&&mark.attackId!==attackId&&clock<mark.until&&mark.enemy.hp>0){const a=mark.enemy.mesh.position.clone(),b=e.mesh.position.clone(),delta=b.clone().sub(a),distance=delta.length();if(distance<=18&&seekerWallDistance(a,delta.normalize(),distance)>=distance-.12){beam(a,b,0x9feaff,.045,.22);burst(a,0xa6f4ff,5);burst(b,0xa6f4ff,5);damage(mark.enemy,15,false);damage(e,15,false);augmentRuntime.arcMark=null;}else augmentRuntime.arcMark={enemy:e,until:clock+3,attackId};}else if(!mark||clock>=mark.until||mark.enemy.hp<=0)augmentRuntime.arcMark={enemy:e,until:clock+3,attackId};}
 if(e.hp>0)return;
 if(difficulty==='x'){if(e.xRewarded)return;e.xRewarded=true;onXKill(e,meta);}
 if(weaponPractice()){weaponTraining.eliminations++;burst(e.mesh.position,0x81e8ff,7);scene.remove(e.mesh);sound(180,.1,'triangle',.03);updatePracticeFeedback();return;}
 if(isRiftMode()&&e.omegaHunt===omegaRaid.round){const target=raidHuntTargets.find(t=>t.enemy===e);if(target)target.visual.done=true;omegaRaidReward(omegaRaid.advanceProgress());}
 kills++;score+=e.type==='boss'?2500:100+Math.round(p.charge);if(difficulty==='easy'){easyCombo++;easyComboTimer=1.1;$('killstreak').textContent=easyCombo>1?`ELIMINATION × ${easyCombo}`:'ELIMINATION';$('killstreak').hidden=false;}
 if(p.up.airjump&&!p.grounded)augmentRuntime.airJumpReady=true;
 if(direct&&meta.head&&p.up.precision&&clock>=augmentRuntime.precisionAt){augmentRuntime.precisionAt=clock+1.5;if(p.dash>0)p.dash=Math.max(0,p.dash-1.2);else p.charge=clamp(p.charge+10,0,100);notify('PRECISION ECHO / 位相回復',1.1);}
 if(p.over>0&&p.up.overecho&&!augmentRuntime.overEchoUsed&&++augmentRuntime.overKills>=3){p.over+=1;augmentRuntime.overEchoUsed=true;notify('OVERDRIVE ECHO / +1.0 SEC',1.2);}
 if(augmentRuntime.arcMark?.enemy===e)augmentRuntime.arcMark=null;
 burst(e.mesh.position,0xffb077,12);scene.remove(e.mesh);e.bossVisual?.dispose();if(!ultimate.active)sound(110,.14,'triangle',.06);if(p.up.momentum&&p.over<=0)p.charge=clamp(p.charge+8*p.up.momentum,0,100);if(p.up.leech)p.hp=Math.min(p.max,p.hp+4*p.up.leech);if(p.up.feed&&p.weapon<3)p.ammo[p.weapon]=Math.min(magSize(p.weapon),p.ammo[p.weapon]+Math.ceil(magSize(p.weapon)*.2));let m=orb(scene,e.mesh.position.x,(terrainStage()>1?(world.heightAt(e.mesh.position.x,e.mesh.position.z)??0):0)+.5,e.mesh.position.z,.27,0x4eaaff,1.5);pickups.push({mesh:m,life:Infinity,xp:e.xSeal?6:e.type==='boss'?60:e.type==='charger'?18:12});if(p.up.blast&&chain){for(const other of enemies)if(other!==e&&other.hp>0&&other.mesh.position.distanceTo(e.mesh.position)<4.5){beam(e.mesh.position,other.mesh.position,0xffb077,.08,.2);damage(other,32*p.up.blast,false)}}
 if(isRiftMode()&&e.type==='boss'&&omegaRaid.bossReady)finishOmega(true);
}
function hurt(n){if(ultimate.active||p.inv>0||state!=='playing'||tutorialActive)return;const hit=n*(rush.active?rush.penalty.damage:1)*(difficulty==='easy'?.4:isRiftMode()?1.05:1);if(difficulty==='x'){const actual=Math.max(0,Math.min(p.hp,hit));xDirector.hit(actual);if(xDirector.expired){xFailure='REACTOR EMPTY';finish(false);return;}}if(p.hp-hit<=0&&p.up.secondwind&&!augmentRuntime.secondwind){augmentRuntime.secondwind=true;p.hp=20;p.dash=0;p.charge=Math.max(p.charge,50);p.inv=difficulty==='easy'?.65:.4;hurtTime=.3;notify('SECOND WIND / 緊急再起動',2.5);burst(new T.Vector3(p.x,p.y+1,p.z),0x83f5ed,18);sound(760,.3,'triangle',.07);return;}p.hp-=hit;p.inv=difficulty==='easy'?.65:.4;hurtTime=.3;sound(65,.18,'sawtooth',.06);if(p.hp<=0){p.hp=0;finish(false)}}
function reload(){if(ultimate.active)return;if(state==='playing'&&phaseActive()){phaseControl.active=true;phaseControl.chargeOnce();return;}if(state!=='playing'||p.reload>0||p.ammo[p.weapon]===magSize(p.weapon))return;p.reload=reloadDuration();sound(230,.1,'square',.015)}function swap(i){if(isRiftMode())return;if(weaponPractice()||ultimate.active||state!=='playing')return;phaseControl.reset();input.fire=false;input.firePressed=false;sniperScope(false);seeker.clearLocks();const previousWeapon=p.weapon;p.weapon=((i%weapons.length)+weapons.length)%weapons.length;if(difficulty==='x'&&previousWeapon!==p.weapon&&xDirector.owns('hotswap')&&xSwapCd<=0){const max=magSize(p.weapon);p.ammo[p.weapon]=Math.min(max,p.ammo[p.weapon]+Math.ceil(max*.4));xSwapCd=2.5;xSwapBuff=2;xEffects.burst(new T.Vector3(p.x,p.y,p.z),{kind:'refund'});}if(previousWeapon!==p.weapon&&p.up.hotswap&&clock>=augmentRuntime.hotSwapCd){augmentRuntime.hotSwapReady=true;augmentRuntime.hotSwapUntil=clock+1.5;}swapAnim=.25;p.reload=0;p.cool=.15;sound(600,.05,'triangle',.02)}
const casingTemplates=[0,1,2].map(type=>{const g=new T.Group(),brass=mat(0xcda35a),bodyMat=mat(type===1?0x943d32:type===2?0x8599ab:0xcda35a),r=type===1?.035:.024,len=type===1?.14:.105;
const add=(geo,m,y)=>{const o=new T.Mesh(geo,m);o.position.y=y;g.add(o);return o};
add(new T.CylinderGeometry(r,r,len,12,1,true),bodyMat,0);add(new T.CylinderGeometry(r*1.1,r*1.1,.025,12),brass,-len/2);add(new T.TorusGeometry(r,.004,4,12),brass,-len/2).rotation.x=Math.PI/2;
const mouth=add(new T.CircleGeometry(r*.86,12),mat(0x211b19),len/2+.001);mouth.rotation.x=-Math.PI/2;
const primer=add(new T.CircleGeometry(.009,10),mat(0x69563b),-len/2-.013);primer.rotation.x=Math.PI/2;return g});
function ejectCasing(){if(fx.length>210)return;const shell=casingTemplates[p.weapon].clone();gun.updateWorldMatrix(true,true);shell.position.copy(armory.ports[p.weapon].getWorldPosition(new T.Vector3()));shell.quaternion.copy(gun.getWorldQuaternion(new T.Quaternion()));shell.rotateZ(.9);scene.add(shell);fx.push({mesh:shell,life:1.05,max:1.05,casing:true,vel:new T.Vector3(1.5+random()*.6,1.2,.6).applyQuaternion(camera.quaternion),spin:10+random()*8});}
function railDischarge(from,to){beam(from,to,0x83adff,.075,.14);beam(from,to,0xe5faff,.018,.23);const dir=to.clone().sub(from).normalize(),length=from.distanceTo(to);for(let i=1;i<=3;i++){const at=from.clone().addScaledVector(dir,Math.min(length*.7,i*1.1));const m=new T.Mesh(railRippleGeo,railRippleMat);m.position.copy(at);m.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),dir);scene.add(m);fx.push({mesh:m,life:.16,max:.16,ripple:true})}burst(to,0xa3cfff,5)}
const railRippleGeo=new T.TorusGeometry(.13,.008,4,20),railRippleMat=new T.MeshBasicMaterial({color:0x85bbff,transparent:true,opacity:.65,depthWrite:false});
function poseGun(){const phase=phaseActive();gun.position.set(.32+Math.sin(clock*9)*.008,-.28-recoil+(!phase&&p.reload>0?.08:0),-.55+recoil);gun.rotation.z=!phase&&p.reload>0?-.18:recoil*.2;gun.rotation.x=-recoil*.8;gun.position.y-=swapAnim;gun.scale.setScalar(.9);gun.updateWorldMatrix(true,true)}
function arsenalDischarge(index,from,to,options){(index<3?heavyEvolution:specialEvolution).discharge(index,from,to,{...options,low:mobile||$('quality').value==='low',reduced:reducedMotion});}
function resetArsenal(clearModels=true){heavyEvolution.reset();specialEvolution.reset();arsenalCombat.reset();if(clearModels)for(let i=1;i<6;i++)(i<3?heavyEvolution:specialEvolution).configure(i,arsenalBuild(i));}
function arsenalKnockback(e,from,force){
 if(e.omegaObjective||e.type==='boss'||e.xSeal||e.hp<=0)return;force*=1+.4*(p.up.breach||0);const start=e.mesh.position.clone(),push=e.mesh.position.clone().sub(from).setY(0).normalize(),ground=terrainStage()>1?world.heightAt(e.mesh.position.x,e.mesh.position.z)??0:0,obj={x:e.mesh.position.x,z:e.mesh.position.z,y:ground};
 for(let i=0;i<12;i++)move(obj,push.x*force/12,push.z*force/12,e.r*.6);e.mesh.position.x=obj.x;e.mesh.position.z=obj.z;if(p.up.breach&&e.mesh.position.distanceTo(start)<force*.45){damage(e,25*p.up.breach,false);burst(e.mesh.position,0xffca85,3);}e.stun=Math.max(e.stun||0,.55);if(e.type==='charger'){e.attack=0;e.cd=Math.max(e.cd,1);}
}
function installArsenalCard(id){
 if(!p||!canInstallArsenal(p.up,id))return false;const index=arsenalCardWeapon(id);p.up[id]=1;const b=arsenalBuild(index,p.up);p.ammo[index]=b.mag;(index<3?heavyEvolution:specialEvolution).configure(index,b);
 if(p.weapon===index){p.reload=p.cool=0;swapAnim=.3;phaseControl.cancelHold();}notify(`${weapons[index].name.split(' / ')[0]} / ${b.label} — ${b.tier===3?'最終進化':'進化完了'}`,3.2);sound(b.tier===3?980:680,.22,'triangle',.05);return true;
}
function shootEvolvedArsenal(){
 const attackId=++attackSerial;
 if(state!=='playing'||p.cool>0||p.reload>0)return;if(p.ammo[p.weapon]<=0){reload();return;}
 const b=arsenalBuild(p.weapon,p.up),w=weapons[p.weapon];if(!tutorialActive||weaponPractice())p.ammo[p.weapon]--;p.cool=b.rate*(p.over>0?.65:1);recoil=p.weapon===4?.32:p.weapon===1?.22:.18;shotFlash=.14;poseGun();
 if(p.weapon===4)phantomLance.fire();else ejectCasing();sound(p.weapon===1?85:p.weapon===2?145:920,.18,'triangle',.05);
 const origin=camera.position.clone(),direction=new T.Vector3(0,0,-1).applyQuaternion(camera.quaternion),muzzlePoint=(p.weapon===4?phantomLance.muzzle:armory.muzzles[p.weapon]).getWorldPosition(new T.Vector3());
 if(p.weapon!==4&&((difficulty==='easy'&&!mobile)||(mobile&&$('assist').checked))){let best=mobile?.955:.42,target=null;for(const e of enemies){if(e.hp<=0)continue;const point=e.bossVisual?enemyAimPoint(e,new T.Vector3()):e.mesh.position.clone();if(!mobile&&!e.bossVisual)point.y+=e.r*.45;const d=point.sub(origin),len=d.length();d.normalize();const dot=d.dot(direction);if(dot>best&&seekerWallDistance(origin,d,len)>=len-e.r){best=dot;target=d;}}if(target)direction.lerp(target,mobile?.55:.72).normalize();}
 const offset=muzzlePoint.clone().sub(origin),len=offset.length(),cover=seekerWallDistance(origin,offset.normalize(),len);if(Number.isFinite(cover))muzzlePoint.copy(origin).addScaledVector(offset,Math.max(.02,cover-.03));
 const priorHP=new Map(enemies.map(e=>[e,e.hp]));
 arsenalCoverTraces.length=0;arsenalCombat.fire({weapon:p.weapon,build:b,origin,direction,muzzle:muzzlePoint,random,multiplier:(e,head)=>{
  let m=(p.over>0?1.35:1)*((terrainStage()>1?!p.grounded:p.y>.5)&&p.up.air?1+.4*p.up.air:1)*(p.slide>0&&p.up.slide?1+.45*p.up.slide:1);
  if(head)m*=(p.weapon===4?w.headMultiplier:1.6)+.6*(p.up.focus||0);if(head&&p.weapon===4)m*=b.weakpointMultiplier;if(e.type==='boss')m*=e.exposed>0?1.8:.55;if(p.up.execution&&e.hp<e.max*.35)m*=1+.3*p.up.execution;return m;
 }});
 for(const trace of arsenalCoverTraces)damageOmegaCover(trace.origin,trace.direction,trace.damage,trace.range);arsenalCoverTraces.length=0;
 const struck=enemies.filter(e=>e.hp<(priorHP.get(e)??e.hp)).sort((a,b)=>a.mesh.position.distanceToSquared(origin)-b.mesh.position.distanceToSquared(origin)),excluded=new Set(struck);
 const nearest=(from,range)=>enemies.filter(e=>e.hp>0&&!excluded.has(e)&&e.mesh.position.distanceTo(from)<range).sort((a,b)=>a.mesh.position.distanceToSquared(from)-b.mesh.position.distanceToSquared(from)).find(e=>{const d=e.mesh.position.clone().sub(from),length=d.length();return seekerWallDistance(from,d.normalize(),length)>=length-.12;});
 if(p.up.chain&&struck.length){const first=struck[0],target=nearest(first.mesh.position,6);if(target){beam(first.mesh.position,target.mesh.position,0x91cdff,.035,.14);damage(target,(10+p.charge*.15)*p.up.chain*(p.weapon===2?1.4:1),false);excluded.add(target);}}
 if(p.weapon===2&&p.up.fork){let count=0;for(const dead of struck.filter(e=>e.hp<=0))for(let i=0;i<2&&count<2;i++){const target=nearest(dead.mesh.position,14);if(!target)break;excluded.add(target);count++;beam(dead.mesh.position,target.mesh.position,0x9cbdff,.04,.2);damage(target,28*p.up.fork,false);}}
}
function installPulseCard(id){
 if(!p||!canInstallPulse(p.up,id))return false;
 p.up[id]=1;const b=pulseBuild(p.up);pulseResonance.sync(b);p.ammo[0]=b.mag;
 if(p.weapon===0){p.reload=0;p.cool=0;swapAnim=.30;}
 pulseModel.configure(b);notify(b.tier===3?`PULSE / ${b.label} — 最終進化`:`PULSE / ${b.label} — 進化完了`,3.5);
 sound(b.tier===3?960:660,.24,'triangle',.055);return true;
}
function updatePulsePresentation(dt,reloadPhase){
 const b=pulseBuild(p.up),charge=pulseResonance.progress(b),active=p.weapon===0;
 pulseModel.update(dt,{build:b,charge,flash:active?Math.max(shotFlash*10,pulseResonance.flash):0,time:clock,reload:active?reloadPhase:0,kick:active?recoil:0,active,reduced:reducedMotion});
 $('pulse-hud').hidden=!active||!b.tier;$('pulse-hud').dataset.path=b.path||'core';
 if(!active||!b.tier)return;
 $('pulse-form').textContent=difficulty==='easy'?`${b.tier===3?'完成':b.tier===2?'進化':'強化'} / ${b.path==='arc'?'連鎖':b.path==='lance'?'貫通':'連射ライフル'}`:`${b.label.split(' / ')[0]} / ${'I'.repeat(b.tier)}`;
 $('pulse-meter').style.width=(b.path==='lance'?charge*100:100)+'%';
 $('pulse-rule').textContent=b.path==='lance'?(charge>=1?'次弾：貫通砲 READY':`${pulseResonance.hits} / ${b.hitsNeeded} 命中 → 貫通砲`):b.path==='arc'?(b.tier===3?'毎命中3体 / 撃破連鎖5体':'命中連鎖 / 撃破連鎖3体'):'次のカードで連鎖型 / 貫通型へ';
 $('pulse-hud').classList.toggle('ready',b.path==='lance'&&charge>=1);
}
function evolvedPulseMultiplier(e,head=false){
 let m=(p.over>0?1.35:1)*((terrainStage()>1?!p.grounded:p.y>.5)&&p.up.air?1+.4*p.up.air:1)*(p.slide>0&&p.up.slide?1+.45*p.up.slide:1);
 if(head)m*=1.6+.6*(p.up.focus||0);
 if(e.type==='boss')m*=e.exposed>0?1.8:.55;
 if(p.up.execution&&e.hp<e.max*.35)m*=1+.3*p.up.execution;
 return m;
}
function chainPulse(source,raw,b){
 if(b.path!=='arc')return;
 const kill=source.hp<=0,max=kill?(b.tier===3?5:3):(b.tier===3?3:1),range=b.tier===3?12:9;
 const thunder=kill&&pulseEffects.thunder(source.mesh.position,{apex:b.tier===3,low:mobile||$('quality').value==='low',reduced:reducedMotion,ground:terrainStage()>1?(world.heightAt(source.mesh.position.x,source.mesh.position.z)??0):0});
 const factor=kill?(b.tier===3?1.4:1):(b.tier===3?.85:.65),visited=new Set([source]);let previous=source;
 for(let hop=0;hop<max;hop++){
  const from=previous.mesh.position.clone();
  const candidates=enemies.filter(e=>e.hp>0&&!visited.has(e)&&e.mesh.position.distanceTo(from)<=range).sort((a,c)=>a.mesh.position.distanceToSquared(from)-c.mesh.position.distanceToSquared(from));
  const target=candidates.find(e=>{const delta=e.mesh.position.clone().sub(from),length=delta.length();return seekerWallDistance(from,delta.normalize(),length)>=length-.12;});
  if(!target)break;visited.add(target);
  pulseEffects.arc(from,target.mesh.position,{apex:b.tier===3,kill,low:mobile||$('quality').value==='low',delay:thunder&&!reducedMotion?.065+hop*.018:0});
  damage(target,raw*factor*evolvedPulseMultiplier(target),false);pulseResonance.arcs++;previous=target;
 }
}
function shootEvolvedPulse(){
 const attackId=++attackSerial;
 if(state!=='playing'||p.cool>0||p.reload>0)return;
 if(p.ammo[0]<=0){reload();return;}
 const b=pulseBuild(p.up),charged=pulseResonance.fire(b);pulseModel.configure(b);
 if(!tutorialActive||weaponPractice())p.ammo[0]--;
 p.cool=b.rate*(p.over>0?.65:1);recoil=charged?.14:b.tier===3?.075:.06;shotFlash=charged?.17:.07;
 sound(charged?120:b.path==='arc'?330:250,charged?.22:.065,charged?'triangle':'sawtooth',charged?.06:.035);
 poseGun();ejectCasing();muzzle.position.copy(armory.muzzles[0].position);muzzle.visible=true;flashMaterial.color.setHex(b.color);muzzle.rotation.z=random()*Math.PI;
 const origin=camera.position.clone(),base=new T.Vector3(0,0,-1).applyQuaternion(camera.quaternion);
 if((difficulty==='easy'&&!mobile)||(mobile&&$('assist').checked)){
  let best=difficulty==='easy'&&!mobile?.42:.955,target=null;
  for(const e of enemies){if(e.hp<=0)continue;const point=e.bossVisual?enemyAimPoint(e,new T.Vector3()):e.mesh.position.clone();if(!mobile&&!e.bossVisual)point.y+=e.r*.45;const delta=point.sub(origin),length=delta.length(),d=delta.normalize(),dot=d.dot(base);
   if(dot>best&&seekerWallDistance(origin,d,length)>=length-e.r){best=dot;target=d;}
  }
  if(target)base.lerp(target,!mobile?.72:.55).normalize();
 }
 const dir=base.clone();if(!charged)dir.add(new T.Vector3((random()-.5)*.006,(random()-.5)*.006,(random()-.5)*.006)).normalize();
 const shotOrigin=armory.muzzles[0].getWorldPosition(new T.Vector3()),offset=shotOrigin.clone().sub(origin),offsetLength=offset.length(),nearCover=seekerWallDistance(origin,offset.normalize(),offsetLength);
 if(Number.isFinite(nearCover))shotOrigin.copy(origin).addScaledVector(offset,Math.max(.02,nearCover-.03));
 ray.set(origin,dir);const blockers=ray.intersectObjects(arena.children,false);stageGimmicks.handleRayHits(blockers,enemies,bossRef);const limit=Math.min(blockers[0]?.distance??seekerWallDistance(origin,dir,75),pulseBand().peakEnd+b.tail),hits=[];
 for(const e of enemies){if(e.hp<=0)continue;const hit=traceEnemyRay(e,origin,dir,limit,{padding:charged?(b.tier===3?.35:.15):0});if(hit)hits.push({e,along:hit.distance,head:hit.head,point:hit.point});}
 hits.sort((a,c)=>a.along-c.along);if(!charged)hits.splice(1);
 const end=origin.clone().addScaledVector(dir,charged?limit:hits.length?hits[0].along:limit);
 pulseEffects.discharge(shotOrigin,end,{path:b.path,apex:b.tier===3,charged,low:mobile||$('quality').value==='low',reduced:reducedMotion});
 if(charged){burst(end,0xffd4a1,mobile?4:9);sound(65,.17,'triangle',.04);}
 let registered=false;
 for(const h of hits){
  // The cannon retains full peak damage along its trace. It stops at architecture.
  const raw=(charged?7*b.power*(difficulty==='easy'?16/7:1)*(b.tier===3?8:5):pulseDamageAt(h.along));
  if(raw<=0)continue;damage(h.e,raw*evolvedPulseMultiplier(h.e,h.head),true,{direct:true,head:h.head,attackId,distance:h.along,weapon:0});
  burst(h.e.mesh.position,b.color,charged?5:2);
  if(!charged&&!registered){pulseResonance.hit(b);registered=true;}
  chainPulse(h.e,raw,b);
  if(false&&p.up.chain){const target=enemies.find(e=>e!==h.e&&e.hp>0&&e.mesh.position.distanceTo(h.e.mesh.position)<6&&seekerWallDistance(h.e.mesh.position,e.mesh.position.clone().sub(h.e.mesh.position).normalize(),e.mesh.position.distanceTo(h.e.mesh.position))>=e.mesh.position.distanceTo(h.e.mesh.position)-.12);
   if(target){beam(h.e.mesh.position,target.mesh.position,0x91cdff,.035,.14);damage(target,(10+p.charge*.15)*p.up.chain*(difficulty==='easy'?1:.35),false);}
  }
 }
 if(charged||!hits.length)damageOmegaCover(origin,dir,charged?7*b.power*(b.tier===3?8:5):18,limit+.08);
}

function shoot(){if(isRiftMode()&&p.weapon===6){shootOmega();return;}if(ultimate.active||phaseActive()||p.exhaust>0)return;if(p.weapon===0&&pulseBuild(p.up).tier){shootEvolvedPulse();return;}if(p.weapon===5){shootSeeker();return;}if([1,2,4].includes(p.weapon)&&arsenalBuild(p.weapon,p.up).tier){shootEvolvedArsenal();return;}if(p.cool>0||p.reload>0)return;let w=weapons[p.weapon];if(p.ammo[p.weapon]<=0){reload();return}if(!tutorialActive||weaponPractice())p.ammo[p.weapon]--;p.cool=w.rate*(p.over>0?.65:1);recoil=p.weapon===4?.38:p.weapon===0?.06:p.weapon===1?.2:.16;sound(p.weapon===4?920:p.weapon===2?170:p.weapon===1?80:260,p.weapon===4?.22:p.weapon===0?.07:.18,p.weapon===4?'triangle':'sawtooth',p.weapon===4?.08:.04);shotFlash=p.weapon===4?.16:p.weapon===1?.12:p.weapon===2?.16:.055;poseGun();if(p.weapon===4)phantomLance.fire();else{muzzle.position.copy(armory.muzzles[p.weapon].position);gun.updateWorldMatrix(true,true);muzzle.visible=true;flashMaterial.color.setHex(w.color);muzzle.rotation.z=random()*Math.PI;muzzle.scale.set(p.weapon===1?2.2:p.weapon===2?1.25:1,1,1);ejectCasing();}
let origin=camera.position.clone(),base=new T.Vector3(0,0,-1).applyQuaternion(camera.quaternion);if(difficulty==='easy'&&!mobile&&p.weapon!==4){let best=.42,target=null;for(const e of enemies){if(e.hp<=0)continue;let direction=e.mesh.position.clone().add(new T.Vector3(0,e.r*.45,0)).sub(origin).normalize(),dot=direction.dot(base);if(dot>best){ray.set(origin,direction);const obstacle=ray.intersectObjects(arena.children,false)[0];if(!obstacle||obstacle.distance>origin.distanceTo(e.mesh.position)-e.r){best=dot;target=direction}}}if(target)base.lerp(target,.72).normalize()}
if(mobile&&$('assist').checked&&p.weapon!==4){let best=.955,target=null;for(const e of enemies){if(e.hp<=0)continue;let d=(e.bossVisual?enemyAimPoint(e,new T.Vector3()):e.mesh.position.clone()).sub(origin).normalize(),dot=d.dot(base);if(dot>best){ray.set(origin,d);const oc=ray.intersectObjects(arena.children,false)[0];if(!oc||oc.distance>origin.distanceTo(e.mesh.position)-e.r){best=dot;target=d}}}if(target)base.lerp(target,.55).normalize()}
const shotOrigin=(p.weapon===4?phantomLance.muzzle:armory.muzzles[p.weapon]).getWorldPosition(new T.Vector3()),attackId=++attackSerial;const shotgunHits=new Map(),directTargets=new Set();let forkCount=0,chainUsed=false;const pelletRight=new T.Vector3(1,0,0).applyQuaternion(camera.quaternion),pelletUp=new T.Vector3(0,1,0).applyQuaternion(camera.quaternion),pelletPhase=random()*Math.PI*2;for(let i=0;i<w.pellets;i++){let spread=difficulty==='easy'&&p.weapon===1?w.easySpread:w.spread;if(p.weapon===1&&p.up.pointblank&&enemies.some(e=>e.hp>0&&e.mesh.position.distanceTo(origin)<=6&&e.mesh.position.clone().sub(origin).normalize().dot(base)>.94))spread*=.75;if(p.weapon===4&&sniperAim)spread=0;let dir;if(p.weapon===1){const ringIndex=i===0?0:i-1,ringCount=Math.max(1,w.pellets-1),radius=i===0?0:spread*.5*Math.sqrt(ringIndex/ringCount),angle=pelletPhase+ringIndex*2.399963229728653;dir=base.clone().addScaledVector(pelletRight,Math.cos(angle)*radius).addScaledVector(pelletUp,Math.sin(angle)*radius).normalize()}else dir=base.clone().add(new T.Vector3((random()-.5)*spread,(random()-.5)*spread,(random()-.5)*spread)).normalize();ray.set(origin,dir);let walls=ray.intersectObjects(arena.children,false);stageGimmicks.handleRayHits(walls,enemies,bossRef);let limit=Math.min(walls[0]?.distance||75,p.weapon===0?pulseBand().peakEnd+12:75);let hits=[];for(const e of enemies){if(e.hp<=0)continue;const hit=traceEnemyRay(e,origin,dir,limit);if(hit)hits.push({e,along:hit.distance,head:hit.head,point:hit.point})}hits.sort((a,b)=>a.along-b.along);if(p.weapon!==2)hits=hits.slice(0,1);if(p.weapon===2||!hits.length)damageOmegaCover(origin,dir,w.damage*(p.weapon===0?1.4:1),limit+.08);for(const h of hits)directTargets.add(h.e);let end=origin.clone().addScaledVector(dir,hits.length?hits[hits.length-1].along:Math.min(limit,65));if(p.weapon===2)railDischarge(shotOrigin,end);else beam(shotOrigin,end,w.color,p.weapon===4?.07:p.weapon===1?.022:.018,p.weapon===4?.15:p.weapon===1?.10:.055);for(const h of hits){const shotDistance=h.e.mesh.position.distanceTo(origin);let mult=(p.over>0?1.35:1)*((terrainStage()>1?!p.grounded:p.y>.5)&&p.up.air?1+.4*p.up.air:1)*(p.slide>0&&p.up.slide?1+.45*p.up.slide:1)*(h.head?(p.weapon===4?w.headMultiplier+.6*(p.up.focus||0):1.6+.6*(p.up.focus||0)):1);if(h.e.type==='boss')mult*=h.e.exposed>0?1.8:.55;if(p.up.execution&&h.e.hp<h.e.max*.35)mult*=1+.3*p.up.execution;let hitDamage=w.damage*mult;if(p.weapon===0)hitDamage=pulseDamageAt(shotDistance)*mult;if(p.weapon===1)hitDamage*=shotDistance<=6?1.25:shotDistance<=10?.4:.045;if(p.weapon===2)hitDamage*=1.3+clamp((h.along-10)/35,0,.65);const wasAlive=h.e.hp>0;if(p.weapon===1&&shotDistance<=30){const count=(shotgunHits.get(h.e)||0)+1;shotgunHits.set(h.e,count);if(count===1&&!h.e.omegaObjective&&h.e.type!=='boss'&&!h.e.xSeal){const push=h.e.mesh.position.clone().sub(origin);push.y=0;push.normalize();const force=3*(1+.4*(p.up.breach||0)),x=h.e.mesh.position.x,z=h.e.mesh.position.z;if(terrainStage()>1){const obj={x,z,y:world.heightAt(x,z)??0};for(let step=0;step<10;step++)move(obj,push.x*force/10,push.z*force/10,h.e.r*.6);h.e.mesh.position.x=obj.x;h.e.mesh.position.z=obj.z;}else{h.e.mesh.position.x=clamp(x+push.x*force,-30.8,30.8);h.e.mesh.position.z=clamp(z+push.z*force,-30.8,30.8);}h.e.stun=Math.max(h.e.stun||0,.42+.08*(p.up.breach||0));if(h.e.type==='charger'){h.e.attack=0;h.e.cd=Math.max(h.e.cd,.9)}}}damage(h.e,hitDamage,true,{direct:true,head:h.head,attackId,distance:shotDistance,weapon:p.weapon});burst(end,w.color,p.weapon===4?9:p.weapon===2?4:2);if(p.weapon===2&&p.up.fork&&forkCount<2&&wasAlive&&h.e.hp<=0){const targets=enemies.filter(e=>e.hp>0&&!directTargets.has(e)&&e.mesh.position.distanceTo(h.e.mesh.position)<14).sort((a,b)=>a.mesh.position.distanceTo(h.e.mesh.position)-b.mesh.position.distanceTo(h.e.mesh.position));for(const target of targets.slice(0,2-forkCount)){forkCount++;const from=h.e.mesh.position.clone().add(new T.Vector3(0,.4,0)),to=target.mesh.position.clone().add(new T.Vector3(0,.3,0));beam(from,to,0x9cbdff,.035,.22);burst(to,0x9cbdff,3);damage(target,28*p.up.fork,false)}}if(false&&p.up.chain&&(difficulty==='easy'||!chainUsed)){let target=enemies.find(e=>e!==h.e&&e.hp>0&&e.mesh.position.distanceTo(h.e.mesh.position)<6);if(target){beam(h.e.mesh.position,target.mesh.position,0x91cdff,.05,.2);damage(target,(10+p.charge*.15)*p.up.chain*(difficulty==='easy'?1:p.weapon===0?.35:p.weapon===2?1.4:1));chainUsed=true}}}}

}
function sniperScope(active){if(active&&(!p||p.weapon!==4||state!=='playing'))return false;sniperAim=!!active;document.body.classList.toggle('sniper-aim',sniperAim);$('sniper-scope').hidden=!sniperAim;$('sniper-scope').dataset.zoom=String(sniperZoom);$('scope-zoom').textContent=sniperZoom+'×';return sniperAim}function cycleSniperScope(){if(!p||p.weapon!==4||state!=='playing')return;if(!sniperAim){sniperZoom=3;sniperScope(true)}else if(sniperZoom===3){sniperZoom=6;$('sniper-scope').dataset.zoom='6';$('scope-zoom').textContent='6×'}else sniperScope(false)}function phaseActive(){return !!p&&p.weapon===3&&(!tutorialActive||weaponPractice())&&(state==='playing'||state==='paused'||state==='upgrade');}
function firePhase(shot){
 const attackId=++attackSerial;
 if(ultimate.active||state!=='playing'||!phaseActive())return;
 const count=Math.min(p.ammo[3],shot.ammo);if(count<=0||p.exhaust>0)return;const explosion=count>=PHASE.explosionThreshold,nova=count>=PHASE.novaThreshold,charged=count>1,basePower=PHASE.boltDamage*count,power=basePower*(nova?PHASE.novaMultiplier:1)*arsenalBuild(3,p.up).power*(nova?arsenalBuild(3,p.up).novaMultiplier:1);p.ammo[3]-=count;phaseSpent+=count;phaseShots++;if(charged)phaseBeams++;if(nova)novaShots++;if(explosion)explosionShots++;
 phaseControl.cooldown*=arsenalBuild(3,p.up).phaseChargeScale;if(explosion){unleashExplosion(attackId);return;}
 recoil=charged?.14:.055;shotFlash=charged?.12:.06;
 sound(charged?140:380,charged?.20:.07,charged?'triangle':'sawtooth',charged?.045:.028);
 poseGun();gun.updateWorldMatrix(true,true);arena.updateWorldMatrix(true,true);
 const origin=camera.position.clone(),direction=new T.Vector3(0,0,-1).applyQuaternion(camera.quaternion),obstacles=[];
 arena.traverse(o=>{if(o.isMesh)obstacles.push(o)});
 if(mobile&&$('assist').checked){
  let best=.965,target=null;
  for(const e of enemies){if(e.hp<=0)continue;const d=(e.bossVisual?enemyAimPoint(e,new T.Vector3()):e.mesh.position.clone()).sub(origin).normalize(),dot=d.dot(direction);if(dot>best){const test=tracePhaseShot({origin,direction:d,enemies:[e],obstacles});if(test.hits.length){best=dot;target=d}}}
  if(target)direction.lerp(target,.55).normalize();
 }
 ray.set(origin,direction);stageGimmicks.handleRayHits(ray.intersectObjects(arena.children,false),enemies,bossRef);const result=tracePhaseShot({origin,direction,enemies,obstacles,charged,nova}),from=phaseModel.muzzle.getWorldPosition(new T.Vector3());
 if(charged&&result.hits.length)result.end.copy(origin).addScaledVector(direction,result.hits[result.hits.length-1].along);
 if(arsenalBuild(3,p.up).tier)arsenalDischarge(3,from,result.end,{build:arsenalBuild(3,p.up),charged});
 if(nova)novaDischarge(from,result.end,power,count,obstacles);
 beam(from,result.end,nova?0xffdaaa:charged?0xaf9fff:0x69e7ef,charged?.065:.026,charged?.13:.08);
 if(charged){
  beam(from,result.end,0xddefff,.017,.16);
  const axis=result.end.clone().sub(from).normalize(),length=from.distanceTo(result.end);
  for(let i=1;i<=3;i++){const m=new T.Mesh(phaseRippleGeo,phaseRippleMat);m.position.copy(from).addScaledVector(axis,Math.min(length,i*.6));m.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),axis);scene.add(m);fx.push({mesh:m,life:.16,max:.16,ripple:true});}
 }
 for(const h of result.hits){
  let mult=((terrainStage()>1?!p.grounded:p.y>.5)&&p.up.air?1+.4*p.up.air:1)*(p.slide>0&&p.up.slide?1+.45*p.up.slide:1)*(h.head?1.6+.6*(p.up.focus||0):1);
  if(h.e.type==='boss')mult*=h.e.exposed>0?1.8:.55;
  if(p.up.execution&&h.e.hp<h.e.max*.35)mult*=1+.3*p.up.execution;
  damage(h.e,power*mult,true,{direct:true,head:h.head,attackId,distance:h.along,weapon:3});
  if(charged&&h.e.hp>0&&h.e.type!=='boss'){h.e.stun=Math.max(h.e.stun||0,nova?.75:.3);if(h.e.type==='charger'){h.e.attack=0;h.e.cd=Math.max(h.e.cd,.75)}}
 }
 if(result.hits.length){
  burst(result.hits[0].e.mesh.position,charged?0xb69fff:0x69e7ef,charged?4:2);
  if(false&&p.up.chain){const first=result.hits[0].e,targets=new Set(result.hits.map(h=>h.e));const other=enemies.find(e=>e.hp>0&&!targets.has(e)&&e.mesh.position.distanceTo(first.mesh.position)<6);if(other){const start=first.mesh.position.clone(),d=other.mesh.position.clone().sub(start);const check=tracePhaseShot({origin:start,direction:d,enemies:[other],obstacles});if(check.hits.length){beam(start,other.mesh.position,0xa4cfff,.035,.14);damage(other,(10+p.charge*.15)*p.up.chain,false)}}}
 }
 if(charged||!result.hits.length)damageOmegaCover(origin,direction,power*.75,result.limit+.08);if(nova)damageOmegaCoverNear(result.end,7+(count-10)*.75,power);
}
function unleashExplosion(attackId=++attackSerial){
 arena.updateMatrixWorld(true);camera.updateMatrixWorld(true);
 const origin=camera.position.clone(),direction=new T.Vector3(0,0,-1).applyQuaternion(camera.quaternion).normalize(),obstacles=[];
 arena.traverse(o=>{if(o.isMesh)obstacles.push(o)});
 const aimed=tracePhaseShot({origin,direction,enemies,obstacles,charged:true,nova:true});
 const directHits=aimed.hits;
 const impact=directHits.length?directHits[directHits.length-1].e.mesh.position.clone():origin.clone().addScaledVector(direction,Math.min(20,aimed.limit));
 const bounds=world.bounds(),center=impact.clone();center.x=clamp(center.x,-bounds.x,bounds.x);center.z=clamp(center.z,-bounds.z,bounds.z);center.y=clamp(center.y,.45,4.5);
 const beforeKills=weaponPractice()?weaponTraining.eliminations:kills,base=PHASE.boltDamage*PHASE.explosionThreshold,novaPower=base*PHASE.novaMultiplier*arsenalBuild(3,p.up).power*arsenalBuild(3,p.up).novaMultiplier*arsenalBuild(3,p.up).explosionMultiplier;
 ultimate.start(center,{low:mobile||$('quality').value==='low',eliminated:0});
 // The focused lance rewards a clean aim; the larger blast catches a nearby pack but respects cover.
 for(const h of directHits){
  let mult=((terrainStage()>1?!p.grounded:p.y>.5)&&p.up.air?1+.4*p.up.air:1)*(p.slide>0&&p.up.slide?1+.45*p.up.slide:1)*(h.head?1.6+.6*(p.up.focus||0):1);
  if(h.e.type==='boss')mult*=h.e.exposed>0?1.8:.55;
  if(p.up.execution&&h.e.hp<h.e.max*.35)mult*=1+.3*p.up.execution;
  damage(h.e,novaPower*PHASE.explosionDirectMultiplier*mult,true,{direct:true,head:h.head,attackId,distance:h.along,weapon:3});
 }
 for(const {e,factor} of tracePhaseBlast({center,from:origin,radius:PHASE.explosionRadius,minFactor:.2,enemies:[...enemies],obstacles})){
  let amount=novaPower*PHASE.explosionBlastMultiplier*factor;
  if(e.type==='boss')amount*=(e.exposed>0?1.8:.55)*.2;
  damage(e,amount,false);
  if(e.hp>0&&!e.omegaObjective&&e.type!=='boss'&&!e.xSeal){
   const push=e.mesh.position.clone().sub(center).setY(0);
   if(push.lengthSq()<.001)push.set(direction.x,0,direction.z);
   push.normalize();move(e.mesh.position,push.x*(4+5*factor),push.z*(4+5*factor),e.r*.6);
   e.stun=Math.max(e.stun||0,.7+factor*.7);
   if(e.type==='charger'){e.attack=0;e.cd=Math.max(e.cd,.9)}
  }
 }
 damageOmegaCoverNear(center,PHASE.explosionRadius,180);
 ultimate.setKills((weaponPractice()?weaponTraining.eliminations:kills)-beforeKills);
 enemies=enemies.filter(e=>e.hp>0);clearObjects(bullets);clearObjects(hazards);
 phaseControl.cancelHold();input.fire=false;input.firePressed=false;input.keys={};input.jump=false;input.x=input.y=0;
 p.dashing=0;p.slide=0;p.reload=0;p.exhaust=ultimate.duration;hurtTime=0;recoil=.18;shotFlash=.15;transition=0;
 notify('EXPLOSION / IMPACT ZONE SUPPRESSED',3.4);
}
// Shared geometry; only fading materials belong to individual NOVA effects.
const novaRingGeo=new T.TorusGeometry(1,.022,5,64),novaDomeGeo=new T.SphereGeometry(1,24,10,0,Math.PI*2,0,Math.PI/2);
const novaSlashGeo=new T.TorusGeometry(1,.035,5,40,Math.PI*1.35);
function novaDischarge(from,end,power,count,obstacles){
 const radius=7+(count-10)*.75,center=end.clone();
 for(const {e,factor} of tracePhaseBlast({center,from,radius,enemies:[...enemies],obstacles})){
  let amount=(power*PHASE.blastMultiplier)*factor;if(e.type==='boss')amount*=e.exposed>0?1.8:.55;
  const to=e.mesh.position.clone().sub(center);
  damage(e,amount);
  if(e.hp>0&&!e.omegaObjective&&e.type!=='boss'&&!e.xSeal){const push=to.clone().setY(0).normalize();move(e.mesh.position,push.x*4.5,push.z*4.5,e.r*.6);e.stun=Math.max(e.stun||0,.75);e.attack=0;e.cd=Math.max(e.cd,.9);}
 }
 const g=new T.Group();g.position.copy(center);
 const make=(geo,color,alpha)=>{const m=new T.Mesh(geo,new T.MeshBasicMaterial({color,transparent:true,opacity:alpha,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending}));m.userData.alpha=alpha;g.add(m);return m;};
 make(novaRingGeo,0xc4b2ff,.85).rotation.x=Math.PI/2;
 const halo=make(novaRingGeo,0x8ff7ff,.6);halo.rotation.set(.35,.1,.3);halo.scale.setScalar(.78);
 const crown=make(novaRingGeo,0xffd6a1,.5);crown.rotation.set(1.1,.3,.2);crown.scale.setScalar(.55);
 const dome=make(novaDomeGeo,0x9283ff,.10);dome.scale.y=.42;
 scene.add(g);fx.push({mesh:g,life:.62,max:.62,nova:true,radius,owned:true});
 // A single curved blade along the flight path keeps the arena readable.
 const slash=new T.Mesh(novaSlashGeo,new T.MeshBasicMaterial({color:0xe3d2ff,transparent:true,opacity:.85,depthWrite:false,side:T.DoubleSide}));
 slash.position.copy(from).lerp(end,.45);slash.quaternion.copy(camera.quaternion);slash.scale.set(2.5,.4,1);scene.add(slash);fx.push({mesh:slash,life:.22,max:.22,owned:true});
 beam(from,end,0xd3c4ff,.15,.2);burst(center,0xb8a5ff,12);sound(65,.3,'triangle',.07);notify('NOVA / '+count+' CELLS',1.2);
}
const phaseRippleGeo=new T.TorusGeometry(.12,.008,4,20),phaseRippleMat=new T.MeshBasicMaterial({color:0xb29fff,transparent:true,opacity:.55,depthWrite:false});
const capacitorRingGeo=new T.TorusGeometry(.25,.08,6,32),capacitorRingMat=new T.MeshBasicMaterial({color:0x8affdf,transparent:true,opacity:.8,depthWrite:false});
function capacitorPulse(){const center=new T.Vector3(p.x,p.y+.12,p.z),ring=new T.Mesh(capacitorRingGeo,capacitorRingMat);ring.rotation.x=Math.PI/2;ring.position.copy(center);scene.add(ring);fx.push({mesh:ring,life:.42,max:.42,ringPulse:true});for(const e of enemies){if(e.hp<=0||e.omegaObjective||e.type==='boss'||e.xSeal)continue;const delta=e.mesh.position.clone().sub(center),distance=delta.length();if(distance>3||distance<.001)continue;delta.y=0;delta.normalize();const obj={x:e.mesh.position.x,z:e.mesh.position.z,y:terrainStage()>1?world.heightAt(e.mesh.position.x,e.mesh.position.z)??0:0};move(obj,delta.x*1.5,delta.z*1.5,e.r*.6);e.mesh.position.x=obj.x;e.mesh.position.z=obj.z;e.stun=Math.max(e.stun||0,.3);beam(center,e.mesh.position,0x8affdf,.035,.16);}}
function jump(){if(p?.swimming){input.jump=true;return}if(ultimate.active||state!=='playing'||p.exhaust>0)return;if(p.grounded){p.grounded=false;p.liftId=null;p.vy=9;p.airJumpReady=false;sound(480,.09,'sine',.02)}else if(difficulty==='x'&&!p.airJumpReady){p.airJumpReady=true;p.vy=9; xEffects.burst(new T.Vector3(p.x,p.y,p.z),{kind:'dash'});sound(660,.08,'sine',.025)}else if(p.up.airjump&&augmentRuntime.airJumpReady){augmentRuntime.airJumpReady=false;p.vy=8.5;sound(620,.1,'sine',.035);burst(new T.Vector3(p.x,p.y-.25,p.z),0x83f5ed,6)}}function dash(){if(ultimate.active||state!=='playing'||p.swimming||p.exhaust>0||p.dash>0)return;p.dashing=.19;augmentRuntime.ramUsed=false;augmentRuntime.parryUsed=false;p.inv=.24+(p.up.dash||0)*.1;p.dash=(difficulty==='x'?1.25:difficulty==='easy'?1.55:2.3)*Math.pow(.75,p.up.dash||0)*(isRiftMode()?Math.pow(.9,p.up.omegaDash||0):1);p.charge=clamp(p.charge+12,0,100);if(difficulty==='x'){xReflections=0;xEffects.burst(new T.Vector3(p.x,p.y,p.z),{kind:'dash'});if(xDirector.owns('dash'))xShock(new T.Vector3(p.x,p.y+1,p.z),6,70);}sound(180,.2,'sawtooth',.035)}function slide(){if(p?.swimming){input.dive=true;return}if(!ultimate.active&&state==='playing'&&p.exhaust<=0&&p.slideCD<=0){p.slide=.65+(p.up.slide||0)*.3+(rush.cards.slide||0)*.5;p.slideCD=1.3;sound(100,.12,'triangle',.025)}}
function projectile(e,dir,speed=11){if(difficulty==='easy')speed*=.68;const origin=e.bossVisual?enemyAimPoint(e,new T.Vector3()):e.mesh.position;const m=orb(scene,origin.x,origin.y,origin.z,.16,0xff935d,1.5);bullets.push({mesh:m,vel:dir.multiplyScalar(speed),life:6,source:e.rushId})}
function ai(frameDt,realDt=frameDt){for(const e of enemies){const dt=frameDt*(isRiftMode()&&e.omegaSlowLife>0?1-e.omegaSlow:1);if(e.hp<=0||e.omegaObjective)continue;if(leviathanDive&&leviathanDive.elapsed<leviathanDive.duration){if(e===leviathanDive.boss){e.t+=dt;rushBossAI(e,dt);}continue;}if(e.xChronarch){updateXChronarch(e,dt,realDt);continue;}if(e.xSeal){updateXSeal(e,dt);continue;}e.t+=dt;if(e.rushId){e.cd-=dt;rushBossAI(e,dt);continue;}e.cd-=dt*(difficulty==='easy'? .62:isRiftMode()&&(e.type==='shooter'||e.type==='strafer') ? .8 : 1);e.flash-=dt;e.core.scale.setScalar(e.r*.45*(e.flash>0?1.6:1));let pos=e.mesh.position,dx=p.x-pos.x,dz=p.z-pos.z,d=Math.hypot(dx,dz);let dir=new T.Vector3(dx,p.y+1-pos.y,dz).normalize();e.mesh.rotation.y=Math.atan2(dx,dz);const surface=terrainStage()>1?(world.heightAt(pos.x,pos.z)??0):0;e.mesh.position.y=surface+(e.type==='boss'?3+Math.sin(e.t)*.2:e.type==='strafer'?1.7+Math.sin(e.t*3)*.25:1+Math.sin(e.t*5)*.08);for(let i=0;i<e.limbs.length;i++)e.limbs[i].rotation.x=Math.sin(e.t*(e.type==='chaser'?12:6)+i*Math.PI)*.3;if(e.type==='charger'&&e.cd<.65&&e.attack<=0){e.mesh.rotation.z=Math.sin(e.t*35)*.035;if(Math.floor(e.t*12)!==Math.floor((e.t-dt)*12))beam(pos.clone().setY(.12),new T.Vector3(p.x,.12,p.z),0xff4678,.045,.1)}else e.mesh.rotation.z=0;if(e.rushId){rushBossAI(e,dt);continue;}if(e.type==='boss'){e.exposed=Math.max(0,e.exposed-dt);e.core.visible=e.exposed>0||Math.sin(e.t*8)>0;if(e.cd<0){e.phase++;e.cd=e.hp<e.max*.5?2.7:3.8;if(e.phase%3===0){notify('WARDEN / 衝撃波 — ジャンプで回避',2);let m=new T.Mesh(new T.TorusGeometry(1,.09,5,64),mat(0xffba70,1));m.rotation.x=Math.PI/2;m.position.set(pos.x,surface+.18,pos.z);scene.add(m);hazards.push({mesh:m,r:1,life:5,hit:false});e.exposed=2.6}else{notify('WARDEN / コア露出 — 集中射撃',1.5);const fan=difficulty==='fracture'?1:3;for(let j=-fan;j<=fan;j++)projectile(e,dir.clone().applyAxisAngle(new T.Vector3(0,1,0),j*.17),10);e.exposed=1.9;if(e.phase%3===2&&enemies.filter(x=>x.hp>0).length<(isRiftMode()?4:7))spawn('chaser',pos.x+4,pos.z+3)}}continue}
if(e.tutorialDummy)continue;let speed=e.type==='chaser'?5.15:e.type==='charger'?2.6:e.type==='strafer'?3.6:2.1;if(difficulty==='easy')speed*=.65;let mx=dx/Math.max(d,.1),mz=dz/Math.max(d,.1);if(e.type==='shooter'||e.type==='strafer'){let radial=d<9?-1:d>16?1:0;let side=e.type==='strafer'?Math.sin(e.t*.7)>0?1:-1:.3;let a=mx;mx=mx*radial-mz*side;mz=mz*radial+a*side;if(e.cd<.55)e.core.scale.multiplyScalar(1.5);if(e.cd<0){if(e.type==='shooter'){for(let spread=-1;spread<=1;spread++)projectile(e,dir.clone().applyAxisAngle(new T.Vector3(0,1,0),spread*.12),11.5)}else projectile(e,dir,14.5);e.cd=e.type==='strafer'?1.65:2.8}}
if(terrainStage()>1){e.navTime=(e.navTime||0)-dt;if(e.navTime<=0){e.navTime=.45;e.navRoute=world.path(pos.x,pos.z,p.x,p.z);const delta=new T.Vector3(p.x-pos.x,p.y+1-pos.y,p.z-pos.z);const length=delta.length();e.navBlocked=seekerWallDistance(pos,delta.normalize(),length)<length-.8;}const pursue=e.type==='chaser'||e.type==='charger'||d>14||e.navBlocked||Math.abs(p.y-surface)>2;if(pursue&&e.navRoute?.length){while(e.navRoute.length&&Math.hypot(e.navRoute[0].x-pos.x,e.navRoute[0].z-pos.z)<.7)e.navRoute.shift();if(e.navRoute.length){const goal=e.navRoute[0],len=Math.hypot(goal.x-pos.x,goal.z-pos.z)||1;mx=(goal.x-pos.x)/len;mz=(goal.z-pos.z)/len;}}}
if(e.type==='charger'){if(e.attack>0){e.attack-=dt;mx=e.dir.x;mz=e.dir.z;speed=19}else if(e.cd<0){e.dir.set(dx/Math.max(d,.1),0,dz/Math.max(d,.1));e.attack=.55;e.cd=3.1}else if(e.cd<.65){speed=0;e.core.scale.multiplyScalar(1.8)}}
if(e.stun>0){e.stun-=dt;speed*=.15}let obj={x:pos.x,z:pos.z,y:surface};move(obj,mx*speed*dt,mz*speed*dt,e.r*.6);if(Math.abs(obj.x-pos.x)+Math.abs(obj.z-pos.z)<.001&&d>3){move(obj,-mz*speed*dt,mx*speed*dt,e.r*.6)}pos.x=obj.x;pos.z=obj.z;if(terrainStage()>1)pos.y=(world.heightAt(pos.x,pos.z)??surface)+(e.type==='strafer'?1.7:1);if(d<e.r+.65&&Math.abs(p.y-surface)<2)hurt((e.type==='charger'?22:12)*(difficulty==='easy'?.6:1));
}enemies=enemies.filter(e=>e.hp>0)}
function update(dt){
 if(difficulty==='x'){if(xDirector.tick(dt)){xFailure='REACTOR EMPTY';finish(false);return;}xSwapCd=Math.max(0,xSwapCd-dt);xSwapBuff=Math.max(0,xSwapBuff-dt);}
 if(ultimate.active)return;
 if(isRiftMode())omegaCombat.update(dt);if(difficulty==='fracture')kinetic.tick(dt);
 const enemyDt=difficulty==='x'?dt*(xDirector.breaking?X_RULES.timeScale:1.12):isRiftMode()?dt*1.12:dt;
 if(isRiftMode()){updateOmegaRaid(dt);if(state!=='playing')return;}else if(!tutorialActive&&waveShift.tick(dt,enemies.filter(e=>e.hp>0).length+spawnQueue.length)){beginWaveShift();return;}
 if(rush.active&&rush.phase==='fight'){if(bossRef?.hp<=0)resolveRush(true);else if(!leviathanDive&&rush.tick(dt))resolveRush(false);if(state!=='playing')return;}
 runTime+=dt;
 if(leviathanDive){leviathanDive.elapsed=Math.min(leviathanDive.duration,leviathanDive.elapsed+dt);const t=leviathanDive.elapsed/leviathanDive.duration,ease=t*t*(3-2*t);p.x=leviathanDive.startX+(p.x-leviathanDive.startX)*(1-ease);p.z=leviathanDive.startZ+(p.z-leviathanDive.startZ)*(1-ease);p.y=leviathanDive.startY+(leviathanDive.waterline-3-leviathanDive.startY)*ease;p.vy=0;p.swimming=true;p.forcedUnderwater=true;p.grounded=false;}
 const scriptedDive=!!leviathanDive&&leviathanDive.elapsed<leviathanDive.duration;
 if(scriptedDive){input.fire=input.firePressed=false;}
 stageGimmicks.update(dt,clock,p,enemies,bossRef);
 if(easyComboTimer>0){easyComboTimer-=dt;if(easyComboTimer<=0)$('killstreak').hidden=true}
 p.cool-=dt;p.inv-=dt;p.exhaust=Math.max(0,p.exhaust-dt);p.dash-=dt;p.dashing-=dt;p.slide-=dt;p.slideCD-=dt;
 if(p.reload>0){p.reload-=dt;if(p.reload<=0)p.ammo[p.weapon]=magSize(p.weapon)}
 const keys=mobile?{}:input.keys;
 const seaFight=rush.active&&rush.phase==='fight'&&rush.current?.id==='leviathan'&&world.radar().bossArena==='leviathan',waterline=seaFight?(world.radar().seaLevel??.12):0;
 if(!seaFight&&p.swimming){p.swimming=false;p.forcedUnderwater=false;input.dive=false;}
 if(seaFight&&(p.forcedUnderwater||p.y<waterline-.06)&&!p.swimming){p.swimming=true;p.vy=0;p.grounded=false;if(!p.forcedUnderwater)notify('水中 / SPACEで浮上 · Cで潜る',3);sound(170,.32,'sine',.045)}
 let ix=scriptedDive?0:input.x+((keys.KeyD||keys.ArrowRight)?1:0)-((keys.KeyA||keys.ArrowLeft)?1:0),iz=scriptedDive?0:input.y+((keys.KeyS||keys.ArrowDown)?1:0)-((keys.KeyW||keys.ArrowUp)?1:0);
 let len=Math.hypot(ix,iz);if(len>1){ix/=len;iz/=len}
 const boostSteering=stageGimmicks.steerBoost(p,ix,iz,dt),boosted=boostSteering&&p.accelTime>0&&p.dashing<=0&&p.slide<=0;
 let moving=len>.1||boosted;if(p.dashing>0&&!moving){iz=-1;moving=true}
 let speed=(p.swimming?5.4:p.dashing>0?32:p.slide>0?13:boosted?23:8)*p.speed*(p.exhaust>0?.18:1)*(sniperAim&&p.weapon===4?.58:1);
 let dx=(Math.cos(yaw)*ix+Math.sin(yaw)*iz)*speed*dt,dz=(-Math.sin(yaw)*ix+Math.cos(yaw)*iz)*speed*dt;
 if(boosted){dx=p.accelX*speed*dt;dz=p.accelZ*speed*dt}
 move(p,scriptedDive?0:dx,scriptedDive?0:dz);if(p.up.ram&&p.dashing>0&&!augmentRuntime.ramUsed){const target=enemies.find(e=>e.hp>0&&!e.omegaObjective&&e.type!=='boss'&&!e.xSeal&&Math.hypot(e.mesh.position.x-p.x,e.mesh.position.z-p.z)<e.r+.65&&Math.abs(e.mesh.position.y-(p.y+1))<2);if(target){augmentRuntime.ramUsed=true;damage(target,45,true);target.stun=Math.max(target.stun||0,.4);burst(target.mesh.position,0x9feaff,9);p.dashing=0;p.inv=0;notify('PHASE RAM / 衝突成功',1);}}
 const oldY=p.y,terrain=terrainStage()>1?world.heightAt(p.x,p.z):0;
 let floatActive=false,lift=null;
 if(p.swimming){const diving=mobile?input.dive:!!(keys.KeyC||keys.ControlLeft||input.dive),vertical=scriptedDive?0:Number(input.jump)-Number(diving),surfaceTarget=p.forcedUnderwater?waterline-2.8:waterline+.22,surfaceLimit=p.forcedUnderwater?waterline-1.8:waterline+.36,targetVy=vertical?vertical*5.2:clamp((surfaceTarget-p.y)*1.8,-2.6,2.6);if(vertical)p.vy=vertical*4.6;else p.vy+=(targetVy-p.vy)*Math.min(1,dt*3.4);p.y+=p.vy*dt;p.grounded=false;p.liftId=null;if(p.y<waterline-13){p.y=waterline-13;p.vy=0;}if(p.y>surfaceLimit){if(!p.forcedUnderwater&&terrain!==null&&vertical>0){p.y=Math.max(terrain,waterline+.36);p.vy=0;p.swimming=false;p.grounded=true;}else{p.y=surfaceLimit;p.vy=0;}}}
 else{floatActive=(terrainStage()===3||isRiftMode()&&world.radar().omega&&world.radar().gimmick===3)&&input.jump&&!p.grounded&&p.floatCharge>0;if(floatActive){p.floatCharge=Math.max(0,p.floatCharge-dt);stageGimmicks.floatHint();p.vy=Math.max(p.vy,-3);p.vy-=5.2*dt;}else p.vy-=24*dt;p.y+=p.vy*dt;let floor=terrain??-40;for(const s of solids)if(s.enabled!==false&&!(difficulty==='easy'&&s.removeInEasy)&&Math.abs(p.x-s.x)<s.w+.25&&Math.abs(p.z-s.z)<s.d+.25&&oldY>=s.top-.1&&p.vy<=0)floor=Math.max(floor,s.top);lift=stageGimmicks.platformAt(p.x,p.z);if(lift&&p.vy<=0&&oldY>=lift.previousTop-.12)floor=Math.max(floor,lift.top);if(floatActive&&terrain!==null&&p.y>terrain+5.5){p.y=terrain+5.5;p.vy=Math.min(0,p.vy)}p.grounded=false;if(p.y<=floor){p.y=floor;p.vy=0;p.grounded=true;p.floatCharge=1.8;augmentRuntime.airJumpReady=false;p.liftId=lift&&Math.abs(floor-lift.top)<.08?lift.index:null}else p.liftId=null;if(seaFight&&p.y<waterline-.06){p.swimming=true;p.vy=0;p.grounded=false;notify('水中 / SPACEで浮上 · Cで潜る',3);sound(170,.32,'sine',.045);}if(p.y < -6&&!p.swimming){const entry=world.entry();Object.assign(p,{x:entry.x,z:entry.z,y:entry.y,vy:0,grounded:true,floatCharge:1.8,liftId:null});if(p.inv<=0)hurt(8);p.inv=Math.max(p.inv,1.5);notify('落下救助 / 開始地点へ復帰 · 耐久 -8',2)}}
 for(const pad of pads)if(pad.visible&&Math.hypot(p.x-pad.position.x,p.z-pad.position.z)<1.8&&Math.abs(p.y-(pad.position.y-.08))<.15){p.vy=terrainStage()>1?world.launchPower():19.6;p.grounded=false;p.liftId=null;if(tutorialActive)tutorialPadHits++;notify('LAUNCH / 空中からコアを狙え',1.5)}
 const boost=stageGimmicks.tryBoost(p,dx,dz,-Math.sin(yaw),-Math.cos(yaw));if(boost){p.accelTime=.82;p.accelX=boost.x;p.accelZ=boost.z;notify('加速盤 / 進行方向へブースト',1.5);sound(320,.16,'sawtooth',.035)}
if(tutorialActive&&!weaponPractice()&&p.weapon>=3){p.weapon=0;phaseControl.reset();}if(weaponPractice()&&p.weapon!==weaponTraining.index)p.weapon=weaponTraining.index;if(tutorialActive&&!weaponPractice()){if(tutorialStage===0){if(mobile&&Math.hypot(p.x-tutorialMoveOrigin.x,p.z-tutorialMoveOrigin.z)>1.2)tutorialSet(1);else if(!mobile)updateMovementTutorial()}else if(tutorialStage===1&&tutorialTarget&&tutorialTarget.hp<=0)tutorialSet(2);else if(tutorialStage===4&&tutorialTarget&&tutorialTarget.hp<=0)tutorialSet(5);else if(tutorialStage===2&&p.xp>tutorialXPStart)tutorialSet(3);else if(tutorialStage===3&&tutorialPadHits>0)tutorialSet(4)}if(p.over>0){p.over-=dt;p.charge=100*p.over/(8+(augmentRuntime.overEchoUsed?1:0))}else if(!tutorialActive){augmentRuntime.hotSwapCd=Math.max(0,augmentRuntime.hotSwapCd-dt);p.charge=clamp(p.charge+dt*(moving?7*p.chargeMult*(1+.35*(p.up.capacitor||0)):-8),0,100);if(p.charge>=100){p.over=8;p.charge=100;augmentRuntime.overKills=0;if(p.up.capacitor)capacitorPulse();augmentRuntime.overEchoUsed=false;if(isRiftMode())notify('Ω OVERDRIVE / 威力 +15%',2);else{p.ammo[3]=Math.min(PHASE.capacity,p.ammo[3]+arsenalBuild(3,p.up).phaseRefill);notify('OVERDRIVE / ASTRA弾 +'+arsenalBuild(3,p.up).phaseRefill,2);}sound(700,.4,'triangle',.06)}}
const activePhase=phaseActive();if(activePhase&&!phaseWasActive)p.reload=0;phaseWasActive=activePhase;
const cameraUnderwater=p.swimming&&p.y+(p.slide>0?.85:1.65)-(p.exhaust>0?.38:0)<waterline;document.body.classList.toggle('underwater',cameraUnderwater);if(cameraUnderwater){scene.fog.color.setHex(0x15516b);scene.fog.near=1.5;scene.fog.far=58;}$('jump').querySelector('span').textContent=p.swimming?'浮上':'JUMP';$('slide').querySelector('span').textContent=p.swimming?'潜水':'SLIDE';if(!mobile)$('controlsHint').textContent=p.swimming?'WASD / マウス視点 / SPACE 浮上 · C 潜水':'WASD / 矢印 移動 / マウス視点・左クリック射撃 / 右クリック照準 / SPACE ジャンプ / SHIFT ダッシュ / C スライド / 1–6 武器 / R リロード';camera.position.set(p.x,p.y+(p.slide>0?.85:1.65)-(p.exhaust>0?.38:0),p.z);if(leviathanDive){camera.lookAt(enemyAimPoint(leviathanDive.boss,new T.Vector3()));const targetYaw=camera.rotation.y,targetPitch=camera.rotation.x,t=leviathanDive.elapsed/leviathanDive.duration,ease=t*t*(3-2*t),yawDelta=Math.atan2(Math.sin(targetYaw-leviathanDive.startYaw),Math.cos(targetYaw-leviathanDive.startYaw));yaw=leviathanDive.startYaw+yawDelta*ease;pitch=leviathanDive.startPitch+(targetPitch-leviathanDive.startPitch)*ease;camera.rotation.set(pitch+viewKick,yaw,0);if(leviathanDive.elapsed>=leviathanDive.duration){leviathanDive=null;notify('水中戦 / リヴァイアサンを追え',1.8)}}else camera.rotation.set(pitch+viewKick,yaw,p.dashing>0?.035:0);camera.fov=T.MathUtils.lerp(camera.fov,sniperAim&&p.weapon===4?(sniperZoom===6?13:26):(p.dashing>0?91:p.over>0?84:78),dt*(sniperAim?14:8));camera.updateProjectionMatrix();seekerModel.update(0,{active:p.weapon===5,mobile,ammo:p.ammo[5],cellCursor:seeker.metrics().shots%3,reload:p.reload>0?clamp(1-p.reload/(reloadDuration(5)),.001,1):0,recoil,swap:swapAnim,time:clock});seeker.updateLocks(dt,{active:p.weapon===5&&(!tutorialActive||weaponPractice()),camera,enemies,mobile,ammo:p.ammo[5],reloading:p.reload>0,evolution:arsenalBuild(5,p.up)});const ammoBefore=p.ammo.reduce((a,b)=>a+b,0);if(scriptedDive){phaseControl.update(dt,false,false);}else if(activePhase){const shot=phaseControl.update(dt,true,input.fire,p.ammo[3],(p.over>0?1.35:1)/arsenalBuild(3,p.up).phaseChargeScale,input.firePressed);if(shot)firePhase(shot);}else{phaseControl.update(dt,false,false);if(input.fire||input.firePressed)shoot();}input.firePressed=false;if(difficulty!=='easy'&&p.ammo.reduce((a,b)=>a+b,0)<ammoBefore)viewKick=Math.min(.065,viewKick+([.007,.03,.025,.03,.04,.02][p.weapon]||.02));if(rush.cards.recoil&&p.ammo.reduce((a,b)=>a+b,0)<ammoBefore){move(p,Math.sin(yaw)*1.3*rush.cards.recoil,Math.cos(yaw)*1.3*rush.cards.recoil);p.vy=Math.max(p.vy,2);}if(ultimate.active)return;ai(enemyDt,dt);seeker.update(dt,enemies,mobile||$('quality').value==='low');updateWeaponPractice(dt);
for(const b of bullets){let old=b.mesh.position.clone();b.mesh.position.addScaledVector(b.vel,enemyDt);b.life-=enemyDt;let pos=b.mesh.position;let seg=pos.clone().sub(old),length=seg.length();ray.set(old,seg.normalize());let wall=ray.intersectObjects(arena.children,false)[0];if(wall&&wall.distance<=length)b.life=0;let target=new T.Vector3(p.x,p.y+.9,p.z),line=new T.Line3(old,pos),closest=new T.Vector3();line.closestPointToPoint(target,true,closest);if(b.life>0&&captureKineticBullet(b,old,closest,target))continue;if(b.life>0&&difficulty==='x'&&xDirector.breaking&&p.dashing>0&&xReflections<3&&closest.distanceTo(target)<2.6){b.life=0;xReflections++;xReflected++;xEffects.burst(closest,{kind:'refund'});const victim=enemies.filter(e=>e.hp>0&&(!e.xChronarch||xChronarch.mode==='open')&&e.mesh.position.distanceTo(closest)<40).sort((a,c)=>a.mesh.position.distanceToSquared(closest)-c.mesh.position.distanceToSquared(closest)).find(e=>{const d=e.mesh.position.clone().sub(closest),len=d.length();return seekerWallDistance(closest,d.normalize(),len)>=len-e.r;});if(victim){beam(closest,victim.mesh.position,0xffb5e6,.065,.22);damage(victim,95,false,{xSecondary:true});}continue;}if(b.life>0&&p.up.parry&&p.dashing>0&&!augmentRuntime.parryUsed&&closest.distanceTo(target)<1.1){augmentRuntime.parryUsed=true;p.charge=clamp(p.charge+12,0,100);b.life=0;burst(closest,0x90edff,7);beam(old,pos,0x90edff,.035,.13);sound(520,.07,'sine',.03)}else if(closest.distanceTo(target)<.65){const beforeHP=p.hp;hurt(12);if(b.source==='devourer'&&p.hp<beforeHP&&bossRef?.rushId==='devourer')bossRef.hp=Math.min(bossRef.max,bossRef.hp+bossRef.max*.025);b.life=0}}
for(const h of hazards){if(h.kind){h.delay-=enemyDt;h.life-=enemyDt;h.mesh.visible=h.delay>0?Math.sin(clock*30)>0:true;if(h.kind==='laser')h.mesh.scale.x=h.mesh.scale.y=h.delay>0?.055:.45;if(h.delay<=0&&!h.hit){const target=new T.Vector3(p.x,p.y+1,p.z);const hit=h.kind==='laser'?new T.Line3(h.a,h.b).closestPointToPoint(target,true,new T.Vector3()).distanceTo(target)<1.1:Math.hypot(p.x-h.mesh.position.x,p.z-h.mesh.position.z)<h.r&&Math.abs(p.y-h.mesh.position.y)<2;if(hit)hurt(h.damage??(h.kind==='laser'?22:28));h.hit=true;}continue;}h.r+=enemyDt*10;h.mesh.scale.setScalar(h.r);h.life-=enemyDt;if(!h.hit&&Math.abs(Math.hypot(p.x-h.mesh.position.x,p.z-h.mesh.position.z)-h.r)<.8&&p.grounded){hurt(25);h.hit=true}}
for(const item of pickups){item.life-=dt;item.mesh.rotation.y+=dt*2;let d=Math.hypot(p.x-item.mesh.position.x,p.z-item.mesh.position.z);if(d<5+3*(p.up.magnet||0))item.mesh.position.lerp(new T.Vector3(p.x,p.y+.35,p.z),dt*5);if(d<1.2){collectOrb(item);sound(900,.06,'sine',.015)}}
for(const arr of [bullets,hazards,pickups])for(let i=arr.length-1;i>=0;i--)if(arr[i].life<=0){scene.remove(arr[i].mesh);arr.splice(i,1)}
if(state!=='playing')return;if(isRiftMode()){updateOmegaReinforcements(dt);}else{spawnTimer-=dt;if(spawnQueue.length&&spawnTimer<=0&&(difficulty!=='x'||enemies.filter(e=>e.hp>0).length<8)){spawn(spawnQueue.shift());spawnTimer=difficulty==='x'?.52:wave===6?1.8:.95}}if(!isRiftMode()&&!tutorialActive&&!spawnQueue.length&&!enemies.length&&state==='playing'){transition+=dt;if(transition>1.2){if(wave===6){if(!rush.active)finish(true);}else{for(const item of pickups)if(item.life>0)collectOrb(item);clearObjects(pickups);waveReward=true;openReward()}}}
if(state==='playing'&&pendingLevels>0)openReward();
}
function gainXP(amount){if(weaponPractice())return;if(isRiftMode()){p.xp+=amount;while(p.xp>=p.xpNeed){p.xp-=p.xpNeed;p.level++;p.xpNeed=30+(p.level-1)*8;p.max+=3;p.hp=Math.min(p.max,p.hp+5);omegaReload=Math.min(8,omegaReload+1);notify('OVERCLOCK '+p.level+' / 最大耐久 +3・装填加速',1.2);}return;}p.xp+=Math.round(amount*(1+.15*(p.up.magnet||0)));while(p.xp>=p.xpNeed){p.xp-=p.xpNeed;p.level++;p.xpNeed=30+(p.level-1)*8;pendingLevels++}}
function collectOrb(item){if(item.life<=0)return;gainXP(item.xp);p.hp=Math.min(p.max,p.hp+(isRiftMode()?2:5)+2*(p.up.leech||0));item.life=0;sound(900,.06,'sine',.015)}
function openReward(){if(isRiftMode()){pendingLevels=0;waveReward=false;return;}if(pendingLevels>0){pendingLevels--;choose('level')}else if(waveReward){waveReward=false;if(isRiftMode()){p.hp=Math.min(p.max,p.hp+12);beginOmegaReconstruction('sector')}else choose('wave')}}
const evolutionWeaponNames=['パルス','散弾砲','レール','チャージ砲','狙撃銃','ミサイル'];
function evolutionBuild(index){return index===0?pulseBuild(p.up):arsenalBuild(index,p.up);}
function evolutionCards(index){return index===0?pulseCards(p.up):arsenalCards(index,p.up);}
function choose(reason='wave'){
 if(isRiftMode())return;
 if(difficulty==='x'&&reason==='wave'&&[1,3,5].includes(wave)){chooseXMutation();return;}
 const rewardId=++rewardSerial;
 if(weaponPractice()||ultimate.active)return;sniperScope(false);seeker.clearLocks();phaseControl.cancelHold();choiceReason=reason;state='upgrade';input.fire=input.firePressed=false;input.keys={};input.jump=false;input.x=input.y=0;document.exitPointerLock?.();
 if(reason==='wave')p.hp=Math.min(p.max,p.hp+18);
 const shuffle=pool=>{for(let i=pool.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}return pool;};
 const evolutionPool=shuffle(Array.from({length:6},(_,weapon)=>evolutionCards(weapon).map(card=>({weapon,card}))).flat());
 const passivePool=shuffle(upgrades.filter(u=>(p.up[u[0]]||0)<(singleUseAugments.has(u[0])?1:3)));
 offered=[];const shownWeapons=new Set();
 for(const entry of evolutionPool)if(offered.length<2&&!shownWeapons.has(entry.weapon)){offered.push(entry.card);shownWeapons.add(entry.weapon);}
 for(const card of passivePool)if(offered.length<4)offered.push(card);
 for(const entry of evolutionPool)if(offered.length<4&&!offered.includes(entry.card))offered.push(entry.card);
 if(offered.length<4)offered.push(['repair','FIELD REPAIR','応急修復','耐久を全回復。']);
 $('panel').hidden=false;$('paneltag').textContent=reason==='level'?`LEVEL ${p.level} / WEAPON EVOLUTION`:`SECTOR 0${wave} COMPLETE / AUGMENT SELECT`;
 $('paneltitle').textContent=reason==='level'?'レベルアップ。強化を選ぼう。':'次の戦い方を、選べ。';$('paneltext').textContent=(reason==='wave'?'耐久 +18。':'戦闘は一時停止中。')+' ランダムな候補から1枚を選択。武器名と発動条件を確認しよう。';
 $('resume').hidden=$('restart').hidden=$('home').hidden=true;$('choices').innerHTML='';
 const progress=$('pulse-progress');progress.innerHTML='';progress.hidden=true;
 for(const u of offered){
  const pulse=isPulseCard(u[0]),arsenal=isArsenalCard(u[0]),special=pulse||arsenal,index=pulse?0:arsenal?arsenalCardWeapon(u[0]):null,prior=special?evolutionBuild(index):null;
  const preview=special?(index===0?pulseBuild({...p.up,[u[0]]:1}):arsenalBuild(index,{...p.up,[u[0]]:1})):null;
  const b=document.createElement('button');b.dataset.card=u[0];b.setAttribute('aria-label',u[2]+'。'+u[3]);
  if(special){
   b.classList.add('pulse-card');b.dataset.path=index===1||preview.path==='siege'||preview.path==='deadeye'?'lance':'arc';
   const diagram=index===1?'<path d="M12 26h45M57 26l60-18M57 26h67M57 26l60 18M30 13v26"/>':index===5?'<path d="M14 14h65l12 12-12 12H14zM91 26h30M106 14l15 12-15 12"/>':index===4?'<path d="M10 26h120M64 12v28M99 5v42"/><circle cx="99" cy="26" r="15"/>':index===3?'<path d="M12 26h43M85 26h43"/><circle cx="70" cy="26" r="19"/><circle cx="70" cy="26" r="9"/>':preview.path==='lance'||index===2?'<path d="M10 26h120M43 12v28M67 8v36M91 12v28M117 20l10 6-10 6"/>':'<path d="M14 26h55l22-17h27M69 26h48M69 26l22 17h27"/><circle cx="122" cy="9" r="4"/><circle cx="122" cy="26" r="4"/><circle cx="122" cy="43" r="4"/>';
   const friendly=index===0?(u[0]==='pulse_core'?'連射ライフルを強化':u[0]==='pulse_arc'?'電撃がつながるライフル':u[0]==='pulse_lance'?'敵を貫くライフル':preview.path==='arc'?'連鎖ライフル・完成':'貫通ライフル・完成'):evolutionWeaponNames[index]+(preview.tier===3?'・最終強化':preview.tier===1?'を強化':'・'+u[2]);
   b.innerHTML=`<small>${u[1]}</small><span class="augment-target">${evolutionWeaponNames[index]}専用 · 進化 ${preview.tier}/3</span><svg class="evolution-art" viewBox="0 0 140 52" aria-hidden="true">${diagram}</svg><h3>${difficulty==='easy'?friendly:u[2]}</h3><p>${u[3]}</p><span class="evolution-stats">POWER ×${preview.power} · ${preview.mag} ROUNDS · ${preview.tier}/3</span><span class="selecthint">${prior.tier===2?'FINAL EVOLUTION':'EVOLVE '+weapons[index].name.split(' / ')[0]} →</span>`;
  }else{const meta=augmentMeta[u[0]]||{target:'全武器',trigger:'常時効果',detail:u[3]},single=singleUseAugments.has(u[0]),targeted=targetedAugments.has(u[0]);b.classList.add('augment-card');b.dataset.kind=targeted?'weapon':'common';b.innerHTML=`<small>${targeted?'WEAPON MODULE':'COMBAT AUGMENT'} · ${u[1]}</small><span class="augment-target">${meta.target}${single?' · 固有 / 最大1':` · 段階 ${(p.up[u[0]]||0)+1}/3`}</span><h3>${u[2]}</h3><p class="augment-trigger">発動：${meta.trigger}</p><p>${meta.detail}</p><span class="selecthint">${single?'INSTALL / UNIQUE':'INSTALL AUGMENT'} →</span>`;}
  b.onclick=()=>{
   if(state!=='upgrade'||rewardId!==rewardSerial||!offered.includes(u))return;
   if(pulse){if(!installPulseCard(u[0]))return;}else if(arsenal){if(!installArsenalCard(u[0]))return;}else{p.up[u[0]]=(p.up[u[0]]||0)+1;if(u[0]==='capacitor'){notify('CAPACITOR / 移動蓄積 +35%',2)}if(u[0]==='armor'){p.max+=25;p.hp=Math.min(p.max,p.hp+35)}if(u[0]==='repair')p.hp=p.max;}
   offered=[];document.activeElement?.blur();progress.innerHTML='';$('choices').innerHTML='';$('panel').hidden=true;progress.hidden=true;state='playing';p.inv=Math.max(p.inv,.65);if(reason==='wave')rebuildPending=true;if(pendingLevels>0||waveReward)openReward();else if(rebuildPending)beginReconstruction();else lock();
  };$('choices').append(b);
 }
}
function finish(win){if(isRiftMode()){finishOmega(win);return;}if(difficulty==='x'){finishX(win);return;}$('pulse-hud').hidden=true;$('pulse-progress').hidden=true;if(state!=='playing')return;seeker.clearLocks();sniperScope(false);phaseControl.cancelHold();state=win?'victory':'dead';input.fire=false;input.firePressed=false;document.exitPointerLock?.();saved.runs++;if(win){saved.wins++;score+=Math.max(0,3000-Math.round(runTime)*3)}saved.best=Math.max(saved.best,score);try{localStorage.setItem('overdrive-v1',JSON.stringify(saved))}catch{}record();$('panel').hidden=false;$('paneltag').textContent=win?'PROTOCOL COMPLETE':'SIGNAL LOST';$('paneltitle').textContent=win?'限界を、超えた。':'再起動せよ。';$('paneltext').textContent=`${rush.active?`ボス撃破 ${rush.wins}/5 · 失敗 ${rush.misses}/5 / `:win?'WARDEN 撃破 / ':'到達区画 '+wave+' / '}SCORE ${score.toLocaleString()} · ${kills} KILLS · ${Math.floor(runTime/60)}:${String(Math.floor(runTime%60)).padStart(2,'0')} / SEED ${seed}`;$('choices').innerHTML='';$('resume').hidden=true;$('restart').hidden=false;$('home').hidden=false}
function pause(){ $('pulse-progress').hidden=true;if(!['playing','rebuilding'].includes(state))return;resumeState=state;seeker.clearLocks();sniperScope(false);ultimate.pause();phaseControl.cancelHold();state='paused';input.fire=false;input.firePressed=false;input.keys={};input.jump=false;input.x=input.y=0;document.exitPointerLock?.();$('panel').hidden=false;$('paneltag').textContent='SYSTEM SUSPENDED';$('paneltitle').textContent='一時停止';$('paneltext').textContent='移動して熱量を維持。ダッシュ中は無敵。回復片は近づくと吸収。光る床はジャンプ台。';$('choices').innerHTML='';$('resume').hidden=false;$('restart').hidden=true;$('home').hidden=false}
$('rebuild-skip').onclick=()=>{if(state==='rebuilding'){document.activeElement?.blur();world.skip();}};
$('start').onclick=begin;$('restart').onclick=begin;$('pause').onclick=pause;$('resume').onclick=()=>{document.activeElement?.blur();state=resumeState;$('panel').hidden=true;input.fire=false;input.firePressed=false;lock()};$('home').onclick=()=>{bossLoadToken++;world.clearBossArena?.();if(rush.active){clearObjects(enemies);clearObjects(bullets);clearObjects(hazards);bossRef=null;spawnQueue=[];rush.reset();}resetKinetic();clearOmegaRaidTargets();omegaRaid.active=false;raidStarted=false;if(isRiftMode()){clearObjects(enemies);clearObjects(bullets);clearObjects(hazards);spawnQueue=[];bossRef=null;}omegaCombat.reset();omegaVisuals.reset();$('omega-hud').hidden=true;document.body.classList.remove('omega-mode','fracture-mode');xEffects.setActive(false);document.body.classList.remove('x-mode','x-breaking','x-critical','x-ready');hideXHUD();if(difficulty==='x'){clearObjects(enemies);clearObjects(bullets);clearObjects(hazards);spawnQueue=[];bossRef=null;}xChronarch.reset();resetArsenal();if(weaponPractice())clearObjects(enemies);resetTutorialState();seeker.reset();seekerModel.root.visible=false;ultimate.reset();phaseControl.reset();phaseModel.update(0);document.body.classList.remove('phase-active');state='menu';pulseResonance.reset();pulseEffects.reset();pulseModel.configure(pulseBuild());$('pulse-hud').hidden=true;document.body.classList.remove('reconstructing','underwater');world.setWave(1,difficulty==='easy');rebuildPending=false;$('rebuild').hidden=true;$('panel').hidden=true;$('hud').hidden=true;$('menu').hidden=false;syncDifficultyPreview();syncXPreview();syncOmegaPreview()};$('quality').addEventListener('change',()=>{quality();const frame=$('titan-frame');if(!frame.hidden)frame.contentWindow?.postMessage({type:'overdrive:set-quality',quality:$('quality').value},'*')});
window.addEventListener('keydown',e=>{if(weaponPractice()&&!mobile&&state==='playing'&&['Enter','Tab'].includes(e.code)){e.preventDefault();if(e.repeat)return;if(e.code==='Enter')nextWeaponLesson();else{document.exitPointerLock?.();input.fire=input.firePressed=false;phaseControl.cancelHold();$('tutorial-skip').focus?.();}return;}if(e.code==='Escape'){pause();return}if(state!=='playing'||mobile)return;if(e.code==='KeyF'&&difficulty==='fracture'){e.preventDefault();if(!e.repeat)pressKinetic();return;}if(e.code==='KeyE'&&isRiftMode()){e.preventDefault();if(!e.repeat)extractOmegaRaid();return;}if(e.code==='KeyQ'&&isRiftMode()){e.preventDefault();if(!e.repeat)rerollOmegaRaidWeapon();return;}if(isRiftMode()&&/^Digit[1-7]$/.test(e.code)){e.preventDefault();if(!e.repeat){omegaEquipWeapon(Number(e.code.slice(-1))-1);notify('WEAPON / '+omegaWeaponName(p.weapon),1.1);}return;}if(e.code==='KeyQ'&&difficulty==='x'){e.preventDefault();if(!e.repeat)activateXBreak();return;}if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();input.keys[e.code]=true;if(e.code==='Space')input.jump=true;if(e.repeat)return;if(e.code==='Space'&&!p?.swimming)jump();if(e.code==='ShiftLeft'||e.code==='ShiftRight')dash();if(e.code==='KeyC')slide();if(e.code==='KeyR')reload();if(/^Digit[1-6]$/.test(e.code))swap(Number(e.code.slice(-1))-1)});window.addEventListener('keyup',e=>{input.keys[e.code]=false;if(e.code==='Space')input.jump=false;if(e.code==='KeyC'||e.code==='ControlLeft')input.dive=false});window.addEventListener('mousemove',e=>{if(document.pointerLockElement&&state==='playing'&&!(tutorialActive&&!mobile&&tutorialStage===0)){const sensitivity=.0022*Number($('sensitivity').value)*(sniperAim&&p.weapon===4?(sniperZoom===6?.22:.42):1);yaw-=e.movementX*sensitivity;pitch=clamp(pitch-e.movementY*sensitivity,-1.35,1.35)}});$('game').addEventListener('mousedown',e=>{if(state!=='playing'||mobile)return;if(e.button===2){sniperScope(true);return}if(e.button===0){input.fire=true;input.firePressed=true;lock()}});window.addEventListener('mouseup',e=>{if(e.button===2)sniperScope(false);if(e.button===0)input.fire=false});window.addEventListener('wheel',e=>{if(state==='playing'&&!mobile&&p?.weapon===4&&sniperAim){e.preventDefault();sniperZoom=e.deltaY<0?6:3;$('sniper-scope').dataset.zoom=String(sniperZoom);$('scope-zoom').textContent=sniperZoom+'×'}},{passive:false});document.addEventListener('pointerlockchange',()=>{if(!document.pointerLockElement&&!mobile&&state==='playing'&&!weaponPractice())pause()});window.addEventListener('blur',pause);document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()});$('game').addEventListener('webglcontextlost',e=>{e.preventDefault();pause();$('paneltext').textContent='描画コンテキストが失われました。ページを再読み込みしてください。'});window.addEventListener('contextmenu',e=>e.preventDefault());
function bindHold(id,down,up=()=>{}){let el=$(id);el.addEventListener('pointerdown',e=>{e.preventDefault();el.setPointerCapture(e.pointerId);down(e)});el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up)}bindHold('fire',e=>{input.fire=true;input.firePressed=true;lookId=e.pointerId;lastX=e.clientX;lastY=e.clientY},e=>{input.fire=false;if(e.type==='pointercancel'){input.firePressed=false;phaseControl.cancelHold();}lookId=null});bindHold('jump',()=>{input.jump=true;if(!p?.swimming)jump()},()=>{input.jump=false});bindHold('dash',dash);bindHold('slide',()=>{if(p?.swimming)input.dive=true;else slide()},()=>{input.dive=false});bindHold('swap',()=>swap(p.weapon+1));bindHold('reload',reload);
let stickId=null,lookId=null,lastX=0,lastY=0,lookStartX=0,lookStartY=0,lookStartTime=0,lookTravel=0;bindHold('stick',e=>{stickId=e.pointerId;stickMove(e)},()=>{stickId=null;input.x=input.y=0;$('stick').firstElementChild.style.transform=''});function stickMove(e){if(e.pointerId!==stickId)return;let r=$('stick').getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/42,y=(e.clientY-r.top-r.height/2)/42,l=Math.max(1,Math.hypot(x,y));input.x=x/l;input.y=y/l;$('stick').firstElementChild.style.transform=`translate(${input.x*34}px,${input.y*34}px)`}$('stick').addEventListener('pointermove',stickMove);bindHold('lookzone',e=>{lookId=e.pointerId;lastX=lookStartX=e.clientX;lastY=lookStartY=e.clientY;lookTravel=0;lookStartTime=performance.now()},e=>{if(e.type==='pointerup'&&p?.weapon===4&&lookTravel<10&&performance.now()-lookStartTime<260)cycleSniperScope();lookId=null});function lookMove(e){if(e.pointerId!==lookId||state!=='playing')return;lookTravel=Math.max(lookTravel,Math.hypot(e.clientX-lookStartX,e.clientY-lookStartY));let sensitivity=.004*Number($('sensitivity').value)*(sniperAim&&p.weapon===4?(sniperZoom===6?.22:.42):1);yaw-=(e.clientX-lastX)*sensitivity;pitch=clamp(pitch-(e.clientY-lastY)*sensitivity,-1.35,1.35);lastX=e.clientX;lastY=e.clientY} $('lookzone').addEventListener('pointermove',lookMove);$('fire').addEventListener('pointermove',lookMove);
function resize(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()}window.addEventListener('resize',resize);resize();
const radar=$('radar').getContext('2d');function drawRadar(){radar.clearRect(0,0,256,256);radar.strokeStyle='#3c6877';radar.beginPath();radar.arc(128,128,110,0,Math.PI*2);radar.stroke();if(terrainStage()>1){radar.save();radar.beginPath();radar.arc(128,128,107,0,Math.PI*2);radar.clip();const plan=world.radar();for(const cell of plan.cells){const dx=cell.x-p.x,dz=cell.z-p.z,rx=Math.cos(yaw)*dx-Math.sin(yaw)*dz,rz=Math.sin(yaw)*dx+Math.cos(yaw)*dz;radar.fillStyle=cell.h>2?'#7594ab88':'#477b8866';radar.fillRect(125+rx*1.7,125+rz*1.7,6.2,6.2)}for(const wall of plan.walls){if(wall.destroyed)continue;radar.fillStyle='#e0b96b';radar.beginPath();for(const [i,sx,sz] of [[0,-1,-1],[1,1,-1],[2,1,1],[3,-1,1]]){const dx=wall.x+sx*wall.w/2-p.x,dz=wall.z+sz*wall.d/2-p.z,rx=Math.cos(yaw)*dx-Math.sin(yaw)*dz,rz=Math.sin(yaw)*dx+Math.cos(yaw)*dz;if(i===0)radar.moveTo(128+rx*1.7,128+rz*1.7);else radar.lineTo(128+rx*1.7,128+rz*1.7);}radar.closePath();radar.fill();}for(const pad of plan.pads){const dx=pad.x-p.x,dz=pad.z-p.z,rx=Math.cos(yaw)*dx-Math.sin(yaw)*dz,rz=Math.sin(yaw)*dx+Math.cos(yaw)*dz;radar.fillStyle='#8affdc';radar.fillRect(126+rx*1.7,126+rz*1.7,4,4)}radar.restore();}for(const e of enemies){let dx=e.mesh.position.x-p.x,dz=e.mesh.position.z-p.z;let rx=Math.cos(yaw)*dx-Math.sin(yaw)*dz,rz=Math.sin(yaw)*dx+Math.cos(yaw)*dz;let scale=Math.min(1.7,106/Math.max(1,Math.hypot(rx,rz)));radar.fillStyle=e.omegaObjective?'#8affdf':e.omegaHunt?'#ffe0a6':e.xSeal?'#fff0d4':e.type==='boss'?'#ffc76e':'#ff7b79';radar.fillRect(124+rx*scale,124+rz*scale,8,8)}radar.fillStyle='#8affda';radar.beginPath();radar.moveTo(128,114);radar.lineTo(120,136);radar.lineTo(136,136);radar.fill()}
const enemyLabels={chaser:'RIPPER / 近接・高速',shooter:'ARTILLERIST / 三方向射撃',strafer:'WISP / 浮遊・横移動',charger:'RAM / 予告突進',boss:'WARDEN / コア露出を狙え'};
function drawTarget(){document.body.classList.toggle('point-blank-ready',!!p?.up?.pointblank&&p.weapon===1&&enemies.some(e=>e.hp>0&&e.mesh.position.distanceTo(camera.position)<=6&&e.mesh.position.clone().sub(camera.position).normalize().dot(new T.Vector3(0,0,-1).applyQuaternion(camera.quaternion))>.94));const forward=new T.Vector3(0,0,-1).applyQuaternion(camera.quaternion);let target=null,dist=65;for(const e of enemies){if(e.hp<=0)continue;if(e.bossVisual){const hit=traceEnemyRay(e,camera.position,forward,dist);if(hit){target=e;dist=hit.distance;}continue;}let offset=e.mesh.position.clone().sub(camera.position),along=offset.dot(forward);if(along>0&&along<dist&&offset.clone().addScaledVector(forward,-along).length()<e.r*1.25){target=e;dist=along}}if(target){ray.set(camera.position,forward);const hit=ray.intersectObjects(arena.children,false)[0];if(hit&&hit.distance<dist-(target.bossVisual?.03:target.r))target=null}$('target').hidden=!target;if(target){$('targetname').textContent=target.xSeal?'TIME SEAL / 破壊で +4s':target.xChronarch?(xChronarch.mode==='open'?'CHRONARCH / CORE OPEN':'CHRONARCH / 先に封印を破壊'):target.xBounty?`TIME CARRIER / 撃破 +${xDirector.owns('bounty')?9:6}s`:target.rushId?rush.current.name:(target.omegaObjective?'封鎖装置 / 撃って破壊':enemyLabels[target.type]);$('targethp').style.width=100*target.hp/target.max+'%'}}
let last=performance.now();function frame(now){requestAnimationFrame(frame);if(state==='titan')return;let dt=Math.min((now-last)/1000,.15);last=now;clock+=dt;if(state==='playing'&&tutorialActive){tutorialCardTime=Math.max(0,tutorialCardTime-dt);if(tutorialCardTime===0)$('tutorial').classList.add('compact');}
if(state==='playing'){
 const wasUltimate=ultimate.active;
 const charge=phaseActive()&&p.ammo[3]>=24&&phaseControl.charging?phaseControl.progress:0;
 ultimate.update(dt,{playing:true,charge,low:mobile||$('quality').value==='low',origin:phaseModel.muzzle.getWorldPosition(new T.Vector3())});
 if(wasUltimate&&!ultimate.active){
  input.fire=false;input.firePressed=false;input.keys={};input.jump=false;input.x=input.y=0;p.exhaust=0;
  for(const item of pickups)if(item.life>0)collectOrb(item);clearObjects(pickups);
  if(!isRiftMode()&&!rush.active&&wave===6&&!enemies.some(e=>e.hp>0)&&!spawnQueue.length)finish(true);
 }
}
$('rebuild-skip').hidden=state!=='rebuilding';if(world.update(dt,clock,state==='rebuilding')){document.body.classList.remove('reconstructing');$('rebuild').hidden=true;$('rebuild-skip').hidden=true;state='playing';input.fire=input.firePressed=false;input.keys={};input.jump=false;input.dive=false;input.x=input.y=0;if(omegaShiftPending){omegaShiftPending=false;omegaShiftKind='';omegaNextLayout=null;omegaShiftTimer=0;wave=Math.min(6,omegaRaid.cores+1);omegaRepositionSurvivors();omegaEquipWeapon(omegaDraftOptions()[0]);startOmegaRaid();}else if(waveShiftTransition){waveShiftTransition=false;completeWaveShift();}else if(rushTransition){rushTransition=false;startRushRound();}else nextWave();lock();}if(state==='rebuilding'||state==='paused'&&resumeState==='rebuilding'){const progress=world.progress();$('rebuild-title').textContent=difficulty==='easy'?`ステージ ${progress.target} / 6`:progress.theme;$('rebuild-progress').style.width=(100*progress.age/progress.duration)+'%';$('rebuild-phase').textContent=progress.phase;$('rebuild-rule').textContent=world.rule();}
for(let i=1;i<6;i++)(i<3?heavyEvolution:specialEvolution).configure(i,arsenalBuild(i,p?.up));
 const evolutionFrame={weapon:p?.weapon??-1,time:clock,reduced:reducedMotion,low:mobile||$('quality').value==='low',playing:state==='playing'&&!ultimate.active};heavyEvolution.update(dt,evolutionFrame);specialEvolution.update(dt,evolutionFrame);
 pulseEffects.update(dt,state==='playing');if(state==='playing'){pulseResonance.update(dt);pulseResonance.sync(pulseBuild(p.up));}
if(state==='playing'&&pulseCoreMaterial&&p&&!phaseActive()){let nearest=Infinity;const forward=new T.Vector3(0,0,-1).applyQuaternion(camera.quaternion);for(const e of enemies){if(e.hp<=0)continue;const to=e.mesh.position.clone().sub(camera.position),along=to.dot(forward);if(along>0&&along<nearest&&to.addScaledVector(forward,-along).length()<e.r*1.4)nearest=along}ray.set(camera.position,forward);const cover=ray.intersectObjects(arena.children,false)[0];if(cover&&cover.distance<nearest)nearest=Infinity;const band=pulseBand();const glow=nearest===Infinity?0x467a85:nearest>=band.peakStart+2&&nearest<=band.peakEnd?0x77ffe0:nearest<band.peakStart?0xffa16f:0x80adff;pulseCoreMaterial.color.setHex(glow);pulseCoreMaterial.emissive.setHex(glow);pulseModel.coreMaterial.color.setHex(glow);pulseModel.coreMaterial.emissive.setHex(glow)}if(state==='playing'){const steps=Math.ceil(dt/.016)||1;for(let step=0;step<steps&&state==='playing';step++)update(dt/steps)}else if(state==='menu'){camera.position.set(Math.sin(clock*.08)*16,9,Math.cos(clock*.08)*16);camera.lookAt(0,1,0)}
if(state==='playing'){for(let i=fx.length-1;i>=0;i--){let f=fx[i];f.life-=dt;if(f.vel){f.mesh.position.addScaledVector(f.vel,dt);f.vel.y-=dt*10;if(!f.casing)f.mesh.scale.multiplyScalar(Math.exp(-2.4*dt));if(f.spin)f.mesh.rotateZ(f.spin*dt)}if(f.nova){const t=1-f.life/f.max;f.mesh.scale.setScalar(.3+t*f.radius);f.mesh.traverse(o=>{if(o.material)o.material.opacity=(1-t)*(o.userData.alpha||.7)});f.mesh.rotation.y+=dt*.3;}if(f.ripple)f.mesh.scale.setScalar(1+(1-f.life/f.max)*1.8);if(f.ringPulse){const t=1-f.life/f.max;f.mesh.scale.setScalar(1+t*13);f.mesh.material.opacity=.8*(1-t)}if(f.life<=0){scene.remove(f.mesh);if(f.owned)f.mesh.traverse(o=>{if(o.material)o.material.dispose()});fx.splice(i,1)}}noticeTimer-=dt;if(noticeTimer<=0)$('notice').textContent='';hitTime-=dt;hurtTime-=dt;recoil=Math.max(0,recoil-dt*.7);viewKick=Math.max(0,viewKick-dt*.22);shotFlash=Math.max(0,shotFlash-dt);muzzle.position.copy(armory.muzzles[Math.min(2,p.weapon)].position);muzzle.visible=shotFlash>0&&!phaseActive()&&p.weapon<3;const flashSize=p.weapon===1?1.1:p.weapon===2?.65:p.weapon===0&&pulseBuild(p.up).tier?(pulseResonance.flash>0?1.5:pulseBuild(p.up).tier===3?.9:.7):.55;muzzle.scale.set(flashSize,flashSize,flashSize);flashMaterial.opacity=clamp(shotFlash*12,0,.85);swapAnim=Math.max(0,swapAnim-dt);const phase=phaseActive();document.body.classList.toggle('phase-active',phase);phaseModel.update(dt,{active:phase,charge:phaseControl.progress,flash:shotFlash,time:clock,low:mobile||$('quality').value==='low'});gunModels.forEach((g,i)=>g.visible=!phase&&p.weapon<3&&i===p.weapon);seekerModel.update(dt,{active:p.weapon===5,mobile,ammo:p.ammo[5],cellCursor:seeker.metrics().shots%3,locks:seeker.metrics().ready,recoil,reload:p.reload>0?clamp(1-p.reload/(reloadDuration(5)),.001,1):0,swap:swapAnim,time:clock});phantomLance.update(dt,{active:p.weapon===4,aim:sniperAim,zoom:sniperZoom,reload:p.reload,kick:p.weapon===4?recoil:0});const reloadPhase=p.reload>0?Math.sin(Math.PI*p.reload/reloadDuration()):0;if(p.weapon<3){mechanisms[p.weapon].position.z=recoil*(p.weapon===1?1.4:1)+reloadPhase*.1;mechanisms[p.weapon].position.y=-reloadPhase*.12;}armory.magazines.forEach((mag,i)=>{mag.position.y=i===p.weapon?-reloadPhase*.22:0;mag.rotation.x=i===p.weapon?reloadPhase*.3:0});armory.coils.forEach((c,i)=>{c.material.emissiveIntensity=1.1+Math.max(0,1-p.cool/weapons[2].rate)*.4+(p.weapon===2?shotFlash*15:0)+Math.max(0,Math.sin(clock*5-i*.7))*.2});pulseCoreMaterial.emissiveIntensity=1.1+shotFlash*10;updatePulsePresentation(dt,reloadPhase);poseGun();$('cross').hidden=sniperAim&&p.weapon===4;$('cross').style.transform=`translate(-50%,-50%) scale(${1+recoil*4+phaseControl.progress*.4})`;drawRadar();drawTarget();$('level').textContent=`LV ${p.level} / ${p.xp} : ${p.xpNeed} XP`;$('xpbar').style.width=100*p.xp/p.xpNeed+'%';$('healthlabel').textContent=difficulty==='easy'?'体力':'INTEGRITY';$('health').textContent=Math.ceil(p.hp);$('hpbar').style.width=100*p.hp/p.max+'%';$('drivebar').style.width=p.charge+'%';$('drivelabel').textContent=difficulty==='easy'?(p.over>0?'強化中 / '+p.over.toFixed(1)+'秒':'移動ゲージ'):(p.over>0?'OVERDRIVE / '+p.over.toFixed(1)+'s':'KINETIC CHARGE');$('dashstatus').textContent=difficulty==='easy'?(p.dash<=0?'ダッシュできます':'ダッシュ / '+p.dash.toFixed(1)+'秒'):(p.dash<=0?'DASH READY':'DASH / '+p.dash.toFixed(1)+'s');const easyWeaponNames=['連射ライフル','近距離ショットガン','貫通ライフル','チャージ砲','スナイパーライフル','追尾ミサイル'];$('weaponname').textContent=isRiftMode()&&p.weapon===6?`Ω / ${currentOmega().coreName||currentOmega().coreId}`:difficulty==='easy'?(phase?'チャージ砲':easyWeaponNames[p.weapon]):phase?(mobile?'アストラ・ヴァンタ':'ASTRA × VANTA / 位相変形砲'):(mobile?weapons[p.weapon].name.split(' / ')[1]:`0${p.weapon+1} / ${weapons[p.weapon].name}`);if(p.weapon===0&&pulseBuild(p.up).tier){const b=pulseBuild(p.up);$('weaponname').textContent=difficulty==='easy'?`連射ライフル / ${b.tier===1?'強化':b.path==='arc'?'連鎖':'貫通'}${b.tier===3?'・完成':''}`:mobile?`パルス / ${b.label.split(' / ')[1]||b.label}`:`01 / PULSE · ${b.label}`;}
if(p.weapon>0&&p.weapon<6&&arsenalBuild(p.weapon,p.up).tier){const b=arsenalBuild(p.weapon,p.up);$('weaponname').textContent+=(difficulty==='easy'?` / 強化${b.tier}${b.tier===3?'・完成':''}`:` / ${mobile?(b.label.split(' / ')[1]||b.label):b.label}`);}
 $('scope-name').textContent=difficulty==='easy'?'スナイパーライフル':'PHANTOM LANCE';$('ammo').textContent=tutorialActive&&!weaponPractice()?'∞':p.ammo[p.weapon];$('reloadstatus').textContent=phase?(phaseControl.charging?(phaseControl.cost>=24?'EXPLOSION / ':phaseControl.cost>=10?'NOVA / ':'CHARGE / ')+phaseControl.cost+'発 · '+Math.round(phaseControl.progress*100)+'%':p.ammo[3]<=0?'移動して弾を補充':(mobile?'長押し→離して発射':'長押し→離して発射 / R 自動')):(p.reload>0?'RELOADING':p.weapon===4?(p.ammo[4]?'1 ROUND / CORE ×2.2':'EMPTY / FIRE OR R RELOAD'):p.weapon===5?(seeker.metrics().ready?`LOCK ${seeker.metrics().ready} / 3`:'SEEK / HOLD AIM'):'∞ RESERVE');$('reload').querySelector('span').textContent=phase?'チャージ':p.weapon===4?'装填':'リロード';$('reload').setAttribute('aria-label',phase?'チャージ砲を発射':p.weapon===4?'ファントム・ランスを装填':'リロード');$('enemycount').textContent=isRiftMode()?`${enemies.filter(e=>e.hp>0&&!e.omegaObjective).length} HOSTILES / ${score} PTS`:weaponPractice()?`練習中 / 敵 ${enemies.filter(e=>e.hp>0).length}`:difficulty==='easy'?`敵 ${enemies.length+spawnQueue.length} / スコア ${score}`:`${enemies.length+spawnQueue.length} HOSTILES / ${score} PTS`;$('boss').hidden=!bossRef||bossRef.hp<=0;if(rush.active&&bossRef)$('boss').querySelector('small').textContent=`${rush.current.name} · ${Math.ceil(rush.remaining)}秒 · 撃破 ${rush.wins}/5 · 失敗 ${rush.misses}/5`;if(bossRef)$('boss').querySelector('i').style.width=Math.max(0,100*bossRef.hp/bossRef.max)+'%';$('hurt').style.opacity=Math.max(0,hurtTime)*2;$('hit').style.opacity=hitTime>0?1:0}gun.visible=(!isRiftMode()||p?.weapon!==6)&&state!=='menu'&&state!=='rebuilding'&&!(state==='paused'&&resumeState==='rebuilding');if(state==='menu'){seekerModel.root.visible=false;phantomLance.root.visible=false;}drawSeeker();
if(ultimate.active){camera.position.set(p.x,p.y+1.65,p.z);camera.rotation.set(pitch+viewKick,yaw,0);camera.fov=78;ultimate.applyCamera(camera);}
if(state==='rebuilding'||state==='paused'&&resumeState==='rebuilding')world.cinematic(camera);drawOmegaHUD(dt);drawOmegaRaidHUD(dt);drawKineticHUD(dt);world.updateFracture(dt,state==='playing');drawXHUD(dt);xEffects.update(dt,{playing:state==='playing',breaking:xDirector.breaking,player:p,time:clock,low:mobile||$('quality').value==='low',reduced:reducedMotion});const far=terrainStage()>=7?650:400;if(camera.far!==far){camera.far=far;camera.updateProjectionMatrix();}renderer.render(scene,camera)}requestAnimationFrame(frame);
// Read-only diagnostics are always available; mutation hooks only under explicit test flag.
window.overdrive={bossAssetsReady:prepareRushAssets,snapshot:()=>({omega:isRiftMode()?{kinetic:difficulty==='fracture'?{...kinetic.snapshot(),captured:kineticCaptured,returned:kineticReturned}:null,kineticVisuals:difficulty==='fracture'?kineticVisuals.stats():null,descriptor:omegaDescriptor,build:currentOmega(),rank:omegaRank,combat:omegaCombat.stats(),model:omegaVisuals.stats(),weapon:p?.weapon,shiftIn:Math.max(0,20-omegaShiftTimer),shiftPending:omegaShiftPending,seen:[...omegaGunSeen],queuedEnemies:[...spawnQueue],raid:omegaRaid.snapshot(),raidTargets:raidTargets.map(t=>({id:t.id,kind:t.kind,x:t.root.position.x,y:t.root.position.y,z:t.root.position.z,done:t.done,active:t.active})),raidVisuals:raidVisuals.stats()}:null,xMode:difficulty==='x'?{...xDirector.snapshot(),chronarch:xChronarch.snapshot(),bossModel:xChronarchModel.stats(),signature:xStartWeapon,reflected:xReflected,failure:xFailure,effects:xEffects.snapshot()}:null,waveShift:waveShift.snapshot(),bossRush:rush.snapshot(),arsenal:p?Array.from({length:5},(_,i)=>arsenalBuild(i+1,p.up)):[],arsenalCombat:arsenalCombat.stats(),heavyEvolution:heavyEvolution.stats(),specialEvolution:specialEvolution.stats(),state,mobile,difficulty,world:world.snapshot(),spectacle:normalSpectacle.visible,spectacleRotation:normalSpectacle.rotation.y,tutorialActive,tutorialStage,tutorialRouteStep:tutorialMoveIndex,weaponTraining:weaponPractice()?{index:weaponTraining.index,eliminations:weaponTraining.eliminations,title:weaponTraining.lesson.title,targets:enemies.filter(e=>e.practiceTarget&&e.hp>0).length}:null,tutorialMarker:tutorialMarker.visible,tutorialTargetHP:tutorialTarget?.hp??null,padCount:pads.length,easyCombo,wave,score,kills,level:p?.level,xp:p?.xp,xpNeed:p?.xpNeed,pendingLevels,choiceReason,pickups:pickups.length,runTime,grounded:p?.grounded,swimming:!!p?.swimming,forcedUnderwater:!!p?.forcedUnderwater,leviathanDive:leviathanDive?{elapsed:leviathanDive.elapsed,duration:leviathanDive.duration}:null,floatCharge:p?.floatCharge,accelTime:p?.accelTime,liftId:p?.liftId,over:p?.over,hp:p?.hp,position:p?{x:p.x,y:p.y,z:p.z}:null,enemies:enemies.length,queue:spawnQueue.length,cool:p?.cool,reloading:p?.reload,pulseCoreColor:pulseCoreMaterial?pulseCoreMaterial.color.getHex():null,reloadPose:gun?{z:gun.rotation.z,y:gun.position.y}:null,pulse:p?pulseResonance.snapshot(pulseBuild(p.up)):null,pulseModel:pulseModel.stats(),pulseEffects:pulseEffects.stats(),weapon:p?.weapon,sniperAim,sniperZoom,phaseActive:phaseActive(),phaseCharge:phaseControl.progress,ultimateActive:ultimate.active,ultimateAge:ultimate.age,ultimateKills:ultimate.kills,ultimateMetrics:ultimate.metrics,activeEnemies:enemies.filter(e=>e.hp>0).length,phaseShots,phaseBeams,novaShots,phaseSpent,phaseVisible:phaseModel.root.visible,exhaust:p?.exhaust||0,explosionShots,phaseMuzzle:phaseModel.muzzle.getWorldPosition(new T.Vector3()).toArray(),ammo:p?.ammo,weaponMags:[...weapons.map((_,i)=>magSize(i)),...(isRiftMode()?[magSize(6)]:[])],pulseBand:p?pulseBand():null,upgrades:p?.up,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,fx:fx.length,seeker:seeker.metrics(),seekerVisible:seekerModel.root.visible,seekerModel:seekerModel.stats(),casingCount:fx.filter(f=>f.casing).length})};
if(new URLSearchParams(location.search).has('test'))window.overdrive.test={
 kinetic:()=>kinetic,kineticPress:pressKinetic,coverSnapshot:world.coverSnapshot,coverDamage:world.damageCover,coverBlast:world.breakCoverNear,omegaCombat:()=>omegaCombat,omegaGun:()=>omegaVisuals,raidDirector:()=>omegaRaid,raidTargets:()=>raidTargets,raidStart:startOmegaRaid,raidTick:updateOmegaRaid,raidReroll:rerollOmegaRaidWeapon,raidExtract:extractOmegaRaid,omegaEncounter:composeOmegaEncounter,omegaRemix:remixOmegaQueue,omegaDescriptor:d=>{omegaDescriptor={...omegaDescriptor,...d};refreshOmegaWeapon();},omegaShift:()=>beginOmegaReconstruction('cycle'),omegaOptions:omegaDraftOptions,omegaSelect:omegaSelectWeapon,
 xChronarch:()=>xChronarch,xHazards:()=>hazards,xDirector:()=>xDirector,xBreak:activateXBreak,xMutation:id=>xDirector.install(id),xBullets:()=>bullets,xProjectile:projectile,installArsenalCard,arsenalBuild:()=>arsenalBuild(p.weapon,p.up),arsenalVisuals:()=>({heavy:heavyEvolution,special:specialEvolution}),
 rebuildPreview:seconds=>world.update(seconds,clock,true),view:()=>({yaw,pitch,camera:camera.position.toArray(),rotation:camera.rotation.toArray()}),setStage:n=>{wave=n;world.setWave(n,difficulty==='easy');const entry=world.entry();Object.assign(p,{x:entry.x,y:entry.y,z:entry.z,vy:0,grounded:true,swimming:false});yaw=entry.yaw??Math.atan2(entry.x,entry.z);pitch=viewKick=0;camera.position.set(p.x,p.y+1.65,p.z);camera.rotation.set(pitch+viewKick,yaw,0)},
 stageTargetRay:(origin,direction)=>{arena.updateWorldMatrix(true,true);ray.set(new T.Vector3(...origin),new T.Vector3(...direction));return stageGimmicks.handleRayHits(ray.intersectObjects(arena.children,false),enemies,bossRef)},
 stageGimmicks:()=>stageGimmicks.snapshot(),
 holdSpawns:()=>{spawnTimer=9999},setOmegaQueue:queue=>{spawnQueue=[...queue]},stageHeight:world.heightAt,stagePath:world.path,stageSurface:stageGimmicks.surfaceAt,
 shiftClock:dt=>{waveShift.elapsed+=dt;},rushEnemies:()=>enemies,rushResolve:resolveRush,rushBoss:()=>bossRef,rushAttack:beginRushAttack,rushStart:id=>{wave=6;clearObjects(enemies);clearObjects(bullets);clearObjects(hazards);spawnQueue=[];rush.start(difficulty==='easy');if(id){const spec=BOSSES.find(item=>item.id===id);if(!spec)throw Error('Unknown boss '+id);rush.current=spec;}world.setBossArena?.(rush.current.id);world.setWave(6,false);if(bossAssetsReady)startRushRound();else waitRushAssets();},rushDirector:()=>rush,rushClock:dt=>rush.tick(dt),damagePlayer:hurt,killWave:()=>{spawnQueue=[];for(const e of [...enemies])damage(e,100000)},hurt:n=>{p.inv=0;hurt(n)},gainXP,openReward,collectOrb,
 pulseModel:()=>pulseModel,pulseRoot:()=>gunModels[0],installPulseCard,pulseBuild:()=>pulseBuild(p.up),spawn,shoot,firePhase,choose,rawHurt:hurt,dash,jump,
 advance:()=>{wave=5;clearObjects(enemies);spawnQueue=[];nextWave()},set:values=>Object.assign(p,values),setInput:values=>Object.assign(input,values),
 aim:(x,y,z)=>{camera.lookAt(x,y,z);yaw=camera.rotation.y;pitch=camera.rotation.x},update,damage,weapon:swap,pulseDamageAt,magSize,sniperScope,cycleSniperScope,
 tutorialSet,startWeaponPractice,nextWeaponLesson,practiceTargets:()=>enemies.filter(e=>e.practiceTarget&&e.hp>0),tutorialTarget:()=>tutorialTarget,
 seekerDiagnostics:()=>seeker.diagnostics(),seekerWallDistance,seekerModel:()=>seekerModel,clearEnemies:()=>{clearObjects(enemies);spawnQueue=[]},pause
}

// Begin normal gameplay immediately, load embedded models while the campaign runs.
let bossAssetsPromise=null,bossAssetsReady=false,bossLoadToken=0;
function prepareRushAssets(){
 if(bossAssetsReady)return Promise.resolve();
 if(!bossAssetsPromise)bossAssetsPromise=preloadBossModels().then(()=>{bossAssetsReady=true;}).catch(error=>{bossAssetsPromise=null;throw error;});
 return bossAssetsPromise;
}
function waitRushAssets(){
 const token=++bossLoadToken;state='loading';$('panel').hidden=false;$('paneltag').textContent='BOSS ENCOUNTER';$('paneltitle').textContent='ボスを準備中…';$('paneltext').textContent='';$('choices').innerHTML='';$('resume').hidden=$('restart').hidden=true;$('home').hidden=false;
 prepareRushAssets().then(()=>{if(token!==bossLoadToken||state!=='loading')return;$('panel').hidden=true;startRushRound();}).catch(error=>{if(token!==bossLoadToken||state!=='loading')return;console.warn('Boss asset loading failed',error);$('paneltitle').textContent='ボスの準備を再試行';$('paneltext').textContent='再試行すると、この区画から再開します。';const button=document.createElement('button');button.textContent='再試行';button.onclick=()=>{if(state==='loading')waitRushAssets();};$('choices').append(button);});
}
function rushModel(e,spec){
 const old=e.mesh,visual=createBossModel(spec.id);scene.remove(old);
 visual.root.name='BOSS_MODEL_'+spec.id;visual.root.position.copy(old.position);visual.root.userData.bossId=spec.id;scene.add(visual.root);
 e.mesh=visual.root;e.core=visual.core;e.limbs=visual.limbs||[];e.bossVisual=visual;e.hitTargets=visual.hitTargets;e.r=Math.min(4,Math.max(2.2,visual.metrics?.radius||2.2));e.facing=0;e.bossAction=null;
}
function rushSpawnPoint(radius=.8){
 const plan=world.radar(),valid=(plan.reachableNodes||plan.nodes).filter(c=>!plan.blocked(c.x,c.z,radius)&&Math.hypot(c.x-p.x,c.z-p.z)>=12);
 const reachable=valid;
 const preferred=reachable.filter(c=>Math.hypot(c.x-p.x,c.z-p.z)<=22);
 const pool=preferred.length?preferred:reachable.sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z)).slice(0,12);
 const separated=pool.filter(c=>enemies.every(e=>e.hp<=0||Math.hypot(c.x-e.mesh.position.x,c.z-e.mesh.position.z)>radius+e.r+1));
 const candidates=separated.length?separated:pool;const c=candidates[Math.floor(random()*candidates.length)];
 if(!c)throw new Error('No safe boss-rush spawn');return c;
}
function startRushRound(){
 leviathanDive=null;waveShift.reset();viewKick=0;const entry=world.entry();Object.assign(p,{x:entry.x,y:entry.y,z:entry.z,vy:0,grounded:true,swimming:false,forcedUnderwater:false,liftId:null,floatCharge:1.8,accelTime:0});yaw=entry.yaw??Math.atan2(entry.x,entry.z);pitch=0;
 for(let i=0;i<6;i++)p.ammo[i]=magSize(i);p.reload=p.cool=p.dashing=p.slide=0;phaseControl.reset();
 const authored=world.radar().bossSpawn,at=authored||rushSpawnPoint(2.2),e=spawn('boss',at.x,at.z);rushModel(e,rush.current);e.rushId=rush.current.id;e.max=e.hp=Math.round(rush.current.hp*rush.penalty.enemyHP*(difficulty==='easy'?.78:1));e.cd=1.3;e.exposed=1;e.phase=0;
 for(let i=0;i<rush.escorts;i++){const at=rushSpawnPoint();spawn(['chaser','shooter','strafer','charger'][Math.floor(random()*4)],at.x,at.z);}
 state='playing';rush.remaining=30;rush.phase='fight';
 $('wave').textContent=`BOSS ${rush.round}/${BOSSES.length} · 撃破 ${rush.wins}/5 · 失敗 ${rush.misses}/5`;
 notify(`${rush.current.name} / ${rush.current.tip}`,3);lock();
}
function beginRushRebuild(){
 rush.phase='rebuild';rushTransition=true;rush.next();rush.phase='rebuild';world.setBossArena?.(rush.current.id);
 rush.layout=pickRingShiftLayout();
 beginCombatRebuild(rush.layout);
}
function beginCombatRebuild(layout,seconds=2.7){
 if(isRiftMode())omegaCombat.reset();
 state='rebuilding';stickId=lookId=null;$('stick').firstElementChild.style.transform='';input.fire=input.firePressed=false;input.keys={};input.jump=false;input.dive=false;input.x=input.y=0;p.swimming=false;p.forcedUnderwater=false;leviathanDive=null;document.body.classList.remove('underwater');
 phaseControl.reset();seeker.clearFlight();sniperScope(false);ultimate.reset();resetArsenal(false);pulseEffects.reset();
 clearObjects(enemies);clearObjects(bullets);clearObjects(hazards);clearObjects(fx);clearObjects(pickups);bossRef=null;spawnQueue=[];
 for(let i=0;i<6;i++)p.ammo[i]=magSize(i);p.reload=0;p.vy=0;p.liftId=null;
 $('panel').hidden=true;$('pulse-hud').hidden=true;document.body.classList.add('reconstructing');
 world.begin(layout,false,seconds);$('rebuild').hidden=false;document.exitPointerLock?.();sound(110,.35,'sine',.04);
}
function showScarChoice(){
 state='upgrade';input.fire=input.firePressed=false;input.keys={};input.jump=false;input.x=input.y=0;document.exitPointerLock?.();const token=++rewardSerial;
 const choices=rush.offers();$('panel').hidden=false;$('paneltag').textContent=`BOSS ESCAPED / 強奪 ${rush.misses}/5`;
 $('paneltitle').textContent='奪われても、戦い方は残る。';
 $('paneltext').textContent=`最大体力 ×${rush.penalty.health} / 移動速度 ×${rush.penalty.speed}。次のボスも強化。専用カードを1枚選択。`;
 $('pulse-progress').hidden=true;$('choices').innerHTML='';$('resume').hidden=$('restart').hidden=$('home').hidden=true;
 for(const card of choices){const b=document.createElement('button');b.classList.add('augment-card');b.dataset.card=card.id;
 const small=document.createElement('small');small.textContent='SCAR AUGMENT / 失敗専用';const name=document.createElement('h3');name.textContent=card.name;const copy=document.createElement('p');copy.textContent=card.text;
 b.append(small,name,copy);b.onclick=()=>{if(state!=='upgrade'||token!==rewardSerial||!rush.install(card.id))return;$('choices').innerHTML='';beginRushRebuild();};$('choices').append(b);}
}
function resolveRush(killed){
 rush.escorts=enemies.filter(e=>e.type!=='boss'&&e.hp>0).length+spawnQueue.filter(x=>x!=='boss').length;
 const old=rush.penalty,result=rush.resolve(killed);if(!result)return;
 if(!killed){p.max=Math.max(1,p.max*rush.penalty.health/old.health);p.hp=Math.min(p.hp,p.max);p.speed*=rush.penalty.speed/old.speed;}
 if(result==='won'||result==='lost'){state='playing';finish(result==='won');return;}
 clearObjects(enemies);clearObjects(bullets);clearObjects(hazards);bossRef=null;spawnQueue=[];
 if(killed){for(const item of pickups)if(item.life>0)collectOrb(item);beginRushRebuild();}else{clearObjects(pickups);showScarChoice();}
}
const rushRingGeometry=new T.TorusGeometry(1,.07,5,40);
function rushRing(e){const mesh=new T.Mesh(rushRingGeometry,mat(rush.current.color,1));mesh.rotation.x=Math.PI/2;mesh.position.set(e.mesh.position.x,(world.heightAt(e.mesh.position.x,e.mesh.position.z)??0)+.18,e.mesh.position.z);scene.add(mesh);hazards.push({mesh,r:1,life:5,hit:false});}
function rushStrike(x,z,delay=.9,color=0xffb854,radius=3.2){const at=world.snapPoint(x,z),mesh=new T.Mesh(rushRingGeometry,mat(color,1));mesh.rotation.x=Math.PI/2;mesh.position.set(at.x,at.y+.12,at.z);mesh.scale.setScalar(radius);scene.add(mesh);hazards.push({kind:'strike',mesh,r:radius,delay,life:delay+.3,hit:false});}
function rushLaser(e,angle,delay=.8){const a=e.rushId==='leviathan'&&e.bossVisual?.muzzle?e.bossVisual.muzzle.getWorldPosition(new T.Vector3()):e.bossVisual?enemyAimPoint(e,new T.Vector3()):e.mesh.position.clone(),target=e.bossAction?.target||new T.Vector3(p.x,p.y+1,p.z),v=new T.Vector3(Math.sin(angle),(target.y-a.y)/Math.max(1,Math.hypot(target.x-a.x,target.z-a.z)),Math.cos(angle)).normalize();const length=Math.min(45,seekerWallDistance(a,v,45));const b=a.clone().addScaledVector(v,length),mesh=new T.Mesh(boxGeo,mat(rush.current.color,1));mesh.position.copy(a).lerp(b,.5);mesh.lookAt(b);mesh.scale.set(.055,.055,length);scene.add(mesh);hazards.push({kind:'laser',mesh,a,b,delay,life:delay+.3,hit:false});}
function beginRushAttack(e){
 let profile=BOSS_ATTACKS[e.rushId]||BOSS_ATTACKS.warden;
 if(e.rushId==='leviathan'){const water=e.phase%2===0,awakened=e.hp/e.max<=.5;profile={...profile,kind:water?'waterblast':'tailsweep',windup:awakened?1.05:1.3,active:water?.6:.35,recovery:1.3,cooldown:awakened?1.25:1.7};}
 if(difficulty==='easy')profile={...profile,windup:profile.windup+.25,cooldown:profile.cooldown*1.25};
 e.phase++;const target=new T.Vector3(p.x,p.y+1,p.z),to=target.clone().sub(e.mesh.position);to.y=0;to.normalize();
 e.dir.copy(to);e.facing=Math.atan2(to.x,to.z);e.bossAction={phase:'windup',age:0,profile,target,angle:e.facing,emitted:false};
 e.mesh.rotation.y=e.facing;
 if(e.rushId==='ram')beam(e.mesh.position.clone().setY((world.heightAt(e.mesh.position.x,e.mesh.position.z)??0)+.15),e.mesh.position.clone().addScaledVector(to,22).setY((world.heightAt(e.mesh.position.x,e.mesh.position.z)??0)+.15),0xff4564,.10,profile.windup);
 if(e.rushId==='siege')for(let i=-1;i<=1;i++)rushStrike(target.x+i*5,target.z+(i===0?0:2),profile.windup,0xffbf6b,3);
 if(e.rushId==='tempest')for(let i=-1;i<=1;i++)rushStrike(target.x+Math.cos(e.facing)*i*5,target.z-Math.sin(e.facing)*i*5,profile.windup,0xb4dbff,2.5);
 if(e.rushId==='devourer')for(let i=-1;i<=1;i++)rushLaser(e,e.facing+i*.12,profile.windup);
 if(e.rushId==='leviathan'&&profile.kind==='waterblast'){const width=e.hp/e.max<=.5?2:1;for(let i=-width;i<=width;i++)rushLaser(e,e.facing+i*.12,profile.windup);}
}
function emitRushAttack(e){
 const a=e.bossAction,id=e.rushId,origin=enemyAimPoint(e,new T.Vector3()),dir=a.target.clone().sub(origin).normalize();
 const fan=(n,spread,speed)=>{for(let j=0;j<n;j++)projectile(e,dir.clone().applyAxisAngle(T.Object3D.DEFAULT_UP,(j-(n-1)/2)*spread),speed);};
 if(id==='warden'){if(e.phase%3===0)rushRing(e);else fan(7,.14,11);}
 else if(id==='phoenix')fan(5,.16,13);
 else if(id==='mirror')fan(p.weapon===1?7:p.weapon===5?3:1,p.weapon===1?.12:.18,p.weapon===4||p.weapon===2?22:13);
 else if(id==='bulwark'||id==='leviathan'&&a.profile.kind==='tailsweep')rushRing(e);
 else if(id==='gravity'){rushRing(e);fan(3,.25,9);}
 // SIEGE, TEMPEST and DEVOURER impact their frozen warning geometry.
 sound(id==='bulwark'||id==='ram'?90:160,.18,'triangle',.035);
}
function rushBossAI(e,dt){
 const pos=e.mesh.position,id=e.rushId,ground=world.heightAt(pos.x,pos.z)??0,flying=!!e.bossVisual?.metrics?.flying;
 pos.y=ground+(flying?4.5+Math.sin(e.t*.7)*.45:1);
 if(id==='leviathan'&&e.hp>0&&e.hp<=e.max*.5&&!e.diveStarted)beginLeviathanDive(e);
 if(leviathanDive?.boss===e&&leviathanDive.elapsed<leviathanDive.duration){const progress=leviathanDive.elapsed/leviathanDive.duration;e.mesh.rotation.y=e.facing||0;e.bossVisual?.update(dt,{phase:'windup',phaseDuration:leviathanDive.duration,phaseProgress:progress,telegraph:true,attackName:'waterblast',awakened:true,health:e.hp/e.max,time:e.t});if(e.core)e.core.visible=true;return;}
 e.exposed=Math.max(0,e.exposed-dt);let moved=false;
 const dx=p.x-pos.x,dz=p.z-pos.z,d=Math.hypot(dx,dz)||1,targetAngle=Math.atan2(dx,dz),boost=rush.penalty.enemySpeed;
 let action=e.bossAction;
 if(!action){
  const diff=Math.atan2(Math.sin(targetAngle-(e.facing||0)),Math.cos(targetAngle-(e.facing||0)));e.facing=(e.facing||0)+diff*Math.min(1,dt*(id==='bulwark'?.6:2));
  if((id==='ram'||id==='mirror')&&d>(id==='ram'?12:17)){
   e.rushNav=(e.rushNav||0)-dt;if(e.rushNav<=0){e.rushRoute=world.path(pos.x,pos.z,p.x,p.z);e.rushNav=.5;}
   const goal=e.rushRoute?.find(n=>Math.hypot(n.x-pos.x,n.z-pos.z)>.6);if(goal){const length=Math.hypot(goal.x-pos.x,goal.z-pos.z)||1,obj={x:pos.x,z:pos.z,y:ground};move(obj,(goal.x-pos.x)/length*3*dt,(goal.z-pos.z)/length*3*dt,1.5);moved=Math.hypot(obj.x-pos.x,obj.z-pos.z)>.001;pos.x=obj.x;pos.z=obj.z;}
  }
  if(e.cd<=0){beginRushAttack(e);action=e.bossAction;}
 }
 if(action){
  action.age+=dt;const profile=action.profile;
  if(action.phase==='windup'&&action.age>=profile.windup){action.phase='attack';action.age=0;action.emitted=true;emitRushAttack(e);}
  else if(action.phase==='attack'){
   if(id==='ram'){
    const old=pos.clone(),obj={x:pos.x,z:pos.z,y:ground};move(obj,e.dir.x*23*boost*dt,e.dir.z*23*boost*dt,1.5);pos.x=obj.x;pos.z=obj.z;moved=true;
    const nearest=new T.Line3(old,pos).closestPointToPoint(new T.Vector3(p.x,pos.y,p.z),true,new T.Vector3());if(!action.hitPlayer&&Math.hypot(nearest.x-p.x,nearest.z-p.z)<2.6&&p.y-ground<3.6){const before=p.hp;hurt(25);if(p.hp<before)action.hitPlayer=true;}
   }
   if(id==='phoenix'&&action.age<.35){const obj={x:pos.x,z:pos.z,y:ground};move(obj,e.dir.x*10*dt,e.dir.z*10*dt,1.4);pos.x=obj.x;pos.z=obj.z;moved=true;}
   if(id==='gravity'&&d<25){const force=e.phase%2?1:-1;move(p,-dx/d*force*5*dt,-dz/d*force*5*dt);}
   if(action.age>=profile.active){action.phase='recovery';action.age=0;e.exposed=profile.recovery;}
  }else if(action.phase==='recovery'&&action.age>=profile.recovery){e.bossAction=null;e.cd=profile.cooldown/boost;action=null;}
 }
 e.mesh.rotation.y=e.facing||0;
 const phase=action?.phase||'idle';
 e.bossVisual?.update(dt,{phase,phaseDuration:action?phase==='windup'?action.profile.windup:phase==='attack'?action.profile.active:action.profile.recovery:0,phaseProgress:action?clamp(action.age/(phase==='windup'?action.profile.windup:phase==='attack'?action.profile.active:action.profile.recovery),0,1):0,telegraph:phase==='windup',attack:phase==='attack',attackName:action?.profile.kind||'idle',exposed:e.exposed>0,moving:moved,health:e.hp/e.max,time:e.t});
 if(e.core){e.core.visible=true;e.core.scale.setScalar(e.exposed>0?1.15:.85);}
}

function terrainStage(){return world.radar().wave;}
function beginWaveShift(){
 waveShiftTransition=true;
 waveShift.pending=enemies.filter(e=>e.hp>0).length+spawnQueue.length;
 waveShift.layout=pickRingShiftLayout();
 // Preserve XP already earned; construction removes the now invalid pickup locations.
 for(const item of pickups)if(item.life>0)gainXP(item.xp);
 beginCombatRebuild(waveShift.layout,wave>=4?4:2.7);
}
function completeWaveShift(){
 const entry=world.entry();Object.assign(p,{x:entry.x,y:entry.y,z:entry.z,vy:0,grounded:true,liftId:null,floatCharge:1.8,accelTime:0,dashing:0,slide:0,cool:0});
 yaw=entry.yaw??Math.atan2(entry.x,entry.z);pitch=viewKick=0;phaseControl.reset();transition=0;
 for(let i=0;i<waveShift.pending;i++){const at=rushSpawnPoint();spawn(['chaser','shooter','strafer','charger'][Math.floor(random()*4)],at.x,at.z);}
 waveShift.pending=0;state='playing';notify('RING SHIFT / '+world.radar().name,2);
}


// X / TIME HEIST lives behind a separate difficulty gate. Its clock and rules
// never tick in the original campaign, card screens, pause, or reconstruction.
function syncXPreview(){
 const active=$('difficulty').value==='x';document.body.classList.toggle('x-preview',active);
 if(!active){if(typeof saved!=='undefined')record();return;}
 $('difficulty-summary').textContent='X / TIME HEIST — 敵を倒して時間を奪う、6区画の異常襲撃。';
 $('menu-tagline').textContent='残り42秒。時間は、敵が持っている。';
 $('menu-intro').innerHTML='ランダムな最終進化武器を手に、6つの金庫区画を襲撃。<br>撃破で時間奪還。世界を減速し、自分だけが暴れ回れ。';
 $('how').innerHTML='<b>X / TIME HEIST</b><p>残り時間42秒で開始、最大60秒。撃破で+1.2秒、金色の時計を持つ運搬役は+6秒。被弾すると体力と時間を失い、どちらかが尽きたら敗北。カード・ポーズ・再構築中は時計が止まります。</p><p>撃破でBREAKを蓄積。100%でQキー／BREAKボタンを押すと4秒間、敵と敵弾が18%速度に。自分は通常速度・威力1.4倍。減速中に敵弾へダッシュすると最大3発を反撃弾へ変換。</p><p>全6武器がコア強化済み。毎回ランダムな1本を最終進化で支給。二段ジャンプと1.25秒ダッシュで専用RIFTを駆け抜けろ。</p><p>第1・3・5区画のクリア時はX専用の法則改変を3択。撃破爆縮・衝撃ダッシュ・空中処刑・強奪装填・時間拡張・指名手配から3つの組み合わせを構築。青いオーブのレベルアップでは通常の強化も獲得。</p><p>最終区画の時間監査機CHRONARCHは、封印2個を壊すと中枢が開きます。3段階を突破し、護衛も排除して脱出。封印破壊は+4秒、最終区画は最低35秒で開始。Xの記録は通常プレイと別に保存されます。</p>';
 const hint=(mobile?mobileHint:pcHint)+' / Q・BREAKボタン 時間減速 / SPACE 二段ジャンプ';$('inputhelp').textContent=hint;$('controlsHint').textContent=hint;
 $('record').textContent=`X BEST ${xSaved.best.toLocaleString()} / HEISTS ${xSaved.runs} / ESCAPES ${xSaved.wins}`;
}
function resetX(){xChronarch.reset();xDirector.reset();xEffects.reset();xEffects.setActive(difficulty==='x');xNextLayout=xSpawnSerial=xSwapCd=xSwapBuff=xAnnouncement=xReflected=xReflections=0;xFailure='';hideXHUD();}
function hideXHUD(){for(const id of ['x-hud','x-break','x-laws','x-announcement','x-edge'])$(id).hidden=true;}
function xLoadout(){
 for(let i=0;i<6;i++){const card=evolutionCards(i)[0];if(card)(i===0?installPulseCard:installArsenalCard)(card[0]);}
 xStartWeapon=Math.floor(random()*6);for(let tier=0;tier<2;tier++){const cards=evolutionCards(xStartWeapon);if(cards.length)(xStartWeapon===0?installPulseCard:installArsenalCard)(cards[Math.floor(random()*cards.length)][0]);}
 p.weapon=xStartWeapon;p.speed*=1.1;p.max+=25;p.hp=p.max;p.inv=2;p.reload=p.cool=0;
}
function nextXWave(quiet=false){
 wave++;waveShift.start(wave,false);const layout=xNextLayout||pickXLayout(wave);xNextLayout=0;world.setWave(layout,false);xDirector.enter(wave);if(wave===6)xDirector.seconds=Math.max(35,xDirector.seconds);
 const entry=world.entry();Object.assign(p,{x:entry.x,y:entry.y,z:entry.z,vy:0,grounded:true,dashing:0,slide:0,floatCharge:1.8,accelTime:0,liftId:null,inv:1.8,reload:0,cool:0});yaw=entry.yaw??0;pitch=0;
 for(let i=0;i<6;i++)p.ammo[i]=magSize(i);transition=0;
 const types=['chaser','shooter','strafer','charger'],count=7+wave*3;
 spawnQueue=wave===6?['boss','shooter','strafer']:Array.from({length:count},(_,i)=>types[i<2?i:Math.floor(random()*(wave<2?3:4))]);spawnTimer=.45;
 $('wave').textContent=`X / VAULT 0${wave} / 06`;
 xAnnouncement=3;$('x-announcement-title').textContent=wave===1?'TIME HEIST / 襲撃開始':wave===6?'CHRONARCH / 時間監査機':`VAULT 0${wave} / 現実を強奪`;
 $('x-announcement-copy').textContent=wave===1?`支給：${weapons[xStartWeapon].name.split(' / ')[0]}・最終進化 / 撃破で時間を奪え`:wave===6?'金色の封印を破壊 → 開いた中枢を撃て':world.radar().name+' / 次区画到達 +5秒';
 $('notice').textContent='';noticeTimer=0;
}
const xCrownGeometry=new T.TorusGeometry(.62,.035,4,20),xCrownMaterial=new T.MeshBasicMaterial({color:0xffdc91});
function markXBounty(e){e.xBounty=true;const ring=new T.Mesh(xCrownGeometry,xCrownMaterial);ring.position.y=e.r+1;ring.rotation.x=.2;e.mesh.add(ring);for(const z of [-.1,.1]){const hand=new T.Mesh(boxGeo,xCrownMaterial);hand.position.set(z,e.r+1,z);hand.scale.set(.04,.65,.04);hand.rotation.z=z>0?.65:-.65;e.mesh.add(hand);}}
function onXKill(e,meta){
 if(e.xSeal){const broken=xChronarch.breakSeal(e.xSealId);if(!broken)return;if(bossRef?.xChronarch)bossRef.exposed=xChronarch.mode==='open'?999:0;if(broken.opened){notify('CHRONARCH / 中枢開放 — 集中射撃',1.7);sound(880,.18,'triangle',.04);}}if(e.xChronarch){for(const seal of enemies.filter(n=>n.xSeal)){seal.hp=0;scene.remove(seal.mesh);}clearObjects(bullets);clearObjects(hazards);}
 const reward=xDirector.kill({bounty:!!e.xBounty,seal:!!e.xSeal});p.hp=Math.min(p.max,p.hp+(e.xBounty?10:4));xEffects.burst(e.mesh.position,{kind:e.xBounty||e.xSeal?'bounty':'kill'});
 $('x-chain').textContent=`${e.xSeal?'SEAL BROKEN':e.xBounty?'TIME CARRIER':'TIME STOLEN'} +${reward.seconds.toFixed(1)}s · ${reward.combo} CHAIN`;
 if(e.xBounty)sound(740,.15,'triangle',.05);
 if(xDirector.owns('implosion')&&!meta?.xSecondary)xShock(e.mesh.position.clone(),7,45);
}
function xShock(origin,radius,power){for(const e of [...enemies]){if(e.hp<=0)continue;const delta=e.mesh.position.clone().sub(origin),dist=delta.length();if(dist>radius)continue;if(seekerWallDistance(origin,delta.normalize(),dist)<dist-e.r)continue;beam(origin,e.mesh.position,0xffa3dc,.045,.2);damage(e,power,false,{xSecondary:true});if(e.hp>0&&e.type!=='boss')arsenalKnockback(e,origin,3);}}
function activateXBreak(){if(difficulty!=='x'||state!=='playing'||ultimate.active||!xDirector.activate())return false;for(let i=0;i<6;i++)p.ammo[i]=magSize(i);p.reload=0;p.cool=0;p.dash=0;phaseControl.cancelHold();xEffects.burst(new T.Vector3(p.x,p.y,p.z),{kind:'break'});sound(85,.25,'sawtooth',.065);sound(660,.2,'triangle',.035);notify('BREAK / 自分だけが、時を超える',1.8);return true;}
function chooseXMutation(){
 const token=++rewardSerial;choiceReason='wave';state='upgrade';input.fire=input.firePressed=false;input.keys={};input.jump=false;input.x=input.y=0;phaseControl.cancelHold();sniperScope(false);seeker.clearLocks();document.exitPointerLock?.();
 p.hp=Math.min(p.max,p.hp+18);$('panel').hidden=false;$('paneltag').textContent=`X / VAULT 0${wave} BREACHED`;$('paneltitle').textContent='世界の法則を、書き換えろ。';$('paneltext').textContent='X専用の法則改変を1つ選ぶ。取得済みの法則は再出現しない。次の区画で時間+5秒、全武器を装填。';$('pulse-progress').hidden=true;$('choices').innerHTML='';$('resume').hidden=$('restart').hidden=$('home').hidden=true;
 const icons={implosion:'<circle cx="60" cy="30" r="10"/><path d="M5 30h33M82 30h33M60 2v15M60 43v15M28 6l18 14M92 54 74 40M28 54l18-14M92 6 74 20"/>',dash:'<path d="M4 20h38M4 40h38M35 10l23 20-23 20M66 10l23 20-23 20M96 10l19 20-19 20"/>',airborne:'<path d="M30 52V22L14 36M30 22l16 14M70 52V8L54 24M70 8l16 16M6 57h108"/>',hotswap:'<path d="M12 18h91L88 4M108 42H17l15 14M44 27h32v7H44z"/>',sustain:'<path d="M38 4h44M38 56h44M43 4v13l34 26v13M77 4v13L43 43v13M52 12h16M50 49h20"/>',bounty:'<circle cx="60" cy="30" r="22"/><circle cx="60" cy="30" r="9"/><path d="M60 0v16M60 44v16M18 30h28M74 30h28"/>'};
 for(const card of xDirector.offers(random)){const button=document.createElement('button');button.classList.add('x-mutation');button.dataset.card='x_'+card.id;button.innerHTML=`<small>X / ${card.tag}</small><svg viewBox="0 0 120 60" aria-hidden="true">${icons[card.id]}</svg><h3>${card.name}</h3><p>${card.description||card.text}</p><span class="selecthint">REWRITE REALITY →</span>`;button.onclick=()=>{if(state!=='upgrade'||token!==rewardSerial||!xDirector.install(card.id))return;document.activeElement?.blur();$('choices').innerHTML='';$('panel').hidden=true;state='playing';rebuildPending=true;if(pendingLevels>0||waveReward)openReward();else beginReconstruction();};$('choices').append(button);}
}
function drawXHUD(dt){
 const active=difficulty==='x'&&state==='playing';document.body.classList.toggle('x-breaking',active&&xDirector.breaking);document.body.classList.toggle('x-critical',active&&xDirector.seconds<=8);document.body.classList.toggle('x-ready',active&&xDirector.charge>=100&&!xDirector.breaking);
 if(!active){hideXHUD();return;}
 $('x-hud').hidden=$('x-break').hidden=$('x-edge').hidden=false;$('x-seconds').textContent=xDirector.seconds.toFixed(1);$('x-timefill').style.width=(xDirector.seconds/60*100)+'%';$('x-breakfill').style.width=(xDirector.breaking?xDirector.breakRemaining/(xDirector.owns('sustain')?6.7:4):xDirector.charge/100)*100+'%';
 $('x-break-label').textContent=xDirector.breaking?`BREAK ${xDirector.breakRemaining.toFixed(1)}s`:'BREAK';$('x-break-hint').textContent=xDirector.breaking?'敵弾へダッシュ → 反撃':xDirector.charge>=100?(mobile?'タップして時間減速':'Q / 時間減速'):Math.floor(xDirector.charge)+'% · 撃破で蓄積';$('x-break').disabled=xDirector.breaking||xDirector.charge<100;
 if(xDirector.combo===0)$('x-chain').textContent=`撃破 +1.2s / 金色の時計 +${xDirector.owns('bounty')?9:6}s`;
 const laws=X_MUTATIONS.filter(m=>xDirector.owns(m.id));$('x-laws').hidden=!laws.length;$('x-law-list').textContent=laws.map(m=>m.name).join(' / ');
 xAnnouncement=Math.max(0,xAnnouncement-dt);$('x-announcement').hidden=xAnnouncement<=0||!!bossRef&&bossRef.hp>0;
 if(bossRef&&bossRef.hp>0){const c=xChronarch.snapshot();$('boss').dataset.core=c.mode;$('boss').querySelector('small').textContent=bossRef.xChronarch?`CHRONARCH / PHASE ${c.phase+1}/3 · ${c.mode==='open'?'CORE OPEN / 中枢を撃て':c.mode==='transition'?'RECONFIGURING':`SEALS ${c.seals.length}/2 / 封印を撃て`}`:'X / FINAL GUARD';}
}
function finishX(win){
 if(state!=='playing')return;state=win?'victory':'dead';ultimate.reset();phaseControl.reset();sniperScope(false);seeker.clearLocks();input.fire=input.firePressed=false;input.keys={};input.jump=false;input.x=input.y=0;document.exitPointerLock?.();xEffects.setActive(false);hideXHUD();document.body.classList.remove('x-breaking','x-critical','x-ready');$('pulse-hud').hidden=$('pulse-progress').hidden=true;
 const metrics=xDirector.snapshot();if(win)score+=Math.round(xDirector.seconds*100)+xDirector.maxCombo*100;xSaved.runs++;if(win)xSaved.wins++;xSaved.best=Math.max(xSaved.best,score);try{localStorage.setItem('overdrive-x-v1',JSON.stringify(xSaved))}catch{}
 $('panel').hidden=false;$('paneltag').textContent=win?'X / HEIST COMPLETE':xFailure?'X / REACTOR EMPTY':'X / SIGNAL LOST';$('paneltitle').textContent=win?'時間を奪い、世界を脱出した。':xFailure?'時間切れ。次は、奪い返せ。':'強奪失敗。もう一度。';$('paneltext').textContent=`VAULT ${wave}/6 · SCORE ${score.toLocaleString()} · ${kills} KILLS / 時間奪還 ${metrics.timeStolen.toFixed(1)}秒 · 最大${metrics.maxCombo}連鎖 · BREAK ${metrics.breakActivations}回 · 反撃 ${xReflected}発`;$('choices').innerHTML='';$('resume').hidden=true;$('restart').hidden=$('home').hidden=false;
}
$('x-break').addEventListener('click',event=>{event.preventDefault();event.stopPropagation?.();activateXBreak();});


// The last X vault is a deliberate boss space; earlier random vaults reserve it.
function pickXLayout(targetWave){const pool=RING_SHIFT_LAYOUT_IDS.filter(id=>id!==lastRingShiftLayout&&(targetWave!==5||id!==10));lastRingShiftLayout=targetWave===6?10:pool[Math.floor(random()*pool.length)];return lastRingShiftLayout;}
function spawnXChronarch(){
 const at=world.snapPoint(0,-16),mesh=xChronarchModel.root;xChronarchModel.reset();mesh.position.set(at.x,at.y+3,at.z);mesh.rotation.set(0,0,0);scene.add(mesh);xChronarch.begin();
 const e={mesh,core:xChronarchModel.core,limbs:[],type:'boss',r:2.3,hp:CHRONARCH.hp,max:CHRONARCH.hp,t:0,cd:1.2,flash:0,shieldFlash:0,exposed:0,xChronarch:true};enemies.push(e);bossRef=e;spawnXSeals(xChronarch.snapshot().seals);xChronarchModel.update(0,{phase:0,sealed:true});notify('CHRONARCH / 金色の封印2個を撃て',2.8);return e;
}
function spawnXSeals(ids){
 for(const [index,id] of ids.entries()){const model=xSealModels[index];model.reset();const mesh=model.root,e={mesh,core:model.core,limbs:[],type:'seal',r:CHRONARCH.sealRadius,hp:CHRONARCH.sealHP,max:CHRONARCH.sealHP,t:0,cd:999,flash:0,xSeal:true,xSealId:id,xSealIndex:index,xModel:model,exposed:0};scene.add(mesh);enemies.push(e);updateXSeal(e,0);}
}
function updateXSeal(e,dt){
 if(!bossRef?.xChronarch||bossRef.hp<=0){e.hp=0;scene.remove(e.mesh);return;}e.t+=dt;e.flash=Math.max(0,e.flash-dt);
 const phase=xChronarch.phase,angle=e.xSealIndex*Math.PI+phase*.63+e.t*.2,r=5.2,x=bossRef.mesh.position.x+Math.cos(angle)*r,z=bossRef.mesh.position.z+Math.sin(angle)*r;
 const ground=world.heightAt(x,z);e.mesh.position.set(x,Math.max(bossRef.mesh.position.y-.9,(ground??-50)+1.2)+Math.sin(e.t*2)*.15,z);e.mesh.rotation.y=-angle;e.xModel.update(dt,{flash:e.flash,breaking:xDirector.breaking,reduced:reducedMotion,low:mobile||$('quality').value==='low'});
}
const xMarkGeometry=new T.TorusGeometry(1,.06,4,40);
function updateXChronarch(e,dt,realDt){
 e.t+=dt;e.flash=Math.max(0,e.flash-dt);e.shieldFlash=Math.max(0,e.shieldFlash-dt);e.mesh.rotation.y=Math.atan2(p.x-e.mesh.position.x,p.z-e.mesh.position.z);
 for(const event of xChronarch.tick(dt,realDt)){
  if(event.type==='seals'){spawnXSeals(event.ids);continue;}
  const direction=new T.Vector3(p.x-e.mesh.position.x,p.y+1-e.mesh.position.y,p.z-e.mesh.position.z).normalize();
  if(event.type==='fan'){for(let i=0;i<event.count;i++)projectile(e,direction.clone().applyAxisAngle(new T.Vector3(0,1,0),(i-(event.count-1)/2)*.13),event.speed);}
  if(event.type==='marks'){const side=new T.Vector3(direction.z,0,-direction.x).normalize();for(let i=0;i<2;i++){const at=world.snapPoint(p.x+side.x*i*6,p.z+side.z*i*6),mesh=new T.Mesh(xMarkGeometry,mat(0xffa8dd,1));mesh.rotation.x=Math.PI/2;mesh.position.set(at.x,at.y+.13,at.z);mesh.scale.setScalar(event.radius);scene.add(mesh);hazards.push({kind:'strike',mesh,r:event.radius,delay:event.delay,life:event.delay+.3,damage:event.damage,hit:false});}}
  if(event.type==='laser'){const a=e.mesh.position.clone(),v=direction,length=Math.min(50,seekerWallDistance(a,v,50)),b=a.clone().addScaledVector(v,length),mesh=new T.Mesh(boxGeo,mat(0xffe3ad,1));mesh.position.copy(a).lerp(b,.5);mesh.lookAt(b);mesh.scale.set(.055,.055,length);scene.add(mesh);hazards.push({kind:'laser',mesh,a,b,delay:event.delay,life:event.delay+.3,damage:event.damage,hit:false});}
 }
 e.exposed=xChronarch.mode==='open'?999:0;e.core.visible=true;xChronarchModel.update(dt,{phase:xChronarch.phase,sealed:xChronarch.mode!=='open',flash:Math.max(e.flash,e.shieldFlash),windup:xChronarch.mode==='transition'?1:0,breaking:xDirector.breaking,reduced:reducedMotion,low:mobile||$('quality').value==='low'});
}


// Ω / RIFT RAID — timed objectives drive world reconstruction and automatic weapon roulette.
const omegaVisuals=createOmegaVisuals({camera,scene});
const kinetic=new KineticArm(),kineticVisuals=createKineticArmVisuals({scene,camera}),arsenalCoverTraces=[];let kineticKick=0,kineticCaptured=0,kineticReturned=0;
const omegaRaid=new OmegaRaid(),raidVisuals=createOmegaRaidVisuals({scene});
const fractureDirector=new FractureDirector();
let raidTargets=[],raidHuntTargets=[],raidHold=0,raidStarted=false,raidBossSpawned=false;
const omegaCombat=createOmegaCombat({onWallHit:event=>damageOmegaCover(event.origin,event.direction,event.damage,event.range),getEnemies:()=>enemies,wallDistance:seekerWallDistance,wallHit:omegaWallHit,damage:(e,n,meta)=>damage(e,n*(p.over>0?1.15:1)*(e.type==='boss'?(e.exposed>0?1.4:.75):1),false,{...meta,direct:true,weapon:6}),onEffect:e=>omegaVisuals.effect(e),knockback:omegaPull});
let omegaDescriptor=null,omegaRank=0,omegaReload=0,omegaBrief=0,omegaNextLayout=null,omegaShiftTimer=0,omegaShiftPending=false,omegaShiftKind='',omegaRecentTopologies=[],omegaGunSeen=new Set();
let omegaSaved={best:0,runs:0,wins:0};try{Object.assign(omegaSaved,JSON.parse(localStorage.getItem('overdrive-omega-raid-v1')||'{}'));}catch{}
let fractureSaved={best:0,runs:0,wins:0};try{Object.assign(fractureSaved,JSON.parse(localStorage.getItem('overdrive-fracture-intents-v1')||'{}'));}catch{}
function isRiftMode(){return difficulty==='omega'||difficulty==='fracture';}
function riftEncounter(layout,count,includeShooter=true){if(difficulty==='fracture'){const intent=world.radar().intent;return intent?composeIntentEncounter(intent,count,random,includeShooter):composeFractureEncounter(count,random,includeShooter);}return composeOmegaEncounter(layout,count,random)}
function isRangedRiftEnemy(type){return type==='shooter'||type==='strafer'}
function currentOmega(){return omegaBuild(omegaDescriptor||generateOmega(0),omegaRank);}
function omegaLoadout(){kineticCaptured=kineticReturned=0;omegaRaid.reset(seed);if(difficulty==='fracture')fractureDirector.reset(seed);raidStarted=false;raidBossSpawned=false;omegaDescriptor=generateOmega(seed);omegaRank=omegaReload=0;omegaNextLayout=null;omegaShiftTimer=0;omegaShiftPending=false;omegaShiftKind='';omegaRecentTopologies=[];omegaGunSeen=new Set();omegaBrief=7;p.chargeMult=1;p.weapon=6;p.ammo[6]=currentOmega().mag;p.hp=p.max=100;p.speed=1;refreshOmegaWeapon();}
function refreshOmegaWeapon(){const b=currentOmega();omegaVisuals.configure(b);p.ammo[6]=b.mag;p.reload=p.cool=0;}
function omegaCreateNextLayout(sector){if(difficulty==='fracture')return fractureDirector.next({boss:omegaRaid.bossReady||!!bossRef&&bossRef.hp>0});let chosen=null;for(let i=0;i<16;i++){const mapSeed=(Math.floor(random()*4294967295)>>>0)||((seed+i+1)>>>0),candidate=createOmegaLayout(mapSeed,sector),key=candidate.topology+':'+candidate.arenaForm;if(!omegaRecentTopologies.includes(key)||i===15){chosen={...candidate,fracture:difficulty==='fracture',topologyKey:key};break;}}omegaRecentTopologies.push(chosen.topologyKey);if(omegaRecentTopologies.length>2)omegaRecentTopologies.shift();return chosen;}
function omegaWeaponName(index){const parts=weapons[index]?.name.split(' / ')||[];return index===6?'Ω / '+(currentOmega().coreName||currentOmega().coreId):parts[parts.length-1]||weapons[index]?.name||'UNKNOWN';}
function omegaGunProfile(index){const profiles=[
 {role:'連射・中近距離',text:'移動しながら連射。中距離の射線を保つ。',ammo:'50発',accent:'#77f4cb'},
 {role:'至近距離・ノックバック',text:'密着で全弾を当てて敵を押し返す。',ammo:'10発',accent:'#ffc779'},
 {role:'長射線・貫通',text:'射線上の敵を貫いてまとめて撃ち抜く。',ammo:'6発',accent:'#a6c5ff'},
 {role:'チャージ・面制圧',text:'移動で弾を補給。溜め方でNOVAとEXPLOSION。',ammo:'12発',accent:'#b7a8ff'},
 {role:'遠距離・弱点狙撃',text:'1発ずつコアを狙う。弱点に大ダメージ。',ammo:'1発',accent:'#83eaff'},
 {role:'ロックオン・複数追尾',text:'照準を合わせて複数の敵へ一斉発射。',ammo:'6発',accent:'#76eadb'},
 {role:'ランダム弾道・変異',text:omegaHints[omegaDescriptor.core],ammo:currentOmega().mag+'発',accent:'#ffb276'}];return profiles[index];}
function omegaWallHit(origin,direction,length){arena.updateWorldMatrix(true,true);const meshes=[];function visit(o){if(!o.visible)return;if(o.isMesh)meshes.push(o);for(const c of o.children)visit(c);}visit(arena);const trace=new T.Raycaster(origin,direction,0,length),h=trace.intersectObjects(meshes,false)[0];if(!h)return null;return{distance:h.distance,normal:h.face?.normal.clone().transformDirection(h.object.matrixWorld)||direction.clone().negate()};}
function omegaPull(e,center,force){if(e.omegaObjective||e.type==='boss'||e.hp<=0)return;const pos=e.mesh.position,dir=center.clone().sub(pos).setY(0);if(dir.lengthSq()<.01)return;dir.normalize();const obj={x:pos.x,z:pos.z,y:world.heightAt(pos.x,pos.z)??0};move(obj,dir.x*force,dir.z*force,e.r*.6);pos.x=obj.x;pos.z=obj.z;}
function nextOmegaWave(quiet=false,preparedLayout=null){
 wave=Math.min(6,omegaRaid.cores+1);waveShift.reset();omegaShiftTimer=0;omegaCombat.reset();const layout=preparedLayout||omegaNextLayout||omegaCreateNextLayout(wave);omegaNextLayout=null;world.setWave(layout.wave,false,layout);
 const entry=world.entry();Object.assign(p,{x:entry.x,y:entry.y,z:entry.z,vy:0,grounded:true,dashing:0,slide:0,floatCharge:1.8,accelTime:0,liftId:null,inv:1.5,reload:0,cool:0});yaw=entry.yaw??0;pitch=0;for(let i=0;i<6;i++)p.ammo[i]=magSize(i);p.ammo[6]=currentOmega().mag;transition=0;
 spawnQueue=riftEncounter(layout.arenaForm,6,true);spawnTimer=2.5;
 $('wave').textContent=difficulty==='fracture'?'Σ / FRACTURE RAID':'Ω / RIFT RAID';
}
function beginOmegaReconstruction(kind='cycle'){
 resetKinetic();
 omegaShiftKind=kind;omegaShiftPending=true;clearOmegaRaidTargets();omegaNextLayout=omegaCreateNextLayout(Math.min(6,omegaRaid.cores+1));if(kind==='cycle')spawnQueue=difficulty==='fracture'?composeIntentEncounter(omegaNextLayout.intent,Math.max(3,spawnQueue.length),random,true):remixOmegaQueue(omegaNextLayout.arenaForm,spawnQueue,random);omegaShiftTimer=0;omegaCombat.reset();resetArsenal(false);pulseEffects.reset();$('pulse-hud').hidden=true;state='rebuilding';input.fire=input.firePressed=false;input.keys={};input.jump=false;input.x=input.y=0;seeker.clearFlight();seeker.clearLocks();clearObjects(bullets);clearObjects(hazards);clearObjects(fx);phaseControl.reset();sniperScope(false);ultimate.reset();p.dashing=p.slide=0;p.reload=p.cool=0;p.vy=0;p.floatCharge=1.8;p.accelTime=0;p.liftId=null;p.inv=Math.max(p.inv,1.4);for(let i=0;i<6;i++)p.ammo[i]=magSize(i);p.ammo[6]=currentOmega().mag;for(const e of enemies)if(e.hp>0)e.mesh.visible=false;
 document.body.classList.add('reconstructing');world.begin(omegaNextLayout.wave,false,1.55,omegaNextLayout);const entry=world.entry();Object.assign(p,{x:entry.x,y:entry.y,z:entry.z,grounded:true});yaw=entry.yaw??0;pitch=0;$('rebuild').hidden=false;$('panel').hidden=true;sound(110,.7,'sine',.05);
}
function omegaRepositionSurvivors(){const layout=world.radar(),used=[];if(difficulty==='fracture'&&layout.intent)repositionFractureSurvivors(layout);else for(const e of enemies){if(e.hp<=0)continue;let c;if(e.type==='boss')c=layout.nearest(0,0);else{let candidates=layout.nodes.filter(n=>Math.hypot(n.x-p.x,n.z-p.z)>10&&used.every(u=>Math.hypot(n.x-u.x,n.z-u.z)>4));if(!candidates.length)candidates=layout.nodes.filter(n=>Math.hypot(n.x-p.x,n.z-p.z)>6);c=candidates[Math.floor(random()*candidates.length)]||layout.nearest(p.x,p.z);}if(!c)continue;used.push(c);e.mesh.position.set(c.x,c.h+(e.type==='strafer'?1.7:1),c.z);e.mesh.rotation.y=Math.atan2(p.x-c.x,p.z-c.z);e.attack=0;e.navTime=0;e.navRoute=null;e.mesh.visible=true;}
 for(const item of pickups){if(item.life<=0)continue;const c=layout.nearest(item.mesh.position.x,item.mesh.position.z);if(!c)continue;item.x=c.x;item.z=c.z;item.mesh.position.set(c.x,c.h+.5,c.z);}
}
function omegaDraftOptions(){const all=[0,1,2,3,4,5,6],available=all.filter(i=>i!==p.weapon),fresh=available.filter(i=>!omegaGunSeen.has(i)),pool=fresh.length>=3?fresh:available.filter(i=>fresh.includes(i));if(pool.length<3)pool.push(...available.filter(i=>!pool.includes(i)));for(let i=pool.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}return pool.slice(0,3);}
function omegaEquipWeapon(index){if(index<0||index>6)return;phaseControl.reset();seeker.clearLocks();seeker.clearFlight();sniperScope(false);input.fire=input.firePressed=false;if(index===6){omegaDescriptor=generateOmega((seed^Math.imul(omegaRaid.round+1,0x9e3779b9))>>>0);refreshOmegaWeapon();}p.weapon=index;p.ammo[index]=magSize(index);p.reload=0;p.cool=.16;swapAnim=.3;omegaGunSeen.add(index);omegaBrief=2.5;}
function omegaSelectWeapon(index){omegaEquipWeapon(index);$('choices').innerHTML='';$('panel').hidden=true;state='playing';p.inv=Math.max(p.inv,.7);if(!raidStarted)startOmegaRaid();lock();}
function openOmegaDraft(kind){const token=++rewardSerial;choiceReason='omega-draft';state='upgrade';input.fire=input.firePressed=false;input.keys={};input.x=input.y=0;input.jump=false;seeker.clearLocks();sniperScope(false);document.exitPointerLock?.();$('panel').hidden=false;$('pulse-progress').hidden=true;$('choices').innerHTML='';$('resume').hidden=$('restart').hidden=$('home').hidden=true;$('paneltag').textContent=(difficulty==='fracture'?'Σ / FRACTURE RAID':'Ω / RIFT RAID')+' · OPENING LOADOUT';$('paneltitle').textContent=kind==='opening'?'最初の一丁を選べ。':kind==='sector'?'新しい戦場。武器を選べ。':'世界が変わった。次の一丁を選べ。';$('paneltext').textContent=kind==='opening'?'30秒で任務を達成し、3つのコアを奪え。以後は世界と武器が自動交換。Q／引き直しボタンは各世界1回。':world.radar().name+' — '+world.rule()+'  選んだ武器は次の再構築まで固定。';
 const forms=['<path d="M5 17h27l8 5h18l7-5h20l8 5h27M16 13v8m43-6v12m31-12v12"/><path d="M31 11h28l4 6H31z"/>','<path d="M7 19h18l7-6h16l8 6h35l7-5h10M18 15v8m58-9v15m15-16v16"/><path d="M26 13h19M54 15l5-3 6 3"/>','<path d="M4 19h35l7-3h47l6 3h17M17 15v8m49-7v10m29-10v10"/><path d="M38 14h35l5 3H38z"/>','<path d="M8 18h24l8-6h16l8 6h30l7-4h12M23 13v10m49-12v17m17-13v13"/><circle cx="59" cy="17" r="7"/>','<path d="M5 19h31l6-4h52l8 4h15M15 15v9m46-10v11m31-10v11"/><path d="M42 14h47"/>','<path d="M5 20h22l8-5h14l8 5h30l8-7h18M20 15v10m38-9v9m43-10v11"/><circle cx="45" cy="16" r="4"/>','<path d="M5 18h30l8-6h20l8 6h43M18 14v9m46-10v13m34-11v11"/><path d="m38 14 8 4-8 4m22-8 8 4-8 4"/>'];
 for(const index of omegaDraftOptions()){
  const info=omegaGunProfile(index),name=omegaWeaponName(index),mag=magSize(index),reloadTime=reloadDuration(index),button=document.createElement('button');button.classList.add('augment-card','omega-card','omega-weapon-card');button.dataset.weapon=String(index);button.style.setProperty('--gun-accent',info.accent);button.innerHTML='<small>WEAPON '+(index===6?'Ω / GENERATED':'0'+(index+1)+' / FIELD ARMORY')+'</small><svg viewBox="0 0 120 36" aria-hidden="true">'+forms[index]+'</svg><h3>'+name+'</h3><p><b>'+info.role+'</b><br>'+info.text+'<br>'+mag+' · 装填 '+reloadTime.toFixed(1)+'s</p><span class="selecthint">'+(kind==='opening'?'DEPLOY WITH →':'REBUILD LOADOUT →')+'</span>';button.onclick=()=>{if(state!=='upgrade'||token!==rewardSerial)return;omegaSelectWeapon(index);};$('choices').append(button);
 }
}
function shootOmega(){if(state!=='playing'||p.cool>0||p.reload>0)return;if(p.ammo[6]<=0){reload();return;}const b=currentOmega(),direction=new T.Vector3(0,0,-1).applyQuaternion(camera.quaternion),origin=camera.position.clone();omegaVisuals.root.updateWorldMatrix(true,true);let from=omegaVisuals.muzzle.getWorldPosition(new T.Vector3());const offset=from.clone().sub(origin),length=offset.length();if(length>.001&&seekerWallDistance(origin,offset.clone().normalize(),length)<length)from=origin.clone();
 // All gameplay traces use the aim origin; muzzle is the visual origin, preserving cover.
 const result=omegaCombat.fire({build:b,origin,direction,muzzle:from,attackId:++attackSerial});if(result?.fired===false)return;p.ammo[6]--;p.cool=b.rate;recoil=.13*b.recoil;viewKick=Math.min(.06,viewKick+.018*b.recoil);shotFlash=.12;ejectOmegaCasing();sound([420,150,240,90,510][omegaDescriptor.core],.12,'triangle',.035);
}
function syncOmegaPreview(){const selected=$('difficulty').value,newCombat=selected==='fracture',active=selected==='omega'||newCombat;document.body.classList.toggle('omega-preview',active);document.body.classList.toggle('fracture-preview',newCombat);$('loadout').disabled=active;$('loadout').title=active?(newCombat?'Σでは近接戦と武器の自動交換が中心です':'Ωでは任務・地形・武器が再構築されます'):'';if(!active)return;$('difficulty-summary').textContent=newCombat?'Σ / FRACTURE RAID — 任務を進めてボスを倒せ。':'Ω / RIFT RAID — 30秒で任務を達成し、3つのコアを奪え。';$('menu-tagline').textContent='この世界を、30秒で奪え。';$('menu-intro').innerHTML='世界も銃も、30秒で消える。<br>破壊・制圧・走破・標的狩り。3コアを奪い、中枢ボスを撃破せよ。';$('how').innerHTML='<b>Ω / RIFT RAID</b><p>最初の銃を選んだら戦闘開始。各世界の制限時間は30秒。封鎖装置2基の破壊、中継点2か所の制圧、チェックポイント2個の走破、指名標的2体の排除から任務が抽選されます。光る立体マーカーと距離表示が行き先です。</p><p>任務成功でコア1個・耐久12回復。3コアを奪うと次の世界で中枢ボスが出現。敵の全滅を待つ必要はありません。任務を6回逃すか耐久が尽きると失敗です。成功後はE／次へボタンで即座に次の世界へ進むか、残り時間で回復や経験値を回収するかを選べます。</p><p>30秒ごとに地形・敵編成・銃が自動交換され、弾薬は全装填されます。Qキー／引き直しボタンで各世界1回の引き直しに加え、1–7キーで入手済みの銃へいつでも切替可能。引き直しても制限時間は戻りません。敵は通常時最大6体、ボス戦最大4体。レベルアップは耐久と装填速度を自動強化し、戦闘は中断しません。</p>';$('inputhelp').textContent=$('controlsHint').textContent=mobile?'左スティック移動 / 右ドラッグ照準 / FIRE射撃 / 武器を引き直す：各世界1回':'WASD・矢印 移動 / マウス照準・左クリック射撃 / 1–7 武器切替 / Q 引き直し / R 装填 / SPACE ジャンプ / SHIFT ダッシュ';$('record').textContent=`Ω RAID BEST ${omegaSaved.best.toLocaleString()} / RUNS ${omegaSaved.runs} / CLEARS ${omegaSaved.wins}`;$('rift-mode-name').textContent=newCombat?'FRACTURE RAID':'RIFT RAID';$('rift-emblem').textContent=newCombat?'Σ':'Ω';if(newCombat){$('difficulty-summary').textContent='Σ / COMBAT INTENTS — 任務に合わせて戦場そのものが変わる試作版。';$('menu-tagline').textContent='近接戦を崩し、次の一丁で世界を砕け。';$('menu-intro').innerHTML='壁を砕く。高台を渡る。追跡を振り切る。標的を狩る。<br>20秒ごとに戦い方と武器が変わる、4つの戦場。';$('how').innerHTML='<b>Σ / FRACTURE RAID</b><p>4種類の戦場を一巡ずつ、順不同で再構築。破砕突破は防壁と横道、制圧は二つの高台と二本の橋、走破は加速盤のある周回路、標的狩りは両側から迫る近接戦。地形・目標・敵の出現位置をひとまとめに生成します。</p><p>各世界30秒。開始時の武器は自動選択されるが、1–7キーでいつでも切替可能。敵は同時に最大4体（ボス戦3体）。射撃型は突破・制圧で最大1体、走破・標的狩りは近接型だけ。浮遊射撃型は出現しません。</p><p>F／捕獲ボタンで0.55秒の構え。正面4.2m以内の敵弾を最大6発まで吸収し、もう一度Fで撃ち返します。ダッシュで2.2m以内の弾を捕獲可能。満タンの返撃は衝撃波を伴い、防壁も破壊します。</p><p>青く縦に光る防壁は銃でも破壊可能。HP72、足場は壊れません。捕獲に無敵時間はなく、失敗した弾は通常どおり命中します。</p><p>4種類の任務を達成して3コアを奪い、中枢ボスを撃破。失敗6回か耐久0で終了。Qで各世界1回の武器引き直し、達成後Eで次の世界へ。世界再構築で捕獲弾は消えるため、返撃の使いどころも判断しよう。</p>';$('record').textContent=`Σ BEST ${fractureSaved.best.toLocaleString()} / RUNS ${fractureSaved.runs} / CLEARS ${fractureSaved.wins}`;$('inputhelp').textContent=$('controlsHint').textContent=mobile?'左スティック移動 / FIRE射撃 / 捕獲→返撃 / Q引き直し':'WASD・矢印 移動 / F 捕獲→返撃 / 1–7 武器切替 / Q 引き直し / E 脱出 / SHIFT ダッシュ';}}
const omegaHints=['着弾点へ反響。敵の進路を読んで先に撃て。','命中で敵を減速。追う敵をひとつずつ足止め。','壁を一度反射。射線を変えて遮蔽の裏を狙え。','着弾点に重力場。敵を寄せてまとめて制圧。','往路と復路で2回攻撃。動く敵へ戻り弾も通せ。'];
function drawOmegaHUD(dt){const active=isRiftMode()&&!!p&&['playing','paused','upgrade'].includes(state),custom=p?.weapon===6;$('omega-hud').hidden=!active;omegaVisuals.update(state==='playing'?dt:0,{active:active&&custom,low:mobile||$('quality').value==='low',reduced:reducedMotion,reload:p?.reload>0?clamp(1-p.reload/reloadDuration(),.001,.999):0,kick:recoil,time:clock});if(!active)return;
 const profile=omegaGunProfile(p.weapon),name=omegaWeaponName(p.weapon),remaining=Math.max(0,Math.ceil(20-omegaShiftTimer));$('pulse-hud').hidden=true;$('omega-state').textContent='RIFT IN '+remaining+'s';$('omega-core').textContent=name;$('omega-parts').textContent=profile.role;$('omega-info').textContent=custom?`${currentOmega().range}m / ${p.ammo[6]}·${currentOmega().mag} / 装填 ${reloadDuration(6).toFixed(1)}s`:`${p.ammo[p.weapon]} / ${magSize(p.weapon)}発 · 装填 ${reloadDuration(p.weapon).toFixed(1)}s`;$('omega-trait').textContent='RIFT '+remaining+'s';$('omega-help').textContent=profile.text+' '+world.rule();if(state==='playing')omegaBrief=Math.max(0,omegaBrief-dt);$('omega-help').hidden=omegaBrief<=0;$('omega-help').classList.toggle('expanded',omegaBrief>0);$('omega-details').setAttribute('aria-expanded',String(omegaBrief>0));$('weaponname').textContent=name;$('reloadstatus').textContent=p.reload>0?'RELOADING / '+p.reload.toFixed(1)+'s':`${p.ammo[p.weapon]} / ${magSize(p.weapon)} · RIFT IN ${remaining}s`;$('drivelabel').textContent=p.over>0?'OVERDRIVE / DAMAGE +15%':'KINETIC CHARGE';}
function clearOmegaRaidTargets(){
 for(let i=enemies.length-1;i>=0;i--){const e=enemies[i];if(e.omegaObjective){scene.remove(e.mesh);enemies.splice(i,1);}else e.omegaHunt=0;}
 raidVisuals.clear();raidTargets=[];raidHuntTargets=[];raidHold=0;$('raid-marker').hidden=true;
}
// Σ reconstructs the encounter as well as its floor. Living enemies keep their
// remaining health fraction; changing a role grants neither XP nor free kills.
function retireFractureActor(e){scene.remove(e.mesh);const index=enemies.indexOf(e);if(index>=0)enemies.splice(index,1);}
function placeFractureActor(e,point){
 e.mesh.position.set(point.x,point.y+(e.type==='boss'?3:1),point.z);
 e.mesh.rotation.y=Math.atan2(p.x-point.x,p.z-point.z);
 e.attack=0;e.navTime=0;e.navRoute=null;e.dir?.set(0,0,0);e.cd=Math.max(e.cd,1.2);e.mesh.visible=true;
}
function repositionFractureSurvivors(layout){
 const remaining=enemies.filter(e=>e.hp>0&&!e.omegaObjective&&e.type!=='boss');
 const roster=composeIntentEncounter(layout.intent,remaining.length,random,true),occupied=[];
 for(const type of roster){
  const point=layout.spawnPoint(type,random()*Math.PI*2,p.x,p.z,occupied);if(!point)continue;
  let index=remaining.findIndex(e=>e.type===type);if(index<0)index=0;
  const previous=remaining.splice(index,1)[0];let e=previous;
  if(previous.type!==type){const ratio=clamp(previous.hp/previous.max,0,1);retireFractureActor(previous);e=spawn(type,point.x,point.z);e.hp=Math.max(1,e.max*ratio);}
  placeFractureActor(e,point);occupied.push(point);
 }
 // Only applies if a safe spawn could not be found; never put a replacement
 // directly on the player to satisfy a nominal population count.
 for(const e of remaining)retireFractureActor(e);
 if(bossRef?.hp>0){const point=layout.spawnPoint('boss',0,p.x,p.z,occupied);if(point)placeFractureActor(bossRef,point);}
}
function placeFractureHuntTargets(){
 for(let i=0;i<raidTargets.length;i++){
  const target=raidTargets[i],type=i===0?'chaser':'charger';
  let e=enemies.find(e=>e.hp>0&&!e.omegaObjective&&!e.omegaHunt&&e.type===type);
  if(!e){
   const live=enemies.filter(e=>e.hp>0&&!e.omegaObjective&&e.type!=='boss');
   const replacement=live.length>=6?live.find(e=>!e.omegaHunt):null;
   const ratio=replacement?clamp(replacement.hp/replacement.max,0,1):1;
   if(replacement)retireFractureActor(replacement);
   e=spawn(type,target.root.position.x,target.root.position.z);e.hp=Math.max(1,e.max*ratio);
  }
  placeFractureActor(e,{x:target.root.position.x,y:target.root.position.y,z:target.root.position.z});
  e.omegaHunt=omegaRaid.round;target.enemy=e;raidHuntTargets.push({enemy:e,visual:target});
 }
}
function raidPathLength(from,to){const route=world.path(from.x,from.z,to.x,to.z);if(!route.length)return Math.hypot(to.x-from.x,to.z-from.z)<1?0:Infinity;let sum=0,previous=from;for(const point of route){sum+=Math.hypot(point.x-previous.x,point.z-previous.z);previous=point;}return sum;}
function raidTargetPoints(kind,count){
 const authored=world.radar().intent;if(difficulty==='fracture'&&authored?.mission===kind)return authored.targets.slice(0,count).map((point,i)=>({...point,id:'raid-'+omegaRaid.round+'-'+i,done:false,active:kind==='breach'||kind==='hunt'||i===0}));
 const layout=world.radar(),nodes=layout.reachableNodes?.length?layout.reachableNodes:layout.nodes,points=[],origin={x:p.x,z:p.z};let from=origin;
 for(let i=0;i<count;i++){let best=null,bestScore=Infinity;const offset=Math.floor(random()*nodes.length),stride=Math.max(1,Math.floor(nodes.length/60));
  for(let j=0;j<nodes.length;j+=stride){const c=nodes[(j+offset)%nodes.length],straight=Math.hypot(c.x-from.x,c.z-from.z);if(straight<6||straight>27||points.some(t=>Math.hypot(c.x-t.x,c.z-t.z)<6))continue;const walk=raidPathLength(from,c);if(walk>24)continue;let score=Math.abs(walk-16)+random()*3;if(kind==='breach'){const v=new T.Vector3(c.x-p.x,c.h+1.65-(p.y+1.65),c.z-p.z),len=v.length();if(seekerWallDistance(new T.Vector3(p.x,p.y+1.65,p.z),v.normalize(),len)<len-.5)score+=15;}if(score<bestScore){bestScore=score;best=c;}}
  if(!best){const candidates=nodes.filter(c=>!points.some(t=>Math.hypot(c.x-t.x,c.z-t.z)<3)).sort((a,b)=>Math.hypot(a.x-from.x,a.z-from.z)-Math.hypot(b.x-from.x,b.z-from.z));best=candidates.find(c=>raidPathLength(from,c)<=24)||layout.nearest(from.x,from.z);}
  if(!best)break;points.push({id:'raid-'+omegaRaid.round+'-'+i,x:best.x,y:best.h,z:best.z,done:false,active:kind==='breach'||kind==='hunt'||i===0});if(kind!=='breach')from=best;
 }return points;
}
function startOmegaRaid(forceKind){
 clearOmegaRaidTargets();omegaRaid.begin({bossAlive:!!bossRef&&bossRef.hp>0,kind:difficulty==='fracture'?world.radar().intent?.mission:undefined});if(forceKind&&['breach','relay','route','hunt','boss'].includes(forceKind))omegaRaid.kind=forceKind;raidStarted=true;omegaShiftTimer=0;wave=Math.min(6,omegaRaid.cores+1);spawnTimer=.8;p.inv=Math.max(p.inv,1.2);
 if(omegaRaid.kind==='boss'){
  if(!raidBossSpawned){clearObjects(enemies);bossRef=spawn('boss');raidBossSpawned=true;p.hp=Math.max(p.hp,p.max*.6);spawnQueue=riftEncounter(world.radar().arenaForm,3,true);$('boss').querySelector('small').textContent='WORLD HEART / アンカーを撃ってコアを暴け';}
  if(bossRef?.hp>0){const e=bossRef;raidVisuals.setTargets('hunt',[{id:'world-heart',x:e.mesh.position.x,y:e.mesh.position.y-3,z:e.mesh.position.z,active:true}]);raidTargets=raidVisuals.getTargets();raidHuntTargets=[{enemy:e,visual:raidTargets[0]}];}
 }else{
  const points=raidTargetPoints(omegaRaid.kind,omegaRaid.needed);raidVisuals.setTargets(omegaRaid.kind,points);raidTargets=raidVisuals.getTargets();
  if(omegaRaid.kind==='breach')for(const target of raidTargets){const mesh=new T.Group(),center=target.center||{x:target.root.position.x,y:target.root.position.y+1.65,z:target.root.position.z};mesh.position.set(center.x,center.y,center.z);scene.add(mesh);const e={mesh,core:target.core,limbs:[],type:'objective',r:.95,hp:46,max:46,t:0,cd:999,flash:0,omegaObjective:true,raidVisual:target};target.enemy=e;enemies.push(e);}
  if(omegaRaid.kind==='hunt'&&difficulty==='fracture'&&world.radar().intent){placeFractureHuntTargets();}
  else if(omegaRaid.kind==='hunt')for(let i=0;i<raidTargets.length;i++){const target=raidTargets[i];let e=enemies.filter(e=>e.hp>0&&!e.omegaObjective&&e.type!=='boss'&&!e.omegaHunt).sort((a,b)=>a.mesh.position.distanceToSquared(new T.Vector3(p.x,p.y,p.z))-b.mesh.position.distanceToSquared(new T.Vector3(p.x,p.y,p.z)))[0];if(!e||Math.hypot(e.mesh.position.x-p.x,e.mesh.position.z-p.z)>35)e=spawn(difficulty==='fracture'?'charger':i?'shooter':'charger',target.root.position.x,target.root.position.z);e.omegaHunt=omegaRaid.round;target.enemy=e;raidHuntTargets.push({enemy:e,visual:target});}
 }
 $('wave').textContent=(difficulty==='fracture'?'Σ':'Ω')+(omegaRaid.kind==='boss'?' / WORLD HEART':` / CORE ${omegaRaid.cores} / ${omegaRaid.snapshot().coresToBoss}`);
 notify((difficulty==='fracture'&&world.radar().intent?world.radar().intent.name:omegaRaid.snapshot().title)+' / '+omegaWeaponName(p.weapon),2);sound(560,.13,'triangle',.035);
}
function omegaRaidReward(event){if(!event)return;$('wave').textContent=(difficulty==='fracture'?'Σ':'Ω')+(event.cores>=omegaRaid.snapshot().coresToBoss?' / WORLD HEART READY':` / CORE ${event.cores} / 5`);score+=event.reward.score;p.hp=Math.min(p.max,p.hp+event.reward.heal);p.over=Math.max(p.over,4);p.charge=100;raidHold=0;notify(event.cores>=omegaRaid.snapshot().coresToBoss?'ボス出現 / 次の再構築で中枢ボス出現':'CORE STOLEN / '+event.cores+' / 5 · 耐久 +12',2.4);burst(new T.Vector3(p.x,p.y+1,p.z),0x8affdf,16);sound(840,.3,'triangle',.055);}
function updateOmegaRaid(dt){
 if(!raidStarted||!omegaRaid.active||state!=='playing'||ultimate.active)return;
 for(const item of raidHuntTargets){const {enemy,visual}=item;if(enemy.hp<=0){visual.done=true;continue;}visual.root.position.set(enemy.mesh.position.x,enemy.mesh.position.y-(enemy.type==='boss'?3:enemy.type==='strafer'?1.7:1),enemy.mesh.position.z);}
 if(!omegaRaid.completed&&['relay','route'].includes(omegaRaid.kind)){const target=raidTargets[omegaRaid.value];if(target){const near=Math.hypot(p.x-target.root.position.x,p.z-target.root.position.z)<(omegaRaid.kind==='relay'?2.2:1.9)&&Math.abs(p.y-target.root.position.y)<3;raidHold=omegaRaid.kind==='relay'?(near?Math.min(1.25,raidHold+dt):Math.max(0,raidHold-dt*.8)):0;target.data.fill=raidHold/1.25;if(omegaRaid.kind==='route'?near:raidHold>=1.25){target.done=true;target.active=false;raidHold=0;omegaRaidReward(omegaRaid.advanceProgress());if(raidTargets[omegaRaid.value])raidTargets[omegaRaid.value].active=true;sound(680,.12,'sine',.03);}}}
 for(const event of omegaRaid.tick(dt)){if(event.type==='complete')omegaRaidReward(event);else if(event.type==='shift'){if(event.gameOver){finishOmega(false);return;}beginOmegaReconstruction('cycle');return;}}
 omegaShiftTimer=omegaRaid.elapsed;
}
function updateOmegaReinforcements(dt){
 spawnTimer-=dt;const live=enemies.filter(e=>e.hp>0&&!e.omegaObjective),cap=difficulty==='fracture'?(omegaRaid.kind==='boss'?4:4):(omegaRaid.kind==='boss'?4:6);if(!spawnQueue.length)spawnQueue=riftEncounter(world.radar().arenaForm,3,false);const rangedAlive=difficulty==='fracture'&&live.some(e=>isRangedRiftEnemy(e.type));const nextIndex=difficulty==='fracture'?spawnQueue.findIndex(type=>!isRangedRiftEnemy(type)||!rangedAlive):0;if(spawnTimer<=0&&live.length<cap&&nextIndex>=0){const type=spawnQueue[nextIndex];if(difficulty==='fracture'&&world.radar().intent){const point=world.radar().spawnPoint(type,random()*Math.PI*2,p.x,p.z,live.map(e=>e.mesh.position));if(!point){spawnTimer=.25;return;}spawn(type,point.x,point.z);}else spawn(type);spawnQueue.splice(nextIndex,1);spawnTimer=difficulty==='fracture'?1.5:(omegaRaid.completed?1.25:.95);}
}
function rerollOmegaRaidWeapon(){if(!isRiftMode()||state!=='playing'||ultimate.active||!omegaRaid.consumeReroll())return false;omegaEquipWeapon(omegaDraftOptions()[0]);notify('REDEAL / '+omegaWeaponName(p.weapon),1.2);sound(700,.1,'triangle',.025);return true;}
function extractOmegaRaid(){if(!isRiftMode()||state!=='playing'||ultimate.active||!omegaRaid.active||!omegaRaid.completed)return false;updateOmegaRaid(omegaRaid.remaining+.001);return true;}
function drawOmegaRaidHUD(dt=0){
 const visible=isRiftMode()&&raidStarted&&['playing','paused','upgrade','rebuilding'].includes(state),r=omegaRaid.snapshot();$('raid-mission').hidden=!visible;$('raid-marker').hidden=true;raidVisuals.update(state==='playing'?dt:0,{time:clock,active:visible&&state!=='rebuilding',completed:r.completed,current:r.progress,progress:raidHold/1.25,low:mobile||$('quality').value==='low'});if(!visible)return;
 const intent=difficulty==='fracture'?world.radar().intent:null;const missionText=intent&&intent.mission===r.kind&&r.kind!=='boss'?intent.instruction:null;
 $('raid-title').textContent=r.completed?'CORE STOLEN / 達成':missionText?intent.name.split(' / ')[0]:r.title;$('raid-instruction').textContent=r.completed?(r.bossReady?`${r.cores}コア獲得。次の世界で中枢ボスを倒せ。`:'任務達成。')+(mobile?'次へ進むか、残り時間で回復を回収。':'Eで次へ進むか、残り時間で回復を回収。'):missionText||((r.kind==='relay'?'光る台に入って1.25秒キープ。':'')+r.instruction);$('raid-progress').textContent=r.kind==='boss'?'WARDEN':`${r.progress} / ${r.needed}`;$('raid-meter').style.width=100*(r.completed?1:(r.progress+(r.kind==='relay'?raidHold/1.25:0))/Math.max(1,r.needed))+'%';$('raid-cores').textContent=`${r.cores} / ${r.coresToBoss}`;$('raid-misses').textContent=`${r.misses} / ${r.maxMisses}`;$('raid-time').textContent=String(Math.ceil(r.remaining));$('raid-mission').classList.toggle('urgent',r.remaining<=5&&!r.completed);$('raid-mission').classList.toggle('complete',r.completed);$('raid-reroll').disabled=(!r.completed&&!r.rerollAvailable)||state!=='playing';$('raid-reroll').setAttribute('aria-label',r.completed?'任務達成。次の世界へ進む':'武器を引き直す。各世界1回');$('raid-reroll').querySelector('span').textContent=r.completed?(mobile?'次の世界へ':'E / 次の世界へ'):r.rerollAvailable?(mobile?'武器を引き直す':'Q / 武器を引き直す'):'REDEAL USED';
 if(state!=='playing'||r.completed)return;let target=raidTargets.filter(t=>!t.done&&(t.active||r.kind==='breach'||r.kind==='hunt'))[0];if(!target)return;const at=target.root.position.clone();at.y+=r.kind==='breach'?1.65:r.kind==='hunt'?3:2;camera.updateMatrixWorld(true);const projected=at.clone().project(camera),forward=new T.Vector3(0,0,-1).applyQuaternion(camera.quaternion),behind=at.clone().sub(camera.position).dot(forward)<=0;let x=projected.x,y=projected.y;if(behind){x=-x;y=-y;if(Math.abs(x)<.4)x=x<0?-1:1;}const edge=behind||Math.abs(x)>.85||Math.abs(y)>.7;$('raid-marker').hidden=false;$('raid-marker').classList.toggle('offscreen',edge);$('raid-marker').style.left=clamp((x*.5+.5)*innerWidth,25,innerWidth-25)+'px';$('raid-marker').style.top=clamp((-y*.5+.5)*innerHeight,100,innerHeight-85)+'px';$('raid-marker-label').textContent=({breach:'破壊',relay:'制圧',route:'通過',hunt:'標的',boss:'WARDEN'})[r.kind]||'目標';$('raid-marker-distance').textContent=Math.round(Math.hypot(at.x-p.x,at.z-p.z))+'m';
}

function resetKinetic(){kinetic.reset();kineticVisuals.reset();kineticKick=0;$('kinetic-hud').hidden=true;}
function damageOmegaCover(origin,direction,power,range=80){
 if(difficulty!=='fracture'||state!=='playing')return null;const event=world.damageCover(origin,direction,power,range);if(event?.destroyed){score+=50;notify('FRACTURE / 防壁を突破',1);sound(100,.18,'triangle',.045);}return event;
}
function damageOmegaCoverNear(point,radius,power){
 if(difficulty!=='fracture'||state!=='playing')return[];const events=world.breakCoverNear(point,radius,power),broken=events.filter(e=>e.destroyed).length;if(broken){score+=broken*50;notify('FRACTURE / '+broken+' 防壁を破砕',1.2);sound(80,.22,'triangle',.05);}return events;
}
function captureKineticBullet(b,old,closest,target){
 if(difficulty!=='fracture'||state!=='playing'||b.life<=0)return false;const distance=closest.distanceTo(target),dashCapture=p.dashing>0&&distance<2.2,forward=new T.Vector3(0,0,-1).applyQuaternion(camera.quaternion),incoming=old.clone().sub(target);const front=incoming.lengthSq()>.001&&incoming.normalize().dot(forward)>.15;
 if(!(dashCapture||(kinetic.window>0&&distance<4.2&&front))||!kinetic.capture(dashCapture))return false;b.life=0;kineticCaptured++;score+=15;kineticVisuals.capture(closest);sound(460+kinetic.stored*65,.065,'triangle',.025);return true;
}
function pressKinetic(){
 if(difficulty!=='fracture'||state!=='playing'||ultimate.active)return false;const event=kinetic.press();if(!event)return false;
 if(event.type==='catch'){sound(380,.12,'sine',.025);return true;}
 kineticReturned+=event.cells;kineticKick=event.charged?.18:.09;viewKick=Math.min(.07,viewKick+(event.charged?.035:.015));const origin=camera.position.clone(),forward=new T.Vector3(0,0,-1).applyQuaternion(camera.quaternion),limit=seekerWallDistance(origin,forward,70),from=kineticVisuals.muzzle.getWorldPosition(new T.Vector3()),targets=enemies.filter(e=>e.hp>0).map(e=>{const delta=e.mesh.position.clone().sub(origin),length=delta.length();return{e,length,dir:delta.normalize()};}).filter(t=>t.length<=65&&t.dir.dot(forward)>.9&&seekerWallDistance(origin,t.dir,t.length)>=t.length-t.e.r).sort((a,b)=>b.dir.dot(forward)-a.dir.dot(forward)||a.length-b.length).slice(0,3);
 let impact=origin.clone().addScaledVector(forward,Math.min(55,limit)),fired=0;const struck=new Set();for(let i=0;i<event.cells;i++){const living=targets.filter(t=>t.e.hp>0);if(!living.length)break;const t=living[i%living.length],to=t.e.mesh.position.clone();beam(from,to,event.charged?0xffdc96:0x8affee,.035,.17);damage(t.e,42*(t.e.type==='boss'?(t.e.exposed>0?1.4:.8):1),false,{kinetic:true});arsenalKnockback(t.e,origin,event.charged?2.8:1.3);impact=to;struck.add(t.e);fired++;}
 if(!fired)beam(from,impact,event.charged?0xffdc96:0x8affee,.06,.2);
 if(event.charged){const blastOrigin=impact.clone().addScaledVector(forward,-.18),splash=enemies.filter(e=>e.hp>0&&e.mesh.position.distanceTo(impact)<=6).sort((a,b)=>a.mesh.position.distanceToSquared(impact)-b.mesh.position.distanceToSquared(impact)).filter(e=>{const d=e.mesh.position.clone().sub(blastOrigin),len=d.length();return len<.01||seekerWallDistance(blastOrigin,d.normalize(),len)>=len-e.r;}).slice(0,3);for(const e of splash){damage(e,60*(1-e.mesh.position.distanceTo(impact)/8)*(e.type==='boss'?.6:1),false,{kinetic:true});arsenalKnockback(e,impact,3.4);}damageOmegaCoverNear(impact,7,144);notify('FULL RETURN / 捕獲弾を一斉返撃',1.3);}
 else if(!fired)damageOmegaCover(origin,forward,event.cells*28,70);
 kineticVisuals.release({from,to:impact,cells:event.cells,charged:event.charged});sound(event.charged?85:220,event.charged?.28:.15,'triangle',.055);return true;
}
function drawKineticHUD(dt){
 const active=difficulty==='fracture'&&['playing','paused'].includes(state);$('kinetic-hud').hidden=!active;kineticKick=Math.max(0,kineticKick-(state==='playing'?dt:0));kineticVisuals.update(state==='playing'?dt:0,{active,window:kinetic.window,stored:kinetic.stored,kick:kineticKick,time:clock,low:mobile||$('quality').value==='low'});if(!active)return;const k=kinetic.snapshot();$('kinetic-status').textContent=k.catching?'CATCH WINDOW':k.stored===6?'FULL RETURN':k.stored?'RETURN READY':k.cooldown>0?'RECHARGING':'KINETIC ARM';$('kinetic-count').textContent=k.stored+' / 6';for(let i=0;i<$('kinetic-cells').children.length;i++)$('kinetic-cells').children[i].classList.toggle('filled',i<k.stored);$('kinetic-hud').classList.toggle('full',k.stored===6);$('kinetic-hud').classList.toggle('catching',k.catching);$('kinetic-action').disabled=state!=='playing'||ultimate.active||!k.ready;$('kinetic-action').querySelector('span').textContent=k.stored?(mobile?'返撃 '+k.stored:'F / 返撃 '+k.stored):(mobile?'弾を捕獲':'F / 弾を捕獲');
}

function finishOmega(win){if(state!=='playing')return;resetKinetic();state=win?'victory':'dead';input.fire=input.firePressed=false;omegaRaid.active=false;omegaCombat.reset();seeker.clearFlight();seeker.clearLocks();sniperScope(false);phaseControl.reset();ultimate.reset();clearOmegaRaidTargets();document.exitPointerLock?.();const record=difficulty==='fracture'?fractureSaved:omegaSaved;record.runs++;if(win){record.wins++;score+=3000;}record.best=Math.max(record.best,score);try{localStorage.setItem(difficulty==='fracture'?'overdrive-fracture-intents-v1':'overdrive-omega-raid-v1',JSON.stringify(record));}catch{}$('panel').hidden=false;$('paneltag').textContent=(difficulty==='fracture'?'Σ':'Ω')+(win?' / WORLD HEART DESTROYED':' / RIFT RAID FAILED');$('paneltitle').textContent=win?'世界を壊して、奪い返した。':omegaRaid.gameOver?'世界に、置き去りにされた。':'次の世界で、奪い返せ。';$('paneltext').textContent=`CORE ${omegaRaid.cores}/5 · MISS ${omegaRaid.misses}/4 · RIFT ${omegaRaid.round} / SCORE ${score} / ${kills} KILLS / SEED ${seed}`;$('choices').innerHTML='';$('resume').hidden=true;$('restart').hidden=$('home').hidden=false;}

function syncTitanPreview(){const active=$('difficulty').value==='titan';document.body.classList.toggle('titan-preview',active);$('start').innerHTML=active?'進撃を開く <span>↗</span>':'出撃する <span>→</span>';if(!active)return;$('loadout').disabled=true;$('loadout').title='進撃の装備と訓練コースは進撃画面で選択します。';$('difficulty-summary').textContent='進撃 — 添付版のODM RAIDで街を飛び、巨人の装甲を砕いてうなじを斬る。';$('menu-tagline').textContent='進撃 — 城壁都市を駆け、巨人を討て。';$('menu-intro').innerHTML='左右の立体ワイヤーとガス噴射で飛び回れ。<br>雷装で肩装甲を割り、背後からうなじを断て。';$('how').innerHTML='<b>進撃 / ODM TITAN RAID</b><p>添付された統合版を本編の難易度として起動します。出撃画面で雷装数や訓練コースを選べます。設定から画質・重力・射程・最高速度も調整できます。</p><p>操作：Q / E ワイヤー、SHIFT ガス噴射、WASD 移動、SPACE ジャンプ、R 雷装、CLICK / F 刃、B 刃交換、V 視点切替。スマホは左スティックと右側スワイプ。</p>';$('inputhelp').textContent=$('controlsHint').textContent=mobile?'左スティック移動 / 右側スワイプ照準 / 画面ボタンで操作':'WASD移動 / マウス視点 / Q・Eワイヤー / SHIFTガス / R雷装 / F刀 / B交換 / V視点';}
syncOmegaPreview();syncTitanPreview();
const titanFrame=$('titan-frame');function exitTitanMode(){titanFrame.hidden=true;titanFrame.removeAttribute('srcdoc');titanFrame.removeAttribute('src');$('titan-back').hidden=true;state='menu';$('menu').hidden=false;$('hud').hidden=true;$('panel').hidden=true;syncDifficultyPreview();syncXPreview();syncOmegaPreview();syncTitanPreview()}$('titan-back').addEventListener('click',exitTitanMode);titanFrame.addEventListener('load',()=>titanFrame.contentWindow?.postMessage({type:'overdrive:set-quality',quality:$('quality').value},'*'));window.addEventListener('message',event=>{if(event.source!==titanFrame.contentWindow)return;if(event.data?.type==='overdrive:quality-change'&&['auto','low','high','max'].includes(event.data.quality)&&$('quality').value!==event.data.quality){$('quality').value=event.data.quality;quality();}});

$('kinetic-action').onclick=pressKinetic;
$('raid-reroll').onclick=()=>omegaRaid.completed?extractOmegaRaid():rerollOmegaRaidWeapon();
$('omega-details').onclick=()=>{omegaBrief=omegaBrief>0?0:12;};
function ejectOmegaCasing(){if(fx.length>180)return;const shell=casingTemplates[0].clone();shell.position.copy(omegaVisuals.port.getWorldPosition(new T.Vector3()));shell.quaternion.copy(camera.quaternion);shell.rotateZ(.9);scene.add(shell);fx.push({mesh:shell,life:.9,max:.9,casing:true,vel:new T.Vector3(1.8,1.2,.5).applyQuaternion(camera.quaternion),spin:14});}

// Enable departure after the full hosted game bundle has initialized.
$('start').disabled=false;
