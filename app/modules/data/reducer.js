import { combineReducers } from 'redux';
import * as wallet from './wallet';
import * as network from './network';
import * as markets from './markets';

export const slice = 'data';

export default combineReducers({
  [wallet.slice]: wallet.reducer,
  [network.slice]: network.reducer,
  [markets.slice]: markets.reducer
});
