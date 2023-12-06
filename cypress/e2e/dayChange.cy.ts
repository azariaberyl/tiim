const finishedTimerOnce = (date: number) => {
  const tanggal = new Date(date);
  cy.session(
    'finishedTimerOnce',
    () => {
      cy.visit('http://localhost:3000');
      // Countdown
      cy.clock(date);
      cy.getDataTest('start-button').click();
      cy.tick(25 * 60 * 1000);
      cy.tick(1 * 1000);
      // Check the local storage
      cy.getDataTest('start-button').should('exist');
    },
    {
      validate() {
        cy.getAllLocalStorage().then((val) => {
          expect(val['http://localhost:3000']).to.deep.contain({
            activeTimerId: '-1',
            timerReports: JSON.stringify([
              { id_timer: '-1', reports: [{ date: tanggal.toLocaleDateString(), report: 1500 }] },
            ]),
          });
        });
      },
    }
  );
};

describe('Day change', () => {
  beforeEach(() => {});
  it('should create new report with the same timer when the day changes', () => {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    console.log(date.toLocaleDateString());
    finishedTimerOnce(date.getTime());
    // Next day
    date.setDate(date.getDate() + 1);
    console.log(date.toLocaleDateString());
    cy.clock().invoke('setSystemTime', date.getTime());
    cy.visit('http://localhost:3000/');
    cy.tick(1 * 1000);
    // Countdown
    cy.getDataTest('start-button').click();
    cy.tick(25 * 60 * 1000);
    cy.tick(1 * 1000);
    // cy.clock().invoke('restore');
    cy.getDataTest('start-button').should('have.text', 'START');
    // Check report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').eq(1).should('have.text', '25');
    cy.getDataTest('report-detail-label').eq(1).should('contain.text', 'My Project');
    cy.get('.fixed').click();
    // // Next day
    // date.setDate(date.getDate() + 1);
    // cy.clock(date);
    // cy.visit('http://localhost:3000/');
    // cy.tick(1 * 1000);
    // // Countdown
    // cy.getDataTest('start-button').click();
    // cy.tick(25 * 60 * 1000);
    // cy.tick(1 * 1000);
    // // cy.clock().invoke('restore');
    // cy.getDataTest('start-button').should('have.text', 'START');
    // // Check report
    // cy.getDataTest('report-button').click();
    // cy.getDataTest('report-tab').eq(1).click();
    // cy.getDataTest('report-detail-value').eq(1).should('have.text', '50');
    // cy.getDataTest('report-detail-label').eq(1).should('contain.text', 'My Project');
    // cy.get('.fixed').click();
  });
});
