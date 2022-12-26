import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import '../components/css/wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="container-wallet">
        <div className="header-form">
          <Header />
          <WalletForm />
        </div>
        <Table />
      </div>
    );
  }
}

export default Wallet;
