<template>
  <canvas ref="canvas" class="background-canvas" :style="{ backgroundColor: theme.colors.background }"></canvas>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  theme: Object
});

const canvas = ref(null);
let animationInstance = null;

onMounted(() => {
  if (canvas.value && props.theme.backgroundAnimation.init) {
    props.theme.backgroundAnimation.init(canvas.value, props.theme);
    animationInstance = props.theme.backgroundAnimation;
  }
});

onUnmounted(() => {
  if (animationInstance && animationInstance.destroy) {
    animationInstance.destroy();
  }
});
</script>

<style scoped>
.background-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>