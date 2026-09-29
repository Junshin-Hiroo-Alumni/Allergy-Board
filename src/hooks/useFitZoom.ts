import { useEffect, useState, type RefObject } from 'react'
import { MM_TO_PX } from '../lib/geometry'

const GUTTER = 48

/** コンテナ幅に用紙幅が収まる倍率を返す */
export function useFitZoom(containerRef: RefObject<HTMLElement | null>, pageWidthMm: number) {
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const z = (el.clientWidth - GUTTER) / (pageWidthMm * MM_TO_PX)
      setZoom(Math.min(1.2, Math.max(0.2, z)))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [containerRef, pageWidthMm])

  return zoom
}
