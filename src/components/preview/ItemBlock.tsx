import { crossNote, itemLabel } from '../../lib/format'
import type { Item, Settings } from '../../types'

interface Props {
  item: Item
  settings: Settings
}

export function ItemBlock({ item, settings }: Props) {
  return (
    <div className="blk">
      <div className="blk-label">{itemLabel(item, settings.showPrice) || '　'}</div>
      <div className="blk-main">{item.contained.length ? item.contained.join('、') : 'なし'}</div>
      <div className="blk-sub">{crossNote(item, settings)}</div>
    </div>
  )
}
