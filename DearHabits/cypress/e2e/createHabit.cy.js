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

  /* ==== Test Created with Cypress Studio ==== */
  it('Create a scale activity', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/main');
    cy.get('[name="createHabit"]').click();
    cy.get('h2 > input').clear('T');
    cy.get('h2 > input').type('Test');
    cy.get('section > :nth-child(1) > input').clear('T');
    cy.get('section > :nth-child(1) > input').type('TestActivity');
    cy.get(':nth-child(3) > select').select('Scale');
    cy.get(':nth-child(7) > section > :nth-child(1) > input').clear('1');
    cy.get(':nth-child(7) > section > :nth-child(1) > input').type('10');
    cy.get(':nth-child(3) > input').clear('1');
    cy.get(':nth-child(3) > input').type('1');
    cy.get('form > :nth-child(10)').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Create a checkmark activity', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/main');
    cy.get('[name="createHabit"]').click();
    cy.get('h2 > input').clear('T');
    cy.get('h2 > input').type('Test');
    cy.get('section > :nth-child(1) > input').clear('T');
    cy.get('section > :nth-child(1) > input').type('TestActivity');
    cy.get(':nth-child(3) > select').select('Checkmark');
    cy.get('form > :nth-child(10)').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Create multiple activities', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/main');
    cy.get('[name="createHabit"]').click();
    cy.get('h2 > input').clear('t');
    cy.get('h2 > input').type('test');
    cy.get('section > :nth-child(1) > input').clear('t');
    cy.get('section > :nth-child(1) > input').type('testa11');
    cy.get('form > :nth-child(8)').click();
    cy.get(':nth-child(8) > :nth-child(1) > input').clear('t');
    cy.get(':nth-child(8) > :nth-child(1) > input').type('testa2');
    cy.get('form > :nth-child(11)').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Create multiple activities', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/main');
    cy.get('[name="createHabit"]').click();
    cy.get('h2 > input').clear('t');
    cy.get('h2 > input').type('test');
    cy.get('section > :nth-child(1) > input').clear('a');
    cy.get('section > :nth-child(1) > input').type('a1');
    cy.get('form > :nth-child(8)').click();
    cy.get(':nth-child(8) > :nth-child(1) > input').clear('a');
    cy.get(':nth-child(8) > :nth-child(1) > input').type('a2');
    cy.get(':nth-child(8) > :nth-child(3) > select').select('Numerical');
    cy.get('form > :nth-child(9)').click();
    cy.get(':nth-child(9) > :nth-child(1) > input').clear('a');
    cy.get(':nth-child(9) > :nth-child(1) > input').type('a3');
    cy.get(':nth-child(9) > :nth-child(3) > select').select('Scale');
    cy.get(':nth-child(9) > section > :nth-child(1) > input').clear('1');
    cy.get(':nth-child(9) > section > :nth-child(1) > input').type('10');
    cy.get(':nth-child(3) > input').clear('1');
    cy.get(':nth-child(3) > input').type('1');
    cy.get('form > :nth-child(10)').click();
    cy.get(':nth-child(10) > :nth-child(1) > input').clear('a');
    cy.get(':nth-child(10) > :nth-child(1) > input').type('a4');
    cy.get(':nth-child(10) > :nth-child(3) > select').select('Checkmark');
    cy.get('form > :nth-child(13)').click();
    /* ==== End Cypress Studio ==== */
  });
});
