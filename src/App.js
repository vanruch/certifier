import React, { Component } from 'react';
import Web3 from 'web3';
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
    this.web3 = new Web3(window.web3.currentProvider);
    this.CertifierContract = new this.web3.eth.Contract(certifierArtifacts.abi, CERTIFIER_ADDRESS);
  }

  updateAddress(input) {
    this.setState({ address: input.target.value });
  }

  certify() {
    if (!this.state.address)
      return;
    web3.eth.getAccounts(accounts =>
      this.CertifierContract.methods.certify(this.state.address).send({ from: accounts[0] })
        .then(receipt => console.log(receipt)));
  }

  render() {
    return (
      <div className="App">
        <h1> Ambrosus checker </h1>
        <p> Check your address balance and verification status </p>
        <p><input type="text" placeholder="Your wallet address" onChange={this.updateAddress.bind(this)}/></p>
        <br/>
        <button onClick={() => this.certify()}>Certify</button>
      </div>
    );
  }
}

export default App;
