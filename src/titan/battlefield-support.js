import * as THREE from 'three';
import { createWallMaria } from './wall-maria.js';

export const battlefieldLayout = Object.freeze({
  supply: Object.freeze({ x: -20, z: 146, radius: 5.8 }),
  gate: Object.freeze({ x: 0, z: 550, opening: 30, wallHeight: 53 }),
  replaceWallPanels: Object.freeze([
    Object.freeze({ x: 0, z: 550, width: 1080, depth: 14, top: 53, name: 'raid-city-wall-maria-south' }),
    Object.freeze({ x: 0, z: -550, width: 1080, depth: 14, top: 53, name: 'raid-city-wall-maria-north' }),
    Object.freeze({ x: 550, z: 0, width: 1080, depth: 14, top: 53, name: 'raid-city-wall-maria-east' }),
    Object.freeze({ x: -550, z: 0, width: 1080, depth: 14, top: 53, name: 'raid-city-wall-maria-west' })
  ])
});

// All support is spatial: stand by the supply crates, or fight within sight of
// the gunner. No new key, modal prompt, quest or named-character dependency.
export function createBattlefieldSupport(ctx) {
  const { scene, P } = ctx;
  const root = new THREE.Group();
  root.name = 'raid-battlefield-support';
  root.visible = false;
  root.userData.cityOnly = true;
  scene.add(root);
  const colliders = [], anchors = [], resources = new Set(), actors = [];
  const mariaWalls = [];
  const oldCityWallPanels = [];
  scene.traverse(object => { if (object.name === 'raid-city-wall') oldCityWallPanels.push(object); });
  for (const object of oldCityWallPanels) {
    object.visible = false;
    object.removeFromParent();
    for (const list of [ctx.colliders, ctx.anchors]) {
      if (!list) continue;
      for (let i = list.length - 1; i >= 0; i--) {
        if (list[i] === object || list[i].mesh === object) list.splice(i, 1);
      }
    }
  }
  function addMariaWall({ name, x, z, yaw, gate = false, gateOpen = false, gateBreached = false, opening, bayWidth = 27 }) {
    const model = createWallMaria({ bayCount: 20, bayWidth, gate, gateOpen, gateBreached, opening, quality: 'standard' });
    const { group } = model;
    group.name = name;
    group.position.set(x, 0, z); group.rotation.y = yaw; group.userData.cityOnly = true;
    root.add(group); mariaWalls.push(model);
    group.traverse(object => {
      if (!object.isMesh) return;
      object.userData.cityOnly = true;
      anchors.push(object); ctx.anchors?.push(object);
    });
    const cosine = Math.cos(yaw), sine = Math.sin(yaw);
    for (const block of model.getColliders()) {
      let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
      for (const localX of [block.minX, block.maxX]) for (const localZ of [block.minZ, block.maxZ]) {
        const worldX = x + cosine * localX + sine * localZ;
        const worldZ = z - sine * localX + cosine * localZ;
        minX = Math.min(minX, worldX); maxX = Math.max(maxX, worldX);
        minZ = Math.min(minZ, worldZ); maxZ = Math.max(maxZ, worldZ);
      }
      const collider = { mesh: group, x: (minX + maxX) / 2, z: (minZ + maxZ) / 2,
        hx: (maxX - minX) / 2, hz: (maxZ - minZ) / 2,
        h: block.maxY, top: block.maxY, bottom: block.minY };
      colliders.push(collider); ctx.colliders?.push(collider);
    }
  }
  // The model's gate is kept open at the south entrance; the other three sides are continuous.
  addMariaWall({ name: 'raid-city-wall-maria-south', x: 0, z: 550, yaw: 0, gate: true, gateOpen: true, gateBreached: true, opening: 30, bayWidth: 25.8 });
  addMariaWall({ name: 'raid-city-wall-maria-north', x: 0, z: -550, yaw: Math.PI, bayWidth: 27 });
  addMariaWall({ name: 'raid-city-wall-maria-east', x: 550, z: 0, yaw: Math.PI / 2, bayWidth: 27 });
  addMariaWall({ name: 'raid-city-wall-maria-west', x: -550, z: 0, yaw: -Math.PI / 2, bayWidth: 27 });
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const headGeometry = new THREE.SphereGeometry(1, 8, 6);
  const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 8);
  resources.add(boxGeometry); resources.add(headGeometry); resources.add(cylinderGeometry);
  const material = (color, extra = {}) => {
    const value = new THREE.MeshStandardMaterial({ color, roughness: .9, ...extra });
    resources.add(value);
    return value;
  };
  const stone = material(0xa39c87), chipped = material(0x77705f), wood = material(0x69513a);
  const steel = material(0x626a67, { metalness: .7, roughness: .4 });
  const canvas = material(0x58705c, { side: THREE.DoubleSide });
  const jacket = material(0x8f7357), trousers = material(0xb8b1a0), boots = material(0x3c342b);
  const skin = material(0xc2a184), cloak = material(0x405847);
  const tank = material(0x71877d, { metalness: .55, roughness: .5 });
  const lampMaterial = material(0x9bb69a, { emissive: 0x5c8e6b, emissiveIntensity: .25 });
  const tracerMaterial = new THREE.MeshBasicMaterial({ color: 0xffd495 });
  const smokeMaterial = new THREE.MeshBasicMaterial({ color: 0xc5bdab, transparent: true, opacity: 0, depthWrite: false });
  resources.add(tracerMaterial); resources.add(smokeMaterial);

  function mesh(parent, geometry, mat, position, scale, name) {
    const object = new THREE.Mesh(geometry, mat);
    object.position.set(...position);
    object.scale.set(...scale);
    object.name = name || '';
    object.userData.cityOnly = true;
    object.castShadow = object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  const box = (parent, mat, position, scale, name) => mesh(parent, boxGeometry, mat, position, scale, name);
  function solid(object, x, z, width, depth, top, bottom = 0) {
    const collider = { mesh: object, x, z, hx: width / 2, hz: depth / 2, top, h: top, bottom };
    colliders.push(collider); anchors.push(object);
    ctx.colliders?.push(collider); ctx.anchors?.push(object);
    return object;
  }
  function worldSolid(parent, mat, position, scale, name) {
    const object = box(parent, mat, position, scale, name);
    solid(object, position[0], position[2], scale[0], scale[2], position[1] + scale[1] / 2, position[1] - scale[1] / 2);
    return object;
  }

  // The open south breach keeps its 30m passage; rubble stays outside |x| < 15.
  const gate = new THREE.Group(); gate.name = 'raid-breached-gate'; root.add(gate);
  for (const side of [-1, 1]) {
    worldSolid(gate, stone, [side * 20.425, 26.5, 550], [10.85, 53, 12], 'raid-gate-jamb');
    worldSolid(gate, chipped, [side * 17.5, 22.5, 550], [5, 45, 13], 'raid-gate-broken-edge');
    worldSolid(gate, stone, [side * 20.5, 53.5, 550], [8.5, 1, 11], 'raid-gate-crown');
    const door = worldSolid(gate, wood, [side * 21, 8, 539.5], [9, 16, 1.8], 'raid-gate-door-remnant');
    door.rotation.z = side * .12;
    for (let i = 0; i < 5; i++) {
      const x = side * (17 + i % 3 * 3.3), z = 535 + i * 3.2, h = 1.1 + i % 3 * .8;
      const rubble = worldSolid(gate, i % 2 ? chipped : stone, [x, h / 2, z], [2.5, h, 2.6], 'raid-gate-rubble');
      rubble.rotation.y = i * .53;
    }
    for (let i = 0; i < 3; i++) box(gate, chipped, [side * (17.3 + i * 2.4), 58 + i * 7, 543.7], [2.3, 4, .6]);
  }
  const paving = material(0x8e8979);
  box(gate, paving, [0, -.035, 539], [28, .04, 65], 'raid-gate-road');

  const outpost = new THREE.Group(); outpost.name = 'raid-supply-outpost'; root.add(outpost);
  worldSolid(outpost, stone, [-21, .15, 147], [15, .3, 12], 'raid-supply-platform');
  for (const x of [-27, -15]) for (const z of [143, 151]) worldSolid(outpost, wood, [x, 1.8, z], [.24, 3.6, .24], 'raid-supply-post');
  box(outpost, canvas, [-21, 3.65, 147], [13, .16, 9], 'raid-supply-canopy');
  const canopyRidge = box(outpost, canvas, [-21, 3.9, 147], [13, .13, 2]); canopyRidge.rotation.x = -.08;
  for (let i = 0; i < 4; i++) {
    const crate = worldSolid(outpost, wood, [-25 + i * 2.1, .75, 150.5], [1.8, 1.2, 1.25], 'raid-blade-crate');
    box(outpost, steel, [crate.position.x, 1.42, 150.5], [1.5, .08, .25]);
    for (let j = 0; j < 3; j++) box(outpost, steel, [crate.position.x - .5 + j * .5, 1.5, 150.5], [.09, .06, .9]);
  }
  for (const x of [-26, -24.8, -23.6]) {
    mesh(outpost, cylinderGeometry, tank, [x, 1.25, 144], [.4, 1.9, .4], 'raid-gas-cylinder');
    box(outpost, steel, [x, 2.3, 144], [.14, .2, .14]);
  }
  const supplyLamp = box(outpost, lampMaterial, [-26, 2.5, 144], [.3, .3, .3], 'raid-supply-lamp');
  worldSolid(outpost, wood, [-29, 3, 149], [.18, 6, .18], 'raid-supply-flagpole');
  const flag = box(outpost, cloak, [-27.8, 5, 149], [2.2, 1.25, .035], 'raid-supply-flag');
  // A pale pair of blades is identifiable without a floating label.
  box(outpost, trousers, [-27.9, 5, 148.97], [.10, .85, .035]).rotation.z = -.5;
  box(outpost, trousers, [-27.9, 5, 148.94], [.10, .85, .035]).rotation.z = .5;

  const supplyStations = [{ ...battlefieldLayout.supply }, ...(ctx.supplyStations || [])];
  // Reuse the same crates, tanks and green flag at the district's street-side caches.
  for (const station of supplyStations.slice(1)) {
    const copy = outpost.clone(true), originals = [], copies = [];
    outpost.traverse(object => originals.push(object)); copy.traverse(object => copies.push(object));
    const mapping = new Map(originals.map((object, i) => [object, copies[i]]));
    const dx = station.x - battlefieldLayout.supply.x, dz = station.z - battlefieldLayout.supply.z;
    copy.position.set(dx, 0, dz); copy.name = 'raid-district-supply-cache'; root.add(copy);
    for (const obstacle of [...colliders]) {
      if (!mapping.has(obstacle.mesh)) continue;
      const mesh = mapping.get(obstacle.mesh), collider = { ...obstacle, mesh, x: obstacle.x + dx, z: obstacle.z + dz };
      colliders.push(collider); anchors.push(mesh); ctx.colliders?.push(collider); ctx.anchors?.push(mesh);
    }
  }

  function person(name, position, civilian = false, color = 0x77776b) {
    const actor = new THREE.Group(); actor.name = name; actor.position.set(...position); root.add(actor);
    const shirt = civilian ? material(color) : jacket;
    box(actor, shirt, [0, 1.13, 0], [.43, .56, .26]);
    box(actor, boots, [0, .81, 0], [.42, .08, .27]);
    mesh(actor, headGeometry, skin, [0, 1.58, 0], [.17, .22, .17]);
    const arms = [], legs = [];
    for (const side of [-1, 1]) {
      const arm = new THREE.Group(); arm.position.set(side * .28, 1.34, 0); actor.add(arm);
      box(arm, shirt, [0, -.21, 0], [.14, .4, .15]);
      box(arm, skin, [0, -.46, 0], [.12, .15, .12]); arms.push(arm);
      const leg = new THREE.Group(); leg.position.set(side * .12, .8, 0); actor.add(leg);
      box(leg, civilian ? shirt : trousers, [0, -.23, 0], [.17, .47, .18]);
      box(leg, boots, [0, -.59, .035], [.18, .26, .27]); legs.push(leg);
    }
    if (!civilian) box(actor, cloak, [0, 1.05, -.19], [.48, .75, .06]);
    const record = { root: actor, arms, legs, start: actor.position.clone(), phase: 0, evacuated: false };
    actors.push(record); return record;
  }
  const quartermaster = person('兵士A', [-22, .3, 147.8]);
  const gunner = person('兵士B', [-16.2, 0, 136.2]);
  const civilians = [0x7a6759, 0x8c8972, 0x6c7479, 0x9b8065].map((color, i) => person('民間人' + String.fromCharCode(65 + i), [8 + i * 1.8, 0, -74 + i * 29], true, color));

  const cannon = new THREE.Group(); cannon.name = 'raid-support-cannon'; cannon.position.set(-17, .55, 138); root.add(cannon);
  for (const side of [-1, 1]) {
    const wheel = mesh(cannon, cylinderGeometry, wood, [side * .78, .15, 0], [.66, .15, .66]); wheel.rotation.z = Math.PI / 2;
    box(cannon, steel, [side * .78, .15, 0], [.18, .18, .18]);
  }
  box(cannon, wood, [0, .15, -.6], [1.1, .22, 2.3]);
  const cannonAim = new THREE.Group(); cannonAim.position.set(0, .7, .2); cannon.add(cannonAim);
  const barrel = mesh(cannonAim, cylinderGeometry, steel, [0, 0, 1.1], [.32, 2.6, .32]); barrel.rotation.x = Math.PI / 2;
  const shot = mesh(root, headGeometry, tracerMaterial, [0, -100, 0], [.2, .2, .2], 'raid-cannon-ball'); shot.visible = false;
  const smoke = mesh(root, headGeometry, smokeMaterial, [0, -100, 0], [1, 1, 1], 'raid-cannon-smoke'); smoke.visible = false;
  const muzzle = new THREE.Vector3(), target = new THREE.Vector3(), source = new THREE.Vector3(), scratch = new THREE.Vector3();
  const playerPoint = new THREE.Vector3(), shotFrom = new THREE.Vector3(), shotTo = new THREE.Vector3();
  let enabled = false, time = 0, resupplyProgress = 0, resupplyCooldown = 0, resupplies = 0;
  let supportCooldown = 3, supportPhase = 'idle', supportTimer = 0, supportTarget = null, supportShots = 0, supportHits = 0;
  let projectileAge = 0, projectileDuration = 0, smokeAge = 2, evacuated = 0;

  function setEnabled(value) {
    if (enabled === value) return;
    enabled = value; root.visible = value;
    for (const object of anchors) object.visible = value;
    if (!value) { shot.visible = smoke.visible = false; resupplyProgress = 0; supportPhase = 'idle'; supportTarget = null; }
  }
  const enemyId = enemy => enemy.id ?? enemy.V?.id;
  const alive = enemy => enemy && enemy.enabled !== false && (enemy.alive ?? enemy.V?.alive) !== false;
  function positionOf(enemy, out) {
    const position = enemy.position ?? enemy.V?.root.position;
    if (!position) return out.set(0, -1000, 0);
    return Array.isArray(position) ? out.fromArray(position) : out.copy(position);
  }
  function aimPoint(enemy, out) {
    positionOf(enemy, out);
    const height = enemy.height || ({ jaw: 5, armored: 15, attack: 15, colossal: 60 }[enemy.kind || enemy.type] || 15);
    out.y += height * .55; return out;
  }
  function muzzlePoint() { root.updateMatrixWorld(true); return cannonAim.localToWorld(muzzle.set(0, 0, 2.6)); }
  const getEnemies = () => ctx.enemies?.() || [];
  function findEnemy(id) { return getEnemies().find(enemy => enemyId(enemy) === id && alive(enemy)); }
  function chooseTarget() {
    let best = null, bestDistance = Infinity;
    for (const enemy of getEnemies()) {
      if (!alive(enemy)) continue;
      aimPoint(enemy, target);
      const distance = target.distanceToSquared(cannon.position);
      if (distance > 175 * 175 || distance < 14 * 14 || target.distanceToSquared(P.pos) > 85 * 85 || distance >= bestDistance) continue;
      if (ctx.canReach && !ctx.canReach(muzzlePoint(), target)) continue;
      best = enemy; bestDistance = distance;
    }
    return best;
  }
  function faceTarget(enemy) {
    aimPoint(enemy, target); scratch.copy(target).sub(cannon.position);
    cannonAim.rotation.y = Math.atan2(scratch.x, scratch.z);
    cannonAim.rotation.x = -Math.min(.28, Math.max(-.15, Math.atan2(scratch.y - 1.2, Math.hypot(scratch.x, scratch.z))));
    gunner.root.rotation.y = cannonAim.rotation.y;
  }
  function launch(enemy) {
    faceTarget(enemy); shotFrom.copy(muzzlePoint()); aimPoint(enemy, shotTo);
    if (ctx.canReach && !ctx.canReach(shotFrom, shotTo)) { supportPhase = 'idle'; supportCooldown = 2; return; }
    projectileAge = 0; projectileDuration = THREE.MathUtils.clamp(shotFrom.distanceTo(shotTo) / 105, .22, 1.6);
    supportPhase = 'projectile'; supportShots++; shot.visible = true; shot.position.copy(shotFrom);
    smokeAge = 0; smoke.visible = true; smoke.position.copy(shotFrom); cannon.position.z = 137.72;
    ctx.sound?.('cannon', shotFrom);
  }
  function updateSupport(dt) {
    supportCooldown = Math.max(0, supportCooldown - dt);
    cannon.position.z += (138 - cannon.position.z) * Math.min(1, dt * 8);
    smokeAge += dt;
    smoke.visible = smokeAge < .65;
    if (smoke.visible) { smoke.scale.setScalar(.45 + smokeAge * 3); smokeMaterial.opacity = .28 * (1 - smokeAge / .65); }
    gunner.arms[0].rotation.x = gunner.arms[1].rotation.x = supportPhase === 'windup' ? -.85 : -.35;
    if (supportPhase === 'idle') {
      if (supportCooldown > 0 || !ctx.assistEnemy) return;
      const enemy = chooseTarget(); if (!enemy) return;
      supportTarget = enemyId(enemy); supportPhase = 'windup'; supportTimer = .75; faceTarget(enemy);
      ctx.sound?.('cannon-ready', cannon.position); return;
    }
    const enemy = findEnemy(supportTarget);
    if (supportPhase === 'windup') {
      if (!enemy) { supportPhase = 'idle'; supportCooldown = 2; return; }
      faceTarget(enemy); supportTimer -= dt;
      if (supportTimer <= 0) launch(enemy);
      return;
    }
    projectileAge += dt;
    const progress = Math.min(1, projectileAge / projectileDuration);
    shot.position.lerpVectors(shotFrom, shotTo, progress); shot.position.y += Math.sin(progress * Math.PI) * 3;
    if (progress < 1) return;
    shot.visible = false; supportPhase = 'idle'; supportCooldown = 14;
    if (!enemy) return;
    aimPoint(enemy, target);
    if (target.distanceTo(shotTo) <= 8 && (!ctx.canReach || ctx.canReach(shotFrom, target))) {
      if (ctx.assistEnemy(supportTarget, { duration: 1.2, source: shotFrom.clone(), point: target.clone() }) !== false) {
        supportHits++; ctx.sound?.('cannon-hit', target);
      }
    }
  }
  function updateSupply(dt) {
    resupplyCooldown = Math.max(0, resupplyCooldown - dt);
    playerPoint.copy(P.pos); playerPoint.y = 0;
    const station = supplyStations.find(item => Math.hypot(P.pos.x-item.x, P.pos.z-item.z) <= item.radius);
    source.set(station?.x ?? battlefieldLayout.supply.x, 0, station?.z ?? battlefieldLayout.supply.z);
    const ammoLimit = ctx.maxAmmo?.();
    const needsAmmo = Number.isFinite(ammoLimit) && P.thunderAmmo < ammoLimit;
    const needsSupplies = P.gas < 99.5 || P.spares < 5 || needsAmmo;
    const inside = !P.titanForm && !P.titanEntering && !!P.grounded && P.pos.y < 4.5 && !!station && playerPoint.distanceToSquared(source) <= station.radius ** 2 && (P.vel?.lengthSq() || 0) < 49;
    const supplying = inside && needsSupplies && resupplyCooldown <= 0;
    resupplyProgress = supplying ? Math.min(1.25, resupplyProgress + dt) : 0;
    quartermaster.arms[0].rotation.x = supplying ? -.8 : 0;
    supplyLamp.material.emissiveIntensity = supplying ? .45 + resupplyProgress * .8 : resupplyCooldown > 0 ? .05 : .25;
    if (resupplyProgress < 1.25) return;
    const previous = { gas: P.gas, spares: P.spares };
    P.gas = 100; P.spares = 5; P.gasDelay = 0;
    if (Number.isFinite(ammoLimit)) { P.thunderAmmo = ammoLimit; P.thunderMag = Math.min(2, ammoLimit); P.thunderReload = 0; }
    resupplies++; resupplyProgress = 0; resupplyCooldown = 8;
    ctx.onResupply?.({ previous, gas: 100, spares: 5 });
    ctx.sound?.('resupply', source);
  }
  function updateCivilians(dt) {
    for (const actor of civilians) {
      if (actor.evacuated) continue;
      const x = actor.root.position.x, z = actor.root.position.z;
      const goalX = z < 105 ? actor.start.x : -8, goalZ = 151;
      const dx = goalX - x, dz = goalZ - z, distance = Math.hypot(dx, dz);
      if (distance < .45) { actor.evacuated = true; actor.root.visible = false; evacuated++; continue; }
      const speed = 2.2 + civilians.indexOf(actor) * .12, step = Math.min(distance, speed * dt);
      actor.root.position.x += dx / distance * step; actor.root.position.z += dz / distance * step;
      actor.root.rotation.y = Math.atan2(dx, dz); actor.phase += step * 3.6;
      for (let i = 0; i < 2; i++) { const swing = Math.sin(actor.phase + i * Math.PI) * .45; actor.legs[i].rotation.x = swing; actor.arms[i].rotation.x = -swing; }
    }
  }
  function update(dt, state = {}) {
    setEnabled(state.enabled !== false);
    if (!enabled || state.running === false || dt <= 0) return;
    time += dt; flag.rotation.y = Math.sin(time * 1.7) * .08;
    for (const wall of mariaWalls) wall.update(dt);
    updateSupply(dt); updateSupport(dt); updateCivilians(dt);
  }
  function reset() {
    time = resupplyProgress = resupplyCooldown = resupplies = supportTimer = supportShots = supportHits = evacuated = 0;
    supportCooldown = 3; supportPhase = 'idle'; supportTarget = null; projectileAge = 0; smokeAge = 2;
    shot.visible = smoke.visible = false; cannon.position.z = 138;
    for (const actor of actors) {
      actor.root.position.copy(actor.start); actor.root.rotation.set(0, 0, 0); actor.root.visible = true;
      actor.phase = 0; actor.evacuated = false;
      for (const limb of [...actor.arms, ...actor.legs]) limb.rotation.set(0, 0, 0);
    }
    supplyLamp.material.emissiveIntensity = .25;
  }
  function inspect() {
    return { enabled, supply: { position: [-20, 0, 146], stations: supplyStations.map(item => ({...item})), progress: resupplyProgress / 1.25, cooldown: resupplyCooldown, count: resupplies }, support: { phase: supportPhase, target: supportTarget, cooldown: supportCooldown, shots: supportShots, hits: supportHits }, civilians: { total: civilians.length, evacuated, positions: civilians.map(actor => actor.root.position.toArray()) }, gate: battlefieldLayout.gate };
  }
  function dispose() {
    root.removeFromParent();
    for (const wall of mariaWalls) wall.dispose();
    for (const collider of colliders) { const index = ctx.colliders?.indexOf(collider) ?? -1; if (index >= 0) ctx.colliders.splice(index, 1); }
    for (const anchor of anchors) { const index = ctx.anchors?.indexOf(anchor) ?? -1; if (index >= 0) ctx.anchors.splice(index, 1); }
    for (const resource of resources) resource.dispose();
  }
  for (const object of anchors) object.visible = false;
  return { root, layout: battlefieldLayout, colliders, anchors, update, reset, inspect, dispose };
}
