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
    cy.getAllLocalStorage().should('deep.equal', {
      'http://localhost:3000': {
        activeTimerId: '-1',
        timerReports: JSON.stringify([{ id_timer: '-1', reports: [{ date: '1/1/1970', report: 1500 }] }]),
      },
    });
  });

  it('should added the report to the localstorage if the day is still same', () => {
    // Countdown
    cy.clock();
    cy.getDataTest('start-button').click();
    cy.tick(25 * 60 * 1000);
    cy.tick(1 * 1000);
    cy.clock().invoke('restore');
    // Check the local storage
    cy.getDataTest('start-button').should('exist');
    cy.getAllLocalStorage().should('deep.equal', {
      'http://localhost:3000': {
        activeTimerId: '-1',
        timerReports: JSON.stringify([{ id_timer: '-1', reports: [{ date: '1/1/1970', report: 3000 }] }]),
      },
    });
    // Check the report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').should('have.text', '50');
    cy.getDataTest('report-detail-label').should('contain.text', 'My Project');
    cy.reload();
    // Check the report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').should('have.text', '50');
    cy.getDataTest('report-detail-label').should('contain.text', 'My Project');
  });

  it('should edit timer and localstorage', () => {
    // Edit timer
    cy.getDataTest('edit-button').click();
    cy.getDataTest('modal').should('exist');
    cy.getDataTest('input-title').clear().type('Testing2');
    cy.getDataTest('edit-submit').click();
    // Check the report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').should('have.text', '25');
    cy.getDataTest('report-detail-label').should('contain.text', 'Testing2');
    // Check the local storage
    cy.getDataTest('start-button').should('exist');
    cy.getAllLocalStorage().should('deep.equal', {
      'http://localhost:3000': {
        activeTimerId: '-1',
        timerReports: JSON.stringify([{ id_timer: '-1', reports: [{ date: '1/1/1970', report: 1500 }] }]),
        timers: JSON.stringify([{ id: '-1', longBreak: 600, shortBreak: 300, seconds: 1500, title: 'Testing2' }]),
      },
    });
  });

  it('should add timer and report to localStorage', () => {
    // Edit timer
    cy.getDataTest('edit-button').click();
    cy.getDataTest('modal').should('exist');
    cy.getDataTest('input-title').clear().type('Testing');
    cy.getDataTest('edit-submit').click();
    // Add timer
    cy.getDataTest('timer-title').click();
    cy.getDataTest('add-timer').should('exist').click();
    cy.getDataTest('timer-title').should('contain', 'My Project');
    cy.getDataTest('display-timer').should('contain', '25:00');
    // Countdown
    cy.clock();
    cy.getDataTest('start-button').click();
    cy.tick(25 * 60 * 1000);
    cy.tick(1 * 1000);
    cy.clock().invoke('restore');
    // Check the report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').eq(1).should('have.text', '25');
    cy.getDataTest('report-detail-label').eq(1).should('contain.text', 'My Project');
    // Check the local storage
    cy.getAllLocalStorage().then((val) => {
      const data = val['http://localhost:3000'];
      const activeTimerId = data.activeTimerId;
      const timerReports = JSON.parse(data.timerReports);
      const timers = JSON.parse(data.timers);

      expect(activeTimerId).to.not.equal('-1');
      // Assess timer reports
      expect(timerReports[0]).to.deep.equal({ id_timer: '-1', reports: [{ date: '1/1/1970', report: 1500 }] });
      expect(timerReports[1].id).not.to.equal('-1');
      expect(timerReports[1].reports).to.deep.equal([{ date: '1/1/1970', report: 1500 }]);
      // Assess timers
      expect(timers[0]).to.deep.equal({ id: '-1', longBreak: 600, shortBreak: 300, seconds: 1500, title: 'Testing' });
      expect(timers[1]).to.deep.contains({
        shortBreak: 300,
        longBreak: 600,
        seconds: 1500,
        title: 'My Project',
      });
    });
    // Check the localhost after relaod
    cy.reload();
    cy.getAllLocalStorage().then((val) => {
      const data = val['http://localhost:3000'];
      const activeTimerId = data.activeTimerId;
      const timerReports = JSON.parse(data.timerReports);
      const timers = JSON.parse(data.timers);

      expect(activeTimerId).to.not.equal('-1');
      // Assess timer reports
      expect(timerReports[0]).to.deep.equal({ id_timer: '-1', reports: [{ date: '1/1/1970', report: 1500 }] });
      expect(timerReports[1].id).not.to.equal('-1');
      expect(timerReports[1].reports).to.deep.equal([{ date: '1/1/1970', report: 1500 }]);
      // Assess timers
      expect(timers[0]).to.deep.equal({ id: '-1', longBreak: 600, shortBreak: 300, seconds: 1500, title: 'Testing' });
      expect(timers[1]).to.deep.contains({
        shortBreak: 300,
        longBreak: 600,
        seconds: 1500,
        title: 'My Project',
      });
    });
    // Edit timer
    cy.getDataTest('edit-button').click();
    cy.getDataTest('modal').should('exist');
    cy.getDataTest('input-title').clear().type('Testing2');
    cy.getDataTest('edit-submit').click();
    // Check the report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').eq(1).should('have.text', '25');
    cy.getDataTest('report-detail-label').eq(1).should('contain.text', 'Testing2');
    // Check the local storage
    cy.getDataTest('start-button').should('exist');
    cy.getAllLocalStorage().then((val) => {
      const data = val['http://localhost:3000'];
      const timers = JSON.parse(data.timers);
      // Assess timers
      expect(timers[0]).to.deep.equal({ id: '-1', longBreak: 600, shortBreak: 300, seconds: 1500, title: 'Testing' });
      expect(timers[1]).to.deep.contains({
        shortBreak: 300,
        longBreak: 600,
        seconds: 1500,
        title: 'Testing2',
      });
    });
    // Add the third timer
    cy.get('.fixed').click();
    // Add timer
    cy.getDataTest('timer-title').click();
    cy.getDataTest('add-timer').should('exist').click();
    cy.getDataTest('timer-title').should('contain', 'My Project');
    cy.getDataTest('display-timer').should('contain', '25:00');
    // Countdown
    cy.clock();
    cy.getDataTest('start-button').click();
    cy.tick(25 * 60 * 1000);
    cy.tick(1 * 1000);
    cy.clock().invoke('restore');
    // Check the report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').eq(2).should('have.text', '25');
    cy.getDataTest('report-detail-label').eq(2).should('contain.text', 'My Project');
    // Check the local storage
    cy.getAllLocalStorage().then((val) => {
      const data = val['http://localhost:3000'];
      const activeTimerId = data.activeTimerId;
      const timerReports = JSON.parse(data.timerReports);
      const timers = JSON.parse(data.timers);

      expect(activeTimerId).to.not.equal('-1');
      // Assess timer reports
      expect(timerReports[2].id).not.to.equal('-1');
      expect(timerReports[2].reports).to.deep.equal([{ date: '1/1/1970', report: 1500 }]);
      // Assess timers
      expect(timers[2]).to.deep.contains({
        shortBreak: 300,
        longBreak: 600,
        seconds: 1500,
        title: 'My Project',
      });
    });
    // Check the localhost after relaod
    cy.reload();
    cy.getAllLocalStorage().then((val) => {
      const data = val['http://localhost:3000'];
      const activeTimerId = data.activeTimerId;
      const timerReports = JSON.parse(data.timerReports);
      const timers = JSON.parse(data.timers);

      expect(activeTimerId).to.not.equal('-1');
      // Assess timer reports
      expect(timerReports[2].id).not.to.equal('-1');
      expect(timerReports[2].reports).to.deep.equal([{ date: '1/1/1970', report: 1500 }]);
      // Assess timers
      expect(timers[2]).to.deep.contains({
        shortBreak: 300,
        longBreak: 600,
        seconds: 1500,
        title: 'My Project',
      });
    });
    // Edit timer
    cy.getDataTest('edit-button').click();
    cy.getDataTest('modal').should('exist');
    cy.getDataTest('input-title').clear().type('Testing3');
    cy.getDataTest('edit-submit').click();
    // Check the report
    cy.getDataTest('report-button').click();
    cy.getDataTest('report-tab').eq(1).click();
    cy.getDataTest('report-detail-value').eq(2).should('have.text', '25');
    cy.getDataTest('report-detail-label').eq(2).should('contain.text', 'Testing3');
    // Check the local storage
    cy.getDataTest('start-button').should('exist');
    cy.getAllLocalStorage().then((val) => {
      const data = val['http://localhost:3000'];
      const timers = JSON.parse(data.timers);
      // Assess timers
      expect(timers[2]).to.deep.contains({
        shortBreak: 300,
        longBreak: 600,
        seconds: 1500,
        title: 'Testing3',
      });
    });
  });
});
