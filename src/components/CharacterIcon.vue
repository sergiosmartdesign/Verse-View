<template>
  <div
    class="search-icon"
    :style="{
      width: theme?.searchBar?.icon?.size?.width || '72px',
      height: theme?.searchBar?.icon?.size?.height || '72px'
    }"
  >
    <img
      v-if="isSvgFile"
      :src="svgCode"
      alt="Character Icon"
      :style="{
        width: '100%',
        height: '100%',
        filter: theme?.searchBar?.icon?.effects?.filter || 'drop-shadow(0 0 4px var(--theme-primary)) drop-shadow(0 0 12px var(--theme-primary))',
        opacity: iconVisible ? (theme?.searchBar?.icon?.effects?.opacity?.visible || 1) : (theme?.searchBar?.icon?.effects?.opacity?.initial || 0),
        transform: iconVisible ? (theme?.searchBar?.icon?.effects?.transform?.visible || 'scale(1)') : (theme?.searchBar?.icon?.effects?.transform?.initial || 'scale(0.3)'),
        transition: theme?.searchBar?.icon?.effects?.transition || 'all 0.8s ease-out'
      }"
    />
    <div
      v-else
      v-html="svgCode"
      :style="{
        width: '100%',
        height: '100%',
        filter: theme?.searchBar?.icon?.effects?.filter || 'drop-shadow(0 0 4px var(--theme-primary)) drop-shadow(0 0 12px var(--theme-primary))',
        opacity: iconVisible ? (theme?.searchBar?.icon?.effects?.opacity?.visible || 1) : (theme?.searchBar?.icon?.effects?.opacity?.initial || 0),
        transform: iconVisible ? (theme?.searchBar?.icon?.effects?.transform?.visible || 'scale(1)') : (theme?.searchBar?.icon?.effects?.transform?.initial || 'scale(0.3)'),
        transition: theme?.searchBar?.icon?.effects?.transition || 'all 0.8s ease-out'
      }"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  svgCode: String,
  theme: Object,
  iconVisible: {
    type: Boolean,
    default: false
  }
});

const isSvgFile = computed(() => {
  return props.svgCode && props.svgCode.startsWith('/');
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

/* Icon styling is now handled via inline styles for full themeability */

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