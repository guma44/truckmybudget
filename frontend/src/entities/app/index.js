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

export default combineReducers({
  status,
  user,
  expensesStatus,
  expenses
});
