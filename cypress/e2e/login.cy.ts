import { URL as API_URL } from 'utils/apiURL';
import userData from '../fixtures/login-request.json';

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should render login form correctly', () => {
    cy.get('form.login').should('exist');
    cy.get('form.login h1').should('have.text', '登入');
    cy.get('#form-input-email').should('have.attr', 'type', 'email');
    cy.get('#form-input-password').should('have.attr', 'type', 'password');
    cy.get('[type="submit"]').should('have.text', '登入');
    cy.get('[data-testid="register-button"]').should('have.text', '註冊');
  });

  it('should display error messages on invalid form submission', () => {
    cy.get('#form-input-email').type('onandon@onandon');
    cy.get('#form-input-password').type('Password1!');

    cy.get('[type="submit"]').click();

    cy.get('#form-input-email:invalid').should('exist');
    cy.get('#form-input-password:invalid').should('exist');

    cy.get('[role="alert"]').should('be.visible').and('contain.text', '帳號或密碼錯誤');
  });

  it.only('should display loading spinner on form submission', () => {
    cy.intercept('POST', `${API_URL}/api/user/auth/signin`, {
      delay: 2000,
      statusCode: 200,
      body: userData,
    }).as('loginRequest');

    cy.get('#form-input-email').type('user@example.com');
    cy.get('#form-input-password').type('Password1!');

    cy.get('button[type="submit"]').click();
    cy.get('.loading').should('exist');

    cy.wait('@loginRequest');

    cy.get('.loading').should('not.exist');
  });

  it('should navigate to register page on register button click', () => {
    cy.get('form.login button[type="button"]').click();
    cy.url().should('eq', 'http://localhost:3000/register');
  });
});
