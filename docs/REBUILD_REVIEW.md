# RING SHIFT destinations: implementation and visual review

## Delivered

Every mid-wave and boss-round RING SHIFT now selects from eight dedicated RIFT arenas (layouts 9–16), rather than reusing the familiar campaign stages. Consecutive shifts cannot select the same layout. The original eight campaign arenas remain available for their existing progression and opening cinematic.

Each RIFT changes both the route geometry and the way a player uses it: three crossings between split lanes, a low circular basin within a raised shelf, four satellite plazas on narrow bridges, intersecting catwalks, a three-pronged firing fork, a climbing switchback, a raised diagonal sightline-breaking ridge, or three height-separated terraces linked by alternating stairs. Their palettes, skyline shapes, and ring monuments reinforce those identities without adding combat clutter.

The diagonal ridge (RIFT 07) now reaches 4.55 m and begins in view from a low-side entry 22.6 m from its crest. Adjacent tiles differ by at most 0.65 m, so the stronger silhouette remains traversable. RIFT 08 starts on the south terrace facing the descending stair route toward the middle level. All RIFT layouts keep their connected movement/spawn floor and remain within the 441-tile and 16-wall limits.

The opening reconstruction and the dramatic W4/W5 shifts last 4 seconds. Earlier mid-wave shifts and boss transitions stay at 2.7 seconds. Boss rounds use the RIFT pool too.

## Map concepts

- **RIFT 01 / 二界峡谷** — two firing lanes separated by a void; exactly three one-cell crossings connect them.
- **RIFT 02 / 重力盆地** — a circular low basin ringed by an elevated outer shelf.
- **RIFT 03 / 破片の庭** — a hub and four detached plazas connected by one-cell catwalks.
- **RIFT 04 / 交差格子** — intersecting catwalks repeatedly open and break long sightlines.
- **RIFT 05 / 三叉砲列** — a broad landing terrace branches into three narrow firing lanes.
- **RIFT 06 / 折返し階段** — an ascending switchback with alternating turns and landings.
- **RIFT 07 / 斜光断面** — a raised diagonal crest breaks sightlines across a diamond platform.
- **RIFT 08 / 三段断層** — three separated height levels joined by narrow stairs on alternating sides.

## Critic review and changes

The independent critic reviewed the final generated PC and mobile images, not just source descriptions. The redesign went through three visual-review cycles:

1. The first RIFT capture showed that the close pylon obscured RIFT 07's ridge, RIFT 08's broad middle terrace hid its stairs, and a mobile RIFT 02 capture still showed a reward overlay. We removed the entry-side pylon, moved the RIFT 08 start to the south stair approach, and changed the capture harness to hide and assert overlays only after frame updates.
2. The critic found that RIFT 07's 2.6 m crest was too far away and barely broke the horizon. We moved its entry from [-28,-28] to [-16,-16], increased the crest to 4.55 m, kept the per-tile rise at 0.65 m, and added regression checks for entry height, crest height, and distance.
3. The critic's final review passed: all eight RIFT concepts read in both PC and mobile views, differ from campaign layouts 1–8, RIFT 07's crest is clearly visible and blocks sightlines, RIFT 08's stair route is legible, and the mobile RIFT 02 capture shows terrain unobstructed.

The screenshot harness also synchronizes the test player's and rendered camera's position, height, and facing before capturing. It records those poses and asserts that they match each layout's authored entry; this prevents stale-camera screenshots from being mistaken for real stage geometry.

## Verification and limits

- `npm run build` regenerates the standalone HTML bundle.
- `npm test`: 20 browser tests cover desktop and touch play, movement, firing/reload, rewards, difficulty, weapons, tutorial, and reconstruction behavior.
- `node tests/stage-layouts.cjs`: all 15 layouts stay connected; RIFT 07's entry and crest remain within the reviewed silhouette requirements; existing stage gimmicks and navigation pass.
- `node tests/wave-shift.cjs`, `node tests/boss-rush.cjs`, and `node tests/world-rebuild.cjs`: schedule, safe transitions/spawns, reload, pause, boss progression, and campaign regressions pass.
- `node tests/rebuild-visual-review.cjs --boss-only`: PC 1280×720 and mobile emulation 844×390 Chromium/WebGL captures for the boss transition and all eight RIFT layouts. Checks include page errors, camera-to-entry match, layout geometry, overlay visibility, and horizontal overflow. Current images and numeric camera reports are in `artifacts/rebuild-review/`.
- This verifies Chromium desktop and mobile emulation, not physical iPhone Safari or hardware frame rate. The Linux Fontconfig workaround is scoped to the QA browser and does not change game fonts.

Boss models remain the previously agreed colored-block placeholders.
