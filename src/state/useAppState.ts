import { useEffect, useReducer } from 'react'
import { createDefaultState, STORAGE_KEY } from '../constants'
import type { AppState } from '../types'
import { newItem, reducer } from './reducer'

/** 保存データを現行スキーマに合わせて読み込む（欠落キーは既定値で補い、壊れていれば既定に戻す） */
function loadState(): AppState {
  const base = createDefaultState()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return base
    const saved = JSON.parse(raw) as Partial<AppState>
    return {
      settings: { ...base.settings, ...saved.settings },
      items: Array.isArray(saved.items) ? saved.items.map(i => newItem(i)) : base.items,
    }
  } catch {
    return base
  }
}

/** アプリ全体の状態。変更のたびに localStorage へ保存する */
export function useAppState() {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* 保存できない環境では無視 */
    }
  }, [state])

  return [state, dispatch] as const
}
