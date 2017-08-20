import c from './constants';
import MarketService from '../../../services/MarketService';

export function loadNeoMarketData() {
  return dispatch => {
    dispatch({ type: c.LOAD_NEO_MARKET_DATA });
    return MarketService.getNeoMarketData()
      .then(response => dispatch({ type: c.LOAD_NEO_MARKET_DATA_RESPONSE, payload: response }))
      .catch(err => dispatch({ type: c.LOAD_NEO_MARKET_DATA_RESPONSE, error: true, payload: err }));
  };
}

export function loadGasMarketData() {
  return dispatch => {
    dispatch({ type: c.LOAD_GAS_MARKET_DATA });
    return MarketService.getGasMarketData()
      .then(response => dispatch({ type: c.LOAD_GAS_MARKET_DATA_RESPONSE, payload: response }))
      .catch(err => dispatch({ type: c.LOAD_GAS_MARKET_DATA_RESPONSE, error: true, payload: err }));
  };
}
