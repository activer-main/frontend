import mockAxios from 'jest-mock-axios';

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { LoginRequestType } from 'types/request';
import { userLogin } from 'store/auth/authAction';
import { LoginResponseType } from 'types/response';
import Login from '../index';

// initial state in redux
const mockStore = configureMockStore();
const store = mockStore({
  auth: {
    loading: false,
    userInfo: null,
    userToken: null,
    error: null,
    success: false,
  },
});

async function renderComponent() {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    </Provider>,
  );
}

describe('user is not sign in', () => {
  beforeEach(() => {
  });
  afterEach(() => {
    mockAxios.reset();
  });

  it('should display sign in button', async () => {
    // render
    await renderComponent();

    // find sign in button
    const signButton = screen.getByRole('button', { name: '登入' });

    // assertion
    expect(signButton).toBeInTheDocument();
  });

  it('should register button can go to register page', async () => {
    // render
    await renderComponent();

    // user click register button
    const signupButton = screen.getByRole('button', { name: '註冊' });

    // assertion user in register page
    expect(signupButton).toBeInTheDocument();
  });
});

describe('when user signs in', () => {
  beforeEach(() => {
  });

  it('should call postLogin function on submit button click', async () => {
    // setup login body
    const loginBody: LoginRequestType = {
      email: 'test@example.com',
      password: 'Password1!',
    };

    // setup login response
    const loginResponse: LoginResponseType = {
      user: {
        id: 1,
        email: '',
        verify: false,
        realName: '',
        nickName: '',
        avatar: '',
        gender: '',
        birthdat: new Date(2013, 2, 1, 1, 10),
        profession: '',
        phone: '',
        county: '',
        area: '',
        activityHistory: [],
        tagHistory: [],
      },
      token: {
        accessToken: 'token',
        expireIn: 123,
      },
    };

    // Render Login component
    renderComponent();

    // Fill in form fields
    const emailInput = screen.getByRole('textbox', { name: '帳號' });
    const passwordInput = screen.getByLabelText('密碼');
    userEvent.type(emailInput, loginBody.email);
    userEvent.type(passwordInput, loginBody.password);

    // Submit form
    const submitButton = screen.getByRole('button', { name: '登入' });
    userEvent.click(submitButton);

    // Check sign in, sign up button to be disabled
    // const spinningButton = await screen.findByRole('button', { name: 'spining' });
    // const signupButton = screen.getByRole('button', { name: '註冊' });
    // expect(spinningButton).toBeDisabled();
    // expect(signupButton).toBeDisabled();

    // Check that postLogin function was called with correct arguments
    const actions = store.getActions();
    expect(actions).toContainEqual(userLogin.pending('login padding', loginBody));
    expect(actions).toContainEqual(userLogin.fulfilled(
      loginResponse,
      'login fulfilled',
      loginBody,
    ));
  });
});
