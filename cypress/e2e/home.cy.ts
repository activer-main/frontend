import { SegmentRequestType } from 'types/request';
import { ActivityResponseType } from 'types/response';
import { URL as API_URL } from 'utils/apiURL';
import activityData from '../fixtures/activities.json';
// import activityResponse from '../fixtures/activity-response.json';

describe('Home page', () => {
  beforeEach(() => {
    // mock token api
    cy.mockTokenApi('user', '', 200);

    cy.visit('/');
  });

  it.only('進首頁時, 應顯示熱門活動', () => {
    // cy.mockTrendActivityApi(activityResponse, 200);

    cy.get('h2').contains('熱門活動').should('exist');
  });

  it.only('進首頁時, 應抓取並顯示熱門活動', () => {
    const trendRequest: SegmentRequestType = {
      page: 4,
      per: 1,
    };

    cy.get('h2').contains('熱門活動').should('exist');

    cy.request(
      'POST',
      `${API_URL}/api/activity/trend`,
      trendRequest,
    ).then(
      (res: { body: ActivityResponseType }) => {
        cy.get('[data-testid="trend-card"]')
          .should('have.length', res.body.searchResultData.length);
      },
    );
  });

  it('應顯示最新活動', () => {
    const newestActivityRequest: SegmentRequestType = {
      page: 4,
      per: 1,
    };
    cy.get('h2').contains('最新活動').should('exist');

    cy.request(
      'POST',
      `${API_URL}/api/activity/newest`,
      newestActivityRequest,
    ).then(
      (res: { body: ActivityResponseType }) => {
        cy.get('[data-testid="newest-card"]')
          .should('have.length', res.body.searchResultData.length);
      },
    );
  });
});

describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept(`${API_URL}/api/activity/newest`, {
      statusCode: 200,
      body: activityData,
    });
  });
});
