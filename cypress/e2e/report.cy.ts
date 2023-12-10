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

// TODO: Paging test
describe('Paging', () => {
  const today = new Date();
  const tenDayAgo = today.setDate(today.getDate() - 9);
  const nineDayAgo = today.setDate(today.getDate() + 1);
  const eightDayAgo = today.setDate(today.getDate() + 1);
  const sevenDayAgo = today.setDate(today.getDate() + 1);
  const sixDayAgo = today.setDate(today.getDate() + 1);
  const fiveDayAgo = today.setDate(today.getDate() + 1);
  const fourDayAgo = today.setDate(today.getDate() + 1);
  const threeDayAgo = today.setDate(today.getDate() + 1);
  const twoDayAgo = today.setDate(today.getDate() + 1);
  const oneDayAgo = today.setDate(today.getDate() + 1);
  const dateArray = [
    today,
    oneDayAgo,
    twoDayAgo,
    threeDayAgo,
    fourDayAgo,
    fiveDayAgo,
    sixDayAgo,
    sevenDayAgo,
    eightDayAgo,
    nineDayAgo,
    tenDayAgo,
  ];
  const lotOfReports = () => {
    cy.session('3timers', () => {
      cy.visit('http://localhost:3000');
      cy.editTimer({ title: 'Testing', timermin: '60' });
      // 1
      cy.countdown({ date: new Date(dateArray[9]), tick: 60 * 60 * 1000 });
      cy.visit('http://localhost:3000');
      cy.addTimer();
      cy.editTimer({ title: 'Testing2' });
      cy.countdown({ date: new Date(dateArray[9]), tick: 25 * 60 * 1000 });
      cy.visit('http://localhost:3000');
      cy.addTimer();
      cy.editTimer({ title: 'Testing3' });
      cy.countdown({ date: new Date(dateArray[9]), tick: 25 * 60 * 1000 });
      // 2
      cy.changeTimer(0);
      cy.countdown({ date: new Date(dateArray[8]), tick: 60 * 60 * 1000 });
      cy.visit('http://localhost:3000');
      cy.changeTimer(0);
      cy.countdown({ date: new Date(dateArray[8]), tick: 25 * 60 * 1000 });
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[8]), tick: 25 * 60 * 1000 });
      // 3
      cy.changeTimer(0);
      cy.countdown({ date: new Date(dateArray[7]), tick: 60 * 60 * 1000 });
      cy.visit('http://localhost:3000');
      cy.changeTimer(0);
      cy.countdown({ date: new Date(dateArray[7]), tick: 25 * 60 * 1000 });
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[7]), tick: 25 * 60 * 1000 });
      // 4
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[6]), tick: 25 * 60 * 1000 });
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[6]), tick: 25 * 60 * 1000 });
      // 5
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[5]), tick: 25 * 60 * 1000 });
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[5]), tick: 25 * 60 * 1000 });
      // 6
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[4]), tick: 25 * 60 * 1000 });
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[4]), tick: 25 * 60 * 1000 });
      // 7
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[3]), tick: 25 * 60 * 1000 });
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[3]), tick: 25 * 60 * 1000 });
      // 8
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[2]), tick: 25 * 60 * 1000 });
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[2]), tick: 25 * 60 * 1000 });
      // 9
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[1]), tick: 25 * 60 * 1000 });
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[1]), tick: 25 * 60 * 1000 });
      // 10
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[0]), tick: 25 * 60 * 1000 });
      cy.visit('http://localhost:3000');
      cy.changeTimer(1);
      cy.countdown({ date: new Date(dateArray[0]), tick: 25 * 60 * 1000 });
    });
  };

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should cant go anywere if it is the only page', () => {
    cy.goToReportDetail();
    cy.getDataTest('paging-left-button').should('have.class', 'text-slate-100');
    cy.getDataTest('paging-right-button').should('have.class', 'text-slate-100');
  });
  it('should can click and get next page', () => {
    lotOfReports();
    cy.visit('http://localhost:3000');
    cy.goToReportDetail();
    // Check the date
    cy.getDataTest('report-detail-date').eq(0).should('have.text', `${today.toLocaleDateString()}`);
    // Go to next page
    cy.getDataTest('paging-right-button').should('not.have.class', 'text-slate-100');
    cy.getDataTest('paging-right-button').should('have.class', 'hover:bg-slate-200').click();
    // Check the if it is different
    cy.getDataTest('report-detail-date').eq(0).should('not.have.text', `${today.toLocaleDateString()}`);
  });
  it('should can back previous page', () => {
    lotOfReports();
    cy.visit('http://localhost:3000');
    cy.goToReportDetail();
    // Go to next page
    cy.getDataTest('paging-right-button').should('have.class', 'hover:bg-slate-200').click();
    cy.getDataTest('report-detail-date').eq(0).should('not.have.text', `${today.toLocaleDateString()}`);
    // Go to previous page
    cy.getDataTest('paging-left-button').should('not.have.class', 'text-slate-100');
    cy.getDataTest('paging-left-button').should('have.class', 'hover:bg-slate-200').click();
    cy.getDataTest('report-detail-date').eq(0).should('have.text', `${today.toLocaleDateString()}`);
  });
  it('should cant go next if it reaches the last page', () => {
    lotOfReports();
    cy.visit('http://localhost:3000');
    cy.goToReportDetail();
    // Check the date
    cy.getDataTest('report-detail-date').eq(0).should('have.text', `${today.toLocaleDateString()}`);
    // Go to next page
    cy.getDataTest('paging-right-button').should('have.class', 'hover:bg-slate-200').click();
    cy.getDataTest('report-detail-date').eq(0).should('not.have.text', `${today.toLocaleDateString()}`);
    // Go to next page
    cy.getDataTest('paging-right-button').should('have.class', 'hover:bg-slate-200').click();
    // Check the page
    cy.getDataTest('report-detail-date')
      .eq(0)
      .should('have.text', `${new Date(nineDayAgo).toLocaleDateString()}`);
    // Check next button
    cy.getDataTest('paging-right-button').should('have.class', 'text-slate-100');
  });
});
