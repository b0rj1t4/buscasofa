/// <reference types="cypress" />
// Prueba de la pagina de Emergencia

describe('Visualización de la página de Emergencia', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/EstacionesTerrestres/**', {
      fixture: '../fuel_prices.json', // Mock de la respuesta de la API
    }).as('getFuelPrices');

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

  it('muestra las gasolineras más cercanas', () => {
    cy.contains('h2', 'Gasolineras más cercanas').should('be.visible');

    cy.get('.station-card').should('have.length', 10);

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

  describe('cuando no hay geolocalizacion', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/EstacionesTerrestres/**', {
        body: [],
      });
      cy.visit('/emergency');
    });

    it('muestra un mensaje de error no localizacion', () => {
      cy.get('.error')
        .should('exist')
        .and('contain', 'Error al obtener ubicación');
    });

    it('muestra input para introducir ubicación manualmente', () => {
      cy.get('h3').should('exist').and('contain', 'código postal');
      cy.get('input').should('exist');
      cy.get('button').should('exist').and('contain', 'Buscar');
    });
  });
});
