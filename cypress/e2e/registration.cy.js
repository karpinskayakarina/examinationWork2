import { TestData } from "../fixtures/constants";
import RegistrationPage from "../support/pages/registrationPage";

describe("Registration", () => {
  const registrationPage = new RegistrationPage();

  beforeEach(() => {
    cy.log("Visiting registration page...");
    registrationPage.visit();
  });

  it("should register a new user with valid data", () => {
    const { validEmail, validPassword, securityAnswer } = TestData;

    cy.log("Filling registration form with valid data...");
    registrationPage.fillRegistrationForm(
      validEmail,
      validPassword,
      securityAnswer
    );
    registrationPage.verifyRegistrationSuccessMessage();
  });

  it("should not register a new user with a weak password", () => {
    const { validEmail, weakPassword, securityAnswer } = TestData;

    cy.log("Filling registration form with weak password...");
    registrationPage.fillRegistrationForm(
      validEmail,
      weakPassword,
      securityAnswer
    );
    registrationPage.verifyDisabledRegisterButton();
  });

  it("should not register a new user with passwords that do not match", () => {
    const { validEmail, validPassword, confirmPassword, securityAnswer } =
      TestData;

    cy.log("Filling registration form with passwords that do not match...");
    registrationPage.fillRegistrationForm(
      validEmail,
      validPassword,
      confirmPassword,
      securityAnswer,
      confirmPassword
    );
    registrationPage.verifyDisabledRegisterButton();
  });

  it("should not register a new user with an invalid email", () => {
    const { invalidEmail, validPassword, securityAnswer } = TestData;

    cy.log("Filling registration form with invalid email...");
    registrationPage.fillRegistrationForm(
      invalidEmail,
      validPassword,
      securityAnswer
    );
    registrationPage.verifyDisabledRegisterButton();
  });

  it("should not register a new user without providing all required fields", () => {
    cy.log("Verifying disabled register button...");
    registrationPage.verifyDisabledRegisterButton();
  });
});
