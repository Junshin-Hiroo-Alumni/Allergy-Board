import type { CSSProperties, ReactNode } from 'react'
import { ALLERGENS, footerLabel } from '../../constants'
import type { PageGeometry } from '../../lib/geometry'
import type { Settings } from '../../types'

interface Props {
  settings: Settings
  geometry: PageGeometry
  children: ReactNode
  pageNo?: number
  totalPages?: number
  /** 高さを内容に合わせる（ページ分割のための計測用） */
  autoHeight?: boolean
}

export function Page({ settings, geometry: g, children, pageNo, totalPages, autoHeight }: Props) {
  const style = {
    '--font': `"${settings.font}"`,
    '--bar': settings.color,
    '--s': settings.scale,
    width: `${g.width}mm`,
    '--page-h': `${g.height}mm`,
    ...(autoHeight && { height: 'auto' }),
    padding: `${g.padTop}mm ${g.padX}mm ${g.padBottom}mm`,
  } as CSSProperties

  return (
    <section className="page" style={style}>
      <div className="page-title">{settings.title}</div>
      <div className="page-body">{children}</div>
      {settings.showFooter && (
        <div className="page-foot">
          <div>アレルギー特定原材料等28品目:</div>
          <div className="page-foot-list">
            {ALLERGENS.map((a, i) => (
              <span key={a}>{footerLabel(a) + (i < ALLERGENS.length - 1 ? '・' : '')}</span>
            ))}
          </div>
        </div>
      )}
      {totalPages && totalPages > 1 && (
        <div className="page-num">
          {pageNo} / {totalPages}
        </div>
      )}
    </section>
  )
}
