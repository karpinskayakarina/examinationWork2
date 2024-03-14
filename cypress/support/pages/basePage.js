export default class BasePage {
  checkRadioButton() {
    cy.get(".mat-radio-outer-circle", { timeout: 10000 })
      .eq(0)
      .click({ force: true });
  }

  clickOnLoginButton() {
    cy.get("#loginButton").click();
  }
}
