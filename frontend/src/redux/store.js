import { configureStore as configureStoreToolkit } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { TDBApi } from './api';
import expenseDialogReducer from './features/expenseDialogSlice';
import accountDialogReducer from './features/accountsDialogSlice';
import editExpenseDialogReducer from './features/editExpenseDialogSlice';
import snackbarSliceReducer from './features/snackbarSlice';


 const configureStore = (preloadedState = {}) => configureStoreToolkit({
  reducer: {
    [TDBApi.reducerPath]: TDBApi.reducer,
    expenseDialog: expenseDialogReducer,
    accountDialog: accountDialogReducer,
    editExpenseDialog: editExpenseDialogReducer,
    snackbar: snackbarSliceReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      TDBApi.middleware,
    ]),
});


export default configureStore;


