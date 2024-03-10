import user from "../fixtures/user.json";
import ReviewPage from "../support/pages/reviewPage";
import AuthPage from "../support/pages/authPage";
import OrderPage from "../support/pages/orderPage";
import { apiEndpoints } from "../support/endpoints";

const reviewPage = new ReviewPage();
const authPage = new AuthPage();
const orderPage = new OrderPage();

it.skip("Feedback form", () => {
  authPage.visit();
  authPage.fillLoginForm(user.email, user.password);
  reviewPage.visit();
  orderPage.verifyProductsOnPage();
  cy.get(".product").eq(1).click();
  cy.contains("Reviews").should("be.visible");

  let initialFeedbackCount;
  console.log(initialFeedbackCount);
  cy.get(".mat-content span")
    .eq(1)
    .invoke("text")
    .then((text) => {
      initialFeedbackCount = parseInt(text.replace(/\D/g, ""), 10);
      console.log(initialFeedbackCount);
      cy.intercept("PUT", apiEndpoints.reviews).as("reviewsPUT");
      cy.get("#mat-input-3").type("12345678", { delay: 100, timeout: 10000 });
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

      console.log(initialFeedbackCount);
      cy.get(".mat-content span", { timeout: 10000 })
        .eq(1)
        .invoke("text")
        .then((text) => {
          console.log(text);

          const currentFeedbackCount = parseInt(text.replace(/\D/g, ""), 10);
          expect(currentFeedbackCount).to.equal(initialFeedbackCount + 1);
          console.log(initialFeedbackCount);
        });
    });
});
