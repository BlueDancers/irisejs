import { createVNode, render, VNode } from 'vue'
import IToast from './index.vue'
import { paramsType } from './types'

/**
 * 创建toast
 * @param params
 * @returns
 */
export function Toast(params: paramsType) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const vnode = createVNode(IToast, {
    ...params,
    onClose: unLoad(),
  })
  render(vnode, div)

  /**
   * 关闭toast
   */
  function close() {
    vnode.component!.exposed!.close().then(() => {
      unLoad()
    })
  }
  /**
   * 卸载
   */
  function unLoad() {
    render(null, div)
    document.body.removeChild(div)
  }

  return {
    close,
  }
}
