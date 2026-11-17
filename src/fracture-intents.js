// Σ owns its world recipe. Objectives, routes, cover and reinforcements are
// generated together; the original Ω generator is deliberately left alone.
const KINDS = ['breach', 'relay', 'route', 'hunt'];
const SPECS = {
  breach: {
    name: '破砕突破 / BREACHWORKS', gimmick: 1, chargers: .72, shooter: true,
    instruction: '防壁の奥に装置3基。壁を砕くか、横道から回り込め。',
    tactic: '壊すと直進路が開く。横道は弾を節約できる。',
    colors: [0x3e3831, 0x8b6951, 0x17131c, 0xffc47b, 0xffdfaa]
  },
  relay: {
    name: '双塔制圧 / SWITCHBACK', gimmick: 4, chargers: .25, shooter: true,
    instruction: '二つの高台を順に制圧。光る台で1.25秒キープ。',
    tactic: '二本の橋から進路を選ぶ。敵を片側へ寄せて渡れ。',
    colors: [0x304653, 0x658ca3, 0x101a2c, 0x9cdeff, 0xd0f3ff]
  },
  route: {
    name: '追跡走破 / RUNLINE', gimmick: 2, chargers: .2, shooter: false,
    instruction: '外周のゲート3個を順に通過。加速盤は進む方向へ加速。',
    tactic: '中央は空洞。直線で加速し、角の手前で進路を変えろ。',
    colors: [0x293f38, 0x588675, 0x0b1b20, 0x8effce, 0xd2ffb1]
  },
  hunt: {
    name: '標的狩り / CROSSFANG', gimmick: 1, chargers: .5, shooter: false,
    instruction: '金色の標的2体を狩れ。追跡型と突進型が両側から迫る。',
    tactic: '短い防壁で突進の射線を切り、横から撃ち込め。',
    colors: [0x413143, 0x8e5b78, 0x1b1025, 0xffb1cf, 0xffd8b0]
  }
};
function rng(seed) {
  let state = (Number(seed) >>> 0) || 1;
  return () => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) / 4294967296);
}
function shuffle(items, random) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

// Each block of four worlds contains all four encounters. Only the order,
// recipe variation, orientation and dressing are random, not reachability.
export class FractureDirector {
  constructor(seed = 1) { this.reset(seed); }
  reset(seed = 1) { this.random = rng(seed ^ 0x51f15e); this.bag = []; this.last = null; this.round = 0; }
  next({ boss = false } = {}) {
    if (!this.bag.length) {
      this.bag = shuffle([...KINDS], this.random);
      if (this.bag[0] === this.last) [this.bag[0], this.bag[1]] = [this.bag[1], this.bag[0]];
    }
    const kind = this.bag.shift();
    this.last = kind;
    const layout = createFractureLayout(Math.floor(this.random() * 4294967296), kind, { boss });
    layout.intent.round = ++this.round;
    return layout;
  }
}

export function composeIntentEncounter(intent, count, random = Math.random, includeShooter = true) {
  const spec = SPECS[intent?.kind] || SPECS.hunt;
  const size = Math.max(0, Math.floor(count));
  const shooter = includeShooter && spec.shooter && size >= 4;
  const roster = [];
  const melee = size - (shooter ? 1 : 0);
  // A recognizable composition, rather than a coin flip that can turn every
  // world into the same six chargers. Shuffle changes arrival order only.
  const chargers = Math.round(melee * spec.chargers);
  for (let i = 0; i < melee; i++) roster.push(i < chargers ? 'charger' : 'chaser');
  shuffle(roster, random);
  if (shooter) roster.push('shooter'); // the first contact is always melee
  return roster;
}

