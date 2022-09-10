import { configureStore as configureStoreToolkit } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { TDBApi } from './api';
import expenseDialogReducer from './features/expenseDialogSlice';
import accountDialogReducer from './features/accountsDialogSlice';
import editExpenseDialogReducer from './features/editExpenseDialogSlice';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import userReducer from './features/userSlice';


 const configureStore = (preloadedState = {}) => configureStoreToolkit({
  reducer: {
    [TDBApi.reducerPath]: TDBApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
    expenseDialog: expenseDialogReducer,
    accountDialog: accountDialogReducer,
    editExpenseDialog: editExpenseDialogReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      TDBApi.middleware,
      authApi.middleware,
      userApi.middleware
    ]),
});


export default configureStore;


