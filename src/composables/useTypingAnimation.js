export function useTypingAnimation(inputRef, phrases, typingSpeed = 45, glitchCallback = null) {
  let idx = 0;

  function typeMessage() {
    if (idx >= phrases.length) {
      startSearchTyping();
      return;
    }
    const text = phrases[idx];
    let i = 0;
    inputRef.value.placeholder = '';

    function typeChar() {
      if (i < text.length) {
        inputRef.value.placeholder += text.charAt(i);
        i++;
        const delay = Math.random() * 60 + 30;
        setTimeout(typeChar, delay);
      } else {
        let holdTime = 2000 + text.length * 15;
        setTimeout(() => {
          inputRef.value.placeholder = '';
          idx++;
          typeMessage();
        }, holdTime);
      }
    }
    typeChar();
  }

  function startSearchTyping() {
    const text = 'Search the Matrix...';
    let i = 0;
    inputRef.value.placeholder = '';

    function typeChar() {
      if (i < text.length) {
        inputRef.value.placeholder += text.charAt(i);
        i++;
        const delay = Math.random() * 60 + 30;
        setTimeout(typeChar, delay);
      } else {
        let showing = true;
        setInterval(() => {
          if (showing) {
            inputRef.value.placeholder = text + ' █';
          } else {
            inputRef.value.placeholder = text;
          }
          showing = !showing;
        }, 500);

        // After 1 second, trigger glitch
        setTimeout(() => {
          if (glitchCallback) glitchCallback();
        }, 1000);
      }
    }
    typeChar();
  }

  return {
    startTyping: () => {
      setTimeout(() => {
        typeMessage();
      }, 3000);
    }
  };
}