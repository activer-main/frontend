import React from 'react';
import {
  act,
  fireEvent,
  screen,
} from '@testing-library/react';

import { renderWithProviders } from 'utils/testUtils';
import store from 'store';
import { userLogin } from 'store/auth/authAction';
import { createServer } from 'test/server';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { mockUserData } from 'test/data/user';
import userEvent from '@testing-library/user-event';
import Login from '../index';

// server url
const IP = '220.132.244.41';
const PORT = '5044';

export const URL = `http://${IP}:${PORT}/api/user`;

// const initialState: UserDataType = {
//   loading: false,
//   userInfo: null, // for user object
//   userToken: null, // for storing the JWT
//   error: null,
//   success: false, // for monitoring the registration process.
// };

let isFetchDataCalled = false;

createServer([
  {
    path: 'http://220.132.244.41:5044/api/User/auth/signin',
    method: 'post',
    res: (req, res, ctx) => {
      isFetchDataCalled = true;
      return res(
        ctx.json({
          user: {
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
          },
          token: {
            accessToken: 'test_token',
            expireIn: 52699,
          },
        }),
      );
    },
  },
]);

// Test
describe('Login component', () => {
  it('Login Page render correctly', () => {
    // render component
    renderWithProviders(<Login />);

    // assertion
    expect(screen.getByRole('heading', { name: '登入' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: '帳號' })).toBeInTheDocument();
    expect(screen.getByLabelText('密碼')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '登入' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '註冊' })).toBeInTheDocument();
  });

  it('should submit form with valid credentials', async () => {
    // setup login body
    const email = 'test@test.com';
    const password = 'Test1234!';

    // render component
    renderWithProviders(<Login />);

    // query element
    const emailInput = await screen.findByLabelText('帳號') as HTMLInputElement;
    const passwordInput = await screen.findByLabelText('密碼') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: '登入' }) as HTMLButtonElement;

    // simulate user login
    act(() => {
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: password } });
    });

    screen.debug();

    // Todo: fixbug in handleSubmit
    // mock user click submit button
    // fireEvent.click(submitButton);
    await store.dispatch(userLogin({ email, password }));

    // assertion
    expect(submitButton).toBeDisabled();

    // await screen.findByText('spining');

    console.log(store.getState());
    expect(getIsFetchDataCalled()).toBe(true);
    expect(store.getState().auth.loading).toBe(false);
    // expect(store.getState().auth.userToken).toEqual({ accessToken: 'test_token' });
  });

  // it('should show error message with invalid credentials', async () => {
  //   // render component
  //   renderWithProviders(<Login />);

  //   const emailInput = screen.getByLabelText('帳號') as HTMLInputElement;
  //   const passwordInput = screen.getByLabelText('密碼') as HTMLInputElement;
  //   const submitButton = screen.getByRole('button', { name: '登入' }) as HTMLButtonElement;

  //   userEvent.type(emailInput, 'invalid@test.com');
  //   userEvent.type(passwordInput, 'invalid_password');
  //   userEvent.click(submitButton);

  //   expect(submitButton).toBeDisabled();

  //   await screen.findByText('spining');

  //   expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
  // });
});
