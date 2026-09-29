import * as Accordion from '@radix-ui/react-accordion'
import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon, CopyIcon, TrashIcon } from '@radix-ui/react-icons'
import { Badge, Flex, IconButton, Tabs, Text, TextField } from '@radix-ui/themes'
import type { Dispatch } from 'react'
import { formatPrice } from '../../lib/format'
import type { Action } from '../../state/reducer'
import type { Item } from '../../types'
import { AllergenToggleGroup } from './AllergenToggleGroup'

interface Props {
  item: Item
  index: number
  showPrice: boolean
  dispatch: Dispatch<Action>
  onDuplicated: (newId: string) => void
}

/** 折りたたみ時の要約（「含」「同」それぞれの先頭数件） */
const summarize = (label: string, list: string[]) => (list.length ? `${label} ${list.join('・')}` : '')

export function ItemCard({ item, index, showPrice, dispatch, onDuplicated }: Props) {
  const { id } = item
  const price = showPrice ? formatPrice(item.price) : ''
  const summary = [summarize('含', item.contained), summarize('同設備', item.cross)].filter(Boolean).join('　')

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
                {summary || 'アレルゲン未選択'}
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
              <Tabs.Trigger value="contained">
                含まれる <Badge color="gray" variant="solid" highContrast ml="1">{item.contained.length}</Badge>
              </Tabs.Trigger>
              <Tabs.Trigger value="cross">
                同設備で製造 <Badge color="orange" variant="solid" ml="1">{item.cross.length}</Badge>
              </Tabs.Trigger>
            </Tabs.List>
            <Flex pt="3">
              <Tabs.Content value="contained">
                <AllergenToggleGroup
                  variant="contained"
                  aria-label="含まれるアレルゲン"
                  value={item.contained}
                  onChange={values => dispatch({ type: 'setAllergens', id, kind: 'contained', values })}
                />
                <Text as="p" size="1" color="gray" mt="2">
                  選んだ順にプレビューへ表示されます。
                </Text>
              </Tabs.Content>
              <Tabs.Content value="cross">
                <AllergenToggleGroup
                  variant="cross"
                  aria-label="同設備で製造するアレルゲン"
                  value={item.cross}
                  onChange={values => dispatch({ type: 'setAllergens', id, kind: 'cross', values })}
                />
                <Text as="p" size="1" color="gray" mt="2">
                  混入の可能性があるもの。「含まれる」に選んだ品目は自動で外れます。
                </Text>
              </Tabs.Content>
            </Flex>
          </Tabs.Root>

          <Flex gap="2" justify="end">
            <IconButton size="2" variant="soft" color="gray" aria-label="上へ" onClick={() => dispatch({ type: 'moveItem', id, dir: -1 })}>
              <ArrowUpIcon />
            </IconButton>
            <IconButton size="2" variant="soft" color="gray" aria-label="下へ" onClick={() => dispatch({ type: 'moveItem', id, dir: 1 })}>
              <ArrowDownIcon />
            </IconButton>
            <IconButton
              size="2"
              variant="soft"
              color="gray"
              aria-label="複製"
              onClick={() => {
                const newId = crypto.randomUUID()
                dispatch({ type: 'duplicateItem', id, newId })
                onDuplicated(newId)
              }}
            >
              <CopyIcon />
            </IconButton>
            <IconButton size="2" variant="soft" color="red" aria-label="削除" onClick={() => dispatch({ type: 'removeItem', id })}>
              <TrashIcon />
            </IconButton>
          </Flex>
        </Flex>
      </Accordion.Content>
    </Accordion.Item>
  )
}
