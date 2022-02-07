//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./MoonCoin.sol";

// Exchange rate is 1 eth = 10 Moon Coins
contract Exchange {
  address public owner;
  MoonCoin public moonCoin;

  constructor() {
    owner = msg.sender;
    moonCoin = new MoonCoin(address(this));
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function swapETHForMoon(uint _moonCoinAmount) public payable {
    uint eth = _moonCoinAmount * 10 ** 18 / 10;
    require(msg.value >= eth);

    (bool success) = moonCoin.transfer(msg.sender, _moonCoinAmount * 10 ** 18);
    require(success);
  }

  // sends entire contract's balance to the owner
  function withdraw() public onlyOwner {
    (bool success, ) = owner.call{value: address(this).balance}("");
    require(success);
  }
  
  receive() external payable {}
}