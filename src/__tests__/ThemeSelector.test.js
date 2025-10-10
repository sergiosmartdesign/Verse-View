import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ThemeSelector from '../components/ThemeSelector.vue';
import { matrixTheme } from '../themes/matrixTheme.js';
import { vaderTheme } from '../themes/vaderTheme.js';

describe('ThemeSelector', () => {
  it('should emit themeChanged event when button is clicked', async () => {
    const wrapper = mount(ThemeSelector);

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(2);

    // Click on Vader button
    await buttons[1].trigger('click');

    expect(wrapper.emitted('themeChanged')).toBeTruthy();
    expect(wrapper.emitted('themeChanged')[0]).toEqual([vaderTheme]);
  });

  it('should display correct theme names', () => {
    const wrapper = mount(ThemeSelector);

    const buttons = wrapper.findAll('button');
    expect(buttons[0].text()).toBe('The Matrix');
    expect(buttons[1].text()).toBe('Vader');
  });
});