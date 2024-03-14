import { apiEndpoints } from "../endpoints";

export default class OrderPage {
  verifyProductsOnPage() {
    cy.intercept(apiEndpoints.products).as("products");
    cy.wait("@products").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  }

  clickAddToBasketButton() {
    this.getAddToBasketButton().click();
  }

  clickBasketLink() {
    this.getBasketLink().click();
  }

  verifyProductAppleInCard() {
    cy.contains("Placed Apple Juice (1000ml) into basket.").should(
      "be.visible"
    );
  }

  verifyBonusPointsMessage() {
    cy.contains("You will gain 0 Bonus Points from this order!").should(
      "be.visible"
    );
  }

  clickCheckoutButton() {
    this.getCheckoutButton().click({ force: true });
  }

  clickCreateAddressLink() {
    this.getCreateAddressLink().click();
  }

  clickBtnNext() {
    this.getBtnNext().click();
  }

  clickNextButton() {
    this.getNextButton().click();
  }

  verifyAddressSuccessufullyAdded() {
    cy.contains(
      "The address at Kyiv has been successfully added to your addresses."
    ).should("be.visible");
  }

  clickSubmitButton() {
    this.getSubmitButton().click();
  }

  expandPaymentOptions() {
    this.getPaymentOptions().click();
  }

  verifyCardSuccessufullyAdded() {
    cy.contains(
      "Your card ending with 8768 has been saved for your convenience."
    ).should("be.visible");
  }

  clickFinalCheckoutButton() {
    this.getFinalCheckoutButton().click();
  }

  verifyOrderSuccessMessage() {
    cy.contains("Thank you for your purchase!").should("be.visible");
  }

  verifyAdToBasketIsNotVisible() {
    cy.contains("Add to Basket").should("not.exist");
  }

  verifySoldOutMessage() {
    cy.contains("We are out of stock! Sorry for the inconvenience.").should(
      "be.visible"
    );
  }

  verifyProductBestJuiceInCard() {
    cy.contains("Placed Best Juice Shop Salesman Artwork into basket.").should(
      "be.visible"
    );
  }

  addOWASPJuiceTShirtInCardToCart() {
    this.getOWASPJuiceTShirtInCardButton().click();
  }

  verifyProductOWASPJuiceTShirtInCard() {
    cy.contains("Placed OWASP Juice Shop T-Shirt into basket.").should(
      "be.visible"
    );
  }

  verifyAnotherProductOWASPJuiceTShirtInCard() {
    cy.contains("Added another OWASP Juice Shop T-Shirt to basket.").should(
      "be.visible"
    );
  }

  addToCartMelonBike() {
    this.getMelonBikeButton().click();
  }

  verifyProductMelonBikeInCard() {
    cy.contains(
      "Placed Melon Bike (Comeback-Product 2018 Edition) into basket."
    ).should("be.visible");
  }

  verifyLastProduct() {
    cy.contains("We are out of stock! Sorry for the inconvenience.").should(
      "be.visible"
    );
  }

  verifyOnly1Item() {
    cy.contains("You can order only up to 1 items of this product.").should(
      "be.visible"
    );
  }

  verifyOnly5Items() {
    cy.contains("You can order only up to 5 items of this product.").should(
      "be.visible"
    );
  }

  clickNextPage() {
    this.getNextPageButton().click();
  }

  deleteProductFromBasket() {
    cy.visit("/#/basket");
    this.getRemoveProductButton().click();
  }

  verifySubmitButtonIsDisabled() {
    this.getSubmitButton().should("be.disabled");
  }

  addToCartBestJuiceShopSalesman() {
    this.getBestJuiceShopSalesmanButton().click();
  }

  addToCartAppleJuice() {
    this.getAppleJuiceButton().click();
  }

  verifyValidCardNumber() {
    cy.contains("Please enter a valid sixteen digit card number.").should(
      "be.visible"
    );
  }

  addCardDetails() {
    cy.get("#mat-input-10").type("TEST TEST");
    cy.get("#mat-input-11").type("8768876887688768");
    cy.get("#mat-input-12").select("1");
    cy.get("#mat-input-13").select("2080");
    cy.get("#submitButton").click();
  }

  addWrongCardDetails() {
    cy.get("#mat-input-10").type("TEST TEST");
    cy.get("#mat-input-11").type("1");
    cy.get("#mat-input-12").select("1");
    cy.get("#mat-input-13").select("2080");
  }

  searchProductByName(productName) {
    cy.get(".mat-search_icon-search").type(productName + "{enter}");
  }

  getAddToBasketButton() {
    return cy.get(".btn-basket .mat-button-wrapper").eq(0);
  }

  getBasketLink() {
    return cy.get("[routerLink='/basket']");
  }

  getCheckoutButton() {
    return cy.get("#checkoutButton");
  }

  getCreateAddressLink() {
    return cy.get("[routerLink='/address/create']");
  }

  getBtnNext() {
    return cy.get(".mat-focus-indicator .btn-next");
  }

  getNextButton() {
    return cy.get(".mat-focus-indicator .nextButton");
  }

  getSubmitButton() {
    return cy.get("#submitButton");
  }

  getPaymentOptions() {
    return cy.get("#mat-expansion-panel-header-0");
  }

  getFinalCheckoutButton() {
    return cy.get("#checkoutButton");
  }

  getOWASPJuiceTShirtInCardButton() {
    return cy.get(".btn-basket .mat-button-wrapper").eq(11);
  }

  getMelonBikeButton() {
    return cy.get(".btn-basket .mat-button-wrapper").eq(10);
  }

  getNextPageButton() {
    return cy.get('[aria-label="Next page"]');
  }

  getRemoveProductButton() {
    return cy.get(".mat-column-remove").eq(1);
  }

  getBestJuiceShopSalesmanButton() {
    return cy.get(".btn-basket .mat-button-wrapper").eq(3);
  }

  getAppleJuiceButton() {
    return cy.get(".btn-basket .mat-button-wrapper").eq(0);
  }
}
