/// <reference types="Cypress" />
import About from '../../src/components/About';

describe('<About />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<About />).then(() => {
      cy.get('h1').should('contain', 'Acerca de nosotros');
      cy.get('#info')
        .should('contain', 'Equipo #')
        .contains(/[1-30]/);
    });
  });
});
