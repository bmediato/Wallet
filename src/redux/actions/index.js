const SEND_EMAIL = 'SEND_EMAIL';

const userAction = (user) => ({
  type: SEND_EMAIL,
  payload: user,
});

export default userAction;
