# Weapon update — 2026-11-08

Scope: meeting items 1–4. Mobile HUD item 5 is deferred; shell.html and style.css untouched. Standard balance only; easy damage, spread, ammunition, enemy stats and tutorial unchanged. Weapon art and railgun name apply to both difficulties.

## Implemented
- New procedural armory in src/armory.js: chamfered receivers, inset caged pulse cell, barrel collars and cooling fins, trigger guards, ribbed grips, magazines and serial plates. Static parts batched by material.
- Breach: bored single heavy barrel, underbarrel tube, animated ribbed pump, shell rack. One red polymer/brass shotshell per discharge. Shared casing templates avoid per-shot GPU geometry/material allocation; cases keep their size in flight.
- Railgun: separated steel rails, luminous inner conductors, sequential coil glow, exposed accelerator and removable capacitor magazine. Narrow white/cyan double tracer plus three short electromagnetic ripples; renamed RAILGUN / レールガン.
- Real model muzzle and ejection sockets. Tracers, flash and shells use weapon world transforms. Camera ray retains crosshair targeting. Recoil pose updated before reading muzzle coordinates.
- Core color tracks target in aiming cone and checks obstruction: cyan optimum, warm near, blue far, dim without target.
- Standard pulse: base 2 below 7m; ramps to 7 at 9m; 7 through 15m; quadratic falloff to zero at 27m. Range card adjusts near bound by -0.65m and far peak by +1.5m per level. Shots stop at peakEnd+12m.
- Standard shotgun: per-pellet damage 15.625 through 6m, 5 through 10m, 0.5625 farther. Knockback only inside 10m; minimum stun .42s and charger attack interruption/cooldown floor .9s.
- Standard rail: 119.6 base at <=10m, up to 179.4 by 32.75m before shared damage modifiers. Existing penetration and fork upgrade retained.
- Standard ARC LINK once per discharge, pulse proc strength .35, shotgun 1, rail 1.4. Easy behavior unchanged. Magazines normal 50/10/6 and easy 28/6/4 preserved.

## Minimum verification actually performed
- npm run build passed.
- Node constructor smoke for all 3 armory models; checked finite vertices, valid geometries and world bounds.
- Pulse: 12 mesh draws, ~1298 triangles; breach: 10 draws, ~1142 triangles; rail: 18 draws, ~1622 triangles. Only active model visible.
- Playwright ran the full 20-test suite successfully, including desktop/mobile browser interaction, all six waves, boss, upgrades, casing and weapon role checks. No physical iPhone Safari or thermal verification performed.

## Next test pass
1. Physical iPhone Safari, weapon clipping, recoil, switch and reload on jump pads.
2. Visual muzzle/tracer agreement while moving/turning; ejection port and shell shape. Inspect near-wall behavior (camera hit test remains gameplay authority).
3. Normal close/mid/far damage, range-card levels, shotgun charger interruption, boss and rail fork were exercised by automated scenarios; extend with human balance runs.
4. Easy regression against previous release: damage and ammo, tutorial, auto reload. Core cosmetic color returns on normal play.
5. Play normal full runs with each gun and a mixed loadout. Automated wave clear uses debug defeat hooks; pulse-only balance is not established by those checks.
6. Safari/iPhone actual device performance and heat, GPU resource trend. No real device verification performed this update.

Existing browser tests encoding old pulse values (4/8/4 and old band boundaries) need updates to the new design expectations, not blind fixture changes. HUD redesign remains a separate task.
