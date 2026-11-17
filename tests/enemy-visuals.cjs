// Headless Three.js construction checks; these do not claim WebGL/Safari rendering coverage.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const T = require('three');
const {buildSync} = require('esbuild');

const root = path.resolve(__dirname, '..');
const compiled = buildSync({entryPoints: [path.join(root, 'src/enemy-visuals.js')], bundle: true, external: ['three'], format: 'cjs', write: false}).outputFiles[0].text;
const visualModule = new Module(path.join(__dirname, 'enemy-visuals.generated.cjs'), module);
visualModule.paths = module.paths;
visualModule._compile(compiled, path.join(__dirname, 'enemy-visuals.generated.cjs'));
const {applyEnemyReadability} = visualModule.exports;
const source = fs.readFileSync(path.join(root, 'src/game.js'), 'utf8');
const helpers = source.slice(source.indexOf('const mats={}'), source.indexOf('const arena='));
const spawn = source.slice(source.indexOf('function spawn('), source.indexOf('function blocked('));
const factory = new Function('T', 'applyEnemyReadability', 'difficulty', `
  const scene = new T.Scene(), enemies = []; let bossRef, wave=1; const random = () => .5;
  const world = {radar: () => ({wave})};
  const terrainStage = () => world.radar().wave;
  ${helpers}
  ${spawn}
  return {spawn, mats};
`);
const types = ['chaser', 'shooter', 'strafer', 'charger', 'boss'];
const health = [65, 80, 80, 140, 1700];
const luminance = c => .2126*c.r + .7152*c.g + .0722*c.b;
const coverLuminance = luminance(new T.Color(0x253b4c));

for (const difficulty of ['normal', 'easy']) {
  // A no-op material pass provides the existing geometry/hitbox construction as a control.
  const control = factory(T, () => {}, difficulty);
  const revised = factory(T, applyEnemyReadability, difficulty);
  for (const [i, type] of types.entries()) {
    const old = control.spawn(type, 4, -6);
    const enemy = revised.spawn(type, 4, -6);
    const again = revised.spawn(type, 8, -6);
    assert.equal(enemy.hp, health[i] * (difficulty === 'easy' ? .5 : 1));
    assert.equal(enemy.r, old.r);
    assert.equal(enemy.cd, old.cd);
    assert.equal(enemy.mesh.children.length, old.mesh.children.length, 'No extra meshes or lights');
    assert.equal(enemy.core.material.emissiveIntensity, 1.35);
    assert.equal(enemy.core.material.emissive.getHex(), old.core.material.emissive.getHex(), 'Preserve role color');
    let armorCount = 0;
    for (let j=0; j<enemy.mesh.children.length; j++) {
      const mesh = enemy.mesh.children[j], before = old.mesh.children[j];
      assert(mesh.isMesh);
      assert.equal(mesh.geometry.type, before.geometry.type);
      assert.deepEqual(mesh.position.toArray(), before.position.toArray());
      assert.deepEqual(mesh.scale.toArray(), before.scale.toArray());
      assert.deepEqual(mesh.rotation.toArray(), before.rotation.toArray());
      assert.equal(mesh.material, again.mesh.children[j].material, 'Reuse materials across enemies');
      assert(mesh.material.fog && mesh.material.depthTest && mesh.material.depthWrite);
      assert.equal(mesh.material.transparent, false);
      if (mesh.material.name.endsWith('-armor')) {
        armorCount++;
        assert(luminance(mesh.material.color) > coverLuminance * 3, 'Armor contrasts with architecture');
        assert(luminance(mesh.material.color) > luminance(before.material.color) * 2);
      }
    }
    assert(armorCount > 0);
    for (const material of Object.values(revised.mats)) assert.equal(material.name, '', 'Do not mutate shared source materials');
  }
}
console.log('PASS: 5 enemy types × 2 difficulties: material contrast, role colors, fog/depth, shared cache, unchanged geometry/transforms/HP/radii/cooldowns.');
