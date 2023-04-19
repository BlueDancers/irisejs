import { IButton } from './components/Button'
import { IPopup } from './components/Popup'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    IButton: typeof IButton
    IPopup: typeof IPopup
  }
}
export {}
