describe('Timer Visual', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display correct time', () => {
    cy.getDataTest('display-timer').contains('25:00');
  });

  it('should can change tab', () => {
    cy.getDataTest('timer-tab').eq(0).should('have.class', 'text-white bg-default-light/40');
    cy.getDataTest('timer-tab').eq(1).should('not.have.class', 'text-white bg-default-light/40');
    cy.getDataTest('timer-tab').eq(2).should('not.have.class', 'text-white bg-default-light/40');

    cy.getDataTest('timer-tab').eq(1).click().should('have.class', 'text-white bg-default-light/40');
    cy.getDataTest('display-timer').contains('05:00');

    cy.getDataTest('timer-tab').eq(2).click().should('have.class', 'text-white bg-default-light/40');
    cy.getDataTest('display-timer').contains('10:00');
  });

  it('should can open edit', () => {
    cy.getDataTest('edit-button').click();
    cy.getDataTest('modal').should('exist');
    cy.getDataTest('input-timermin').should('exist').should('have.value', '25');
    cy.getDataTest('input-timersec').should('exist').should('have.value', '00');
    cy.getDataTest('input-shortBreakmin').should('exist').should('have.value', '05');
    cy.getDataTest('input-shortBreaksec').should('exist').should('have.value', '00');
    cy.getDataTest('input-longBreakmin').should('exist').should('have.value', '10');
    cy.getDataTest('input-longBreaksec').should('exist').should('have.value', '00');
  });
});

