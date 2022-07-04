require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */


const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "http://eth-rinkeby"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API = process.env.COINMARKETCAP_API || "key"

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId:4,
        },
        localhost:{
            url: "http://localhost:8545",
            // accounts: ["0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"],
            chainId:31337,
        }
    },
    solidity: "0.8.4",
    etherscan:{
        apiKey: ETHERSCAN_API_KEY,  
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-reporter.log",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API,
        token:"MATIC"
    }

}
