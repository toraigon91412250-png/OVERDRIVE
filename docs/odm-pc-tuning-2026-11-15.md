# ODM PC flight and district update

- Removed movement narration, duplicate guides, airtime display, duplicate boss HP, and the persistent flight trail. Combat target, armor, vitals, ammo, gas and anchor distance remain.
- Default maximum is now 60 m/s; normal tether movement is capped separately. Gas acceleration is 32 m/s² with only 2 m/s² fixed upward assistance. The low-altitude automatic takeoff and Space recovery remain.
- Replaced post-integration rope position snapping with velocity constraints. Winding speed, neutral approach speed and equipment weight penalty were reduced together.
- Close hooks have a 0.22 s attachment grace period and a release radius scaled to their initial distance. Long hooks retain the 5 m automatic cutoff. Unlocked right-click does not fire.
- Added 22 stone houses with tiled gables around an open combat plaza and paved avenue. Kept the expanded map and clock tower. Roofs have slope collision; tower overhangs no longer create floor-to-roof invisible columns.
- Third-person camera checks both its ideal boom and interpolated position against occluders. Gas exhaust is short-lived, gas no longer flashes the screen and camera roll/FOV expansion are reduced.

## Evidence

`tests/odm-runtime.cjs`, `tests/odm-flight.cjs`, `tests/odm-armor.cjs` and `tests/odm-pc-tuning.cjs` execute the bundled script using real Three.js geometry/math and a stub renderer. They cover startup, controls, automatic takeoff, sustained flight, retained momentum, two-wire steering, close-anchor release, reduced gas, bounded displacement, roof landing, district overlap, clock-room clearance, third-person boom occlusion, pointer-lock gating and existing blade/thunder combat.

The same clock-tower approach measured approximately 101.8 m/s before and 38.7 m/s after this update; a one-second gas input measured approximately 81.4 m/s before and 34.4 m/s after. These are scripted scenarios, not guarantees for every route. Frame-sampled displacement is also checked so cable corrections cannot hide excessive travel behind the speed readout.

The managed browser entrypoint was unavailable. WebGL pixel output and human play feel have not been verified. No claim of visual or real-device play testing is made.

## Startup hotfix

Removed a stale update to the deleted duplicate `#score` HUD. The runtime harness now returns null for missing DOM elements instead of inventing them. This reproduced the reported startup failure before the fix and exercises the actual start-button event and frame progression after the fix.
