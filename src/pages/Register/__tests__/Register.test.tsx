import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testUtils';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { setupStore } from 'store';
import { userLogin } from 'store/auth/authAction';
import { createServer } from 'test/server';
import { mockUserData } from 'test/data/user';
import { act } from 'react-dom/test-utils';
import Register from '../index';

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
describe('Register component', () => {
  it('Register Page render correctly', () => {
    // render component
    renderWithProviders(
      <MemoryRouter initialEntries={['/register']}>
        <Register />
      </MemoryRouter>,
    );

    // query
    const emailInput = screen.getByRole('textbox', { name: '帳號' });

    // assertion
    expect(screen.getByRole('heading', { name: '註冊' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: '使用者名稱' })).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('密碼')).toBeInTheDocument();
    expect(screen.getByLabelText('確認密碼')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '註冊' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '取消' })).toBeInTheDocument();
  });

  it('redirect authenticated user to profile screen', async () => {
    // setup login body
    const email = 'test@test.com';
    const password = 'Test1234!';

    // setup redux store
    const store = setupStore();
    await store.dispatch(userLogin({ email, password }));

    // mock useNavigate and type
    const navigate = jest.fn();
    const useMockNavigate = useNavigate as jest.Mock;
    useMockNavigate.mockReturnValueOnce(navigate);

    // render component
    renderWithProviders(
      <MemoryRouter initialEntries={['/Register']}>
        <Register />
      </MemoryRouter>,
      { store },
    );

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/user/profile');
  });

  it.only('Should Submit form correctly', async () => {
    // mock useNavigate and type
    const navigate = jest.fn();
    const useMockNavigate = useNavigate as jest.Mock;
    useMockNavigate.mockReturnValueOnce(navigate);

    // render component
    const { store } = renderWithProviders(
      <MemoryRouter initialEntries={['/register']}>
        <Register />
      </MemoryRouter>,
    );

    // query input and button
    const usernameInput = screen.getByRole('textbox', { name: '使用者名稱' });
    const emailInput = screen.getByRole('textbox', { name: '帳號' });
    const passwordInput = screen.getByLabelText('密碼');
    const confirmPasswordInput = screen.getByLabelText('確認密碼');
    const registerButton = screen.getByRole('button', { name: '註冊' });

    // simulate user fill register form
    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'onandon' } });
      fireEvent.change(emailInput, { target: { value: 'onandon@gmail.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'Password1!' } });
    });

    // click register button
    act(() => {
      fireEvent.click(registerButton);
    });

    // assertion
    // user navigate to login page
    // expect(navigate).toHaveBeenCalledTimes(1);
    // expect(navigate).toHaveBeenCalledWith('/login');
    expect(store.getState().auth.success).toBe(true);
    expect(window.location.pathname).toBe('/login');
  });
});
