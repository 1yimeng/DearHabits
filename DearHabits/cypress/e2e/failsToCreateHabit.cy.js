describe("fails to create a habit", () => {
  beforeEach(() => {
    // log in before tests
    cy.visit('/');
    cy.get('[value="Log in"]').click();
    cy.get(':nth-child(3) > .inputBox').clear('t');
    cy.get(':nth-child(3) > .inputBox').type('test@gmail.com');
    cy.get(':nth-child(5) > .inputBox').clear('t');
    cy.get(':nth-child(5) > .inputBox').type('testtest');
    cy.get('.inputButton').click();
    cy.wait(500);
    // cy.url().should("include", "/main");
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Create habit with no name", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[name="createHabit"]').click();
    cy.get("section > :nth-child(1) > input").clear("A");
    cy.get("section > :nth-child(1) > input").type("A1");
    cy.get("form > :nth-child(10)").click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Create habit with no label", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[name="createHabit"]').click();
    cy.get("h2 > input").clear("t");
    cy.get("h2 > input").type("test");
    cy.get("form > :nth-child(10)").click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Create habit with no upper bound", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[name="createHabit"]').click();
    cy.get("h2 > input").clear("t");
    cy.get("h2 > input").type("test");
    cy.get("section > :nth-child(1) > input").clear("a");
    cy.get("section > :nth-child(1) > input").type("a1");
    cy.get("form > section").click();
    cy.get(":nth-child(3) > select").select("Scale");
    cy.get(":nth-child(3) > input").clear("1");
    cy.get(":nth-child(3) > input").type("1");
    cy.get("form > :nth-child(10)").click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Create habit with no lower bound", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[name="createHabit"]').click();
    cy.get("h2 > input").clear("t");
    cy.get("h2 > input").type("test");
    cy.get("section > :nth-child(1) > input").clear("a");
    cy.get("section > :nth-child(1) > input").type("a1");
    cy.get("form > section > :nth-child(3)").click();
    cy.get(":nth-child(3) > select").select("Scale");
    cy.get(":nth-child(7) > section > :nth-child(1) > input").clear("1");
    cy.get(":nth-child(7) > section > :nth-child(1) > input").type("10");
    cy.get("form > :nth-child(10)").click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Create habit with interval < 2", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[name="createHabit"]').click();
    cy.get("h2 > input").clear("t");
    cy.get("h2 > input").type("test");
    cy.get("section > :nth-child(1) > input").clear("a");
    cy.get("section > :nth-child(1) > input").type("a1");
    cy.get("form").click();
    cy.get(":nth-child(3) > select").select("Scale");
    cy.get(":nth-child(7) > section > :nth-child(1) > input").clear("1");
    cy.get(":nth-child(7) > section > :nth-child(1) > input").type("10");
    cy.get(":nth-child(3) > input").clear("1");
    cy.get(":nth-child(3) > input").type("1");
    cy.get(":nth-child(7) > section > :nth-child(5)").click();
    cy.get(":nth-child(5) > input").clear();
    cy.get(":nth-child(5) > input").type("1");
    cy.get("form > :nth-child(10)").click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Create habit with empty Upper Bound + empty Lower Bound + Interval < 2", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[name="createHabit"]').click();
    cy.get("h2 > input").clear("t");
    cy.get("h2 > input").type("test");
    cy.get("section > :nth-child(1) > input").clear("a");
    cy.get("section > :nth-child(1) > input").type("a1");
    cy.get("form > section").click();
    cy.get(":nth-child(3) > select").select("Scale");
    cy.get(":nth-child(7) > section > :nth-child(1) > input").click();
    cy.get("form > :nth-child(7)").click();
    cy.get(":nth-child(7) > section > :nth-child(5)").click();
    cy.get(":nth-child(5) > input").clear();
    cy.get(":nth-child(5) > input").type("1");
    cy.get("form > :nth-child(10)").click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("fails since no activity", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[name="createHabit"]').click();
    cy.get("form > section > button").click();
    cy.on("window:alert", (t) => {
      //assertions
      expect(t).to.contains("Must have at least One Activity");
    });
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('fails since 20+ Activites', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[name="createHabit"]').click();
    cy.get('h2 > input').clear('T');
    cy.get('h2 > input').type('Test');
    cy.get('section > :nth-child(1) > input').clear('a');
    cy.get('section > :nth-child(1) > input').type('a1');
    cy.get('form').click();
    cy.get('form > :nth-child(8)').click();
    cy.get('form > :nth-child(9)').click();
    cy.get('form > :nth-child(10)').click();
    cy.get('form > :nth-child(11)').click();
    cy.get('form > :nth-child(12)').click();
    cy.get('form > :nth-child(13)').click();
    cy.get('form > :nth-child(14)').click();
    cy.get('form > :nth-child(15)').click();
    cy.get('form > :nth-child(16)').click();
    cy.get('form > :nth-child(17)').click();
    cy.get('form > :nth-child(18)').click();
    cy.get('form > :nth-child(19)').click();
    cy.get('form > :nth-child(20)').click();
    cy.get(':nth-child(21)').click();
    cy.get(':nth-child(22)').click();
    cy.get(':nth-child(23)').click();
    cy.get(':nth-child(24)').click();
    cy.get(':nth-child(25)').click();
    cy.get(':nth-child(26)').click();
    cy.get(':nth-child(27)').click();
    cy.get(':nth-child(27)').click();
    /* ==== End Cypress Studio ==== */
  });
});
