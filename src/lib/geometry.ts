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

export const getGeometry = (orientation: Orientation): PageGeometry =>
  orientation === 'landscape'
    ? { width: 297, height: 210, padX: 15, padTop: 10, padBottom: 10 }
    : { width: 210, height: 297, padX: 12, padTop: 10, padBottom: 10 }
