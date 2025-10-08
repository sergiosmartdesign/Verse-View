<template>
  <div class="theme-switcher">
    <button v-for="theme in availableThemes" :key="theme.themeId" @click="selectTheme(theme)">
      {{ theme.displayName }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { matrixTheme } from '../themes/matrixTheme';
import { futuramaTheme } from '../themes/futuramaTheme.js';
import { vaderTheme } from '../themes/vaderTheme.js';

const availableThemes = [matrixTheme, futuramaTheme, vaderTheme];
const activeTheme = ref(matrixTheme);

// This function should be emitted to the parent App component
const emit = defineEmits(['themeChanged']);
function selectTheme(theme) {
  activeTheme.value = theme;
  emit('themeChanged', theme);
}
</script>

<style scoped>
.theme-switcher {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1001;
}

.theme-switcher button {
  margin: 0;
  padding: 7px 10px;
  background: rgba(0, 0, 0, 0.7);
  color: var(--theme-primary, #00ff41); /* Fallback to Matrix green */
  border: 1px solid var(--theme-primary, #00ff41);
  border-radius: 5px;
  cursor: pointer;
  font-family: monospace;
}

.theme-switcher button:hover {
  background: var(--theme-primary, #00ff41);
  color: var(--theme-background, #000);
}
</style>