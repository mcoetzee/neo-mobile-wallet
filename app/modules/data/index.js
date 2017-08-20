import { combineReducers } from 'redux';
import wallet from './wallet';
import network from './network';
import markets from './markets';

export default combineReducers({
  wallet,
  network,
  markets,
});
