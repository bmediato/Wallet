import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWallet } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWallet());
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <form>
        <label htmlFor="valueInput">
          Valor
          <input
            data-testid="value-input"
            id="valueInput"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            data-testid="description-input"
            id="description"
          />
        </label>
        <label htmlFor="coin">
          Moeda
          <select
            data-testid="currency-input"
            id="coin"
          >
            {currencies.map((el) => <option key={ el } value={ el }>{el}</option>)}
          </select>
        </label>

        <label htmlFor="payment">
          Método de pagamento
          <select data-testid="method-input" id="payment">
            <option value="dinheiro">Dinheiro</option>
            <option value="cartaocredito">Cartão de crédito</option>
            <option value="cartaodebito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="expense">
          <select data-testid="tag-input" id="expense">
            <option value="alimentação">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
