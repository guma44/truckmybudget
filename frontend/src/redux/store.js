import { configureStore as configureStoreToolkit } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { TDBApi } from './api';
import expenseDialogReducer from './features/expenseDialogSlice';
import accountDialogReducer from './features/accountsDialogSlice';
import groupDialogReducer from './features/groupsDialogSlice';
import tagDialogReducer from './features/tagsDialogSlice';
import editExpenseDialogReducer from './features/editExpenseDialogSlice';
import editTagDialogReducer from './features/editTagDialogSlice';
import editGroupDialogReducer from './features/editGroupDialogSlice';
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
    groupDialog: groupDialogReducer,
    tagDialog: tagDialogReducer,
    editExpenseDialog: editExpenseDialogReducer,
    editTagDialog: editTagDialogReducer,
    editGroupDialog: editGroupDialogReducer,
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


