/// <reference types="Cypress" />
import About from '../../src/components/About';

describe('<About />', () => {
  beforeEach(() => {
    // Mount the Footer component before each test
    cy.mount(<About />);
  });

  it('muestra el título principal y subtítulo', () => {
    cy.contains('h1', 'Acerca de nosotros').should('be.visible');
    cy.contains('h2', 'Equipo #13').should('be.visible');
    cy.contains('.team-tagline', 'Innovando con pasión').should('be.visible');
  });

  it('muestra la cantidad correcta de perfiles', () => {
    // Debería haber 5 miembros
    cy.get('.profile-card').should('have.length', 5);
  });

  it('cada tarjeta de perfil contiene la información correcta', () => {
    cy.get('.profile-card').each(($card) => {
      // Verifica que tenga nombre (h3)
      cy.wrap($card).find('h3').should('not.be.empty');

      // Verifica que tenga ubicación (p.location)
      cy.wrap($card).find('.location').should('not.be.empty');

      // Verifica que tenga cita (i.quote)
      cy.wrap($card).find('.quote').should('not.be.empty');

      // Verifica que la imagen tenga alt correcto
      cy.wrap($card).find('img').should('have.attr', 'alt').and('not.be.empty');
    });
  });
});
