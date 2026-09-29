import type { AppState } from './types'

/** family は index.html の Google Fonts 読み込みと一致させること */
export const FONTS = [
  { family: 'Noto Sans JP', label: 'Noto Sans JP（ゴシック）' },
  { family: 'BIZ UDPGothic', label: 'BIZ UDPゴシック' },
  { family: 'Zen Kaku Gothic New', label: 'Zen角ゴシック New' },
  { family: 'M PLUS 1p', label: 'M PLUS 1p' },
  { family: 'M PLUS Rounded 1c', label: 'M PLUS Rounded 1c（丸ゴ）' },
  { family: 'Zen Maru Gothic', label: 'Zen丸ゴシック' },
  { family: 'Kosugi Maru', label: '小杉丸ゴシック' },
  { family: 'Sawarabi Gothic', label: 'さわらびゴシック' },
  { family: 'Noto Serif JP', label: 'Noto Serif JP（明朝）' },
  { family: 'Shippori Mincho', label: 'しっぽり明朝' },
  { family: 'Kiwi Maru', label: 'キウイ丸' },
  { family: 'Yusei Magic', label: '油性マジック' },
  { family: 'Hachi Maru Pop', label: 'はちまるポップ' },
  { family: 'Dela Gothic One', label: 'デラゴシックワン' },
]

/** 特定原材料等28品目（表示順）。先頭 MANDATORY_COUNT 件が表示義務のある特定原材料 */
export const ALLERGENS = [
  'えび', 'かに', 'くるみ', '小麦', 'そば', '卵', '乳', '落花生',
  'アーモンド', 'あわび', 'いか', 'いくら', 'オレンジ', 'カシューナッツ', 'キウイフルーツ',
  '牛肉', 'ごま', 'さけ', 'さば', '大豆', '鶏肉', 'バナナ', '豚肉', 'マカダミアナッツ',
  'もも', 'やまいも', 'りんご', 'ゼラチン',
]
export const MANDATORY_COUNT = 8

/** 下部の一覧での表記 */
export const footerLabel = (name: string) => (name === '落花生' ? '落花生（ピーナッツ）' : name)

export const STORAGE_KEY = 'allergy-board-v3'

export const createDefaultState = (): AppState => ({
  settings: {
    orientation: 'landscape',
    font: FONTS[0].family,
    color: '#333333',
    scale: 1,
    showPrice: true,
    showFooter: true,
    title: '含まれるアレルゲン(特定28品目のうち)',
    noCrossText: '(製造工程において他品目の混入なし)',
    crossSuffix: 'と同設備で製造',
  },
  items: [
    { id: crypto.randomUUID(), name: 'キャラメルポップコーン', price: '300', contained: ['大豆'], cross: [] },
    {
      id: crypto.randomUUID(), name: 'ノーマル ドーナツ', price: '150',
      contained: ['小麦', '乳', '卵', '大豆'], cross: ['くるみ', 'ごま', '鶏肉', 'やまいも', 'ゼラチン'],
    },
    {
      id: crypto.randomUUID(), name: 'チョコ ドーナツ', price: '150',
      contained: ['小麦', '乳', '卵', '大豆'], cross: ['くるみ', 'ごま', '鶏肉', '豚肉', 'やまいも', 'ゼラチン'],
    },
  ],
})
