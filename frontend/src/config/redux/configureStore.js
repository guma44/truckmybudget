import { configureStore as configureStoreToolkit } from '@reduxjs/toolkit';

import rootReducer from '../../entities/rootReducer';

/**
 * Using the configureStore functionality from @redux-toolkit npm oackage
 * Additional information about config options and default included is
 * available here:
 * - configureStore options: https://redux-toolkit.js.org/api/configureStore
 * - default included options: https://redux-toolkit.js.org/api/getDefaultMiddleware
 *
 * @param {*} preloadedState
 * @returns
 */
 const configureStore = (preloadedState = {}) => configureStoreToolkit({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

export default configureStore;
