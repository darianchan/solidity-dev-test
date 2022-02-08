import "./App.css";
import React from "react";
import { ethers } from "ethers";
import Exchange from "./Exchange.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const exchangeAddress = "0x885405c71a2f96FB4f9baf80476f007bCA48F57f"; // 0x16428E1B2db8a5A2B31dCF18bb81ee9773A2fD51 moon coin rinkeby address
const exchange = new ethers.Contract(exchangeAddress, Exchange.abi, provider);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      moonCoinAmount: 0,
      message: null,
    };

    this.onConnectWallet = this.onConnectWallet.bind(this);
    this.onChangeInputAmount = this.onChangeInputAmount.bind(this);
    this.onSwap = this.onSwap.bind(this);
  }

  async onConnectWallet() {
    try {
      console.log("Signed in", await signer.getAddress());
    } catch (err) {
      console.log("Not signed in");
      await provider.send("eth_requestAccounts", []);
    }
  }

  onChangeInputAmount(event) {
    this.setState({ moonCoinAmount: event.target.value });
  }

  async onSwap(event) {
    event.preventDefault();
    let amount = this.state.moonCoinAmount;
    let eth = (amount / 10).toString();
    
    this.setState({ message: "PROCESSING SWAP..." });
    let tx = await exchange.connect(signer).swapETHForMoon(amount, {
      value: ethers.utils.parseEther(eth),
    });

    let receipt = await tx.wait();

    if (receipt.status === 1) {
      this.setState({ message: "SWAP SUCCESSFUL" });
    } else if (receipt.status === 0) {
      this.setState({ message: "SWAP FAILED" });
    }
  }

  render() {
    return (
      <div>
        <div className="modal">
          <form className="modalContent" onSubmit={this.onSwap}>
            <input
              type="number"
              name="moonCoin"
              onChange={this.onChangeInputAmount}
            ></input>
            <label id="amount">Moon Coin Amount</label>

            <br />
            <button type="submit">Swap</button>
          </form>
          <button id="walletButton" onClick={this.onConnectWallet}>
            Connect Wallet
          </button>
          {this.state.message ? <div id="message">{this.state.message}</div> : null}
        </div>
      </div>
    );
  }
}

export default App;
