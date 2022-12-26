import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userAction } from '../redux/actions';
import '../components/css/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  OnInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    }, this.Validation);
  };

  Validation = () => {
    const { email, password } = this.state;
    const rgxEmail = /^\S+@\S+\.\S+$/;
    const number = 6;
    if (email.match(rgxEmail) && password.length >= number) {
      return this.setState({
        disabled: false,
      });
    }
    this.setState({
      disabled: true,
    });
  };

  Btn = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(userAction(email));
    history.push('/carteira');
  };

  render() {
    const { disabled, email, password } = this.state;
    const { OnInputChange, Btn } = this;
    return (
      <div className="container">
        <div className="container-two">
          <section>
            <div className="h1">
              <h1>Trybe Wallet</h1>
              <hr />
            </div>
            <div className="inputs">

              <input
                className="input-email"
                data-testid="email-input"
                type="text"
                placeholder="E-mail"
                name="email"
                value={ email }
                onChange={ OnInputChange }
              />
              <input
                className="input-password"
                data-testid="password-input"
                placeholder="Password"
                type="password"
                name="password"
                value={ password }
                onChange={ OnInputChange }
              />
            </div>
            <button
              className="btn"
              disabled={ disabled }
              onClick={ Btn }
              type="button"
            >
              Entrar

            </button>
          </section>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
