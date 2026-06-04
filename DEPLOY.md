# PINECRAFT を外のスマホで遊ぶための公開手順

`127.0.0.1` は開発PC自身だけを指すため、外出先のスマホからは開けません。
外で遊ぶには、`npm run build` で作った `dist/` を HTTPS 対応の静的ホスティングへ置きます。

## いま実装済みの外出先対応

- 画面操作: スマホ用の仮想スティック、視点ドラッグ、攻撃/設置/ジャンプ/ダッシュボタン
- 表示: 横持ち、セーフエリア、フルスクリーン PWA
- 保存: PC/スマホ間で JSON 保存データを Export / Import
- 配信: ルート配信と `/repo-name/` のようなサブパス配信の両対応
- オフライン補助: Service Worker による基本ファイルのキャッシュ

## 推奨構成

- Hosting: Cloudflare Pages / Netlify / Vercel / GitHub Pages など
- Build command: `npm run build`
- Publish directory: `dist`
- Required: HTTPS

`public/_headers` に COOP/COEP と service worker 用ヘッダを入れてあります。
Cloudflare Pages と Netlify はこのファイルをそのまま読めます。

## GitHub Pages で公開する場合

`.github/workflows/deploy-pages.yml` を追加済みです。
GitHub に push したあと、リポジトリの Pages 設定で Source を `GitHub Actions` にすると、`main` ブランチ更新時に自動で `dist/` が公開されます。

公開後のURL例:

```text
https://<github-user>.github.io/<repository-name>/
```

この構成でも manifest / icon / Service Worker はサブパス基準で解決されます。

## Cloudflare Pages / Netlify / Vercel の場合

管理画面で次のように設定します。

```text
Build command: npm run build
Publish directory: dist
Node version: 24
```

Cloudflare Pages / Netlify は `public/_headers` と `public/_redirects` を使って、SPA の再読み込みと COOP/COEP ヘッダを処理します。
Vercel では `_headers` は読まれないため、将来 SharedArrayBuffer を本格利用する段階では `vercel.json` の headers 設定を追加してください。

## スマホ側

1. 公開URLを Safari / Chrome で開く
2. 横向きにする
3. iPhone は共有メニューから「ホーム画面に追加」
4. Android Chrome は「アプリをインストール」または「ホーム画面に追加」

PWAとしてインストール後はフルスクリーン表示になります。
一度オンラインで読み込んだあとは、Service Worker が基本ファイルをキャッシュします。
ワールド保存は端末のブラウザ保存領域に保存されます。

## PCのワールドをスマホへ持っていく

1. PC側でゲームを開く
2. ポーズメニューまたは左下保存パネルから `Export`
3. 生成された `pinecraft-...json` をスマホへ送る
4. スマホ側でタイトル画面の「保存データを取り込む」
5. JSONを選ぶと、そのワールドから開始

スマホで進めたワールドも、ポーズメニューの「保存データを書き出す」からバックアップできます。

## 開発PCと同じWi-Fiで試す場合

外出先公開とは別に、家の同じWi-Fiで試すだけなら:

```sh
npm run dev:phone
```

別のターミナルで次を実行すると、このMacのLAN URLを一覧表示できます。

```sh
npm run phone:url
```

表示された `http://<MacのIP>:5173/` をスマホで開きます。
ただしこれは同じWi-Fi内だけです。

ビルド済みの本番相当で確認する場合:

```sh
npm run build
npm run preview
npm run phone:url:preview
```

表示された `http://<MacのIP>:4173/` をスマホで開きます。

## 一時的に外からアクセスする場合

外出先のスマホから今の開発PCへ直接アクセスしたい場合は、HTTPSトンネルを使います。
このPCにはまだ `cloudflared` / `ngrok` は入っていないため、インストール不要で試すなら `localhost.run` が最短です。

localhost.run を使う場合:

```sh
npm run dev:phone
npm run tunnel:localhostrun
```

表示された `https://....lhr.life` をスマホで開きます。
これは一時URLです。ターミナルを閉じると切れ、次回はURLが変わることがあります。

Cloudflare Tunnel を使う場合:

```sh
npm run dev:phone
npm run tunnel:cloudflare
```

ngrok を使う場合:

```sh
npm run dev:phone
npm run tunnel:ngrok
```

どちらも表示された `https://...` のURLをスマホで開きます。
トンネルURLは一時URLなので、毎回変わる可能性があります。

## スマホ連携チェックリスト

- PCと同じWi-Fi: `npm run dev:phone` と `npm run phone:url`
- 外出先: HTTPSホスティングへ `dist/` を公開、または `cloudflared/ngrok` の一時URL
- スマホ操作: 横持ち、左スティック移動、右側ドラッグ視点、A/Bボタン、JMP/RUN
- ワールド移行: PCで `Export`、スマホで「保存データを取り込む」
- PWA化: 公開HTTPS URLを開き、ホーム画面に追加
