const finishedTimerOnce = (date: number) => {
  const tanggal = new Date(date);
  cy.session(
    'finishedTimerOnce',
    () => {
      cy.clock(date);
      cy.visit('http://localhost:3000');
      // Countdown
      cy.getDataTest('start-button').click();
      cy.tick(25 * 60 * 1000);
      cy.tick(1 * 1000);
      cy.clock().invoke('restore');
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
  const today = new Date();
  beforeEach(() => {});

  it('should create new report with the same timer when the day changes', () => {
    const firstDay = new Date(today.setDate(today.getDate() - 2));
    const secondDay = new Date(today.setDate(today.getDate() + 1));
    const thirdDay = new Date(today.setDate(today.getDate() + 1));
    console.log(firstDay, secondDay, thirdDay);
    finishedTimerOnce(firstDay.getTime());
    // Next day
    cy.clock(secondDay.getTime());
    cy.visit('http://localhost:3000/');
    cy.tick(1 * 1000);
    // Countdown
    cy.getDataTest('start-button').click();
    cy.tick(25 * 60 * 1000);
    cy.tick(1 * 1000);
    cy.clock().invoke('restore');
    cy.getDataTest('start-button').should('have.text', 'START');
    // Check report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').eq(1).should('have.text', '25');
    cy.getDataTest('report-detail-label').eq(1).should('contain.text', 'My Project (12/5/2023)');
    cy.get('.fixed').click();
    // // Next day
    cy.clock(thirdDay.getTime());
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
    cy.getDataTest('report-detail-value').eq(2).should('have.text', '25');
    cy.getDataTest('report-detail-label').eq(2).should('contain.text', 'My Project (12/6/2023)');
    cy.get('.fixed').click();
    cy.clock().invoke('restore');
    cy.visit('http://localhost:3000/');
  });

  it.only('should create new report with new timer as well', () => {
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    finishedTimerOnce(yesterday.getTime());
    //
    cy.clock(yesterday.getTime());
    cy.visit('http://localhost:3000/');
    // Countdown
    cy.getDataTest('start-button').click();
    cy.tick(60 * 60 * 1000);
    cy.tick(1 * 1000);
    // Add new timer
    cy.getDataTest('timer-title').click();
    cy.getDataTest('add-timer').should('exist').click();
    cy.getDataTest('timer-title').should('contain', 'My Project');
    cy.getDataTest('display-timer').should('contain', '25:00');
    // Edit new timer
    cy.getDataTest('edit-button').click();
    cy.getDataTest('modal').should('exist');
    cy.getDataTest('input-title').clear().type('Testing');
    cy.getDataTest('input-timermin').clear().type('60');
    cy.getDataTest('edit-submit').click();
    // Countdown new timer
    cy.getDataTest('start-button').click();
    cy.tick(60 * 60 * 1000);
    cy.tick(1 * 1000);
    // Next day
    cy.clock().invoke('restore');
    cy.visit('http://localhost:3000/');
  });
});
