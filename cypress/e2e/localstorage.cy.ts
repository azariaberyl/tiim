const finishedTimerOnce = () => {
  cy.session(
    'finishedTimerOnce',
    () => {
      cy.visit('http://localhost:3000');
      // Countdown
      cy.clock();
      cy.getDataTest('start-button').click();
      cy.tick(25 * 60 * 1000);
      cy.tick(1 * 1000);
      cy.clock().invoke('restore');
      // Check the local storage
      cy.getDataTest('start-button').should('exist');
    },
    {
      validate() {
        cy.getAllLocalStorage().should('deep.equal', {
          'http://localhost:3000': {
            activeTimerId: '-1',
            timerReports: JSON.stringify([{ id_timer: '-1', reports: [{ date: '1/1/1970', report: 1500 }] }]),
          },
        });
      },
    }
  );
};

describe('save localstorage', () => {
  beforeEach(() => {
    finishedTimerOnce();
    cy.visit('http://localhost:3000');
  });

  it('should have local storage', () => {
    // Check the local storage
    cy.getAllLocalStorage();
  });
});
