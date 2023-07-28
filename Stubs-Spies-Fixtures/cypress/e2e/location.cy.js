/// <reference types="cypress" />

describe('share location', () => {
  it('should fetch the user location', () => {
    cy.visit('/').then((windw) => {
      cy.stub(windw.navigator.geolocation, 'getCurrentPosition').as(
        'getUserLocation'
      );
    });
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserLocation').should('have.been.called');
  });
});
