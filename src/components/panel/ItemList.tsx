import * as Accordion from '@radix-ui/react-accordion'
import { PlusIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes'
import { useState, type Dispatch } from 'react'
import type { Action } from '../../state/reducer'
import type { Item } from '../../types'
import { ItemCard } from './ItemCard'

interface Props {
  items: Item[]
  showPrice: boolean
  dispatch: Dispatch<Action>
}

export function ItemList({ items, showPrice, dispatch }: Props) {
  // 開いている商品は常に1つだけ。追加・複製した商品は自動で開く
  const [openId, setOpenId] = useState('')

  const add = () => {
    const id = crypto.randomUUID()
    dispatch({ type: 'addItem', id })
    setOpenId(id)
  }

  return (
    <Flex direction="column" gap="3">
      {items.length === 0 && (
        <Text size="2" color="gray">
          商品がありません。「商品を追加」を押してください。
        </Text>
      )}

      <Accordion.Root type="single" collapsible value={openId} onValueChange={setOpenId} className="item-list">
        {items.map((item, i) => (
          <ItemCard
            key={item.id}
            item={item}
            index={i}
            showPrice={showPrice}
            dispatch={dispatch}
            onDuplicated={setOpenId}
          />
        ))}
      </Accordion.Root>

      <Flex gap="2" align="center">
        <Button size="3" onClick={add}>
          <PlusIcon /> 商品を追加
        </Button>

        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button size="3" variant="soft" color="red" style={{ marginLeft: 'auto' }} disabled={items.length === 0}>
              全消去
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content maxWidth="400px">
            <AlertDialog.Title>商品をすべて削除</AlertDialog.Title>
            <AlertDialog.Description size="2">
              入力した商品がすべて削除されます。この操作は元に戻せません。
            </AlertDialog.Description>
            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  キャンセル
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button color="red" onClick={() => dispatch({ type: 'clearItems' })}>
                  削除する
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Flex>
    </Flex>
  )
}
