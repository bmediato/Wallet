import getCoins from '../../helpe/ApiCoins';

const SEND_EMAIL = 'SEND_EMAIL';
const REQUEST_WALLET = 'REQUEST_WALLET';
const RESPONSE_WALLET_SUCCESS = 'RESPONSE_WALLET_SUCCESS';
const RESPONSE_WALLET_ERROR = 'RESPONSE_WALLET_ERROR';
const RESPONSE_EXPENSE = 'RESPONSE_EXPENSE';
const RESPONSE_EXPENSE_SUCCESS = 'RESPONSE_EXPENSE_SUCCESS';
const RESPONSE_EXPENSE_ERROR = 'RESPONSE_EXPENSE_ERROR';
const DELETE_ITEM = 'DELETE_ITEM';

export const userAction = (user) => ({
  type: SEND_EMAIL,
  payload: user,
});

export const requestWallet = () => ({
  type: REQUEST_WALLET,
});

export const responseSuccess = (coins) => ({
  type: RESPONSE_WALLET_SUCCESS,
  payload: coins,
});

export const responseError = (error) => ({
  type: RESPONSE_WALLET_ERROR,
  payload: error,
});

export const fetchWallet = () => async (dispatch) => {
  dispatch(requestWallet());

  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    delete response.USDT;
    dispatch(responseSuccess(response));
  } catch (error) {
    dispatch(responseError(error.message));
  }
};

export const responseExpenses = () => ({
  type: RESPONSE_EXPENSE,
});

export const responseExpensesSuccess = (expenses) => ({
  type: RESPONSE_EXPENSE_SUCCESS,
  payload: expenses,
});

export const responseExpensesError = (error) => ({
  type: RESPONSE_EXPENSE_ERROR,
  payload: error,
});

export const expensesFetch = (expenses) => async (dispatch, getState) => {
  try {
    const { wallet: { idToEdit } } = getState();
    dispatch(responseExpenses());
    const response = await getCoins();
    delete response.USDT;
    const newExpenses = {
      id: idToEdit,
      ...expenses,
      exchangeRates: response,
    };
    dispatch(responseExpensesSuccess(newExpenses));
  } catch (error) {
    dispatch(responseExpensesError(error.message));
  }
};

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});
