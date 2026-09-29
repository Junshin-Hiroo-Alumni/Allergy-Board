/** 指定フォントの読み込みを完了させる（失敗してもフォールバックフォントで続行） */
export async function ensureFontLoaded(font: string, sample = 'あア亜含') {
  try {
    await document.fonts.load(`700 16px "${font}"`, sample)
    await document.fonts.ready
  } catch {
    /* ignore */
  }
}
