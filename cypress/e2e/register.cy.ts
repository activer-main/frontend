import { URL as API_URL } from 'utils/apiURL';
import userData from '../fixtures/user.json';

describe('Register screen', () => {
  beforeEach(() => {
    // mock token api
    cy.mockTokenApi('user', '', 401);

    cy.visit('/register');
  });

  it('註冊頁面顯示正確', () => {
    // assertion exist
    // 註冊標題
    cy.get('.MuiTypography-root').should('have.text', 'Sign up');

    // 使用者名稱輸入欄是否存在
    cy.get('#username').should('exist');

    // 電子郵件輸入欄是否存在
    cy.get('#email').should('have.attr', 'type', 'email');

    // 密碼輸入欄 type 是否為密碼
    cy.get('#password').should('have.attr', 'type', 'password');

    // 確認密碼輸入欄 type 是否為密碼
    cy.get('#confirmPassword').should('have.attr', 'type', 'password');

    // 註冊按鈕是否存在
    cy.get('button[type="submit"]').should('have.text', '註冊');
  });

  it('密碼和確認密碼不相同時, 應顯示錯誤訊息', () => {
    // enter wrong password and confirmPassword
    cy.get('#username').type('testuser');
    cy.get('#email').type('testuser@example.com');
    cy.get('#password').type('password');
    cy.get('#confirmPassword').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // assertion
    // 錯誤訊息是否跳出
    cy.get('[role="alert"].Toastify__toast-body').should('have.text', '密碼不相同');
    // 密碼欄有 invaild
  });

  it('帳號密碼錯誤時, 應顯示錯誤訊息', () => {
    // mock signup api
    cy.mockSignUpApi(401, '帳號或密碼錯誤');

    // enter wrong password and confirmPassword
    cy.get('#username').type('testuser');
    cy.get('#email').type('testuser@example.com');
    cy.get('#password').type('password');
    cy.get('#confirmPassword').type('password');
    cy.get('button[type="submit"]').click();

    // assertion
    // 錯誤訊息是否跳出
    cy.get('[role="alert"].Toastify__toast-body').should('have.text', '帳號或密碼錯誤');
  });

  it('註冊成功時, 應跳轉到驗證頁面', () => {
    cy.intercept('POST', `${API_URL}/api/user/auth/signup`, {
      delay: 1000,
      statusCode: 200,
      body: userData,
    }).as('loginRequest');

    cy.mockTokenApi('user', 'userToken', 200);

    // setup user
    const username = 'testuseraaa';
    const email = 'testuseraaa@example.com';
    const password = 'Password1!';

    // fill register form
    cy.get('#username').type(username);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#confirmPassword').type(password);

    // click register button
    cy.get('button[type="submit"]').click();

    // check if user is redirected to login screen
    cy.url().should('include', '/verify');
  });
});
