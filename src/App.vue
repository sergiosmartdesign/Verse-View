<template>
  <div id="app" :style="themeStyles">
    <ThemeSelector @theme-changed="handleThemeChange" />
    <InteractiveBackground :key="activeTheme.themeId + '-bg'" :theme="activeTheme" id="interactive-background" />
    <ThemedSearchBar :key="activeTheme.themeId + '-search'" :theme="activeTheme" id="themed-search-bar" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import ThemeSelector from './components/ThemeSelector.vue';
import InteractiveBackground from './components/InteractiveBackground.vue';
import ThemedSearchBar from './components/ThemedSearchBar.vue';
import { matrixTheme } from './themes/matrixTheme.js';
import { futuramaTheme } from './themes/futuramaTheme.js';
import gsap from 'gsap';

const themes = {
  matrix: matrixTheme,
  futurama: futuramaTheme,
};

const activeTheme = ref(matrixTheme);
const themeStyles = ref({});

// Function to apply theme metadata and styles
function applyTheme(theme) {
  // Apply page metadata
  document.title = theme.pageTitle;
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = theme.favicon;

  // Update CSS custom properties for global styling
  themeStyles.value = {
    '--theme-background': theme.colors.background,
    '--theme-primary': theme.colors.primary,
    '--theme-accent': theme.colors.accent,
    'font-family': theme.font.family,
    'font-size': theme.font.size,
    'color': theme.colors.primary,
    'background-color': theme.colors.background,
  };
}

function handleThemeChange(newTheme) {
  if (newTheme.themeId === activeTheme.value.themeId) return;

  gsap.to(['#themed-search-bar', '#interactive-background'], {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      activeTheme.value = newTheme;
    },
  });
}

// On component mount, check for saved theme and apply it
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const themeIdFromUrl = urlParams.get('theme');
  const themeIdFromStorage = localStorage.getItem('activeThemeId');
  const initialThemeId = themeIdFromUrl || themeIdFromStorage || 'matrix';
  
  if (themes[initialThemeId]) {
    activeTheme.value = themes[initialThemeId];
  }
  
  applyTheme(activeTheme.value);
});

// Watch for changes and update URL/storage/metadata
watch(activeTheme, (newTheme) => {
  // Animate in the new theme elements
  gsap.fromTo(['#themed-search-bar', '#interactive-background'],
    { opacity: 0 },
    { opacity: 1, duration: 0.5, delay: 0.1 }
  );

  applyTheme(newTheme);
  localStorage.setItem('activeThemeId', newTheme.themeId);
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('theme', newTheme.themeId);
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>