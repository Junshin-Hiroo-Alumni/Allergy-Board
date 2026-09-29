export type Orientation = 'landscape' | 'portrait'

export interface Item {
  id: string
  name: string
  /** 空欄可。数字のみなら ¥ 付きで整形して表示する */
  price: string
  /** 含まれるアレルゲン（選択順に表示） */
  contained: string[]
  /** 同設備で製造（混入の可能性）するアレルゲン */
  cross: string[]
}

export interface Settings {
  orientation: Orientation
  font: string
  color: string
  /** 文字サイズ倍率 */
  scale: number
  showPrice: boolean
  showFooter: boolean
  title: string
  noCrossText: string
  crossSuffix: string
}

export interface AppState {
  settings: Settings
  items: Item[]
}

export type AllergenKind = 'contained' | 'cross'
