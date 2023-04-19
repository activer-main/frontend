import { URL as API_URL } from 'utils/apiURL';
import userData from '../fixtures/user.json';

describe('Register screen', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should render register form correctly', () => {
    // assertion exist
    cy.get('form.register').should('exist');
    cy.get('.register__header').should('have.text', '註冊');
    cy.get('#form-input-username').should('exist');
    cy.get('#form-input-email').should('have.attr', 'type', 'email');
    cy.get('#form-input-password').should('have.attr', 'type', 'password');
    cy.get('#register-button').should('have.text', '註冊');
    cy.get('#register-cancel-button').should('have.text', '取消');
  });

  it('shows an error message when passwords do not match', () => {
    // enter wrong password and confirmPassword
    cy.get('#form-input-username').type('testuser');
    cy.get('#form-input-email').type('testuser@example.com');
    cy.get('#form-input-password').type('password');
    cy.get('#form-input-confirmPassword').type('wrongpassword');
    cy.get('#register-button').click();

    // assertion
    cy.get('#form-input-password:invalid').should('exist');
  });

  it('successfully registers a new user', () => {
    cy.intercept('POST', `${API_URL}/api/user/auth/signup`, {
      delay: 1000,
      statusCode: 200,
      body: userData,
    }).as('loginRequest');

    // setup user
    const username = 'testuseraaa';
    const email = 'testuseraaa@example.com';
    const password = 'Password1!';

    // fill register form
    cy.get('#form-input-username').type(username);
    cy.get('#form-input-email').type(email);
    cy.get('#form-input-password').type(password);
    cy.get('#form-input-confirmPassword').type(password);

    // click register button
    cy.get('.register__submit').click();

    // check if user is redirected to login screen
    cy.url().should('include', '/login');

    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', '註冊成功');
  });

  it('should navigate to register page on cancel button click', () => {
    cy.get('#register-cancel-button').click();
    cy.url().should('include', '/login');
  });

  it.only('should redirect to profile page but email not authorized', () => {
    // 攔截 api 回傳正確
    cy.intercept('GET', `${API_URL}/api/user/auth/token`, {
      delay: 1000,
      statusCode: 200,
      body: userData,
    }).as('authRequest');

    // 使用者圖片是否存在
    cy.get('.avatar__img').should('exist');

    // 是否到 verify page
    cy.url().should('include', '/verify');
  });
});
