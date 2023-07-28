/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    cy.visit('/').then((windw) => {
      cy.stub(windw.navigator.geolocation, 'getCurrentPosition')
        .as('getUserLocation')
        .callsFake((cb) => {
          setTimeout(() => {
            cb({ coords: { latitude: 39.9, longitude: 48.03 } });
          }, 100);
        });
    });
  });
  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserLocation').should('have.been.called');
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched'); // alternative to contains()
  });
  it('should share a location URL', () => {
    cy.get('[data-cy="name-input"]').type('John Doe');
    cy.get('[data-cy="get-loc-btn"]').click();
  });
});
