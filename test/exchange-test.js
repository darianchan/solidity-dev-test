const { inputToConfig } = require("@ethereum-waffle/compiler");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Exchange", function () {
  let ExchangeFactory;
  let exchange;
  let accounts;

  beforeEach(async function() {
    accounts = await ethers.getSigners();

    ExchangeFactory = await ethers.getContractFactory("Exchange");
    exchange = await ExchangeFactory.deploy();
    await exchange.deployed();

  })

  it("should deploy the moon coin contract", async function() {
    let moonCoinAddress = await exchange.moonCoin();
    expect(moonCoinAddress).to.exist;
  })
});
