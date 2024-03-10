import AuthPage from "../support/pages/authPage";
import OrderPage from "../support/pages/orderPage";
import ContactPage from "../support/pages/contactPage";
import user from "../fixtures/user.json";

const authPage = new AuthPage();
const orderPage = new OrderPage();
const contactPage = new ContactPage();

describe("Feedback", () => {
  beforeEach(() => {
    authPage.visit();
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
