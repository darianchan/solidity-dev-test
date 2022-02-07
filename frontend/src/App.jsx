import "./App.css";
import React from "react";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

class App extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.onConnectWallet = this.onConnectWallet.bind(this);
  }

  async onConnectWallet() {
    try {
      console.log("Signed in", await signer.getAddress());
    } catch (err) {
      console.log("Not signed in");
      await provider.send("eth_requestAccounts", []);
    }
  }

  render() {
    return (
      <div>
        <div className="modal">
          <form className="modalContent">
            <input type="number" name="moonCoin"></input>
            <label id="amount">Moon Coin Amount</label>

            <br />
            <button>Swap</button>
          </form>
          <button id="walletButton" onClick={this.onConnectWallet}>Connect Wallet</button>
        </div>
      </div>
    );
  }
}

export default App;
