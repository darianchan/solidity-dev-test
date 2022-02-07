//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MoonCoin is ERC20 {

  constructor(address _exchange) ERC20("MoonCoin", "moon") {
    _mint(_exchange, 500000 * 10**18); // mint 500,000 supply to the exchange contract
  }
}