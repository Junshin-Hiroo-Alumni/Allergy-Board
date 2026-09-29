import { crossNote, itemLabel } from '../../lib/format'
import type { Item, Settings } from '../../types'

interface Props {
  item: Item
  settings: Settings
}

export function ItemBlock({ item, settings }: Props) {
  const none = item.contained.length === 0
  return (
    <div className="blk">
      <div className="blk-label">{itemLabel(item, settings.showPrice) || '　'}</div>
      <div className={none ? 'blk-main blk-main--none' : 'blk-main'}>
        {none ? 'なし' : item.contained.join('、')}
      </div>
      <div className="blk-sub">{crossNote(item, settings)}</div>
    </div>
  )
}
