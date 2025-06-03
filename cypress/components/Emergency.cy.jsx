/// <reference types="Cypress" />
import Emergency from '../../src/components/Emergency';

describe('<Emergency />', () => {
  const mockStations = [
    {
      IDEESS: '1234',
      Rótulo: 'Gasolinera 1',
      Latitud: '40.4167',
      'Longitud (WGS84)': '-3.70325',
      Dirección: 'Calle Mayor 1',
      Municipio: 'Madrid',
      Horario: 'L-V: 08:00-21:00',
      'Precio Gasoleo A': '1.50',
      'Precio Gasolina 95 E5': '1.60',
    },
    {
      IDEESS: '5678',
      Rótulo: 'Gasolinera 2',
      Latitud: '40.4200',
      'Longitud (WGS84)': '-3.70500',
      Dirección: 'Calle Menor 2',
      Municipio: 'Madrid',
      Horario: '24H',
      'Precio Gasoleo A': '1.55',
    },
  ];

  beforeEach(() => {
    cy.mount(<Emergency stations={mockStations} />);
  });

  it('muestra las gasolineras más cercanas', () => {
    cy.stub(window.navigator.geolocation, 'getCurrentPosition').callsFake(
      (cb) => {
        cb({
          coords: {
            latitude: 40.4168,
            longitude: -3.7038,
          },
        });
      }
    );
    cy.contains('h2', 'Gasolineras más cercanas').should('be.visible');

    cy.get('.station-card').should('have.length', 2);

    cy.get('.station-card')
      .first()
      .within(() => {
        cy.contains('Gasolinera 1');
        cy.contains(/Distancia:/);
        cy.contains(/Dirección:/);
        cy.contains(/Horario:/);
        cy.contains(/Gasóleo A:/);
        cy.contains(/Gasolina 95 E5:/);
      });
  });

  it('muestra el formulario de código postal si falla la geolocalización', () => {
    // Simula que geolocalización falla
    cy.stub(window.navigator.geolocation, 'getCurrentPosition').callsFake(
      (success, error) => {
        error({
          code: 1,
          message: 'Permiso denegado',
        });
      }
    );

    cy.mount(<Emergency stations={mockStations} />);
    cy.contains('Ingresa tu código postal').should('be.visible');
    cy.get('input[placeholder="Ej: 28001"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });
});
