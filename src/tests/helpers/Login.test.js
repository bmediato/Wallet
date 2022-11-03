import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testando página Login', () => {
  test('Testa se a aplicação contém o texto Login', () => {
    renderWithRouterAndRedux(<App />);

    const login = screen.getByRole('heading', { name: /login/i });
    expect(login).toBeInTheDocument();
  });
  test('Testa se a aplicação tem um input para email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, 'artemis@teste.com');
    expect(inputEmail).toBeInTheDocument();
  });
  test('Testa se a aplicação tem um input para senha', () => {
    renderWithRouterAndRedux(<App />);
    const inputSenha = screen.getByTestId('password-input');
    userEvent.type(inputSenha, 'artemis123');
    expect(inputSenha).toBeInTheDocument();
  });
  test('Testa se a aplicação contém um botão e o mesmo fica desativado caso algum campo estiver vazio', () => {
    renderWithRouterAndRedux(<App />);
    const btn = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');

    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();

    userEvent.type(inputEmail, 'artemis1@teste.com');
    expect(btn).toBeDisabled();

    userEvent.type(inputSenha, 'artemis123');
    expect(btn).toBeDisabled();

    userEvent.type(inputEmail, 'artemis1@teste.com');
    userEvent.type(inputSenha, 'artemis123');
    expect(btn).toBeEnabled();
  });
});
