import { combineReducers } from 'redux';
import * as data from './data';
import * as sendScreen from './send-screen';

export default combineReducers({
  [data.slice]: data.reducer,
  [sendScreen.slice]: sendScreen.reducer,
});
