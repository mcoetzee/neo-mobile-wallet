import { combineReducers } from 'redux';
import wallet from './wallet';
import network from './network';

export default combineReducers({
  wallet,
  network
});
