/// <reference types="Cypress" />

describe('Sign up and Sign In', () => {

    before(() => {
        cy.NavigateToReverb()
    })
    it('Filter products in a category', () => {
        //Save and accept location settings
        cy.SaveLocaleSettings()
        // Click the Sign Up button
        cy.get("nav[role='navigation'] ul li:nth-of-type(4) a").click()
        //Verify the sign up form has a title
        cy.get(".signup-signin__form h4").should('have.text', 'Create a Reverb Account')
        //Enter First Name
        cy.get("input[autocomplete='given-name']").type('Example')
        // Enter Last Name
        cy.get("input[autocomplete='family-name']").type('Example')
        // Enter Email
        cy.get("input[autocomplete='email']").first().type('cypresscypress3534checkpoint@gmail.com')
        //Confirm Email
        cy.get("#emailConfirmValue").type('cypresscypress3534checkpoint@gmail.com')
        //Enter Password
        cy.get("#signup--password").type('PasswordForCheckpoint')
        //Check privacy policy
        cy.get(".label-with-checkbox input[required]").check()
        //Click sign up
        cy.get("input[value='Sign Up']").click()
        cy.get(".reverb-header__nav__link--avatar img").should('exist')
        //Click account menu
        cy.get("#header-dropdown-user_menu").click()
        //Click sign out button
        cy.get("nav[aria-label='My Reverb'] a[href='/signout']").click()
        cy.SignIn()
        cy.get("#header-dropdown-user_menu").should('exist')

    })
})