<template>
  <div class="search-icon" v-html="svgCode"></div>
</template>

<script setup>
defineProps({
  svgCode: String
});
</script>

<style scoped>
.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon :deep(svg) {
  width: 72px;
  height: 72px;
  display: block;
  filter: drop-shadow(0 0 4px var(--theme-primary)) drop-shadow(0 0 12px var(--theme-primary));
  opacity: 0;
  transform: scale(0.3);
  transition: all 0.8s ease-out;
}

.search-icon.visible :deep(svg) {
  opacity: 1;
  transform: scale(1);
  filter: drop-shadow(0 0 6px var(--theme-primary)) drop-shadow(0 0 12px var(--theme-primary));
}

:deep(.glitching) {
  animation:
    shake 0.5s linear,
    fadeOut 0.3s linear 0.5s forwards;
}

@keyframes shake {
  0%, 100% { transform: translate(0, 0); }
  10%, 30%, 50%, 70%, 90% { transform: translate(-2px, 2px); }
  20%, 40%, 60%, 80% { transform: translate(2px, -2px); }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; visibility: hidden; }
}
</style>