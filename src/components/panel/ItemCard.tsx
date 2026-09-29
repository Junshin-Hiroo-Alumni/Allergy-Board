import * as Accordion from '@radix-ui/react-accordion'
import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon, CopyIcon, TrashIcon } from '@radix-ui/react-icons'
import { Badge, Flex, IconButton, Tabs, Text, TextField } from '@radix-ui/themes'
import type { Dispatch } from 'react'
import { formatPrice } from '../../lib/format'
import type { Action } from '../../state/reducer'
import type { AllergenKind, Item } from '../../types'
import { AllergenToggleGroup } from './AllergenToggleGroup'

/** アレルゲン選択タブの定義（含まれる／同設備で製造） */
const KINDS: { kind: AllergenKind; tab: string; badgeColor: 'gray' | 'orange'; hint: string }[] = [
  { kind: 'contained', tab: '含まれる', badgeColor: 'gray', hint: '選んだ順にプレビューへ表示されます。' },
  {
    kind: 'cross',
    tab: '同設備で製造',
    badgeColor: 'orange',
    hint: '混入の可能性があるもの。「含まれる」に選んだ品目は自動で外れます。',
  },
]

interface Props {
  item: Item
  index: number
  showPrice: boolean
  dispatch: Dispatch<Action>
  onDuplicate: () => void
}

export function ItemCard({ item, index, showPrice, dispatch, onDuplicate }: Props) {
  const { id } = item
  const price = showPrice ? formatPrice(item.price) : ''
  // 折りたたみ時の要約行
  const summary =
    [
      item.contained.length && `含 ${item.contained.join('・')}`,
      item.cross.length && `同設備 ${item.cross.join('・')}`,
    ]
      .filter(Boolean)
      .join('　') || 'アレルゲン未選択'

  const actions = [
    { label: '上へ', icon: <ArrowUpIcon />, run: () => dispatch({ type: 'moveItem', id, dir: -1 }) },
    { label: '下へ', icon: <ArrowDownIcon />, run: () => dispatch({ type: 'moveItem', id, dir: 1 }) },
    { label: '複製', icon: <CopyIcon />, run: onDuplicate },
    { label: '削除', icon: <TrashIcon />, run: () => dispatch({ type: 'removeItem', id }), color: 'red' as const },
  ]

  return (
    <Accordion.Item value={id} className="item">
      <Accordion.Header asChild>
        <div>
          <Accordion.Trigger className="item-trigger">
            <span className="item-no">{index + 1}</span>
            <span className="item-head">
              <span className="item-title">
                <Text size="3" weight="bold" className={item.name ? '' : 'item-empty'}>
                  {item.name || '（商品名未入力）'}
                </Text>
                {price && (
                  <Text size="2" color="gray">
                    {price}
                  </Text>
                )}
              </span>
              <Text size="1" color="gray" className="item-summary">
                {summary}
              </Text>
            </span>
            <ChevronDownIcon className="item-chevron" aria-hidden />
          </Accordion.Trigger>
        </div>
      </Accordion.Header>

      <Accordion.Content className="item-content">
        <Flex direction="column" gap="3" pt="2">
          <Flex gap="2" align="center">
            <TextField.Root
              size="3"
              style={{ flex: 1 }}
              placeholder="商品名"
              aria-label="商品名"
              value={item.name}
              onChange={e => dispatch({ type: 'updateItem', id, patch: { name: e.target.value } })}
            />
            {showPrice && (
              <TextField.Root
                size="3"
                style={{ width: 110 }}
                placeholder="価格(任意)"
                aria-label="価格"
                inputMode="numeric"
                value={item.price}
                onChange={e => dispatch({ type: 'updateItem', id, patch: { price: e.target.value } })}
              />
            )}
          </Flex>

          <Tabs.Root defaultValue="contained">
            <Tabs.List size="2">
              {KINDS.map(({ kind, tab, badgeColor }) => (
                <Tabs.Trigger key={kind} value={kind}>
                  {tab}{' '}
                  <Badge color={badgeColor} variant="solid" highContrast={kind === 'contained'} ml="1">
                    {item[kind].length}
                  </Badge>
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <Flex pt="3">
              {KINDS.map(({ kind, tab, hint }) => (
                <Tabs.Content key={kind} value={kind}>
                  <AllergenToggleGroup
                    kind={kind}
                    label={tab}
                    value={item[kind]}
                    onChange={values => dispatch({ type: 'setAllergens', id, kind, values })}
                  />
                  <Text as="p" size="1" color="gray" mt="2">
                    {hint}
                  </Text>
                </Tabs.Content>
              ))}
            </Flex>
          </Tabs.Root>

          <Flex gap="2" justify="end">
            {actions.map(({ label, icon, run, color }) => (
              <IconButton key={label} size="2" variant="soft" color={color ?? 'gray'} aria-label={label} onClick={run}>
                {icon}
              </IconButton>
            ))}
          </Flex>
        </Flex>
      </Accordion.Content>
    </Accordion.Item>
  )
}
