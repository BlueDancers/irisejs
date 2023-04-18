import * as components from './index'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    IButton: typeof components.Button
  }
}
export {}
