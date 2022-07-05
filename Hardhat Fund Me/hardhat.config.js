require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
  solidity: {
    compilers:[
      {version:"0.8.4"},
      {version:"0.6.6"},
    ]
  },
  defaultNetwork:"hardhat",
  networks: {
    rinkeby:{
      url: RINKEBY_RPC_URL,
      accounts:[PRIVATE_KEY],
      chainId:4,
      blockConfirmations:6
    }
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  namedAccounts:{
    deployer:{
      default:0,
    },
    user:{
      default:1,
    }
  }
};
