describe("Registration", () => {
  it("should register a new user with valid data", () => {
    cy.visit("https://juice-shop-sanitarskyi.herokuapp.com/#/login");
    cy.get("#navbarAccount").click();
    cy.get("#navbarLoginButton").click();
    cy.get("#newCustomerLink").click();
  });
});
