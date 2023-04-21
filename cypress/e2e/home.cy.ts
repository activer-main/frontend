import { SegmentRequestType } from 'types/request';
import { ActivityResponseType } from 'types/response';
import { URL as API_URL } from 'utils/apiURL';

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays Trending Activities', () => {
    const trendRequest: SegmentRequestType = {
      countPerSegment: 4,
      currentSegment: 1,
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

  it('displays Newest Activities', () => {
    const newestActivityRequest: SegmentRequestType = {
      countPerSegment: 4,
      currentSegment: 1,
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
