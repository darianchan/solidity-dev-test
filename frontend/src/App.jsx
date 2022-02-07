import "./App.css";
import React from "react";

class App extends React.Component {
  constructor() {
    super()

    this.state={}
  }

  render() {
    return(
      <div>
        <form>
          <input type="number" name="moonCoin"></input>
          <label>Moon Coin Amount</label>

          <br/>
          <button>Swap</button>
        </form>
      </div>
    )
  }
}

export default App;
