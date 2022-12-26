import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  value = () => {
    const { expenses } = this.props;
    const sumOfAll = expenses.reduce((acc, curr) => {
      const price = curr.exchangeRates[curr.currency].ask;
      acc += Number(price * curr.value);
      return acc;
    }, 0);
    return sumOfAll.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header className="header-container">
        <h1 className="title">TrybeWallet</h1>
        <p data-testid="total-field" className="field">
          Total de despesas:
          {' '}
          { this.value() }
          {' '}
          BRL
        </p>
        {/* <p data-testid="header-currency-field" className="currency"> BRL</p> */}
        <p data-testid="email-field" className="email">{ email }</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Header);
