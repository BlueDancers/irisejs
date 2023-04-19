<template>
  <view class="i_popup" v-if="status != 0" @touchmove.stop.prevent="">
    <view
      class="mask"
      :style="`background-color: ${props.bgColor};z-index:${zIndex}`"
      v-if="[2].includes(status)"
      @click="maskHander"
    >
    </view>
    <view
      class="base_style"
      :style="`z-index:${zIndex};`"
      :class="`${popupClass}`"
      @click="maskHander"
    >
      <view @click.stop>
        <slot :status="status"></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue'

defineOptions({ name: 'i-popup' })
/**
 * center中间淡入淡出
 * bottom 底部滑入滑出
 */
interface popupInter {
  /**
   * center中间淡入淡出
   * bottom 底部滑入滑出
   */
  type?: 'center' | 'bottom'
  /**
   * 背景颜色
   */
  bgColor?: string
  /**
   * 弹框的层级
   */
  zIndex?: number
  /**
   * 点击背景是否可以关闭
   */
  maskClose?: boolean
}

/**
 * 显示状态 0未显示 1过渡到关闭 2过渡到显示
 */
type statusType = 0 | 1 | 2

const props = withDefaults(defineProps<popupInter>(), {
  type: 'center',
  bgColor: 'rgba(9, 8, 8, 0.6)',
  zIndex: 0,
  maskClose: true,
})

const status: Ref<statusType> = ref(0)

const popupClass = computed(() => {
  if (['bottom', 'center'].includes(props.type)) {
    let data = {
      0: '',
      1: `slide-out-${props.type}`,
      2: `slide-in-${props.type}`,
    }
    return `popup_${props.type} ${data[status.value]}`
  }
})

function open() {
  status.value = 2
}

/**
 * 点击背景
 */
function maskHander() {
  if (props.maskClose) {
    close()
  }
}

/**
 * 关闭pop组件
 * @param place 触发该方法的位置锚点
 */
function close() {
  if (status.value == 2) {
    status.value = 1
    setTimeout(() => {
      status.value = 0
    }, 280)
  }
}

defineExpose({
  open,
  close,
})
</script>

<style lang="less" scoped>
.i_popup {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 0;
  }
  .base_style {
    z-index: 100;
  }

  .popup_center {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  .popup_bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
  }

  // 中间进入
  .slide-in-center {
    animation: puff-in-center 0.24s cubic-bezier(0.47, 0, 0.745, 0.715) forwards;
  }
  // 中间离开
  .slide-out-center {
    animation: puff-out-center 0.24s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
  // 从下方进入
  .slide-in-bottom {
    animation: slide-in-bottom 0.24s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      forwards;
  }
  // 从下方离开
  .slide-out-bottom {
    animation: slide-out-bottom 0.24s cubic-bezier(0.55, 0.085, 0.68, 0.53)
      forwards;
  }

  @keyframes slide-in-bottom {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes slide-out-bottom {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }

  @keyframes puff-out-center {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.1);
      opacity: 0;
    }
  }
  @keyframes puff-in-center {
    0% {
      transform: scale(1.1);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
