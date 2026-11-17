# X / TIME HEIST

Difficulty X is a separate six-vault combat mode, selected from the title screen. Easy and normal retain their existing campaign, weapons, progression, controls and records. X records use the separate local-storage key `overdrive-x-v1`.

## The loop

The reactor starts at 42 seconds and caps at 60. Active combat drains one second per real second, including the EXPLOSION cinematic. A regular kill steals 1.2 seconds and 18 BREAK charge; a gold-clock carrier steals 6 seconds and 32 charge. Every fourth eligible spawn may be a carrier, with at most one live carrier. The mark does not transfer immediately on death. Reaching the next vault adds 5 seconds. Damage also costs 0.13 seconds per HP actually hit, capped at 6 seconds per hit. Zero HP or zero time ends the run.

Every kill restores 4 HP (carrier: 10 HP), in addition to existing pickup effects. Five or more kills within successive 3.5-second windows add 0.6 seconds per kill. Cards, pause, and reconstruction freeze the clock.

All six weapons start at core evolution. One random weapon and route starts at its final evolution and becomes the initial weapon, so a new run changes the starting combat style. X adds 25 maximum HP, 10% movement speed, a double jump, and a 1.25-second base dash cooldown. Base outgoing damage is ×1.15. Ordinary AI time is ×1.12.

The first five vaults use random dedicated RIFT maps without consecutive repetition. Vault 5 reserves the basin for the authored final encounter in vault 6. The opening five vaults deploy 10, 13, 16, 19 and 22 enemies with at most eight alive at once. The final vault now contains CHRONARCH and two escorts in the basin. Its core retains1700HP, divided into three gates. Destroy two 90 HP time seals to open the core in each phase; each seal returns4base seconds and 18 BREAK charge once, without the carrier-law bonus. New seals appear after a0.65real-second transition, so one high-damage hit cannot skip every phase. Final entry guarantees at least 35 seconds. Clear CHRONARCH and the escorts to escape. The original normal-mode boss rush is unchanged. See CHRONARCH.md for attacks and validation.

## BREAK

At 100 charge, Q or the touch BREAK button activates a four-second window. Player movement, aim, fire, reload, player missiles, and the reactor keep real time. Enemy AI, hostile bullets, and hazards run at 18% speed. Outgoing damage becomes ×1.4 and all weapons reload on activation. Kills earn half BREAK charge while it is active, and activation cannot re-enter an active BREAK.

During BREAK, dashing within 2.6 m of a hostile bullet converts it into a 95-base-damage countershot at the nearest visible enemy within 40 m. Each dash converts at most three bullets. Existing geometry still blocks the shot.

## Reality laws

Vaults 1, 3 and 5 offer three random unowned laws. A run installs three of the six, leaving room for different combinations. Level rewards and vaults 2/4 retain the existing evolution/augment cards.

| Law | Effect |
| --- | --- |
| 撃破爆縮 | Kills damage visible enemies within 7 m for 45 base damage. Secondary implosion kills do not create another implosion. |
| 衝撃ダッシュ | Starting a dash deals 70 base damage to visible enemies within 6 m and knocks ordinary survivors back. |
| 空中処刑 | Airborne outgoing damage ×1.6. |
| 強奪装填 | Switching weapons refills 40% of the selected magazine and grants ×1.35 damage for 2 seconds; 2.5-second cooldown. |
| 時間拡張 | BREAK +1.5 seconds; BREAK kills add 0.2 seconds each, capped at another 1.2 seconds per activation. |
| 指名手配 | Carrier kills gain another 3 seconds and 10 charge. |

The X-specific damage modifiers stack. A kill is credited once even when ARC LINK or other secondary damage recursively resolves the same enemy.

## Presentation and limits

X has a magenta/ivory/gold menu, compact reactor clock, charge button, law cards with separate vector motifs, brief nonblocking vault announcements, and gold world-space carrier crowns. Clock fractures, time shards, dash arcs and the BREAK field share three instanced draw objects with a fixed 24-event pool. The low-quality and reduced-motion paths remain bounded.

The implementation was checked using the real game logic and Three.js math in `tests/headless-runtime.cjs`, not a simulated replacement combat system. `npm run test:x` covers the director and integration. Regression checks cover normal weapon compatibility, easy weapon rules/training, boss rush, wave shifts, world rebuilding and layout navigation. Additional actual-shooting/path-following bots completed all six vaults across pulse, rail, sniper, phase and seeker signatures without time/HP/ammo/position overrides. These accurate bots demonstrate functional progression; they do not establish human difficulty or fun.

The current managed Sites environment has no callable `cua_repl` browser tool. Accordingly this update's browser screenshots, touch ergonomics, WebGL visuals and physical iPhone Safari were not verified. CSS parsing, standalone HTML IDs/script order, bundle generation, effect-pool bounds, and gameplay logic were checked. User playtesting is needed for the final timer pressure and real-device presentation.
