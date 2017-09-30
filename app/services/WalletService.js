import { getAccountsFromWIFKey, generatePrivateKey, getWIFFromPrivateKey, getBalance, sendAssetTransaction,
  doClaimAllGas, getTransactionHistory, getMarketPriceUSD, getClaimAmounts, getWalletDBHeight } from 'neon-js/lib/neon-web';

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

  sendAssetTransaction(network, address, wif, asset, amount) {
    return new Promise(async (resolve, reject) => {
      try {
        const sendResponse = await sendAssetTransaction(network, address, wif, asset, amount);
        return isError(sendResponse) ? reject(sendResponse) : resolve(sendResponse);
      } catch (e) {
        console.log(`Error sending ${amount} ${asset}:`, e);
        reject(e);
      }
    });
  },

  claimGas(network, ownAddress, wif, amount, available, onProgress) {
    return new Promise(async (resolve, reject) => {
      async function executeClaim() {
        try {
          const claimResponse = await doClaimAllGas(network, wif)
          return isError(claimResponse) ? reject(claimResponse) : resolve(claimResponse);
        } catch (e) {
          console.log('Error executing gas claim: ', e);
          reject(e);
        }
      }

      if (amount === 0) {
        return executeClaim();
      }

      onProgress('Sending Neo to self (Step 1/3)');
      try {
        await this.sendAssetTransaction(network, ownAddress, wif, 'Neo', amount);
      } catch (e) {
        return reject(e);
      }

      let pollRetryCount = 0;
      onProgress('Waiting for transaction to clear (Step 2/3)');
      (async function pollClaims() {
        console.log('claimGas: Polling - currently available: ', available)
        let response = {};
        try {
          response = await getClaimAmounts(network, ownAddress);
          console.log('claimGas: Polling - got available: ', response.available)
        } catch (e) {
          console.log('Error getting claim amounts: ', e);
          if (pollRetryCount === 2) {
            return reject(e);
          }
          pollRetryCount++;
        }

        if (response.available > available) {
          onProgress('Executing claim (Step 3/3)');
          return executeClaim();
        }

        setTimeout(pollClaims, 10000);
      })();
    })
  },

  getMarketPriceUSD,
  getClaimAmounts,
  getWalletDBHeight,
}

function isError(response) {
  return response.error || response.result === false || response.result === undefined;
}
