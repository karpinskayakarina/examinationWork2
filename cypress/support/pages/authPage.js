export default class AuthPage {
  registerUser(user) {
    cy.request({
      method: "POST",
      url: "/api/Users/",
      body: user,
    });
  }

  getLoginField() {
    return cy.get("#email");
  }

  getPasswordField() {
    return cy.get("#password");
  }

  getLoginButton() {
    return cy.get("#loginButton");
  }

  fillLoginForm(email, password) {
    this.getLoginField().type(email);
    this.getPasswordField().type(password);
    this.getLoginButton().click();
  }

  verifyLoginSuccessMessage() {
    cy.contains("All Products").should("be.visible");
  }

  verifyErrorMessage() {
    cy.contains("Invalid email or password.").should("be.visible");
  }

  verifyDisabledAuthButton() {
    this.getLoginButton().should("be.disabled");
  }

  clickRememberMe() {
    cy.get("#rememberMe").click();
  }
}
