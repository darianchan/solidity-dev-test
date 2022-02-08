const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Exchange", function () {
  let ExchangeFactory;
  let exchange;
  let accounts;
  let ERC20;
  let moonCoin;

  beforeEach(async function () {
    accounts = await ethers.getSigners();

    // deploy exchange contract
    ExchangeFactory = await ethers.getContractFactory("Exchange");
    exchange = await ExchangeFactory.deploy();
    await exchange.deployed();

    // get ERC20 functionality
    ERC20 = await ethers.getContractFactory("ERC20");
    moonCoin = ERC20.attach(await exchange.moonCoin());
  });

  it("should deploy the moon coin contract", async function () {
    let moonCoinAddress = await exchange.moonCoin();
    expect(moonCoinAddress).to.exist;
  });

  it("should mint initial moon coin supply to the exchange contract", async function () {
    let amount = await moonCoin.balanceOf(exchange.address);
    amount = ethers.utils.formatEther(amount);

    expect(amount).to.eq("500000.0");
  });

  it("should allow a user to swap eth for moon coin", async function () {
    exchange.swapETHForMoon(10, { value: ethers.utils.parseEther("1") });
    let balance = await moonCoin.balanceOf(accounts[0].address);
    balance = ethers.utils.formatEther(balance);

    expect(balance).to.eq("10.0");
  });

  // testing edge case division
  it("should allow a user to swap eth for one moon coin", async function () {
    exchange.swapETHForMoon(1, { value: ethers.utils.parseEther(".1") });
    let balance = await moonCoin.balanceOf(accounts[0].address);
    balance = ethers.utils.formatEther(balance);

    expect(balance).to.eq("1.0");
  });

  it("should revert if a user doesn't send enough eth for the swap", async function () {
    await expect(
      exchange.swapETHForMoon(100, { value: ethers.utils.parseEther("1") })
    ).to.be.reverted;
  });
});
