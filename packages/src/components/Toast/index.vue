<template>
  <!--  自定义动画 -->
  <transition>
    <div v-if="isShow">
      <!-- 遮罩层 -->
      <div class="mask" v-if="mask"></div>
      <div class="tost_box" :style="icon == 'none' ? `padding:10px 20px;` : 'padding:16px 20px;'">
        <img v-if="icon && icon != 'none'" class="tost_icon" :src="ICON_STYLE[icon]" />
        <div class="text">{{ props.title }}</div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

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

const ICON_STYLE = {
  error:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAXVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9RKvvlAAAAHnRSTlMAiZiQpIWelZqNg6GogJKmbt6qUGSxtRZ5FclcOhfmWk3qAAAC/UlEQVR42uzVjU7CQBDE8YECtS3lQ0EFzL7/YxpNMEhHaVjP6zT7f4NfcjeLKIqiKIqiKIqiKIqiKIqiKJLtrTzacndAtl5Oxf71Cd429tl2g0xttvbRM3w92bklsvRo53zvyiyvZGlfFXA0tQwS7jDz/JOjXbaGI7fDatyfWU7J2r6193y1LBLusAr3t7OrZnDkc9jJc4y22SQzu2p78N9Dv8TvsI3zIGWQUMfSP4HXNegk4MgiaZhDUNJ1rBMMYVci42CSBZLVpJyX2f9JFswhKKEOQQl1CEq4I7nkIb2jQYKa1JIH7oCa5GeHlsTl8Eum6RwLJGyRSjK94VCR3HZoSDI4mKR0O3qNyPAlZQ4HH5hS0kElkg4qkXQwyQp3tfKMYJrhX0k6mKSQdPyJpBiCg0q8jhJZKrsSSQeVSDqYpELPqiE5HJKKzHfWVl2JpINKJB1MMsGNJmQkBlDRlUg6qETSQSWSDirp76gwoLqSuaQDqPpJ5kN3UImkg0puOyYYYEQi6WAfucZFtYqDSiQdVCLpoBJJB5O0ANCSIRh4865E0kElkg4m0XT0kNQQaT4SB1CPxAHUI3H8ImkhVj0SB9COxAG0I3G8t3cHOwjCQBRFR4w7V4LoRv//M3XjShNjCbGcvPsHkwAt7Zs7TCHKo6W87MrnV1kQlS2KsmlUtvHKj5Xyq6scPijHQcoBnXJkqhxiK9cKykWPcvWmXIYq19Pvdew2GRhQIhxKqEaJOSnBMyUKqIQzlbisEmBWIuVKyF9pu1AaYZTWpA9tb5tsFlPa95SGylVaXL9X0nMdTvO0087+rAQRDLSpEiKvwHQiiuBFUe4oEiRFS6WIwhR1myLTU/SGinBSUYD+opftWcqqaHIVcbGikj42PbL9yb0V3boiwGdGEnQ1JGKqdoaexnYM1c5ZGaRybf1wrLEUX6udURk2VPMKdTQuY3Mt4v7iVL/Tz0CuJ/s+RqTtazHjYR6mS/2N2zScD2OFEEIIIYQQQgghhBBCCJvlASONHAliOjFmAAAAAElFTkSuQmCC',
  success:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAdVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////li2ZAAAAAJnRSTlMAVqtVqtDMxMAMyLAXvCEeEwW5JwnVtrMlGxBdKZ/wj4M75Uwybybvs4EAAAIiSURBVHja7dzrThsxFEXhTa5QeiVNb2luQP3+j9gRCi2ZsWEGouhsa60HsPTJ/medIyIiIiIiIiIiIiIiIiIiIiKint1tl8vtWO4t1umh2V7WXWzSYysZd5Ge9Em2HTnSSK4dO9KtTHtwVPC2Oo50L8e6jvRVhmUcUxmWcaQ/8ivnuJZfOcfyt+zCESscsco5pgvZhSNWOGKVdfyQXThiVbNjhqNvOIY4PsouHLHCEauaHe9w9A3HEIfhHwiOWOGIFY5Y5Rzzn7ILR6zO5Li/UitHx359m9LNTk+ydKwOB1/u9ZilY5L+Ndahczjen/4+2hJLh+apLTmH4/LkDm3SscTVsUitxp6OLiSNLR3SpiuxdGieuhJHh+5SRmLokLY5iaFDGpUlp3d81v9MJD0cFpKc40PbYSDp6Qgv6e0ILhngCC0Z5AgsGegIKxnsCCrJOn7puUJKIjgKkjc7bl52hJNEcRQkho6CxNBRkBg6CpLXOq7UvyCSeI6SZLjj21BHAElMR0Fi6ChIDB0FiaGjIDF0FCSGjoKkl+N7KEdB0scRbgI9KzF0FCSGjoLE0FGQGDoKEkNHQVJwXAd2FCR5xxeFLidxdGQllo5GUomjkVTiaCSVOKRJJY5GUonjOcnIynEkMd8SN6nE0UgqcTSSShyNpBJHI6nEcSyZyLlJJQ5pd3Ds5N5qPU2ztfUCWyIiIiIiIiIiIiIiIiIiIiJ6e38BYCHHqe/6KukAAAAASUVORK5CYII=',
}

const emit = defineEmits<{
  (event: 'close'): void
}>()

const props = withDefaults(defineProps<paramsType>(), {
  title: '',
  icon: 'none',
  mask: false,
  duration: 1500,
})

const isShow = ref(false) // 是否显示
const timeOutFun = ref() // 关闭定时器

// 注册定时器控制组件的消失
onMounted(() => {
  isShow.value = true
  timeOutFun.value = setTimeout(() => {
    isShow.value = false
    setTimeout(() => {
      emit('close')
    }, 200)
  }, props.duration)
})

function close() {
  clearTimeout(timeOutFun.value)
  return new Promise((resolve, reject) => {
    isShow.value = false
    setTimeout(() => {
      resolve(null)
    }, 200)
  })
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
  background-color: rgba(0, 0, 0, 0);
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
    margin: 0 16px 10px;
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
  transition: opacity 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
