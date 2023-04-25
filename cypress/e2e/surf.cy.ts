import { URL as API_URL } from 'utils/apiURL';
import activityData from '../fixtures/search-result.json';

describe('Surf Page', () => {
  beforeEach(() => {
    cy.intercept(`${API_URL}/api/activity?*`, {
      statusCode: 200,
      body: activityData,
    });
  });
  it('should render location tags when rendering search page', () => {
    cy.visit('/surf');
  });
});
