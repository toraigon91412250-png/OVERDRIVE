# Sites公開経路の障害 — 2026-11-13

対象：既存OVERDRIVE、project_id `appgprj_6aeeab6986e881918288f984dee1a381`。

- 前回の公開版はSites版60／BUILD7.0。公開範囲はpublic。
- 今回の書き込み資格情報は `provider: cloudflare_artifact`、`auth_mode: codex_auth`、`branch: main` を返す。トークンは返らない。
- 返されたGit URLは `https://chatgpt.com/backend-api/codex/sites/git/appgprj_6aeeab6986e881918288f984dee1a381`。
- 同URLに通常Gitの読み取り確認を行うとHTTP400。既存remoteの旧Gitホストは資格情報なしで認証できない。
- ツール定義の明示指示：`For codex_auth the local host supplies the Sites Git credential helper.`
- executorにはそのGit credential.helper／ASKPASSがない。Sites source helper `site-workflow.mjs` も、インストール済みプラグイン・各キャッシュを対象にシンボリックリンクを辿って探したが見つからない。
- Codex CLIの公開helpにもSites Git認証用コマンドはなく、Native Sitesツールにも別のソース同期操作はない。

これはユーザーのSite権限不足だと断定できる証拠ではない。現時点で確認できたのは、接続が指定するホスト認証方式と、このexecutorで利用できる機能の不一致。

必要な修復：ホスト側Sites Gitヘルパー／認証relayをexecutorへ提供するか、それが利用できるホストで公開処理を行う。その後、返されたURLへコミットをpushし、同じコミットから作った静的archiveをsave_site_versionへ渡してdeployする。

push前のコミットを「push済み」としてsaveしたり、古いコミットIDに新しいarchiveを組み合わせたり、別の認証情報を取り出してヘッダーを推測する回避は行っていない。既存公開サイトの版・範囲も変更していない。
