import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import data from '../../assets/titan/models.json';
import bladeData from '../../assets/titan/ultrahard-blade.json';
import warhammerData from '../../assets/titan/warhammer.json';
import {prepareWarhammerAsset,warhammerBodyBounds,createWarhammerMotion} from './warhammer.js';
import {createGear,batchTree} from './gear.js';
import {createEncounter} from './encounter.js';
import {createContactTest} from './contact.js';
import {createBodyResolver} from './collision.js';
import {createRunStats} from './stats.js';
import {prepareAttackFace} from './appearance.js';
export {readPreferences,writePreferences} from './preferences.js';

export const types={warhammer:{name:'戦鎚の巨人',height:15,armor:false,detail:'大鎚の振り下ろしを横へ避け、戻す隙にうなじへ。正面は硬く、側面と背後が有効。'},armored:{name:'鎧の巨人',height:15,armor:true,detail:'雷槍、または肩への斬撃3回で装甲を破壊。背後のうなじを狙え。'},jaw:{name:'顎の巨人',height:5,armor:false,detail:'噛みつきの予兆を見て背後へ。雷槍で削り、最後は刃でうなじを断て。'},attack:{name:'進撃の巨人',height:15,armor:false,detail:'手の軌道と踏みつけを避け、攻撃後の隙に背後のうなじを斬れ。'},colossal:{name:'超大型巨人',height:60,armor:false,detail:'高い建物と城壁で高度を取れ。蒸気が収まった隙にうなじへ。'}};
const assetCache=new Map(),assetLoader=new GLTFLoader();
export function loadAsset(name){if(!assetCache.has(name)){const bytes=Uint8Array.from(atob(name==='warhammer'?warhammerData.glb:data[name]),c=>c.charCodeAt(0));assetCache.set(name,new Promise((resolve,reject)=>assetLoader.parse(bytes.buffer,'',gltf=>{if(name==='attack')prepareAttackFace(gltf.scene);if(name==='warhammer')prepareWarhammerAsset(gltf);batchTree(gltf.scene);resolve(gltf)},reject)).catch(error=>{assetCache.delete(name);throw error;}));}return assetCache.get(name);}
function loadBladeAsset(){const name='aot-ultrahard-blade';if(!assetCache.has(name)){const bytes=Uint8Array.from(atob(bladeData.glb),c=>c.charCodeAt(0));assetCache.set(name,new Promise((resolve,reject)=>assetLoader.parse(bytes.buffer,'',resolve,reject)).catch(error=>{assetCache.delete(name);throw error;}));}return assetCache.get(name);}
export function create(ctx){
 const {scene,V,P,targets,anchors,hooks,player,arms,thirdSwords,oldGear,camera,missiles}=ctx;
 const cache=assetCache;let current=null,ready=false,serial=0,time=0,turn=0;
 let armorFX=[],spear=null,projectile=null,gear=null,frameSpear=[],equippedSwords=[];
 let storage;try{storage=globalThis.localStorage;}catch{}const stats=createRunStats(storage);
 const vec=new THREE.Vector3(),box=new THREE.Box3(),resolveBody=createBodyResolver(),touchesPlayer=createContactTest(),posePoint=new THREE.Vector3(),steamDummy=new THREE.Object3D();
 const steamCloud=new THREE.InstancedMesh(new THREE.SphereGeometry(1,8,6),new THREE.MeshBasicMaterial({color:0xc1bab0,transparent:true,opacity:.15,depthWrite:false}),32);steamCloud.name='raid-steam';steamCloud.visible=false;steamCloud.frustumCulled=false;scene.add(steamCloud);
 const ownTargets=new Set();for(const mesh of targets)if(!mesh.userData.enemy&&!ctx.skipEquipment){mesh.userData.enemy=V;ownTargets.add(mesh);}
 function load(name){return loadAsset(name);}
 function register(o,part='body'){o.userData.titanPart=part;o.userData.enemy=V;ownTargets.add(o);targets.push(o);anchors.push(o);}
 function disposeGenerated(o){o.removeFromParent();o.geometry?.dispose();if(o.material!==invisible)o.material?.dispose();}
 function removeOld(){for(const o of ownTargets){if(o.userData.raidGenerated)disposeGenerated(o);const ti=targets.indexOf(o);if(ti>=0)targets.splice(ti,1);const ai=anchors.indexOf(o);if(ai>=0)anchors.splice(ai,1);}ownTargets.clear();for(const o of armorFX)disposeGenerated(o);while(V.root.children.length)V.root.remove(V.root.children[0]);}
 const invisible=new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false});
 function proxy(part,pos,size,visible=false){const o=new THREE.Mesh(new THREE.SphereGeometry(1,12,8),visible?new THREE.MeshStandardMaterial({color:0xff652e,emissive:0xff2a00,emissiveIntensity:.5,roughness:.6}):invisible);o.userData.raidGenerated=true;o.position.copy(pos);o.scale.copy(size);V.root.add(o);register(o,part);return o;}
 function reset(){for(const item of frameSpear){item.shotTime=0;item.root.visible=false;}if(!current)return;clearPunchRig();stats.reset(current.type,P.thunderAmmo);const cfg=types[current.type];V.root.scale.setScalar(cfg.height/20.5);V.root.position.set(...(ctx.spawn||[0,0,18]));V.hp=V.maxHp||100;V.alive=true;V.deathAge=0;current.deathStartX=current.deathStartZ=0;current.deathCarry=null;for(const mesh of ownTargets){mesh.visible=true;if(!anchors.includes(mesh))anchors.push(mesh);}V.root.visible=true;V.root.rotation.set(0,0,0);V.armorL=V.armorR=cfg.armor;V.armorCutsL=V.armorCutsR=0;V.napeOpen=!cfg.armor;V.weak.visible=!cfg.armor;for(const p of armorFX)p.visible=cfg.armor;V.armorPlateL.visible=V.armorPlateR.visible=cfg.armor;time=0;turn=0;V.attackCooldown=7;current.warned=false;current.hitReact=null;current.hitFlash=null;current.knockback=null;current.stagger=0;current.stunResistance=0;current.strikeNumber=-1;current.lungeTravel=0;for(const finger of current.fingers||[])finger.pivot.rotation[finger.axis]=0;steamCloud.visible=false;current.encounter?.reset();V.slamRing.visible=false;for(const j of current.joints)j.o.quaternion.copy(j.base);
 if(current.warhammer)current.warhammer.reset();else if(current.mixer){current.mixer.stopAllAction();current.action='';play('idle');}
 if(current.type==='colossal'&&!ctx.spawn){P.pos.set(0,8,125);P.pitch=.25;}ctx.hud();
 }
 function play(name){if(!current?.mixer||current.action===name)return;const next=current.actions[name];if(!next)return;for(const action of Object.values(current.actions))action.fadeOut(.2);next.reset().fadeIn(.2).play();current.action=name;}
 async function select(type){if(!Object.hasOwn(types,type))throw new Error('Unknown titan type: '+type);const ticket=++serial;ready=false;ctx.loading(true);try{const gltf=await load(type);if(ticket!==serial)return;current?.mixer?.stopAllAction();if(current)for(const j of current.joints)j.o.quaternion.copy(j.base);removeOld();const model=gltf.scene.clone(true);model.removeFromParent();model.position.set(0,0,0);model.scale.setScalar(1);model.rotation.set(0,0,0);if(ctx.normalVariant){const hair=model.getObjectByName('Hair_198');if(hair)hair.visible=false;const head=model.getObjectByName('Head_149');if(head)head.scale.x*=1.08;}model.updateMatrixWorld(true);if(type==='warhammer')box.copy(warhammerBodyBounds(model));else box.setFromObject(model);const size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());
 const wrap=new THREE.Group();wrap.add(model);model.position.sub(new THREE.Vector3(center.x,box.min.y,center.z));wrap.scale.setScalar(20.5/size.y);V.root.add(wrap);wrap.updateMatrixWorld(true);
 current={type,model,wrap,mixer:null,actions:{},action:'',joints:[],hands:[],feet:[],fingers:[]};
 current.encounter=createEncounter(type,{
 manualContact:true,
 warning:warning=>{V.slamRing.visible=!!warning&&warning.radius>0;if(warning){V.slamRing.scale.setScalar(warning.radius);V.slamRing.position.set(V.root.position.x,.14,V.root.position.z);ctx.notice({bite:'顎が開く — 正面から離れろ！',steam:'蒸気噴出の予兆 — 距離を取れ！',sweep:'腕を振りかぶった — 手の軌道から離れろ！',punch:type==='armored'?'鎧が重い拳を引く — ガードか横移動！':'拳を引いた — ガードか横移動！',lunge:'顎が身を沈めた — 飛び込みを横へ避けろ！',stomp:'片足を上げた — 足元から離れろ！',hammer:'大鎚を振り上げた'}[warning.attack]);}},
 hit:attack=>ctx.hurt({bite:'噛みつき',lunge:'顎の飛び込み',punch:type==='armored'?'鎧の重打撃':'巨人の拳',steam:'高熱の蒸気',sweep:'腕払い',stomp:'踏みつけ',hammer:'戦鎚の振り下ろし'}[attack],V.root.position,attack==='hammer'?1.4:type==='armored'&&attack==='punch'?1.35:1,attack==='hammer'?'punch':attack==='sweep'?'swipe':attack==='lunge'?'bite':attack),
 impact:(attack,hit)=>{if(!hit)ctx.notice('攻撃後の隙 — 背後へ！');}
 });
 model.traverse(o=>{if(o.isMesh){let visible=true;for(let parent=o;parent&&parent!==model;parent=parent.parent)if(!parent.visible){visible=false;break;}if(visible)register(o);o.castShadow=true;o.receiveShadow=true;}});
 const names=type==='armored'?{arms:['Shoulder_L','Shoulder_R'],elbows:['Elbow_L','Elbow_R'],hands:['Elbow_L','Elbow_R'],hips:['Hip_L','Hip_R'],feet:['Foot_L','Foot_R']}:type==='attack'?{arms:['Pivot_096','Pivot_120'],elbows:['Pivot_103','Pivot_127'],hands:['Pivot_108','Pivot_132'],hips:['Pivot_050','Pivot_073'],feet:['Pivot_061','Pivot_084']}:type==='colossal'?{arms:['Titan_Arm_L','Titan_Arm_R'],hands:[],hips:['Titan_Leg_L','Titan_Leg_R'],feet:[]}:{arms:[],hands:[],hips:[],feet:[]};
 for(const role of ['arms','hips','elbows'])for(const [i,name] of (names[role]||[]).entries()){const o=model.getObjectByName(name);if(o)current.joints.push({o,base:o.quaternion.clone(),role,side:i?1:-1});}
 function socket(name,low=false){const node=model.getObjectByName(name);if(!node)return null;box.setFromObject(node);const point=box.getCenter(new THREE.Vector3());if(low)point.y=box.min.y+(box.max.y-box.min.y)*.13;return {node,local:node.worldToLocal(point),previous:new THREE.Vector3(),position:new THREE.Vector3()};}
 // Preserve the supplied fingers and curl them only for a closed-fist attack.
 if(type==='attack')for(const name of names.hands){const hand=model.getObjectByName(name),digits=[...hand.children];
  for(let i=0;i<4;i++){const pivot=new THREE.Group();pivot.position.set(digits[2+i*2].position.x,-.43,.04);hand.add(pivot);hand.updateWorldMatrix(true,true);pivot.attach(digits[2+i*2]);pivot.attach(digits[3+i*2]);current.fingers.push({pivot,axis:'x',angle:-2.25});}
  const thumb=digits[10],pivot=new THREE.Group();pivot.position.copy(thumb.position);hand.add(pivot);hand.updateWorldMatrix(true,true);pivot.attach(thumb);current.fingers.push({pivot,axis:'z',angle:name===names.hands[0]?-.65:.65});
 }
 current.hands=names.hands.map(name=>socket(name,type==='armored')).filter(Boolean);
 current.shoulders=names.arms.map(name=>model.getObjectByName(name));current.elbows=(names.elbows||[]).map(name=>model.getObjectByName(name));current.strikeTarget=new THREE.Vector3();current.lungeDirection=new THREE.Vector3();
 current.feet=names.feet.map(name=>socket(name,true)).filter(Boolean);
 current.mouth=type==='jaw'?socket('jaw'):null;
 if(gltf.animations.length){current.mixer=new THREE.AnimationMixer(model);for(const clip of gltf.animations)current.actions[clip.name]=current.mixer.clipAction(clip);if(type==='warhammer')current.warhammer=createWarhammerMotion(model,current.mixer,current.actions);}
 const w=size.x*20.5/size.y,d=size.z*20.5/size.y;current.colliders=[{node:V.root,center:new THREE.Vector3(0,type==='jaw'?10:11.6,0),radius:new THREE.Vector3(w*.18,type==='jaw'?4:4.8,d*.30)}];
 // Invisible hit volumes follow the model; armor is a separate breakable visual.
 const head=model.getObjectByName(type==='jaw'?'head':type==='attack'?'Head_149':type==='armored'?'Head':type==='warhammer'?'Head_Rig':'Titan_Head');
 let hp=new THREE.Vector3(0,18.2,0),headSize=new THREE.Vector3(2.5,3,2);if(head){box.setFromObject(head);hp=V.root.worldToLocal(box.getCenter(new THREE.Vector3()));headSize=box.getSize(new THREE.Vector3()).divideScalar(V.root.scale.x);}
 const napePos=new THREE.Vector3(hp.x,hp.y-headSize.y*.26,hp.z-headSize.z*.46);
 V.weak=proxy('nape',napePos,new THREE.Vector3(.75,.65,.45),true);V.weak.name='raid-nape';
 const shoulderY=type==='jaw'?12.6:15.8;
 V.armorPlateL=proxy('armorL',new THREE.Vector3(-w*.37,shoulderY,d*.27),new THREE.Vector3(w*.14,1.25,d*.29));
 V.armorPlateR=proxy('armorR',new THREE.Vector3(w*.37,shoulderY,d*.27),new THREE.Vector3(w*.14,1.25,d*.29));
 armorFX=[V.armorPlateL,V.armorPlateR].map(p=>{const o=new THREE.Mesh(new THREE.SphereGeometry(1,10,7),new THREE.MeshStandardMaterial({color:0xbab49a,metalness:.25,roughness:.65}));o.position.copy(p.position);o.scale.copy(p.scale).multiplyScalar(.92);V.root.add(o);return o;});
 // Preserve local hit positions as head and shoulder groups animate.
 if(head){head.attach(V.weak);head.updateWorldMatrix(true,false);const worldCenter=V.root.localToWorld(hp.clone());const headScale=head.getWorldScale(new THREE.Vector3());const r=headSize.clone().multiplyScalar(V.root.scale.x*.39);r.set(r.x/Math.abs(headScale.x),r.y/Math.abs(headScale.y),r.z/Math.abs(headScale.z));current.colliders.push({node:head,center:head.worldToLocal(worldCenter),radius:r});}
 V.weak.userData.baseScale=V.weak.scale.clone();
 for(const [index,name] of ['Shoulder_L','Shoulder_R'].entries()){
  const joint=model.getObjectByName(name);if(joint){joint.attach(index?V.armorPlateR:V.armorPlateL);joint.attach(armorFX[index]);}
 }
 // Let impact bend the upper body around its waist while feet stay planted.
 // These additive pivots leave all imported joint and animation tracks intact.
 const body=model.getObjectByName(type==='attack'?'Body_001':type==='armored'?'Torso':type==='jaw'?'rig-body':type==='warhammer'?'Torso_Rig':'ColossalTitan_GameMesh');
 if(body&&type!=='warhammer'){
  model.updateWorldMatrix(true,true);box.setFromObject(model);const bodyBounds=box.clone(),waistPoint=box.getCenter(new THREE.Vector3());waistPoint.y=box.min.y+(box.max.y-box.min.y)*(type==='jaw'?.46:.48);
  const upper=new THREE.Group();upper.name='raid-impact-upper-body';upper.position.copy(body.worldToLocal(waistPoint.clone()));const children=[...body.children];body.add(upper);
  for(const child of children){
   if(/^(?:Hip_|Pivot_050$|Pivot_073$|Titan_Leg_|hip[-1])/.test(child.name))continue;
   const childCenter=new THREE.Box3().setFromObject(child).getCenter(new THREE.Vector3());
   if(childCenter.y>waistPoint.y||child===head||current.shoulders.includes(child))upper.attach(child);
  }
  let headPivot=null;
  // The Jaw GLB animates its head directly from the torso rig and has no
  // separate neck joint. A second impact pivot opens a visible seam there,
  // so let its head follow the upper-body recoil as one connected piece.
  if(head&&type!=='jaw'){head.updateWorldMatrix(true,true);const headBox=new THREE.Box3().setFromObject(head),neck=headBox.getCenter(new THREE.Vector3());neck.y=headBox.min.y+(headBox.max.y-headBox.min.y)*.12;headPivot=new THREE.Group();headPivot.name='raid-impact-head';headPivot.position.copy(head.parent.worldToLocal(neck));head.parent.add(headPivot);headPivot.attach(head);}
  current.reactionRig={upper,head:headPivot,base:upper.position.clone(),unitHeight:bodyBounds.max.y-bodyBounds.min.y};
 }
 ready=true;reset();ctx.targetChanged(type,types[type]);ctx.loading(false);
 }catch(e){if(ticket!==serial)return;cache.delete(type);ctx.loading(false,e);console.error('Titan asset load failed',e);throw e;}}
 function update(dt){if(!current||!ready)return;time+=dt;const cfg=types[current.type];
 armorFX[0].visible=V.armorL;armorFX[1].visible=V.armorR;
 if(current.type!=='armored'){V.armorL=V.armorR=false;V.napeOpen=true;V.weak.visible=true;}
 for(const item of frameSpear){item.shotTime=Math.max(0,item.shotTime-dt);item.root.visible=!P.third&&(ctx.spearArmed||item.shotTime>0);}
 if(!V.alive){if(gear)for(const r of gear.rotors)if(hooks[r.s<0?0:1].state==='locked')r.disc.rotation.z+=dt*22*r.s;V.deathAge=(V.deathAge||0)+dt;const death=V.deathAge,fall=Math.min(1,death/1.5),carry=current.deathCarry;V.root.rotation.x=current.deathStartX+fall*(carry?carry.local.z:-1)*1.25;V.root.rotation.z=current.deathStartZ*(1-fall)-fall*(carry?carry.local.x:0)*.65;V.root.position.y=-Math.min(3,death*1.35);V.root.visible=death<2.9;
  if(carry&&death<.45){const distance=carry.distance*(1-Math.pow(1-Math.min(1,death/.32),3)),proposal=V.root.position.clone().addScaledVector(carry.direction,Math.max(0,distance-carry.moved));carry.moved=distance;if(ctx.displaceEnemy)ctx.displaceEnemy(V.root.position,proposal,current.type==='jaw'?1.2:1.7,cfg.height);else V.root.position.copy(proposal);}
  steamCloud.visible=death>.38&&death<3.35;const fadeIn=Math.min(1,(death-.38)/.42),fadeOut=Math.min(1,Math.max(0,(3.35-death)/.7));steamCloud.material.opacity=.24*fadeIn*fadeOut;
  if(steamCloud.visible){const cfg=types[current.type];for(let i=0;i<32;i++){const angle=i*2.39996+death*.28,r=1.5+(i%6)*1.35,level=.28+(i%8)*.065;steamDummy.position.set(V.root.position.x+Math.cos(angle)*r,V.root.position.y+cfg.height*level+Math.max(0,death-.38)*(1.6+(i%3)*.3),V.root.position.z+Math.sin(angle)*r);const puff=1.6+(i%4)*.6+death*.35;steamDummy.scale.set(puff,puff*1.35,puff);steamDummy.updateMatrix();steamCloud.setMatrixAt(i,steamDummy.matrix);}steamCloud.instanceMatrix.needsUpdate=true;}return;}
 if(!ctx.skipEquipment)stats.step(dt,P.vel.length(),!P.grounded,P.health,P.thunderAmmo);
 if(current.knockback){const k=current.knockback;let step=dt;if(k.delay>0){const held=Math.min(step,k.delay);k.delay-=held;step-=held;}if(step>0){const before=1-k.remaining/k.duration;step=Math.min(step,k.remaining);k.remaining-=step;const after=1-k.remaining/k.duration,travel=(Math.pow(1-before,3)-Math.pow(1-after,3))*k.distance,proposal=V.root.position.clone().addScaledVector(k.direction,travel);if(ctx.displaceEnemy)ctx.displaceEnemy(V.root.position,proposal,current.type==='jaw'?1.2:1.7,cfg.height);else V.root.position.copy(proposal);}if(k.remaining<=0)current.knockback=null;}
 const delta=vec.copy(P.pos).sub(V.root.position);const dist=Math.hypot(delta.x,delta.z);
 const forward=new THREE.Vector3(0,0,1).applyQuaternion(V.root.quaternion);
 const facing=dist>.01?(delta.x*forward.x+delta.z*forward.z)/dist:1;
 current.stunResistance=Math.max(0,(current.stunResistance||0)-dt);current.stagger=Math.max(0,(current.stagger||0)-dt);const state=current.stagger>0?{...current.encounter.getState(),phase:'recovery',progress:.5,attack:null,remaining:current.stagger}:current.encounter.update(dt,{alive:V.alive,distance:dist,height:P.pos.y,giant:!!P.titanForm,facing});let moved=false;
 V.attackState=state.phase==='warning'?'windup':state.phase==='recovery'?'recovery':state.phase==='active'?'active':'idle';
 if(state.number!==current.strikeNumber&&state.phase==='warning'){
  current.strikeNumber=state.number;current.lungeTravel=0;current.strikeTarget.copy(P.pos).add(new THREE.Vector3(0,-1.3,0));
  current.lungeDirection.set(delta.x,0,delta.z).normalize();
 }
 if((state.giant||current.warhammer)&&state.phase==='warning'&&state.progress<.5&&current.type!=='colossal'){
  const targetYaw=Math.atan2(delta.x,delta.z)-(current.warhammer?.strikeHeading||0),diff=Math.atan2(Math.sin(targetYaw-turn),Math.cos(targetYaw-turn));turn+=THREE.MathUtils.clamp(diff,-dt*1.3,dt*1.3);V.root.rotation.y=turn;
  current.strikeTarget.copy(P.pos).add(new THREE.Vector3(0,-1.3,0));current.lungeDirection.set(delta.x,0,delta.z).normalize();
 }
 if(state.attack==='lunge'&&state.phase==='active'){
  const distance=4.2*THREE.MathUtils.smoothstep(state.progress,0,.7),travel=Math.max(0,distance-current.lungeTravel);current.lungeTravel=distance;
  const proposal=V.root.position.clone().addScaledVector(current.lungeDirection,travel);
  if(ctx.displaceEnemy)ctx.displaceEnemy(V.root.position,proposal,1.2,cfg.height);else V.root.position.copy(proposal);
  V.root.position.y=Math.sin(Math.PI*state.progress)*2.4;
 }else if(current.type==='jaw')V.root.position.y=0;
 if(state.phase==='idle'&&dist<110&&current.type!=='colossal'){
  let desired=Math.atan2(delta.x,delta.z)-(current.warhammer?.strikeHeading||0);
  const stop=current.type==='warhammer'?8.3:current.type==='jaw'?3.0:6.5;
  if(dist>stop){const moveYaw=turn+(current.warhammer?.strikeHeading||0),proposal=V.root.position.clone().add(new THREE.Vector3(Math.sin(moveYaw),0,Math.cos(moveYaw)).multiplyScalar(dt*(current.type==='jaw'?4.8:1.7)));if(ctx.moveEnemy){const result=ctx.moveEnemy(V.root.position,proposal,current.type==='jaw'?1.2:1.7,cfg.height,moveYaw);moved=typeof result==='object'?result.moved:result!==false;if(result&&typeof result==='object'&&Number.isFinite(result.heading))desired=result.heading-(current.warhammer?.strikeHeading||0);}else {V.root.position.copy(proposal);moved=true;}}
  const diff=Math.atan2(Math.sin(desired-turn),Math.cos(desired-turn)),rate=current.type==='jaw'?1.6:.8;
  turn+=Math.max(-dt*rate,Math.min(dt*rate,diff));V.root.rotation.y=turn;
 }
 const ease=x=>x*x*(3-2*x),progress=ease(state.progress),armWind=state.phase==='warning'?progress:state.phase==='active'?1:state.phase==='recovery'?1-progress:0;
 for(const finger of current.fingers)finger.pivot.rotation[finger.axis]=finger.angle*(state.attack==='punch'?Math.min(1,armWind*2):0);
 if(current.type==='jaw')play(state.phase==='warning'?'roar':state.phase==='active'?'bite':moved?'run':'idle');
 if(!current.mixer)for(const {o,base,role,side} of current.joints){
  o.quaternion.copy(base);
  if(state.attack==='sweep'&&role==='arms'){
   o.rotateX(-1.35*armWind);
   const across=state.phase==='active'?progress:state.phase==='recovery'?1:0;
   o.rotateZ(side*(.55-1.4*across)*armWind);
  }else if(state.attack==='stomp'&&role==='hips'&&side===-1){
   const lift=state.phase==='warning'?progress:state.phase==='active'?Math.max(0,1-state.progress*4):0;
   o.rotateX(-.42*lift);
  }else if(state.phase==='idle'&&role==='hips'&&moved)o.rotateX(Math.sin(time*3.2)*.11*side);
 }
 if(state.attack==='punch'&&current.shoulders.length&&current.elbows.length){
  const striking=state.number%2,drive=state.phase==='active'?THREE.MathUtils.smoothstep(state.progress,0,.55):state.phase==='recovery'?1-state.progress:0;
  for(let index=0;index<current.hands.length;index++){
   const side=index?1:-1,guard=V.root.localToWorld(new THREE.Vector3(side*3.2,16.0,1.65));
   const hand=current.hands[index],rest=hand.node.localToWorld(hand.local.clone());
   const target=state.phase==='warning'?rest.lerp(guard,progress):guard;
   if(index===striking)target.lerp(current.strikeTarget,drive);
   aimHand(index,target);
  }
 }
 if(current.warhammer)current.warhammer.pose(state,dt,moved);else current.mixer?.update(dt);
 if(current.hitReact){const react=current.hitReact;react.age+=dt;if(react.part==='punch')applyPunchReaction(react);else {const pulse=Math.sin(Math.min(1,react.age/react.duration)*Math.PI),sign=react.part==='armorL'?-1:react.part==='armorR'?1:.7,recoilScale=Math.min(1,15/types[current.type].height);V.root.rotation.x=-.12*pulse*recoilScale;V.root.rotation.z=sign*.13*pulse*recoilScale;}if(react.age>=react.duration){V.root.rotation.x=0;V.root.rotation.z=0;clearPunchRig();current.hitReact=null;}}
 const flash=current.hitFlash;if(flash){flash.age+=dt;const material=armorFX[flash.part==='armorL'?0:1]?.material;if(material){material.emissive.setHex(0xffd184);material.emissiveIntensity=1.5*(1-Math.min(1,flash.age/flash.duration));}if(flash.age>=flash.duration){if(material){material.emissive.setHex(0x000000);material.emissiveIntensity=0;}current.hitFlash=null;}}
 V.root.updateMatrixWorld(true);
 const canReach=point=>!ctx.canReach||ctx.canReach(point,P.pos);
 let contact=current.warhammer?.contact(P.pos,P.titanForm?12.8:1.4,P.titanForm?2.1:.42,state.attack==='hammer'&&state.phase==='active',canReach)||false;
 for(const [handIndex,hand] of current.hands.entries()){
  hand.position.copy(hand.local);hand.node.localToWorld(hand.position);
  if((state.attack==='sweep'||state.attack==='punch'&&handIndex===state.number%2)&&state.phase==='active'&&state.progress>.08&&state.progress<.88&&touchesPlayer(hand.previous,hand.position,P.pos,.8,P.titanForm?12.8:1.4,P.titanForm?2.1:.42)&&canReach(hand.position))contact=true;
  hand.previous.copy(hand.position);
 }
 if((state.attack==='bite'||state.attack==='lunge')&&current.mouth){const mouth=current.mouth;mouth.position.copy(mouth.local);mouth.node.localToWorld(mouth.position);if(state.phase==='active'&&touchesPlayer(mouth.previous,mouth.position,P.pos,.85,P.titanForm?12.8:1.4,P.titanForm?2.1:.42)&&canReach(mouth.position))contact=true;mouth.previous.copy(mouth.position);}
 if(state.attack==='stomp'&&current.feet[0]){
  const foot=current.feet[0];foot.position.copy(foot.local);foot.node.localToWorld(foot.position);
  V.slamRing.position.set(foot.position.x,.12,foot.position.z);V.slamRing.visible=state.phase==='warning'||state.phase==='active';
  const radius=state.phase==='active'?3.4*Math.min(1,state.progress*2.8):3.4;V.slamRing.scale.setScalar(Math.max(.2,radius));
  if(state.phase==='active'&&state.progress>.25&&(P.pos.y-(P.titanForm?11:0))<3.7&&Math.hypot(P.pos.x-foot.position.x,P.pos.z-foot.position.z)<radius+(P.titanForm?2.1:.42)){posePoint.copy(foot.position);posePoint.y=.8;contact=canReach(posePoint);}
 }
 steamCloud.visible=state.attack==='steam'&&(state.phase==='warning'||state.phase==='active');
 if(steamCloud.visible){
  V.slamRing.visible=true;V.slamRing.position.set(V.root.position.x,.12,V.root.position.z);V.slamRing.scale.setScalar(18);
  steamCloud.material.opacity=state.phase==='active'?.20:.06+.08*state.progress;
  for(let i=0;i<32;i++){const angle=i*2.39996+time*.12,r=6+(i%5)*2.2;steamDummy.position.set(V.root.position.x+Math.cos(angle)*r,(i*1.93+time*3)%cfg.height,V.root.position.z+Math.sin(angle)*r);steamDummy.scale.set(2.7,3.8,2.7);steamDummy.updateMatrix();steamCloud.setMatrixAt(i,steamDummy.matrix);}steamCloud.instanceMatrix.needsUpdate=true;
  if(state.phase==='active'&&dist<18+(P.titanForm?2.1:.42)&&P.pos.y<66){posePoint.set(V.root.position.x,Math.min(P.pos.y,cfg.height*.75),V.root.position.z);contact=canReach(posePoint);}
 }
 if(state.phase==='recovery'||state.phase==='idle')V.slamRing.visible=false;
 current.encounter.resolveContact(contact);
 for(const h of hooks){if(h.state!=='idle'&&h.followObject){h.followObject.updateWorldMatrix(true,false);h.anchor.copy(h.followPoint).applyMatrix4(h.followObject.matrixWorld);}}
 for(const missile of missiles){if(missile.followObject){missile.followObject.updateWorldMatrix(true,false);missile.target.copy(missile.followPoint).applyMatrix4(missile.followObject.matrixWorld);}if(projectile&&!missile.root.userData.newModel)attachProjectile(missile.root);}
 if(gear){for(const r of gear.rotors){if(hooks[r.s<0?0:1].state==='locked')r.disc.rotation.z+=dt*22*r.s;}for(const l of gear.launchers){l.unit.rotation.x=P.boost?-.1:0;}}
 for(const {root,side,shotTime} of frameSpear){root.visible=!P.third&&(ctx.spearArmed||shotTime>0);root.position.y=-.64;root.position.z=-.95+Math.sin(Math.PI*shotTime/.2)*.12;root.rotation.x=0;root.rotation.z=side*.10;}

 }
 function encounterState(){if(!current)return;const state=current.encounter.getState();return current.stagger>0?{...state,phase:'recovery',attack:null,remaining:current.stagger,progress:.5}:state;}
 function finish(won){steamCloud.visible=false;for(const item of frameSpear){item.shotTime=0;item.root.visible=false;}V.slamRing.visible=false;for(const missile of missiles)missile.root.removeFromParent();missiles.length=0;stats.step(0,P.vel.length(),!P.grounded,P.health,P.thunderAmmo);return stats.finish(won);}
 function resolvePlayer(previous){if(!ready||!V.alive||!current||Math.hypot(P.pos.x-V.root.position.x,P.pos.z-V.root.position.z)>types[current.type].height*.6+8)return false;let touched=false;for(const collider of current.colliders)touched=resolveBody(collider.node,collider.center,collider.radius,previous,P.pos,P.vel)||touched;return touched;}
 function deactivate(){serial++;ready=false;V.alive=false;V.root.visible=false;V.slamRing.visible=false;steamCloud.visible=false;}
 function kill(){V.alive=false;V.hp=0;V.deathAge=0;current.deathStartX=V.root.rotation.x;current.deathStartZ=V.root.rotation.z;const k=current.hitReact?.part==='punch'&&current.knockback;current.deathCarry=k?{direction:k.direction.clone(),local:k.direction.clone().applyQuaternion(V.root.quaternion.clone().invert()),distance:k.distance*.65,moved:0}:null;V.slamRing.visible=false;steamCloud.visible=false;current.hitReact=null;current.hitFlash=null;for(const mesh of ownTargets){if(mesh.userData.raidGenerated)mesh.visible=false;const i=anchors.indexOf(mesh);if(i>=0)anchors.splice(i,1);}}
 function stagger(seconds){if(current){current.stagger=Math.max(current.stagger||0,seconds);current.encounter.reset();}}
 function hitReact(part){if(!current||!V.alive)return;clearPunchRig();current.hitReact={age:0,duration:.3,part};if(part==='armorL'||part==='armorR')current.hitFlash={age:0,duration:.24,part};stagger(.42);}
 function punchContact(from,to,radius){
  if(!current||!ready||!V.alive)return null;
  const segment=new THREE.Line3(),nearest=new THREE.Vector3(),scale=new THREE.Vector3();
  for(const c of current.colliders){c.node.updateWorldMatrix(true,false);c.node.getWorldScale(scale);const r=c.radius.clone().add(new THREE.Vector3(radius/Math.abs(scale.x),radius/Math.abs(scale.y),radius/Math.abs(scale.z)));
   const a=c.node.worldToLocal(from.clone()).sub(c.center).divide(r),b=c.node.worldToLocal(to.clone()).sub(c.center).divide(r);segment.set(a,b);segment.closestPointToPoint(new THREE.Vector3(),true,nearest);
   if(nearest.lengthSq()<=1){const hit=nearest.multiply(r).add(c.center);return c.node.localToWorld(hit);}
  }return null;
 }
 function clearPunchRig(){const rig=current?.reactionRig;if(!rig)return;rig.upper.rotation.set(0,0,0);rig.upper.position.copy(rig.base);rig.head?.rotation.set(0,0,0);}
 function applyPunchReaction(react){
  const rig=current?.reactionRig;
  if(!rig){if(current?.warhammer){const pulse=Math.exp(-react.age*9)*react.strength;V.root.rotation.x=react.z*.065*pulse;V.root.rotation.z=-react.x*.065*pulse;}return;}
  const age=react.age,release=THREE.MathUtils.smoothstep(age,.055,react.duration),bodyPulse=(.68+.32*THREE.MathUtils.smoothstep(age,0,.055))*(1-release),headPulse=Math.exp(-age*8)*(1-release),strength=react.strength;
  rig.upper.rotation.set(react.z*.25*bodyPulse*strength,react.twist*.18*bodyPulse*strength,-react.x*.22*bodyPulse*strength);
  rig.upper.position.copy(rig.base);rig.upper.position.x+=react.x*rig.unitHeight*.008*bodyPulse*strength;rig.upper.position.z+=react.z*rig.unitHeight*.008*bodyPulse*strength;
  if(rig.head)rig.head.rotation.set(react.z*.22*headPulse*strength,react.twist*.23*headPulse*strength,-react.x*.13*headPulse*strength);
 }
 function punchReact(direction,{counter=false,hardened=false,side=1,point,guarded=false}={}){
  if(!current||!V.alive)return;
  clearPunchRig();V.root.rotation.x=V.root.rotation.z=0;
  const glance=guarded||!counter&&current.stunResistance>0,local=direction.clone().applyQuaternion(V.root.quaternion.clone().invert());local.y=0;if(local.lengthSq()<.00001)local.set(0,0,-1);else local.normalize();
  const hit=point?V.root.worldToLocal(point.clone()):null,offCenter=hit?THREE.MathUtils.clamp(hit.x/4,-.7,.7):0;
  current.hitReact={age:0,duration:glance?.19:counter?.52:.36,part:'punch',x:local.x,z:local.z,twist:THREE.MathUtils.clamp(side*.65+offCenter,-1,1),strength:(glance?.26:hardened?1.25:counter?1.15:1)*(current.type==='colossal'?.12:1)};
  applyPunchReaction(current.hitReact);V.root.updateMatrixWorld(true);
  if(glance)return;
  const duration=counter?.32:current.type==='armored'?.09:.18;
  current.knockback={direction:direction.clone().setY(0).normalize(),remaining:duration,duration,delay:.055,distance:duration*7};
  current.stagger=counter?.45:.2;current.stunResistance=counter?2.8:2.5;
  current.encounter.interrupt(counter?.7:.2);
 }
 function aimHand(index,target){
  const shoulder=current.shoulders[index],elbow=current.elbows[index],hand=current.hands[index];if(!shoulder||!elbow||!hand)return;
  V.root.updateMatrixWorld(true);
  const origin=shoulder.getWorldPosition(new THREE.Vector3()),joint=elbow.getWorldPosition(new THREE.Vector3()),fist=hand.node.localToWorld(hand.local.clone());
  const upper=origin.distanceTo(joint),lower=joint.distanceTo(fist),axis=target.clone().sub(origin),distance=THREE.MathUtils.clamp(axis.length(),Math.abs(upper-lower)+.01,upper+lower-.025);axis.normalize();
  const bend=new THREE.Vector3(index?.6:-.6,-1,-.1).transformDirection(V.root.matrixWorld);bend.addScaledVector(axis,-bend.dot(axis)).normalize();
  const along=(upper*upper-lower*lower+distance*distance)/(2*distance),height=Math.sqrt(Math.max(0,upper*upper-along*along)),desired=origin.clone().addScaledVector(axis,along).addScaledVector(bend,height);
  function aim(node,from,to){const parent=node.parent.getWorldQuaternion(new THREE.Quaternion()).invert();node.quaternion.premultiply(new THREE.Quaternion().setFromUnitVectors(from.normalize().applyQuaternion(parent),to.normalize().applyQuaternion(parent)));V.root.updateMatrixWorld(true);}
  aim(shoulder,joint.clone().sub(origin),desired.sub(origin));const actual=elbow.getWorldPosition(new THREE.Vector3());aim(elbow,hand.node.localToWorld(hand.local.clone()).sub(actual),target.clone().sub(actual));
 }
 function setVariant(normal){ctx.normalVariant=normal;}
 function setSpawn(position){ctx.spawn=position;}
 function setSpearArmed(armed){for(const sword of equippedSwords)sword.visible=!armed;for(const item of frameSpear){item.root.visible=!!armed&&!P.third;item.shotTime=0;}ctx.spearArmed=armed;}
 function showSpear(side){for(const item of frameSpear)if(item.side===side){item.shotTime=.2;item.root.visible=!P.third;}}
 function attachProjectile(root){if(!projectile)return false;const m=projectile.clone(true);m.rotation.x=Math.PI/2;m.scale.setScalar(.7);root.add(m);root.userData.newModel=true;return true;}
 async function equipment(){const [a,b,bladeAsset]=await Promise.all([load('spear'),load('projectile'),loadBladeAsset()]);spear=a.scene;projectile=b.scene;gear=createGear();gear.root.scale.setScalar(.46);gear.root.rotation.y=Math.PI;gear.root.position.y=.9;player.add(gear.root);oldGear.visible=false;
 const bladeTemplate=bladeAsset.scene,gripNode=bladeTemplate.getObjectByName('Grip_and_Receiver'),bladeNode=bladeTemplate.getObjectByName('Blade_Assembly');
 if(!gripNode||!bladeNode)throw new Error('Ultrahard blade GLB is missing its blade or grip assembly.');
 const gripSurfaces=[bladeTemplate.getObjectByName('Diamond_Textured_Grip_1'),bladeTemplate.getObjectByName('Diamond_Textured_Grip_-1')].filter(Boolean),gripBounds=new THREE.Box3();
 for(const surface of gripSurfaces.length?gripSurfaces:[gripNode])gripBounds.union(new THREE.Box3().setFromObject(surface));
 const gripCenter=gripBounds.getCenter(new THREE.Vector3());
 bladeNode.traverse(object=>{if(!object.isMesh)return;const tune=material=>{const result=material.clone();if(/silver|steel|ridge|bright/i.test(result.name)){result.metalness=.42;result.roughness=.32;result.emissive.set(0x11171a);result.emissiveIntensity=.06;}return result;};object.material=Array.isArray(object.material)?object.material.map(tune):tune(object.material);});
 function makeBlade(parent,placeholder,scale,baseRotation){
  const sword=new THREE.Group(),model=bladeTemplate.clone(true),orientation=new THREE.Euler(Math.PI,0,Math.PI/2);
  sword.name='raid-equipped-blade';sword.position.copy(placeholder.position);if(baseRotation)sword.rotation.copy(baseRotation);
  model.rotation.copy(orientation);model.scale.setScalar(scale);model.position.copy(gripCenter.clone().multiplyScalar(scale).applyEuler(orientation).negate());sword.add(model);parent.add(sword);
  const blade=model.getObjectByName('Blade_Assembly');
  // Preserve the imported .088 unit conversion. Replacing it makes a 17m blade.
  blade.scale.multiply(new THREE.Vector3(1.4,1.15,1));
  const palm=new THREE.Object3D();palm.name='raid-blade-palm';palm.position.copy(gripCenter);model.add(palm);
  return {sword,blade};
 }
 for(const item of arms){const restRotation=new THREE.Euler(0,0,-item.side*.18),{sword,blade}=makeBlade(item.arm,item.sword,1.5,restRotation);sword.position.set(0,-.08,-.01);item.sword.visible=false;equippedSwords.push(sword);item.sword.userData.bladeParts.length=0;item.sword.userData.bladeParts.push(blade);}
 for(const item of thirdSwords){item.sword.visible=false;const {sword,blade}=makeBlade(item.sword.parent,item.sword,1.1,item.sword.rotation);item.visualSword=sword;equippedSwords.push(sword);item.sword.userData.bladeParts.length=0;item.sword.userData.bladeParts.push(blade);}
 for(const side of [-1,1]){const root=new THREE.Group(),model=spear.clone(true);model.scale.setScalar(.28);root.add(model);root.name="raid-firing-spear-"+side;root.visible=false;root.position.set(side*.65,-.64,-.95);camera.add(root);frameSpear.push({root,side,shotTime:0});}
 }
 const equipmentReady=ctx.skipEquipment?Promise.resolve():equipment();equipmentReady.catch(e=>console.error('Equipment load failed',e));
 return {select,reset,update,finish,kill,deactivate,stagger,hitReact,punchContact,punchReact,setSpawn,setVariant,setSpearArmed,retry:async(type)=>{if(!gear)await equipment();return select(type);},showSpear,attachProjectile,resolvePlayer,ready:()=>ready&&(ctx.skipEquipment||!!gear),type:()=>current?.type,equipmentReady,inspect:()=>({ready,type:current?.type,meshCount:ownTargets.size,clips:Object.keys(current?.actions||{}),warhammer:current?.warhammer?.inspect(),equipment:!!gear,spears:frameSpear.map(x=>({side:x.side,visible:x.root.visible,time:x.shotTime})),gearMetrics:gear?.metrics,joints:current?.joints.map(x=>({name:x.o.name,role:x.role,angle:x.o.rotation.x})),hands:current?.hands.map(x=>x.position.toArray()),feet:current?.feet.map(x=>x.position.toArray()),stats:stats.get(),encounter:encounterState(),stunResistance:current?.stunResistance||0,stagger:current?.stagger||0,deathAge:V.deathAge||0,deathSteam:steamCloud.visible,nape:V.weak?.getWorldPosition(new THREE.Vector3()).toArray(),shoulders:[V.armorPlateL,V.armorPlateR].map(o=>o?.getWorldPosition(new THREE.Vector3()).toArray())}),normalize:()=>{},types};
}
