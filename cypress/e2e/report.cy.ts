const now = new Date();

describe.only('Report Test', () => {
  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('should have report detail', () => {
    cy.getDataTest('display-timer').should('have.text', '25:00');
    cy.getDataTest('edit-button').click();
    cy.getDataTest('edit-submit').click();
    cy.clock(now);
    cy.getDataTest('start-button').click();
    cy.tick(25 * 1000 * 60);
    cy.getDataTest('display-timer').should('have.text', '00:00');
    cy.tick(1 * 1000);
    cy.clock().invoke('restore');
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').should('have.text', '25');
  });

  it('edited timer should corresponding to the result of the report', () => {
    cy.getDataTest('edit-button').click();
    cy.getDataTest('modal').should('exist');
    cy.getDataTest('input-title').clear().type('Testing');
    cy.getDataTest('input-timermin').clear().type('50');
    cy.getDataTest('input-timersec').clear().type('00');
    cy.getDataTest('edit-submit').click();

    cy.clock(now);
    cy.getDataTest('start-button').click();
    cy.tick(60 * 1000 * 60); // min
    cy.getDataTest('display-timer').should('have.text', '00:00');
    cy.tick(1 * 1000); // sec
    cy.clock().invoke('restore');
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').should('have.text', '50');
    cy.getDataTest('report-detail-label').should('contain.text', 'Testing');

    // Close modal
    cy.get('.fixed').click();
    cy.getDataTest('edit-button').click();
    cy.getDataTest('modal').should('exist');
    cy.getDataTest('input-title').clear().type('Testing2');
    cy.getDataTest('edit-submit').click();
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-label').should('contain.text', 'Testing2');
  });
});
