import { URL as API_URL } from 'utils/apiURL';
import activityData from '../fixtures/activities.json';

describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept(`${API_URL}/api/activity/newest`, {
      statusCode: 200,
      body: activityData,
    });
  });
});
