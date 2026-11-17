# Supplied titan asset integration

The original flight simulation now lives in `src/titan/core.js`; the HTML is a template and `build.mjs` produces all standalone and main-game HTML outputs. Supplied GLBs are embedded in `assets/titan/models.json`. No CDN or asset network request is needed by the raid.

- Armored: 15m, two breakable shoulder hit volumes, existing three-cut or one-spear armor logic. Original body mesh and materials retained.
- Jaw: 5m, real idle/run/roar/bite clips, slow turn and approach, telegraphed bite. Exposed rear nape.
- Attack: 15m, pivot-group arm motions linked to the existing slam. Exposed rear nape.
- Colossal: 60m, elevated starting view, slow slam and telegraphed nearby steam damage. Exposed high rear nape.
- Original ODM HTML: geometry builder extracted into `gear.js`; waist gear, blade models, reel motion and launchers connected to the game. Existing blade-exchange state drives the new blades.
- Spear: grip model on camera, gripless projectile on existing missile simulation, models shared between shots. Missile targets and wire endpoints follow local points on moving target objects.
- Original transformation HTML: bundled with local Three.js, shown on demand from the sortie menu in an iframe; closing removes the iframe. This is a cinematic, not a playable titan transformation mechanic.

Choosing another target replaces the scene hit targets and anchors. Retry restores the selected type, health and armor state. End screen can return to target/loadout selection. Rear blade hits use the exposed nape position and titan forward direction.

Validation completed:

- `node build.mjs`
- `node tests/titan-models.cjs` and `node tests/titan-models.cjs dist/ODM_TITAN_RAID.html`: real GLTF parsing for every model; equipment/blade extraction; race between selections; scale; animation clips; moving anchors; compiled standalone and cinematic script syntax; integrated game start, target selection, armor missile hits, jaw rear-blade kill, retry.
- `node tests/odm-runtime.cjs`, `node tests/odm-armor.cjs`, `node tests/odm-flight.cjs`: passed.
- `node tests/odm-pc-tuning.cjs`: existing failure at the old <42m/s neutral speed assertion. The unchanged previous standalone `/workspace/ODM_TITAN_RAID.html` reproduces the same 61.308m/s result. The user had subsequently requested restoring normal flight speed. Physics tuning was not changed in this asset update.

Verification limits: renderer is stubbed in runtime tests, and image decoding is represented by a bitmap stub in Node model tests. No browser/WebGL playthrough or pixel validation was performed: the managed preview requires `cua_repl.js`, which is not available in this session. The original titan GLBs were separately inspected by rendering their geometry in Blender. Material appearance, complete cinematic playback/audio and subjective combat feel still need browser playtesting.

## Subsequent 10-loop refinement

See [10-loop review](titan-review/10-loop-review.md) for the new encounter state machines, moving hit volumes, continuous body collision, hit feedback, result records, persisted settings/mute, focus pause, resource disposal and draw batching. Hosted index now lazy-loads the raid; standalone downloads retain embedded assets. `npm run test:titan` passes; the old PC speed assertions were updated to the subsequently approved standard speed without changing physics. Browser pixel/input validation remains uncompleted.
