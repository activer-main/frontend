import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testUtils';
import { setupStore } from 'store';
import { userLogin } from 'store/auth/authAction';
import { createServer } from 'test/server';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { mockUserData } from 'test/data/user';
import userEvent from '@testing-library/user-event';
import Login from '../index';

// Mock the `useNavigate` hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Server URL
const IP = '220.132.244.41';
const PORT = '5044';
export const URL = `http://${IP}:${PORT}/api/user`;

// Mock Server
createServer([
  {
    path: 'http://220.132.244.41:5044/api/User/auth/signin',
    method: 'post',
    res: () => mockUserData,
  },
]);

// Test
describe('Login component', () => {
  it('Login Page render correctly', () => {
    // render component
    renderWithProviders(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    // assertion
    expect(screen.getByRole('heading', { name: '登入' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: '帳號' })).toBeInTheDocument();
    expect(screen.getByLabelText('密碼')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '登入' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '註冊' })).toBeInTheDocument();
  });

  it('should render to previous page if user is already authenticated', async () => {
    // setup login body
    const email = 'test@test.com';
    const password = 'Test1234!';

    // setup redux store
    const store = setupStore();
    await store.dispatch(userLogin({ email, password }));

    const navigate = jest.fn();
    const useMockNavigate = useNavigate as jest.Mock;
    useMockNavigate.mockReturnValueOnce(navigate);

    // render component
    renderWithProviders(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
      { store },
    );

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it('should render to register page', async () => {
    const navigate = jest.fn();
    const useMockNavigate = useNavigate as jest.Mock;
    useMockNavigate.mockReturnValueOnce(navigate);

    // render component
    renderWithProviders(<Login />);

    // query register button
    const registerButton = screen.getByRole('button', { name: '註冊' });

    // click register button
    userEvent.click(registerButton);

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/register');
  });
});
