import * as T from 'three';
import {createWorldFracture} from './world-fracture.js';
import {createLayout,CELL,RING_SHIFT_LAYOUT_IDS,createBossArenaLayout} from './stage-layouts.js';
import {createBossArenaScenery} from './boss-arena-scenery.js';
// Campaign arenas retain the original assets; ring shifts use the dedicated RIFT set below.
export const WORLD_THEMES=[
 ['01 / 起動',0x122632,0x163344,0x030c20,0x73ffe0,0x55e6d1],
 ['02 / 蒼の回廊',0x102942,0x276f9f,0x071333,0x70d9ff,0x82d5ff],
 ['03 / 空中庭園',0x25494a,0x68a992,0x123644,0xb9ffe1,0xb4ff9a],
 ['04 / 段丘要塞',0x4b3c34,0xc17b55,0x3a263b,0xffd89e,0xffc875],
 ['05 / 断層交差路',0x30274c,0x805da0,0x140f34,0xd3b4ff,0xc8a6ff],
 ['06 / 終端の王冠',0x49404a,0xc47766,0x321e38,0xffedc2,0xffd5a3],
 ['07 / 空洞王環',0x183945,0x276e85,0x020815,0x84f5ff,0xb9ffff],
 ['08 / 天断回廊',0x582b29,0xba5429,0x190c22,0xff9b56,0xffdf8f],
 ['RIFT 01 / 二界峡谷',0x392d49,0x8e5798,0x100d24,0xe7a7ff,0xffc8fa],
 ['RIFT 02 / 重力盆地',0x364d68,0x6688a6,0x101a2c,0x9fe3ff,0xc8f3ff],
 ['RIFT 03 / 破片の庭',0x3b354b,0x8072a7,0x151124,0xe6d0ff,0xc2ffed],
 ['RIFT 04 / 交差格子',0x2e4041,0x5c978f,0x0b191f,0x88ffe0,0xf2ffb3],
 ['RIFT 05 / 三叉砲列',0x4b3040,0xa35c7f,0x1c102b,0xffb8d9,0xffdb9e],
 ['RIFT 06 / 折返し階段',0x433b2c,0x9e8552,0x1d1920,0xffdc88,0xfff2bd],
 ['RIFT 07 / 斜光断面',0x49372b,0xb16e43,0x211328,0xffc37a,0xffe0a6],
 ['RIFT 08 / 三段断層',0x273a46,0x57829d,0x0a1422,0x8bdfff,0xd0fbff],
];
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)};
// Keep the authored animation timeline while compressing standard rebuild playback.
const BUILD_TIMELINE=10.8,DEFAULT_REBUILD_SECONDS=4;
export function createWorldRebuild({scene,arena,solids,sky,skyObject,floor,hemi,sun,reactor,rings,core,halo,padMaterials,pads,legacyObjects,legacySolids,getStageGimmicks=()=>null}){
 scene.background=new T.Color(0x000000);const root=new T.Group();scene.add(root);
 const metal=new T.MeshStandardMaterial({color:0x243f50,metalness:.65,roughness:.42});
 const light=new T.MeshBasicMaterial({color:0x73ffe0});
 const slab=new T.MeshStandardMaterial({color:0x264555,metalness:.4,roughness:.6});
 const wallMat=new T.MeshStandardMaterial({color:0x355264,metalness:.6,roughness:.48});
 const wireMat=new T.MeshBasicMaterial({color:0x80ffee,wireframe:true,transparent:true,opacity:.5,depthWrite:false});
 const cube=new T.BoxGeometry(1,1,1),matrix=new T.Matrix4(),pos=new T.Vector3(),scale=new T.Vector3(),q=new T.Quaternion(),spinAxis=new T.Vector3(0,0,1);
 const tiles=new T.InstancedMesh(cube,slab,441),wire=new T.InstancedMesh(cube,wireMat,441),walls=new T.InstancedMesh(cube,wallMat,16);
 tiles.frustumCulled=wire.frustumCulled=walls.frustumCulled=false;
 const caps=new T.InstancedMesh(cube,light,16),edges=new T.InstancedMesh(cube,light,1800);caps.frustumCulled=edges.frustumCulled=false;arena.add(tiles,walls);root.add(wire,caps,edges);let borders=[];
 for(const obj of [...legacyObjects,tiles,walls])obj.traverse(o=>{if(o.isMesh){const raycast=o.raycast;o.raycast=function(ray,hits){for(let p=this;p;p=p.parent)if(!p.visible)return;raycast.call(this,ray,hits)};}});
 const wallColliders=Array.from({length:16},()=>({x:0,z:0,w:0,d:0,top:0,enabled:false}));solids.push(...wallColliders);
 function box(parent,x,y,z,w,h,d,material){const m=new T.Mesh(cube,material);m.position.set(x,y,z);m.scale.set(w,h,d);parent.add(m);return m;}
 const pylons=[];for(let i=0;i<16;i++){const g=new T.Group();root.add(g);box(g,0,0,0,2.8,1,3.2,metal);box(g,0,.12,-1.64,.14,.72,.08,light);pylons.push(g);}
 const gates=[];for(let i=0;i<6;i++){const g=new T.Group();root.add(g);box(g,-5,0,0,.7,1,1,metal);box(g,5,0,0,.7,1,1,metal);box(g,0,.5,0,10.7,.5,1,metal);box(g,0,.54,-.55,9,.07,.08,light);gates.push(g);}
 const scan=new T.Mesh(new T.TorusGeometry(1,.028,4,96),new T.MeshBasicMaterial({color:0xcffff1,transparent:true,opacity:.6,depthWrite:false}));scan.rotation.x=Math.PI/2;root.add(scan);scan.visible=false;
 const traces=[];for(let i=0;i<12;i++){const g=new T.Group();root.add(g);box(g,0,.045,19,.045,.015,15,light);g.rotation.y=i*Math.PI/6;traces.push(g);}
 const monuments=new T.InstancedMesh(cube,metal,24);monuments.frustumCulled=false;root.add(monuments);
 const eclipse=new T.Group();root.add(eclipse);
 const darkSun=new T.Mesh(new T.SphereGeometry(10,20,12),new T.MeshBasicMaterial({color:0x01040a}));eclipse.add(darkSun);
 const sunRing=new T.Mesh(new T.TorusGeometry(12,.3,6,64),light);eclipse.add(sunRing);
 const layouts=Array.from({length:Math.max(...RING_SHIFT_LAYOUT_IDS)},(_,i)=>createLayout(i+1));
 let current=1,to=1,age=0,active=false,easy=false,stamp=0,layout=layouts[0];
 let duration=DEFAULT_REBUILD_SECONDS,bossArena=null;
 const bossScenery=createBossArenaScenery(scene);
 const surfaceFog={color:0,near:32,far:110};
 const fracture=createWorldFracture({scene,arena,walls,caps,wallColliders,getLayout:()=>layout,isRebuilding:()=>active});
 const phases=['空間消去','リング起動','足場を構築','防壁を組成','背景を展開','構築完了'];
 function phase(){const elapsed=age*BUILD_TIMELINE/duration;if(layout.omega&&active)return elapsed<1.2?'現実を折り畳む':elapsed<4.4?'地形を再配線':elapsed<8.1?'武装を再抽選':'戦場へ再接続';if(to>=7&&active)return elapsed<1.1?'現実消失':elapsed<3?'リング反転':elapsed<7?'新世界を接続':elapsed<9?'巨大構造を展開':'戦場へ帰還';return !active?'構築完了':elapsed<1.1?phases[0]:elapsed<2.4?phases[1]:elapsed<5.5?phases[2]:elapsed<7.5?phases[3]:elapsed<9.7?phases[4]:phases[5];}
 function currentTheme(){return layout.colors||WORLD_THEMES[to-1];}
 function configure(){
  getStageGimmicks()?.setWave(layout.bossArena?(layout.gimmick||7):layout.omega?layout.gimmick:to);
  bossScenery.configure(layout);
  for(const s of legacySolids)s.enabled=to===1;
  wallColliders.forEach((c,i)=>{const w=layout.walls[i];c.enabled=to>1&&!!w;if(w)Object.assign(c,{x:w.x,z:w.z,w:w.w/2,d:w.d/2,top:w.base+w.h});});
  fracture.reset();
  const cellSizeX=layout.cellSizeX||CELL,cellSizeZ=layout.cellSizeZ||CELL;walls.count=caps.count=to===1?0:layout.walls.length;tiles.count=wire.count=to===1?0:layout.cells.length;borders=[];if(to>1)for(const c of layout.cells)for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]])if(!layout.cellAt(c.x+dx*cellSizeX,c.z+dz*cellSizeZ))borders.push({x:c.x+dx*cellSizeX/2,z:c.z+dz*cellSizeZ/2,h:c.h,w:dx?.06:cellSizeX,d:dz?.06:cellSizeZ,rank:Math.hypot(c.x,c.z)/layout.viewRadius*1.35});if(layout.fracture&&layout.laneMarks)borders.push(...layout.laneMarks);edges.count=borders.length;
  pads.forEach((pad,i)=>{const p=layout.pads[i];if(to>1)pad.position.set(p.x,p.y,p.z);else pad.position.set([[-21,-16],[21,16],[0,0],[-18,13],[18,-13]][i][0],.08,[[-21,-16],[21,16],[0,0],[-18,13],[18,-13]][i][1]);});
 }
 function instances(){const buildAge=age*BUILD_TIMELINE/duration;
  if(to===1)return;
  layout.cells.forEach((c,i)=>{
   const rank=(Math.hypot(c.x,c.z)/40)*1.4+((i*37)%17)/17*.8;
   const build=active?ease((buildAge-2.25-rank)/1.8):1;
   const outline=active?ease((buildAge-1.8-rank)/.65):0;
   q.identity();if(to>=7){const angle=(1-build)*(to===7?1.5:-2);q.setFromAxisAngle(spinAxis,angle);}
   pos.set(c.x+(to===7?(1-build)*c.x*.8:0),c.h-1-(1-build)*(to>=7?75:24),c.z);scale.set((layout.cellSizeX||CELL)*.997,2*Math.max(.001,build),(layout.cellSizeZ||CELL)*.997);matrix.compose(pos,q,scale);tiles.setMatrixAt(i,matrix);
   pos.set(c.x,c.h+.025,c.z);scale.set((layout.cellSizeX||CELL)*.99,Math.max(.015,c.h+.1),(layout.cellSizeZ||CELL)*.99).multiplyScalar(outline*(1-build));matrix.compose(pos,q,scale);wire.setMatrixAt(i,matrix);
  });
  q.identity();layout.walls.forEach((w,i)=>{const build=layout.fracture===true&&w.destroyed?0:active?ease((buildAge-5.1-i*.22)/2):1;pos.set(w.x,w.base+w.h/2+(1-build)*24,w.z);scale.set(w.w*build,Math.max(.001,w.h*build),w.d*build);matrix.compose(pos,q,scale);walls.setMatrixAt(i,matrix);pos.y=w.base+w.h+(1-build)*24+.03;scale.set(w.w*build,.06,w.d*build);matrix.compose(pos,q,scale);caps.setMatrixAt(i,matrix);});
  borders.forEach((b,i)=>{const build=active?ease((buildAge-2.7-b.rank)/1.8):1;pos.set(b.x,b.h+.03-(1-build)*24,b.z);scale.set(b.w*build,.04,b.d*build);matrix.compose(pos,q,scale);edges.setMatrixAt(i,matrix);});caps.instanceMatrix.needsUpdate=edges.instanceMatrix.needsUpdate=true;
  tiles.instanceMatrix.needsUpdate=walls.instanceMatrix.needsUpdate=wire.instanceMatrix.needsUpdate=true;tiles.boundingSphere=walls.boundingSphere=null;
 }
 function apply(time){const buildAge=age*BUILD_TIMELINE/duration;
  const theme=currentTheme(),level=layout.bossArena?5:to-1,birth=active?ease((buildAge-1.1)/1.3):1,environment=active?ease((buildAge-(to>=7?4.8:7.1))/2.4):1;
  const blank=active&&buildAge<1.1;
  for(const obj of legacyObjects)obj.visible=to===1&&!active&&!(obj.userData.easyCover&&easy);
  monuments.visible=to>=7&&!blank&&!layout.bossArena;eclipse.visible=to>=7&&!blank&&!layout.bossArena;
  if(to>=7){const b=active?ease((buildAge-6)/3):1;for(let i=0;i<24;i++){const a=i*Math.PI/12;if(to===7){pos.set(Math.cos(a)*69,16+Math.sin(i*3)*12-(1-b)*70,Math.sin(a)*69);scale.set(8,28*b,6);q.setFromAxisAngle(spinAxis,Math.sin(i)*.6);}else if(to===8){pos.set(i%2?54:-54,22-(1-b)*80,(Math.floor(i/2)-5.5)*12);scale.set(7,65*b,4);q.setFromAxisAngle(spinAxis,(i%2?1:-1)*.35);}else{
    const variant=to-9,side=i%2?1:-1,row=Math.floor(i/2)-5.5;
    if(layout.omega&&layout.skyline){const s=layout.skyline[i];pos.set(s.x,s.y-(1-b)*75,s.z);scale.set(s.w,s.h*b,s.d);q.setFromAxisAngle(spinAxis,s.tilt);}
    else if(variant===0){pos.set(side*82,24-(1-b)*75,row*13);scale.set(7,52*b,8);q.setFromAxisAngle(spinAxis,side*.08);}
    else if(variant===1){pos.set(Math.cos(a)*84,8+Math.sin(i*2.4)*15-(1-b)*65,Math.sin(a)*84);scale.set(6,24*b,5);q.setFromAxisAngle(spinAxis,a);}
    else if(variant===2){pos.set(side*(72+(i%3)*8),30+(i%4)*5-(1-b)*80,side*(72+(Math.floor(i/6)%3)*8));scale.set(10,8*b,10);q.setFromAxisAngle(spinAxis,(i%4-1.5)*.14);}
    else if(variant===3){pos.set(row*14,20-(1-b)*75,side*84);scale.set(8,38*b,5);q.setFromAxisAngle(spinAxis,side*.04);}
    else if(variant===4){pos.set(side*(76+Math.floor(i/6)*8),22+Math.sin(i*2)*12-(1-b)*75,side*(76+Math.floor(i/6)*8));scale.set(7,48*b,6);q.setFromAxisAngle(spinAxis,side*.55);}
    else if(variant===5){pos.set(side*(72+(i%3)*10),20+(i%6)*7-(1-b)*80,row*13);scale.set(6,40*b,7);q.setFromAxisAngle(spinAxis,side*.12);}
    else if(variant===6){pos.set(row*14,28+row*.4-(1-b)*80,-row*12);scale.set(11,30*b,8);q.setFromAxisAngle(spinAxis,.48);}
    else{const tier=Math.floor(i/8),along=(i%8-3.5)*18;pos.set(tier===1?88:along,18+tier*12-(1-b)*75,tier===0?-88:tier===1?along:88);scale.set(tier===1?8:13,27*b,tier===1?13:8);q.setFromAxisAngle(spinAxis,(i%2?1:-1)*.12);}
   }matrix.compose(pos,q,scale);monuments.setMatrixAt(i,matrix);}monuments.instanceMatrix.needsUpdate=true;eclipse.position.set(to===7?0:to===8?-35:(to%2?30:-30),to>=9?52:to===7?38:45,78);eclipse.scale.setScalar(b*(to===7?2.5:3.2));sunRing.rotation.z=time*.04;}
  tiles.visible=to>1&&!blank;walls.visible=to>1&&!blank;caps.visible=edges.visible=to>1&&!blank;wire.visible=active&&!blank;
  root.visible=!blank;reactor.visible=!blank&&!layout.bossArena;skyObject.visible=!blank;skyObject.scale.setScalar(to>=7?3:1);
  const bossStage=!!layout.bossArena;
  floor.color.setHex(theme[1]);if(easy)floor.color.lerp(new T.Color(0x638080),.17);if(bossStage)floor.color.lerp(new T.Color(0x9aa8a5),.2);
  slab.color.copy(floor.color);wallMat.color.copy(floor.color).lerp(new T.Color(0x536d80),.35);if(bossStage)wallMat.color.setHex(layout.wallColor).lerp(new T.Color(0x9aa8a5),.22);
  light.color.setHex(theme[4]);metal.color.copy(floor.color).lerp(new T.Color(0x263648),.45);wireMat.color.copy(light.color);
  sky.uniforms.horizon.value.setHex(theme[2]).multiplyScalar(environment);sky.uniforms.zenith.value.setHex(theme[3]).multiplyScalar(environment);
  if(bossStage){sky.uniforms.horizon.value.lerp(new T.Color(0x9ab9c3),.42);sky.uniforms.zenith.value.lerp(new T.Color(0x405b6a),.48);}
  scene.fog.color.copy(sky.uniforms.zenith.value).lerp(sky.uniforms.horizon.value,.34);scene.fog.near=bossStage?105:to>=7?60:easy?40:32;scene.fog.far=bossStage?440:to>=7?240:110;
  // Record the actual surface atmosphere before the swimmer-camera override.
  surfaceFog.color=scene.fog.color.getHex();surfaceFog.near=scene.fog.near;surfaceFog.far=scene.fog.far;
  hemi.color.setHex(theme[2]);hemi.groundColor.setHex(theme[1]);if(bossStage){hemi.color.lerp(new T.Color(0xd0e8f0),.34);hemi.groundColor.lerp(new T.Color(0x879b98),.3);}
  hemi.intensity=(easy?3.5:2.8)+level*.13+(bossStage?1.05:0);sun.color.setHex(theme[4]);if(bossStage)sun.color.lerp(new T.Color(0xfff1d8),.3);sun.intensity=(easy?3:2.4)+level*.12+(bossStage?1.15:0);
  const sunAngles=[[-10,25,8],[-18,22,5],[7,28,-12],[-20,20,-6],[15,24,11],[0,30,-18],[-12,40,12],[20,50,-20]][level]||[Math.cos(level*.72)*32,32+(level%4)*5,Math.sin(level*.72)*32];sun.position.set(...sunAngles);
  for(const m of padMaterials){m.color.setHex(theme[5]);m.emissive.copy(m.color);}
  pads.forEach((pad,i)=>{const build=active?ease((buildAge-6.6-i*.15)/1.2):1;pad.visible=to===1&&build>.01;pad.scale.setScalar(build);});
  const drive=active?Math.sin(age/duration*Math.PI):0;
  reactor.rotation.y=time*(.15+level*.06)+drive*9;reactor.rotation.x=drive*.65+Math.sin(time*.2)*.05;
  core.position.y=halo.position.y=5+level*1.2;core.scale.setScalar(birth*(1+level*.13));core.material.color.copy(light.color);core.material.emissive.copy(light.color);
  halo.material.color.copy(light.color);halo.material.emissive.copy(light.color);halo.scale.setScalar(birth*(1+level*.28+drive*.7));
  rings.forEach((r,i)=>{r.position.y=5+level*1.2;r.scale.setScalar(birth*(1+level*.24+drive*.9));r.rotation.x=Math.PI/2+(i-1)*(.25+level*.21)+drive*(i%2?1:-1)*2.4;r.rotation.z=time*(i%2?-.3:.4)*(1+level*.18)+drive*(i+1)*3;r.material.color.copy(light.color);r.material.emissive.copy(light.color);});
  const skyline=layout.backdrop;
  pylons.forEach((g,i)=>{
   const build=active?ease((buildAge-7-i*.04)/1.5):1,angle=i*Math.PI/8+level*.23+Math.sin(i*1.9+level)*.035;
   const r=skyline.radius+Math.sin(i*2.31+level)*skyline.jitter,height=skyline.base+(i*7+level*11)%skyline.span;
   const shard=to===5&&i%2===0,crown=to===6&&i%4===0,spread=build;
   g.position.set(Math.cos(angle)*r,(height*.5+Math.sin(i*1.3+level)*Math.min(4,level+1))-(1-spread)*35,Math.sin(angle)*r);
   g.scale.set(skyline.width*(shard ? .72 : 1)*(1+level*.035),height*spread,skyline.width*(shard ? .72 : 1)*(1+level*.035));
   g.rotation.set((to===3 ? .16 : 0)+Math.sin(i*1.7)*skyline.tilt+(crown ? .12 : 0),angle,Math.cos(i*1.3+level)*skyline.tilt);
   g.visible=build>.01;
  });
  gates.forEach((g,i)=>{
   const build=active?ease((buildAge-7.8-i*.08)/1.5):1,angle=i*Math.PI/3+level*.14;
   const radius=skyline.gate+Math.sin(i*2+level)*skyline.jitter*.35,height=skyline.gateHeight+(i%2)*Math.min(4,level);
   g.position.set(Math.sin(angle)*radius,(height*.5+(1-build)*30),Math.cos(angle)*radius);
   g.rotation.set(skyline.tilt*.22,angle+Math.PI/2,Math.sin(i)*skyline.tilt*.3);
   g.scale.set(skyline.gateWidth*(1+level*.06),(height*build),1+level*.07);g.visible=build>.01;
  });
  traces.forEach((g,i)=>{g.visible=to===1&&!active;g.rotation.y=i*Math.PI/6;});
  scan.visible=active&&buildAge>1.8&&buildAge<9.8;scan.scale.setScalar(1+45*clamp((buildAge-1.8)/7));scan.position.y=to>=3?2:.1;scan.material.opacity=.6*(1-clamp((buildAge-8)/2));
  bossScenery.update(layout,time,blank?0:environment);
  if(active)instances();
  getStageGimmicks()?.updateBuild(active,buildAge,BUILD_TIMELINE);
 }
 function setWave(w,isEasy=easy,layoutOverride=null){easy=isEasy;to=Math.max(1,Math.min(layouts.length,layoutOverride?.wave??w));current=to;layout=layoutOverride||(bossArena?createBossArenaLayout(bossArena,to):layouts[to-1]);active=false;age=0;configure();instances();apply(stamp);}
 function begin(w,isEasy,seconds=DEFAULT_REBUILD_SECONDS,layoutOverride=null){duration=seconds;easy=isEasy;to=Math.max(1,Math.min(layouts.length,layoutOverride?.wave??w));layout=layoutOverride||(bossArena?createBossArenaLayout(bossArena,to):layouts[to-1]);active=true;age=0;configure();instances();apply(stamp);}
 function update(dt,time,running){if(!active||running)stamp=time;if(active&&running)age=Math.min(duration,age+dt);apply(stamp);if(active&&age>=duration){current=to;active=false;instances();apply(time);return true;}return false;}
 function cinematic(camera){const t=clamp(age/duration),special=to>=7,a=-.8+t*(to===7?3.4:2.4),r=layout.viewRadius-8*t,land=ease((t-(special?.70:.87))/(special?.30:.13)),entry=layout.entry;
  camera.position.set(Math.sin(a)*r,(special?58:31)+Math.sin(t*Math.PI)*(special?38:9)+(layout.viewRadius-52)*.22,Math.cos(a)*r).lerp(new T.Vector3(entry.x,entry.y+1.65,entry.z),land);
  const facing=entry.yaw??Math.atan2(entry.x,entry.z);camera.lookAt((entry.x-Math.sin(facing)*8)*land,(special?14:3)+(entry.y+1.65-(special?14:3))*land,(entry.z-Math.cos(facing)*8)*land);camera.far=special?650:400;camera.fov=(special?90:76)+(special?-12:2)*land;camera.updateProjectionMatrix();}

 function heightAt(x,z){if(to===1)return 0;return layout.cellAt(x,z)?.h??null;}
 function spawnPoint(type,angle,px=0,pz=0){
  if(to===1)return null;
  if(layout.fracture&&layout.spawnPoint)return layout.spawnPoint(type,angle,px,pz);
  if(type==='boss'){if(layout.bossSpawn)return{...layout.bossSpawn};const c=layout.nearest(0,0,2.5);return {x:c.x,z:c.z,y:c.h};}
  const far=layout.nodes.filter(c=>Math.hypot(c.x-px,c.z-pz)>layout.spawnDistance);const pool=far.length?far:layout.nodes;
  const index=Math.min(pool.length-1,Math.floor(((angle/(Math.PI*2))%1)*pool.length));const c=pool[index];return{x:c.x,z:c.z,y:c.h};
 }
 function canStep(x,z,y){const h=heightAt(x,z);return h!==null&&h<=y+.66&&!layout.blocked(x,z,.6);}
 return {setBossArena:id=>{bossArena=id;bossScenery.setCrimson?.(0);},setCrimsonSea:v=>{bossScenery.setCrimson?.(v);},setBossSceneryQuality:low=>bossScenery.setLowDetail(low),surfaceFog:()=>surfaceFog,clearBossArena:()=>{bossArena=null;},setWave,begin,update,damageCover:fracture.damageCover,breakCoverNear:fracture.breakCoverNear,updateFracture:fracture.update,coverSnapshot:fracture.snapshot,skip:()=>{if(active)age=duration;},cinematic,progress:()=>({age,duration,target:to,phase:phase(),theme:layout.name||currentTheme()[0]}),heightAt,spawnPoint,snapPoint:(x,z)=>{const c=layout.nearest(x,z);return{x:c.x,z:c.z,y:c.h}},canStep,path:(x,z,tx,tz)=>layout.path(x,z,tx,tz),entry:()=>({...layout.entry}),bounds:()=>layout.bounds,launchPower:()=>layout.launch,radar:()=>layout,rule:()=>layout.rule,
 snapshot:()=>({bossArena:layout.bossArena||null,bossSpawn:layout.bossSpawn?{...layout.bossSpawn}:null,bossScenery:bossScenery.inspect(),cover:fracture.snapshot(),wave:current,target:to,active,age,duration,phase:phase(),theme:layout.name||currentTheme()[0],omega:!!layout.omega,arenaForm:layout.arenaForm??null,intent:layout.intent?{kind:layout.intent.kind,mission:layout.intent.mission,name:layout.intent.name,round:layout.intent.round,variant:layout.intent.variant,targets:layout.intent.targets.map(p=>({...p})),spawnZones:layout.intent.spawnZones.map(p=>({...p}))}:null,cellSizeX:layout.cellSizeX??CELL,cellSizeZ:layout.cellSizeZ??CELL,topology:layout.topology??null,gimmick:layout.gimmick??null,layoutSeed:layout.seed??null,floor:floor.color.getHex(),horizon:sky.uniforms.horizon.value.getHex(),ringColor:rings[0].material.color.getHex(),ringScale:rings[0].scale.x,padColor:padMaterials[0]?.color.getHex(),padsVisible:pads.some(p=>p.visible),stageGimmicks:getStageGimmicks()?.snapshot()||null,cells:layout.cells.length,walls:layout.walls.length,voidCells:layout.gridCells-layout.cells.length,bounds:{...layout.bounds},backdrop:{...layout.backdrop},entry:{...layout.entry},blank:active&&age*BUILD_TIMELINE/duration<1.1,legacyVisible:legacyObjects.some(o=>o.visible),terrainVisible:tiles.visible,decks:layout.cells.filter(c=>c.h>0).map(c=>({x:c.x,z:c.z,top:c.h,w:2,d:2}))})};
}
