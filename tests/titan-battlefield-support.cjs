const assert = require('node:assert/strict');
const vm = require('node:vm');
const esbuild = require('esbuild');
const THREE = require('three');
const output = esbuild.buildSync({ entryPoints: ['src/titan/battlefield-support.js'], bundle: true, platform: 'node', format: 'cjs', write: false });
const moduleValue = { exports: {} };
vm.runInThisContext('(function(module,exports,require){' + output.outputFiles[0].text + '})')(moduleValue, moduleValue.exports, require);
const { createBattlefieldSupport, battlefieldLayout } = moduleValue.exports;

function setup() {
  const scene = new THREE.Scene(), colliders = [], anchors = [];
  const P = { pos: new THREE.Vector3(-20, 2.08, 146), vel: new THREE.Vector3(), grounded: true, gas: 20, spares: 1, titanForm: false };
  const events = { resupplies: [], pins: [], sounds: [] };
  let enemies = [], reachable = true;
  const battlefield = createBattlefieldSupport({ scene, P, colliders, anchors, enemies: () => enemies, canReach: () => reachable, onResupply: event => events.resupplies.push(event), assistEnemy: (id, info) => events.pins.push({ id, ...info }), sound: type => events.sounds.push(type) });
  return { scene, P, colliders, anchors, events, battlefield, setEnemies: value => enemies = value, setReachable: value => reachable = value };
}
const step = (b, seconds, state = {}) => { for (let i = 0; i < Math.ceil(seconds * 20); i++) b.update(.05, state); };

{
  const { P, colliders, anchors, battlefield, events, scene } = setup();
  assert.equal(battlefield.inspect().enabled, false);
  assert.equal(battlefieldLayout.replaceWallPanels.length, 4);
  assert(battlefieldLayout.replaceWallPanels.every(panel => panel.width === 1080 && panel.top === 53 && panel.name.startsWith('raid-city-wall-maria-')));
  assert.equal(battlefieldLayout.gate.wallHeight, 53);
  for (const collider of colliders.filter(c => Math.abs(c.z - 550) < 25)) assert(Math.abs(collider.x) - collider.hx >= 15, 'Gate solids must leave the central 30m lane open');
  assert(anchors.some(anchor => anchor.name === 'raid-gate-rubble'), 'Surrounding rubble is hookable');
  assert(anchors.every(anchor => !anchor.visible), 'Inactive support geometry cannot remain in world ray/collision lists');
  step(battlefield, 2, { running: false });
  assert.equal(P.gas, 20, 'Pause cannot finish a resupply');
  step(battlefield, 1.3);
  assert.equal(P.gas, 100); assert.equal(P.spares, 5); assert.equal(events.resupplies.length, 1);
  assert(events.sounds.includes('resupply'));
  P.gas = 10; P.spares = 0;
  step(battlefield, 2);
  assert.equal(P.gas, 10, 'Supply cooldown prevents continual instant refill');
  P.titanForm = true; step(battlefield, 10);
  assert.equal(P.gas, 10, 'Titan form cannot use human resupply');
  P.titanForm = false; P.grounded = false; step(battlefield, 2);
  assert.equal(P.gas, 10, 'Flying through the station does not trigger a refill');
  P.grounded = true; P.vel.set(12, 0, 0); step(battlefield, 2);
  assert.equal(P.gas, 10, 'A high speed pass does not finish a refill');
  P.vel.set(0, 0, 0); step(battlefield, 1.3);
  assert.equal(P.gas, 100); assert.equal(events.resupplies.length, 2);
  battlefield.update(.05, { enabled: false });
  assert(anchors.every(anchor => !anchor.visible));
  battlefield.reset();
  assert.equal(battlefield.inspect().supply.count, 0);
  battlefield.dispose();
  assert.equal(scene.children.length, 0); assert.equal(colliders.length, 0); assert.equal(anchors.length, 0);
}
{
  const { P, battlefield, events, setEnemies, setReachable } = setup();
  P.pos.set(0, 1.78, 30);
  setEnemies([{ id: 'engaged', alive: true, type: 'attack', position: [0, 0, 18] }]);
  step(battlefield, 3.1);
  assert.equal(battlefield.inspect().support.phase, 'windup');
  assert.equal(events.pins.length, 0, 'The gunner must telegraph before assisting');
  step(battlefield, .8);
  assert.equal(battlefield.inspect().support.phase, 'projectile');
  assert.equal(events.pins.length, 0, 'Assistance waits for the visible projectile to arrive');
  step(battlefield, 1.5);
  assert.equal(events.pins.length, 1); assert.equal(events.pins[0].id, 'engaged');
  assert.equal(events.pins[0].duration, 1.2); assert.equal(events.pins[0].damage, undefined, 'Cannon support does not auto-kill Titans');
  step(battlefield, 10);
  assert.equal(events.pins.length, 1, 'Support respects its cooldown');
  battlefield.reset(); setReachable(false); step(battlefield, 8);
  assert.equal(battlefield.inspect().support.shots, 0, 'The cannon does not fire through opaque world geometry');
  setReachable(true); setEnemies([{ id: 'far', alive: true, type: 'attack', position: [0, 0, 480] }]); step(battlefield, 8);
  assert.equal(battlefield.inspect().support.shots, 0, 'The cannon only supports nearby fights');
  setEnemies([]); step(battlefield, 130);
  assert.equal(battlefield.inspect().civilians.evacuated, 4, 'Civilian silhouettes reach the clear avenue outpost without an escort failure state');
  battlefield.reset();
  assert.equal(battlefield.inspect().civilians.evacuated, 0);
  assert.deepEqual(battlefield.inspect().civilians.positions[0], [8, 0, -74]);
  battlefield.dispose();
}
console.log('PASS battlefield gate clearance, spatial resupply, pause/form/speed guards, support telegraph/contact/cooldown/occlusion, evacuation and cleanup');
