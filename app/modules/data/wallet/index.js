import c from './constants';
export * from './action-creators';
import { combineReducers } from 'redux';

function address(state = {}, action) {
  switch (action.type) {
    case c.CREATE_WALLET:
      return { ...state, creating: true };

    case c.CREATE_WALLET_RESPONSE:
      if (action.error) {
        return { ...state, creating: false, error: true };
      }
      return { ...state, creating: false, ...action.payload };

    case c.LOAD_WALLET:
      return { ...state, loading: true };

    case c.LOAD_WALLET_RESPONSE:
      if (action.error) {
        return { ...state, loading: false, error: true };
      }
      return { ...state, loading: false, ...action.payload };

    default:
      return state;
  }
}

function balance(state = {}, action) {
  switch (action.type) {
    case c.LOAD_BALANCE:
      return { ...state, loading: true };

    case c.LOAD_BALANCE_RESPONSE:
      if (action.error) {
        return { ...state, loading: false, error: true };
      }
      return {
        ...state,
        loading: false,
        updatedAt: new Date().toLocaleString(),
        ...action.payload
      };

    default:
      return state;
  }
}

function transactions(state = { data: [] }, action) {
  switch (action.type) {
    case c.LOAD_TRANSACTION_HISTORY:
      return { ...state, loading: true };

    case c.LOAD_TRANSACTION_HISTORY_RESPONSE:
      if (action.error) {
        return { ...state, loading: false, error: true };
      }
      return {
        ...state,
        loading: false,
        updatedAt: new Date().toLocaleString(),
        data: action.payload
      };

    default:
      return state;
  }
}

export default combineReducers({ address, balance, transactions });
