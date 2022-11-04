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
    const inputSenha1 = screen.getByTestId('password-input');
    userEvent.type(inputSenha1, 'artemis123');
    expect(inputSenha1).toBeInTheDocument();
  });
  test('Testa se a aplicação contém um botão e o mesmo fica desativado caso algum campo estiver vazio', () => {
    renderWithRouterAndRedux(<App />);
    const btn = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    const inputSenha = screen.getByTestId('password-input');

    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    userEvent.type(inputEmail, 'artemis1@teste.com');
    expect(btn).toBeDisabled();
  });
  test('Testa se o botão fica habilitado para click e se renderiza para proxima pagina', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByPlaceholderText(/password/i);
    const btn = screen.getByRole('button', { name: /entrar/i });

    expect(btn).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    expect(btn).toBeDisabled();

    userEvent.type(inputEmail, 'artemis1@teste.com');
    userEvent.type(inputSenha, 'artemis123');

    expect(btn).toBeEnabled();
    userEvent.click(btn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});
