describe('Register screen', () => {
  beforeEach(() => {
    // mock token api
    cy.mockTokenApi('unverify-user', '', 401);

    cy.visit('/register');

    cy.clearCookie('userToken');
  });

  it('註冊頁面顯示正確', () => {
    // assertion exist
    // 註冊標題
    cy.get('.MuiTypography-root').should('have.text', 'Sign up');

    // 使用者名稱輸入欄是否存在
    cy.get('#username').should('exist');

    // 電子郵件輸入欄屬性是否為 email
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

  it('註冊成功時, 應跳轉到登入頁面', () => {
    cy.mockSignUpApi(200);

    cy.mockTokenApi('unverify-user', 'userToken', 200);

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
    cy.url().should('include', '/login');
  });

  it('點擊取消按鈕, 回到登入頁面', () => {
    // 點擊取消按鈕
    cy.get('[data-testId="cancel-button"] a').click();

    // 確認是否在登入頁面
    cy.url().should('equal', `${Cypress.config().baseUrl}/login`);
  });

  it('從註冊到登入', () => {
    // 攔截註冊 API 並回傳成功
    cy.mockSignUpApi(200, '測試註冊成功');

    // 攔截登入 API 並回傳成功
    cy.mockSignInApi('unverify-user', 200, '測試登入成功');

    // 攔截驗證信箱 API 並回傳成功
    cy.mockVerifyEmailApi('123456', 200, '測試驗證成功');

    // 輸入名稱、信箱、密碼並按下註冊
    cy.get('#username').type('testuser');
    cy.get('#email').type('testuser@example.com');
    cy.get('#password').type('password');
    cy.get('#confirmPassword').type('password');
    cy.get('button[type="submit"]').click();

    // 攔截使用者 API 回傳未驗證使用者資訊
    cy.mockTokenApi('unverify-user', '註冊成功', 200);

    // 確認是否在登入頁面
    cy.url().should('equal', `${Cypress.config().baseUrl}/login`);

    // 輸入帳號、密碼並按下登入按鈕
    cy.enterLoginForm('testuser@example.com', 'password');

    // 確認是否在驗證頁面
    cy.url().should('equal', `${Cypress.config().baseUrl}/verify`);

    // 輸入驗證碼並點擊驗證按鈕
    cy.get('[data-testId="verifyCode-input"]').type('123456');
    cy.get('[type="submit"]').should('have.text', '驗證').click();

    // 攔截使用者 API 回傳驗證使用者資訊
    cy.mockTokenApi('verify-user', '註冊成功', 200);

    // 確認是否在使用者頁面
    cy.url().should('equal', `${Cypress.config().baseUrl}/user/profile`);
  });
});
