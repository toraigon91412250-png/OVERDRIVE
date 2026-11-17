# Leviathan / ten-boss release

The normal finale includes all ten delivered bosses. Leviathan retains both supplied V7.3 GLBs, normalized to 22m length with a shared physical origin. At 50% HP it transitions over 0.55 seconds from blue normal materials to red awakened materials. HP, root, weakpoint, mouth socket and hit-target references stay continuous. Re-entering starts in normal form.

Its sea arena uses a waterline of 0.12m and connected decks at 0.5m. There are actual open-water gaps, broad piers and six beam shelters. Ocean swells, whitecaps and edge foam use fixed instance counts. Water cannon warnings lock their direction before impact; the normal three-ray cannon widens to five rays after awakening. Alternating tail sweeps generate a jumpable wave. Both use the supplied WaterBlast/TailSweep animations.

The source ZIP includes the entire production source, all embedded model records, tests and build scripts. SOURCE_README_JA.md explains building with npm ci and npm run build. Account hosting metadata, dependencies, Git history, generated dist and local prototypes are excluded. All game modes and model binaries can be rebuilt from the ZIP.

Checks use real geometry/animation and the game loop with a stub renderer: form switching, cache isolation, repeated attacks, sea connectivity/cover/wave budgets, physical gun hits, replay, ten-boss finale and portable ZIP rebuild. Browser/GPU rendering and manual input feel are not verified.
