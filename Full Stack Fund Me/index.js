import { ethers } from "./node_modules/ethers/dist/ethers.esm.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectBtn")
const fundButton = document.getElementById("fundBtn")
const withdrawButton = document.getElementById("withdrawBtn")
const balanceElement = document.getElementById("balance")
connectButton.onclick = connect
fundButton.onclick = fund
withdrawButton.onclick = withdraw

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then(function (accounts) {
                console.log(accounts)
                connectButton.innerHTML = "Connected"
            })
    } else {
        console.log("No web3 wallet detected.")
        connectButton.innerHTML = "Install web3 wallet"
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const txResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
            await listenForTransactionMine(txResponse, provider)
            await getBalance()
            console.log("Done!")
        } catch (error) {
            console.warn(error)
        }
    } else {
        console.log("No web3 wallet detected.")
    }
}

async function listenForTransactionMine(txResponse, provider) {
    console.log(`Mining ${txResponse.hash}...`)
    return new Promise((resolve, reject) => {
        provider.once(txResponse.hash, (txRecieption) => {
            console.log(
                `Completed with ${txRecieption.confirmations} confirmations`
            )
            resolve()
        })
    })
}

async function withdraw(){
    if(typeof window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const txResponse = await contract.withdraw()
            await listenForTransactionMine(txResponse, provider)
            await getBalance()
            console.log("Done!")
        } catch (error) {
            console.warn(error)
        }
    }
}

async function getBalance(){
    if(typeof window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        balanceElement.innerHTML = ethers.utils.formatEther(balance)
    }
}

getBalance()