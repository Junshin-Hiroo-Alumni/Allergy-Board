# アレルゲン表メーカー

商品名・価格（任意）・アレルゲンを選ぶだけで、A4 横/縦のアレルゲン表 PDF を作れる Web アプリ。

## 開発

```sh
bun install
bun run dev      # 開発サーバー
bun run build    # 型チェック + 本番ビルド（dist/ は静的ホスティングにそのまま置ける）
bun run lint     # oxlint
```

## 保守メモ
- **フォント追加**: `src/constants.ts` の `FONTS` と `index.html` の Google Fonts `family=` を両方更新する。
- **デザイン調整**: 用紙の見た目は `components/preview/preview.css`。寸法は `--u`（1mm × 文字サイズ倍率）基準。`em` は要素自身の font-size で膨らむため使わない。
- **ページ分割**: 非表示の計測用ページで各商品ブロックの実高さを測り、`paginate()` で詰める（`PreviewPane.tsx`）。
- **印刷 CSS**: 画面用のレスポンシブ規則は `@media screen` に限定すること（印刷時に当たると用紙がずれる）。
- アレルゲン28品目は `ALLERGENS`。表示基準が改定されたらここを更新する。

---

PDFデザインの原作者: [KohkiAwata](https://github.com/KohkiAwata)

