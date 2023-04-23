describe('使用者登入', () => {
  const unVerifyEmail = 'test@example.com';
  const unVerifyPassword = 'Password1!';
  const verifyEmail = '047633597q@gmail.com';
  const verifyPassword = 'Password1!';

  beforeEach(() => {
    cy.visit('/login');

    // 清除掉 userToken cookies
    cy.clearCookie('userToken');
  });

  it('登入頁面顯示正確', () => {
    // assertion
    // 登入標題
    cy.get('h1').should('contain', '登入');

    // 表單應有 noValidate 屬性
    cy.get('form').should('have.attr', 'novalidate');

    // 驗證電子郵件輸入框是否啟用了自動填入
    cy.get('#email').should('have.attr', 'autocomplete', 'email');

    // 驗證密碼輸入框是否啟用了自動填入
    cy.get('#password').should('have.attr', 'autocomplete', 'current-password');

    // 驗證登入按鈕是否顯示且文字為「登入」
    cy.get('button[type="submit"]').should('contain', '登入');

    // 驗證「忘記密碼？」連結是否存在且文字為「忘記密碼？」
    cy.get('a[href="/"]').should('contain', '忘記密碼?');

    // 驗證「立即註冊」連結是否存在且文字為「立即註冊」
    cy.get('a[href="/register"]').should('contain', '立即註冊');
  });

  it('當空的表單傳出，應顯示錯誤訊息', () => {
    // 定義預期的錯誤訊息
    const errorMsg = '帳號和密碼為必填欄位';

    // 點擊登入按鈕
    cy.get('button[type="submit"]').click();

    // 應出現錯誤訊息 "帳號和密碼為必填欄位"
    // toast 錯誤訊息
    cy.get('[role="alert"].Toastify__toast-body')
      .should('be.visible')
      .and('contain', errorMsg);
  });

  it('輸入錯誤的帳密，應登入失敗且顯示錯誤訊息', () => {
    // 定義預期的錯誤訊息
    const errorMsg = '帳號或密碼錯誤';

    // 輸入無效的 Email 和密碼，然後點擊登入按鈕
    cy.enterLoginForm('invalidemail', 'invalidpassword');

    // 驗證是否出現了錯誤訊息並且其內容為預期的錯誤訊息
    cy.get('.Toastify__toast-body').should('contain', errorMsg);
  });

  it('成功登入後但電子郵件未驗證，應跳轉到驗證頁面', () => {
    // 輸入有效的 Email 和密碼，然後點擊登入按鈕
    cy.enterLoginForm('test@example.com', 'Password1!');

    // 驗證是否成功導向驗證頁面
    cy.url().should('equal', `${Cypress.config().baseUrl}/verify`);
  });

  it('成功登入後，應跳轉到使用者頁面', () => {
    // 輸入有效的 Email 和密碼，然後點擊登入按鈕
    cy.enterLoginForm(verifyEmail, verifyPassword);

    // 跳轉到使用者頁面
    cy.url().should('equal', `${Cypress.config().baseUrl}/user/profile`);
  });

  it('電子郵件驗證成功後，應跳轉到登入頁面', () => {
    // 預設 verify code
    const verifyCode = '123456';

    // 攔截驗證信箱 API 請求，並回傳假的使用者資料
    cy.mockVerifyEmailApi(verifyCode, 200);

    // 輸入有效的 Email 和密碼，然後點擊登入按鈕
    cy.enterLoginForm(unVerifyEmail, unVerifyPassword);

    // 驗證是否成功導向驗證頁面
    cy.url().should('equal', `${Cypress.config().baseUrl}/verify`);

    // 輸入驗證碼並點擊驗證按鈕
    cy.get('.form-input__label').should('have.text', '驗證碼');
    cy.get('.form-input__input').type(verifyCode);
    cy.get('[type="submit"]').should('have.text', '驗證').click();

    // 驗證是否成功導向使用者頁面
    cy.url().should('equal', `${Cypress.config().baseUrl}/user/profile`);
  });

  it('電子信箱驗證失敗，應彈出錯誤驗證密碼視窗', () => {
    // 預設 verify code 和 失敗訊息
    const verifyCode = '123456';
    const errorMsg = '驗證失敗';

    // 攔截驗證信箱 API 請求，並回傳假的使用者資料
    cy.mockVerifyEmailApi(verifyCode, 401, errorMsg);

    // 輸入有效的 Email 和密碼，然後點擊登入按鈕
    cy.enterLoginForm(unVerifyEmail, unVerifyPassword);

    // 驗證是否成功導向驗證頁面
    cy.url().should('equal', `${Cypress.config().baseUrl}/verify`);

    // 輸入驗證碼並點擊驗證按鈕
    cy.get('.form-input__input').type(verifyCode);
    cy.get('[type="submit"]').click();

    // toast 錯誤訊息
    cy.get('[role="alert"].Toastify__toast-body')
      .should('be.visible')
      .and('contain', errorMsg);
  });
});
