import type { Item, Settings } from '../types'

export const formatPrice = (price: string) => {
  const p = price.trim()
  return /^[\d,]+$/.test(p) ? `¥${Number(p.replace(/,/g, '')).toLocaleString()}` : p
}

export const itemLabel = (item: Item, showPrice: boolean) => {
  const price = showPrice ? formatPrice(item.price) : ''
  return price ? `${item.name}(${price})` : item.name
}

export const crossNote = (item: Item, s: Pick<Settings, 'noCrossText' | 'crossSuffix'>) =>
  item.cross.length ? `(${item.cross.join('、')} ${s.crossSuffix})` : s.noCrossText
