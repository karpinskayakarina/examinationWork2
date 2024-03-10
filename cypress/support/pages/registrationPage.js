class RegistrationPage {
  visit() {
    cy.visit("/#/login");
    cy.closeBanners();
    cy.get("#navbarAccount").click();
    cy.get("#navbarLoginButton").click();
    cy.get("#newCustomerLink").click();
  }

  fillRegistrationForm(
    email,
    password,
    securityAnswer,
    confirmPassword = password
  ) {
    cy.get("#emailControl").type(email);
    cy.get("#passwordControl").type(password);
    cy.get("#repeatPasswordControl").type(confirmPassword);
    cy.get("#mat-select-0").click();
    cy.get("#mat-option-1").click();
    cy.get("#securityAnswerControl").type(securityAnswer);
    cy.get("#registerButton .material-icons").click();
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
