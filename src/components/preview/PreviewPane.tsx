import { useLayoutEffect, useRef, useState } from 'react'
import { useFitZoom } from '../../hooks/useFitZoom'
import { useFontVersion } from '../../hooks/useFontVersion'
import { getGeometry, MM_TO_PX } from '../../lib/geometry'
import { outerHeight, paginate } from '../../lib/paginate'
import type { Item, Settings } from '../../types'
import { ItemBlock } from './ItemBlock'
import { Page } from './Page'
import './preview.css'

/** ページ下端に確保する余白(mm)。計測誤差でのはみ出し防止 */
const SAFETY_MM = 6

interface Props {
  settings: Settings
  items: Item[]
}

export function PreviewPane({ settings, items }: Props) {
  const geometry = getGeometry(settings.orientation)
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [groups, setGroups] = useState<number[][]>([[]])
  const fontVersion = useFontVersion(settings.font)
  const zoom = useFitZoom(containerRef, geometry.width)

  // 非表示の計測用ページで各ブロックの実高さを測り、ページ分割する
  useLayoutEffect(() => {
    const root = measureRef.current
    if (!root) return
    const titleH = outerHeight(root.querySelector('.page-title'))
    const footH = outerHeight(root.querySelector('.page-foot'))
    const heights = Array.from(root.querySelectorAll('.blk'), outerHeight)
    const usable = (geometry.height - geometry.padTop - geometry.padBottom - SAFETY_MM) * MM_TO_PX
    setGroups(paginate(heights, usable - titleH - footH))
  }, [items, settings, geometry, fontVersion])

  const total = groups.length

  return (
    <main className="preview" ref={containerRef}>
      <div className="preview-pages" style={{ zoom }}>
        {groups.map((indexes, p) => (
          <Page key={p} settings={settings} geometry={geometry} pageNo={p + 1} totalPages={total}>
            {indexes.map(i => items[i] && <ItemBlock key={items[i].id} item={items[i]} settings={settings} />)}
          </Page>
        ))}
      </div>

      <div className="preview-measure" ref={measureRef} aria-hidden>
        <Page settings={settings} geometry={geometry} autoHeight>
          {items.map(item => (
            <ItemBlock key={item.id} item={item} settings={settings} />
          ))}
        </Page>
      </div>
    </main>
  )
}
