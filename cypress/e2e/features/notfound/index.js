/// <reference types="Cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('el usuario navega a {string}', function (string) {
  cy.intercept('GET', '**/EstacionesTerrestres/**', {
    fixture: '../fuel_prices.json', // Mock de la respuesta de la API
  }).as('getFuelPrices');
  cy.visit('/xxx');
});

Then('debería ver el texto {string}', function (string) {
  cy.contains(string).should('exist');
});
