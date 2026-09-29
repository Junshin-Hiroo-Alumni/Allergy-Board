import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Fragment } from 'react'
import { ALLERGENS, MANDATORY_COUNT } from '../../constants'
import type { AllergenKind } from '../../types'

interface Props {
  kind: AllergenKind
  label: string
  /** 選択順のアレルゲン名 */
  value: string[]
  onChange: (value: string[]) => void
}

export function AllergenToggleGroup({ kind, label, value, onChange }: Props) {
  return (
    <ToggleGroup.Root
      type="multiple"
      value={value}
      onValueChange={onChange}
      aria-label={label}
      className={`allergen-group allergen-group--${kind}`}
    >
      {ALLERGENS.map((name, i) => (
        <Fragment key={name}>
          <ToggleGroup.Item value={name} className="allergen-chip">
            {name}
          </ToggleGroup.Item>
          {/* 特定原材料8品目とそれ以外で改行 */}
          {i === MANDATORY_COUNT - 1 && <span className="allergen-break" />}
        </Fragment>
      ))}
    </ToggleGroup.Root>
  )
}
