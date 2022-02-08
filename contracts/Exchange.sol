//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./MoonCoin.sol";

// Exchange rate is 1 eth = 10 Moon Coins
contract Exchange {
    address public owner;
    MoonCoin public moonCoin;

    event Swap(uint moonCoinAmount, uint ethAmount, address buyer);

    constructor() {
        owner = msg.sender;
        moonCoin = new MoonCoin(address(this)); // mints 500,000 supply to this contract
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function swapETHForMoon(uint256 _moonCoinAmount) external payable {
        require(msg.value >= (_moonCoinAmount * 10**18) / 10);

        require(moonCoin.balanceOf(address(this)) >= _moonCoinAmount * 10**18);
        bool success = moonCoin.transfer(msg.sender, _moonCoinAmount * 10**18);
        require(success);

        emit Swap(_moonCoinAmount * 10**18, (_moonCoinAmount * 10**18) / 10, msg.sender);
    }

    // sends entire contract's balance to the owner
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }

    receive() external payable {}
}
