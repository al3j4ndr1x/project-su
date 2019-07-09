/// <reference types="Cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('Project SU', () => {

  const email = chance.email();
  const pass = 'ValidPassword123';

  beforeEach(() => {
    cy.visit('/')
  })

  it('has a heading', () => {
    cy.get('h6')
      .should('contain', 'Welcome to The Project SU!'); // Assert that contain a title
  });

  it('has a input type email', () => {
    cy.get('input')
      .should('be.visible') // Assert that input is visible
      .and('have.attr', 'placeholder', 'Enter your email address...'); // Assert that have a placeholder attribute
  });

  it('has a button `Get early access`', () => {
    cy.get('button')
      .should('be.visible') // Assert that button is visible
      .and('contain', 'Get early access'); // Assert that contain `Get early access`
  });

  it('signs up a new early-bird', () => {
    cy.get('input').type(email);
    cy.get('button').click();
  });


});
