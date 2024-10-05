/// <reference types="cypress" />

describe('E2E - Test case 1', () => {
    it('visit web page', () => {
        cy.clearAllLocalStorage()
        cy.visit('https://saucedemo.com/')
    })
    it('login', () => {
        cy.get('#user-name').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url('include','/inventory.html')

        //assertion
        cy.get('[data-test="title"]').should('exist')
        cy.get('[data-test="product-sort-container"]').should('be.visible')
    })
    it('Product page - add product to cart', () => {
        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()

        //assertion
        cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').should('exist')
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible')
    })
    it('Continue Checkout - Your Cart Page', () => {
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.url('include','/cart.html')

        //assertion
        cy.get('[data-test="title"]').should('exist')
        cy.get('[data-test="inventory-item"]').should('exist')
        cy.get('[data-test="cart-desc-label"]').should('be.visible')
    })
    it('Checkout: Your Information Page', () => {
        cy.get('[data-test="checkout"]').click()
        cy.url('include','/checkout-step-one.html')
        
        cy.get('[data-test="firstName"]').type('wisnu')
        cy.get('[data-test="lastName"]').type('sanber')
        cy.get('[data-test="postalCode"]').type('123')
        
        //assertion
        cy.get('[data-test="title"]').should('contain.text', 'Checkout: Your Information')
        cy.get('.checkout_info').should('be.visible')
        cy.get('[data-test="continue"]')
    })
    it('Checkout: Overview Page', () => {
        cy.get('[data-test="continue"]').click()
        cy.url('include','/checkout-complete.html')
        
        //assertion
        cy.get('[data-test="title"]').should('be.visible').and('contain.text', 'Checkout: Overview')
        cy.get('[data-test="inventory-item"]').should('exist')
        cy.get('[data-test="finish"]')
    })
    it('Checkout: Complete Page', () => {
        cy.get('[data-test="finish"]').click()
        cy.url('include','/checkout-complete.html')

        //assertion
        cy.get('[data-test="complete-header"]')
        .should('exist').and('contain.text', 'Thank you for your order!')
        cy.get('[data-test="title"]').should('be.visible')
    })
})

describe('E2E - Test case 2', () => {
    it('visit web page', () => {
        cy.clearAllLocalStorage()
        cy.visit('https://saucedemo.com/')
    })
    it('login', () => {
        cy.get('#user-name').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url('include','/inventory.html')

        //assertion
        cy.get('[data-test="title"]').should('exist')
        cy.get('[data-test="product-sort-container"]').should('be.visible')
    })
    it('Product detail - add to cart', () => {
        cy.get('[data-test="inventory-item-test.allthethings()-t-shirt-(red)-img"]').click()
        cy.url('include', '/inventory-item.html?id=3')

        cy.get('[data-test="add-to-cart"]').click()

        //assertion
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible')
        cy.get('[data-test="inventory-item-name"]').should('be.visible')
        cy.get('[data-test="back-to-products"]').should('exist')
    })
    it('Remove porduct from Your Cart Page', () => {
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.url('include','/cart.html')
        cy.get('[data-test="inventory-item"]').should('exist') //assertion

        cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click()

        //assertion
        cy.get('[data-test="title"]').should('exist')
        cy.get('[data-test="inventory-item"]').should('not.exist')
    })
})