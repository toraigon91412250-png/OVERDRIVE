# Titan duel update

## Play

T enters/exits titan form. Left click punches; the hands alternate. Hold right click to guard the front, release to attack. A guard raised within 0.25 seconds of a frontal melee impact earns a 0.9 second counter window; the next swing consumes it. Guarding slows movement, consumes stamina, and can break. Back attacks, steam and stomps bypass the guard. Input clears on mouse release, blur, settings pause, reset and form changes.

## Combat and readability

Normal and armored enemies throw chest-height punches at a transformed player, using the visible hand's actual swept contact. The armored punch is heavier and slower. The jaw physically lunges, then exposes a longer recovery. The colossal warns before an unblockable steam field. Ordinary hit stagger has a resistance interval so repeated punches cannot indefinitely freeze a surviving enemy; a counter can break through that resistance.

A nearby forward opponent adjusts shoulder-camera distance and field of view while manual yaw remains authoritative. World geometry clips the camera. The reach cue uses cached actual fist trajectories and each enemy's real collision volumes, including cover checks, rather than an arbitrary 14m cutoff. The next swing's hand is used for the cue. A nearby small jaw selects a low downward strike; its direction and contact still follow the player's input and fist geometry.

Normal enemies take ordinary punch damage. Armored fronts resist unearned punches; flanks and recovery are more vulnerable, and a counter breaks one plate explicitly. Jaw recovery/counter hits do extra damage. Colossal punch damage cannot remove its last health point: human-form nape combat finishes it. Existing blade/missile armor routes remain available.

## Verification

Real supplied GLB rigs and game-loop integration tests cover frontal defense, back/area bypass, resource costs, timed counter input/contact, 90-damage normal counter, low jaw contact, once-per-swing damage, enemy retaliation during repeated punches, camera cover/turn/reset, and human wire parity. Existing titan regression suite is run after the build. These renderer-stub/geometry checks do not establish browser/WebGL appearance or subjective play feel. Browser playthrough was not performed.
