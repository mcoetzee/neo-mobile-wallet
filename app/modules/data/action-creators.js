import { loadBalance, loadGasClaim, loadTransactionHistory } from './wallet';
import { loadNeoMarketData, loadGasMarketData } from './markets';

export function refresh(network, address) {
  return dispatch => {
    return Promise.all([
      dispatch(loadBalance(network, address)),
      dispatch(loadGasClaim(network, address)),
      dispatch(loadTransactionHistory(network, address)),
      dispatch(loadNeoMarketData()),
      dispatch(loadGasMarketData()),
    ])
  };
}
