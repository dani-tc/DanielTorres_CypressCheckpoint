// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })}
import 'cypress-file-upload';

Cypress.Commands.add('NavigateToReverb', () => {
    cy.visit('https://reverb.com/')
})

Cypress.Commands.add('SaveLocaleSettings', () => {
    //Update locale settings button
    cy.get(".rc-button--muted").click()
    //Save locale settings button
    cy.get(".reverb-modal__actions__save").click()
})

Cypress.Commands.add('SignIn', () => {
    // Click sign in button
    cy.get("nav[role='navigation'] ul li:nth-of-type(5) a").click()
    // Enter email
    cy.get("#signin--login").type('checkpointforcypress30@gmail.com')
    // Enter password
    cy.get("#signin--password").type('PasswordForCheckpoint')
    //Click log in
    cy.get("input[value='Log In']").click()
})

Cypress.Commands.add('SignUpToSellGear', () => {
    // Click the Sign Up button
    cy.get("nav[role='navigation'] ul li:nth-of-type(4) a").click()
    //Verify the sign up form has a title
    cy.get(".signup-signin__form h4").should('have.text', 'Create a Reverb Account')
    //Enter First Name
    cy.get("input[autocomplete='given-name']").type('Example')
    // Enter Last Name
    cy.get("input[autocomplete='family-name']").type('Example')
    // Enter Email
    cy.get("input[autocomplete='email']").first().type('cypresscypress7878checkpoint@gmail.com')
    //Confirm Email
    cy.get("#emailConfirmValue").type('cypresscypress7878checkpoint@gmail.com')
    //Enter Password
    cy.get("#signup--password").type('PasswordForCheckpoint')
    //Check privacy policy
    cy.get(".label-with-checkbox input[required]").check()
    //Click sign up
    cy.get("input[value='Sign Up']").click()
})