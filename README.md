# OVERDRIVE

ブラウザ向け3Dアクションゲーム「OVERDRIVE」の開発リポジトリ。

## ソースコードの取り込み

1. GitHubの **Add file → Upload files** を選ぶ。
2. **OVERDRIVE_SWIM_FIXED_ALL_SOURCE.zip** をリポジトリ直下にアップロードする（ZIPを解凍せずに選ぶ）。
3. **Commit changes** で保存する。
4. GitHub Actions の **Import OVERDRIVE source ZIP** が成功すると、ZIPの `OVERDRIVE_SOURCE/` 以下がリポジトリ直下に展開され、元のZIPは削除される。

※ Actions が無効、または書き込みを許可されていない場合は、ZIPはそのまま残る。Actions の実行結果を確認すること。

## 開発

ソース展開後は `package.json` や `SOURCE_README_JA.md`、`README.md` の手順を参照する。

公開リポジトリではアップロードしたコードや素材を誰でも閲覧できるため、認証情報などは含めないこと。
