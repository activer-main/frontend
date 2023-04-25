import { URL as API_URL } from 'utils/apiURL';
import { TagDataType } from 'types/data';
import searchLocationData from '../fixtures/search-location.json';
import searchResultData from '../fixtures/search-result.json';
import searchFieldData from '../fixtures/search-field.json';
import userData from '../fixtures/user.json';

function testLocationTags(locationData: TagDataType[]) {
  cy.get('#\\:r7\\: option').each(($option, index) => {
    // 比對選項文字是否與 locationData 中的文字一致
    expect($option).to.have.text(locationData[index].text);
  });
}

function selectTags() {
  searchLocationData.forEach((option) => {
    cy.get('#\\:r7\\:')
      .select(option.text)
      .should('have.value', option.text);
  });
}

describe('Search Page', () => {
  beforeEach(() => {
    cy.intercept(`${API_URL}/api/tag/location`, {
      statusCode: 200,
      body: searchLocationData,
    });
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
  });

  it('到搜尋頁面時, 應成功抓取並勾選地點標籤', () => {
    cy.visit('/search');

    // 檢查地點中的選項是否與 searchLocationData 中的資料一致
    testLocationTags(searchLocationData);

    // 選取後是否顯示在 select 上
    selectTags();
  });
});
