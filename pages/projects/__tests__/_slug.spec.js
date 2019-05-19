import { shallowMount } from '@vue/test-utils';
import ProjectDetails from '../_slug';

describe('Component', () => {

  const wrapper = shallowMount(ProjectDetails);

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('contains project name', () => {
    expect(wrapper.find('h1').text()).toBe('New Talents');
  });
});
