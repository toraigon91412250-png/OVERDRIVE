# Playable titan motion import

Imported the motion additions from the user-supplied Opus HTML into the maintained source modules, rather than replacing the built game with a separate HTML fork.

- Walk/run leg poses, velocity-based acceleration lean, smooth turns, airborne poses, landing absorption, breathing, footfall sound and shake.
- Emergence crouch, stand-up and roar. Its pose is applied once per frame and returns before locomotion; the supplied fork overwrote this pose later in the same frame.
- During a punch, the established shoulder/body pose and face-height fist target take priority over locomotion, roar and landing. The supplied fork curled the arm at peak extension; the maintained straight must still pass its real-rig extension/contact checks.
- Gait state resets on mission reset and every transformation, including footfall phase and prior landing velocity.

Validation: existing real-rig punch tests, new transformation/gait integration checks, build and full titan regression suite. Renderer-stub checks exercise the actual geometry/math and game logic, but do not establish browser/WebGL appearance or play feel. No browser playthrough was performed in this environment.

Next priorities proposed for discussion: giant-vs-giant enemy attack selection and counter opportunities; readable defensive play; camera/distance cues; distinct enemy combat roles. These are recommendations, not implemented in this import.
