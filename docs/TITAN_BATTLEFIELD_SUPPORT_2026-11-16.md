# Battlefield support integration

`src/titan/battlefield-support.js` exports `createBattlefieldSupport` and `battlefieldLayout`. It adds no campaign, dialogue, keys or floating labels. Existing plaza, avenue and clock tower are retained by integration.

## Minimal integration

Export `createBattlefieldSupport` and `battlefieldLayout` from `src/titan/index.js`, then create it once after the raid roster is available:

```js
const field = window.RaidModels.createBattlefieldSupport({
  scene: Dt, P, anchors: ki, colliders: Ku,
  enemies: () => assetSystem.inspect().enemies,
  canReach: (from, to) => /* the current world-only LOS test */,
  assistEnemy: (id, { duration }) => assetSystem.supportEnemy(id, duration),
  onResupply: () => { /* refresh blade meshes and gas/blade HUD */ },
  sound: (kind, position) => { /* cannon-ready/cannon/cannon-hit/resupply */ }
});
```

`supportEnemy` should look up the alive, enabled roster entry by id and call `entry.system.stagger(duration)`. It should return false if absent; it should not change enemy HP. The module waits until the visible cannon ball reaches its target before invoking this callback. It checks range, player proximity and world line of sight before the shot, and checks target movement/line of sight again at impact.

Call `field.update(dt, { enabled: vn === 'city', running: He && !Ye && !pi })` once per simulation frame, and call `field.update(0, { enabled: vn === 'city', running: false })` when switching routes so its scene visibility updates immediately. Call `field.reset()` from mission reset. The module appends its generated world colliders and hookable geometry to the provided arrays and removes them on `dispose()`; its geometry is invisible/inactive outside the city route. `field.inspect()` reports resupply progress/count, cannon phase/shots/hits and civilian evacuation count for verification.

## Gate and boundary

Before constructing the field, remove or hide only the existing `raid-city-wall` panel whose centre is `(0,41,550)` and dimensions are `(51.7,82,12)`, and remove its collider/anchor. The exact replacement descriptor is exported as `battlefieldLayout.replaceWallPanels[0]`: x 0, z 550, width 51.7, depth 12, top 82. All adjacent wall panels remain.

The module fills the two sides with broken stone jambs, door remnants and rubble. Every collider/anchor is outside `|x| < 15`, providing a clear 30m gateway. The roadway extends from z 506.5 to 571.5. The parent integration should extend the city boundary in this opening so the player can actually pass beyond the current stageLimit 560.

## Play

The outpost is centred `(-20,0,146)`, beside the clear southern end of the starting avenue. Green canvas, a hanging cloth flag, upright gas cylinders and visible blade crates identify it. A human player standing within 5.8m and moving below 7m/s for 1.25s receives full gas and five spare blade pairs; there is an 8s station cooldown. Airborne, paused and transformed players cannot resupply. The callback lets the core refresh blade visibility/HUD. The module does not refill thunder spears or health.

兵士A operates the crates; 兵士B operates a small cannon. When an alive enemy is within 175m of the cannon, within 85m of the player and visible from the barrel, the gunner winds up for .75s, then shoots a visible cannon ball. A successful impact requests a 1.2s stagger, followed by a 14s cooldown. This opens an attack opportunity without killing for the player.

Four low-detail civilian silhouettes (民間人A–D, internal object names only) walk up the open avenue towards the outpost and disappear after evacuating. They add background movement; they have no timer, escort fail state or persistent story. Soldier/civilian meshes have no player collision and are not anchor targets.

## Verification

Run `node tests/titan-battlefield-support.cjs`. It uses real Three.js meshes and verifies the empty central gateway, ground resupply and its pause/form/speed/cooldown guards, cannon telegraph/projectile/LOS/cooldown, civilian evacuation/reset and disposal of all resources/list entries. It does not establish browser visuals or the integrated world collision; those need the parent build/playthrough.
