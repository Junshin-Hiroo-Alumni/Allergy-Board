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

const mapItem = (items: Item[], id: string, fn: (item: Item) => Item) => items.map(i => (i.id === id ? fn(i) : i))

/** id はUI側で採番して渡す（reducer を純粋に保ち、追加直後の商品を開けるようにするため） */
export function reducer(state: AppState, action: Action): AppState {
  const { items } = state
  switch (action.type) {
    case 'settings':
      return { ...state, settings: { ...state.settings, ...action.patch } }
    case 'addItem':
      return { ...state, items: [...items, newItem({ id: action.id })] }
    case 'updateItem':
      return { ...state, items: mapItem(items, action.id, i => ({ ...i, ...action.patch })) }
    case 'setAllergens': {
      // 同じアレルゲンを「含む」と「同設備」の両方に入れない
      const { kind, values } = action
      const other = OTHER[kind]
      return {
        ...state,
        items: mapItem(items, action.id, i => ({ ...i, [kind]: values, [other]: i[other].filter(a => !values.includes(a)) })),
      }
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
      // 配列は常に新規作成して更新するので、コピー元と共有しても安全
      const copy = { ...items[from], id: action.newId }
      return { ...state, items: [...items.slice(0, from + 1), copy, ...items.slice(from + 1)] }
    }
    case 'removeItem':
      return { ...state, items: items.filter(i => i.id !== action.id) }
    case 'clearItems':
      return { ...state, items: [] }
  }
}
