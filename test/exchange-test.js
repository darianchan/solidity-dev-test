const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Exchange", function () {
  let ExchangeFactory;
  let exchange;
  let accounts;
  let ERC20;
  let moonCoin;

  beforeEach(async function() {
    accounts = await ethers.getSigners();

    ExchangeFactory = await ethers.getContractFactory("Exchange");
    exchange = await ExchangeFactory.deploy();
    await exchange.deployed();
    ERC20 = await ethers.getContractFactory("ERC20");
    moonCoin = ERC20.attach(await exchange.moonCoin());
  })

  it("should deploy the moon coin contract", async function() {
    let moonCoinAddress = await exchange.moonCoin();
    expect(moonCoinAddress).to.exist;
  })

  it("should mint initial moon coin supply to the exchange contract", async function() {
    let amount = await moonCoin.balanceOf(exchange.address);
    amount = ethers.utils.formatEther(amount)
    
    expect(amount).to.eq("500000.0")
  })

  it("should allow a user to swap eth for moon coin", async function() {
    exchange.swapETHForMoon(10,  {value: ethers.utils.parseEther("1")});
    let balance = await moonCoin.balanceOf(accounts[0].address);
    balance = ethers.utils.formatEther(balance);
  
    expect(balance).to.eq("10.0")
  })

  // testing edge case division
  it("should allow a user to swap eth for one moon coin", async function() {
    exchange.swapETHForMoon(1,  {value: ethers.utils.parseEther(".1")});
    let balance = await moonCoin.balanceOf(accounts[0].address);
    balance = ethers.utils.formatEther(balance);

    expect(balance).to.eq("1.0");
  })
});
