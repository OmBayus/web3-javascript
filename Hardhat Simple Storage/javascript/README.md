# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

# Used Commands
```shell
yarn hardhat
yarn hardhat accounts
yarn hardhat compile
yarn hardhat run scripts/deploy.js
yarn hardhat run scripts/deploy.js --network rinkeby
yarn hardhat node  // start JSON-RPC server at localhost
yarn hardhat run scripts/deploy.js --network localhost
yarn hardhat console --network localhost  // can write js code in console
yarn hardhat test
yarn hardhat test --grep store
yarn hardhat coverage
```
