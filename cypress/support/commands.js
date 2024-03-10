Cypress.Commands.add("closeBanners", () => {
  cy.get("#mat-dialog-0 .mat-button-wrapper").eq(1).click();
  cy.get(".cc-btn").click();
});
