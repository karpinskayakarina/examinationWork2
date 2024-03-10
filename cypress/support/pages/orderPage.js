import { apiEndpoints } from "../endpoints";

export default class OrderPage {
  visitLogin() {
    cy.visit("/#/login");
    cy.closeBanners();
  }

  visitSearch() {
    cy.visit("/#/search");
  }

  verifyProductsOnPage() {
    cy.intercept(apiEndpoints.products).as("products");
    cy.wait("@products").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  }

  clickAddToBasketButton() {
    cy.get(".btn-basket .mat-button-wrapper").eq(0).click();
  }

  clickBasketLink() {
    cy.get("[routerLink='/basket']").click();
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
    cy.get("#checkoutButton").click({ force: true });
  }

  clickCreateAddressLink() {
    cy.get("[routerLink='/address/create']").click();
  }

  clickBtnNext() {
    cy.get(".mat-focus-indicator .btn-next").click();
  }

  clickNextButton() {
    cy.get(".mat-focus-indicator .nextButton").click();
  }

  verifyAddressSuccessufullyAdded() {
    cy.contains(
      "The address at Kyiv has been successfully added to your addresses."
    ).should("be.visible");
  }

  clickSubmitButton() {
    cy.get(".submitButton").click();
  }

  expandPaymentOptions() {
    cy.get("#mat-expansion-panel-header-0").click();
  }

  verifyCardSuccessufullyAdded() {
    cy.contains(
      "Your card ending with 8768 has been saved for your convenience."
    ).should("be.visible");
  }

  clickFinalCheckoutButton() {
    cy.get("#checkoutButton").click();
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
    cy.get(".btn-basket .mat-button-wrapper").eq(11).click();
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
    cy.get(".btn-basket .mat-button-wrapper").eq(10).click();
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

  verifyOnly5Items() {
    cy.contains("You can order only up to 5 items of this product.").should(
      "be.visible"
    );
  }

  clickNextPage() {
    cy.get('[aria-label="Next page"]').click();
  }

  deleteProductFromBasket() {
    cy.visit("/#/basket");
    cy.get(".mat-column-remove").eq(1).click();
  }

  verifySubmitButtonIsDisabled() {
    cy.get("#submitButton").should("be.disabled");
  }

  addToCartBestJuiceShopSalesman() {
    cy.get(".btn-basket .mat-button-wrapper").eq(3).click();
  }

  addToCartAppleJuice() {
    cy.get(".btn-basket .mat-button-wrapper").eq(0).click();
  }

  verifyValidCardNumber() {
    cy.contains("Please enter a valid sixteen digit card number.").should(
      "be.visible"
    );
  }
}
