class RegistrationPage {
  visit() {
    cy.visit("/#/login");
    cy.closeBanners();
    cy.get("#navbarAccount").click();
    cy.get("#navbarLoginButton").click();
    cy.get("#newCustomerLink").click();
  }

  getEmailField() {
    return cy.get("#emailControl");
  }

  getPasswordField() {
    return cy.get("#passwordControl");
  }

  getRepeatPasswordField() {
    return cy.get("#repeatPasswordControl");
  }

  getSecurityQuestionDropdown() {
    return cy.get("#mat-select-0");
  }

  getSecurityAnswerField() {
    return cy.get("#securityAnswerControl");
  }

  getRegisterButton() {
    return cy.get("#registerButton .material-icons");
  }

  fillRegistrationForm(
    email,
    password,
    securityAnswer,
    confirmPassword = password
  ) {
    this.getEmailField().type(email);
    this.getPasswordField().type(password);
    this.getRepeatPasswordField().type(confirmPassword);
    this.getSecurityQuestionDropdown().click();
    cy.get("#mat-option-1").click();
    this.getSecurityAnswerField().type(securityAnswer);
    this.getRegisterButton().click();
  }

  verifyRegistrationSuccessMessage() {
    cy.get(".mat-simple-snack-bar-content").should(
      "contain",
      "Registration completed successfully. You can now log in."
    );
  }

  verifyDisabledRegisterButton() {
    cy.get("#registerButton").should("be.disabled");
  }
}

export default RegistrationPage;
