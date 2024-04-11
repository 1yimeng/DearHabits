describe("creates habit", () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('Create a text activity', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/main');
    cy.get('[name="createHabit"]').click();
    cy.get('h2 > input').clear('T');
    cy.get('h2 > input').type('Test');
    cy.get('section > :nth-child(1) > input').clear('T');
    cy.get('section > :nth-child(1) > input').type('TextActivity');
    cy.get('form > :nth-child(10)').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Create a numerical activity', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/main');
    cy.get('[name="createHabit"]').click();
    cy.get('h2 > input').clear('T');
    cy.get('h2 > input').type('Test');
    cy.get('section > :nth-child(1) > input').clear('T');
    cy.get('section > :nth-child(1) > input').type('TestActivity');
    cy.get(':nth-child(3) > select').select('Numerical');
    cy.get('form > :nth-child(10)').click();
    /* ==== End Cypress Studio ==== */
  });
});
