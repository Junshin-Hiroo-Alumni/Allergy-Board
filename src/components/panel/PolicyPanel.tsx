import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Callout, Flex, Heading, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Flex direction="column" gap="2">
      <Heading size="3">{title}</Heading>
      {children}
    </Flex>
  )
}

/** 「ポリシー」タブ: 免責事項とデータの取り扱い */
export function PolicyPanel() {
  return (
    <Flex direction="column" gap="5">
      <Callout.Root color="red" variant="surface">
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text weight="bold">
          本ツールの利用および出力物に関して生じた一切の損害・トラブルについて、作成者は一切の責任を負いません。
        </Callout.Text>
      </Callout.Root>

      <Section title="免責事項">
        <ul className="policy-list">
          <li>出力内容（アレルゲン情報を含む）の正確性・完全性・最新性は保証しません。</li>
          <li>
            アレルゲンの選択・表記が実際の原材料や製造工程、最新の食品表示基準と合っているかは、利用者の責任で必ず確認してください。
          </li>
          <li>
            本ツールで作成した表を掲示・配布・提供したことにより生じた、健康被害、事故、法令違反、クレーム、その他の損害について、作成者は責任を負いません。
          </li>
          <li>本ツールは予告なく変更・停止・終了することがあります。</li>
          <li>本ツールは現状有姿で提供され、特定の目的への適合性を含め、いかなる保証もありません。</li>
        </ul>
      </Section>

      <Section title="データの取り扱い">
        <ul className="policy-list">
          <li>本ツールはサーバーを持たず、入力内容は外部へ送信されません。</li>
          <li>入力内容は、お使いの端末のブラウザ（localStorage）にのみ保存されます。ブラウザのデータ削除で消えます。</li>
          <li>フォント表示のため Google Fonts に接続します。その際、フォント配信元へ通信が発生します。</li>
        </ul>
      </Section>

      <Text size="1" color="gray">
        本ツールを利用した時点で、上記に同意したものとみなします。
      </Text>
    </Flex>
  )
}
