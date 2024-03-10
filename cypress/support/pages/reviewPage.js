export default class ReviewPage {
  visit() {
    cy.visit("/#/search");
  }

  addToCartApplePomace() {
    cy.get(".product").eq(1).click();
  }
}
