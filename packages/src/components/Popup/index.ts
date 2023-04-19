import type { App } from 'vue'
import IPopup from './index.vue'

IPopup.install = function (app: App) {
  app.component(IPopup.name, IPopup)
}

export { IPopup }
