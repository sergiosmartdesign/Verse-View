<template>
  <div
    class="search-container"
    :class="`icon-pos-${theme.searchBar.icon?.position || 'inline'}`"
    :style="{
      top: theme.searchBar.container?.position?.top || '40%',
      left: theme.searchBar.container?.position?.left || '50%',
      zIndex: theme.searchBar.container?.zIndex || 1000,
      textAlign: theme.searchBar.container?.textAlign || 'center'
    }"
  >
    <form
      action="https://www.google.com/search"
      method="get"
      target="_blank"
      class="search-box"
      :class="{ visible: isVisible }"
      :style="{
        opacity: isVisible ? (theme.searchBar.loadAnimation?.effects?.opacity?.visible || 1) : (theme.searchBar.loadAnimation?.effects?.opacity?.initial || 0),
        scale: isVisible ? (theme.searchBar.loadAnimation?.effects?.scale?.visible || 1) : (theme.searchBar.loadAnimation?.effects?.scale?.initial || 1.1),
        transition: theme.searchBar.loadAnimation?.effects?.transition || 'opacity 1s ease-out'
      }"
    >
      <input
        ref="inputRef"
        type="text"
        id="searchInput"
        name="q"
        autocomplete="off"
        placeholder=""
        :style="{
          width: theme.searchBar.input?.size?.width || '580px',
          height: theme.searchBar.input?.size?.height || 'auto',
          background: theme.searchBar.input?.background?.color || 'rgba(0, 0, 0, 0.9)',
          border: `${theme.searchBar.input?.border?.width || '2px'} ${theme.searchBar.input?.border?.style || 'solid'} ${theme.searchBar.input?.border?.color || 'currentColor'}`,
          borderRadius: theme.searchBar.input?.shape?.borderRadius || '24px',
          color: theme.searchBar.input?.text?.color || theme.colors.primary,
          fontFamily: theme.searchBar.input?.text?.fontFamily || theme.font.family,
          fontSize: theme.searchBar.input?.text?.fontSize || theme.font.size,
          fontWeight: theme.searchBar.input?.text?.fontWeight || theme.searchBar.input?.effects?.fontWeight || 'normal',
          letterSpacing: theme.searchBar.input?.text?.letterSpacing || 'normal',
          verticalAlign: theme.searchBar.input?.text?.verticalAlign || 'baseline',
          boxShadow: theme.searchBar.input?.effects?.boxShadow || 'var(--theme-box-shadow)',
          transition: theme.searchBar.input?.effects?.transition || 'all 0.3s',
          padding: theme.searchBar.input?.padding || '15px 70px 15px 20px',
          '--placeholder-font-weight': theme.searchBar.placeholder?.text?.fontWeight || 'normal',
          '--placeholder-top': theme.searchBar.placeholder?.position?.top || 'auto',
          '--placeholder-color': theme.searchBar.placeholder?.text?.color || 'var(--theme-placeholder-color)'
        }"
      />
    </form>
    <CharacterIcon
      ref="iconRef"
      :svg-code="theme.searchBar.icon?.svg || theme.searchBar.iconSvg"
      :class="{ visible: iconVisible }"
      class="search-icon-wrapper"
      :theme="theme"
      :icon-visible="iconVisible"
    />
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
    const svg = iconRef.value.$el; // $el ahora es el div wrapper de CharacterIcon
    if (svg) {
      svg.classList.add('glitching');
    }
  }
};

const { startTyping } = useTypingAnimation(inputRef, props.theme.searchBar.placeholder?.animation?.phrases || props.theme.searchBar.placeholder?.phrases || [], props.theme.searchBar.placeholder?.animation?.typingSpeed || props.theme.searchBar.placeholder?.typingSpeed || 45, props.theme.searchBar.placeholder?.animation?.initialText || props.theme.searchBar.placeholder?.initialText || 'Search...', glitchIcon);

onMounted(() => {
  const searchBarDelay = props.theme.searchBar.loadAnimation?.searchBarDelay || 3000;
  const iconDelay = props.theme.searchBar.loadAnimation?.iconDelay || 800;

  setTimeout(() => {
    isVisible.value = true;
    setTimeout(() => {
      iconVisible.value = true;
      startTyping();
    }, iconDelay);
  }, searchBarDelay);
});
</script>

<style scoped>
.search-container {
  position: absolute;
  top: v-bind('theme.searchBar.position?.top || "40%"');
  left: v-bind('theme.searchBar.position?.left || "50%"');
  transform: translate(-50%, -50%);
  z-index: 1000;
  text-align: center;
  display: flex;
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
  width: v-bind('theme.searchBar.size?.width || "580px"');
  outline: none;
  /* La mayoría de los estilos se han movido a :style en el template */
  /* para permitir la personalización completa desde el objeto de tema. */
  /* Solo se mantienen las propiedades que no son dinámicas. */
  caret-color: transparent;
}

#searchInput:focus {
  border-color: var(--theme-primary);
}

#searchInput::placeholder {
  color: var(--placeholder-color, var(--theme-placeholder-color));
  font-weight: var(--placeholder-font-weight);
  position: relative;
  top: var(--placeholder-top);
}

/* Default (inline) positioning */
.search-icon-wrapper {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1; /* Para que esté sobre el input */
}

/* 'above' positioning */
.icon-pos-above {
  flex-direction: column;
  align-items: center; /* Centra el ícono y la barra horizontalmente */
}
.icon-pos-above .search-icon-wrapper {
  position: static;
  transform: none;
  margin-bottom: 10px;
}

/* 'below' positioning */
.icon-pos-below {
  flex-direction: column-reverse;
  align-items: center; /* Centra el ícono y la barra horizontalmente */
}

@media (max-width: 640px) {
  #searchInput {
    width: v-bind('theme.searchBar.size?.mobileWidth || "80vw"');
  }
}
</style>