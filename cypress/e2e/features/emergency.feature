# cypress/e2e/emergency.feature
Feature: Emergency Gas Stations

  Scenario: Usuario busca por codigo postal
    Given el usuario abre la pagina de emergencia
    When introduce "28001" en el campo del codigo postal
    And hace click en el boton buscar
    Then deberia ver las gasolineras cercanas a  "Madrid"

  Scenario: User sees geolocated stations
    Given el usuario permite geolocalizacion
    When abre la pagina de emergencia
    Then deberia ver gasolineras cercanas a mi posicion
