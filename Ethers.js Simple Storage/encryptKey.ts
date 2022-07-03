import * as dotenv from "dotenv";
import { ethers } from "ethers"
import * as fs from "fs-extra"

dotenv.config({ path: __dirname+'/.env' });

async function main() {
    console.log(process.env.PRIVATE_KEY!)
    console.log(process.env.PRIVATE_KEY_PASSWORD!)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!)
    const encryptedJsonKey = await wallet.encrypt(
        process.env.PRIVATE_KEY_PASSWORD!,
        process.env.PRIVATE_KEY!
    )
    console.log(encryptedJsonKey)
    fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })