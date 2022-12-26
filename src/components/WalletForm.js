import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWallet, expensesFetch } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWallet());
  }

  OnInputChange = ({ target }) => {
    const { name, type, checked } = target;
    const value = type === 'checkbox' ? checked : target.value;
    this.setState({ [name]: value });
  };

  BtnChange = () => {
    const { dispatch } = this.props;
    dispatch(expensesFetch(this.state));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const { OnInputChange } = this;
    return (
      <form className="form-container">
        <div className="input-container">
          <label htmlFor="description">
            Descrição
            {' '}
            <input
              data-testid="description-input"
              className="input-desc"
              id="description"
              name="description"
              value={ description }
              onChange={ OnInputChange }
            />
          </label>
          <label htmlFor="valueInput">
            Valor
            {' '}
            <input
              data-testid="value-input"
              className="input-value"
              id="valueInput"
              name="value"
              type="number"
              value={ value }
              onChange={ OnInputChange }
            />
          </label>
          <label htmlFor="coin">
            Moeda
            {' '}
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
                >
                  {el}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="payment">
            Método de pagamento
            {' '}
            <select
              data-testid="method-input"
              id="payment"
              name="method"
              value={ method }
              onChange={ OnInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="expense">
            Categoria de Despesa
            {' '}
            <select
              data-testid="tag-input"
              id="expense"
              name="tag"
              value={ tag }
              onChange={ OnInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <div className="btn-container">
          <button
            className="btn-add"
            type="button"
            onClick={ this.BtnChange }
          >
            Adicionar despesa
          </button>
        </div>
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
