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
      return { ...state, sending: true, error: false };

    case c.SEND_ASSET_RESPONSE:
      return {
        ...state,
        sending: false,
        error: !!action.error,
        response: action.payload
      };

    default:
      return state;
  }
}
