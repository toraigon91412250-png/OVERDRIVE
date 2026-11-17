# ASTRA × VANTA | HYBRID PHASE WEAPON (v1)

2作品を統合した架空のSF武器3Dビューワー。Three.jsの3D形状はJavaScriptで生成。

## 合体した要素
- Cyberblade: 刀身・装甲・2翼の変形、発光、4つの形態、回転する反応炉、操作しやすいHUD。
- Astral Phase Rifle: 透明な星雲エネルギーチャンバー、螺旋パーティクル、通常／チャージ切替、光弾・螺旋ビーム・反動演出。
- 新しい機構: 刀身自体が90度回転し、銃装甲・光学パーツ・チャンバーが段階的に展開する単体ハイブリッド。別々の武器を表示切替するだけではない。

## 操作
1～4: 4形態切替 / Space: 光弾またはエネルギー放出 / C: チャージ切替 / R: 視点リセット。
ドラッグ・スワイプで視点回転、ピンチで拡大縮小。スマホ画面下のボタンでも操作可能。

## 実行
ASTRA_VANTA_HYBRID_v1.htmlを対応ブラウザで開く。
Three.jsは外部CDNから読み込むため、インターネット接続が必要。
シミュレーション／演出用の架空SF武器デモ。実射撃・物理モデルは含まれません。

## テストに関して
構文チェックと静的コード検査は実行します。実機SafariおよびWebGL描画は別途確認してください。

OVERDRIVE integration: src/phase-weapon.js adapts this user-provided geometry for first-person combat. Original files are preserved here for provenance; no additional asset license is asserted.
