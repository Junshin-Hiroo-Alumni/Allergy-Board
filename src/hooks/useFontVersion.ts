import { useEffect, useState } from 'react'

/** 指定フォントの読み込みを完了させる（失敗しても続行） */
export async function ensureFontLoaded(font: string, sample = 'あア亜含') {
  try {
    await document.fonts.load(`700 16px "${font}"`, sample)
    await document.fonts.ready
  } catch {
    /* フォールバックフォントで続行 */
  }
}

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
