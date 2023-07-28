/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    cy.fixture('user-location.json').as('coords');
    cy.visit('/').then((windw) => {
      cy.get('@coords').then((fakeLocation) => {
        cy.stub(windw.navigator.geolocation, 'getCurrentPosition')
          .as('getUserLocation')
          .callsFake((cb) => {
            setTimeout(() => {
              cb(fakeLocation);
            }, 100);
          });
      });
      cy.stub(windw.navigator.clipboard, 'writeText')
        .as('copyToClipboard')
        .resolves();
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
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@copyToClipboard').should('have.been.called');
    cy.get('@coords').then((fakeLocation) => {
      const { latitude, longitude } = fakeLocation.coords;
      cy.get('@copyToClipboard').should(
        'have.been.calledWithMatch',
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`)
      );
    });
  });
});
