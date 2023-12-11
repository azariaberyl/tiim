const today = new Date();
const tenDayAgo = today.setDate(today.getDate() - 10);
const nineDayAgo = today.setDate(today.getDate() + 1);
const eightDayAgo = today.setDate(today.getDate() + 1);
const sevenDayAgo = today.setDate(today.getDate() + 1);
const sixDayAgo = today.setDate(today.getDate() + 1);
const fiveDayAgo = today.setDate(today.getDate() + 1);
const fourDayAgo = today.setDate(today.getDate() + 1);
const threeDayAgo = today.setDate(today.getDate() + 1);
const twoDayAgo = today.setDate(today.getDate() + 1);
const oneDayAgo = today.setDate(today.getDate() + 1);
describe('2 Timer 10 Days Report', () => {
  today.setDate(today.getDate() + 1);
  beforeEach(() => {
    cy.session('2timers', () => {
      // 10
      cy.visit('http://localhost:3000');
      cy.editTimer({ title: 'Testing', timermin: '60' });
      cy.countdown({ date: new Date(tenDayAgo), tick: 60 * 60 * 1000 });
      cy.countdown({ date: new Date(tenDayAgo), tick: 60 * 60 * 1000 });
      cy.visit('http://localhost:3000');
      cy.addTimer();
      cy.editTimer({ title: 'Testing2' });
      cy.countdown({ date: new Date(tenDayAgo), tick: 25 * 60 * 1000 });
      // 9
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '60:00', title: 'Testing' });
      cy.countdown({ date: new Date(nineDayAgo), tick: 60 * 60 * 1000 });
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '25:00', title: 'Testing2' });
      cy.countdown({ date: new Date(nineDayAgo), tick: 25 * 60 * 1000 });
      // 8
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '60:00', title: 'Testing' });
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '25:00', title: 'Testing2' });
      cy.countdown({ date: new Date(eightDayAgo), tick: 25 * 60 * 1000 });
      // 7
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '60:00', title: 'Testing' });
      cy.countdown({ date: new Date(sevenDayAgo), tick: 60 * 60 * 1000 });
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '25:00', title: 'Testing2' });
      // 6
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '60:00', title: 'Testing' });
      cy.countdown({ date: new Date(sixDayAgo), tick: 60 * 60 * 1000 });
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '25:00', title: 'Testing2' });
      cy.countdown({ date: new Date(sixDayAgo), tick: 25 * 60 * 1000 });
      // 5
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '60:00', title: 'Testing' });
      cy.countdown({ date: new Date(fiveDayAgo), tick: 60 * 60 * 1000 });
      cy.countdown({ date: new Date(fiveDayAgo), tick: 60 * 60 * 1000 });
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '25:00', title: 'Testing2' });
      cy.countdown({ date: new Date(fiveDayAgo), tick: 25 * 60 * 1000 });
      // 4
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '60:00', title: 'Testing' });
      cy.countdown({ date: new Date(fourDayAgo), tick: 60 * 60 * 1000 });
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '25:00', title: 'Testing2' });
      cy.countdown({ date: new Date(fourDayAgo), tick: 25 * 60 * 1000 });
      cy.countdown({ date: new Date(fourDayAgo), tick: 25 * 60 * 1000 });
      // 3
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '60:00', title: 'Testing' });
      cy.countdown({ date: new Date(threeDayAgo), tick: 60 * 60 * 1000 });
      cy.countdown({ date: new Date(threeDayAgo), tick: 60 * 60 * 1000 });
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '25:00', title: 'Testing2' });
      cy.countdown({ date: new Date(threeDayAgo), tick: 25 * 60 * 1000 });
      cy.countdown({ date: new Date(threeDayAgo), tick: 25 * 60 * 1000 });
      // 2
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '60:00', title: 'Testing' });
      cy.countdown({ date: new Date(twoDayAgo), tick: 60 * 60 * 1000 });
      cy.countdown({ date: new Date(twoDayAgo), tick: 60 * 60 * 1000 });
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '25:00', title: 'Testing2' });
      cy.countdown({ date: new Date(twoDayAgo), tick: 25 * 60 * 1000 });
      cy.countdown({ date: new Date(twoDayAgo), tick: 25 * 60 * 1000 });
      // 1
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '60:00', title: 'Testing' });
      cy.countdown({ date: new Date(oneDayAgo), tick: 60 * 60 * 1000 });
      cy.countdown({ date: new Date(oneDayAgo), tick: 60 * 60 * 1000 });
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '25:00', title: 'Testing2' });
      cy.countdown({ date: new Date(oneDayAgo), tick: 25 * 60 * 1000 });
      // 0
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '60:00', title: 'Testing' });
      cy.countdown({ date: new Date(today), tick: 60 * 60 * 1000 });
      cy.changeTimer(0);
      cy.displayTimerShould({ timer: '25:00', title: 'Testing2' });
      cy.countdown({ date: new Date(today), tick: 25 * 60 * 1000 });
      cy.countdown({ date: new Date(today), tick: 25 * 60 * 1000 });
    });
    cy.visit('http://localhost:3000');
  });

  it('should display all the timer', () => {});
});

describe('3 Timer 10 Days but one of the timer not used after ninth day', () => {
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
  beforeEach(() => {
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
  });
  it('should display the time correctly', () => {
    cy.visit('http://localhost:3000');
  });
});

// TODO: Loging user
describe.only('Logging and cloud functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('should login', () => {});
});
