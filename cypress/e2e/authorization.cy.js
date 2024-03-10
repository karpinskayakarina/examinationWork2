import { TestData } from "../fixtures/constants";
import AuthPage from "../support/pages/authPage";
import user from "../fixtures/user.json";

describe("Authorization", () => {
  const authPage = new AuthPage();

  beforeEach(() => {
    cy.log("Відвідання сторінки авторизації");
    authPage.visit();
  });

  it("should login with valid credentials", () => {
    cy.log("Вхід з дійсними обліковими даними");
    authPage.fillLoginForm(user.email, user.password);
    authPage.verifyLoginSuccessMessage();
  });

  it("should login with valid credentials and Remember Me Checkbox", () => {
    cy.log("Вхід з дійсними обліковими даними та прапорцем 'Запам'ятати мене'");
    cy.get("#rememberMe").click();
    authPage.fillLoginForm(user.email, user.password);
    authPage.verifyLoginSuccessMessage();
  });

  it("should not login with invalid email", () => {
    cy.log("Спроба входу з недійсною електронною адресою");
    const { invalidEmail, validPassword } = TestData;
    authPage.fillLoginForm(invalidEmail, validPassword);
    authPage.verifyErrorMessage();
  });

  it("should not login with incorrect password", () => {
    cy.log("Спроба входу з неправильним паролем");
    const { validEmail, weakPassword } = TestData;
    authPage.fillLoginForm(validEmail, weakPassword);
    authPage.verifyErrorMessage();
  });

  it("should not login without providing email and password", () => {
    cy.log("Спроба входу без введення електронної адреси та пароля");
    authPage.verifyDisabledAuthButton();
  });
});
