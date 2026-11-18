import * as T from 'three';

// Shared boss attack visuals: telegraphs, 2-layer beams, 3D shockwaves, styled projectiles, and impact bursts.
// Geometries and base materials are allocated once; transient impact FX are pooled to avoid per-frame GC churn.
export function createBossAttackVisuals({ scene }) {
  const MAX_IMPACTS = 32;
  const root = new T.Group();
  root.name = 'BOSS_ATTACK_VISUALS';
  scene.add(root);

  const ringGeo = new T.TorusGeometry(1, 0.045, 6, 48);
  const thinRingGeo = new T.TorusGeometry(1, 0.022, 5, 48);
  const discGeo = new T.CircleGeometry(1, 36);
  const waveWallGeo = new T.CylinderGeometry(1, 1.04, 0.85, 40, 1, true);
  const beamGeo = new T.CylinderGeometry(1, 1, 1, 12, 1, true);
  beamGeo.rotateX(Math.PI / 2);
  const pillarGeo = new T.CylinderGeometry(0.45, 1, 1, 16, 1, true);
  const domeGeo = new T.SphereGeometry(1, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.52);
  const orbGeo = new T.OctahedronGeometry(1, 1);
  const shardGeo = new T.ConeGeometry(0.45, 1.8, 5);
  shardGeo.rotateX(Math.PI / 2);
  const tailGeo = new T.ConeGeometry(0.28, 1.6, 6);
  tailGeo.rotateX(-Math.PI / 2);
  const tickGeo = new T.BoxGeometry(0.08, 0.04, 0.45);

  const sharedMats = new Map();
  function additiveMat(hex, opacity = 0.85) {
    const key = `${hex}:${opacity.toFixed(2)}`;
    let m = sharedMats.get(key);
    if (!m) {
      m = new T.MeshBasicMaterial({
        color: hex,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: T.AdditiveBlending,
        side: T.DoubleSide,
      });
      m.userData.shared = true;
      sharedMats.set(key, m);
    }
    return m;
  }

  function freshAdditiveMat(hex, opacity = 0.85) {
    return new T.MeshBasicMaterial({
      color: hex,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: T.AdditiveBlending,
      side: T.DoubleSide,
    });
  }

  // Boss-attached windup charge aura (tracks live muzzle/core world position during windup)
  const chargeGroup = new T.Group();
  chargeGroup.visible = false;
  const chargeCoreMat = freshAdditiveMat(0xffffff, 0.9);
  const chargeCore = new T.Mesh(orbGeo, chargeCoreMat);
  const chargeRingAMat = freshAdditiveMat(0xffffff, 0.85);
  const chargeRingA = new T.Mesh(ringGeo, chargeRingAMat);
  const chargeRingBMat = freshAdditiveMat(0xffffff, 0.65);
  const chargeRingB = new T.Mesh(thinRingGeo, chargeRingBMat);
  chargeGroup.add(chargeCore, chargeRingA, chargeRingB);
  root.add(chargeGroup);

  function updateCharge(worldPos, { active = false, progress = 0, color = 0xff875e, clock = 0 } = {}) {
    if (!active || !worldPos) {
      chargeGroup.visible = false;
      return;
    }
    const p = Math.min(1, Math.max(0, progress));
    chargeGroup.visible = true;
    chargeGroup.position.copy(worldPos);
    const pulse = 1 + 0.14 * Math.sin(clock * 28);
    chargeCore.scale.setScalar((0.18 + p * 0.52) * pulse);
    chargeCoreMat.color.setHex(p > 0.82 ? 0xffffff : color);
    chargeCoreMat.opacity = 0.45 + p * 0.5;

    const ringScale = Math.max(0.32, (1.45 - p * 1.05) * pulse);
    chargeRingA.scale.setScalar(ringScale);
    chargeRingA.rotation.set(clock * (3 + p * 6), clock * 2.1, 0);
    chargeRingAMat.color.setHex(color);
    chargeRingAMat.opacity = 0.35 + p * 0.6;

    chargeRingB.scale.setScalar(ringScale * 1.35);
    chargeRingB.rotation.set(-clock * 2.4, clock * (4 + p * 5), clock * 1.5);
    chargeRingBMat.color.setHex(0xffffff);
    chargeRingBMat.opacity = 0.2 + p * 0.55;
  }

  function triggerRelease(worldPos, { color = 0xff875e, radius = 2.1 } = {}) {
    chargeGroup.visible = false;
    if (!worldPos) return;
    spawnImpact(worldPos.x, worldPos.y, worldPos.z, {
      color,
      radius,
      style: 'default',
      life: 0.28,
    });
  }

  // Transient impact pool (lightning pillars, artillery domes, slam bursts, chrono ruptures)
  const impacts = [];
  for (let i = 0; i < MAX_IMPACTS; i++) {
    const g = new T.Group();
    g.visible = false;
    const pillarMat = freshAdditiveMat(0xffffff, 0.9);
    const pillar = new T.Mesh(pillarGeo, pillarMat);
    const ringMat = freshAdditiveMat(0xffffff, 0.9);
    const ring = new T.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    const domeMat = freshAdditiveMat(0xffffff, 0.7);
    const dome = new T.Mesh(domeGeo, domeMat);
    g.add(pillar, ring, dome);
    root.add(g);
    impacts.push({
      group: g,
      pillar,
      pillarMat,
      ring,
      ringMat,
      dome,
      domeMat,
      age: 0,
      life: 0,
      radius: 1,
      style: 'default',
    });
  }

  function spawnImpact(x, y, z, { color = 0xffb854, radius = 3, style = 'default', life = 0.45 } = {}) {
    let slot = impacts.find(s => s.life <= 0);
    if (!slot) {
      slot = impacts.reduce((oldest, cur) => (cur.age > oldest.age ? cur : oldest), impacts[0]);
    }
    slot.group.position.set(x, y, z);
    slot.group.visible = true;
    slot.age = 0;
    slot.life = life;
    slot.radius = radius;
    slot.style = style;

    slot.pillarMat.color.setHex(style === 'tempest' ? 0xdcf4ff : color);
    slot.ringMat.color.setHex(color);
    slot.domeMat.color.setHex(color);

    slot.pillar.visible = style === 'tempest' || style === 'chrono' || style === 'slam';
    slot.dome.visible = style === 'siege' || style === 'slam' || style === 'default';
    slot.ring.visible = true;
  }

  // 1. Area Telegraph (replaces blinking torus)
  function createStrike(x, y, z, { color = 0xffb854, radius = 3, delay = 0.9, style = 'default' } = {}) {
    const g = new T.Group();
    g.position.set(x, y + 0.08, z);

    const outer = new T.Mesh(ringGeo, freshAdditiveMat(color, 0.92));
    outer.rotation.x = Math.PI / 2;
    outer.scale.setScalar(radius);

    const fillMat = freshAdditiveMat(color, 0.24);
    const fill = new T.Mesh(discGeo, fillMat);
    fill.rotation.x = -Math.PI / 2;
    fill.position.y = 0.01;
    fill.scale.setScalar(0.01);

    const innerRing = new T.Mesh(thinRingGeo, freshAdditiveMat(0xffffff, 0.7));
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = 0.02;
    innerRing.scale.setScalar(radius);

    g.add(outer, fill, innerRing);

    let shell = null;
    let guide = null;
    let ticks = null;

    if (style === 'siege') {
      // Falling artillery shell
      shell = new T.Group();
      const body = new T.Mesh(shardGeo, additiveMat(0xffe7b8, 0.95));
      body.rotation.x = -Math.PI / 2;
      body.scale.set(0.45, 0.45, 0.85);
      const aura = new T.Mesh(orbGeo, additiveMat(color, 0.65));
      aura.scale.setScalar(0.42);
      shell.add(body, aura);
      shell.position.y = 26;
      g.add(shell);
    } else if (style === 'tempest') {
      // Overhead storm ring + crackling guide filament
      guide = new T.Mesh(beamGeo, freshAdditiveMat(0xdcf6ff, 0.45));
      guide.rotation.x = Math.PI / 2;
      guide.position.y = 14;
      guide.scale.set(0.06, 0.06, 28);
      g.add(guide);
    } else if (style === 'chrono') {
      // Clockwork reticle ticks
      ticks = new T.Group();
      const tickMat = additiveMat(0xffe0f4, 0.85);
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        const t = new T.Mesh(tickGeo, tickMat);
        t.position.set(Math.sin(a) * radius * 0.82, 0.04, Math.cos(a) * radius * 0.82);
        t.rotation.y = a;
        ticks.add(t);
      }
      g.add(ticks);
    }

    g.userData.bossVisual = {
      kind: 'strike',
      color,
      radius,
      totalDelay: Math.max(0.05, delay),
      style,
      detonated: false,
      outer,
      fill,
      fillMat,
      innerRing,
      shell,
      guide,
      ticks,
    };
    return g;
  }

  // 2. Two-Layer Emissive Beam / Laser (replaces flat BoxGeometry)
  function createLaser(a, b, { color = 0xff875e, delay = 0.8, style = 'default', trackOrigin = null } = {}) {
    const g = new T.Group();
    const len = Math.max(0.1, a.distanceTo(b));
    g.position.copy(a).lerp(b, 0.5);
    g.lookAt(b);

    const coreMat = freshAdditiveMat(0xffffff, 0.95);
    const core = new T.Mesh(beamGeo, coreMat);
    core.scale.set(0.035, 0.035, len);

    const auraMat = freshAdditiveMat(color, 0.45);
    const aura = new T.Mesh(beamGeo, auraMat);
    aura.scale.set(0.09, 0.09, len);

    // Muzzle charge ring at origin (in local space, z = -len/2)
    const chargeMat = freshAdditiveMat(color, 0.85);
    const chargeRing = new T.Mesh(ringGeo, chargeMat);
    chargeRing.position.set(0, 0, -len * 0.5 + 0.15);
    chargeRing.scale.setScalar(1.4);

    g.add(core, aura, chargeRing);
    g.userData.bossVisual = {
      kind: 'laser',
      color,
      len,
      totalDelay: Math.max(0.05, delay),
      style,
      trackOrigin,
      fired: false,
      core,
      coreMat,
      aura,
      auraMat,
      chargeRing,
      chargeMat,
    };
    return g;
  }

  // 3. 3D Shockwave Wall (replaces single thin torus)
  function createWave({ color = 0xff875e, style = 'default' } = {}) {
    const g = new T.Group();

    const wallMat = freshAdditiveMat(color, 0.42);
    const wall = new T.Mesh(waveWallGeo, wallMat);
    wall.position.y = 0.42;

    const rim = new T.Mesh(ringGeo, freshAdditiveMat(0xffffff, 0.78));
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.12;

    const crest = new T.Mesh(thinRingGeo, freshAdditiveMat(color, 0.9));
    crest.rotation.x = Math.PI / 2;
    crest.position.y = 0.82;

    g.add(wall, rim, crest);

    if (style === 'gravity') {
      const tilt = new T.Mesh(thinRingGeo, freshAdditiveMat(0xc79bff, 0.75));
      tilt.rotation.set(Math.PI / 2 + 0.25, 0, 0.18);
      tilt.position.y = 0.55;
      g.add(tilt);
    }

    g.userData.bossVisual = {
      kind: 'wave',
      color,
      style,
      wallMat,
    };
    return g;
  }

  // 4. Styled Projectiles with Trails (replaces uniform orange icosahedron)
  const PROJECTILE_STYLES = {
    warden: { color: 0x79dfff, core: 0xe6fbff, shape: 'orb', scale: 0.22, trail: true },
    phoenix: { color: 0xff8833, core: 0xfff1b8, shape: 'shard', scale: 0.28, trail: true },
    gravity: { color: 0x9b72ff, core: 0x1a0b2e, shape: 'ringed', scale: 0.25, trail: true },
    mirror: { color: 0xf49ce6, core: 0xffffff, shape: 'shard', scale: 0.21, trail: true },
    chrono: { color: 0xffa8dd, core: 0xfff4c2, shape: 'ringed', scale: 0.23, trail: true },
    devourer: { color: 0xf56ca0, core: 0xffe6f0, shape: 'orb', scale: 0.24, trail: true },
    default: { color: 0xff935d, core: 0xfff0d4, shape: 'orb', scale: 0.19, trail: true },
  };

  function createProjectile(origin, vel, styleId = 'default', low = false) {
    const spec = PROJECTILE_STYLES[styleId] || PROJECTILE_STYLES.default;
    const g = new T.Group();
    g.position.copy(origin);

    const core = new T.Mesh(spec.shape === 'shard' ? shardGeo : orbGeo, additiveMat(spec.core, 0.95));
    core.scale.setScalar(spec.scale * 0.68);

    const aura = new T.Mesh(spec.shape === 'shard' ? shardGeo : orbGeo, additiveMat(spec.color, 0.65));
    aura.scale.setScalar(spec.scale * 1.15);

    g.add(core, aura);

    let ring = null;
    if (spec.shape === 'ringed' && !low) {
      ring = new T.Mesh(thinRingGeo, additiveMat(spec.color, 0.9));
      ring.scale.setScalar(spec.scale * 1.65);
      g.add(ring);
    }

    if (spec.trail && !low) {
      const tail = new T.Mesh(tailGeo, additiveMat(spec.color, 0.42));
      tail.position.z = -spec.scale * 2.1;
      tail.scale.setScalar(spec.scale * 1.15);
      g.add(tail);
    }

    if (vel && vel.lengthSq() > 0.0001) {
      g.lookAt(origin.x + vel.x, origin.y + vel.y, origin.z + vel.z);
    }

    g.userData.bossProjectile = { spin: ring };
    return g;
  }

  function updateHazard(h, dt, clock) {
    const v = h.mesh?.userData?.bossVisual;
    if (!v) return false;

    if (v.kind === 'strike') {
      h.mesh.visible = true;
      const progress = Math.min(1, Math.max(0, 1 - h.delay / v.totalDelay));
      v.fill.scale.setScalar(Math.max(0.02, v.radius * progress));
      v.fillMat.opacity = 0.16 + progress * 0.34;
      v.innerRing.scale.setScalar(v.radius * (1 - progress * 0.35));

      if (v.shell) {
        const drop = 1 - progress * progress;
        v.shell.position.y = Math.max(0.2, drop * 26);
        v.shell.rotation.y += dt * 8;
      }
      if (v.guide) {
        const pulse = 0.04 + progress * 0.1 + Math.sin(clock * 28) * 0.025;
        v.guide.scale.set(pulse, pulse, 28);
      }
      if (v.ticks) {
        v.ticks.rotation.y += dt * (1.2 + progress * 3.5);
      }

      if (h.delay <= 0 && !v.detonated) {
        v.detonated = true;
        spawnImpact(h.mesh.position.x, h.mesh.position.y, h.mesh.position.z, {
          color: v.color,
          radius: v.radius,
          style: v.style,
          life: v.style === 'siege' ? 0.55 : 0.42,
        });
        v.outer.visible = v.fill.visible = v.innerRing.visible = false;
        if (v.shell) v.shell.visible = false;
        if (v.guide) v.guide.visible = false;
        if (v.ticks) v.ticks.visible = false;
      }
      return true;
    }

    if (v.kind === 'laser') {
      h.mesh.visible = true;
      if (h.delay > 0) {
        if (v.trackOrigin && h.a && h.b) {
          const liveA = v.trackOrigin();
          if (liveA) {
            const delta = h.b.clone().sub(h.a);
            h.a.copy(liveA);
            h.b.copy(liveA).add(delta);
            v.len = Math.max(0.1, h.a.distanceTo(h.b));
            h.mesh.position.copy(h.a).lerp(h.b, 0.5);
            h.mesh.lookAt(h.b);
            v.chargeRing.position.set(0, 0, -v.len * 0.5 + 0.15);
          }
        }
        const progress = Math.min(1, Math.max(0, 1 - h.delay / v.totalDelay));
        const pulse = 0.03 + 0.025 * Math.sin(clock * 24);
        v.core.scale.set(pulse, pulse, v.len);
        v.aura.scale.set(0.07 + progress * 0.08, 0.07 + progress * 0.08, v.len);
        v.auraMat.opacity = 0.2 + progress * 0.35;
        v.chargeRing.visible = true;
        v.chargeRing.scale.setScalar(Math.max(0.18, (1 - progress) * 1.55));
        v.chargeRing.rotation.z += dt * 7;
      } else {
        const fade = Math.min(1, Math.max(0, h.life / 0.3));
        const coreR = 0.16 * (0.4 + 0.6 * fade);
        const auraR = 0.44 * (0.5 + 0.5 * fade);
        v.core.scale.set(coreR, coreR, v.len);
        v.aura.scale.set(auraR, auraR, v.len);
        v.coreMat.opacity = 0.95 * fade;
        v.auraMat.opacity = 0.58 * fade;
        v.chargeRing.visible = true;
        v.chargeRing.scale.setScalar(0.55 + (1 - fade) * 1.4);
        v.chargeMat.opacity = 0.75 * fade;
      }
      return true;
    }

    if (v.kind === 'wave') {
      const fade = Math.min(1, Math.max(0, h.life / 5));
      v.wallMat.opacity = 0.45 * fade;
      return false; // let caller scale h.mesh and advance h.r
    }

    return false;
  }

  function update(dt, _clock = 0, low = false) {
    for (const slot of impacts) {
      if (slot.life <= 0) continue;
      slot.age += dt;
      slot.life -= dt;
      if (slot.life <= 0) {
        slot.group.visible = false;
        continue;
      }
      const total = slot.age + slot.life;
      const t = Math.min(1, slot.age / Math.max(0.01, total));
      const inv = 1 - t;

      slot.ring.scale.setScalar(slot.radius * (0.45 + t * 0.9));
      slot.ringMat.opacity = 0.85 * inv;

      if (slot.pillar.visible) {
        const h = slot.style === 'tempest' ? 28 : slot.style === 'chrono' ? 16 : 7;
        const w = (slot.style === 'tempest' ? 0.55 : slot.radius * 0.45) * (0.35 + 0.65 * inv);
        slot.pillar.scale.set(w, h, w);
        slot.pillar.position.y = h * 0.5;
        slot.pillarMat.opacity = (low ? 0.6 : 0.88) * inv;
      }

      if (slot.dome.visible) {
        const s = slot.radius * (0.35 + t * 0.85);
        slot.dome.scale.set(s, s * 0.75, s);
        slot.domeMat.opacity = 0.65 * inv * inv;
      }
    }
  }

  function disposeHazard(mesh) {
    if (!mesh) return;
    mesh.traverse(o => {
      if (o.material && !o.material.userData?.shared) o.material.dispose();
    });
  }

  function reset() {
    chargeGroup.visible = false;
    for (const slot of impacts) {
      slot.life = 0;
      slot.age = 0;
      slot.group.visible = false;
    }
  }

  function dispose() {
    reset();
    for (const geo of [ringGeo, thinRingGeo, discGeo, waveWallGeo, beamGeo, pillarGeo, domeGeo, orbGeo, shardGeo, tailGeo, tickGeo]) {
      geo.dispose();
    }
    for (const m of sharedMats.values()) m.dispose();
    sharedMats.clear();
    chargeCoreMat.dispose();
    chargeRingAMat.dispose();
    chargeRingBMat.dispose();
    for (const slot of impacts) {
      slot.pillarMat.dispose();
      slot.ringMat.dispose();
      slot.domeMat.dispose();
    }
    scene.remove(root);
  }

  return {
    createStrike,
    createLaser,
    createWave,
    createProjectile,
    spawnImpact,
    updateCharge,
    triggerRelease,
    updateHazard,
    disposeHazard,
    update,
    reset,
    dispose,
  };
}
