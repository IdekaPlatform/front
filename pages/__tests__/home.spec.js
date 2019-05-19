import { shallowMount } from '@vue/test-utils';
import Home from '../home';

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
