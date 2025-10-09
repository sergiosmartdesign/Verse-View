import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTypingAnimation } from '../composables/useTypingAnimation.js';

describe('useTypingAnimation', () => {
  let mockInputRef;
  let phrases;
  let typingSpeed;
  let initialText;
  let glitchCallback;

  beforeEach(() => {
    vi.useFakeTimers();
    mockInputRef = { value: { placeholder: '' } };
    phrases = ['Hello', 'World'];
    typingSpeed = 10; // Fast for testing
    initialText = 'Search here...';
    glitchCallback = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with empty placeholder', () => {
    const { startTyping } = useTypingAnimation(mockInputRef, phrases, typingSpeed, initialText, glitchCallback);
    expect(mockInputRef.value.placeholder).toBe('');
  });

  it('should start typing phrases after initial delay', async () => {
    const { startTyping } = useTypingAnimation(mockInputRef, phrases, typingSpeed, initialText, glitchCallback);

    startTyping();

    // Advance past the initial 3s delay
    await vi.advanceTimersByTimeAsync(3000);

    // Should start typing the first phrase
    expect(mockInputRef.value.placeholder).toBe('H');
  });

  it('should complete typing all phrases and start initial text', async () => {
    const { startTyping } = useTypingAnimation(mockInputRef, phrases, typingSpeed, initialText, glitchCallback);

    startTyping();

    // Advance through all timeouts (this will trigger the setInterval but we check before it loops infinitely)
    await vi.advanceTimersByTimeAsync(10000);

    // Should have started the initial text typing
    expect(glitchCallback).toHaveBeenCalled();
  });
});