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
  default:
    return state;
  }
};

export default wallet;
