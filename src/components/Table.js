import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteItem } from '../redux/actions';

class Table extends Component {
  btnDelete = (element) => {
    const { dispatch, expenses } = this.props;
    const filterId = expenses.filter((elemento) => elemento.id !== element.id);
    dispatch(deleteItem(filterId));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-container">
        <table className="table">
          <thead className="thead-container">
            <tr>
              <th className="description">Descrição</th>
              <th className="tag">Tag</th>
              <th className="method">Método de pagamento</th>
              <th className="value">Valor</th>
              <th className="coin">Moeda</th>
              <th className="cambio">Câmbio utilizado</th>
              <th className="convertedValue">Valor convertido</th>
              <th className="convertedCoin">Moeda de conversão</th>
              <th className="edit-delete">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            <div className="tbody-container">
              {expenses.map((element) => (
                <tr key={ element.id } className="tr">
                  <td className="element-description">
                    {element.description}
                  </td>
                  <td className="element-tag">{element.tag}</td>
                  <td className="element-method">{element.method}</td>
                  <td className="element-value">{Number(element.value).toFixed(2)}</td>
                  <td className="element-name">
                    {element.exchangeRates[element.currency].name}
                  </td>
                  <td className="element-coin">
                    {Number(element.exchangeRates[element.currency].ask).toFixed(2)}
                  </td>
                  <td className="element-converted">
                    {Number(element.value * element.exchangeRates[element.currency].ask)
                      .toFixed(2)}
                  </td>
                  <td className="element-real">Real</td>
                  <td className="buttons">
                    <button
                      data-testid="edit-btn"
                      type="button"
                      className="btn-edit"
                    >
                      Editar
                      {' '}
                    </button>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      className="btn-delete"
                      onClick={ () => this.btnDelete(element) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </div>
          </tbody>

        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
