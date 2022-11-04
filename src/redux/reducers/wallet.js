// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'REQUEST_WALLET':
    return {
      ...state,
    };
  case 'RESPONSE_WALLET_SUCCESS':
    return { ...state,
      currencies: Object.keys(action.payload),
    };
  case 'RESPONSE_WALLET_ERROR':
    return { ...state,
      currencies: action.payload };
  case 'RESPONSE_EXPENSE_SUCCESS':
    return { ...state,
      expenses: [...state.expenses,
        action.payload],
      idToEdit: state.idToEdit + 1,
    };
  case 'DELETE_ITEM':
    return { ...state,
      expenses: action.payload,
    };

  default:
    return state;
  }
};

export default wallet;
