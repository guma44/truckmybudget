import { combineReducers } from 'redux';

import appReducer from './app';


const reducers = combineReducers({
  appTime: Date.now,
  application: appReducer,
});

export default reducers;
