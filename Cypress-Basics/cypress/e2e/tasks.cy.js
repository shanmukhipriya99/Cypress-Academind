/// <reference types='Cypress' />

describe('tasks management', () => {
  it('should open and close the new task model', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    // cy.get('.backdrop').click({ force: true });
    // cy.get('.backdrop').should('not.exist');
    cy.contains('Cancel').click();
    cy.get('.modal').should('not.exist');
  });
});
