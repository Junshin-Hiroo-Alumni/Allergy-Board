import { useEffect, useReducer } from 'react'
import { STORAGE_KEY } from '../constants'
import { loadState, reducer } from './reducer'

const readStorage = () => {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

/** アプリ全体の状態。変更のたびに localStorage へ保存する */
export function useAppState() {
  const [state, dispatch] = useReducer(reducer, undefined, () => loadState(readStorage()))

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* 保存できない環境では無視 */
    }
  }, [state])

  return [state, dispatch] as const
}
