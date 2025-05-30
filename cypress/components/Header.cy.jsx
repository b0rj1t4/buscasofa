/// <reference types="Cypress" />
import { MemoryRouter } from 'react-router-dom';
import Header from '../../src/components/Header';

describe('<Header />', () => {
  beforeEach(() => {
    // Mock para rutas (evita errores de router)
    cy.mount(
      <MemoryRouter>
        <Header user={null} />
      </MemoryRouter>
    );
  });

  context('Visual Elements', () => {
    it('should display logo', () => {
      cy.get('img[alt="Logo"]')
        .should('be.visible')
        .and('have.attr', 'src')
        .then((src) => {
          expect(src).to.include('logo.png');
        });
    });

    it('should show navigation links', () => {
      const links = ['Buscador', 'Mapa', 'Acerca de nosotros'];
      links.forEach((text) => {
        cy.contains('a', text).should('be.visible');
      });
    });
  });

  context('Guest User State', () => {
    it('should show login/register links when no user', () => {
      cy.contains('a', 'Login').should('exist');
      cy.contains('a', 'Registro').should('exist');
      cy.contains('button', 'Cerrar sesión').should('not.exist');
    });

    // it('should navigate to login page', () => {
    //   cy.contains('a', 'Login').click();
    //   cy.location('pathname').should('eq', '/login');
    // });
  });

  context('Logged-in User State', () => {
    beforeEach(() => {
      cy.mount(
        <MemoryRouter>
          <Header user="testuser" />
        </MemoryRouter>
      );
    });

    it('should show welcome message and logout button', () => {
      cy.contains('Bienvenido, testuser').should('be.visible');
      cy.contains('button', 'Cerrar sesión').should('exist');
      cy.contains('a', 'Login').should('not.exist');
    });

    // it('should call logout handler', () => {
    //   const spy = cy.spy().as('logoutSpy');
    //   cy.mount(
    //     <MemoryRouter>
    //       <Header user="testuser" handleLogout={spy} />
    //     </MemoryRouter>
    //   );
    //   cy.contains('button', 'Cerrar sesión').click();
    //   cy.get('@logoutSpy').should('have.been.calledOnce');
    // });

    // it('should link to user profile', () => {
    //   cy.contains('a', 'testuser').click();
    //   cy.location('pathname').should('eq', '/perfil');
    // });
  });
});
