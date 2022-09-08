import { configureStore as configureStoreToolkit } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { expensesApi } from './api/expensesApi';
import { groupsApi } from './api/groupsApi';
import { tagsApi } from './api/tagsApi';
import { invoicesApi } from './api/invoicesApi';
import { accountsApi } from './api/accountsApi';
import expenseDialogReducer from './features/expenseDialogSlice';
import accountDialogReducer from './features/accountsDialogSlice';
import editExpenseDialogReducer from './features/editExpenseDialogSlice';


 const configureStore = (preloadedState = {}) => configureStoreToolkit({
  reducer: {
    [expensesApi.reducerPath]: expensesApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [invoicesApi.reducerPath]: invoicesApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    expenseDialog: expenseDialogReducer,
    accountDialog: accountDialogReducer,
    editExpenseDialog: editExpenseDialogReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      expensesApi.middleware,
      groupsApi.middleware,
      tagsApi.middleware,
      invoicesApi.middleware,
      accountsApi.middleware
    ]),
});


export default configureStore;


