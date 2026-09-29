import { FileTextIcon } from '@radix-ui/react-icons'
import { Button, Flex, Tabs, Text } from '@radix-ui/themes'
import type { Dispatch } from 'react'
import { printDocument } from '../../lib/print'
import type { Action } from '../../state/reducer'
import type { AppState } from '../../types'
import { ItemList } from './ItemList'
import { DesignSettings, TextSettings } from './SettingsForm'
import './panel.css'

interface Props {
  state: AppState
  dispatch: Dispatch<Action>
}

export function ControlPanel({ state, dispatch }: Props) {
  const { settings, items } = state
  return (
    <aside className="panel">
      <Tabs.Root defaultValue="items" className="panel-tabs">
        <Tabs.List size="2" className="panel-tablist">
          <Tabs.Trigger value="items">商品 ({items.length})</Tabs.Trigger>
          <Tabs.Trigger value="design">デザイン</Tabs.Trigger>
          <Tabs.Trigger value="text">文言</Tabs.Trigger>
        </Tabs.List>

        <div className="panel-scroll">
          <Tabs.Content value="items">
            <ItemList items={items} showPrice={settings.showPrice} dispatch={dispatch} />
          </Tabs.Content>
          <Tabs.Content value="design">
            <DesignSettings settings={settings} dispatch={dispatch} />
          </Tabs.Content>
          <Tabs.Content value="text">
            <TextSettings settings={settings} dispatch={dispatch} />
          </Tabs.Content>
        </div>
      </Tabs.Root>

      <Flex direction="column" gap="2" className="panel-footer">
        <Button size="3" onClick={() => printDocument(settings)}>
          <FileTextIcon /> PDFを保存
        </Button>
        <Text size="1" color="gray">
          印刷ダイアログで「PDFに保存」・余白「なし」・「背景のグラフィック」オン
        </Text>
      </Flex>
    </aside>
  )
}
