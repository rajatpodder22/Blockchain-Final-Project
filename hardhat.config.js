require("@nomiclabs/hardhat-ethers");
require("hardhat-gas-reporter");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
	  timeout: 120000,	  
    },
  },
  gasReporter: {
    enabled: true,           
    currency: 'USD',         
    coinmarketcap: null,     
  },
};