describe('launching the app', () => {
  it('passes', () => {
    cy.visit("/");
  })
})

describe("The Login Page", () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('logs in', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('[value="Log in"]').click();
    cy.get(':nth-child(3) > .inputBox').clear('t');
    cy.get(':nth-child(3) > .inputBox').type('test@gmail.com');
    cy.get(':nth-child(5) > .inputBox').clear('t');
    cy.get(':nth-child(5) > .inputBox').type('testtest');
    cy.get('.inputButton').click();
    cy.url().should("include", "/main");
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('can\'t log in with wrong email', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('[value="Log in"]').click();
    cy.get(':nth-child(3) > .inputBox').clear('wrong-test@gmail.com');
    cy.get(':nth-child(3) > .inputBox').type('wrong-test@gmail.com');
    cy.get(':nth-child(5) > .inputBox').clear('t');
    cy.get(':nth-child(5) > .inputBox').type('testtest');
    cy.get('.inputButton').click();
    cy.url().should("include", "/login");
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('can\'t log in with wrong password', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('[value="Log in"]').click();
    cy.get(':nth-child(3) > .inputBox').clear('test@gmail.com');
    cy.get(':nth-child(3) > .inputBox').type('test@gmail.com');
    cy.get(':nth-child(5) > .inputBox').clear('wrongwrong');
    cy.get(':nth-child(5) > .inputBox').type('wrongwrong');
    cy.get('.inputButton').click();
    cy.url().should("include", "/login");
    /* ==== End Cypress Studio ==== */
  });
});

