<template>
  <div class="background-container">
    <canvas ref="canvasEl" class="background-canvas"></canvas>

    <!-- El canvas del vortex ha sido eliminado -->

    <div
      v-if="theme.overlayLayer"
      ref="overlayEl"
      :style="theme.overlayLayer.styles">
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, defineProps } from 'vue';

const props = defineProps({
  theme: Object
});

// Referencias a los elementos del DOM
const canvasEl = ref(null);
// La referencia a vortexEl ha sido eliminada
const overlayEl = ref(null);

onMounted(() => {
  // 1. Inicializa la animación de fondo (que ahora incluye el túnel)
  if (canvasEl.value && props.theme.backgroundAnimation?.init) {
    props.theme.backgroundAnimation.init(canvasEl.value, props.theme);
  }

  // 2. La inicialización del vortex ha sido eliminada

  // 3. Inicializa la animación de la capa de superposición (SVG)
  if (overlayEl.value && props.theme.overlayLayer?.animation?.init) {
    props.theme.overlayLayer.animation.init(overlayEl.value, props.theme);
  }
});

onUnmounted(() => {
  // 1. Destruye la animación de fondo para liberar memoria
  if (props.theme.backgroundAnimation?.destroy) {
    props.theme.backgroundAnimation.destroy();
  }

  // 2. La destrucción del vortex ha sido eliminada

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