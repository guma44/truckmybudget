// /* eslint-disable no-param-reassign */
// import { Action, Dispatch } from 'redux';
// import axios from "axios";
// import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit';
// /**
//  * define action creators
//  */

// export const appStatusSet = createAction('app/appStatusSet');
// export const appUserSet = createAction('app/appUserSet');
// export const expensesStatusSet = createAction('app/dataStatusSet');
// export const expensesDataSet = createAction('app/expensesDataSet');
// export const groupsDataSet = createAction('app/groupsDataSet');
// export const tagsDataSet = createAction('app/tagsDataSet');
// export const formDialogOpened = createAction('app/formDialogOpened');
// export const toggleSnackbar = createAction('app/toggleSnackbar');
// export const addExpenseStatusSet = createAction('app/addExpenseStatusSet');

// /**
//  * define complex actions
//  */
// export const loadApp = () => (async (dispatch) => {
//   dispatch(appStatusSet("APP_WILL_LOAD"));

//   // try to auth user
//   try {
//     const user = {"username": "Rafal"};
//     dispatch(appUserSet(user));
//   } catch (error) {
//     dispatch(appUserSet(null));
//   }

//   return dispatch(appStatusSet("APP_DID_LOAD"));
// });


// // export const loadExpenseData = () => (async (dispatch) => {
// //   dispatch(expensesStatusSet("EXPENSES_WILL_LOAD"));

// //   try {
// //     const response = await axios.get("http://localhost:8000/expenses");
// //     dispatch(expensesDataSet(response.data));
// //   }
// //   catch (error) {
// //     console.log(error);
// //     dispatch(expensesDataSet([]));
// //   }

// //   return dispatch(expensesStatusSet("EXPENSES_DID_LOAD"));
// // });

// // export const addExpense = (data) => (async (dispatch) => {
// //   dispatch(addExpenseStatusSet("EXPENSE_WILL_ADD"));
// //   // try to upload file
// //   try {
// //     const data = {
// //       name: data.name,
// //       price: data.price,
// //       date: data.date,
// //       description: data.description,
// //       tags: data.tags ? data.tags.map((item) => item._id) : [],
// //       group: data.group ? data.group._id : ""
// //     };
// //     const response = await axios.post("http://localhost:8000/expenses", data);
// //     console.log(response);
// //   } catch (error) {
// //     console.log(error);
// //   }
// //   loadExpenseData();
// //   return dispatch(addExpenseStatusSet("APP_DID_ADDED"));
// // });

// // export const loadTagData = () => (async (dispatch) => {
// //   try {
// //     const response = await axios.get("http://localhost:8000/tags");
// //     dispatch(tagsDataSet(response.data));
// //   }
// //   catch (error) {
// //     console.log(error);
// //     dispatch(tagsDataSet([]));
// //   }
// // });

// // export const loadGroupData = () => (async (dispatch) => {
// //   try {
// //     const response = await axios.get("http://localhost:8000/groups");
// //     dispatch(groupsDataSet(response.data));
// //   }
// //   catch (error) {
// //     console.log(error);
// //     dispatch(groupsDataSet([]));
// //   }
// // });


// /**
//  * define reducers
//  */

// const status = createReducer("INITIAL", (builder) => {
//   builder
//     .addCase(appStatusSet, (_, action) => action.payload);
// });


// const user = createReducer(null, (builder) => {
//   builder
//     .addCase(appUserSet, (_, action) => action.payload);
// });

// // const expensesStatus = createReducer("INITIAL", (builder) => {
// //   builder
// //     .addCase(expensesStatusSet, (_, action) => action.payload);
// // });

// // const expenses = createReducer([], (builder) => {
// //   builder
// //     .addCase(expensesDataSet, (_, action) => action.payload);
// // });

// // const groups = createReducer([], (builder) => {
// //   builder
// //     .addCase(groupsDataSet, (_, action) => action.payload);
// // });

// // const tags = createReducer([], (builder) => {
// //   builder
// //     .addCase(tagsDataSet, (_, action) => action.payload);
// // });

// // const isFormDialogOpen = createReducer(false, (builder) => {
// //   builder
// //     .addCase(formDialogOpened, (_, action) => action.payload);
// // });

// // const snackbar = createReducer({isOpen: false, message: ""}, (builder) => {
// //   builder
// //     .addCase(toggleSnackbar, (_, action) => {
// //       console.log(action);
// //       return action.payload;
// //     });
// // });

// export default combineReducers({
//   status,
//   user,
//   // expensesStatus,
//   // expenses,
//   // tags,
//   // groups,
//   // isFormDialogOpen,
//   // snackbar,
// });
