## Swap ETH for Moon Coin

This project allows you to swap your ETH for Moon Coin. The exchange rate is: 1 ETH = 10 Moon Coins.
The repo uses hardhat as a local development environment for our solidity smart contracts and ethers.js + React on the front end.

### How To Use This Dapp:
- connect wallet
- input amount of moon coins you would like to purchase
- click the swap button

### How To Setup and Start the Project
- git clone the repo to your local machine
- input environment variables with the API_URL, API_KEY, and PRIVATE_KEY if you would like to deploy
- install solidity dependencies `npm install`
- `cd frontend`
- install React dependencies `npm install`
- start terminal `npm run start` and you should be able to see the Dapp at localhost 3000
- tests can be ran by `npx hardhat test`

