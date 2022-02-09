//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./MoonCoin.sol";

// Exchange rate is 1 ETH = 10 Moon Coins
contract Exchange {
    address public owner;
    MoonCoin public moonCoin;

    event Swap(uint moonCoinAmount, uint ethAmount, address buyer);

    constructor() {
        owner = msg.sender;
        moonCoin = new MoonCoin(address(this)); // mints 500,000 supply to this contract
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Must be owner!");
        _;
    }

    function swapETHForMoon(uint256 _moonCoinAmount) external payable {
        require(msg.value >= (_moonCoinAmount * 10**18) / 10, "Not enough ETH sent");

        require(moonCoin.balanceOf(address(this)) >= _moonCoinAmount * 10**18, "No more moon coins available");
        bool success = moonCoin.transfer(msg.sender, _moonCoinAmount * 10**18);
        require(success, "Moon Coin transfer failed");

        emit Swap(_moonCoinAmount * 10**18, (_moonCoinAmount * 10**18) / 10, msg.sender);
    }

    // sends entire contract's balance to the owner
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "ETH transfer failed");
    }

    receive() external payable {}
}
