/// <reference types='Cypress' />

describe('Newsletter', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.task('seedDatabase');
  });
  it('should display a success messasge', () => {
    cy.intercept('POST', '/newsletter*', { status: 201 }); // for intercepting http requests
    cy.get('[data-cy="newsletter-email"]').type('test@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.contains('Thanks for signing up');
  });
});
