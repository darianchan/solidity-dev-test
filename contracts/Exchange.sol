//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./MoonCoin.sol";

// Exchange rate is 1 eth = 10 Moon Coins
contract Exchange {
  MoonCoin public moonCoin;

  constructor() {
    moonCoin = new MoonCoin(address(this));
  }

  function swapETHForMoon(uint _moonCoinAmount) public payable {
    uint eth = _moonCoinAmount * 10 ** 18 / 10;
    require(msg.value >= eth);
  }
  
  receive() external payable {}
}