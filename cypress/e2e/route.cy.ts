describe('使用者未登入', () => {
  it('使用者頁面是否會跳轉到登入頁面', () => {
    cy.visit('/user/profile');

    cy.wait(100);

    cy.url().should('include', '/login');
  });
});

describe('使用者已登入', () => {
  beforeEach(() => {
    cy.clearCookie('userToken');

    cy.mockTokenApi('verify-user', 'userToken', 200);
  });

  it('登入頁面是否會跳轉使用者頁面', () => {
    cy.visit('/login');

    cy.wait(100);

    cy.url().should('include', '/user/profile');
  });
  it('註冊頁面是否會跳轉使用者頁面', () => {
    cy.visit('/register');

    cy.wait(100);

    cy.url().should('include', '/user/profile');
  });
  it('驗證頁面是否會跳轉使用者頁面', () => {
    cy.visit('/verify');

    cy.wait(100);

    cy.url().should('include', '/user/profile');
  });
});
