import { getAccountsFromWIFKey, generatePrivateKey, getWIFFromPrivateKey, getBalance,
  getTransactionHistory, getMarketPriceUSD, getClaimAmounts, getWalletDBHeight } from 'neon-js/lib/neon-web';

export default {
  createWallet() {
    return new Promise((resolve, reject) => {
      const newPrivateKey = generatePrivateKey();
      const newWif = getWIFFromPrivateKey(newPrivateKey);
      const account = getAccountsFromWIFKey(newWif)[0];

      resolve({
        wif: newWif,
        public: account.address
      });
    });
  },

  getWallet(wif) {
    return new Promise((resolve, reject) => {
      let account;
      try {
        account = getAccountsFromWIFKey(wif)[0];
      } catch (e) { }

      if (account === -1 || account === -2 || account === undefined){
        reject({ wif });
      }
      resolve({ wif, public: account.address });
    });
  },

  getTransactionHistory(network, address) {
    return getTransactionHistory(network, address).then((transactions) => {
      return transactions.reduce((acc, tx) => {
        if (!tx.neo_sent && !tx.gas_sent) {
          return acc;
        }

        acc.push({
          type: tx.neo_sent ? 'NEO' : 'GAS',
          amount: tx.neo_sent ? tx.NEO : tx.GAS,
          txid: tx.txid,
          block_index: tx.block_index
        });

        return acc;
      }, []);
    });
  },

  getBalance(network, address) {
    return getBalance(network, address)
      .then(bal => {
        return { neo: bal.Neo, gas: bal.Gas };
      });
  },

  getMarketPriceUSD(neo) {
    return getMarketPriceUSD(neo);
  },

  getClaimAmounts(network, address) {
    return getClaimAmounts(network, address);
  },

  getBlockHeight(network) {
    return getWalletDBHeight(network);
  }
}

  // syncTransactionHistory(dispatch, net, address);
  // syncAvailableClaim(dispatch, net, address);
  // syncBlockHeight(dispatch, net);
  // return getBalance(net, address).then((resultBalance) => {
  //   return getMarketPriceUSD(resultBalance.Neo).then((resultPrice) => {
  //     if (resultPrice === undefined || resultPrice === null){
  //       dispatch(setBalance(resultBalance.Neo, resultBalance.Gas, '--'));
  //     } else {
  //       dispatch(setBalance(resultBalance.Neo, resultBalance.Gas, resultPrice));
  //     }
  //     return true;
  //   })
  // })
