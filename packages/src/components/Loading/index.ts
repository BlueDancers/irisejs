import { createVNode, render, VNode } from 'vue'
import ILading from './index.vue'

let loadingDom: any; // 判断loading是否存在
let vnode: VNode | null = null; // loading虚拟节点
let div: HTMLDivElement; // loading挂载点

/**  
 * 创建loading
 * @param params
 * @returns
 */
export function showLoading(params?: any) {
  // 若 loading 已存在，卸载之前的loading，重新创建
  if (loadingDom) unLoad()

  div = document.createElement('div')
  document.body.appendChild(div)
  vnode = createVNode(ILading, {
    ...params,
    onClose: unLoad,
  })
  render(vnode, div)
  loadingDom = vnode

  /**
   * 关闭loading
   */
  function close() {
    if (!vnode) return
    vnode.component!.exposed!.close().then(() => {
      unLoad()
    })
    vnode = null;
    loadingDom = null;
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

