import { URL as API_URL } from 'utils/apiURL';
import searchLocationData from '../fixtures/search-location.json';
import searchResultData from '../fixtures/search-result.json';
import searchFieldData from '../fixtures/search-field.json';
import userData from '../fixtures/user.json';

describe('Search Page', () => {
  beforeEach(() => {
    cy.intercept(`${API_URL}/api/tag/location`, {
      statusCode: 200,
      body: searchLocationData,
    }).as('getLocationTagData');

    cy.intercept(`${API_URL}/api/tag/field`, {
      statusCode: 200,
      body: searchFieldData,
    });
    cy.intercept(`${API_URL}/api/search?*`, {
      statusCode: 200,
      body: searchResultData,
    });
    cy.intercept(`${API_URL}/api/user/auth/token`, {
      statusCode: 200,
      body: userData,
    });

    cy.visit('/search');
    cy.wait('@getLocationTagData');
  });

  it('點擊清除按鈕，應成功清除所有標籤', () => {
    // 檢查地點中的選項是否與 searchLocationData 中的資料一致
    cy.get('[data-testId="location-checkbox"] input[type="checkbox"]')
      .should('have.length', searchLocationData.length);

    // 檢查地點中的選項是否與 fieldLocationData 中的資料一致
    cy.get('[data-testId="field-checkbox"] input[type="checkbox"]')
      .should('have.length', searchFieldData.length);

    // 點擊取消按鈕
    cy.get('[data-testId="location-checkbox"] button').click();

    // 在表單控件標籤中獲取具有指定標籤
    cy.get('[data-testId="location-checkbox"] input[type="checkbox"]').each(($input) => {
      cy.wrap($input).should('not.be.checked');
    });
  });
});
