# Raid gameplay fixes after play feedback

The user's play feedback identified gaps that the previous technical score did not establish. This change is driven by those concrete problems; no new numerical quality claim is made.

## Spear presentation

First-person spear models start hidden, remain hidden during idle and reload, and only the firing side appears for 0.2 seconds after an accepted shot. The held prop is smaller and lower. Reset and mission end hide it immediately. Projectile models remain visible in flight.

## Enemy attacks

The Attack Titan's actual shoulder groups are Pivot_096/Pivot_120; the previous selection also rotated leg pivots as arms. Arms and hips are now mapped separately. Windup, swing and recovery interpolate the correct groups. Damage from sweeps uses the moving hand socket trajectory against the player's body, and jaw damage uses the animated jaw. A contact can deal damage once per attack; proximity alone never deals melee damage. Buildings can block limb contact.

Ground attacks are foot-centered stomps with a short low shockwave, rather than a large unanimated circle. The foot is raised during the warning, and the ground marker follows the foot. The Colossal's steam uses a persistent light cloud volume and an 18m area with warning and recovery; the old repeated explosion effects are removed. Melee reach and height gates follow the smaller physical attack areas. Titans approach slowly in their facing direction and stop at buildings; walking animation runs only when a move succeeds.

## World collision

Visible city wall pieces had been registered only as hook targets, leaving no player collider. All 84 outer segments and corner towers now have solid player collision. The inner city boundary was also 5m inside the visible inner face; the wall now stops the player at its rendered inner face (~543.57m including player radius), has a walkable 82m top, and can be flown over. Forest/wall-course walls and old corner towers have collision only while visible. Trunks use tapered circular collision, four bridges have platform collision, and elevated pieces such as the clock room have solid undersides. No normal-flight speed values changed.

## Gameplay focus

Transformation UI and its embedded runtime are removed from game loading; its original supplied source remains archived in assets. The four titan models, ODM equipment, blades, spears, combat, results and loadout selection remain in the playable raid. Actions are blocked while paused or after a mission ends.

## Verification

- `node build.mjs`
- `npm run test:titan`
- `node tests/titan-models.cjs dist/ODM_TITAN_RAID.html`

New checks exercise hidden/shot/reload spear states, real imported arm groups and hand contact, a player outside the actual hand path, blocked contact, all four city wall directions, landing on walls, flight above walls, corner towers, route-specific walls, trunks, bridges, the clock room underside, and an ammo-empty imported armored fight through to a blade kill.

These are execution tests using real Three.js geometry and the full simulation with a stub renderer. Browser/WebGL appearance, frame pacing and a human playthrough are not verified by these tests.
