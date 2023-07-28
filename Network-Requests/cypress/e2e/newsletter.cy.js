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
  it('should display validation errors', () => {
    cy.intercept('POST', '/newsletter*', {
      message: 'Email exists already.',
    }).as('subscribe'); // for intercepting http requests
    cy.get('[data-cy="newsletter-email"]').type('test@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@subscribe');
    cy.contains('Email exists already.');
  });
  it('should successfully create a new contact', () => {
    cy.request({
      method: 'POST',
      url: '/newsletter',
      body: { email: 'test@example.com' },
      form: true,
    }).then((res) => {
      expect(res.status).to.eq(201);
    });
  });
});
