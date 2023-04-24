<template>
  <div>
    <i-button type="primary" @click="openPopup">打开Popup</i-button>
    <i-popup ref="popupRef" bgColor="rgba(9, 8, 8, 0.3)" :zIndex="0">
      <div>这是一个弹框</div>
    </i-popup>
    <i-button type="primary" @click="openToast">打开Toast</i-button>
    <div>
      <i-button type="primary" @click="openLoading">打开loading</i-button>
      <i-button type="primary" @click="closeLoading">关闭loading</i-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IButton, IPopup, showLoading, Toast } from 'irise'
import { ref } from 'vue'

const popupRef = ref()

const openPopup = () => {
  popupRef.value.open()
}

let loading: any

function openToast() {
  let toast = Toast({
    title: '测试',
    mask: true,
    duration: 3000,
  })

  // setTimeout(() => toast.close(), 2000)
}

function openLoading() {
  loading = showLoading({
    title: '加载中',
  })
}

function closeLoading() {
  loading.close()
}
</script>

<style scoped></style>
