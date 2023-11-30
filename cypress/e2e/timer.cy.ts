describe('template spec', () => {
  beforeEach(() => {});

  it('should display correct time', () => {
    cy.visit('http://localhost:3000/');
    cy.getDataTest('display-timer').contains('25:00');
  });

  it('should countdown', () => {
    cy.clock();
    cy.visit('http://localhost:3000/');
    cy.get('.px-20').should('have.text', 'START').click().should('have.text', 'PAUSE');
    cy.tick(1000);
    cy.getDataTest('display-timer').should('have.text', '24:59');
    cy.tick(1000);
    cy.getDataTest('display-timer').should('have.text', '24:58');
    cy.tick(1000);
    cy.getDataTest('display-timer').should('have.text', '24:57');
    cy.tick(1000);
    cy.getDataTest('display-timer').should('have.text', '24:56');
    cy.tick(1000);
    cy.getDataTest('display-timer').should('have.text', '24:55');
  });

  it('should be zero if the timer is up', async () => {
    cy.clock();
    cy.visit('http://localhost:3000/');
    cy.get('.px-20').should('have.text', 'START').click().should('have.text', 'PAUSE');
    cy.tick(1501_000);
    cy.getDataTest('display-timer').should('have.text', '00:00');
  });
});
