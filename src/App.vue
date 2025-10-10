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
import { vaderTheme } from './themes/vaderTheme.js';
import gsap from 'gsap';

const themes = {
  matrix: matrixTheme,
  vader: vaderTheme,
};

const activeTheme = ref(matrixTheme);
const themeStyles = ref({});

// Helper function to convert hex to rgb
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

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

  const primaryRgb = hexToRgb(theme.colors.primary);

  // Update CSS custom properties for global styling
  themeStyles.value = {
    '--theme-background': theme.colors.background,
    '--theme-primary': theme.colors.primary,
    '--theme-accent': theme.colors.accent,
    '--theme-box-shadow': `0 0 20px rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.3)`,
    '--theme-box-shadow-focus': `0 0 30px rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.6)`,
    '--theme-placeholder-color': `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.5)`,
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
  background: black;
}
</style>