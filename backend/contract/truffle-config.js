require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { INFURA_API_KEY, MNEMONIC } = process.env;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    sepolia: {
      provider: () => new HDWalletProvider("inform jazz price entire route begin hood silver proud empty auto cannon", "https://sepolia.infura.io/v3/ef32ca39802242d69b586f48e24ee92c"),
      network_id: "11155111",
      gas: 4465030,
    },
  },
};