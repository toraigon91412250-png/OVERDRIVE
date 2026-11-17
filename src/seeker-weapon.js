/**
 * OVERDRIVE / SEEKER compact tri-cell SF launcher (integrated tri-cell launcher model)
 * Three.js r170. No project files, gameplay hooks, VFX, UI, sounds or lights.
 *
 * Coordinate convention: weapon forward = local -Z; up = +Y; camera-facing
 * magazine = local -X. Use root as a camera child or parent it to an FPS anchor.
 */
import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

export const SEEKER_MOUNT = Object.freeze({
  // Shoulder hold: receiver/grip continue below the frame, tubes face forward.
  desktop: Object.freeze({position: [0.30, -0.39, -0.61], rotation: [0.012, 0.020, -0.035], scale: 0.70}),
  mobile: Object.freeze({position: [0.30, -0.37, -0.66], rotation: [0.012, 0.018, -0.030], scale: 0.66}),
});

export function createSeekerWeapon() {
  const root = new THREE.Group();
  root.name = 'SEEKER / ModelRoot';
  const chassis = new THREE.Group();
  chassis.name = 'SEEKER / Chassis (optional recoil pivot)';
  root.add(chassis);

  // One primitive geometry per shape, and one shared material per surface.
  const geom = {
    box: (()=>{const s=new THREE.Shape();s.moveTo(-.40,-.5);s.lineTo(.40,-.5);s.lineTo(.5,-.40);s.lineTo(.5,.40);s.lineTo(.40,.5);s.lineTo(-.40,.5);s.lineTo(-.5,.40);s.lineTo(-.5,-.40);s.closePath();const g=new THREE.ExtrudeGeometry(s,{depth:1,bevelEnabled:false,steps:1});g.translate(0,0,-.5);return g;})(),
    hex: new THREE.IcosahedronGeometry(1, 0),
    collar: new THREE.TorusGeometry(0.057, 0.012, 5, 12),
    lip: new THREE.TorusGeometry(0.0465, 0.0045, 4, 12),
  };
  const mat = {
    black: new THREE.MeshStandardMaterial({color: 0x121b24, metalness: 0.55, roughness: 0.60}),
    graphite: new THREE.MeshStandardMaterial({color: 0x212c34, metalness: 0.67, roughness: 0.52}),
    armor: new THREE.MeshStandardMaterial({color: 0x34434b, metalness: 0.59, roughness: 0.48}),
    edge: new THREE.MeshStandardMaterial({color: 0x657680, metalness: 0.65, roughness: 0.43}),
    cyan: new THREE.MeshStandardMaterial({color: 0x61abb3, emissive: 0x2c8a96, emissiveIntensity: 1.1, metalness: 0.50, roughness: 0.38}),
    amber: new THREE.MeshStandardMaterial({color: 0xb9874d, emissive: 0x915b26, emissiveIntensity: .6, metalness: 0.48, roughness: 0.41}),
    tip: new THREE.MeshStandardMaterial({color: 0x788c91, metalness: 0.77, roughness: 0.28}),
  };
  function mesh(parent, geo, material, name, x, y, z, sx=1, sy=1, sz=1, rx=0, ry=0, rz=0) {
    const m = new THREE.Mesh(geo, material);
    m.name = name;
    m.position.set(x, y, z);
    m.scale.set(sx, sy, sz);
    m.rotation.set(rx, ry, rz);
    parent.add(m);
    return m;
  }
  const box = (p, mt, name, x,y,z, w,h,d, rx=0,ry=0,rz=0) => mesh(p, geom.box, mt, name,x,y,z,w,h,d,rx,ry,rz);
  const ico = (p, mt, name, x,y,z, sx,sy,sz) => mesh(p, geom.hex,mt,name,x,y,z,sx,sy,sz);

  // Low rectangular rifle core rather than a single cylindrical bazooka tube.
  box(chassis, mat.graphite,'Receiver / backbone', 0, -0.045, -0.015, .272,.207,.605);
  box(chassis, mat.armor,'Receiver / upper hood', 0, .069, -.118, .305,.106,.409);
  box(chassis, mat.black,'Receiver / vented underside', 0,-.135, -.129, .210,.053,.340);
  box(chassis, mat.edge,'Front / divider brow', 0,.066,-.340, .292,.059,.051);
  box(chassis, mat.black,'Front / shroud keel', 0,-.069,-.394, .204,.117,.140);
  box(chassis, mat.armor,'Front / armor nose', 0,-.027,-.447, .232,.128,.112);

  // Rearward butt is short, stepped, visibly distinct from long railguns.
  box(chassis, mat.black,'Rear / buffer collar', 0,-.029,.310, .246,.167,.090);
  box(chassis, mat.armor,'Rear / compact butt', 0,-.037,.391, .247,.144,.104);
  box(chassis, mat.black,'Rear / shoulder pad', 0,-.030,.448, .258,.148,.033);
  box(chassis, mat.edge,'Rear / top ridge', 0,.082,.301,.170,.019,.245);

  // Lower frame and hand grip (decorative only, no real-world mechanism).
  box(chassis, mat.black,'Lower / grip socket', .024,-.173,.198, .120,.085,.155);
  box(chassis, mat.graphite,'Grip / angled', .041,-.302,.220, .122,.245,.118, -.19,0,.04);
  box(chassis, mat.armor,'Grip / end cap', .045,-.433,.244, .137,.037,.129, -.19);
  box(chassis, mat.edge,'Grip / surface inlay', -.024,-.310,.158, .010,.153,.020, -.19);
  box(chassis, mat.black,'Trigger guard / horizontal', .020,-.223,.039,.110,.020,.223);
  box(chassis, mat.black,'Trigger guard / brace', .020,-.268,-.073,.105,.110,.022, -.16);

  // Heavy lower cheek plates, framed from side and not overly greebled.
  box(chassis, mat.armor,'Side armor / right', .160,-.016,-.116,.058,.139,.390, 0,-.10,-.04);
  box(chassis, mat.armor,'Side armor / left',-.160,-.016,-.116,.058,.139,.390, 0,.10,.04);
  box(chassis, mat.black,'Side groove / left', -.192,.006,-.155,.009,.018,.245);
  box(chassis, mat.cyan,'Side / restrained cyan trace',-.199,.017,-.190,.008,.010,.172);
  box(chassis, mat.edge,'Side / front wear strip', -.173,.011,-.335,.011,.104,.018);
  box(chassis, mat.edge,'Side / rear fastener', -.179,-.043,.052,.011,.075,.030);

  // Tapered upper tri-cell bank: two bottom cells plus raised center cell.
  const podBank = new THREE.Group();
  podBank.name = 'Triangular three-port launch bank';
  podBank.scale.y = .9;
  podBank.position.y = -.015;
  chassis.add(podBank);
  box(podBank, mat.black,'Pod base / bridge',0,.142,-.225,.339,.062,.332);
  box(podBank, mat.armor,'Pod top / crest',0,.300,-.238,.146,.063,.312);
  box(podBank, mat.graphite,'Pod / left cheek',-.170,.194,-.277,.065,.139,.308,0,0,-.16);
  box(podBank, mat.graphite,'Pod / right cheek', .170,.194,-.277,.065,.139,.308,0,0,.16);
  box(podBank, mat.edge,'Pod / left spine', -.151,.271,-.316,.018,.036,.220,0,0,-.14);
  box(podBank, mat.edge,'Pod / right spine',.151,.271,-.316,.018,.036,.220,0,0,.14);
  box(podBank, mat.black,'Pod / crest support',0,.219,-.265,.156,.113,.311);

  // The three local firing origins are separate Object3D markers, NOT one shared muzzle.
  // Local forward for every port is (0, 0, -1). Tips deliberately stay recessed.
  const cellCenters = [
    [-0.111, 0.208],
    [ 0.111, 0.208],
    [ 0.000, 0.332],
  ];
  const ports = [];
  const muzzleMarkers = [];
  const noses=[], cellGlow=[], counters=[];
  const kicks=[0,0,0];
  cellCenters.forEach(([x,y], index) => {
    const cell = new THREE.Group();
    cell.name = `Missile cell ${index+1}`;
    cell.position.set(x,y,0);
    podBank.add(cell);
    box(cell,mat.graphite,`Cell ${index+1} / square socket`,0,0,-.369,.133,.132,.267);
    box(cell,mat.armor,`Cell ${index+1} / leading shield`,0,0,-.479,.147,.141,.071);
    box(cell,mat.cyan,`Cell ${index+1} / upper guidance stripe`,0,.068,-.386,.021,.007,.174);
    ico(cell,mat.black,`Cell ${index+1} / dark bore`,0,0,-.507,.052,.052,.012);
    mesh(cell,geom.collar,mat.armor,`Cell ${index+1} / thick front rim`,0,0,-.538);
    const guide=mat.cyan.clone();cellGlow.push(guide);mesh(cell,geom.lip,guide,`Cell ${index+1} / cyan inner guide`,0,0,-.549);
    box(cell,guide,`Cell ${index+1} / illuminated dorsal rail`,0,.075,-.365,.032,.016,.24);
    noses.push(ico(cell,mat.tip,`Cell ${index+1} / missile nose`,0,0,-.55,.035,.035,.065));
    const marker = new THREE.Object3D();
    marker.name = `SEEKER_MUZZLE_${index}`;
    // Forward of muzzle/collar so a projectile can spawn without touching the body.
    marker.position.set(0,0,-.612);
    cell.add(marker);
    ports.push({index, group:cell, marker});
    muzzleMarkers.push(marker);
  });
  // Lower bank panels and upper notch lock in the triangle-shaped silhouette.
  box(podBank,mat.black,'Bank / lower splitter',0,.146,-.400,.044,.048,.246);
  box(podBank,mat.armor,'Bank / upper cap',0,.398,-.321,.114,.021,.176);

  // Side-loaded, removable-looking 6-round mag. This assembly remains independent.
  const magazine = new THREE.Group();
  magazine.name = 'SEEKER / detachable six-round side magazine';
  magazine.position.set(-.215,-.174,.083);
  magazine.rotation.z = -.10;
  chassis.add(magazine);
  box(magazine,mat.black,'Magazine / locking shoe',-.011,.133,.008,.130,.066,.177);
  box(magazine,mat.graphite,'Magazine / main block',-.035,0,0,.134,.259,.230);
  box(magazine,mat.armor,'Magazine / outer armor',-.108,0,0,.038,.233,.247);
  box(magazine,mat.black,'Magazine / counter well',-.132,.010,.000,.012,.191,.182);
  box(magazine,mat.edge,'Magazine / upper band',-.127,.120,-.005,.030,.020,.244);
  box(magazine,mat.edge,'Magazine / lower band',-.127,-.121,-.005,.030,.021,.244);
  box(magazine,mat.amber,'Magazine / safety tab',-.134,.145,.072,.012,.032,.056);
  // Six visible indicator cells, fixed art, NOT linked to current ammo count.
  for (let row=0;row<3;row++) for(let col=0;col<2;col++) {
    const i=row*2+col;
    const indicator=mat.amber.clone();counters.push(indicator);
    box(magazine,indicator,`Magazine / amber window ${i+1}`,
       -.145,.075-row*.069, -.054+col*.108, .013,.033,.046);
  }

  // Single compact guidance sensor, not a full scope.
  const sensor = new THREE.Group();
  sensor.name = 'SEEKER / side guidance sensor';
  // Mount the sensor on the receiver's near-side rail rather than above the bank.
  sensor.position.set(-.23,.145,-.040);
  chassis.add(sensor);
  box(chassis,mat.graphite,'Sensor / receiver attachment rail',-.19,.09,-.04,.12,.06,.19);
  box(sensor,mat.black,'Sensor / riser',0,-.026,0,.116,.065,.177);
  box(sensor,mat.armor,'Sensor / low rectangular housing',0,.012,-.010,.142,.068,.176);
  box(sensor,mat.cyan,'Sensor / forward slit',0,.019,-.105,.092,.019,.010);
  box(sensor,mat.edge,'Sensor / top lid',0,.055,-.013,.126,.010,.143);

  // A faceted guidance eye and two swept guards create a readable silhouette.
  const eye=new THREE.Mesh(new THREE.CylinderGeometry(.037,.047,.03,10),mat.cyan);
  eye.rotation.x=Math.PI/2;eye.position.set(0,.022,-.121);sensor.add(eye);
  for(const side of [-1,1])box(chassis,mat.edge,'Swept launch-bank guard',side*.22,.18,-.22,.035,.13,.44,0,side*.16,side*-.24);
  // Merge static surfaces within each independently animated assembly.
  function batch(group){
    for(const c of [...group.children])if(c.isGroup)batch(c);
    const buckets=new Map();
    for(const c of [...group.children])if(c.isMesh){c.updateMatrix();const a=buckets.get(c.material)||[];a.push((c.geometry.index?c.geometry.toNonIndexed():c.geometry.clone()).applyMatrix4(c.matrix));buckets.set(c.material,a);group.remove(c);}
    for(const [material,geometries] of buckets){const merged=mergeGeometries(geometries,false);group.add(new THREE.Mesh(merged,material));geometries.forEach(g=>g.dispose());}
  }
  // Missile noses animate independently; keep them outside the static batches.
  const noseAnchors=noses.map((nose,i)=>{const pivot=new THREE.Group();pivot.name='Loaded missile '+i;ports[i].group.add(pivot);pivot.add(nose);return pivot;});
  batch(chassis);
  function fire(index){kicks[index]=1;}
  function getMuzzleWorldPosition(index, target=new THREE.Vector3()) {
    const p = muzzleMarkers[index];
    if (!p) throw new RangeError(`SEEKER muzzle index must be 0, 1 or 2 (got ${index})`);
    root.updateWorldMatrix(true, true);
    return p.getWorldPosition(target);
  }
  function getMuzzleWorldDirection(index, target=new THREE.Vector3()) {
    const p = muzzleMarkers[index];
    if (!p) throw new RangeError(`SEEKER muzzle index must be 0, 1 or 2 (got ${index})`);
    root.updateWorldMatrix(true, true);
    return target.set(0,0,-1).transformDirection(p.matrixWorld).normalize();
  }
  function stats() {
    let meshes=0, triangles=0;
    root.traverse(obj => {
      if (!obj.isMesh) return;
      for(let node=obj;node&&node!==root;node=node.parent)if(!node.visible)return;
      meshes++;
      const geo=obj.geometry;
      triangles += (geo.index ? geo.index.count : geo.attributes.position.count)/3;
    });
    return {meshes, triangles:Math.round(triangles), firingPorts:muzzleMarkers.length};
  }
  function update(deltaSeconds=0, state={}) {
    const dt=Math.min(.1,Math.max(0,deltaSeconds));
    root.visible=!!state.active;
    if(!root.visible)return;
    const mount=state.mobile?SEEKER_MOUNT.mobile:SEEKER_MOUNT.desktop;
    root.position.fromArray(mount.position);root.rotation.set(...mount.rotation);root.scale.setScalar(mount.scale);
    // Fit the same hold to narrow portrait viewports without moving into the sight.
    if(state.mobile&&root.parent?.isCamera)root.position.x*=Math.min(1,root.parent.aspect/(16/9));
    const recoil=Number.isFinite(state.recoil)?state.recoil:0;
    const reload=Math.max(0,Math.min(1,state.reload||0));
    const dip=Math.sin(reload*Math.PI);
    root.position.y-=dip*.12+(state.swap||0);root.rotation.z-=dip*.24;
    chassis.position.z=recoil*.35;chassis.rotation.x=recoil*.22;
    magazine.position.set(-.215-dip*.17,-.174-dip*.28,.083+dip*.1);
    magazine.rotation.z=-.10-dip*.45;
    const ammo=state.ammo??6,locks=state.locks||0;
    counters.forEach((m,i)=>{const lit=i<ammo;m.color.setHex(lit?0xffc581:0x27353a);m.emissiveIntensity=lit?.65:0;});
    ports.forEach((p,i)=>{kicks[i]=Math.max(0,kicks[i]-dt*5);p.group.position.z=kicks[i]*.065;
      noseAnchors[i].visible=((i-(state.cellCursor||0)+3)%3)<Math.min(3,ammo)&&reload===0;
      cellGlow[i].color.setHex(i<locks?0xffcc83:0x72eadd);cellGlow[i].emissive.setHex(i<locks?0xff9b40:0x2c8a96);
      cellGlow[i].emissiveIntensity=.6+(i<locks?1:0)+kicks[i]*2;
    });
    sensor.rotation.y=Math.sin((state.time||0)*1.8)*.035;
  }
  function dispose() {
    const geometrySet=new Set(Object.values(geom));root.traverse(o=>{if(o.isMesh)geometrySet.add(o.geometry);});geometrySet.forEach(g=>g.dispose());
    Object.values(mat).forEach(m=>m.dispose());[...cellGlow,...counters].forEach(m=>m.dispose());
  }
  root.userData.seekerModel = true;
  root.userData.forwardLocal = [0,0,-1];
  return {root, chassis, podBank, ports, muzzleMarkers, magazine, sensor,
    getMuzzleWorldPosition, getMuzzleWorldDirection, stats, update, fire, dispose};
}
