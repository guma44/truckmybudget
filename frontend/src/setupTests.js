import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import jestFetchMock from 'jest-fetch-mock';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { configure } from 'enzyme';

// setup enzyme
configure({ adapter: new Adapter() });

// setup fetch mock
global.fetch = jestFetchMock;

// basic helpers
const createMockStore = (
  middleware = [
    // add your redux middleware here
    thunk,
  ]
) => configureMockStore(middleware);

const getMockedUser = () => ({
  username: 'TESTUSR1',
});


// create and export testUtils
const testUtils = {
  createMockStore,
  getMockedUser,
};
