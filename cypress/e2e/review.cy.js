import faker from "faker";
import ReviewPage from "../support/pages/reviewPage";
import AuthPage from "../support/pages/authPage";
import OrderPage from "../support/pages/orderPage";
import { apiEndpoints } from "../support/endpoints";
import LoginPage from "../support/pages/loginPage";

const reviewPage = new ReviewPage();
const authPage = new AuthPage();
const orderPage = new OrderPage();
const loginPage = new LoginPage();

describe("Feedback form", () => {
  beforeEach(() => {
    const newUser = {
      email: faker.internet.email(),
      password: "12345678",
      confirmPassword: "12345678",
    };

    cy.request({
      method: "POST",
      url: "/api/Users/",
      body: newUser,
    }).then(() => {
      loginPage.visitLogin();
      authPage.fillLoginForm(newUser.email, newUser.password);
      reviewPage.visit();
      orderPage.verifyProductsOnPage();
      reviewPage.addToCartApplePomace();
      cy.contains("Reviews").should("be.visible");
    });
  });

  it("should submit feedback successfully", () => {
    let initialFeedbackCount;

    cy.get(".mat-content span")
      .eq(1)
      .invoke("text")
      .should("match", /\d+/)
      .then((text) => {
        initialFeedbackCount = parseInt(text.replace(/\D/g, ""), 10);

        cy.intercept("PUT", apiEndpoints.reviews).as("reviewsPUT");
        cy.contains("Language has been changed to English").should("not.exist");
        cy.get("#mat-input-3").type("qwerty", { delay: 100, timeout: 10000 });
        cy.get("#submitButton").click({ timeout: 10000 });

        cy.wait("@reviewsPUT").then((interception) => {
          expect(interception.response.statusCode).to.satisfy((status) => {
            return status === 200 || status === 201;
          });
        });

        cy.intercept("GET", apiEndpoints.reviews).as("reviewsGET");
        cy.wait("@reviewsGET").then((interception) => {
          expect(interception.response.statusCode).to.satisfy((status) => {
            return status === 200 || status === 201;
          });
        });

        cy.get(".mat-content span", { timeout: 10000 })
          .eq(1)
          .invoke("text")
          .should("match", /\d+/)
          .then((text) => {
            const currentFeedbackCount = parseInt(text.replace(/\D/g, ""), 10);
            expect(currentFeedbackCount).to.equal(initialFeedbackCount + 1);
          });
      });
  });
});
