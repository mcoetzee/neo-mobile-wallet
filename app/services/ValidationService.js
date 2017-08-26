import { verifyAddress } from 'neon-js/lib/neon-web';

export default {
  validateAddress(address) {
    const errorMessage = 'This address is not valid';
    try {
      return verifyAddress(address) === true ? undefined : errorMessage;
    } catch (e) {
      return errorMessage;
    }
  },

  validateAmountToSend(asset, amount, balance) {
    if (parseFloat(amount) < 0) {
      return 'You cannot send negative amounts of an asset';
    }

    if (asset === 'Neo' && parseFloat(amount) !== parseInt(amount)) {
      return 'You cannot send fractional amounts of Neo';
    }

    if (amount > balance[asset.toLowerCase()]) {
      return `You do not have enough ${asset.toUpperCase()} to send`;
    }
  }
}
