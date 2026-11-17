const assert = require('node:assert/strict');
const vm = require('node:vm');
const esbuild = require('esbuild');
const { load } = require('./odm-runtime.cjs');

global.self = global;
global.createImageBitmap = async () => ({ width: 16, height: 16, close() {} });
global.document = {
  createElement: () => ({ width: 256, height: 256, getContext: () => new Proxy({ measureText: () => ({ width: 50 }), createRadialGradient: () => ({ addColorStop() {} }) }, { get: (object, key) => object[key] || (() => {}) }) })
};
const bundled = esbuild.buildSync({ entryPoints: ['src/titan/index.js'], bundle: true, platform: 'node', format: 'cjs', write: false });
const modelModule = { exports: {} };
vm.runInThisContext('(function(module,exports,require){' + bundled.outputFiles[0].text + '})')(modelModule, modelModule.exports, require);

(async () => {
  const game = load(false, { RaidModels: modelModule.exports });
  for (let i = 0; i < 200 && !game.api.getModels()?.ready; i++) await new Promise(resolve => setImmediate(resolve));
  assert.equal(game.api.getModels().ready, true, 'Raid models load before support integration checks');
  let field = game.api.getBattlefield();
  assert(field?.enabled, 'Battlefield world support is visible on the city route');
  assert.equal(field.gate.opening, 30);
  const city = game.api.worldColliders();
  const mariaWalls = city.filter(item => item.name.startsWith('raid-city-wall-maria-'));
  assert.equal(new Set(mariaWalls.map(item => item.name)).size, 4, 'Maria stonework covers all four city walls');
  assert.equal(mariaWalls.length, 5, 'The breached south wall has two collision sections and the other sides are continuous');
  const southWall = mariaWalls.filter(item => item.name === 'raid-city-wall-maria-south');
  assert(southWall.every(item => Math.abs(item.x) - item.hx >= 15), 'The south model keeps its central 30m breach clear');
  const gateSolids = city.filter(item => item.name.startsWith('raid-gate-'));
  assert(gateSolids.length > 10, 'The opening has visible hookable masonry around it');
  assert(gateSolids.every(item => Math.abs(item.x) - item.hx >= 15 || item.name === 'raid-gate-road'), 'Gate debris leaves its central 30m lane clear');

  game.api.beginMission();
  game.api.setPlayer([0, 18, 538]);
  game.api.setVelocity([0, 0, 65]);
  game.step(.5);
  assert(game.api.getState().pos[2] > 556, 'Human flight passes through the breached wall below its top');
  game.api.setRoute('forest');
  game.step(.02);
  assert.equal(game.api.getBattlefield().enabled, false, 'City support geometry hides outside the city route');
  assert(!game.api.worldColliders().some(item => item.name.startsWith('raid-gate-')));
  game.api.setRoute('city');

  game.api.beginMission();
  game.api.setPlayer([-20, 5, 146]);
  game.api.setVelocity([0, -10, 0]);
  game.step(.6);
  assert(game.api.getState().grounded, 'The resupply platform supports a landed human');
  game.api.setResources(20, 1);
  game.step(1.5);
  assert.equal(game.api.getState().gas, 100, 'The integrated outpost replenishes ODM gas');
  assert.equal(game.api.getState().spares, 5, 'The integrated outpost replenishes blade pairs');
  assert.equal(game.element('#bladeCount').textContent, 5);
  assert.equal(game.api.getBattlefield().supply.count, 1);

  game.api.setPlayer([0, 24, 100]);
  game.api.setVelocity([0, 0, 0]);
  game.step(7);
  field = game.api.getBattlefield();
  assert(field.support.shots > 0, 'The gunner fires when an active Titan is visible and the player is nearby');
  assert(field.support.hits > 0, 'The cannon projectile staggers its target on contact');
  const supportShots = field.support.shots;
  game.step(4);
  assert.equal(game.api.getBattlefield().support.shots, supportShots, 'Integrated cannon support observes its cooldown');

  console.log('PASS integrated gate, route visibility, grounded resupply, cannon telegraph/hit/cooldown and reset lifecycle');
})().catch(error => { console.error(error); process.exitCode = 1; });
