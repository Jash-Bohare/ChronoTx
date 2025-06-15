// Functions-request-config.js

module.exports = {
  // Fetch gas price from Etherscan API
  source: `
    const gasApiUrl = "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=YOUR_ETHERSCAN_API_KEY";

    const gasResponse = await Functions.makeHttpRequest({ url: gasApiUrl });

    if (gasResponse.error) {
      throw Error("Gas API fetch failed");
    }

    const gasData = gasResponse.data.result;
    const gasPrice = parseInt(gasData.ProposeGasPrice); // in Gwei

    return Functions.encodeUint256(gasPrice);
  `,

  // Secrets (your API key)
  secrets: { apiKey: "FSUPBKA1J15MCJ6UANZIADBC1M8MI34CH8" },

  // Arguments (empty for now)
  args: [],

  // Expected return type
  expectedReturnType: "uint256",
};
