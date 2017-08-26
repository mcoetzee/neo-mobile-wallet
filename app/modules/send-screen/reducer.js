import { constants as c } from '../data/wallet';

const initialState = {
  sending: false,
  error: false,
  response: {}
};

export const slice = 'sendScreen';

export default function sendScreen(state = initialState, action) {
  switch (action.type) {
    case c.SEND_ASSET:
      return { ...state, sending: true };

    case c.SEND_ASSET_RESPONSE:
      if (action.error) {
        return { ...state, sending: false, error: true };
      }
      return {
        ...state,
        sending: false,
        error: false,
        response: action.payload
      };

    default:
      return state;
  }
}
