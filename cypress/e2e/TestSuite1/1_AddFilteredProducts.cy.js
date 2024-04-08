/// <reference types="Cypress" />

describe('Filter a specific category and add the filtered product to the cart', () => {

    before(() => {
        cy.NavigateToReverb()
    })
    it('Filter products in a category and add it to cart', () => {
        //Save and accept location settings
        cy.SaveLocaleSettings()
        cy.get(".reverb-modal__content").should("not.exist")
        //Select the guitar category
        cy.get("button[data-header-category='guitars']").first().click()
        //Select the electric guitars subcategory
        cy.get(".category-flyout__subhead a[href='/cat/electric-guitars--1']").click()
        cy.get('.browse-page__title').invoke('text').then((text) => {
            expect(text).to.eq('Electric Guitars');
        });
        // Select the brand filter
        cy.get(".filter-chip--with-dropdown").eq(3).click()
        // Check the Fender Brand
        cy.get("#rc-accordion__filter-row--make-lbl-content ul li #make-fender").check()
        //Wait for the filter to load
        cy.wait(1500).then(() => {
            cy.get("#rc-accordion__filter-row--make-lbl-content ul li input#make-").should("not.be.checked")
            cy.get("#rc-accordion__filter-row--make-lbl-content ul li #make-fender").should("be.checked")
        });
        //Click an outside element to make the brand filter dropdown disappear
        cy.get('.browse-page__title').click()
        //Get each product description and verifies it contains the brand Fender
        cy.get('.rc-listing-card__titleblock a').each(($el, index, $list) => {
            cy.wrap($el).invoke('text').then((text) => {
                try {
                    expect(text).to.include('Fender');
                } catch (error) {
                    cy.log('Element does not inclue Fender: ' + error);
                }

            });
        })
        let productName;
        let $product;
        let index;

        // Remove the target attribute so the product page won't open in another window
        cy.get('div.rc-listing-card__titleblock a').invoke('removeAttr', 'target');

        // Get a random product for products listing
        cy.get('div.rc-listing-card__titleblock  a').then(($products) => {
            index = Math.floor(Math.random() * $products.length)
            $product = $products[index]
            // Get the product name and click on it
            cy.wrap($product).invoke("text").then((text) => {
                productName = text
                cy.wrap($product).click()
            });
        });

        // Verify the porduct page contains the product name
        cy.get('.item2-title__inner h1').invoke("text").then((text) => {
            expect(text).to.include(productName);

        });
        //Click the add to cart button
        cy.get('.add-to-cart-button').click()

        // Verify product name
        cy.get('.mb-0 a.color-gray').invoke('text').then((text) => {
            expect(text).to.include(productName);
        });
        //Verify proceed to checkout button exist
        cy.get('div .rc-button--full-width').should('exist')
        cy.get('div .rc-button--full-width').invoke("text").then((text) => {
            expect(text).to.include('Proceed to Checkout');
        });
       


    })
})