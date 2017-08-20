import c from './constants';
export * from './action-creators';

export default function(state = { neo: {}, gas: {} }, action) {
  switch (action.type) {
    case c.LOAD_NEO_MARKET_DATA_RESPONSE:
      return {
        ...state,
        neo: action.payload
      };

    case c.LOAD_GAS_MARKET_DATA_RESPONSE:
      return {
        ...state,
        gas: action.payload
      };

    default:
      return state;
  }
}
