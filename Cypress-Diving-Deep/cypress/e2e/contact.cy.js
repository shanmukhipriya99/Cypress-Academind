/// <reference types='Cypress' />

describe('contact form', () => {
  it('should submit the form', () => {
    cy.visit('http://localhost:5173/about');
    cy.get('[data-cy="contact-input-message"]').type('Some random message');
    cy.get('[data-cy="contact-input-name"]').type('Random Message');
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el.attr('disabled')).to.be.undefined;
    });
    cy.get('[data-cy="contact-input-email"]').type('random@message.com{enter}');
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
    // cy.get('@submitBtn').click();
    cy.get('@submitBtn').contains('Sending...').should('have.attr', 'disabled');
  });
  it('should validate the form input', () => {
    cy.visit('http://localhost:5173/about');
    // cy.get('[data-cy="contact-input-message"]').type('Some random message');
    // cy.get('[data-cy="contact-input-name"]').type('Random Message');
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr('disabled');
      expect(el.text()).to.not.be.equal('Sending...');
    });
  });
});
