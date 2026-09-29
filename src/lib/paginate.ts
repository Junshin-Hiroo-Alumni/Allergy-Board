/**
 * 各ブロックの高さ(px)を順に詰め、1ページに収まる添字のグループへ分割する。
 * 1ブロックが1ページより高い場合も、そのブロックだけで1ページとする。
 */
export function paginate(heights: number[], available: number): number[][] {
  const groups: number[][] = [[]]
  let used = 0
  heights.forEach((h, i) => {
    const current = groups[groups.length - 1]
    if (current.length > 0 && used + h > available) {
      groups.push([])
      used = 0
    }
    groups[groups.length - 1].push(i)
    used += h
  })
  return groups
}

/** margin を含めた要素の外形高さ(px) */
export function outerHeight(el: Element | null): number {
  if (!el) return 0
  const style = getComputedStyle(el)
  return el.getBoundingClientRect().height + parseFloat(style.marginTop) + parseFloat(style.marginBottom)
}
