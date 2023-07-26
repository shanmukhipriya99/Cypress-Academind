/// <reference types='Cypress' />

describe('page navigation', () => {
    it('should navigate between pages', () => {
        cy.visit('http://localhost:5173/');
        // cy.get('nav').contains('About').click();
        cy.get('[data-cy="header-about-link"]').click();
    });
})