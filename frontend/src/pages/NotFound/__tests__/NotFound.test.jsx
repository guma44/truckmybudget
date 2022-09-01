/* eslint-disable react/jsx-props-no-spreading */
import { mount } from 'enzyme';

import { MemoryRouter } from 'react-router-dom';

import NotFound from '..';

// test helper
const getWrappedNotFound = (
  props = {
    location: {
      pathname: '/not-found-url',
    },
  }
) => {
  const wrapper = mount(
    <MemoryRouter>
      <NotFound {...props} />
    </MemoryRouter>
  );
  return wrapper.find(NotFound);
};

it('should render', () => {
  expect(getWrappedNotFound().exists()).toBeTruthy();
});