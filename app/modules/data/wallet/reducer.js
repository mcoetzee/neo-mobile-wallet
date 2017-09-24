import c from './constants';
import { combineReducers } from 'redux';

export const slice = 'wallet';

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

function claim(state = {}, action) {
  switch (action.type) {
    case c.LOAD_GAS_CLAIM:
      return { ...state, loading: true };

    case c.LOAD_GAS_CLAIM_RESPONSE:
      if (action.error) {
        return { ...state, loading: false, error: true };
      }

      return {
        ...state,
        loading: false,
        updatedAt: new Date().toLocaleString(),
        available: action.payload.available,
        amount: (action.payload.available + action.payload.unavailable) / 100000000,
        ...action.payload
      };

    case c.CLAIM_GAS:
      return { ...state, claiming: true, progress: '' };

    case c.CLAIM_GAS_PROGRESS:
      return { ...state, progress: action.payload };

    case c.CLAIM_GAS_RESPONSE:
      if (action.error) {
        return { ...state, claiming: false, claimError: true };
      }

      return {
        ...state,
        claiming: false,
        claimError: false,
        claimedAt: new Date().toLocaleString(),
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

export default combineReducers({ address, balance, claim, transactions });
