import { Theme } from '@radix-ui/themes'
import { ControlPanel } from './components/panel/ControlPanel'
import { PreviewPane } from './components/preview/PreviewPane'
import { useAppState } from './state/useAppState'

export default function App() {
  const [state, dispatch] = useAppState()

  return (
    <Theme accentColor="orange" grayColor="slate" radius="medium">
      {/* 用紙サイズ・向きは印刷時の @page で指定する */}
      <style>{`@page { size: A4 ${state.settings.orientation}; margin: 0; }`}</style>
      <div className="app">
        <PreviewPane settings={state.settings} items={state.items} />
        <ControlPanel state={state} dispatch={dispatch} />
      </div>
    </Theme>
  )
}
