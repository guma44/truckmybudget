import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { Provider } from 'react-redux';

import HomeView from '..';
import { Global } from '../../../types';

declare const global: Global;

const mockStore = configureStore([]);

it('should render', () => {
  const store = mockStore({
    application: {
      user: null,
    },
  });
  shallow(
    <Provider store={store}>
      <HomeView />
    </Provider>
  );
});

it('should render with user', () => {
  const store = mockStore({
    application: {
      user: global.testUtils.getMockedUser(),
    },
  });
  shallow(
    <Provider store={store}>
      <HomeView />
    </Provider>
  );
});

/**
 * Extend this test case to match your HomeView implementation
 */
