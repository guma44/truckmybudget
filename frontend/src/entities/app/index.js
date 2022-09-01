/* eslint-disable no-param-reassign */
import { Action, Dispatch } from 'redux';
import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit';


/**
 * define action creators
 */

export const appStatusSet = createAction('app/appStatusSet');

export const appUserSet = createAction('app/appUserSet');

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

export default combineReducers({
  status,
  user,
});
