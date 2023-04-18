import { App } from 'vue'
import { IButton } from './components/Button'

// 全局安装
let componentsList = [IButton]
export default {
  install: (app: App) => {
    componentsList.forEach((item) => {
      app.component(item.name, item)
    })
  },
}

// 按需引入
export { IButton }
