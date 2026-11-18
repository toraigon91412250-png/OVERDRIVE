import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import wardenData from '../assets/bosses/warden.json';
import ramData from '../assets/bosses/ram.json';
import siegeData from '../assets/bosses/siege.json';
import mirrorData from '../assets/bosses/mirror.json';
import bulwarkData from '../assets/bosses/bulwark.json';
import phoenixData from '../assets/bosses/phoenix.json';
import gravityData from '../assets/bosses/gravity.json';
import tempestData from '../assets/bosses/tempest.json';
import devourerData from '../assets/bosses/devourer.json';
import leviathanNormalData from '../assets/bosses/leviathan-normal.json';
import leviathanAwakenedData from '../assets/bosses/leviathan-awakened.json';
const embedded={warden:wardenData,ram:ramData,siege:siegeData,mirror:mirrorData,bulwark:bulwarkData,phoenix:phoenixData,gravity:gravityData,tempest:tempestData,devourer:devourerData,leviathan:leviathanNormalData};

// The original binaries, including vertex colors and authored animation tracks,
// are embedded as gzip data. No viewer code, external fetch or CDN is required.
const cache=new Map(),pending=new Map(),loader=new GLTFLoader();
const definition={
 warden:{height:6,front:-1,color:0x79dfff,core:'reactor__gyroscope',idle:'idle',walk:'walk',telegraph:'telegraph',attack:'fire',hit:'hit',stagger:'stagger',death:'defeat'},
 ram:{height:4.5,front:1,color:0xff506c,core:'RAM_Head',idle:'Idle',walk:'Walk',telegraph:'Charge_Ready',attack:'Boost'},
 siege:{height:8,front:-1,color:0xffb45c,core:'MAIN_SUPERHEAVY_TURRET__YAW_0220',idle:'Idle',walk:'Walk',telegraph:'Aim',attack:'Fire',stagger:'Brace'},
 mirror:{height:4.8,front:-1,color:0x72e4ff,core:'torso',idle:'idle',walk:'walk',telegraph:'telegraph',attack:'shoot',hit:'hit',stagger:'stagger',death:'death'},
 bulwark:{height:9,front:-1,color:0x62e4c7,core:'ancient_heart_core',idle:'Idle',walk:'Walk',telegraph:'CorePulse',attack:'HeavyPunch',special:'GroundSlam',stagger:'Awakening'},
 phoenix:{span:21,front:-1,flying:true,color:0xffb467,core:'Regeneration_Core',idle:'PHOENIX_Hover',walk:'PHOENIX_Flight',telegraph:'PHOENIX_Soar',attack:'PHOENIX_Awakening'},
 gravity:{height:7,front:1,flying:true,color:0xcf8fff,core:'CORE_V2',idle:'Idle_GravityBreath',telegraph:'Phase_GravityOverdrive',attack:'Attack_GravityPulse',special:'Special_SingularityCannon'},
 tempest:{span:20,front:-1,flying:true,color:0x9be8ff,core:'StormHead',idle:null,telegraph:null,attack:'Lightning_Strike',special:'Celestial_Thunderfall'},
 leviathan:{span:22,front:-1,color:0x75dfff,core:'LEFT_REACTOR',idle:'Idle',walk:'Swim',telegraph:'Breach',attack:'WaterBlast',special:'TailSweep',stagger:'Rage'},
 devourer:{span:22,front:-1,flying:true,color:0xf58ba6,core:'chest',idle:'Idle',telegraph:'Roar',attack:'ShadowBreath',special:'ShadowBreath',stagger:'FoldWings'}
};
const effectPattern=/^(?:FX_|GroundSlam_shockwave|CorePulse_expanding_wave)|SHOCKWAVE|CANNON_BEAM|CANNON_FLASH/i;
function effectNode(node){for(let n=node;n;n=n.parent)if(effectPattern.test(n.name))return true;return false;}
function physicalBounds(model){
 model.updateWorldMatrix(true,true);const box=new THREE.Box3(),local=new THREE.Matrix4(),inverse=model.matrixWorld.clone().invert();
 model.traverse(node=>{if(!node.isMesh||effectNode(node))return;node.geometry.computeBoundingBox();local.multiplyMatrices(inverse,node.matrixWorld);box.union(node.geometry.boundingBox.clone().applyMatrix4(local));});
 return box;
}
function prepareMaterials(gltf,id){
 const seen=new Set();gltf.scene.traverse(node=>{if(!node.isMesh)return;node.castShadow=node.receiveShadow=true;for(const material of Array.isArray(node.material)?node.material:[node.material]){
  if(!material||seen.has(material))continue;seen.add(material);
  if(id==='bulwark'){
   if(material.name==='PBR_AncientRock_VertexColor'){material.color.setRGB(.22,.22,.21);material.metalness=0;material.roughness=1;}
   else if(material.name==='PBR_NaturalMoss_VertexColor'){material.color.setRGB(.27,.34,.20);material.metalness=0;material.roughness=1;}
   else if(material.name==='StoneDust')material.color.multiplyScalar(.65);
  }
  // Reflective source models still have a readable silhouette without an HDR map.
  if(material.isMeshStandardMaterial&&material.metalness>.72)material.metalness=.72;
 }});
}
async function decode(record){
 const bytes=Uint8Array.from(atob(record.gzip),character=>character.charCodeAt(0));
 if(typeof DecompressionStream!=='function')throw Error('This browser needs gzip decompression support to load boss models.');
 return new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
}
function loadCached(id,record){
 if(cache.has(id))return Promise.resolve(cache.get(id));if(pending.has(id))return pending.get(id);
 if(!record)return Promise.reject(new Error('Unknown supplied boss: '+id));
 const promise=decode(record).then(buffer=>new Promise((resolve,reject)=>loader.parse(buffer,'',gltf=>{prepareMaterials(gltf,id);cache.set(id,gltf);resolve(gltf);},reject))).catch(error=>{pending.delete(id);throw error;});
 pending.set(id,promise);return promise;
}
export async function preloadBossModels(ids=Object.keys(embedded)){
 await Promise.all(ids.map(id=>id==='leviathan'?Promise.all([loadCached('leviathan',leviathanNormalData),loadCached('leviathan-awakened',leviathanAwakenedData)]):loadCached(id,embedded[id])));
}
export function bossModelsReady(ids=Object.keys(embedded)){return ids.every(id=>cache.has(id)&&(id!=='leviathan'||cache.has('leviathan-awakened')));}
export const bossModelIds=Object.freeze(Object.keys(embedded));
export function registerBossModel(id,record,config){embedded[id]=record;definition[id]=config;}
export function createBossModel(id){return id==='leviathan'?createLeviathanModel():createSingleBossModel(id);}
function createSingleBossModel(id,cacheId=id){
 const gltf=cache.get(cacheId),config=definition[id];if(!gltf||!config)throw Error('Boss model must be preloaded: '+id);
 // The delivered assets use rigid animated nodes, without skin bindings.
 // Keep every imported joint parent intact so absolute animation translations
 // cannot stretch necks or detach arms when the action changes.
 const model=gltf.scene.clone(true),root=new THREE.Group(),pivot=new THREE.Group();root.name='BOSS_MODEL_'+id;root.userData.bossId=id;root.add(pivot);pivot.add(model);
 const bounds=physicalBounds(model),size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());
 const factor=config.span?config.span/Math.max(size.x,size.z):config.height/size.y;
 model.scale.multiplyScalar(factor);model.position.set(-center.x*factor,-bounds.min.y*factor,-center.z*factor);
 pivot.rotation.y=config.front<0?Math.PI:0;pivot.position.y=config.flying?.5:-1;
 root.updateMatrixWorld(true);
 const bodyBounds=new THREE.Box3();model.traverse(node=>{if(node.isMesh&&!effectNode(node))bodyBounds.union(new THREE.Box3().setFromObject(node));});
 const physicalSize=bodyBounds.getSize(new THREE.Vector3()),bodyCenter=bodyBounds.getCenter(new THREE.Vector3());
 const actionDuration=Object.fromEntries(['idle','walk','telegraph','attack','special','hit','stagger','death'].map(name=>[name,gltf.animations.find(clip=>clip.name===config[name])?.duration||0]));
 const actionImpact={special:id==='bulwark'?1.6:0};
 const metrics={id,size:physicalSize.toArray(),height:physicalSize.y,radius:Math.max(physicalSize.x,physicalSize.z)*.5,groundedBase:config.flying?.5:-1,flying:!!config.flying,clips:gltf.animations.map(clip=>clip.name),actionDuration,actionImpact};
 let anchor=model.getObjectByName(config.core);if(!anchor){model.traverse(node=>{if(!anchor&&/core|heart|reactor/i.test(node.name)&&!effectNode(node))anchor=node;});}anchor||=model;
 const core=new THREE.Mesh(new THREE.IcosahedronGeometry(id==='siege'?.42:.3,1),new THREE.MeshBasicMaterial({color:config.color,transparent:true,opacity:.8,depthWrite:false}));core.name='BOSS_WEAKPOINT_'+id;root.add(core);
 const fallbackCore=bodyCenter.clone();fallbackCore.z=Math.min(physicalSize.z*.36,2);fallbackCore.y=bodyBounds.min.y+physicalSize.y*.58;
 const muzzleSource=id==='leviathan'?model.getObjectByName('Mouth_Blast_Origin'):null;
 const muzzle=muzzleSource?new THREE.Object3D():null;if(muzzle){muzzle.name='BOSS_MUZZLE_'+id;root.add(muzzle);}
 const hitTargets=[],effects=[];model.traverse(node=>{if(!node.isMesh)return;if(effectNode(node))effects.push(node);else hitTargets.push(node);});hitTargets.push(core);
 const mixer=new THREE.AnimationMixer(model),actions={};for(const clip of gltf.animations)actions[clip.name]=mixer.clipAction(clip);
 let active=null,mode='idle',oneShotRemaining=0,disposed=false,age=0,wasAttacking=false,wasTelegraph=false;
 const anchorWorld=new THREE.Vector3();
 function syncCore(){root.updateWorldMatrix(true,true);if(anchor!==model){anchor.getWorldPosition(anchorWorld);core.position.copy(root.worldToLocal(anchorWorld));}else core.position.copy(fallbackCore);if(muzzle){muzzleSource.getWorldPosition(anchorWorld);muzzle.position.copy(root.worldToLocal(anchorWorld));}}
 function play(name,options={}){
  if(disposed)return false;const selected=actions[name]?name:config[name];if(!selected||!actions[selected]){
   if(name==='idle'&&!config.idle){if(active)active.fadeOut(.15);active=null;mode='idle';return true;}return false;
  }
  const action=actions[selected];if(active===action&&!options.force)return true;
  if(active)active.fadeOut(options.fade??.12);
  action.paused=false;action.reset().setEffectiveWeight(1).setEffectiveTimeScale(options.speed||1);action.clampWhenFinished=!!options.once;action.setLoop(options.once?THREE.LoopOnce:THREE.LoopRepeat,options.once?1:Infinity);action.fadeIn(options.fade??.12).play();active=action;mode=name;
  if(options.once)oneShotRemaining=action.getClip().duration/(options.speed||1);return true;
 }
 function update(dt=0,state={}){
  if(disposed)return;age+=Math.max(0,dt);oneShotRemaining=Math.max(0,oneShotRemaining-dt);
  const dead=state.dead||state.health!==undefined&&state.health<=0;
  const telegraph=!!state.telegraph||/windup|warning|telegraph/.test(String(state.phase));
  const attacking=!!state.attack||/active|attack|charge|fire/.test(String(state.phase));
  const special=state.special||id==='bulwark'&&state.attackName==='slam'||id==='gravity'&&state.attackName==='beam'||id==='tempest'&&state.attackName==='thunderfall';
  const attackKey=id==='leviathan'?(state.attackName==='tailsweep'?'TailSweep':'WaterBlast'):(special?'special':'attack');
  const windupKey=id==='leviathan'&&state.awakened?'Rage':'telegraph';
  const next=dead?'death':state.stagger?'stagger':state.hit?'hit':attacking?attackKey:telegraph?windupKey:state.moving?'walk':'idle';
  const attackStarted=attacking&&!wasAttacking,windupStarted=telegraph&&!wasTelegraph;
  // The supplied GroundSlam contains its own 1.6s lift/drop. Follow the game
  // phase through that clip so the expanding impact ring starts when the visible
  // fists actually land, rather than at the first frame of a second windup.
  const slam=id==='bulwark'&&state.attackName==='slam'&&(telegraph||attacking||state.phase==='recovery');
  if(slam){
   if(mode!=='slam'||windupStarted)play('GroundSlam',{once:true,force:true,fade:.08});
   mode='slam';oneShotRemaining=0;active.paused=true;
   const progress=THREE.MathUtils.clamp(Number(state.phaseProgress)||0,0,1);
   active.time=telegraph?progress*1.6:attacking?1.6+progress*.15:1.75+progress*1.049;
   mixer.update(Math.max(0,dt));
  }else {
   // Attack clips finish their recovery instead of looping. Reset on each new
   // attack phase even when this asset has no idle/windup clip (TEMPEST).
   if(attackStarted)play(next,{once:true,force:true,fade:.04,speed:id==='ram'||id==='phoenix'?1.2:1.12});
   else if(next!==mode&&(oneShotRemaining<=0||telegraph||dead||attacking)){
    if(!play(next,{once:['death','hit','stagger','attack','special'].includes(next)})&&telegraph){
     if(active)active.fadeOut(.12);active=null;mode='telegraph';oneShotRemaining=0;
    }
   }
   if(active&&(mode==='telegraph'||id==='leviathan'&&telegraph)&&Number.isFinite(state.phaseDuration)&&state.phaseDuration>0)active.setEffectiveTimeScale(active.getClip().duration/state.phaseDuration);
   else if(active&&(mode==='telegraph'||id==='leviathan'&&telegraph))active.setEffectiveTimeScale(1);
   mixer.update(Math.max(0,dt));
  }
  wasAttacking=attacking;wasTelegraph=telegraph;
  for(const mesh of effects)mesh.visible=attacking||telegraph;
  // The animated mesh retains its authored heights. Flying roots simply hover
  // above their terrain-relative position rather than sinking into the floor.
  const progress=THREE.MathUtils.clamp(Number(state.phaseProgress)||0,0,1);
  const recovering=state.phase==='recovery';
  let coilY=0,coilZ=0,coilPitch=0,coilYaw=0,coilRoll=0,coilScale=1;
  if(id!=='leviathan'&&!slam){
   if(telegraph){
    const ease=progress*progress;
    const jitter=Math.sin(age*42)*ease;
    if(id==='ram'){
     coilY=-.28*ease;
     coilZ=-config.front*.55*ease+.04*jitter;
     coilPitch=-config.front*.14*ease;
     coilScale=1+.045*jitter;
    }else if(config.flying){
     coilY=.65*ease;
     coilZ=-config.front*.48*ease;
     coilPitch=config.front*.24*ease;
     coilRoll=.09*Math.sin(age*14)*ease;
     coilYaw=(id==='phoenix'?.22:-.16)*ease;
     coilScale=1+.04*jitter;
    }else{
     coilY=(id==='siege'?-.16:.18)*ease;
     coilZ=-config.front*.42*ease;
     coilPitch=config.front*.18*ease;
     coilYaw=(id==='warden'||id==='mirror'?.28:0)*ease;
     coilScale=1+.035*jitter;
    }
   }else if(attacking){
    const snap=Math.pow(Math.max(0,1-progress*1.6),1.6);
    if(id==='ram'){
     coilY=-.18*snap;
     coilZ=config.front*.85*snap;
     coilPitch=-config.front*.22*snap;
     coilScale=1+.08*snap;
    }else if(config.flying){
     coilY=-.55*snap;
     coilZ=config.front*.78*snap;
     coilPitch=-config.front*.28*snap;
     coilRoll=(id==='phoenix'?-.24:.18)*snap;
     coilScale=1+.07*snap;
    }else{
     coilY=(id==='siege'?-.28:.06)*snap;
     coilZ=(id==='siege'?-config.front*.55:config.front*.58)*snap;
     coilPitch=(id==='siege'?config.front*.22:-config.front*.2)*snap;
     coilYaw=(id==='warden'||id==='mirror'?-.32:0)*snap;
     coilScale=1+.06*snap;
    }
   }else if(recovering){
    const settle=Math.max(0,1-progress*1.8);
    coilY=-.12*settle;
    coilZ=-config.front*.18*settle;
    coilPitch=config.front*.07*settle;
   }
  }
  pivot.position.y=(config.flying?.5:-1)+(config.flying?Math.sin(age*1.4)*.13:0)+coilY;
  pivot.position.z=coilZ;
  pivot.rotation.set(coilPitch,coilYaw,coilRoll);
  pivot.scale.setScalar(coilScale);
  syncCore();root.userData.animation=active?.getClip().name||'rest';
 }
 function dispose(){if(disposed)return;disposed=true;mixer.stopAllAction();mixer.uncacheRoot(model);root.removeFromParent();core.geometry.dispose();core.material.dispose();}
 play('idle');mixer.update(0);syncCore();for(const mesh of effects)mesh.visible=false;
 return {root,core,muzzle,aimPoint:core,bodyCenter,limbs:[],hitTargets,metrics,update,play,dispose,mixer,inspect:()=>({id,animation:active?.getClip().name||'rest',animationTime:active?.time||0,mode,metrics,disposed})};
}


