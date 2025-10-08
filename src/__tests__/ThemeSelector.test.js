import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ThemeSelector from '../components/ThemeSelector.vue';
import { matrixTheme } from '../themes/matrixTheme.js';
import { futuramaTheme } from '../themes/futuramaTheme.js';

describe('ThemeSelector', () => {
  it('should emit themeChanged event when button is clicked', async () => {
    const wrapper = mount(ThemeSelector);

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(2);

    // Click on Futurama button
    await buttons[1].trigger('click');

    expect(wrapper.emitted('themeChanged')).toBeTruthy();
    expect(wrapper.emitted('themeChanged')[0]).toEqual([futuramaTheme]);
  });

  it('should display correct theme names', () => {
    const wrapper = mount(ThemeSelector);

    const buttons = wrapper.findAll('button');
    expect(buttons[0].text()).toBe('The Matrix');
    expect(buttons[1].text()).toBe('Futurama');
  });
});