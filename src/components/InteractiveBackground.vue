<template>
  <div class="background-container">
    <canvas ref="canvasEl" class="background-canvas"></canvas>
    
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
const overlayEl = ref(null);

onMounted(() => {
  // 1. Inicializa la animación de fondo (Three.js)
  if (canvasEl.value && props.theme.backgroundAnimation?.init) {
    props.theme.backgroundAnimation.init(canvasEl.value, props.theme);
  }
  
  // 2. Inicializa la animación de la capa de superposición (SVG)
  if (overlayEl.value && props.theme.overlayLayer?.animation?.init) {
    props.theme.overlayLayer.animation.init(overlayEl.value, props.theme);
  }
});

onUnmounted(() => {
  // 1. Destruye la animación de fondo para liberar memoria
  if (props.theme.backgroundAnimation?.destroy) {
    props.theme.backgroundAnimation.destroy();
  }

  // 2. Destruye la animación de la capa de superposición
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
  z-index: -1; /* Coloca todo el contenedor detrás del contenido principal (barra de búsqueda) */
  background-color: var(--theme-background, black); /* Color de fondo de respaldo */
}

.background-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* El z-index se maneja por el orden en el DOM y el z-index del overlay */
}
</style>