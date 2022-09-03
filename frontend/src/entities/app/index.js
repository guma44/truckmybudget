/* eslint-disable no-param-reassign */
import { Action, Dispatch } from 'redux';
import axios from "axios";
import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit';


/**
 * define action creators
 */

export const appStatusSet = createAction('app/appStatusSet');
export const appUserSet = createAction('app/appUserSet');
export const expensesStatusSet = createAction('app/dataStatusSet');
export const expensesDataSet = createAction('app/expensesDataSet');
export const groupsDataSet = createAction('app/groupsDataSet');
export const tagsDataSet = createAction('app/tagsDataSet');
export const formDialogOpened = createAction('app/formDialogOpened');

/**
 * define complex actions
 */
export const loadApp = () => (async (dispatch) => {
  dispatch(appStatusSet("APP_WILL_LOAD"));

  // try to auth user
  try {
    const user = {"username": "Rafal"};
    dispatch(appUserSet(user));
  } catch (error) {
    dispatch(appUserSet(null));
  }

  return dispatch(appStatusSet("APP_DID_LOAD"));
});


export const loadExpenseData = () => (async (dispatch) => {
  dispatch(expensesStatusSet("EXPENSES_WILL_LOAD"));

  try {
    const response = await axios.get("http://localhost:8000/expenses");
    console.log(response);
    dispatch(expensesDataSet(response.data));
  }
  catch (error) {
    console.log(error);
    dispatch(expensesDataSet([]));
  }

  return dispatch(expensesStatusSet("EXPENSES_DID_LOAD"));
});

export const loadTagData = () => (async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:8000/tags");
    console.log(response);
    dispatch(tagsDataSet(response.data));
  }
  catch (error) {
    console.log(error);
    dispatch(tagsDataSet([]));
  }
});

export const loadGroupData = () => (async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:8000/groups");
    console.log(response);
    dispatch(groupsDataSet(response.data));
  }
  catch (error) {
    console.log(error);
    dispatch(groupsDataSet([]));
  }
});


/**
 * define reducers
 */

const status = createReducer("INITIAL", (builder) => {
  builder
    .addCase(appStatusSet, (_, action) => action.payload);
});


const user = createReducer(null, (builder) => {
  builder
    .addCase(appUserSet, (_, action) => action.payload);
});

const expensesStatus = createReducer("INITIAL", (builder) => {
  builder
    .addCase(expensesStatusSet, (_, action) => action.payload);
});

const expenses = createReducer([], (builder) => {
  builder
    .addCase(expensesDataSet, (_, action) => action.payload);
});

const groups = createReducer([], (builder) => {
  builder
    .addCase(groupsDataSet, (_, action) => action.payload);
});

const tags = createReducer([], (builder) => {
  builder
    .addCase(tagsDataSet, (_, action) => action.payload);
});

const isFormDialogOpen = createReducer(false, (builder) => {
  builder
    .addCase(formDialogOpened, (_, action) => action.payload);
});

export default combineReducers({
  status,
  user,
  expensesStatus,
  expenses,
  tags,
  groups,
  isFormDialogOpen
});
