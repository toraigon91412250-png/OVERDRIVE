# OVERDRIVE 全ソース

このZIPには通常モード、かんたん、X、Ω、Σ、進撃モードのソース、モデル素材、テスト、ビルドスクリプトが含まれます。

## 開発・起動

Node.js 22以上とnpmを用意してください。

```sh
npm ci
npm run build
npm run serve
```

ブラウザで `http://localhost:8080` を開いてください。`dist/OVERDRIVE.html` は全モードを含む単体HTMLです。`dist/index.html` は公開サイト用で、同じdist内のgame.bundle.jsなどと一緒に配信します。

## 主な場所

- `src/game.js`: 本編の操作、戦闘、進行
- `src/boss-models.js`, `src/boss-rush.js`: 10体のモデル、アニメ、ボス戦
- `src/boss-arenas.js`, `src/boss-arena-scenery.js`: 専用ステージ・海
- `src/titan/`: 進撃モード全体
- `assets/`: 全モデルと素材。GLBはJSON中にbase64（ボスはgzip+base64）で完全に内蔵されています。
- `tests/`: 実行可能な動作チェック
- `build.mjs`, `scripts/`: 単体HTMLと公開用データの生成

`node_modules`、Git履歴、アカウント固有の配信設定、生成済みdistは含めていません。必要な配信用ファイルはnpm run buildですべて再生成できます。モデルJSONには元GLBのバイナリが含まれているため、ソースから欠けているモデルはありません。
