import { createDefaultState } from '../constants'
import type { AllergenKind, AppState, Item, Settings } from '../types'

export type Action =
  | { type: 'settings'; patch: Partial<Settings> }
  | { type: 'addItem'; id: string }
  | { type: 'updateItem'; id: string; patch: Partial<Pick<Item, 'name' | 'price'>> }
  | { type: 'setAllergens'; id: string; kind: AllergenKind; values: string[] }
  | { type: 'moveItem'; id: string; dir: -1 | 1 }
  | { type: 'duplicateItem'; id: string; newId: string }
  | { type: 'removeItem'; id: string }
  | { type: 'clearItems' }

export const newItem = (init: Partial<Item> = {}): Item => ({
  id: crypto.randomUUID(),
  name: '',
  price: '',
  contained: [],
  cross: [],
  ...init,
})

const OTHER: Record<AllergenKind, AllergenKind> = { contained: 'cross', cross: 'contained' }

export function reducer(state: AppState, action: Action): AppState {
  const { items } = state
  switch (action.type) {
    case 'settings':
      return { ...state, settings: { ...state.settings, ...action.patch } }
    case 'addItem':
      return { ...state, items: [...items, newItem({ id: action.id })] }
    case 'updateItem':
      return { ...state, items: items.map(i => (i.id === action.id ? { ...i, ...action.patch } : i)) }
    case 'setAllergens':
      // 同じアレルゲンを「含む」と「同設備」の両方に入れない
      return {
        ...state,
        items: items.map(i =>
          i.id !== action.id
            ? i
            : {
                ...i,
                [action.kind]: action.values,
                [OTHER[action.kind]]: i[OTHER[action.kind]].filter(a => !action.values.includes(a)),
              },
        ),
      }
    case 'moveItem': {
      const from = items.findIndex(i => i.id === action.id)
      const to = from + action.dir
      if (from < 0 || to < 0 || to >= items.length) return state
      const next = [...items]
      ;[next[from], next[to]] = [next[to], next[from]]
      return { ...state, items: next }
    }
    case 'duplicateItem': {
      const from = items.findIndex(i => i.id === action.id)
      if (from < 0) return state
      const src = items[from]
      const copy = newItem({ ...src, id: action.newId, contained: [...src.contained], cross: [...src.cross] })
      return { ...state, items: [...items.slice(0, from + 1), copy, ...items.slice(from + 1)] }
    }
    case 'removeItem':
      return { ...state, items: items.filter(i => i.id !== action.id) }
    case 'clearItems':
      return { ...state, items: [] }
  }
}

/** 保存データを現行スキーマに合わせて読み込む（欠落キーは既定値で補う） */
export function loadState(raw: string | null): AppState {
  const base = createDefaultState()
  if (!raw) return base
  try {
    const saved = JSON.parse(raw) as Partial<AppState>
    return {
      settings: { ...base.settings, ...saved.settings },
      items: Array.isArray(saved.items) ? saved.items.map(i => newItem(i)) : base.items,
    }
  } catch {
    return base
  }
}
