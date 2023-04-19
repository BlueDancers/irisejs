import { App } from 'vue'
import { IButton } from './components/Button'
import { IPopup } from './components/Popup'
import { Loading } from './components/Loading'

// 全局安装
let componentsList = [IButton, IPopup]
export default {
  install: (app: App) => {
    componentsList.forEach((item) => {
      app.component(item.name, item)
    })
  },
}

// 按需引入
export { IButton, IPopup, Loading }
