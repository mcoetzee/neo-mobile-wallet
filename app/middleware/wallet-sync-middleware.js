import { StatusBar } from 'react-native';
import { constants as c } from '../modules/data/wallet';
import { refresh } from '../modules/data';

export const walletSyncMiddleware = store => {
  let syncing = false;

  function queueSync() {
    syncing = true;
    setTimeout(executeSync, 5 * 60 * 1000);
  }

  async function executeSync() {
    const { address } = store.getState().data.wallet;
    const { network } = store.getState().data;
    if (address.public) {
      StatusBar.setNetworkActivityIndicatorVisible(true);
      await store.dispatch(
        refresh(network, address.public)
      );
      StatusBar.setNetworkActivityIndicatorVisible(false);
    }
    queueSync();
  }

  return next => action => {

    switch (action.type) {
      case c.LOAD_WALLET_RESPONSE:
        if (!syncing && !action.error) {
          queueSync();
        }
    }

    return next(action);
  };
}
