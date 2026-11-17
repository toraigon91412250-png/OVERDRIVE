# Boss rush system

Standard difficulty's sixth sector now ends in a boss rush. Easy retains its original single Warden encounter. Ten boss IDs are shuffled without replacement; five kills win, five timeouts lose. These first-to-five rules finish in at most nine encounters, even though the roster/deck has ten bosses.

Each combat round lasts 30 active gameplay seconds. Pause, card selection, world construction and the existing EXPLOSION cinematic do not consume the clock. Boss defeat takes priority if it coincides with the deadline. Defeating a boss immediately advances; timeout removes that boss without kill rewards and offers three dedicated cards, choose one. Fifth timeout ends the run without another card.

The next world is selected from existing layouts 2–6, excluding the last layout. Construction takes 2.7 seconds and can be skipped with the existing button. It starts with blank space. Terrain rendering, collision, paths and radar use the same layout. Player relocates to that layout's valid entry point. Every weapon, including ASTRA, receives a full magazine. Health is not refilled. The next timer starts only after construction. Surviving escorts are counted, removed, and replaced by the same number of randomly drawn normal enemies. SWARM may create extra escorts during combat (capped at six). Boss and escort spawn locations use valid unblocked floor cells at least 12 units from the player, preferring 12–22 units. On sparse terrain the nearest valid fallback can be farther.

## Failure tiers (absolute factors; ratios applied once per transition)

| Misses | Max health | Player speed | Boss health | Boss attack cadence | Incoming damage |
|---|---:|---:|---:|---:|---:|
|0|1|1|1|1|1|
|1|.97|.99|1.65|1.02|1.03|
|2|.90|.95|2.30|1.08|1.12|
|3|.72|.82|3.20|1.18|1.30|
|4|.42|.60|4.60|1.35|1.65|
|5|.08|.15|8|1.80|3|

Tier five applies before terminal defeat. Damage bonuses, evolved weapons and refill interactions retain their current power; balance values are provisional, not a claim of tested difficulty. Cards are conditional +65–90% combat styles or recoil movement; each can stack twice. They do not undo the stat theft. Moderate visible camera recoil is also applied on standard-difficulty shots; ordinary aim input is not permanently displaced.

## Model handoff

`src/boss-rush.js` exports `BOSSES`: warden, ram, siege, prism, bulwark, tempest, gravity, swarm, mirror, devourer. IDs remain stable. Names/colors/health are data. `rushModel(e, spec)` in `src/game.js` currently installs colored blocks. Replace this function's geometry with the supplied model and preserve:

- `e.mesh`: scene root at the original spawn position, local +Z faces the player, model around y=0.
- `e.core`: weakpoint visual (scale/visibility animated by AI).
- `e.limbs`: array for optional limb animation.
- Hit volume remains gameplay radius `e.r=2.2`; visuals alone do not change collision or damage checks.

The attack controller `rushBossAI` uses IDs and never relies on imported model names. The placeholder boss geometry/materials are shared; future GLTF animation/clips/disposal will need integration when assets arrive. PRISM uses delayed line attacks, SIEGE uses delayed ground strikes; these are lightweight gameplay approximations pending final assets.

## Verification

`npm run test:boss-rush` runs real Three.js math/geometry under the existing non-rendering game harness. It covers all ten attack controllers, random deck uniqueness, timeout/cards, stale button clicks, full ammunition, reconstruction, pause timing, spawn distance, victory/defeat, restart and easy isolation. Existing world, phase and augment regression checks are also run.

Physical iPhone testing remains unavailable. The reconstruction update now has actual Chromium/WebGL screenshots via the existing Playwright route and a Linux-font workaround; see REBUILD_REVIEW.md. These are not a hardware frame-rate guarantee.

## Ordinary sector shifts

Standard sectors 1–5 independently roll an extra reconstruction at 30–45 seconds of active combat, at most once per sector. Combat may finish earlier; no waiting is imposed. Pause, upgrade selection and EXPLOSION cinematics do not consume the schedule. The end-of-sector reconstruction remains a separate progression transition.

The extra shift uses a 2.7-second lifecycle on W1–3 and 4 seconds on W4–5, with a full ammunition refill. Every extra shift chooses from the exclusive RIFT layouts 9–16 and avoids repeating the previous RIFT destination. The current boss round remains active after reconstruction. See REBUILD_REVIEW.md. Living enemies plus the unspawned queue are counted; that exact number is redrawn from all four normal enemy types, with full health and safe spawn positions. Removed enemies grant no kills or rewards. XP from existing dropped orbs is retained automatically without granting their pickup healing. Rebuilds cannot trigger if no enemy remains. Collision, navigation, radar, floating and height checks read the constructed terrain rather than the progression wave. Easy does not enable the extra timer.

`npm run test:wave-shift` checks timing, once-only scheduling, early clears, same-wave continuation, queued enemy preservation, spawn distance/valid floor, refill, pause, restart and isolation from boss rounds and easy mode.