// Both supplied Leviathan forms share the same geometry and articulated rig.
// Interpolate their actual authored materials and swap the active mesh set at
// the midpoint. This avoids overlapping transparent bodies during awakening.
function createLeviathanModel(){
 if(!bossModelsReady(['leviathan']))throw Error('Boss model must be preloaded: leviathan');
 const normal=createSingleBossModel('leviathan'),awakened=createSingleBossModel('leviathan','leviathan-awakened');
 const root=new THREE.Group();root.name='BOSS_MODEL_leviathan';root.userData.bossId='leviathan';
 normal.root.name='LEVIATHAN_NORMAL_FORM';awakened.root.name='LEVIATHAN_AWAKENED_FORM';root.add(normal.root,awakened.root);awakened.root.visible=false;
 const core=normal.core,muzzle=new THREE.Object3D();muzzle.name='BOSS_MUZZLE_leviathan';root.attach(core);root.add(muzzle);awakened.core.visible=false;
 const hitTargets=[...normal.hitTargets],bodyCenter=normal.bodyCenter.clone(),metrics={...normal.metrics,awakened:false,form:'normal',forms:['normal','awakened'],awakeningDuration:.55};
 function copyMaterials(actor){const mapping=new Map();actor.root.traverse(mesh=>{if(!mesh.isMesh||mesh===actor.core)return;const clone=material=>{if(!mapping.has(material))mapping.set(material,material.clone());return mapping.get(material);};mesh.material=Array.isArray(mesh.material)?mesh.material.map(clone):clone(mesh.material);});return [...mapping.values()];}
 const normalMaterials=copyMaterials(normal),awakenedMaterials=copyMaterials(awakened);
 const baseNormal=normalMaterials.map(material=>material.clone()),baseAwakened=awakenedMaterials.map(material=>material.clone());
 let hasAwakened=false,progress=0,active=normal,disposed=false;
 const point=new THREE.Vector3(),normalCoreColor=core.material.color.clone(),awakenedCoreColor=new THREE.Color(0xff657f);
 function blendMaterials(t){for(let i=0;i<normalMaterials.length;i++){const a=baseNormal[i],b=baseAwakened[i];if(!b)continue;for(const target of [normalMaterials[i],awakenedMaterials[i]]){if(!target)continue;for(const key of ['color','emissive'])if(target[key]&&a[key]&&b[key])target[key].copy(a[key]).lerp(b[key],t);for(const key of ['opacity','emissiveIntensity','roughness','metalness'])if(Number.isFinite(a[key])&&Number.isFinite(b[key]))target[key]=THREE.MathUtils.lerp(a[key],b[key],t);}}core.material.color.copy(normalCoreColor).lerp(awakenedCoreColor,t);}
 function update(dt=0,state={}){
  if(disposed)return;const seconds=Number.isFinite(dt)?Math.max(0,dt):0;
  if(Number.isFinite(state.health)&&state.health<=.5)hasAwakened=true;
  if(hasAwakened)progress=Math.min(1,progress+seconds/.55);
  const pose={...state,awakened:hasAwakened};normal.update(seconds,pose);awakened.update(seconds,pose);awakened.core.visible=false;
  const next=progress>=.5?awakened:normal;
  if(next!==active){active=next;hitTargets.splice(0,hitTargets.length,...active.hitTargets.filter(mesh=>mesh!==active.core),core);}
  normal.root.visible=active===normal;awakened.root.visible=active===awakened;blendMaterials(progress);
  root.updateWorldMatrix(true,true);active.muzzle.getWorldPosition(point);muzzle.position.copy(root.worldToLocal(point));
  // normal and awakened rigs receive identical poses throughout interpolation;
  // the retained public weakpoint therefore remains attached to the reactor.
  core.visible=state.dead!==true;metrics.awakened=hasAwakened;metrics.form=active===awakened?'awakened':'normal';root.userData.animation=active.inspect().animation;
 }
 function play(name,options){const a=normal.play(name,options),b=awakened.play(name,options);return a&&b;}
 function dispose(){if(disposed)return;disposed=true;normal.dispose();awakened.dispose();root.removeFromParent();for(const material of [...normalMaterials,...awakenedMaterials,...baseNormal,...baseAwakened])material.dispose();}
 update(0,{health:1});
 return {root,core,muzzle,aimPoint:core,bodyCenter,limbs:[],hitTargets,metrics,update,play,dispose,mixer:normal.mixer,inspect:()=>({...active.inspect(),metrics,awakened:hasAwakened,awakeningProgress:progress,form:metrics.form,disposed})};
}
