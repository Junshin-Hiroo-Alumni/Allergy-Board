import type { Orientation } from '../types'

export const MM_TO_PX = 96 / 25.4

export interface PageGeometry {
  /** すべて mm */
  width: number
  height: number
  padX: number
  padTop: number
  padBottom: number
}

/** 定数にしておくことで、参照が安定し useEffect の依存に使える */
export const GEOMETRY: Record<Orientation, PageGeometry> = {
  landscape: { width: 297, height: 210, padX: 15, padTop: 10, padBottom: 10 },
  portrait: { width: 210, height: 297, padX: 12, padTop: 10, padBottom: 10 },
}
