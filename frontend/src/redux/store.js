import { configureStore as configureStoreToolkit } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { expensesApi } from './api/expensesApi';
import { groupsApi } from './api/groupsApi';
import { tagsApi } from './api/tagsApi';
import { invoicesApi } from './api/invoicesApi';
import expenseDialogReducer from './features/expenseDialogSlice';


 const configureStore = (preloadedState = {}) => configureStoreToolkit({
  reducer: {
    [expensesApi.reducerPath]: expensesApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [invoicesApi.reducerPath]: invoicesApi.reducer,
    expenseDialog: expenseDialogReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      expensesApi.middleware,
      groupsApi.middleware,
      tagsApi.middleware,
      invoicesApi.middleware
    ]),
});


export default configureStore;


