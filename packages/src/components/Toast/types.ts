export type paramsType = {
  /**
   * 提示问题
   */
  title: string
  /**
   * 提示类型
   */
  icon?: 'none' | 'success' | 'error'
  /**
   * 是否存在蒙版
   */
  mask?: boolean
  /**
   * 显示时间
   */
  duration?: number
}
