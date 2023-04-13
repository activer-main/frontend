import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testUtils';
import { setupStore } from 'store';
import { userLogin } from 'store/auth/authAction';
import { createServer } from 'test/server';
import {
  MemoryRouter, useNavigate, Routes, Route,
} from 'react-router-dom';
import { mockUserData } from 'test/data/user';
import userEvent from '@testing-library/user-event';
import ReactTestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
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
      <MemoryRouter initialEntries={['/login']}>
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

  it('should match snapshot', () => {
    // render component
    const store = setupStore();
    const component = (
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const renderer = ReactTestRenderer.create(component);

    // assertion
    expect(renderer.toJSON()).toMatchSnapshot();
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
      <MemoryRouter initialEntries={['/login']}>
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
    renderWithProviders(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
    );

    // query register button
    const registerButton = screen.getByRole('button', { name: '註冊' });

    // click register button
    userEvent.click(registerButton);

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('/register');
  });
});