export function createFractureLayout(seed = 1, kind = 'breach', { boss = false } = {}) {
  if (!SPECS[kind]) kind = 'breach';
  const spec = SPECS[kind], random = rng(seed), pick = n => Math.floor(random() * n);
  const step = 3.8 + pick(3) * .2, rotation = pick(4), mirror = pick(2) ? -1 : 1;
  const variant = pick(3), raw = new Map(), rawWalls = [];
  let start, goals, zones, bossHint, props = {}, elevation = () => 0;
  const put = (x, z) => raw.set(x + ',' + z, [x, z]);
  const rect = (x0, x1, z0, z1) => {
    for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) put(x, z);
  };
  // Dimensions here are in tiles. All barriers occupy tile centers so the
  // navigation grid and continuous player collision agree about open lanes.
  const wall = (x, z, w, d, h = 3.2) => rawWalls.push({ x, z, w, d, h });

  if (kind === 'breach') {
    rect(-2, 2, -7, 7);
    for (const [i, z] of [4, 0, -4].entries()) {
      const side = (i + variant) % 2 ? -1 : 1;
      rect(side < 0 ? -4 : 2, side < 0 ? -2 : 4, z - 2, z + 2);
      // One open edge plus a wider outer bypass; shooting the gate opens the
      // center for both the player and the pursuing enemies.
      wall(-side * .5, z, 3.7, .55, 3.6);
    }
    start = [0, 7]; goals = [[0, 2], [0, -2], [0, -6]];
    zones = [[-2, 1], [2, -3], [0, -7], [2, 5], [-2, -5]];
    bossHint = [0, -6];
  } else if (kind === 'relay') {
    const depth = 3 + (variant === 2 ? 1 : 0);
    rect(-7, -3, -depth, depth); rect(3, 7, -depth, depth);
    rect(-3, 3, -depth, -depth + 1); rect(-3, 3, depth - 1, depth);
    rect(-1, 1, -depth, depth + 2);
    // The central span is a gentle 0.25m-per-tile ramp. The opposite control
    // decks therefore have a real height difference without a jump-sized lip.
    elevation = x => 2 + (x + 7) * .25;
    for (const x of [-5, 5]) for (const z of [-depth + 1, depth - 1]) wall(x, z, .5, .5, 2.6);
    start = [0, depth + 2]; goals = [[-5, 0], [5, 0]];
    zones = [[-6, -depth], [6, -depth], [-3, depth], [3, depth], [0, -depth]];
    bossHint = [-6, 0]; props.lifts = [[-6, 2], [6, -2]];
  } else if (kind === 'route') {
    const rx = 6 + (variant === 1 ? 1 : 0), rz = 5 + (variant === 2 ? 1 : 0);
    for (let z = -rz; z <= rz; z++) for (let x = -rx; x <= rx; x++) {
      if (Math.abs(x) >= rx - 2 || Math.abs(z) >= rz - 2) put(x, z);
    }
    start = [-rx + 1, rz - 1];
    goals = [[-rx + 1, -1], [0, -rz + 1], [rx - 1, 0]];
    zones = [[-rx + 1, rz], [0, rz - 1], [rx - 1, rz - 1], [rx - 1, -rz + 1]];
    bossHint = [rx - 1, -rz + 1];
    props.boosters = [[-rx + 1, rz - 2], [-rx + 3, -rz + 1], [rx - 1, -rz + 3], [rx - 3, rz - 1]];
    // Corner cover stays outside the racing line. Acceleration is useful but
    // never a required jump, and every checkpoint has a continuous footpath.
    wall(-rx, -rz, .45, .45, 2.4); wall(rx, rz, .45, .45, 2.4);
  } else {
    const reach = variant === 1 ? 9 : 8;
    for (let z = -5; z <= 5; z++) for (let x = -6; x <= 6; x++) {
      if (Math.abs(x) + Math.abs(z) <= reach) put(x, z);
    }
    rect(-2, 2, -5, 5);
    elevation = (x, z) => Math.max(0, 3 - Math.max(Math.abs(x), Math.abs(z))) * .45;
    for (const x of [-2, 2]) for (const z of [-1, 2]) wall(x, z, .45, 1.45, 2.8);
    start = [0, 5]; goals = [[-4, 0], [4, -2]];
    zones = [[-5, -1], [5, -1], [0, -5], [-3, 3], [3, 3]];
    bossHint = [0, -4];
  }

  const transform = (x, z) => {
    x *= mirror;
    return rotation === 0 ? [x, z] : rotation === 1 ? [-z, x] : rotation === 2 ? [-x, -z] : [z, -x];
  };
  const point = ([x, z]) => { const [ix, iz] = transform(x, z); return { x: ix * step, z: iz * step }; };
  const cells = [...raw.values()].map(([x, z]) => {
    const [ix, iz] = transform(x, z);
    return { ix, iz, x: ix * step, z: iz * step, h: elevation(x, z) };
  });
  const byKey = new Map(cells.map(c => [c.ix + ',' + c.iz, c]));
  const cellAt = (x, z) => byKey.get(Math.round(x / step) + ',' + Math.round(z / step));
  const walls = rawWalls.map(w => {
    const p = point([w.x, w.z]);
    return { ...p, w: (rotation % 2 ? w.d : w.w) * step, d: (rotation % 2 ? w.w : w.d) * step, h: w.h, base: cellAt(p.x, p.z)?.h || 0 };
  });
  const blocked = (x, z, r = .7) => walls.some(w => !w.destroyed && Math.abs(x - w.x) < w.w / 2 + r && Math.abs(z - w.z) < w.d / 2 + r);
  const walkable = c => !!c && !blocked(c.x, c.z);
  const startPoint = point(start), startCell = cellAt(startPoint.x, startPoint.z);
  const nodes = [], reachableNodes = [];
  function adjacent(c) {
    const out = [];
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = byKey.get((c.ix + dx) + ',' + (c.iz + dz));
      if (walkable(n) && Math.abs(n.h - c.h) <= .66) out.push(n);
    }
    return out;
  }
  function refreshNavigation() {
    const found = [startCell], seen = new Set(found);
    for (let i = 0; i < found.length; i++) for (const n of adjacent(found[i])) {
      if (!seen.has(n)) { seen.add(n); found.push(n); }
    }
    nodes.splice(0, nodes.length, ...found);
    reachableNodes.splice(0, reachableNodes.length, ...found);
    return nodes.length;
  }
  refreshNavigation();
  function nearest(x, z, r = .7) {
    let best = null, distance = Infinity;
    for (const n of nodes) {
      if (blocked(n.x, n.z, r)) continue;
      const d = (n.x - x) ** 2 + (n.z - z) ** 2;
      if (d < distance) { best = n; distance = d; }
    }
    return best;
  }
  function path(x, z, tx, tz) {
    const from = nearest(x, z), to = nearest(tx, tz);
    if (!from || !to || from === to) return [];
    const queue = [from], previous = new Map([[from, null]]);
    for (let i = 0; i < queue.length && !previous.has(to); i++) for (const n of adjacent(queue[i])) {
      if (!previous.has(n)) { previous.set(n, queue[i]); queue.push(n); }
    }
    if (!previous.has(to)) return [];
    const result = [];
    for (let n = to; n !== from; n = previous.get(n)) result.push({ x: n.x, z: n.z });
    return result.reverse();
  }
  const snap = coords => { const p = point(coords), n = nearest(p.x, p.z); return { x: n.x, y: n.h, z: n.z }; };
  const targets = goals.map(snap), spawnZones = zones.map(snap), bossSpawn = snap(bossHint);
  const laneMarks = [];
  if (kind === 'route' && !boss) {
    let previous = startPoint;
    for (const target of targets) {
      const leg = path(previous.x, previous.z, target.x, target.z);
      for (const node of leg) {
        const dx = node.x - previous.x, dz = node.z - previous.z;
        laneMarks.push({ x: node.x, z: node.z, h: cellAt(node.x,node.z).h, w: Math.abs(dx) > Math.abs(dz) ? 1.25 : .1, d: Math.abs(dx) > Math.abs(dz) ? .1 : 1.25, rank: 0 });
        target.yaw = Math.atan2(previous.x - node.x, previous.z - node.z);
        previous = node;
      }
    }
  }
  // Authored prop locations use the same transform as the floor, so an
  // acceleration deck cannot be stranded on the far side of a generated void.
  const propHints = Object.fromEntries(Object.entries(props).map(([type, points]) => [type, points.map(snap)]));
  propHints.anchors = [goals[0], goals[goals.length - 1], start].map(snap);
  const next = path(startPoint.x, startPoint.z, targets[0].x, targets[0].z)[0];
  const entry = { ...startPoint, y: startCell.h, yaw: next ? Math.atan2(startPoint.x - next.x, startPoint.z - next.z) : 0 };

  function spawnPoint(type, angle, px, pz, occupied = []) {
    const fraction = ((angle / (Math.PI * 2)) % 1 + 1) % 1;
    const preferred = type === 'boss' ? bossSpawn : spawnZones[Math.floor(fraction * spawnZones.length)];
    const radius = type === 'boss' ? 2.5 : .95;
    const safe = nodes.filter(n => Math.hypot(n.x - px, n.z - pz) >= 10 && !blocked(n.x, n.z, radius));
    // A ten-metre player exclusion always wins over preferred lanes/spacing.
    // There is ample safe floor in each recipe; spacing may relax when packed.
    let pool = safe.filter(n => occupied.every(o => Math.hypot(n.x - o.x, n.z - o.z) > 3.5));
    if (!pool.length) pool = safe;
    let best = null, score = Infinity;
    for (const n of pool) {
      const distance = Math.hypot(n.x - px, n.z - pz);
      const targetPenalty = type === 'boss' ? 0 : targets.some(t => Math.hypot(n.x - t.x, n.z - t.z) < 3) ? 24 : 0;
      const value = Math.hypot(n.x - preferred.x, n.z - preferred.z) + Math.max(0, distance - 32) * 2 + targetPenalty;
      if (value < score) { best = n; score = value; }
    }
    // Fail closed: callers defer a reinforcement if there is no safe node.
    return best ? { x: best.x, y: best.h, z: best.z } : null;
  }

  const maxX = Math.max(...cells.map(c => Math.abs(c.x))), maxZ = Math.max(...cells.map(c => Math.abs(c.z)));
  const radius = Math.hypot(maxX, maxZ), backdropRadius = Math.max(64, radius + 27);
  const skyline = Array.from({ length: 24 }, (_, i) => {
    const angle = i * Math.PI / 12, height = 18 + random() * 32;
    if (kind === 'breach') return { x: (i % 2 ? 1 : -1) * (maxX + 25), y: height / 2, z: (Math.floor(i / 2) - 5.5) * 10, w: 6, h: height, d: 5, tilt: 0 };
    if (kind === 'relay') return { x: Math.sin(angle) * backdropRadius, y: 12 + i % 3 * 8, z: Math.cos(angle) * backdropRadius, w: 8, h: 24 + i % 3 * 16, d: 8, tilt: (i % 2 ? 1 : -1) * .08 };
    if (kind === 'route') return { x: Math.sin(angle) * backdropRadius, y: 14, z: Math.cos(angle) * backdropRadius, w: 4, h: 28, d: 7, tilt: .36 };
    return { x: Math.sin(angle) * backdropRadius, y: height / 2, z: Math.cos(angle) * backdropRadius, w: 6, h: height, d: 6, tilt: (i % 2 ? 1 : -1) * .3 };
  });
  const name = spec.name + ' · ' + (variant + 1);
  return {
    wave: 9 + KINDS.indexOf(kind), omega: true, fracture: true,
    gimmick: boss ? 6 : spec.gimmick, topology: 'sigma-' + kind,
    topologyKey: kind + ':' + variant, arenaForm: kind.toUpperCase(),
    cellSizeX: step, cellSizeZ: step, name,
    rule: boss ? '中枢ボスの耐久は持ち越す。アンカーを撃ち、露出したコアを狙え。' : spec.tactic,
    intent: { kind, mission: boss ? 'boss' : kind, name, instruction: spec.instruction, tactic: spec.tactic, variant, rotation, mirror, targets, spawnZones, bossSpawn, propHints },
    cells, walls, nodes, reachableNodes, cellAt, blocked, nearest, path, refreshNavigation, spawnPoint, laneMarks,
    pads: [...targets, snap(start), bossSpawn, snap(start)].slice(0, 5).map(p => ({ ...p, y: p.y + .08 })),
    entry, launch: 22, bounds: { x: maxX + step * .45, z: maxZ + step * .45 }, spawnDistance: 10,
    viewRadius: Math.max(58, radius * 1.25), gridCells: 441, seed: Number(seed) >>> 0,
    colors: ['Σ / ' + name, ...spec.colors], skyline,
    backdrop: { radius: backdropRadius + 6, jitter: 6, base: 22, span: 30, width: 1, tilt: kind === 'route' ? .3 : .1, gate: backdropRadius + 2, gateHeight: 26, gateWidth: 1.1 }
  };
}
