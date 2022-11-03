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
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          {this.value()}
        </p>
        <p data-testid="header-currency-field"> BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};
export default connect(mapStateToProps)(Header);
