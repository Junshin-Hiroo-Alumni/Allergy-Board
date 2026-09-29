import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { ALLERGENS, MANDATORY_COUNT } from '../../constants'

interface Props {
  /** 選択順のアレルゲン名 */
  value: string[]
  onChange: (value: string[]) => void
  variant: 'contained' | 'cross'
  'aria-label': string
}

export function AllergenToggleGroup({ value, onChange, variant, 'aria-label': ariaLabel }: Props) {
  return (
    <ToggleGroup.Root
      type="multiple"
      value={value}
      onValueChange={onChange}
      aria-label={ariaLabel}
      className={`allergen-group allergen-group--${variant}`}
    >
      {ALLERGENS.map((name, i) => (
        <span key={name} style={{ display: 'contents' }}>
          <ToggleGroup.Item value={name} className="allergen-chip">
            {name}
          </ToggleGroup.Item>
          {/* 特定原材料8品目とそれ以外で改行 */}
          {i === MANDATORY_COUNT - 1 && <span className="allergen-break" />}
        </span>
      ))}
    </ToggleGroup.Root>
  )
}
