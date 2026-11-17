# CHRONARCH — X's final time vault

The final X encounter now has an authored boss and a visible target-selection loop: break the two gold hourglass seals, shoot the open magenta core, then break the next pair. There are three phases and exactly six seals, with no timed rearming or repeatable seal farming.

The original 1700 core HP is retained. The controller clamps outgoing damage at 1133⅓,566⅔ and 0 HP; excess damage is discarded at each gate. New seals spawn only after 0.65 real seconds in a later update. A direct hit plus its blast cannot clear all phases in a single attack. The renderer's HP is assigned from the controller, avoiding a floating-point sliver that could otherwise leave an unkillable final core.

Each seal has 90 HP and a 0.85 m hit radius. They are real targets for all existing hitscan/phase/missile systems, orbit 5.2 m from the boss, and use their actual updated positions for aiming. Knockback cannot move them away. A valid seal death gives 4 base seconds and 18 BREAK charge once, with the normal combo rule still applicable. The carrier law does not add a seal bonus. BREAK countershots skip the invulnerable core and can one-shot a visible seal.

The final arena is RIFT 02's basin. Vault 5 excludes this layout, so the final reconstruction does not repeat the preceding map. The player enters facing the boss 16 m ahead; the boss/seal orbit clears the northern wall. Entry guarantees at least 35 seconds. Two escorts remain, and victory requires all survivors to be cleared.

| Phase | Attack | Cadence |
| --- | --- | --- |
| 1 | Five reflectable aimed bolts, speed 11 | Every 2.6 enemy seconds |
| 2 | Two 3 m ground marks;0.9 enemy-second tell;20 HP hit | Every 3.1 enemy seconds |
| 3 | Seven reflectable bolts, speed 13, alternating with a ray-blocked laser;0.9-second tell;22 HP hit | Every 2.4 enemy seconds |

The first attack in a phase starts after 1.2 enemy seconds. BREAK slows attack timers, projectiles, and hazards to 18%; phase reconstruction uses real time and pauses with the game. Clearing a core phase removes the old attack field so the next pattern starts cleanly.

The model is an angular clock machine: eight opening armor petals, ivory clock hands, three gyroscopes,48 instanced clock indices, a split hourglass core and a tapered suspended anchor. Closed armor uses a dim violet core, exposed armor a bright magenta core. The boss uses 16 draws/4144 triangles, or 17/4464 during impact feedback; each seal uses 5 draws/688 triangles. Shared assets and reset methods keep repeated runs consistent. An actual-geometry software projection is saved as `docs/images/chronarch-model-preview.png`; it is an asset preview, not a game screenshot.

Verification: `npm run test:x` covers the base X mode and the new controller/integration. The new tests check shield blocking, every phase gate, duplicate/stale seal identities, exact-zero defeat, six seal rewards, delayed phase spawning, timer minimum, BREAK timing,20/22 HP attack hits, real pulse/shotgun/seeker targeting, reflection priority, no displacement, campaign/cinematic consistency, win cleanup and restart/home isolation. Normal weapon and normal boss-rush regression tests also pass.

Additional real-shooting/movement bot runs using pulse, shotgun, phase and seeker all defeated six seals and the boss without resource/position/damage overrides after final-vault navigation setup. These accurate bots cleared the fight in about 7–12 seconds, sometimes before the later attacks fired. This verifies functional combat, not human difficulty. Attack behavior was separately held and tested across all phases.

No browser-control tool is available in the current managed Sites session. Browser rendering, real touch ergonomics and physical iPhone Safari remain unverified for this change. Model geometry/animation/reset checks, offline silhouette inspection, CSS parsing, inline HTML packaging and actual gameplay logic were verified.
