import { compose } from 'redux';

import configureStore from '../configureStore';

it('should create redux store', () => {
  const store = configureStore();

  // check store
  expect(store).toBeTruthy();

  // check basic store methods
  const { dispatch, getState, subscribe } = store;
  expect(dispatch).toBeInstanceOf(Function);
  expect(getState).toBeInstanceOf(Function);
  expect(subscribe).toBeInstanceOf(Function);
});
