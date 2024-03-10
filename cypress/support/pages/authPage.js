export default class AuthPage {
  visit() {
    cy.visit("/#/login");
    cy.closeBanners();
  }

  fillLoginForm(email, password) {
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#loginButton").click();
  }

  verifyLoginSuccessMessage() {
    cy.contains("All Products").should("be.visible");
  }

  verifyErrorMessage() {
    cy.contains("Invalid email or password.").should("be.visible");
  }

  verifyDisabledAuthButton() {
    cy.get("#loginButton").should("be.disabled");
  }
}
