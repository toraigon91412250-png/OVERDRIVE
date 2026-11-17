# Wave-specific stage mechanics — v5.9

Each arena now has one mechanic that changes how the player moves or chooses a target. The original stage layouts and reconstruction sequence remain in place. Only the current wave's mechanic models are visible. Normal and easy use the same mechanics; the update does not change weapon statistics, enemy health, damage, or counts.

| Wave | Mechanic and model | Player use |
|---|---|---|
| 1 — Startup | Five layered launch pads with ramps, rails, and luminous arrows. | Step on a pad to launch upward. These pads are exclusive to Wave 1. |
| 2 — Blue Corridor | Four machined acceleration decks with a raised four-way compass, luminous rails, inset channels, bolts, and spinning rotors. Repeated hardware uses instanced meshes. | Cross a plate while grounded. It accelerates in the current movement direction (or facing direction when idle) for 0.82 seconds, reaching 23 m/s before the player's movement multiplier. Each plate has a 2.3-second cooldown. Steering remains available, and the effect ends at the wave boundary. |
| 3 — Sky Garden | Five floating gyroscope beacons with plinths, struts, faceted cores, and rotating hoops. | Hold Space or the mobile JUMP button in midair for up to 1.8 seconds. Gravity drops from 24 to 5.2 m/s², fall speed is limited, and ascent is capped 5.5 m above the current island. Landing restores the float charge. |
| 4 — Terrace Keep | Two layered hydraulic platforms with pistons, segmented collars, and instanced bolts and support piers. | Board one while it is low. Each lift follows a 7.2-second cycle: 1.65 seconds rising, 1.5 seconds at the top, 1.65 seconds lowering, then a 2.4-second low hold. The deck travels 3.1 m and carries a player standing on it. |
| 5 — Fault Crossing | Two violet relay towers with fins, dishes, halos, and shootable crystal cores. | Shoot a visible core. It marks and briefly stuns the nearest non-boss enemy within 34 m, exposing it for 3.4 seconds and increasing damage taken by 35%. Each relay has an 8.5-second cooldown. |
| 6 — Crown Terminus | Three gold ring anchors on the perimeter ring, with a faceted core and broken orbital arcs. One anchor is active at a time. | Shoot the active anchor while WARDEN is alive to expose its core for 4.6 seconds and keep its next attack at least 1.1 seconds away. Anchors rotate in sequence with an 8-second recharge. |

Hitscan weapons and the ASTRA beam can activate the relay and anchor cores. The cores are actual raycastable scene objects, so walls and other arena surfaces still block shots. Explosives and seeker lock-on do not directly acquire these stage targets.

## Implementation and verification

- `src/stage-gimmicks.js` builds the 3D set pieces from shared low-poly materials and geometry. Repeated deck hardware is instanced to keep the Wave 2 and Wave 4 model budgets bounded.
- `src/world-rebuild.js` switches stage groups with the world reconstruction and keeps launch pads on Wave 1 only. The stage models resample their floor elevation when a wave is selected, so their bases align with raised terrain.
- `src/game.js` integrates directional boost, held-jump float, lift collision/carrying, ray-triggered target cores, enemy exposure damage, and input cleanup at wave transitions.
- `src/stage-layouts.js` gives the player a short in-game rule for each mechanic.
- The headless stage test covers pad launch, directional boost and its wave boundary, float control and landing, lift carrying, relay ray hits and bonus damage, active-anchor timing, boss exposure, and stage-only visibility.
- The active stage groups contain 20–52 mesh/instanced-mesh drawables (52 on Wave 2); inactive stage groups are hidden. Shootable crystal cores are separate raycast targets.

The following passed: `npm run build`, `npm run test:world`, phase, PHANTOM LANCE, EXPLOSION, enemy visuals, SEEKER, weapon training, weapon parity, and pulse evolution/effects checks. The enemy visual test fixture was adjusted to declare its starting wave so its isolated spawn test matches the current game function's scope.

Playwright's 20 browser tests could not run to assertions in this workspace: Chromium reported `Page crashed` during navigation before the game loaded. The same crash occurred with the pre-change game entrypoint, while a script-free page loaded. Treat browser-rendered visuals and performance as unverified here. No iPhone Safari hardware test was performed.
