import { Flex, Select, SegmentedControl, Slider, Switch, Text, TextField } from '@radix-ui/themes'
import type { Dispatch, ReactNode } from 'react'
import { FONTS } from '../../constants'
import type { Action } from '../../state/reducer'
import type { Orientation, Settings } from '../../types'

interface Props {
  settings: Settings
  dispatch: Dispatch<Action>
}

/** 「デザイン」タブの1行（ラベル + 部品）。行の高さは CSS(.field-row) でそろえる */
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Flex align="center" gap="3" className="field-row">
      <Text size="2" weight="medium" style={{ width: 84, flex: 'none' }}>
        {label}
      </Text>
      <Flex flexGrow="1" align="center" gap="3">
        {children}
      </Flex>
    </Flex>
  )
}

/** 「文言」タブの入力欄（ラベルが上） */
function TextInput({ label, value, onChange, note }: { label: string; value: string; onChange: (v: string) => void; note?: string }) {
  return (
    <Flex direction="column" gap="1">
      <Text size="2" weight="medium">
        {label}
      </Text>
      <TextField.Root size="3" value={value} onChange={e => onChange(e.target.value)} />
      {note && (
        <Text size="1" color="gray">
          {note}
        </Text>
      )}
    </Flex>
  )
}

/** 「デザイン」タブ */
export function DesignSettings({ settings, dispatch }: Props) {
  const set = (patch: Partial<Settings>) => dispatch({ type: 'settings', patch })
  return (
    <Flex direction="column" gap="2">
      <Field label="向き">
        <SegmentedControl.Root
          size="2"
          value={settings.orientation}
          onValueChange={v => set({ orientation: v as Orientation })}
        >
          <SegmentedControl.Item value="landscape">A4 横</SegmentedControl.Item>
          <SegmentedControl.Item value="portrait">A4 縦</SegmentedControl.Item>
        </SegmentedControl.Root>
      </Field>

      <Field label="フォント">
        <Select.Root size="3" value={settings.font} onValueChange={font => set({ font })}>
          <Select.Trigger style={{ flex: 1 }} />
          <Select.Content>
            {FONTS.map(f => (
              <Select.Item key={f.family} value={f.family} style={{ fontFamily: `"${f.family}"` }}>
                {f.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Field>

      <Field label="帯の色">
        <input
          type="color"
          className="color-input"
          aria-label="帯の色"
          value={settings.color}
          onChange={e => set({ color: e.target.value })}
        />
      </Field>

      <Field label="文字サイズ">
        <Slider
          size="2"
          min={0.6}
          max={1.4}
          step={0.05}
          value={[settings.scale]}
          onValueChange={([scale]) => set({ scale })}
          aria-label="文字サイズ"
        />
        <Text size="2" style={{ width: 44, textAlign: 'right' }}>
          {Math.round(settings.scale * 100)}%
        </Text>
      </Field>

      <Field label="価格を表示">
        <Switch checked={settings.showPrice} onCheckedChange={showPrice => set({ showPrice })} aria-label="価格を表示" />
      </Field>
      <Field label="28品目の一覧">
        <Switch checked={settings.showFooter} onCheckedChange={showFooter => set({ showFooter })} aria-label="28品目の一覧を表示" />
      </Field>
    </Flex>
  )
}

/** 「文言」タブ */
export function TextSettings({ settings, dispatch }: Props) {
  const set = (patch: Partial<Settings>) => dispatch({ type: 'settings', patch })
  return (
    <Flex direction="column" gap="4">
      <TextInput label="タイトル" value={settings.title} onChange={title => set({ title })} />
      <TextInput label="混入なしの注記" value={settings.noCrossText} onChange={noCrossText => set({ noCrossText })} />
      <TextInput
        label="混入ありの語尾"
        value={settings.crossSuffix}
        onChange={crossSuffix => set({ crossSuffix })}
        note={`「(◯◯、◯◯ ${settings.crossSuffix})」の形で表示されます。`}
      />
    </Flex>
  )
}
