/// <reference types="cypress" />
import Footer from '../../src/components/Footer';

describe('<Footer />', () => {
  beforeEach(() => {
    // Mount the Footer component before each test
    cy.mount(<Footer />);
  });

  it('renders the section title', () => {
    cy.get('h2').should('contain', 'Miembros del equipo');
  });

  it('renders a number of the team is 13', () => {
    cy.get('h2').should('contain', 'equipo 13');
  });

  it('renders the correct number of team members', () => {
    cy.get('ul li').should('have.length', 5);
  });

  it('renders Borja LLorente Capiscol as the first member', () => {
    cy.get('ul li').eq(0).should('contain', 'Borja LLorente Capiscol');
  });

  it('renders Alejandro Fernandez Yepes as the second member', () => {
    cy.get('ul li').eq(1).should('contain', 'Alejandro Fernandez Yepes');
  });

  it('renders Unai Perez De la Torre as the third member', () => {
    cy.get('ul li').eq(2).should('contain', 'Unai Perez De la Torre');
  });

  it('renders Alberto Flores Rivera as the fourth member', () => {
    cy.get('ul li').eq(3).should('contain', 'Alberto Flores Rivera');
  });

  it('renders Pablo Taboas Castro as the fifth member', () => {
    cy.get('ul li').eq(4).should('contain', 'Pablo Taboas Castro');
  });
});
