<template>
  <div class="search-container">
    <form action="https://www.google.com/search" method="get" target="_blank" class="search-box" :class="{ visible: isVisible }">
      <input
        ref="inputRef"
        type="text"
        id="searchInput"
        name="q"
        autocomplete="off"
        :style="{ color: theme.colors.primary, borderColor: theme.colors.primary, fontFamily: theme.font.family, fontSize: theme.font.size }"
      />
      <CharacterIcon ref="iconRef" :svg-code="theme.searchBar.iconSvg" :class="{ visible: iconVisible }" />
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CharacterIcon from './CharacterIcon.vue';
import { useTypingAnimation } from '../composables/useTypingAnimation.js';

const props = defineProps({
  theme: Object
});

const inputRef = ref(null);
const iconRef = ref(null);
const isVisible = ref(false);
const iconVisible = ref(false);

const glitchIcon = () => {
  if (iconRef.value) {
    const svg = iconRef.value.$el.querySelector('svg');
    if (svg) {
      svg.classList.add('glitching');
    }
  }
};

const { startTyping } = useTypingAnimation(inputRef, props.theme.searchBar.placeholder.phrases, props.theme.searchBar.placeholder.typingSpeed, props.theme.searchBar.placeholder.initialText, glitchIcon);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
    setTimeout(() => {
      iconVisible.value = true;
      startTyping();
    }, 800);
  }, 3000);
});
</script>

<style scoped>
.search-container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  text-align: center;
}

.search-box {
  opacity: 0;
  pointer-events: none;
  transition: opacity 1s ease-out;
}

.search-box.visible {
  opacity: 1;
  pointer-events: auto;
}

#searchInput {
  width: 580px;
  padding: 15px 70px 15px 20px;
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid;
  border-radius: 24px;
  outline: none;
  box-shadow: var(--theme-box-shadow);
  transition: all 0.3s;
  caret-color: transparent;
}

#searchInput:focus {
  box-shadow: var(--theme-box-shadow-focus);
}

#searchInput::placeholder {
  color: var(--theme-placeholder-color);
}

@media (max-width: 640px) {
  #searchInput {
    width: 80vw;
  }
}
</style>