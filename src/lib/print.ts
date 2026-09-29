import type { Settings } from '../types'
import { ensureFontLoaded } from './fonts'

/** フォント読み込み完了後に印刷ダイアログを開く（「PDFに保存」で出力） */
export async function printDocument(settings: Settings) {
  await ensureFontLoaded(settings.font, settings.title)
  const previous = document.title
  document.title = settings.title || 'allergy'
  window.print()
  document.title = previous
}
