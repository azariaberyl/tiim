/// <reference types="cypress" />

interface EditTimer {
  title?: string;
  timermin?: string;
  timersec?: string;
  shorBreakmin?: string;
  shorBreaksec?: string;
  longBreakmin?: string;
  longBreaksec?: string;
}

interface DisplayTimer {
  timer?: string;
  title?: string;
}

interface Countdown {
  tick: number;
  page?: string;
  date?: Date;
}

declare namespace Cypress {
  interface Chainable {
    getDataTest(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    getStartButton(): Chainable<JQuery<HTMLElement>>;
    editTimer(data: EditTimer): Chainable<JQuery<HTMLElement>>;
    displayTimerShould(expected: DisplayTimer): Chainable<JQuery<HTMLElement>>;
    deleteTimer(): Chainable<JQuery<HTMLElement>>;
    addTimer(): Chainable<JQuery<HTMLElement>>;
    countdown(clock: Countdown): Chainable<JQuery<HTMLElement>>;
    goToReportDetail(): Chainable<JQuery<HTMLElement>>;
    changeTimer(index: number): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('changeTimer', (index) => {
  cy.getDataTest('timer-title').click();
  cy.getDataTest('timer').eq(index).click();
});

Cypress.Commands.add('goToReportDetail', () => {
  cy.getDataTest('report-button').click();
  cy.getDataTest('report-tab').eq(1).click();
});

Cypress.Commands.add('getDataTest', (selector) => {
  return cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add('getStartButton', () => {
  return cy.getDataTest('start-button');
});

Cypress.Commands.add('editTimer', (data) => {
  cy.getDataTest('edit-button').click();
  cy.getDataTest('modal').should('exist');
  data.title && cy.getDataTest('input-title').clear().type(data.title);
  data.timermin && cy.getDataTest('input-timermin').clear().type(data.timermin);
  data.timersec && cy.getDataTest('input-timersec').clear().type(data.timersec);
  data.shorBreakmin && cy.getDataTest('input-shortBreakmin').clear().type(data.shorBreakmin);
  data.shorBreaksec && cy.getDataTest('input-shortBreaksec').clear().type(data.shorBreaksec);
  data.longBreakmin && cy.getDataTest('input-longBreakmin').clear().type(data.longBreakmin);
  data.longBreaksec && cy.getDataTest('input-longBreaksec').clear().type(data.longBreaksec);
  cy.getDataTest('edit-submit').click();
});

Cypress.Commands.add('displayTimerShould', (expected) => {
  expected.timer && cy.getDataTest('display-timer').should('have.text', expected.timer);
  expected.title && cy.getDataTest('timer-title').should('have.text', expected.title);
});

Cypress.Commands.add('deleteTimer', () => {
  cy.getDataTest('edit-button').click();
  cy.getDataTest('modal').should('exist');
  cy.getDataTest('delete-button').should('exist').click();
});

Cypress.Commands.add('addTimer', () => {
  // Add timer
  cy.getDataTest('timer-title').click();
  cy.getDataTest('add-timer').should('exist').click();
  cy.getDataTest('timer-title').should('have.text', 'My Project');
  cy.getDataTest('display-timer').should('have.text', '25:00');
});

Cypress.Commands.add('countdown', (clock) => {
  const theDate = clock.date ?? new Date();
  const page = clock.page ?? 'http://localhost:3000';
  cy.clock(theDate.getTime());
  cy.visit(page);
  cy.getStartButton().click();
  cy.tick(clock.tick);
  cy.tick(1000);
  cy.clock().invoke('restore');
});
