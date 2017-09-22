import React, { Component } from 'react';
import Web3 from 'web3';
import tokenArtifacts from './abi/AmberToken.json';
import certifierArtifacts from './abi/Certifier.json';
import './App.css';

const INFURA_URL = 'https://mainnet.infura.io/LRdPGUlZ7Y4yPEkYfPYx';
const TOKEN_ADDRESS = '0x90e62d00ec8e3dc0f40a59389105f678ae027406';
const CERTIFIER_ADDRESS = '0x7b1ab331546f021a40bd4d09ffb802261caaccc9';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { address: undefined };
  }

  componentDidMount() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));
    this.TokenContract = new this.web3.eth.Contract(tokenArtifacts.abi, TOKEN_ADDRESS);
    this.CertifierContract = new this.web3.eth.Contract(certifierArtifacts.abi, CERTIFIER_ADDRESS);
  }

  updateAddress(input) {
    this.setState({address: input.target.value});
  }

  getAmberBalance() {
    if (!this.state.address)
      return;
    this.TokenContract.methods.balanceOf(this.state.address).call((error,balance) => {
      if (error) {
        console.error(error);
        return;
      }
      this.setState({ambBalance: this.web3.utils.fromWei(balance, 'ether')});
    });
  }

  isCertified() {
    if (!this.state.address)
      return;

    this.CertifierContract.methods.certified(this.state.address).call((error, status) => {
      if (error) {
        console.error(error);
        return;
      }
      this.setState({certified: status});
    });
  }

  render() {
    return (
      <div className="App">
        <input type="text" placeholder="Your wallet address" onChange={this.updateAddress.bind(this)}/>
        <button onClick={this.isCertified.bind(this)}>Check certification status</button>
        <button onClick={this.getAmberBalance.bind(this)}>Check Amber balance</button>
        {typeof this.state.certified !== 'undefined' && (<p>Is certified: {this.state.certified.toString()}</p>)}
        {this.state.ambBalance && (<p>Amber balance: {this.state.ambBalance}</p>)}
      </div>
    );
  }
}

export default App;
