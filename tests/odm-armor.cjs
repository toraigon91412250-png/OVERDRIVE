const assert = require('assert/strict');
const {load} = require('./odm-runtime.cjs');

function aimAtArmor(g, x) {
  g.api.setPlayer([x, 20.5, 30]);
  g.api.setAim(0, 0);
  g.step(.02);
  const target = g.api.getAimTarget();
  const expected = x < 0 ? 'armorL' : 'armorR';
  assert.equal(target?.part, expected, `Aim should hit ${expected}`);
  assert(target.distance <= 8.2, 'Armor slash must be in close range');
}

for (const mobile of [false, true]) {
  const g = load(mobile);
  g.api.beginMission();

  for (let cut = 1; cut <= 3; cut++) {
    aimAtArmor(g, -4.205);
    g.api.slash();
    g.step(.02);
    const state = g.api.getState();
    assert.equal(state.armor[0], cut < 3, 'Left armor breaks on the third blade hit');
    assert.equal(state.armor[1], true, 'A single broken side keeps the nape sealed');
    assert.equal(state.napeOpen, false);
    if (cut < 3) {
      assert.match(g.element('#armorRead').textContent, new RegExp(`L ${cut}/3`));
    }
    g.step(.4);
  }

  for (let cut = 1; cut <= 3; cut++) {
    aimAtArmor(g, 4.205);
    g.api.slash();
    g.step(.02);
    const state = g.api.getState();
    assert.equal(state.armor[1], cut < 3, 'Right armor breaks on the third blade hit');
    assert.equal(state.napeOpen, cut === 3, 'The nape opens only after both plates break');
    g.step(.4);
  }

  assert.equal(g.api.getState().spares, 5, 'Armor cuts do not consume spare blades');
  g.api.reset();
  assert.equal(g.api.getState().armor[0], true, 'Reset restores left armor');
  assert.equal(g.api.getState().armor[1], true, 'Reset restores right armor');
  assert.match(g.element('#armorRead').textContent, /L 0\/3.*R 0\/3/);

  const missile = load(mobile);
  missile.api.beginMission();
  aimAtArmor(missile, -4.205);
  missile.api.fireThunder();
  missile.step(.2);
  assert.equal(missile.api.getState().armor[0], false, 'One thunder round destroys one armor plate');
  assert.equal(missile.api.getState().armor[1], true, 'One thunder round leaves the other plate intact');
  assert.equal(missile.api.getState().napeOpen, false);
}

console.log('PASS ODM armor desktop/mobile: three close blade hits break each plate, nape gate, reset, and one-shot thunder behavior');
