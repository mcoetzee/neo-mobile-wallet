import { verifyAddress } from 'neon-js/lib/neon-web';
import isEmpty from 'lodash.isempty';

export default function validate(form, balance) {
  const messages = {};

  let message = validateAddress(form.address);
  if (message) {
    messages.address = message;
  }

  message = validateAmountToSend(form.amount, form.asset, balance);
  if (message) {
    messages.amount = message;
  }

  return {
    ...form,
    messages,
    valid: isEmpty(messages)
  };
}

function validateAddress(address) {
  if (isEmpty(address)) {
    return 'This is required';
  }

  const errorMessage = 'This address is not valid';
  try {
    return verifyAddress(address) === true ? undefined : errorMessage;
  } catch (e) {
    return errorMessage;
  }
}

function validateAmountToSend(amount, asset, balance) {
  if (isEmpty(amount)) {
    return 'This is required';
  }

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
