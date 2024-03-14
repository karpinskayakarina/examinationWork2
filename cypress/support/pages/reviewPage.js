export default class ReviewPage {
  visit() {
    cy.visit("/#/search");
  }

  getProductElement(index) {
    return cy.get(".product").eq(index);
  }

  addToCartApplePomace() {
    this.getProductElement(1).click();
  }
}
