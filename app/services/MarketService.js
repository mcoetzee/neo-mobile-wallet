export default {
  getNeoMarketData() {
    return fetch('https://api.coinmarketcap.com/v1/ticker/NEO/?convert=USD')
      .then(response => response.json())
      .then(response => response[0]);
  },

  getGasMarketData() {
    return fetch('https://api.coinmarketcap.com/v1/ticker/GAS/?convert=USD')
      .then(response => response.json())
      .then(response => response[0]);
  }
}

