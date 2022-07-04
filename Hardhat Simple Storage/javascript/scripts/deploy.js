const { ethers, run, network } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deployed contarct to: ${simpleStorage.address}`)
    if(network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY){
      await simpleStorage.deployTransaction.wait(6)
      await verify(simpleStorage.address,[])
    }
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is : ${currentValue}`)

    const transaction = await simpleStorage.store(5)
    await transaction.wait(1)
    const newValue = await simpleStorage.retrieve()
    console.log(`New Value is : ${newValue}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log(e.message)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
