import * as dotenv from "dotenv";
import { ethers } from "ethers"
import * as fs from "fs-extra"

dotenv.config({ path: __dirname+'/.env' });


async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    console.log(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider)
    // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8")
    // let wallet = ethers.Wallet.fromEncryptedJsonSync(
    //     encryptedJson,
    //     process.env.PRIVATE_KEY_PASSWORD
    // )
    // wallet = await wallet.connect(provider)
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    )
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying...!")
    const contract = await contractFactory.deploy()
    const tx = await contract.store(10)
    await tx.wait()
    const res = await contract.retrieve()
    console.log(res.toString())
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
