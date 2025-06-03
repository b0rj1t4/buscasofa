/// <reference types="Cypress" />
import Emergency from '../../src/components/Emergency';
import { stations } from '../fixtures/stations.json';

describe('<Emergency />', () => {
  it('renders without crashing', () => {
    cy.mount(<Emergency stations={stations} />).then(() => {
      cy.get('h1').should('contain', 'Estaciones de Emergencia');
      cy.get('#postal-form').should('exist');
      cy.get('#postal-code-input').should('exist');
      cy.get('#search-button').should('exist');
    });
  });

  it('shows error message when geolocation is not supported', () => {
    cy.stub(navigator, 'geolocation').value(null);
    cy.mount(<Emergency stations={stations} />);
    cy.get('#error-message').should(
      'contain',
      'Tu navegador no soporta geolocalización'
    );
  });

  it('shows error message when geolocation fails', () => {
    cy.stub(navigator.geolocation, 'getCurrentPosition').callsFake(
      (success, error) => {
        error({ message: 'Geolocation error' });
      }
    );
    cy.mount(<Emergency stations={stations} />);
    cy.get('#error-message').should(
      'contain',
      'Error al obtener ubicación: Geolocation error'
    );
  });

  it('calculates distances and displays nearby stations', () => {
    const userLocation = { lat: -34.6037, lng: -58.3816 }; // Buenos Aires
    cy.stub(navigator.geolocation, 'getCurrentPosition').callsFake(
      (success) => {
        success({
          coords: { latitude: userLocation.lat, longitude: userLocation.lng },
        });
      }
    );

    cy.mount(<Emergency stations={stations} />);

    // Esperar a que se calculen las distancias
    cy.wait(1000);

    // Verificar que se muestren estaciones cercanas
    cy.get('.station-item').should('have.length.greaterThan', 0);
  });
});
