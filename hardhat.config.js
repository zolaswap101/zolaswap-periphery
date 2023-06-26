require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mainnet: {
      accounts: ['process.env.PRIVATE_KEY'],
      url: "https://polygon-rpc.com/",
      chainId: 137,
    },
    testnet: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: ['process.env.PRIVATE_KEY'],
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
  },
  abiExporter: [
    {
      path: './abi/json',
      format: "json",
    },
    {
      path: './abi/minimal',
      format: "minimal",
    },
    {
      path: './abi/fullName',
      format: "fullName",
    },
  ]
  
};

