# OVERDRIVE Σ — Combat Intents / v8.2 candidate

## Status and scope

Implemented from the public v62 / v8.1 source commit `0bd7bbef1053103f48d533f801d060e9ea6b182e`. This experiment is selected only by `difficulty === 'fracture'` (Σ). Normal, easy, X and Ω retain their existing paths. Candidate Σ records use `overdrive-fracture-intents-v1` so they do not overwrite the old Σ records.

The user authorized testing and publication for this build. No subagents were used. A passing automated check does not establish subjective fun, real-device performance or cross-browser rendering.

## Design decision

Previously the terrain, mission and enemy composition were independently selected. This candidate selects a combat intention first, then generates the floor, cover, objective anchors, enemy composition, spawn lanes and useful stage props from that same recipe.

Four recipes occur once per shuffled block of four. The boundary between blocks cannot repeat the previous recipe. Each recipe has three variants, quarter-turn rotation, mirroring and tile pitch of 3.8 / 4.0 / 4.2 metres. This is constrained procedural construction, not unrestricted random tiles.

| Recipe | Geometry / action | Objective | Opening roster of six | Props |
| --- | --- | --- | --- | --- |
| 破砕突破 / BREACHWORKS | Three alternating gates through linked chambers, with open side bypasses. Breaking a gate opens a direct lane for the player **and enemies**. | Destroy three 46-HP devices behind the gates. Gates retain 72 HP. | Four chargers, one chaser, one shooter. Shooter arrives last. | No additional interactable. |
| 双塔制圧 / SWITCHBACK | Two stepped terraces connected by two bridges, with a central entry spine. Choose a bridge and draw pursuit away from the next control point. | Hold each of two points for 1.25 seconds, in order. | One charger, four chasers, one shooter. Shooter arrives last. | Existing lifts placed on the terraces; not required to reach the objective. |
| 追跡走破 / RUNLINE | Wide rectangular circuit around a void; width/depth variants. Short floor inlays show the ordered route; gates face their approach. | Pass three ordered gates. | One charger and five chasers. No shooter. | Existing four acceleration decks placed along the straights. |
| 標的狩り / CROSSFANG | Compact flanking arena, low central rise and short baffles to break a charge line. | Eliminate one marked chaser and one marked charger on opposite flanks. | Three chargers / three chasers as the reinforcement recipe; marked actors count toward the population cap. | No additional interactable. |

Three-unit refills contain melee enemies only and follow each recipe's chaser/charger ratio. The six-unit table describes the initial queue, not an extra six enemies on top of hunt targets. Hunt immediately creates or reuses two marked actors; the live cap controls subsequent queue arrivals.

## Preserved rules

- 20 seconds of active combat per world; reconstruction remains 1.55 seconds, with the existing skip option.
- Five successful objectives summon the existing Warden. Four missed objectives or zero HP ends the run.
- Every reconstruction changes the equipped weapon automatically. One Q/touch reroll per world. E/touch extraction after success.
- Existing guns, cards, damage values, projectile patterns, rewards, kinetic arm and destructible-cover HP.
- At most six live non-objective enemies, or four including the boss. At most one ordinary ranged enemy; no strafers. The existing Σ boss fan remains three shots.
- No extra ranged sources were added to feed the kinetic arm. It is optional, and has no ammunition source during melee-only worlds.

## Reconstruction / placement implementation

- `src/fracture-intents.js`: seeded director, four floor recipes, connected navigation, authored targets, prop hints, lane inlays and intent-specific reinforcement composition.
- `src/game.js`: Σ-only generation branch, mission selection from the built layout, objective positions, hunt assignment, population composition and safe spawning, compact mission copy, separate candidate records.
- `src/omega-raid.js`: optional mission-kind argument. The omitted-argument Ω path retains its previous selection behavior.
- `src/world-rebuild.js`: delegates spawning to the custom layout, exposes intent metadata in the existing snapshot, and draws route inlays with the existing edge instance buffer.
- `src/stage-gimmicks.js`: places existing props at the recipe's coordinates; restores original prop coordinates when leaving a Σ layout.
- `src/omega-raid-visuals.js`: accepts optional gate yaw. Existing targets without yaw keep their former orientation.

Enemy placement enforces a 10-metre player exclusion before preferred spawn zones and spacing. Reinforcements try to remain more than 3.5 metres from living actors and avoid objective centers. If no safe point exists, the reinforcement is deferred instead of spawning next to the player. Preferred lanes and spacing can relax; the player exclusion does not.

Surviving melee/ranged actors are reassigned to the next recipe's composition. Same-type models are reused; a changed type keeps the previous remaining-health fraction. This grants no kills, XP or score. Initial attacks receive at least a 1.2-second cooldown. Warden HP is preserved through reconstruction and it receives a dedicated safe floor position. Hunt actors are reused where possible and do not exceed the live cap.

Navigation is refreshed when a wall breaks. Recipe height steps are at most 0.5 metres, below the current 0.66-metre walking limit. Each recipe has authored foot routes; no particular weapon or mandatory jump is required by construction. Those statements describe the implementation, **not results of runtime tests**.

The renderer reuses the existing tile/wall/skyline buffers and stage-prop models. No new projectile system, full-screen effect, new overlay, button or enemy model was added. Procedural floor budgets remain bounded by the existing 441-tile and 16-wall buffers; these recipes use substantially fewer elements. Route inlays reuse edge instances.

## Automated checks completed

`npm run build` succeeds. The non-browser suites `test:fracture`, `test:omega`, `test:world`, `test:weapon-parity`, `test:x`, `test:arsenal`, `test:boss-rush`, `test:wave-shift`, `test:seeker`, `test:phase`, `test:augments`, `test:phantom-lance`, `test:explosion`, `test:enemy-visuals`, `test:training` and `test:pulse` passed. The new `tests/fracture-intents.cjs` additionally checks 640 deterministic arena builds, route connectivity, objectives/props on walkable floor, 10m spawn exclusion, enemy caps/compositions, four actual game-start mission/layout pairings, and marked hunt actors.

Browser/visual testing was not run. This managed Sites environment did not provide the required CUA browser tool, so no preview server or alternate browser path was started. No real iPhone/PC run, frame-rate measurement or subjective playtesting was performed. Automated grid reachability also does not prove that a player under fire can finish each task within 20 seconds.

Human play should focus on the 20-second timer margin with slow-reloading weapons, relay traversal on the ramps, acceleration-deck steering near corners, wall destruction and enemy pathfinding through opened gates, boss carryover, and mode switching after Sigma to ensure stage props restore correctly. The four recipes intentionally provide structured variety rather than a unique map every run. The kinetic arm is situational in melee-only worlds.

## Deliverables / rebuilding

`artifacts/OVERDRIVE-v8.2-SIGMA-INTENTS.html` is a standalone offline HTML build. Select **Σ** on the title screen. `artifacts/OVERDRIVE-v8.2-SIGMA-INTENTS-source.zip` contains the source, dependency lockfile, build configuration, existing tests and documentation. Rebuild with `npm ci` followed by `npm run build`; the output is `dist/OVERDRIVE.html` / `dist/index.html`.

The user requested this build be published to the existing public OVERDRIVE Site. Preserve the Site audience; do not create another Site.
