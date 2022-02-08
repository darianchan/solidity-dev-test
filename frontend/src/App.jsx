import "./App.css";
import React from "react";
import { ethers } from "ethers";
import Exchange from "./Exchange.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const exchangeAddress = process.env.REACT_APP_EXCHANGE_ADDRESS; // 0x16428E1B2db8a5A2B31dCF18bb81ee9773A2fD51 moon coin rinkeby address
const exchange = new ethers.Contract(exchangeAddress, Exchange.abi, provider);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      moonCoinAmount: 0,
      message: null,
      cost: 0
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
    let amount = event.target.value
    let ethCost = amount / 10

    this.setState({ moonCoinAmount: amount, cost: ethCost});
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
          <h2>Swap ETH for Moon Coin</h2>
          <form className="modalContent" onSubmit={this.onSwap}>
            <input
              type="number"
              name="moonCoin"
              onChange={this.onChangeInputAmount}
            ></input>
            <label id="amount"># of Moon Coin To Buy</label>

            <br />
            <button type="submit">Swap</button>
          </form>
          <button id="walletButton" onClick={this.onConnectWallet}>
            Connect Wallet
          </button>
          <div className="message">Cost: {this.state.cost} ETH</div>
          {this.state.message ? <div className="message">{this.state.message}</div> : null}
        </div>
      </div>
    );
  }
}

export default App;
