const SEND_EMAIL = 'SEND_EMAIL';
const REQUEST_WALLET = 'REQUEST_WALLET';
const RESPONSE_WALLET_SUCCESS = 'RESPONSE_WALLET_SUCCESS';
const RESPONSE_WALLET_ERROR = 'RESPONSE_WALLET_ERROR';

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
