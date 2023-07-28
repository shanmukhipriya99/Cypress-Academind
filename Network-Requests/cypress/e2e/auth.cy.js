/// <reference types='Cypress' />

describe('Newsletter', () => {
  beforeEach(() => {
    cy.visit('/signup');
    cy.task('seedDatabase');
  });
  it('should signup', () => {
    cy.get('[data-cy="auth-email"]').click();
    cy.get('[data-cy="auth-email"]').type('test2@example.com');
    cy.get('[data-cy="auth-password"]').type('testpassword');
    cy.get('[data-cy="auth-submit"]').click();
    cy.location('pathname').should('eq', '/takeaways');
    cy.getCookie('__session').its('value').should('not.be.empty');
  });
});
