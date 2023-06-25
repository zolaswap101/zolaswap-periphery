require("@nomicfoundation/hardhat-toolbox");
require("dotenv")

const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mainnet: {
      accounts: ['3dbd9e25b3dd615a019a3a9159a90f3580ee4a79171d9b04ac2f94077f8d67f8'],
      url: "https://polygon-rpc.com/",
      chainId: 137,
    },
    testnet: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: ['3dbd9e25b3dd615a019a3a9159a90f3580ee4a79171d9b04ac2f94077f8d67f8']
    }
  },
  solidity: {
    version: "0.6.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
  
};

