import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import mockAxios from 'jest-mock-axios';

import { UserDataType, UserInfoType } from 'types/user';
import userEvent from '@testing-library/user-event';

import Login from '../index';

// server url
const IP = '220.132.244.41';
const PORT = '5044';

export const URL = `http://${IP}:${PORT}`;

// mock user data
const mockUserData: UserInfoType = {
  id: 1,
  email: '',
  verify: false,
  realName: 'onandon',
  nickName: 'onandon',
  avatar: 'onandon',
  gender: 'onandon',
  birthdat: new Date(2020, 6, 9),
  profession: 'onandon',
  phone: 'onandon',
  county: 'onandon',
  area: 'onandon',
  activityHistory: [],
  tagHistory: [],
};

// render login component
function renderComponent() {
  const initialState: UserDataType = {
    loading: false,
    userInfo: null, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
  };

  const mockStore = configureStore([]);
  const store: ReturnType<typeof mockStore> = mockStore(initialState);

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>,
  );
}

describe('When user is not login', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
  });

  it('Login page should renders correctly', () => {
    renderComponent();

    expect(screen.getByRole('heading', { name: '登入' })).toBeInTheDocument();
    expect(screen.getByRole('email')).toBeInTheDocument();
    expect(screen.getByLabelText('密碼')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '登入' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '註冊' })).toBeInTheDocument();
  });

  it('Submits form data correctly', () => {
    // setup login body
    const email = 'test@example.com';
    const password = 'Test123!';

    // mock catch fn
    const catchFn = jest.fn();

    // render component
    renderComponent();

    // simulate user login process
    userEvent.type(screen.getByRole('email'), email);
    userEvent.type(screen.getByLabelText('密碼'), password);
    userEvent.click(screen.getByRole('button', { name: '登入' }));

    // assert login api is called
    expect(mockAxios.post).toHaveBeenCalledWith(
      `${URL}/auth/signin`,
      { email, password },
    );

    // assert api don't have error
    expect(catchFn).not.toHaveBeenCalled();
  });
});

// =====================

describe('When user login', () => {
  it('redirects to profile page if user is authenticated', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      auth: {
        loading: false,
        userInfo: mockUserData, // for user object
        userToken: 'testToken', // for storing the JWT
        error: null,
        success: false, // for monitoring the registration process.
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('heading', { name: '登入' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
  });
});
