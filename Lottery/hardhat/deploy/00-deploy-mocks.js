const { network,ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25")
const GAS_PRICE_LINK = 1e9 // 1.000.000.000

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if(developmentChains.includes(network.name)){
        log(`Local Network detected`)

        await deploy("VRFCoordinatorV2Mock",{
            from: deployer,
            args: args,
            log: true,
        })

        log("Mocks Deployed!")
        log("----------------------------------------------------------------")
    }
}

module.exports.tag = ["all","mocks"]