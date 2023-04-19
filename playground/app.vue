<template>
  <div>
    <i-button type="primary" @click="openPopup">这是一个</i-button>
    <i-popup ref="popupRef" bgColor="rgba(9, 8, 8, 0.3)" :zIndex="0">
      <div>这是一个弹框</div>
    </i-popup>
  </div>
</template>

<script setup lang="ts">
import { IButton, IPopup } from '@irises/ui'

import { ref } from 'vue'

const popupRef = ref()

const openPopup = () => {
  popupRef.value.open()
}
</script>

<style scoped></style>
