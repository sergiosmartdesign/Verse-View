<template>
  <div class="background-container">
    <canvas ref="canvasEl" class="background-canvas"></canvas>
    
    <div
      v-if="theme.vortexLayer"
      ref="vortexEl"
      :style="theme.vortexLayer.styles">
    </div>

    <div
      v-if="theme.overlayLayer"
      ref="overlayEl"
      :style="theme.overlayLayer.styles">
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  theme: Object
});

// Referencias a los elementos del DOM
const canvasEl = ref(null);
const vortexEl = ref(null);
const overlayEl = ref(null);

onMounted(() => {
  // 1. Inicializa la animación de fondo 3D
  if (canvasEl.value && props.theme.backgroundAnimation?.init) {
    props.theme.backgroundAnimation.init(canvasEl.value, props.theme);
  }

  // 2. Inicializa la nueva capa del vórtice
  if (vortexEl.value && props.theme.vortexLayer?.animation?.init) {
    props.theme.vortexLayer.animation.init(vortexEl.value, props.theme);
  }

  // 3. Inicializa la animación de la capa de superposición (SVG)
  if (overlayEl.value && props.theme.overlayLayer?.animation?.init) {
    props.theme.overlayLayer.animation.init(overlayEl.value, props.theme);
  }
});

onUnmounted(() => {
  // 1. Destruye la animación de fondo 3D
  if (props.theme.backgroundAnimation?.destroy) {
    props.theme.backgroundAnimation.destroy();
  }

  // 2. Destruye la capa del vórtice
  if (props.theme.vortexLayer?.animation?.destroy) {
    props.theme.vortexLayer.animation.destroy();
  }

  // 3. Destruye la animación de la capa de superposición
  if (props.theme.overlayLayer?.animation?.destroy) {
    props.theme.overlayLayer.animation.destroy(overlayEl.value);
  }
});
</script>

<style scoped>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-color: var(--theme-background, black);
}

.background-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
