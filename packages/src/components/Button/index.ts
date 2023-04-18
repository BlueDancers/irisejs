import type { App } from 'vue'
import IButton from './index.vue'

IButton.install = function (app: App) {
  app.component(IButton.name, IButton)
}

export { IButton }
