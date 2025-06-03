/// <reference types="Cypress" />
import {
  BeforeAll,
  Given,
  Then,
  When,
} from '@badeball/cypress-cucumber-preprocessor';

Given('el usuario abre la pagina de emergencia', () => {
  cy.intercept('GET', '**/EstacionesTerrestres/**', {
    fixture: '../fuel_prices.json', // Mock de la respuesta de la API
  }).as('getFuelPrices');
  cy.visit('/emergency');
});

When('introduce "28001" en el campo del codigo postal', () => {
  cy.contains('Emergencia', { timeout: 10000 }).should('exist');
  cy.get('input').type('28001');
});

Then('hace click en el boton buscar', () => {
  cy.get('button').contains('Buscar').click();
});

Then('deberia ver las gasolineras cercanas a  "Madrid"', () => {
  cy.contains('Gasolineras más cercanas').should('exist');
  cy.get('.postal-info').contains('Madrid').should('exist');
  cy.get('.station-card').should('have.length.greaterThan', 0);
  cy.get('.station-card')
    .first()
    .within(() => {
      cy.contains(/Distancia:/);
      cy.contains(/Dirección:/);
      cy.contains(/Horario:/);
      cy.contains(/Gasóleo A:/);
      cy.contains(/Gasolina 95 E5:/);
    });
});

Given('el usuario permite geolocalizacion', () => {
  cy.intercept('GET', '**/EstacionesTerrestres/**', {
    fixture: '../fuel_prices.json', // Mock de la respuesta de la API
  }).as('getFuelPrices');
});

When('abre la pagina de emergencia con geolocalizacion', () => {
  cy.visit('/emergency', {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake(
        (cb) => {
          cb({
            coords: {
              latitude: 40.4168,
              longitude: -3.7038,
            },
          });
        }
      );
    },
  });
});

Then('deberia ver gasolineras cercanas a mi posicion', () => {
  // cy.contains('Gasolineras más cercanas').should('exist');
  cy.get('.station-card').should('have.length.greaterThan', 0);
  cy.get('.station-card')
    .first()
    .within(() => {
      cy.contains(/Distancia:/);
      cy.contains(/Dirección:/);
      cy.contains(/Horario:/);
      cy.contains(/Gasóleo A:/);
      cy.contains(/Gasolina 95 E5:/);
    });
});
