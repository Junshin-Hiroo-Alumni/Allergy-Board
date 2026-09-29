# アレルゲン表メーカー

商品名・価格（任意）・アレルゲンを選ぶだけで、A4 横/縦のアレルゲン表 PDF を作れる Web アプリ。
バックエンドなし（ブラウザのみで動作。入力内容は localStorage に保存）。

Vite + React 19 + TypeScript + [Radix Themes](https://www.radix-ui.com/themes)（ボタン・ダイアログ等）/ Radix ToggleGroup（アレルゲン選択）。

## 開発

```sh
bun install
bun run dev      # 開発サーバー
bun run build    # 型チェック + 本番ビルド（dist/ は静的ホスティングにそのまま置ける）
bun run lint     # oxlint
```

## PDF 出力の仕組み

`window.print()` + `@page { size: A4 landscape|portrait }` によるブラウザ印刷。
送信先を「PDFに保存」、余白「なし」、「背景のグラフィック」オンで保存する（文字は選択可能なベクター PDF になる）。

## 構成

```
src/
  constants.ts        フォント一覧・28品目・既定データ
  types.ts            Item / Settings / AppState
  state/              reducer と localStorage 永続化（useAppState）
  lib/
    format.ts         ラベル・注記の文字列組み立て
    geometry.ts       用紙寸法(mm)
    paginate.ts       ブロック高さからのページ分割
    print.ts          印刷実行（フォント読み込み待ち）
  hooks/              useFontVersion（フォント読込待ち）/ useFitZoom（プレビュー倍率）
  components/
    preview/          左: 用紙の描画（Page / ItemBlock / PreviewPane）
    panel/            右: 操作パネル（設定・商品リスト・アレルゲン選択）
  print.css           印刷時のスタイル（各 CSS より後に読み込むこと）
```

## 保守メモ

- **フォント追加**: `src/constants.ts` の `FONTS` と `index.html` の Google Fonts `family=` を両方更新する。
- **デザイン調整**: 用紙の見た目は `components/preview/preview.css`。寸法は `--u`（1mm × 文字サイズ倍率）基準。`em` は要素自身の font-size で膨らむため使わない。
- **ページ分割**: 非表示の計測用ページで各商品ブロックの実高さを測り、`paginate()` で詰める（`PreviewPane.tsx`）。
- **印刷 CSS**: 画面用のレスポンシブ規則は `@media screen` に限定すること（印刷時に当たると用紙がずれる）。
- アレルゲン28品目は `ALLERGENS`。表示基準が改定されたらここを更新する。
