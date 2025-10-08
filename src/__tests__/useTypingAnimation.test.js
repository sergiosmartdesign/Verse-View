import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTypingAnimation } from '../composables/useTypingAnimation.js';

describe('useTypingAnimation', () => {
  let mockInputRef;
  let phrases;
  let typingSpeed;
  let initialText;
  let glitchCallback;

  beforeEach(() => {
    mockInputRef = { value: { placeholder: '' } };
    phrases = ['Hello', 'World'];
    typingSpeed = 10; // Fast for testing
    initialText = 'Search here...';
    glitchCallback = vi.fn();
  });

  it('should start typing animation and eventually set initialText as placeholder', async () => {
    const { startTyping } = useTypingAnimation(mockInputRef, phrases, typingSpeed, initialText, glitchCallback);

    startTyping();

    // Wait for the animation to complete (phrases + initial text)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // After all phrases, it should set to initialText
    expect(mockInputRef.value.placeholder).toBe(initialText + ' █');
  });

  it('should call glitchCallback after typing initialText', async () => {
    const { startTyping } = useTypingAnimation(mockInputRef, phrases, typingSpeed, initialText, glitchCallback);

    startTyping();

    await new Promise(resolve => setTimeout(resolve, 1500));

    expect(glitchCallback).toHaveBeenCalled();
  });
});