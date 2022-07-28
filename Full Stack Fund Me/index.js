async function connect() {
    if (typeof window.ethereum !== "undefined") {
        window.ethereum.request({ method: "eth_requestAccounts" }).then(function (accounts) {
            console.log(accounts);
            document.getElementById("connectBtn").innerHTML = "Connected";
        });
    }
    else{
        console.log("No web3 wallet detected.");
        document.getElementById("connectBtn").innerHTML = "Install web3 wallet"
    }
}