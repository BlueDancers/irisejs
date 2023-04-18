<template>
  <button class="i-button" :class="buttonStyle"><slot /></button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
defineOptions({ name: 'i-button' })

type ButtonProps = {
  /**
   * 按钮类型
   */
  type?: string
}
const buttonProps = defineProps<ButtonProps>()

const buttonStyle = computed(() => {
  return { [`i-button--${buttonProps.type}`]: buttonProps.type }
})
</script>

<style lang="less" scoped>
.i-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.i-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;

  &:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
}
</style>
