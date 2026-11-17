import * as T from 'three';

// Six compact, readable set pieces. Props are modeled once with shared low-poly
// geometry; only the active wave is shown, keeping mobile draw cost bounded.
export function createStageGimmicks({scene,arena,getLayout,notify=()=>{},sound=()=>{}}){
 const root=new T.Group();root.name='STAGE GIMMICKS';scene.add(root);
 const materials={};
 const standard=(color,metalness=.45,roughness=.38,emissive=0,glow=0)=>{
  const key=`s:${color}:${metalness}:${roughness}:${emissive}:${glow}`;
  return materials[key]||(materials[key]=new T.MeshStandardMaterial({color,metalness,roughness,emissive,emissiveIntensity:glow}));
 };
 const basic=(color,opacity=1)=>{
  const key=`b:${color}:${opacity}`;return materials[key]||(materials[key]=new T.MeshBasicMaterial({color,transparent:opacity<1,opacity,depthWrite:opacity===1}));
 };
 const boxGeo=new T.BoxGeometry(1,1,1),unitCylinder=new T.CylinderGeometry(1,1,1,8),unitIcosa=new T.IcosahedronGeometry(1,1);
 function addBox(parent,x,y,z,w,h,d,m){const mesh=new T.Mesh(boxGeo,m);mesh.position.set(x,y,z);mesh.scale.set(w,h,d);parent.add(mesh);return mesh;}
 function addCylinder(parent,x,y,z,rt,rb,h,m,segments=8){const mesh=new T.Mesh(new T.CylinderGeometry(rt,rb,h,segments),m);mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
 function addTorus(parent,x,y,z,r,t,m,rotationX=0){const mesh=new T.Mesh(new T.TorusGeometry(r,t,6,36),m);mesh.position.set(x,y,z);mesh.rotation.x=rotationX;parent.add(mesh);return mesh;}
 function addInstances(parent,geometry,material,transforms){const mesh=new T.InstancedMesh(geometry,material,transforms.length),dummy=new T.Object3D();for(let i=0;i<transforms.length;i++){const t=transforms[i];dummy.position.set(t.x,t.y,t.z);dummy.rotation.set(t.rx||0,t.ry||0,t.rz||0);dummy.scale.set(t.sx??1,t.sy??1,t.sz??1);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);}parent.add(mesh);return mesh;}
 function floorY(x,z){const l=getLayout?.(),c=l?.cellAt(x,z);return c?.h??0;}
 const waves=Array.from({length:7},()=>new T.Group());waves.forEach((g,i)=>{g.name=`STAGE ${i} GIMMICK`;g.visible=false;root.add(g);});
 const targets=[],buildGroups=[],boosters=[],beacons=[],lifts=[],relays=[],anchors=[],relayLines=[];
 let wave=1,time=0,anchorIndex=0,anchorNextAt=0,lastBossExposure=0,floatHint=false;
 const boostMetal=standard(0x233946,.78,.28),boostEdge=standard(0x3b7180,.68,.28,0x174c59,.8),boostInset=standard(0x0d1d29,.38,.42),boostGlow=standard(0x55f3e4,.28,.22,0x18d9ca,2.6),boostWhite=standard(0xd5fff9,.2,.18,0x85fff2,1.8);
 const floatMetal=standard(0x294a53,.72,.3),floatGlass=standard(0x5ff1e2,.28,.2,0x39dccc,2.4),floatCrystal=standard(0x9cfff1,.24,.18,0x4de8d8,2.8),floatRing=standard(0xc1fff7,.2,.18,0x59ffee,1.8);
 const liftMetal=standard(0x433b32,.78,.3),liftGold=standard(0xf2ad57,.38,.22,0xa4551d,1.5),liftGlow=standard(0xffd38c,.2,.18,0xffa934,2.2),liftDark=standard(0x171f28,.65,.34);
 const relayMetal=standard(0x382d4d,.78,.3),relayGlass=standard(0xa88aff,.24,.2,0x7858ff,1.8),relayGlow=standard(0xe1d5ff,.2,.17,0x9f7cff,2.5),relayDim=standard(0x523f72,.35,.3,0x302052,.4);
 const crownMetal=standard(0x574738,.75,.28),crownGold=standard(0xffd792,.25,.18,0xffb44d,2.4),crownIce=standard(0xc4fbff,.2,.16,0x5ddde3,1.8);

 // Wave 2 — directional acceleration deck, compass glyph and a six-blade rotor.
 // Repeated bolts and rotors use instances so the four plates stay light on mobile.
 const compassShape=new T.Shape();compassShape.moveTo(0,.9);compassShape.lineTo(-.22,.5);compassShape.lineTo(-.08,.5);compassShape.lineTo(-.08,.15);compassShape.lineTo(-.5,.15);compassShape.lineTo(-.5,.28);compassShape.lineTo(-.9,0);compassShape.lineTo(-.5,-.28);compassShape.lineTo(-.5,-.15);compassShape.lineTo(-.08,-.15);compassShape.lineTo(-.08,-.5);compassShape.lineTo(-.22,-.5);compassShape.lineTo(0,-.9);compassShape.lineTo(.22,-.5);compassShape.lineTo(.08,-.5);compassShape.lineTo(.08,-.15);compassShape.lineTo(.5,-.15);compassShape.lineTo(.5,-.28);compassShape.lineTo(.9,0);compassShape.lineTo(.5,.28);compassShape.lineTo(.5,.15);compassShape.lineTo(.08,.15);compassShape.lineTo(.08,.5);compassShape.lineTo(.22,.5);compassShape.closePath();
 const compassGeo=new T.ExtrudeGeometry(compassShape,{depth:.055,bevelEnabled:true,bevelThickness:.025,bevelSize:.022,bevelSegments:1,steps:1});compassGeo.rotateX(-Math.PI/2);
 const rotorShape=new T.Shape();for(let i=0;i<12;i++){const a=i*Math.PI/6,r=i%2===0?.62:.18,x=Math.cos(a)*r,z=Math.sin(a)*r;if(i===0)rotorShape.moveTo(x,z);else rotorShape.lineTo(x,z);}rotorShape.closePath();
 const rotorGeo=new T.ExtrudeGeometry(rotorShape,{depth:.055,bevelEnabled:true,bevelThickness:.012,bevelSize:.012,bevelSegments:1,steps:1});rotorGeo.rotateX(-Math.PI/2);
 const boostBoltGeo=new T.CylinderGeometry(.12,.12,.12,8),liftBoltGeo=new T.CylinderGeometry(.075,.075,.08,6),liftPierGeo=new T.CylinderGeometry(.12,.18,.58,6);
 const boostCoords=[[-24,20],[24,20],[-24,-20],[24,-20]];
 boostCoords.forEach(([x,z],index)=>{
  const y=floorY(x,z),g=new T.Group();waves[2].add(g);g.position.set(x,y,z);g.userData.homeY=y;
  addBox(g,0,.12,0,4.2,.3,5.2,boostMetal);addBox(g,0,.29,0,3.7,.08,4.7,boostEdge);addBox(g,0,.345,0,3.25,.055,4.2,boostInset);
  for(const side of [-1,1])addBox(g,side*1.88,.38,0,.1,.12,4.35,boostGlow);
  addInstances(g,boostBoltGeo,boostWhite,[-1,1].flatMap(side=>[-1.8,1.8].map(zOff=>({x:side*1.72,y:.39,z:zOff}))));
  addCylinder(g,0,.43,0,.78,.88,.13,boostMetal);addTorus(g,0,.51,0,.67,.045,boostGlow);addCylinder(g,0,.53,0,.32,.32,.11,boostGlow);addCylinder(g,0,.61,0,.13,.13,.08,boostWhite);
  const compass=new T.Mesh(compassGeo,boostWhite);compass.position.y=.435;compass.scale.setScalar(.66);g.add(compass);
  const fan=new T.Group();fan.position.set(0,.455,0);g.add(fan);addTorus(fan,0,0,0,.61,.035,boostGlow);const rotor=new T.Mesh(rotorGeo,boostWhite);rotor.scale.setScalar(.72);fan.add(rotor);
  boosters.push({group:g,fan,x,z,y,cooldown:0,index});buildGroups.push({group:g,y,stage:2});
 });

 // Wave 3 — floating gyros make the low-gravity field legible without HUD
 // clutter. Each has a ceramic plinth, open rotor hoops and a faceted core.
 const beaconCoords=[[0,0],[-20,-20],[20,20],[-20,20],[20,-20]];
 beaconCoords.forEach(([x,z],index)=>{
  const y=floorY(x,z),g=new T.Group();waves[3].add(g);g.position.set(x,y,z);g.userData.homeY=y;
  addCylinder(g,0,.16,0,1.25,1.45,.32,floatMetal,8);addTorus(g,0,.34,0,1.2,.07,floatGlass);addCylinder(g,0,.47,0,.78,.94,.18,floatMetal,8);
  for(let i=0;i<3;i++){const a=i*Math.PI*2/3;const strut=addBox(g,Math.cos(a)*.78,1.15,Math.sin(a)*.78,.12,1.45,.12,floatGlass);strut.rotation.z=-Math.cos(a)*.12;strut.rotation.x=Math.sin(a)*.12;}
  const core=new T.Mesh(unitIcosa,floatCrystal);core.position.y=1.55;core.scale.setScalar(.58);g.add(core);
  const ringA=addTorus(g,0,1.55,0,.92,.045,floatRing);ringA.rotation.set(.5,0,.22);
  const ringB=addTorus(g,0,1.55,0,.72,.035,floatGlass);ringB.rotation.set(-.35,.4,-.65);
  addCylinder(g,0,2.24,0,.15,.2,.18,floatWhite(),6);
  beacons.push({group:g,core,ringA,ringB,x,z,y,index});buildGroups.push({group:g,y,stage:3});
 });

 function floatWhite(){return boostWhite;}

 // Wave 4 — a pair of hydraulic lifts with visible telescoping pistons,
 // segmented rims and a layered, safe-to-read platform deck.
 const liftCoords=[[-16,0],[16,0]];
 liftCoords.forEach(([x,z],index)=>{
  const base=floorY(x,z),g=new T.Group();waves[4].add(g);g.position.set(x,base,z);g.userData.homeY=base;
  addCylinder(g,0,.14,0,1.35,1.6,.28,liftDark,8);addTorus(g,0,.3,0,1.28,.07,liftGold);
  addCylinder(g,0,.47,0,.54,.72,.38,liftMetal,8);addTorus(g,0,.68,0,.52,.035,liftGlow);
  const shaft=new T.Mesh(unitCylinder,liftMetal);shaft.position.y=1.9;shaft.scale.set(.32,2.45,.32);g.add(shaft);
  for(let band=0;band<3;band++){const ring=addTorus(g,0,1.0+band*.83,0,.39,.03,band===1?liftGlow:liftGold);}
  const platform=new T.Group();g.add(platform);platform.position.y=.35;
  addCylinder(platform,0,-.18,0,1.75,1.92,.36,liftMetal,8);addTorus(platform,0,.02,0,1.66,.08,liftGold);addCylinder(platform,0,.06,0,1.34,1.52,.12,liftDark,8);addTorus(platform,0,.14,0,1.24,.035,liftGlow);
  addCylinder(platform,0,.18,0,.72,.78,.08,liftGold,8);addCylinder(platform,0,.24,0,.56,.6,.06,liftGlow,8);
  addInstances(platform,liftBoltGeo,liftGlow,Array.from({length:8},(_,bolt)=>{const a=bolt*Math.PI/4;return{x:Math.cos(a)*1.48,y:-.03,z:Math.sin(a)*1.48}}));
  addInstances(g,liftPierGeo,liftGold,Array.from({length:4},(_,j)=>{const a=j*Math.PI/2;return{x:Math.cos(a)*1.05,y:.38,z:Math.sin(a)*1.05}}));
  lifts.push({group:g,platform,shaft,x,z,base,top:base+.62,previousTop:base+.62,index,travel:3.1,period:7.2,offset:index*3.6});buildGroups.push({group:g,y:base,stage:4});
 });

 // Waves 5 and 6 use actual ray-testable crystal nodes. The support geometry
 // sits in the scene, while each compact core is a direct arena child so every
 // regular weapon's existing ray collision can reach the mechanic.
 function targetCore(x,y,z,material,radius,kind,index){
  const mesh=new T.Mesh(unitIcosa,material);mesh.position.set(x,y,z);mesh.scale.setScalar(radius);mesh.visible=false;mesh.userData.stageGimmickTarget={kind,index};arena.add(mesh);
  targets.push({mesh,kind,index,wave:kind==='relay'?5:6,readyAt:0,baseX:x,baseY:y,baseZ:z,floorOffset:kind==='relay'?2.78:2.08});return targets[targets.length-1];
 }
 const relayCoords=[[32,-24],[-32,24]];
 relayCoords.forEach(([x,z],index)=>{
  const y=floorY(x,z),g=new T.Group();waves[5].add(g);g.position.set(x,y,z);g.userData.homeY=y;
  addCylinder(g,0,.17,0,1.15,1.35,.34,relayMetal,8);addTorus(g,0,.36,0,1.12,.065,relayGlass);addBox(g,0,1.05,0,.52,1.24,.52,relayMetal);
  for(let side of [-1,1]){const fin=addBox(g,side*.72,1.16,0,.22,1.65,.56,relayDim);fin.rotation.z=side*.15;addBox(g,side*.72,1.3,.3,.07,.82,.07,relayGlow);}
  const halo=addTorus(g,0,1.6,0,.83,.055,relayGlass);halo.rotation.x=.3;
  const dish=addTorus(g,0,2.2,0,.56,.045,relayGlow);dish.rotation.x=Math.PI/2;
  addCylinder(g,0,2.38,0,.18,.3,.28,relayMetal,6);
  const target=targetCore(x,y+2.78,z,relayGlow,.46,'relay',index);
  relays.push({group:g,x,z,y,halo,dish,target,cooldownUntil:0,index,marked:null,beam:null});buildGroups.push({group:g,y,stage:5,target});
 });
 // Three crown relays sit on the outer ring and charge one at a time.
 const anchorCoords=[[0,-24],[24,12],[-24,12]];
 anchorCoords.forEach(([x,z],index)=>{
  const y=floorY(x,z),g=new T.Group();waves[6].add(g);g.position.set(x,y,z);g.userData.homeY=y;
  addCylinder(g,0,.16,0,1.18,1.4,.32,crownMetal,8);addTorus(g,0,.34,0,1.12,.06,crownGold);
  addCylinder(g,0,.88,0,.52,.74,.8,crownMetal,6);
  const crown=new T.Mesh(new T.TorusGeometry(.76,.07,7,32),crownGold);crown.position.y=1.45;crown.rotation.x=Math.PI/2;g.add(crown);
  for(let i=0;i<4;i++){const a=i*Math.PI/2,fin=addBox(g,Math.cos(a)*.72,1.48,Math.sin(a)*.72,.14,.72,.18,crownGold);fin.rotation.y=-a;}
  const core=new T.Mesh(unitIcosa,crownIce);core.position.y=1.62;core.scale.setScalar(.42);g.add(core);
  const target=targetCore(x,y+2.08,z,crownIce,.43,'anchor',index);
  anchors.push({group:g,x,z,y,core,target,index});buildGroups.push({group:g,y,stage:6,target});
 });
 const outerArcs=[];for(let i=0;i<3;i++){
  const geo=new T.TorusGeometry(24,.055,5,48,Math.PI*2/3),mesh=new T.Mesh(geo,standard(0x9d8055,.62,.3,0x493315,.65));
  mesh.rotation.x=Math.PI/2;mesh.rotation.z=i*Math.PI*2/3;mesh.position.y=.08;waves[6].add(mesh);outerArcs.push(mesh);
 }

 const propOwners=[...boosters,...beacons,...lifts,...relays,...anchors];
 const fracturePropHomes=propOwners.map(item=>({item,x:item.x,z:item.z}));
 let fracturePropsActive=false;
 function placeFractureProp(item,x,z){
  const c=getLayout().nearest(x,z);if(!c)return;
  item.x=c.x;item.z=c.z;item.y=c.h;item.group.position.set(c.x,c.h,c.z);item.group.userData.homeY=c.h;
  if(lifts.includes(item)){item.base=c.h;item.top=c.h+.62;item.previousTop=item.top;}
  if(item.target){const t=item.target;t.baseX=c.x;t.baseZ=c.z;t.baseY=c.h+t.floorOffset;t.mesh.position.set(c.x,t.baseY,c.z);}
 }
 function placeFractureProps(layout){
  const groups={2:['boosters',boosters],3:['beacons',beacons],4:['lifts',lifts],5:['relays',relays],6:['anchors',anchors]};
  const selected=groups[layout.gimmick];
  if(selected){
   const [key,items]=selected,hints=layout.intent.propHints[key]||layout.intent.spawnZones;
   items.forEach((item,i)=>{const hint=hints[i%hints.length];placeFractureProp(item,hint.x,hint.z);});
  }
  for(const entry of buildGroups){const owner=propOwners.find(item=>item.group===entry.group);if(owner)entry.y=owner.y;}
  fracturePropsActive=true;
 }
 function placeOmegaProps(layout){
  if(layout.fracture&&layout.intent){placeFractureProps(layout);return;}
  const used=[],entry=layout.entry;
  function place(item,x,z,target=null){
   const pool=layout.nodes.filter(c=>Math.hypot(c.x-entry.x,c.z-entry.z)>9&&used.every(p=>Math.hypot(c.x-p.x,c.z-p.z)>6));
   const candidates=pool.length?pool:layout.nodes;
   const c=candidates.reduce((best,n)=>(!best||(n.x-x)**2+(n.z-z)**2<(best.x-x)**2+(best.z-z)**2?n:best),null)||layout.nearest(x,z);
   if(!c)return;used.push(c);item.x=c.x;item.z=c.z;item.y=c.h;item.group.position.set(c.x,c.h,c.z);item.group.userData.homeY=c.h;
   if(target){target.baseX=c.x;target.baseZ=c.z;target.baseY=c.h+target.floorOffset;target.mesh.position.set(c.x,target.baseY,c.z);}
  }
  boosters.forEach(b=>place(b,b.x,b.z));beacons.forEach(b=>place(b,b.x,b.z));lifts.forEach(l=>{place(l,l.x,l.z);l.base=l.y;l.top=l.base+.62;l.previousTop=l.top;});
  relays.forEach(r=>place(r,r.x,r.z,r.target));anchors.forEach(a=>place(a,a.x,a.z,a.target));
  for(const item of buildGroups){const owner=[...boosters,...beacons,...lifts,...relays,...anchors].find(x=>x.group===item.group);if(owner)item.y=owner.y;}
 }
 function setWave(value){
  // Σ has authored prop locations. Restore the original coordinates before
  // entering another mode; an earlier Σ run must not move its stage props.
  if(fracturePropsActive){
   for(const {item,x,z} of fracturePropHomes){item.x=x;item.z=z;item.y=floorY(x,z);item.group.position.set(x,item.y,z);item.group.userData.homeY=item.y;if(item.target){item.target.baseX=x;item.target.baseZ=z;item.target.baseY=item.y+item.target.floorOffset;item.target.mesh.position.set(x,item.target.baseY,z);}}
   for(const entry of buildGroups){const owner=propOwners.find(item=>item.group===entry.group);if(owner)entry.y=owner.y;}
   fracturePropsActive=false;
  }
  const layout=getLayout?.(),omega=!!layout?.omega;wave=value>6?0:Math.max(1,Math.min(6,value));if(omega&&layout.gimmick)wave=layout.gimmick;if(omega)placeOmegaProps(layout);floatHint=false;anchorIndex=0;anchorNextAt=time;lastBossExposure=0;
  for(const booster of boosters)booster.cooldown=0;
  for(const item of buildGroups)if(item.stage===wave){item.y=floorY(item.group.position.x,item.group.position.z);item.group.position.y=item.y;if(item.target){item.target.baseY=item.y+item.target.floorOffset;item.target.mesh.position.y=item.target.baseY;}}
  for(const booster of boosters)if(wave===2){booster.y=floorY(booster.x,booster.z);booster.group.position.y=booster.y;}
  for(const beacon of beacons)if(wave===3){beacon.y=floorY(beacon.x,beacon.z);beacon.group.position.y=beacon.y;}
  for(const lift of lifts)if(wave===4){lift.base=floorY(lift.x,lift.z);lift.group.position.y=lift.base;lift.top=lift.base+.62;lift.previousTop=lift.top;}
  for(const relay of relays)if(wave===5){relay.y=floorY(relay.x,relay.z);relay.group.position.y=relay.y;relay.target.baseY=relay.y+relay.target.floorOffset;relay.target.mesh.position.y=relay.target.baseY;}
  for(const anchor of anchors)if(wave===6){anchor.y=floorY(anchor.x,anchor.z);anchor.group.position.y=anchor.y;anchor.target.baseY=anchor.y+anchor.target.floorOffset;anchor.target.mesh.position.y=anchor.target.baseY;}
  for(let i=0;i<lifts.length;i++){lifts[i].top=lifts[i].base+.62;lifts[i].previousTop=lifts[i].top;}
  for(const relay of relays){relay.cooldownUntil=0;relay.marked=null;if(relay.beam)relay.beam.visible=false;}
  for(const anchor of anchors)anchor.target.readyAt=0;
  targets.forEach(t=>{t.mesh.visible=t.wave===wave&&(t.kind==='relay'||t.index===anchorIndex);});
 }
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 const smooth=x=>{x=clamp(x,0,1);return x*x*(3-2*x)};
 function updateBuild(rebuilding,age,duration){
  const build=rebuilding?smooth((age-6.05)/2.25):1;
  waves.forEach((g,i)=>{g.visible=i===wave&&build>.005;});
  for(const item of buildGroups){
   if(item.stage!==wave)continue;
   const drop=(1-build)*7;
   item.group.position.y=item.y-drop;
   if(item.target)item.target.mesh.position.y=item.target.baseY-drop;
  }
  if(wave===4)for(const lift of lifts){lift.platform.position.y=lift.top-lift.base-.27;}
  for(const target of targets)if(target.wave===wave){const item=buildGroups.find(x=>x.target===target);target.mesh.visible=build>.7&&(target.kind==='relay'||target.index===anchorIndex&&time>=anchorNextAt&&target.readyAt<=time);if(item)target.mesh.position.y=target.baseY-(1-build)*7;}
 }
 function update(dt,now,player,enemies,boss){
  time=now;
  for(const booster of boosters){booster.cooldown=Math.max(0,booster.cooldown-dt);booster.group.rotation.y+=dt*.035;booster.fan.rotation.y+=dt*(booster.cooldown>0?1:2.7);
   const pulse=booster.cooldown>0 ? .25 : 1;for(const child of [...booster.group.children,...booster.fan.children])if(child.material===boostGlow||child.material===boostWhite)child.material.emissiveIntensity=(child.material===boostGlow?2.6:1.8)*pulse;
  }
  for(const beacon of beacons){beacon.core.rotation.y+=dt*.72;beacon.ringA.rotation.y+=dt*.35;beacon.ringB.rotation.z-=dt*.28;beacon.core.position.y=1.55+Math.sin(now*2.1+beacon.index)*.16;}
  for(const lift of lifts){
   lift.previousTop=lift.top;const phase=((now+lift.offset)%lift.period+lift.period)%lift.period;let amount=phase<1.65?smooth(phase/1.65):phase<3.15?1:phase<4.8?1-smooth((phase-3.15)/1.65):0;
   lift.top=lift.base+.62+lift.travel*amount;
   lift.platform.position.y=lift.top-lift.base-.27;
   const shaftHeight=Math.max(.35,lift.top-lift.base-.5);lift.shaft.scale.y=shaftHeight;lift.shaft.position.y=shaftHeight*.5+.15;
   if(wave===4&&player?.grounded&&player.liftId===lift.index&&Math.hypot(player.x-lift.x,player.z-lift.z)<1.9)player.y+=lift.top-lift.previousTop;
  }
  for(const e of enemies){if(e.relayExposed>0)e.relayExposed=Math.max(0,e.relayExposed-dt);if(e.relayMarker)e.relayMarker.visible=e.relayExposed>0;}
  for(const relay of relays){relay.halo.rotation.y+=dt*.55;relay.dish.rotation.z+=dt*.35;if(relay.beam&&relay.marked?.hp>0&&relay.marked.relayExposed>0){const points=[new T.Vector3(relay.x,relay.y+2.78,relay.z),relay.marked.mesh.position.clone().add(new T.Vector3(0,.65,0))];relay.beam.geometry.setFromPoints(points);relay.beam.visible=true;}else if(relay.beam)relay.beam.visible=false;
   relay.target.mesh.visible=wave===5&&waves[5].visible&&time>=relay.cooldownUntil;
   relay.target.mesh.scale.setScalar(.46*(1+Math.sin(now*5+relay.index)*.08));
  }
  if(wave===6&&waves[6].visible&&time>=anchorNextAt&&(!anchors[anchorIndex]||anchors[anchorIndex].target.readyAt>time)){
   const available=anchors.findIndex(a=>a.target.readyAt<=time);if(available>=0)anchorIndex=available;
  }
  anchors.forEach((anchor,i)=>{
   const active=wave===6&&waves[6].visible&&i===anchorIndex&&time>=anchorNextAt&&anchor.target.readyAt<=time;
   anchor.target.mesh.visible=active;anchor.core.scale.setScalar(.42*(active?1.12+.12*Math.sin(now*5):.55));anchor.group.rotation.y+=dt*(active ? .2 : .04);
   const m=anchor.core.material;m.emissiveIntensity=active?2.8:.45;
  });
 }
 function platformAt(x,z){if(wave!==4)return null;return lifts.find(l=>Math.abs(x-l.x)<1.7&&Math.abs(z-l.z)<1.7)||null;}
 function surfaceAt(x,z,base){const lift=platformAt(x,z);return lift?Math.max(base,lift.top):base;}
 function tryBoost(player,dx,dz,facingX,facingZ){
  if(wave!==2||!player.grounded||player.dashing>0||player.slide>0||player.accelTime>0)return null;
  const booster=boosters.find(b=>b.cooldown<=0&&Math.hypot(player.x-b.x,player.z-b.z)<2.05&&Math.abs(player.y-b.y)<.7);if(!booster)return null;
  let length=Math.hypot(dx,dz);if(length<.01){dx=facingX;dz=facingZ;length=Math.hypot(dx,dz)||1;}
  booster.cooldown=2.3;return{x:dx/length,z:dz/length,index:booster.index};
 }
 function steerBoost(player,dx,dz,dt){
  if(wave!==2){player.accelTime=0;return false;}
  if(!(player.accelTime>0))return false;
  if(Math.hypot(dx,dz)>.05){const angle=Math.atan2(player.accelX*dz-player.accelZ*dx,player.accelX*dx+player.accelZ*dz),turn=clamp(angle,-1.75*dt,1.75*dt),c=Math.cos(turn),s=Math.sin(turn),x=player.accelX*c-player.accelZ*s,z=player.accelX*s+player.accelZ*c,l=Math.hypot(x,z)||1;player.accelX=x/l;player.accelZ=z/l;}
  player.accelTime=Math.max(0,player.accelTime-dt);return true;
 }
 function handleRayHits(hits,enemies,boss){
  if(wave!==5&&wave!==6)return null;
  const hit=hits.find(h=>h.object.userData.stageGimmickTarget&&h.object.visible);if(!hit||hits[0]!==hit)return null;
  const ref=hit.object.userData.stageGimmickTarget,item=targets.find(t=>t.mesh===hit.object);if(!item)return null;
  if(ref.kind==='relay'&&wave===5){const relay=relays[ref.index];if(time<relay.cooldownUntil)return null;relay.cooldownUntil=time+8.5;relay.target.readyAt=relay.cooldownUntil;
   const target=[...enemies].filter(e=>e.hp>0&&e.type!=='boss'&&e.mesh.position.distanceTo(relay.target.mesh.position)<34).sort((a,b)=>a.mesh.position.distanceToSquared(relay.target.mesh.position)-b.mesh.position.distanceToSquared(relay.target.mesh.position))[0];
   if(target){target.relayExposed=Math.max(target.relayExposed||0,3.4);target.stun=Math.max(target.stun||0,.5);if(!target.relayMarker){target.relayMarker=new T.Mesh(new T.TorusGeometry(target.r*1.25,.035,5,24),basic(0x9ff9ff,.9));target.relayMarker.rotation.x=Math.PI/2;target.relayMarker.position.y=.25;target.mesh.add(target.relayMarker);}target.relayMarker.visible=true;relay.marked=target;
    if(!relay.beam){const geometry=new T.BufferGeometry().setFromPoints([new T.Vector3(),new T.Vector3()]);relay.beam=new T.Line(geometry,new T.LineBasicMaterial({color:0x94ffff,transparent:true,opacity:.7}));scene.add(relay.beam);}relay.beam.visible=true;
   }
   notify(target?'リレー接続 / コア露出 3.4秒':'リレー起動 / 敵を探査',2.4);sound(760,.16,'sine',.04);return hit;
  }
  if(ref.kind==='anchor'&&wave===6&&boss?.hp>0){boss.exposed=Math.max(boss.exposed||0,4.6);boss.cd=Math.max(boss.cd,1.1);lastBossExposure=4.6;const anchor=anchors[ref.index];anchor.target.readyAt=time+8;anchorIndex=(ref.index+1)%anchors.length;anchorNextAt=time+8;notify('リング中継器遮断 / WARDENコア露出',2.6);sound(920,.18,'triangle',.05);return hit;}
  return null;
 }
 function damageMultiplier(e){return e?.relayExposed>0?1.35:1;}
 function snapshot(){return{wave,time,visibleStages:waves.map((g,i)=>g.visible?i:null).filter(i=>i!==null),models:waves.map((g,i)=>{let meshes=0;g.traverse(o=>{if(o.isMesh)meshes++});return{stage:i,parts:meshes,visible:g.visible}}).filter(g=>g.stage>0),boosters:boosters.map(b=>({x:b.x,z:b.z,cooldown:b.cooldown,visible:b.group.visible})),floatBeacons:beacons.length,lifts:lifts.map(l=>({x:l.x,z:l.z,top:l.top,visible:l.group.visible})),relays:relays.map(r=>({x:r.x,z:r.z,ready:time>=r.cooldownUntil,visible:r.group.visible,marked:r.marked?.relayExposed||0})),anchors:anchors.map((a,i)=>({index:i,active:wave===6&&waves[6].visible&&i===anchorIndex&&time>=anchorNextAt&&time>=a.target.readyAt,readyAt:a.target.readyAt,visible:a.group.visible})),lastBossExposure,targets:targets.map(t=>({kind:t.kind,index:t.index,visible:t.mesh.visible,x:t.mesh.position.x,y:t.mesh.position.y,z:t.mesh.position.z}))};}
 return {setWave,updateBuild,update,platformAt,surfaceAt,tryBoost,steerBoost,handleRayHits,damageMultiplier,snapshot,floatHint:()=>{if(!floatHint){floatHint=true;notify('自由浮遊 / 空中でジャンプ長押し',2.2);sound(620,.12,'sine',.025);}},floatUsed:()=>floatHint};
}
