import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteItem } from '../redux/actions';

class Table extends Component {
  btnDelete = (event) => {
    const { dispatch } = this.props;
    const { target } = event;
    console.log(target);
    dispatch(deleteItem(target.id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((element, i) => (
            <tr key={ i }>
              <td>
                {element.description}
              </td>
              <td>{element.tag}</td>
              <td>{element.method}</td>
              <td>{Number(element.value).toFixed(2)}</td>
              <td>{element.exchangeRates[element.currency].name}</td>
              <td>{Number(element.exchangeRates[element.currency].ask).toFixed(2)}</td>
              <td>
                {Number(element.value * element.exchangeRates[element.currency].ask)
                  .toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  value={ element.id }
                  onClick={ this.btnDelete }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    );
  }
}

Table.propTypes = {}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
