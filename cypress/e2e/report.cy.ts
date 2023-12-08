const now = new Date();
describe('Report Test', () => {
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

    // Countdown
    cy.clock(now);
    cy.getDataTest('start-button').click();
    cy.tick(60 * 1000 * 60); // min
    cy.getDataTest('display-timer').should('have.text', '00:00');
    cy.tick(1 * 1000); // sec
    cy.clock().invoke('restore');

    // Check the report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').should('have.text', '50');
    cy.getDataTest('report-detail-label').should('contain.text', 'Testing');

    cy.get('.fixed').click(); // Close modal
    cy.getDataTest('edit-button').click();
    cy.getDataTest('modal').should('exist');
    cy.getDataTest('input-title').clear().type('Testing2');
    cy.getDataTest('edit-submit').click();
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-label').should('contain.text', 'Testing2');
  });
});

describe('Add Timer Report Test', () => {
  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('should have the added timer report', () => {
    cy.getDataTest('timer-title').click();
    cy.getDataTest('timer-title-dropdown').should('exist');
    cy.getDataTest('add-timer').should('exist');
    cy.getDataTest('timer-title').click();

    // Edit timer
    cy.getDataTest('edit-button').click();
    cy.getDataTest('modal').should('exist');
    cy.getDataTest('input-title').clear().type('Testing2');
    cy.getDataTest('edit-submit').click();

    // Add timer
    cy.getDataTest('timer-title').click();
    cy.getDataTest('add-timer').should('exist').click();
    cy.getDataTest('timer-title').should('contain', 'My Project');
    cy.getDataTest('display-timer').should('contain', '25:00');

    // Countdown
    cy.clock(now);
    cy.getDataTest('start-button').click();
    cy.tick(25 * 60 * 1000);
    cy.tick(1 * 1000);
    cy.clock().invoke('restore');

    // Check the report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').should('have.text', '25');
    cy.getDataTest('report-detail-label').should('contain.text', 'My Project');

    // Try to change the timer and it should stay the same
    cy.get('.fixed').click(); // Close report's modal
    cy.getDataTest('edit-button').click();
    cy.getDataTest('modal').should('exist');
    cy.getDataTest('input-title').clear().type('Testing3');
    cy.getDataTest('edit-submit').click();

    // Check the report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').should('have.text', '25');
    cy.getDataTest('report-detail-label').should('contain.text', 'Testing3');
    cy.get('.fixed').click();

    // Add another timer
    // Add timer
    cy.getDataTest('timer-title').click();
    cy.getDataTest('add-timer').should('exist').click();
    cy.getDataTest('timer-title').should('contain', 'My Project');
    cy.getDataTest('display-timer').should('contain', '25:00');

    // Countdown
    cy.clock(now);
    cy.getDataTest('start-button').click();
    cy.tick(25 * 60 * 1000);
    cy.tick(1 * 1000);
    cy.clock().invoke('restore');

    // Check the report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').eq(1).should('have.text', '25');
    cy.getDataTest('report-detail-label').eq(1).should('contain.text', 'My Project');

    // Try to change the timer and it should stay the same
    cy.get('.fixed').click(); // Close report's modal
    cy.getDataTest('edit-button').click();
    cy.getDataTest('modal').should('exist');
    cy.getDataTest('input-title').clear().type('Testing4');
    cy.getDataTest('edit-submit').click();

    // Check the report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').eq(1).should('have.text', '25');
    cy.getDataTest('report-detail-label').eq(1).should('contain.text', 'Testing4');
  });

  it('should change timer', () => {
    // Edit timer
    cy.getDataTest('edit-button').click();
    cy.getDataTest('modal').should('exist');
    cy.getDataTest('input-title').clear().type('Testing');
    cy.getDataTest('input-timermin').clear().type('60');
    cy.getDataTest('edit-submit').click();

    // Countdown
    cy.clock(now);
    cy.getDataTest('start-button').click();
    cy.tick(60 * 60 * 1000);
    cy.tick(1 * 1000);
    cy.clock().invoke('restore');

    // Check the report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').should('have.text', '60');
    cy.getDataTest('report-detail-label').should('contain.text', 'Testing');
    cy.get('.fixed').click();

    // Add timer
    cy.getDataTest('timer-title').click();
    cy.getDataTest('add-timer').should('exist').click();
    cy.getDataTest('timer-title').should('contain', 'My Project');
    cy.getDataTest('display-timer').should('contain', '25:00');

    // Countdown
    cy.clock(now);
    cy.getDataTest('start-button').click();
    cy.tick(25 * 60 * 1000);
    cy.tick(1 * 1000);
    cy.clock().invoke('restore');

    // Check the report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').eq(1).should('have.text', '25');
    cy.getDataTest('report-detail-label').eq(1).should('contain.text', 'My Project');
    cy.get('.fixed').click();
  });
});

describe('Paging', () => {
  it('should cant go anywere if it is the only page', () => {});
  it('should can click and get next page', () => {});
  it('should can back previous page', () => {});
  it('should cant go next if it reaches the last page', () => {});
});
