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

describe.only('Countdown test', () => {
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
    cy.getDataTest('input-timermin').should('exist').should('have.value', '25');
    cy.getDataTest('input-timersec').should('exist').should('have.value', '00');
    cy.getDataTest('input-shortBreakmin').should('exist').should('have.value', '05');
    cy.getDataTest('input-shortBreaksec').should('exist').should('have.value', '00');
    cy.getDataTest('input-longBreakmin').should('exist').should('have.value', '10');
    cy.getDataTest('input-longBreaksec').should('exist').should('have.value', '00');
  });
});
