import { useEffect, useState } from 'react'
import { ensureFontLoaded } from '../lib/fonts'

/**
 * フォントの読み込みが完了するたびに増える値を返す。
 * 文字幅に依存する計測（ページ分割）の再実行トリガーとして使う。
 */
export function useFontVersion(font: string) {
  const [version, setVersion] = useState(0)
  useEffect(() => {
    let cancelled = false
    ensureFontLoaded(font).then(() => {
      if (!cancelled) setVersion(v => v + 1)
    })
    return () => {
      cancelled = true
    }
  }, [font])
  return version
}
