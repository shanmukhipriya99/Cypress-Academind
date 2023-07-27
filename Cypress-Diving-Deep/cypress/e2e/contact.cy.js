/// <reference types='Cypress' />

describe('contact form', () => {
  it('should submit the form', () => {
    cy.visit('http://localhost:5173/about');
    cy.get('[data-cy="contact-input-message"]').type('Some random message');
    cy.get('[data-cy="contact-input-name"]').type('Random Message');
    cy.get('[data-cy="contact-input-email"]').type('random@message.com');
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
    cy.get('@submitBtn').click();
    cy.get('@submitBtn')
      .contains('Sending...')
      .should('have.attr', 'disabled');
  });
});
