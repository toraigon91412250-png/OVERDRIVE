import * as THREE from 'three';

/*
 * WALL MARIA • Low-poly modular model for THREE.js (r147+)
 * No asset downloads, no textures required beyond procedural CanvasTexture.
 * API: const wall = WallMaria.create(THREE, {bayCount: 14, bayWidth: 26, quality: 'standard'});
 * scene.add(wall.group); wall.setGateOpen(true); wall.update(delta);
 * wall.getColliders() gives AABB obstacles (meters) for game collision.
 */
  function seeded(seed) { let n = seed >>> 0; return () => ((n = (1664525 * n + 1013904223) >>> 0) / 4294967296); }
  function stoneTexture(THREE) {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const c = canvas.getContext('2d');
    const r = seeded(5041);
    c.fillStyle = '#aab0ac'; c.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 1150; i++) {
      const k = Math.floor(130 + r() * 65);
      c.fillStyle = `rgba(${k},${k+3},${k},${0.025 + r() * .055})`;
      c.fillRect(r()*512, r()*512, 4+r()*65, 2+r()*55);
    }
    const rows = 20, rh = 512 / rows;
    for (let row = 0; row < rows; row++) {
      const y = row*rh, offset = row % 2 ? 27 : 0;
      c.strokeStyle = 'rgba(54,62,61,.32)'; c.lineWidth = 2;
      c.beginPath(); c.moveTo(0, y); c.lineTo(512, y); c.stroke();
      for(let x = -offset; x < 515; x += 51.2){
        const jitter = (r()-.5)*5;
        c.beginPath(); c.moveTo(x+jitter, y); c.lineTo(x+jitter+r()*2, y+rh); c.stroke();
        c.fillStyle = `rgba(221,223,213,${.035+r()*.085})`;
        c.fillRect(x+3, y+3, 36+r()*9, rh-6);
      }
    }
    for(let i=0;i<40;i++){
      const x=r()*512, y=r()*512; const gr=c.createRadialGradient(x,y,1,x,y,10+r()*47);
      gr.addColorStop(0, 'rgba(63,77,67,.11)'); gr.addColorStop(1,'rgba(63,77,67,0)');
      c.fillStyle=gr;c.fillRect(x-65,y-65,130,130);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace || undefined;
    if('encoding' in tex) tex.encoding = THREE.sRGBEncoding;
    tex.anisotropy = 2;
    return tex;
  }

  function mat(THREE, color, extra={}) {
    return new THREE.MeshLambertMaterial({ color, ...extra });
  }
  function cube(THREE, parent, w,h,d, x,y,z, material){
    const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), material);
    m.position.set(x,y,z); parent.add(m); return m;
  }
  function beam(THREE,parent,a,b,thickness,material){
    const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b);
    const dir = end.clone().sub(start);
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(thickness,dir.length(),thickness),material);
    mesh.position.copy(start.add(end).multiplyScalar(.5));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());
    parent.add(mesh); return mesh;
  }
  function instanced(THREE, parent, geometry, material, placements) {
    if (!placements.length) return null;
    const mesh = new THREE.InstancedMesh(geometry, material, placements.length);
    const dummy = new THREE.Object3D();
    for (let i=0; i<placements.length; i++) {
      const p=placements[i];
      dummy.position.set(p[0],p[1],p[2]);
      dummy.rotation.set(0,p[3]||0,0);
      dummy.scale.set(p[4]||1,p[5]||1,p[6]||1);
      dummy.updateMatrix(); mesh.setMatrixAt(i,dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
    parent.add(mesh); return mesh;
  }
  function buttressGeometry(THREE) {
    const pts = [
      [-3.0,0,0], [3.0,0,0], [-1.8,48.6,0], [1.8,48.6,0],
      [-3.15,0,3.55], [3.15,0,3.55], [-2.0,48.6,2.0], [2.0,48.6,2.0]
    ];
    const indices=[0,1,3, 0,3,2, 5,4,6, 5,6,7, 4,0,2,4,2,6, 1,5,7,1,7,3, 2,3,7,2,7,6, 4,5,1,4,1,0];
    const pos=[], col=[];
    for (let i=0;i<indices.length;i++){
      const idx=indices[i];pos.push(...pts[idx]);
      const light = idx >=4 ? .84 : 1.0;
      col.push(light,light*.998,light*.98);
    }
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
    g.computeVertexNormals(); return g;
  }
  function createGateDoor(THREE, parent, left, materials) {
    const leafW = 6.0, shape = new THREE.Shape();
    if(left){
      shape.moveTo(0,.25); shape.lineTo(leafW,.25); shape.lineTo(leafW,16.45);
      shape.quadraticCurveTo(2.7,16.35,0,12.15); shape.lineTo(0,.25);
    } else {
      shape.moveTo(-leafW,.25); shape.lineTo(0,.25); shape.lineTo(0,12.15);
      shape.quadraticCurveTo(-2.7,16.35,-leafW,16.45);
      shape.lineTo(-leafW,.25);
    }
    const pivot = new THREE.Group();
    pivot.position.set(left?-6:6,0,7.9);
    parent.add(pivot);
    const geo = new THREE.ExtrudeGeometry(shape, {depth:.75, bevelEnabled:false, curveSegments:8});
    geo.translate(0,0,-.38);
    const wood = new THREE.Mesh(geo, materials.wood); pivot.add(wood);
    // Wooden slats, bands and studs remain cheap and move with the two leaves.
    const s = left ? 1 : -1;
    for(let j=0;j<5;j++) {
      const x = s*(.62 + j*1.14);
      cube(THREE,pivot,.075,11.7,.08,x,6.2,.43,materials.woodDark);
    }
    for(const y of [2.6,7.5,11.2]){
      cube(THREE,pivot,5.93,.42,.2,s*3.0,y,.50,materials.iron);
      for(let i=0;i<5;i++) cube(THREE,pivot,.22,.22,.13,s*(.65+i*1.13),y,.64,materials.ironBright);
    }
    beam(THREE,pivot,[s*.75,1.7,.55],[s*5.3,10.7,.55],.23,materials.iron);
    cube(THREE,pivot,.75,1.3,.35,s*.55,7.3,.69,materials.ironBright);
    return pivot;
  }
  function makeLabel(THREE, group) {
    if (typeof document === 'undefined') return;
    const can=document.createElement('canvas'); can.width=512; can.height=128;
    const ctx=can.getContext('2d');
    ctx.fillStyle='#293431';ctx.fillRect(0,0,512,128);
    ctx.fillStyle='#d6c4a0';ctx.fillRect(14,12,484,3);ctx.fillRect(14,113,484,3);
    ctx.font='bold 53px Georgia, serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText('WALL  MARIA',256,70);
    const tx=new THREE.CanvasTexture(can);
    tx.colorSpace=THREE.SRGBColorSpace||undefined;
    if('encoding' in tx) tx.encoding=THREE.sRGBEncoding;
    const plaque = new THREE.Mesh(new THREE.PlaneGeometry(15.5,3.85),new THREE.MeshBasicMaterial({map:tx,side:THREE.DoubleSide}));
    plaque.position.set(0,37.7,8.35);group.add(plaque);
    const plaqueBack=plaque.clone();plaqueBack.rotation.y=Math.PI;plaqueBack.position.z=-8.35;group.add(plaqueBack);
  }

  function create(THREE, options={}) {
    if(!THREE || !THREE.Group) throw new Error('Pass the THREE namespace into WallMaria.create(THREE).');
    const bayCount=Math.max(3,Math.min(40,Math.floor(options.bayCount ?? 14)));
    const bayWidth=Math.max(16,Math.min(38,options.bayWidth ?? 26));
    const detail=options.quality !== 'lite';
    const hasGate=options.gate!==false;
    const opening=hasGate?Math.max(12,Math.min(32,options.opening??12.1)):0;
    const halfOpening=opening/2, halfGate=hasGate?Math.max(14,halfOpening+9):0, thickness=14;
    const breached=hasGate&&options.gateBreached===true, hasDoors=hasGate&&!breached&&opening<=14;
    const halfLength=halfGate+bayWidth*bayCount;
    const group = new THREE.Group();group.name='WallMaria_LowPoly';
    const tex=stoneTexture(THREE);
    const wallMat = mat(THREE,0xd6d9d3,tex?{map:tex}:{});
    const baseMat=mat(THREE,0x98a19c);
    const pillarMat=mat(THREE,0xc3c7bd,{vertexColors:true,side:THREE.DoubleSide});
    const ash=mat(THREE,0x9da8a1);
    const ledge=mat(THREE,0xb4bcb4);
    const ledgeDark=mat(THREE,0x7b8883);
    const stoneAccent=mat(THREE,0xe0ddcf);
    const wood=mat(THREE,0x5b3e30), woodDark=mat(THREE,0x443127);
    const iron=mat(THREE,0x2f373a), ironBright=mat(THREE,0x8e9691);
    const materials={wood,woodDark,iron,ironBright};
    const bodyGeo=new THREE.BoxGeometry(bayWidth+.05,48.6,thickness);
    const bodyCenters=[];
    const buttressPositions=[], feetPositions=[], capPositions=[], topMarkPositions=[], merlonPositions=[];
    for(const side of [-1,1]){
      for(let i=0;i<bayCount;i++){
        const x=side*(halfGate+bayWidth*(i+.5));
        bodyCenters.push([x,24.3,0]);
      }
      for(let i=0;i<=bayCount;i++){
        const x=side*(halfGate+bayWidth*i);
        // Two buttresses on outer and inner face. Front face projects toward z+.
        buttressPositions.push([x,0,7],[x,0,-7,Math.PI]);
        feetPositions.push([x,.82,0]);
        capPositions.push([x,49.0,0]);
        topMarkPositions.push([x,51.35,0]);
      }
      cube(THREE,group,bayCount*bayWidth,2.0,16,side*(halfGate+bayCount*bayWidth/2),49.5,0,ledge);
      cube(THREE,group,bayCount*bayWidth,.7,17,side*(halfGate+bayCount*bayWidth/2),47.9,0,ledgeDark);
      for(let i=0;i<bayCount*3;i++){
        const x=side*(halfGate+(i+.5)*bayWidth/3);
        for(const z of [-7.4,7.4]) merlonPositions.push([x,51.55,z]);
      }
    }
    instanced(THREE,group,bodyGeo,wallMat,bodyCenters);
    instanced(THREE,group,buttressGeometry(THREE),pillarMat,buttressPositions);
    instanced(THREE,group,new THREE.BoxGeometry(6.9,1.65,21),baseMat,feetPositions);
    instanced(THREE,group,new THREE.BoxGeometry(5.15,2.45,18.5),ash,capPositions);
    instanced(THREE,group,new THREE.BoxGeometry(5.8,1.02,19.4),stoneAccent,topMarkPositions);
    instanced(THREE,group,new THREE.BoxGeometry(4.4,2.0,1.55),ash,merlonPositions);
    // Low-detail mortar ribs suggest huge individual wall panels.
    if(detail){
      const rib=[];
      for(const side of [-1,1])for(let i=0;i<bayCount;i++){
        const x=side*(halfGate+bayWidth*(i+.5));
        for(const z of [-7.045,7.045]) {
          for(const y of [13,26,39]) rib.push([x,y,z]);
        }
      }
      instanced(THREE,group,new THREE.BoxGeometry(bayWidth-.8,.15,.065),ledgeDark,rib);
    }
    let left=null,right=null,gateTarget=hasDoors&&options.gateOpen?1:0,gateCurrent=gateTarget;
    const leafTravel=1.42;
    if(hasGate){
      // Gate is a *real hole*: main wall sections don't extend into the passage.
      const arch=new THREE.Shape();
      arch.moveTo(-halfGate,0);arch.lineTo(halfGate,0);arch.lineTo(halfGate,21);
      arch.lineTo(-halfGate,21);arch.lineTo(-halfGate,0);
      const hole=new THREE.Path();
      hole.moveTo(-halfOpening,-.5);hole.lineTo(halfOpening,-.5);hole.lineTo(halfOpening,12.15);
      hole.quadraticCurveTo(0,20.8,-halfOpening,12.15);hole.lineTo(-halfOpening,-.5);
      arch.holes.push(hole);
      const gateArch=new THREE.Mesh(new THREE.ExtrudeGeometry(arch,{depth:thickness,bevelEnabled:false,curveSegments:12}),baseMat);
      gateArch.position.z=-thickness/2;group.add(gateArch);
      cube(THREE,group,halfGate*2,26.6,14,0,34.3,0,wallMat);
      cube(THREE,group,halfGate*2+3,2,18,0,48.5,0,ledge);
      cube(THREE,group,halfGate*2+3.8,.75,19,0,47.2,0,ledgeDark);
      for(const x of [-halfGate+1.2,halfGate-1.2]){
        cube(THREE,group,6.8,51.3,17.4,x,25.65,0,baseMat);
        cube(THREE,group,8.2,2.2,20.2,x,51.2,0,stoneAccent);
        cube(THREE,group,8.6,.48,20.5,x,49.7,0,ledgeDark);
        cube(THREE,group,9.5,2.0,22,x,.95,0,ash);
      }
      // Ashlar arch outline in front and at the back of the passage.
      for(const z of [-7.45,7.45]){
        for(const x of [-halfOpening-.6,halfOpening+.6])cube(THREE,group,1.1,12.4,.64,x,6.2,z,stoneAccent);
        const c = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-halfOpening-.6,12.25,z),new THREE.Vector3(0,21.45,z),new THREE.Vector3(halfOpening+.6,12.25,z));
        const arc = new THREE.Mesh(new THREE.TubeGeometry(c,20,.60,5,false),stoneAccent);
        group.add(arc);
        cube(THREE,group,halfOpening*2+3.2,1.1,.78,0,20.85,z,ash);
      }
      if(detail){
        for(const z of [-8.8,8.8])for(const x of [-halfOpening-4.75,halfOpening+4.75])cube(THREE,group,.45,31.0,.30,x,29.4,z,ledgeDark);
        for(let j=0;j<5;j++) for(const z of [-9.05,9.05])cube(THREE,group,halfOpening*2+9.9,.25,.19,0,25+j*4.5,z,ledge);
      }
      if(hasDoors){
        left=createGateDoor(THREE,group,true,materials);
        right=createGateDoor(THREE,group,false,materials);
        left.rotation.y=gateCurrent*leafTravel;right.rotation.y=-gateCurrent*leafTravel;
      }
      // Wall-walk detail and label are limited to the one gatehouse.
      for(const x of [-8,-4,0,4,8]) for(const z of [-8.7,8.7])cube(THREE,group,2.4,2.1,1.7,x,51.05,z,ash);
      makeLabel(THREE,group);
    }
    function setGateOpen(open){if(hasDoors)gateTarget=open?1:0;}
    function update(dt){
      if(!hasDoors)return;
      const step=Math.min(1,Math.max(0,dt)*1.65);
      gateCurrent+=(gateTarget-gateCurrent)*step;
      if(Math.abs(gateTarget-gateCurrent)<.0005)gateCurrent=gateTarget;
      left.rotation.y=gateCurrent*leafTravel;right.rotation.y=-gateCurrent*leafTravel;
    }
    function getColliders(){
      if(!hasGate)return [{minX:-halfLength,maxX:halfLength,minY:0,maxY:53,minZ:-7,maxZ:7,name:'wall'}];
      const blocks=[
        {minX:-halfLength,maxX:-halfOpening,minY:0,maxY:53,minZ:-7.0,maxZ:7.0,name:'west-wall'},
        {minX:halfOpening,maxX:halfLength,minY:0,maxY:53,minZ:-7.0,maxZ:7.0,name:'east-wall'},
      ];
      if(hasDoors&&gateCurrent<.88)blocks.push({minX:-halfOpening,maxX:halfOpening,minY:0,maxY:17,minZ:7.1,maxZ:9.0,name:'gate-doors'});
      return blocks;
    }
    return {
      group, width:halfLength*2, height:53, bayCount, bayWidth,
      setGateOpen, toggleGate:()=>setGateOpen(gateTarget<.5),
      isGateOpen:()=>breached||gateTarget>.5, update, getColliders,
      dispose(){
        const geometries=new Set(), materials=new Set(), textures=new Set();
        group.traverse(obj=>{
          if(obj.geometry)geometries.add(obj.geometry);
          if(obj.material)(Array.isArray(obj.material)?obj.material:[obj.material]).forEach(m=>materials.add(m));
        });
        materials.forEach(m=>{if(m.map)textures.add(m.map);m.dispose();});
        textures.forEach(t=>t.dispose());geometries.forEach(g=>g.dispose());
      }
    };
  }
export function createWallMaria(options={}) { return create(THREE, options); }
