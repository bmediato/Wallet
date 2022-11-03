import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWallet, expensesFetch } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWallet());
  }

  OnInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  BtnChange = () => {
    const { dispatch } = this.props;
    dispatch(expensesFetch(this.state));
    this.setState = ({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const { OnInputChange } = this;
    return (
      <form>
        <label htmlFor="valueInput">
          Valor
          <input
            data-testid="value-input"
            id="valueInput"
            name="value"
            type="number"
            value={ value }
            onChange={ OnInputChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            data-testid="description-input"
            id="description"
            name="description"
            value={ description }
            onChange={ OnInputChange }
          />
        </label>
        <label htmlFor="coin">
          Moeda
          <select
            data-testid="currency-input"
            id="coin"
            name="currency"
            value={ currency }
            onChange={ OnInputChange }
          >
            {currencies.map((el) => (
              <option
                key={ el }
                name="currency"
                value={ el }
              >
                {el}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="payment">
          Método de pagamento
          <select
            data-testid="method-input"
            id="payment"
            name="method"
            value={ method }
            onChange={ OnInputChange }
          >
            <option name="method" value="dinheiro">Dinheiro</option>
            <option name="method" value="cartaocredito">Cartão de crédito</option>
            <option name="method" value="cartaodebito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="expense">
          <select
            data-testid="tag-input"
            id="expense"
            name="tag"
            value={ tag }
            onChange={ OnInputChange }
          >
            <option name="tag" value="alimentação">Alimentação</option>
            <option name="tag" value="lazer">Lazer</option>
            <option name="tag" value="trabalho">Trabalho</option>
            <option name="tag" value="transporte">Transporte</option>
            <option name="tag" value="saude">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.BtnChange }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
