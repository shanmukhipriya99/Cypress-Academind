/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.task('seedDatabase');
  });
  it('should display a list of fetched takeaways', () => {
    cy.get('[data-cy="takeaway-item"]').should('have.length', 2);
  });
  it('should add a new takeaway', () => {
    // cy.intercept('POST', '/takeaways/new*', 'success').as('createTakeaway');
    cy.login();
    cy.contains('Add a new takeaway').click();
    cy.get('[data-cy="title"]').click();
    cy.get('[data-cy="title"]').type('Title');
    cy.get('[data-cy="body"]').type('Body');
    cy.get('[data-cy="create-takeaway"]').click();
    // cy.wait('@createTakeaway')
    //   .its('request.body')
    //   .should('match', /Title.*Body/);
    cy.location('pathname').should('eq', '/takeaways');
    cy.get('[data-cy="takeaway-item"]')
      .should('have.length.greaterThan', 2)
      .contains('Title');
  });
});
