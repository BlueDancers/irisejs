import * as components from './index'
import { IButton } from './components/Button'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    IButton: typeof IButton
  }
}
export {}
