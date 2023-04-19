<template>
  <!--  自定义动画 -->
  <transition>
    <div v-if="isShow">
      <!-- 遮罩层 -->
      <div class="mask" v-if="mask"></div>
      <div
        class="tost_box"
        :style="icon == 'none' ? `padding:10px 20px;` : 'padding:16px 20px;'"
      >
        <img
          v-if="icon && icon != 'none'"
          class="tost_icon"
          :src="ICON_STYLE[icon]"
        />
        <div class="text">{{ props.title }}</div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ICON_STYLE } from './const'

type paramsType = {
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

const props = withDefaults(defineProps<paramsType>(), {
  title: '',
  icon: 'none',
  mask: false,
  duration: 1500,
})

const isShow = ref(false) // 是否显示

// 注册定时器控制组件的消失
onMounted(() => {
  isShow.value = true
  setTimeout(() => {
    isShow.value = false
  }, props.duration)
})

function close() {
  isShow.value = false
}

defineExpose({
  close,
})
</script>

<style scoped lang="less">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
}

.tost_box {
  position: fixed;
  z-index: 99999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(17, 17, 17, 0.7);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .tost_icon {
    margin: 0 16px;
    width: 56px;
    height: 56px;
  }
  .text {
    color: white;
    font-size: 15px;
    max-width: 200px;
    text-align: center;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
