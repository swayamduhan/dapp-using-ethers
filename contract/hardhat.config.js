require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY
const SEPOLIA_RPC = process.env.SEPOLIA_RPC

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  }
};
