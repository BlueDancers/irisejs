<template>
  <div>
    <i-button type="primary" @click="openPopup">打开Popup</i-button>
    <i-popup ref="popupRef" bgColor="rgba(9, 8, 8, 0.3)" :zIndex="0">
      <div>这是一个弹框</div>
    </i-popup>
    <i-button type="primary" @click="openToast">打开Toast</i-button>
  </div>
</template>

<script setup lang="ts">
import { IButton, IPopup, Toast } from '@irises/ui'
import { ref } from 'vue'

const popupRef = ref()

const openPopup = () => {
  popupRef.value.open()
}

function openToast() {
  let toast = Toast({
    title: '测试',
    mask: true,
  })

  setTimeout(() => toast.close(), 2000)
}
</script>

<style scoped></style>
