export function getMatInputField(selector) {
  return cy.get(selector);
}

export function getAddressField() {
  return cy.get("#address");
}

export function clickSubmitButton() {
  return cy.get("#submitButton").click();
}

export function addNewAddress() {
  getMatInputField("#mat-input-3").type("Ukraine");
  getMatInputField("#mat-input-4").type("Test");
  getMatInputField("#mat-input-5").type("100000000");
  getMatInputField("#mat-input-6").type("49106");
  getAddressField().type("Address111");

  getMatInputField("#mat-input-8").type("Kyiv");
  getMatInputField("#mat-input-9").type("Kyiv", { force: true });
  cy.get(".mat-focus-indicator .mat-button-focus-overlay")
    .last()
    .click({ force: true });
  clickSubmitButton();
}
