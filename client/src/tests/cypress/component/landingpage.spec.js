import React from 'react';
import { mount } from 'cypress-react-unit-test';
import LandingPage from './../../../components/LandingPage/LandingPage';

describe('LandingPage', () => {

  it('basic_user_button', () => {
    mount(<LandingPage />);
    cy.contains('Clients').should('be.visible');
    cy.contains('Service Providers').should('be.visible');
  });
});