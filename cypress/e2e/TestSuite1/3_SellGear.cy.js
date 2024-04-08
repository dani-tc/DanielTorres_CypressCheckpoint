/// <reference types="Cypress" />

describe('Sell your gear', () => {

    before(() => {
        cy.NavigateToReverb()
    })
    it('Sell a Fender Electric Guitar', () => {
        //Save and accept location settings
        cy.SaveLocaleSettings()
        cy.get(".reverb-modal__content").should("not.exist")
        cy.wait(1000).then(() => {
            //Sign In
            cy.SignIn()
        });
        // Click Sell Gear button
        cy.get(".mobile-d-none .reverb-header__nav__link").click()
        // Enter brand and model name
        cy.get("#sellSearchInput").type('Fender Electric Guitar')
        // Click star listing button
        cy.get(".rc-button--full-width").click()
        // Click the first option
        cy.get(".rc-product-card__cta").first().click()
        // Clear shop name
        cy.get("#shopName").clear()
        // Enter shop name
        cy.get("#shopName").type('Johan')
        // Enter name
        cy.get("#name").type('Johan')
        // Select country
        cy.get("select[name='country_code']").select('United States')
        // Enter street
        cy.get("#street_address").type('Street 1')
        // Enter city
        cy.get("#locality").type('Los Angeles')
        // Select California State
        cy.get("select[name='region']").select('California')
        // Enter zip code
        cy.get("#postal_code").type('90006')
        // Enter phone number
        cy.get("#phone").type('10101012')
        //Click continue button
        cy.get(".rc-button--medium").click()
        cy.wait(1000)
        // Select model
        cy.get("select#seedId").select('Player Stratocaster with Pau Ferro Fretboard 2023 - Present Anniversary 2-Color Sunburst')
        //Click on continue
        cy.get(".sell-form-section-buttons .rc-button--medium").click()

        //Upload photo
        cy.get(".multiple-photo-uploader input").attachFile('Fender-Guitar.png');
        //Select condition
        cy.get("#listing-condition-slug").select('Brand New')
        //Enter condition
        cy.get(".rich-text-editor__editor-input").type('Excellent condition')
        // Click continue
        cy.get(".sell-form-section-buttons .rc-button--filled").click()
        cy.wait(1000)
        //Check shipping
        cy.get("#listingOffersShipping").check()
        //Check free shipping
        cy.get("#howhandle_US_CON--free").check()
        //Click on continue
        cy.get(".sell-form-section-buttons .rc-button--filled").click()
        //Enter price
        cy.get("#price").type('1000')
        //Click on continue
        cy.get(".sell-form-section-buttons .rc-button--filled").click()
        //Click on cancel
        cy.get(".reverb-modal__actions__close-or-back").click()
        cy.get(".sell-form-section-buttons .rc-button--filled").invoke('text').then((text) => {
            expect(text).to.include('Publish');

        });
    })
})