require("@nomiclabs/hardhat-ethers");
require("hardhat-gas-reporter");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`], // ✅ added 0x prefix
    },
  },
  gasReporter: {
    enabled: true,           // ✅ enables gas reporting
    currency: 'USD',         // optional: output in USD
    coinmarketcap: null,     // optional: set your API key if you want live pricing
  },
};
