export function addNewAddress() {
  cy.get("#mat-input-3").type("Ukraine");
  cy.get("#mat-input-4").type("Test");
  cy.get("#mat-input-5").type("100000000");
  cy.get("#mat-input-6").type("49106");
  cy.get("#address").type("Address111");

  cy.get("#mat-input-8").type("Kyiv");
  cy.get("#mat-input-9").type("Kyiv", { force: true });
  cy.get(".mat-focus-indicator .mat-button-focus-overlay")
    .last()
    .click({ force: true });
  cy.get("#submitButton").click();
}

export function checkRadioButton() {
  cy.get(".mat-radio-outer-circle", { timeout: 10000 })
    .eq(0)
    .click({ force: true });
}

export function addCardDetails() {
  cy.get("#mat-input-10").type("TEST TEST");
  cy.get("#mat-input-11").type("8768876887688768");
  cy.get("#mat-input-12").select("1");
  cy.get("#mat-input-13").select("2080");
  cy.get("#submitButton").click();
}

export function addWrongCardDetails() {
  cy.get("#mat-input-3").type("TEST TEST");
  cy.get("#mat-input-4").type("1");
  cy.get("#mat-input-5").select("1");
  cy.get("#mat-input-6").select("2080");
}

export function searchProductByName(productName) {
  cy.get(".mat-search_icon-search").type(productName + "{enter}");
}
