import AuthPage from "../support/pages/authPage";
import OrderPage from "../support/pages/orderPage";
import ContactPage from "../support/pages/contactPage";
import faker from "faker";
import LoginPage from "../support/pages/loginPage";

const authPage = new AuthPage();
const orderPage = new OrderPage();
const contactPage = new ContactPage();
const loginPage = new LoginPage();

describe("Feedback", () => {
  let user;

  beforeEach(() => {
    user = {
      email: faker.internet.email(),
      password: "12345678",
      passwordRepeat: "12345678",
      securityAnswer: "23456",
      securityQuestion: {
        id: 6,
        question: "Paternal grandmother's first name?",
      },
    };

    cy.request({
      method: "POST",
      url: "https://juice-shop-sanitarskyi.herokuapp.com/api/Users/",
      body: user,
    });

    loginPage.visitLogin();
    authPage.fillLoginForm(user.email, user.password);
    orderPage.verifyProductsOnPage();
  });

  it("Fill feedback form", () => {
    cy.log("Filling feedback form");

    contactPage.visit();
    contactPage.fillFeedbackForm("12345678");

    cy.log("Getting captcha text");
    contactPage.getCaptchaText().then((captchaText) => {
      const result = eval(captchaText);
      cy.log(`Captcha result: ${result}`);
      contactPage.enterCaptchaResult(result);
    });

    cy.log("Submitting feedback");
    contactPage.submitFeedback();

    cy.contains("Thank you for your feedback.").should("be.visible");
  });
});
