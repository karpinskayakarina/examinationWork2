import { TestData } from "../fixtures/constants";
import AuthPage from "../support/pages/authPage";
import { registerUser } from "../support/userRegistration";
import LoginPage from "../support/pages/loginPage";

describe("Authorization", () => {
  const loginPage = new LoginPage();
  const authPage = new AuthPage();
  let user;

  beforeEach(() => {
    user = registerUser();

    cy.log("Visiting the authorization page");
    loginPage.visitLogin();
  });

  it("should login with valid credentials", () => {
    cy.log("Logging in with valid credentials");
    authPage.fillLoginForm(user.email, user.password);
    authPage.verifyLoginSuccessMessage();
  });

  it("should login with valid credentials and Remember Me Checkbox", () => {
    cy.log("Logging in with valid credentials and Remember Me checkbox");
    authPage.clickRememberMe();
    authPage.fillLoginForm(user.email, user.password);
    authPage.verifyLoginSuccessMessage();
  });

  it("should not login with invalid email", () => {
    cy.log("Attempting to login with invalid email");
    const { invalidEmail, validPassword } = TestData;
    authPage.fillLoginForm(invalidEmail, validPassword);
    authPage.verifyErrorMessage();
  });

  it("should not login with incorrect password", () => {
    cy.log("Attempting to login with incorrect password");
    const { validEmail, weakPassword } = TestData;
    authPage.fillLoginForm(validEmail, weakPassword);
    authPage.verifyErrorMessage();
  });

  it("should not login without providing email and password", () => {
    cy.log("Attempting to login without providing email and password");
    authPage.verifyDisabledAuthButton();
  });
});
