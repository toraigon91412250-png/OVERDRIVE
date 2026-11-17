import * as THREE from 'three';

// Purely external landmarks. Every piece of usable cover is supplied by the
// arena layout and rendered by the world's shared wall/collision instances.
export function createBossArenaScenery(scene){
 const root=new THREE.Group();root.name='boss-arena-backdrop';root.visible=false;scene.add(root);
 let sea=null;
 const waveDummy=new THREE.Object3D();
 const resources=new Set(),cube=new THREE.BoxGeometry(1,1,1),pillar=new THREE.CylinderGeometry(1,1,1,7),spike=new THREE.ConeGeometry(1,1,5),ring=new THREE.TorusGeometry(1,.035,4,48),plane=new THREE.PlaneGeometry(1,1),oceanGeometry=new THREE.PlaneGeometry(2200,2200,128,128);
 for(const geometry of [cube,pillar,spike,ring,plane,oceanGeometry])resources.add(geometry);
 const stone=new THREE.MeshStandardMaterial({color:0x4f626e,roughness:.85}),dark=new THREE.MeshStandardMaterial({color:0x172532,roughness:.72,metalness:.38}),metal=new THREE.MeshStandardMaterial({color:0x8b9593,roughness:.56,metalness:.55}),light=new THREE.MeshBasicMaterial({color:0x86dfff});
 const water=new THREE.MeshStandardMaterial({color:0x287286,roughness:.31,metalness:.2,emissive:0x08212b,emissiveIntensity:.35,side:THREE.DoubleSide});
 water.onBeforeCompile=shader=>{shader.uniforms.uSeaTime={value:0};water.userData.shader=shader;shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nuniform float uSeaTime;\nvarying float vSeaCrest;').replace('#include <begin_vertex>','#include <begin_vertex>\nfloat seaA=sin(position.x*.018+position.y*.013+uSeaTime*.62+cos(position.y*.014)*.65);\nfloat seaB=sin(position.y*.027-position.x*.009-uSeaTime*.47);\nfloat seaC=sin(position.x*.061+position.y*.052-uSeaTime*1.15);\ntransformed.z+=seaA*.48+seaB*.24+seaC*.065;\nvSeaCrest=seaA*.58+seaB*.29+seaC*.12;');shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying float vSeaCrest;').replace('#include <color_fragment>','#include <color_fragment>\nfloat seaFoam=smoothstep(.62,.91,vSeaCrest);\ndiffuseColor.rgb=mix(diffuseColor.rgb,vec3(.30,.62,.66),seaFoam*.62);');};
 const seaBandMaterial=new THREE.MeshStandardMaterial({color:0x75c2cf,roughness:.36,transparent:true,opacity:.34,depthWrite:false});
 const foamMaterial=new THREE.MeshBasicMaterial({color:0xe2f5ed,transparent:true,opacity:.56,depthWrite:false});
 for(const material of [stone,dark,metal,light,water,seaBandMaterial,foamMaterial])resources.add(material);
 let boss=null;const animated=[];
 function add(geometry,material,x,y,z,sx,sy,sz,rz=0){const mesh=new THREE.Mesh(geometry,material);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);mesh.rotation.z=rz;root.add(mesh);return mesh;}
 function configure(layout){
  root.clear();animated.length=0;sea=null;boss=layout.bossArena||null;root.visible=false;if(!boss)return;
  const {kind,bounds,colors}=layout;stone.color.setHex(layout.wallColor);dark.color.setHex(colors[1]).multiplyScalar(.5);light.color.setHex(colors[4]);water.color.setHex(kind==='harbor'?0x1b536b:0x34131a);
  const bx=bounds.x+12,bz=bounds.z+12;
  if(['hangar','runway','fortress','laboratory'].includes(kind)){
   for(const side of [-1,1])for(let i=-2;i<=2;i++){
    const z=i*bounds.z*.43,height=kind==='fortress'?19:kind==='laboratory'?25:16;
    add(pillar,metal,side*bx,height/2,z,2.1,height,2.1);
    add(cube,dark,side*(bx+5),height*.5,z,4,height,Math.max(4,bounds.z*.35));
    add(cube,light,side*(bx-2.15),height*.7,z,.15,2.5,4);
   }
   for(const side of [-1,1]){
    add(cube,metal,0,20,side*bz,bounds.x*1.95,3,3);
    for(const x of [-bounds.x*.9,bounds.x*.9])add(cube,metal,x,10,side*bz,3,20,3);
   }
  }
  if(kind==='runway'){
   for(let z=-bounds.z+7;z<bounds.z-5;z+=10)add(cube,light,0,.04,z,.28,.025,4);
   for(const side of [-1,1])add(cube,metal,side*9,.025,0,.18,.025,bounds.z*1.8);
  }
  if(kind==='quarry'||kind==='obsidian'){
   for(let i=0;i<18;i++){
    const angle=i*Math.PI/9,r=Math.max(bounds.x,bounds.z)+18+(i%3)*4,height=18+(i*7%27);
    const rock=add(kind==='quarry'?pillar:spike,i%3?stone:dark,Math.sin(angle)*r,height*.35,Math.cos(angle)*r,kind==='quarry'?6:4,height,kind==='quarry'?6:4,Math.sin(i*3.1)*(kind==='quarry'?.15:.35));rock.rotation.y=angle;
   }
  }
  if(kind==='crucible'){
   for(let i=0;i<12;i++){
    const angle=i*Math.PI/6,r=Math.max(bounds.x,bounds.z)+14;
    add(spike,dark,Math.sin(angle)*r,12,Math.cos(angle)*r,6,30,6,-Math.sin(angle)*.22);
    const vent=add(cube,light,Math.sin(angle)*r,2,Math.cos(angle)*r,3,.12,7);vent.rotation.y=-angle;animated.push({mesh:vent,base:.75,phase:i});
   }
   const rim=add(ring,light,0,-3,0,bounds.x+20,bounds.z+20,1);rim.rotation.x=-Math.PI/2;
  }
  if(kind==='singularity'||kind==='storm'){
   for(let i=0;i<12;i++){
    const angle=i*Math.PI/6,r=Math.max(bounds.x,bounds.z)+15,height=kind==='storm'?33:22;
    const obelisk=add(spike,dark,Math.sin(angle)*r,height*.5-4,Math.cos(angle)*r,3,height,3,-Math.sin(angle)*.12);obelisk.rotation.y=angle;
    add(cube,light,Math.sin(angle)*r,height*.65,Math.cos(angle)*r,1.4,1.4,1.4);
   }
   for(let i=0;i<3;i++){const halo=add(ring,light,0,kind==='storm'?45+i*8:26+i*5,0,34+i*9,34+i*9,1);halo.rotation.x=Math.PI/2+(i-1)*.13;animated.push({mesh:halo,spin:(i%2?1:-1)*.025});}
  }
  if(kind==='harbor'){
   const waterline=layout.seaLevel??.12;
   const ocean=add(oceanGeometry,water,0,waterline,0,1,1,1);ocean.name='leviathan-open-ocean';ocean.rotation.x=-Math.PI/2;water.color.setHex(0x287286);
   // A few low, distant rocks leave the open sea and its horizon dominant.
   for(let i=0;i<7;i++){
    const x=(i-3)*94,z=-180-(i%3)*28;const rock=add(spike,dark,x,-1,z,11+i%3*5,9+i%2*5,9);rock.rotation.y=i*.7;
   }
   // Distant wrecks make the water read as a defended sea lane, while staying
   // outside the combat platform and every collision / projectile path.
   for(const [x,z,s,lean] of [[-148,-212,1,-.19],[174,-286,.78,.24],[244,78,.68,-.31]]){
    add(cube,dark,x,1.45,z,44*s,2.9*s,8*s,lean);
    add(cube,stone,x-5*s,3.55*s,z,12*s,1.8*s,7*s,lean);
    const mast=add(pillar,metal,x+8*s,12*s,z,.38*s,20*s,.38*s,lean);mast.name='leviathan-wrecked-mast';
    add(cube,dark,x+8*s,16*s,z,17*s,.55*s,.65*s,lean-.17);
    add(cube,metal,x+8*s,8*s,z,12*s,.38*s,.45*s,lean+.12);
   }
   // Short stanchions and mooring piles sit at the actual deck perimeter.
   const shoreline=[];
   for(const cell of layout.cells)for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){
    if(layout.cellAt(cell.x+dx*layout.cellSizeX,cell.z+dz*layout.cellSizeZ))continue;
    shoreline.push({x:cell.x+dx*layout.cellSizeX*.51,z:cell.z+dz*layout.cellSizeZ*.51,length:(dx?layout.cellSizeZ:layout.cellSizeX)*.8,alongX:!!dz});
   }
   for(let i=0;i<shoreline.length;i+=7){const edge=shoreline[i];add(pillar,dark,edge.x,-.55,edge.z,.36,2.5,.36);add(pillar,metal,edge.x,.76,edge.z,.46,.12,.46);}
   for(const side of [-1,1])for(const z of [32,-46]){
    const bollard=add(pillar,metal,side*43.5,.92,z,.6,.8,.6);bollard.name='leviathan-mooring-bollard';
   }
   const waves=new THREE.InstancedMesh(cube,seaBandMaterial,192);waves.name='leviathan-sea-swell';waves.frustumCulled=false;root.add(waves);
   const foam=new THREE.InstancedMesh(cube,foamMaterial,shoreline.length);foam.name='leviathan-shore-foam';foam.frustumCulled=false;root.add(foam);
   const distantFoam=new THREE.InstancedMesh(cube,foamMaterial,128);distantFoam.name='leviathan-whitecaps';distantFoam.frustumCulled=false;root.add(distantFoam);
   sea={waterline,shoreline,waves,foam,distantFoam,ocean,wrecks:3};
  }
 }
 function update(layout,time,build=1){root.visible=!!boss&&layout.bossArena===boss&&build>.01;root.position.y=(1-build)*-35;
  for(const item of animated){if(item.spin)item.mesh.rotation.z=time*item.spin;else item.mesh.material.opacity=1;}
  if(sea){
   if(water.userData.shader)water.userData.shader.uniforms.uSeaTime.value=time;
   const {waterline,waves,foam,distantFoam,shoreline}=sea;
   for(let i=0;i<waves.count;i++){
    const row=Math.floor(i/12),column=i%12,phase=time*.24+row*.79+column*.57;
    waveDummy.position.set((column-5.5)*43+Math.sin(row*2.1)*13,waterline+.045+Math.sin(phase)*.075,(row-7.5)*31+Math.sin(time*.11+column*.8)*4);
    waveDummy.scale.set(17+(i*17%25),.055,2.4+Math.sin(phase)*.55);waveDummy.rotation.set(0,.16+Math.sin(row)*.035,0);waveDummy.updateMatrix();waves.setMatrixAt(i,waveDummy.matrix);
   }
   for(let i=0;i<shoreline.length;i++){
    const edge=shoreline[i],phase=time*.7+i*.57,pulse=.58+.35*Math.sin(phase);
    waveDummy.position.set(edge.x+(edge.alongX?0:Math.sin(phase)*.12),waterline+.06,edge.z+(edge.alongX?Math.sin(phase)*.12:0));
    waveDummy.scale.set(edge.alongX?edge.length*pulse:.22,.025,edge.alongX?.22:edge.length*pulse);waveDummy.rotation.set(0,0,0);waveDummy.updateMatrix();foam.setMatrixAt(i,waveDummy.matrix);
   }
   for(let i=0;i<distantFoam.count;i++){
    const row=Math.floor(i/8),col=i%8,phase=time*.29+i*1.7;
    waveDummy.position.set((col-3.5)*65+Math.sin(i*2.3)*23,waterline+.09+Math.sin(phase)*.035,(row-7.5)*38+Math.cos(time*.14+i)*3);
    waveDummy.scale.set((2+i%4)*(.65+.3*Math.sin(phase)),.025,.22);waveDummy.rotation.set(0,.16,0);waveDummy.updateMatrix();distantFoam.setMatrixAt(i,waveDummy.matrix);
   }
   waves.instanceMatrix.needsUpdate=foam.instanceMatrix.needsUpdate=distantFoam.instanceMatrix.needsUpdate=true;
  }
 }
 function dispose(){root.removeFromParent();for(const resource of resources)resource.dispose();}
 return{configure,update,dispose,inspect:()=>({boss,visible:root.visible,parts:root.children.length,sea:sea?{waterline:sea.waterline,swells:sea.waves.count,foamSegments:sea.foam.count,whitecaps:sea.distantFoam.count,wrecks:sea.wrecks,animatedSurface:true}:null})};
}
