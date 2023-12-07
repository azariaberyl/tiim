// TODO: Create deleteTimer test
describe('Delete Timer', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.editTimer({ title: 'Testing' });
  });

  it('should delete the timer', () => {
    cy.displayTimerShould({ timer: '25:00', title: 'Testing' });
    cy.deleteTimer();
    cy.displayTimerShould({ timer: '25:00', title: 'My Project' });
  });

  it('should delete another the timer', () => {
    cy.addTimer();
    cy.deleteTimer();
    cy.displayTimerShould({ timer: '25:00', title: 'Testing' });
  });

  it('should delete another the timer from more than 2 timers exist', () => {
    cy.addTimer();
    cy.editTimer({ title: 'Testin2g' });
    cy.addTimer();
    cy.deleteTimer();
    cy.displayTimerShould({ title: 'Testing' });
    // Check how many timer left
    cy.getDataTest('timer-title').click();
    cy.getDataTest('timer').should('have.length', '1'); // One in list and one is used
  });
});

describe('Delete Timer and Report', () => {
  const today = new Date();
  beforeEach(() => {
    cy.session('report', () => {
      cy.visit('http://localhost:3000');
      cy.editTimer({ title: 'Testing' });
      cy.countdown({ page: 'http://localhost:3000', tick: 25 * 1000 * 60, date: today });
    });
    cy.visit('http://localhost:3000');
  });
  it('should delete the report as well then the current timer match with the current report', () => {
    cy.goToReportDetail();
    cy.getDataTest('report-detail-value').should('contain.text', '25');
    cy.get('.fixed').click();
    cy.displayTimerShould({ timer: '25:00', title: 'Testing' });
    cy.deleteTimer();
    cy.displayTimerShould({ timer: '25:00', title: 'My Project' });
    cy.goToReportDetail();
    cy.getDataTest('report-detail-label').should('not.exist');
    cy.getDataTest('report-detail-value').should('not.exist');
  });
  it('should delete the localStorage as well, so when reload users dont see it again', () => {
    cy.getAllLocalStorage().then((val) => {
      const data = val['http://localhost:3000'];
      expect(data).to.deep.contain({
        activeTimerId: '-1',
        timerReports: '[{"id_timer":"-1","reports":[{"date":"12/7/2023","report":1500}]}]',
        timerSecondState: '1500',
        timers: '[{"id":"-1","longBreak":600,"shortBreak":300,"seconds":1500,"title":"Testing"}]',
      });
    });
    cy.deleteTimer();
    cy.getAllLocalStorage().then((val) => {
      const data = val['http://localhost:3000'];
      expect(data).to.not.deep.contain({
        timerReports: '[{"id_timer":"-1","reports":[{"date":"12/7/2023","report":1500}]}]',
        timers: '[{"id":"-1","longBreak":600,"shortBreak":300,"seconds":1500,"title":"Testing"}]',
      });
    });
    cy.displayTimerShould({ timer: '25:00', title: 'My Project' });
  });
  it('should delete 1 of 2 timer and the report as well', () => {
    cy.addTimer();
    cy.editTimer({ title: 'Testing2' });
    cy.countdown({ tick: 25 * 1000 * 60 });
    cy.goToReportDetail();
    cy.getDataTest('report-detail-label').eq(1).should('have.text', `Testing2 (${today.toLocaleDateString()})`);
    cy.get('.fixed').click(); // close the report
    cy.deleteTimer();
    cy.goToReportDetail();
    cy.getDataTest('report-detail-label').eq(1).should('not.exist');
  });
  it.only('should delete timer when its counting down and pause the timer', () => {
    cy.addTimer();
    cy.editTimer({ title: 'Testing2' });
    cy.getDataTest('start-button').click();
    cy.deleteTimer();
    cy.getDataTest('start-button').should('have.text', 'START');
    cy.displayTimerShould({ timer: '25:00', title: 'Testing' });
  });
});
