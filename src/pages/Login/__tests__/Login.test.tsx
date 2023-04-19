import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from 'utils/testUtils';
import { setupStore } from 'store';
import { userLogin } from 'store/auth/authAction';
import { createServer } from 'test/server';
import {
  MemoryRouter, Routes, Route,
} from 'react-router-dom';
import { mockUserData } from 'test/data/user';
import userEvent from '@testing-library/user-event';
import ReactTestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import Register from 'pages/Register';
import Login from '../index';

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

    // render component
    renderWithProviders(
      <MemoryRouter initialEntries={['/login', '/test']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<h1>test</h1>} />
        </Routes>
      </MemoryRouter>,
      { store },
    );

    // assertion not in login page
    expect(screen.queryByRole('heading', { name: '登入' })).not.toBeInTheDocument();
  });

  it('should render to register page', async () => {
    // render component
    renderWithProviders(
      <MemoryRouter initialEntries={['/login', '/register']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </MemoryRouter>,
    );

    // query register button
    const registerButton = screen.getByRole('button', { name: '註冊' });

    // click register button
    userEvent.click(registerButton);

    // assertion
    expect(screen.getByRole('heading', { name: '註冊' })).toBeInTheDocument();
  });

  it('Should submit data correctly', async () => {
    // render component
    const { store, getByLabelText } = renderWithProviders(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>,
    );

    const emailInput = screen.getByLabelText('帳號');
    const passwordInput = getByLabelText('密碼');
    const submitButton = screen.getByRole('button', { name: '登入' });

    act(() => {
      fireEvent.change(emailInput, { target: { value: mockUserData.user.email } });
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    });

    fireEvent.click(submitButton);

    expect(store.getState().auth.loading).toBe(true);
    expect(store.getState().auth.userInfo).toBe(null);

    // Wait for the API call to complete and update the store
    waitFor(() => {
      console.log(store.getState().auth);
      expect(store.getState().auth.loading).toBe(false);
    });
  });
});
