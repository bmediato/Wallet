import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';
import Wallet from '../../pages/Wallet';

describe('Testa página Wallet', () => {
  test('Testa se a aplicação contém o email da pessoa logada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btn = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const email = 'artemis1@teste.com';
    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
    userEvent.type(inputEmail, email);
    userEvent.type(inputSenha, 'artemis123');
    expect(btn).toBeEnabled();
    userEvent.click(btn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');

    const emailPerson = screen.getByTestId('email-field');
    expect(emailPerson).toBeInTheDocument();
    expect(emailPerson).toHaveTextContent(email);
  });
  test('testa se a aplicação tem a quantidade de itens adicionados na tela', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const inputCoin = screen.getByTestId('currency-input');
    const inputPayment = screen.getByTestId('method-input');
    const inputType = screen.getByTestId('tag-input');
    const btnAdd = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValue, '10');
    expect(inputValue).toBeInTheDocument();
    userEvent.type(inputDescription, 'mercado');
    expect(inputDescription).toBeInTheDocument();
    expect(inputCoin).toBeInTheDocument();
    expect(inputPayment).toBeInTheDocument();
    expect(inputType).toBeInTheDocument();
    expect(btnAdd).toBeInTheDocument();
  });
});
