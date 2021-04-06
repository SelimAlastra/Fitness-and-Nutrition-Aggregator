import React from 'react';
import { mount } from 'cypress-react-unit-test';
import LandingPage from '../../src/LandingPage';

describe('LandingPage', () => {

  it('basic_user_button', () => {
    mount(<LandingPage />);
    cy.contains('Basic User').should('be.visible');
  });
});