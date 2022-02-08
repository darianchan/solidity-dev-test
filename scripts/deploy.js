const hre = require("hardhat");

async function main() {
  const ExchangeFactory = await ethers.getContractFactory("Exchange")
  const exchange = await ExchangeFactory.deploy()
  await exchange.deployed()
  console.log("exchange deployed to:", exchange.address);
  console.log("moon coin deployed to:", await exchange.moonCoin())

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
