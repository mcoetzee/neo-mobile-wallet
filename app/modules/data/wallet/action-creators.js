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

export function sendAsset(network, toAddress, fromWif, asset, amount) {
  return dispatch => {
    dispatch({ type: c.SEND_ASSET, payload: { network, toAddress, fromWif, asset, amount }});
    return WalletService.sendAssetTransaction(network, toAddress, fromWif, asset, amount)
      .then(response =>
        dispatch({
          type: c.SEND_ASSET_RESPONSE,
          payload: response,
          meta: {
            toast: {
              message: 'Transaction successful! Your balance will update when the blockchain has processed it',
              delay: 600
            }
          }
        })
      )
      .catch(err => dispatch({ type: c.SEND_ASSET_RESPONSE, error: true, payload: err }));
  };
}

export function claimGas(network) {
  return (dispatch, getState) => {
    const { address, balance, claim } = getState().data.wallet;

    dispatch({ type: c.CLAIM_GAS, payload: { network }});
    return WalletService
      .claimGas(
        network,
        address.public,
        address.wif,
        balance.neo,
        claim.available,
        update => dispatch({ type: c.CLAIM_GAS_PROGRESS, payload: update })
      )
      .then(response =>
        dispatch({
          type: c.CLAIM_GAS_RESPONSE,
          payload: response,
          meta: {
            toast: { message: 'Gas claim successful! Your balance will update when the blockchain has processed it' }
          }
        })
      )
      .catch(err => dispatch({ type: c.CLAIM_GAS_RESPONSE, error: true, payload: err }));
  };
}

export function logOut() {
  return { type: c.LOG_OUT };
}
