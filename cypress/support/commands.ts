/* eslint-disable @typescript-eslint/no-use-before-define */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options:
//       Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { ActivityResponseType } from 'types/response';
import { URL as API_URL } from 'utils/apiURL';

declare global {
  namespace Cypress {
    interface Chainable {
      mockSignInApi(data: string, statusCode: number, message?: string | null): Chainable<void>;
      mockSignUpApi(statusCode: number, message?: string | null): Chainable<void>;
      mockTokenApi(data: string, token: string, statusCode: number): Chainable<void>;
      mockTrendActivityApi(body: ActivityResponseType, statusCode: number): Chainable<void>;
      mockNewestActivityApi(body: ActivityResponseType, statusCode: number): Chainable<void>;
      mockVerifyEmailApi(
        verifyCode: string, statusCode: number, message?: string | null): Chainable<void>;
      enterLoginForm(email: string, password: string): Chainable<void>;
      login(email: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('mockSignInApi', (data, statusCode, message) => {
  cy.fixture(`${data}.json`).then((userData) => {
    cy.intercept('POST', `${API_URL}/api/user/login`, {
      statusCode: statusCode || 200,
      body: statusCode === 200 ? userData : message,
    });
  });
});

Cypress.Commands.add('mockSignUpApi', (statusCode, message) => {
  cy.fixture('user.json').then((userData) => {
    cy.intercept('POST', `${API_URL}/api/user/signup`, {
      statusCode: statusCode || 200,
      body: statusCode === 200 ? userData : message,
    });
  });
});

Cypress.Commands.add('mockVerifyEmailApi', (verifyCode, statusCode, message) => {
  cy.fixture('verify-user.json').then((verifyUserData) => {
    cy.intercept(
      'GET',
      `${API_URL}/api/user/verifyEmail?verifyCode=${verifyCode}`,
      {
        statusCode,
        body: statusCode === 200 ? verifyUserData : message,
      },
    );
  });
});

Cypress.Commands.add('mockTokenApi', (data, token, statusCode) => {
  cy.fixture(`${data}.json`).then((userData) => {
    cy.intercept('GET', `${API_URL}/api/user`, {
      statusCode,
      headers: { authorization: token },
      body: statusCode === 200 ? userData : null,
    });
  });
});

Cypress.Commands.add('mockTrendActivityApi', (body, statusCode) => {
  cy.intercept('POST', `${API_URL}/api/activity/trend`, {
    statusCode,
    body,
  });
});

Cypress.Commands.add('mockNewestActivityApi', (body, statusCode) => {
  cy.intercept('POST', `${API_URL}/api/activity/trend`, {
    statusCode,
    body,
  });
});

Cypress.Commands.add('enterLoginForm', (email, password) => {
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();
});
