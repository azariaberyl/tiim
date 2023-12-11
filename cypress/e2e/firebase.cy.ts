const login = () => {
  cy.session('login', () => {
    cy.visit('http://localhost:3000');
    // cy.getDataTest('login').should('have.text', 'LOGIN').click();
    // cy.getDataTest('logout').should('exist');
  });
};
// TODO:Firebase test
describe('Write and Read', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.getDataTest('logout').should('exist');
  });
  it('should can write data to firebase', () => {
    cy.editTimer({ title: 'Testing' });
    cy.addTimer();
    cy.editTimer({ title: 'Testing2' });
    cy.countdown({ tick: 25 * 60 * 1000, login: true });
    cy.visit('http://localhost:3000');
    cy.goToReportDetail();
    cy.getDataTest('report-detail-label').should('have.text', 'Testing2');
    cy.get('.fixed').click();
    cy.countdown({ tick: 25 * 60 * 1000, login: true });
    cy.visit('http://localhost:3000');
    cy.goToReportDetail();
    cy.getDataTest('report-detail-value').should('have.text', '50');
    cy.get('.fixed').click();
    // Delete the timer
    cy.deleteTimer();
    cy.wait(500);
    cy.displayTimerShould({ timer: '25:00', title: 'Testing' });
    cy.deleteTimer();
    cy.wait(500);
    cy.displayTimerShould({ timer: '25:00', title: 'My Project' });
  });
  it('should read data from firebase', () => {
    cy.editTimer({ title: 'Testing 3' });
    cy.displayTimerShould({ timer: '25:00', title: 'Testing 3' });
    cy.wait(500);
    cy.clearAllLocalStorage();
    cy.visit('http://localhost:3000');
    cy.displayTimerShould({ timer: '25:00', title: 'My Project' });
    cy.getDataTest('logout').should('exist');
    cy.displayTimerShould({ timer: '25:00', title: 'Testing 3' });
    cy.deleteTimer();
    cy.wait(500);
    cy.displayTimerShould({ timer: '25:00', title: 'My Project' });
  });
});

describe.only('Replace local', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.wait(500);
    cy.getDataTest('logout').should('not.exist');
  });
  it('should replace data in local even when no data from cloud', () => {
    cy.editTimer({ title: 'Testing 4' });
    cy.displayTimerShould({ timer: '25:00', title: 'Testing 4' });
  });
});
