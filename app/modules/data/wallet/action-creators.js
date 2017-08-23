import c from './constants';
import WalletService from '../../../services/WalletService';

export function createWallet() {
  return dispatch => {
    dispatch({ type: c.CREATE_WALLET });
    return WalletService.createWallet()
      .then(response => dispatch({ type: c.CREATE_WALLET_RESPONSE, payload: response }))
      .catch(err => dispatch({ type: c.CREATE_WALLET_RESPONSE, error: true, payload: err }));
  };
}

export function loadWallet(wif) {
  return dispatch => {
    dispatch({ type: c.LOAD_WALLET });
    return WalletService.getWallet(wif)
      .then(response => dispatch({ type: c.LOAD_WALLET_RESPONSE, payload: response }))
      .catch(err => dispatch({ type: c.LOAD_WALLET_RESPONSE, error: true, payload: err }));
  };
}

export function loadBalance(network, address) {
  return dispatch => {
    dispatch({ type: c.LOAD_BALANCE });
    return WalletService.getBalance(network, address)
      .then(response => dispatch({ type: c.LOAD_BALANCE_RESPONSE, payload: response }))
      .catch(err => dispatch({ type: c.LOAD_BALANCE_RESPONSE, error: true, payload: err }));
  };
}

export function loadGasClaim(network, address) {
  return dispatch => {
    dispatch({ type: c.LOAD_GAS_CLAIM });
    return WalletService.getClaimAmounts(network, address)
      .then(response => dispatch({ type: c.LOAD_GAS_CLAIM_RESPONSE, payload: response }))
      .catch(err => dispatch({ type: c.LOAD_GAS_CLAIM_RESPONSE, error: true, payload: err }));
  };
}

export function loadTransactionHistory(network, address) {
  return dispatch => {
    dispatch({ type: c.LOAD_TRANSACTION_HISTORY });
    return WalletService.getTransactionHistory(network, address)
      .then(response => dispatch({ type: c.LOAD_TRANSACTION_HISTORY_RESPONSE, payload: response }))
      .catch(err => dispatch({ type: c.LOAD_TRANSACTION_HISTORY_RESPONSE, error: true, payload: err }));
  };
}
