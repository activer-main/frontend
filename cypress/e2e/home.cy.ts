import activityResponse from '../fixtures/activity-response.json';

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('進首頁時, 應顯示熱門和最新活動', () => {
    // 攔截熱門和最新活動 API
    cy.mockTrendActivityApi(activityResponse, 200).as('trend-activity');
    cy.mockNewestActivityApi(activityResponse, 200).as('newest-activity');

    // 確認熱門和最新活動標籤是否存在
    cy.get('h2').contains('最新活動').should('exist');
    cy.get('h2').contains('熱門活動').should('exist');

    // 等待活動 API 接收
    cy.wait('@trend-activity');
    cy.wait('@newest-activity');

    // 確認熱門活動顯示正確
    cy.get('[data-testid="trend-activity"]')
      .children()
      .should('have.length', activityResponse.searchResultData.length)
      .each(($child, index) => {
        cy.wrap($child)
          .should('contain.text', activityResponse.searchResultData[index].title);
      });

    // 確認最新活動顯示正確
    cy.get('[data-testid="newest-activity"]')
      .children()
      .should('have.length', activityResponse.searchResultData.length)
      .each(($child, index) => {
        cy.wrap($child)
          .should('contain.text', activityResponse.searchResultData[index].title);
      });
  });
});
