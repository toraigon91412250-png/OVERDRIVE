# Nine supplied bosses in the normal campaign (v108 historical notes)

The current ten-boss release is described in LEVIATHAN_UPDATE.md.

The normal campaign finale now draws only the nine delivered GLBs: WARDEN, RAM, SIEGE, PHOENIX, BULWARK, TEMPEST, GRAVITY, MIRROR and DEVOURER. Deck shuffling and exhaustion use its actual length. Five wins or five misses still decide the run; a 4–4 run resolves on encounter nine. The undelivered Leviathan cannot be selected.

Original rigid-node hierarchies, colors and authored clips are retained. BULWARK carries the supplied lab's rock/moss material correction. Models are normalized separately for ground height or flying span. Attacks have a committed warning, action and recovery; RAM locks its dash direction and deals at most one hit per dash. BULWARK's GroundSlam timeline places its visible fist landing at the shockwave event. Repeated attack entry restarts TEMPEST even without a supplied idle or warning clip.

Each available boss selects a connected arena with usable cover, a clear spawn and an appropriate backdrop: weapon hangar, charge runway, siege base, optical laboratory, ancient quarry, fiery ring, gravity observation ring, storm crown or obsidian dragon courtyard. The normal finale hides the former campaign stage-six gimmicks. Other campaign stages and modes use their established layouts.

Imported body triangles are used by direct and evolved gunfire, phase shots and seeker missiles. Empty gaps between legs and wings miss. Weakpoint targeting, the target HUD and seeker locks follow the moving imported body/core. Cover still blocks attacks. Normal enemies keep their established sphere rules.

The nine GLBs are gzip/base64 embedded in individual assets/bosses/*.json records, indexed by models.json for offline use. The hosted menu references a versioned game.bundle.js, keeping its HTML compact; departure is disabled with a loading label until initialization. Downloadable OVERDRIVE.html remains self-contained.

Checks: all nine actual models and repeated articulated attacks; geometry/weakpoint hits and cover; matching arena connectivity, collision and spawn; complete five-win/five-miss and ninth-round outcomes; ammunition refill, pause, replay and menu cleanup; ordinary/easy weapon parity; phase/seeker; world rebuilding and stage gimmick isolation. These use real Three.js math, meshes and animation with a stub renderer. Browser input feel and GPU rendering/performance were not manually verified.

Large generated standalone/game bundles are kept out of source Git and included in the matching deployment archive. npm run build regenerates them from the committed source and embedded records.

The downloadable HTML now embeds its full document as gzip/base64 and unpacks in place using the same browser gzip support as the supplied models. Its 19.7 MB file fits the 25 MiB hosting limit. tests/standalone-package.cjs executes the unpacker, verifies exact document integrity and checks every published file against that limit.
