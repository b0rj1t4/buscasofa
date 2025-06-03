/// <reference types="cypress" />
// Prueba de la pagina de Emergencia

describe('Visualización de la página de Emergencia', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/EstacionesTerrestres/**', {
      fixture: '../fuel_prices.json', // Mock de la respuesta de la API
    }).as('getFuelPrices');
    cy.visit('/emergency');
  });

  it('El usuario ve el título de la página de Emergencia', () => {
    cy.get('h1').should('exist').contains('Emergencia');
  });
});
