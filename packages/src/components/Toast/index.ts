import { createVNode, render, VNode } from 'vue'
import IToast from './index.vue'
import { paramsType } from './types'

const div = document.createElement('div')
// 添加到body上
document.body.appendChild(div)

const renderToast = (vnode: any) => {
  render(null, div) // 清空上一个虚拟dom
  render(vnode, div)
}

// 根据不同的调用创建虚拟dom
export function Toast(params: paramsType) {
  const vnode = createVNode(IToast, params)

  renderToast(vnode)

  function close() {
    vnode.component!.exposed!.close()
  }

  return {
    close,
  }
}