describe('Countdown test', () => {
  beforeEach(() => {
    cy.clock();
    cy.visit('http://localhost:3000/');
  });
  it('should countdown', () => {
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

  it('should be zero if the timer is up', () => {
    cy.get('.px-20').should('have.text', 'START').click().should('have.text', 'PAUSE');
    cy.tick(1502_000);
    cy.getDataTest('display-timer').should('have.text', '00:00');
    cy.get('.px-20').should('have.text', 'START');
  });

  it('should countdown to zero in short break tab', () => {
    cy.getDataTest('timer-tab').eq(1).click().should('have.class', 'text-white bg-default-light/40');
    cy.getDataTest('display-timer').contains('05:00');
    cy.get('.px-20').should('have.text', 'START').click().should('have.text', 'PAUSE');
    cy.tick(301_000);
    cy.get('.px-20').should('have.text', 'START');
    cy.getDataTest('display-timer').should('have.text', '00:00');
  });

  it('should countdown to zero in long break tab', () => {
    cy.getDataTest('timer-tab').eq(2).click().should('have.class', 'text-white bg-default-light/40');
    cy.getDataTest('display-timer').contains('10:00');
    cy.get('.px-20').should('have.text', 'START').click().should('have.text', 'PAUSE');
    cy.tick(601_000);
    cy.get('.px-20').should('have.text', 'START');
    cy.getDataTest('display-timer').should('have.text', '00:00');
  });
});

describe('Edit Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });
  it('should edit timer and it should be corresponding', () => {
    cy.getDataTest('edit-button').click();
    cy.getDataTest('modal').should('exist');
    cy.getDataTest('input-title').clear().type('Testing');
    cy.getDataTest('input-timermin').clear().type('60');
    cy.getDataTest('input-timersec').clear().type('10');
    cy.getDataTest('input-shortBreakmin').clear().type('15');
    cy.getDataTest('input-shortBreaksec').clear().type('10');
    cy.getDataTest('input-longBreakmin').clear().type('20');
    cy.getDataTest('input-longBreaksec').clear().type('10');
    cy.getDataTest('edit-submit').click();

    cy.getDataTest('timer-title').should('have.text', 'Testing');
    cy.getDataTest('display-timer').should('have.text', '60:10');
    cy.getDataTest('timer-tab').eq(1).click();
    cy.getDataTest('display-timer').should('have.text', '15:10');
    cy.getDataTest('timer-tab').eq(2).click();
    cy.getDataTest('display-timer').should('have.text', '20:10');
  });

  it('should countdown after edit', () => {
    cy.getDataTest('edit-button').click();
    cy.getDataTest('input-title').clear().type('Testing');
    cy.getDataTest('input-timermin').clear().type('60');
    cy.getDataTest('input-timersec').clear().type('10');
    cy.getDataTest('edit-submit').click();

    cy.clock();
    cy.get('.px-20').click();
    cy.tick(3660 * 1000); // 61min
    cy.getDataTest('display-timer').should('have.text', '00:00');
  });

  it('should shortbreak countdown after edit', () => {
    cy.getDataTest('edit-button').click();
    cy.getDataTest('input-title').clear().type('Testing');
    cy.getDataTest('input-shortBreakmin').clear().type('15');
    cy.getDataTest('input-shortBreaksec').clear().type('10');
    cy.getDataTest('edit-submit').click();
    cy.getDataTest('timer-tab').eq(1).click();
    cy.getDataTest('display-timer').should('have.text', '15:10');

    cy.clock();
    cy.get('.px-20').click();
    cy.tick(3660 * 1000); // 61min
    cy.getDataTest('display-timer').should('have.text', '00:00');
  });

  it('should longbreak countdown after edit', () => {
    cy.getDataTest('edit-button').click();
    cy.getDataTest('input-title').clear().type('Testing');
    cy.getDataTest('input-longBreakmin').clear().type('25');
    cy.getDataTest('input-longBreaksec').clear().type('10');
    cy.getDataTest('edit-submit').click();
    cy.getDataTest('timer-tab').eq(2).click();
    cy.getDataTest('display-timer').should('have.text', '25:10');

    cy.clock();
    cy.get('.px-20').click();
    cy.tick(3660 * 1000); // 61min
    cy.getDataTest('display-timer').should('have.text', '00:00');
  });

  it('should edit in short break tab', () => {
    // Go to shortbreak tab and edit
    cy.getDataTest('timer-tab').eq(1).click();
    cy.getDataTest('edit-button').click();
    cy.getDataTest('input-title').clear().type('Testing');
    cy.getDataTest('input-timermin').clear().type('60');
    cy.getDataTest('input-timersec').clear().type('10');
    cy.getDataTest('input-shortBreakmin').clear().type('15');
    cy.getDataTest('input-shortBreaksec').clear().type('10');
    cy.getDataTest('input-longBreakmin').clear().type('20');
    cy.getDataTest('input-longBreaksec').clear().type('10');
    cy.getDataTest('edit-submit').click();

    // Check the update
    cy.getDataTest('timer-title').should('have.text', 'Testing');
    cy.getDataTest('display-timer').should('have.text', '15:10');
    cy.getDataTest('timer-tab').eq(0).click();
    cy.getDataTest('display-timer').should('have.text', '60:10');
    cy.getDataTest('timer-tab').eq(2).click();
    cy.getDataTest('display-timer').should('have.text', '20:10');
  });

  it('should edit in long break tab', () => {
    // Go to shortbreak tab and edit
    cy.getDataTest('timer-tab').eq(2).click();
    cy.getDataTest('edit-button').click();
    cy.getDataTest('input-title').clear().type('Testing');
    cy.getDataTest('input-timermin').clear().type('60');
    cy.getDataTest('input-timersec').clear().type('10');
    cy.getDataTest('input-shortBreakmin').clear().type('15');
    cy.getDataTest('input-shortBreaksec').clear().type('10');
    cy.getDataTest('input-longBreakmin').clear().type('20');
    cy.getDataTest('input-longBreaksec').clear().type('10');
    cy.getDataTest('edit-submit').click();

    // Check the update
    cy.getDataTest('timer-title').should('have.text', 'Testing');
    cy.getDataTest('display-timer').should('have.text', '20:10');
    cy.getDataTest('timer-tab').eq(0).click();
    cy.getDataTest('display-timer').should('have.text', '60:10');
    cy.getDataTest('timer-tab').eq(1).click();
    cy.getDataTest('display-timer').should('have.text', '15:10');
  });

  it('should stop the timer when the timer changed', () => {
    cy.get('.px-20').click();
    cy.getDataTest('edit-button').click();
    cy.getDataTest('input-title').clear().type('Testing');
    cy.getDataTest('input-timermin').clear().type('60');
    cy.getDataTest('input-timersec').clear().type('10');
    cy.getDataTest('input-shortBreakmin').clear().type('15');
    cy.getDataTest('input-shortBreaksec').clear().type('10');
    cy.getDataTest('input-longBreakmin').clear().type('20');
    cy.getDataTest('input-longBreaksec').clear().type('10');
    cy.getDataTest('edit-submit').click();
    cy.getDataTest('start-button').should('have.text', 'START');

    cy.get('.px-20').click();
    cy.getDataTest('timer-title').click();
    cy.getDataTest('add-timer').click();
    cy.getDataTest('start-button').should('have.text', 'START').click();

    cy.getDataTest('timer-title').click();
    cy.getDataTest('timer').click();
    cy.getDataTest('start-button').should('have.text', 'START');
  });
});
