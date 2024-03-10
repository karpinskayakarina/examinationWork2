import OrderPage from "../support/pages/orderPage";
import {
  addNewAddress,
  addCardDetails,
  checkRadioButton,
  addWrongCardDetails,
  searchProductByName,
} from "../helper";
import AuthPage from "../support/pages/authPage";
import user from "../fixtures/user.json";

const authPage = new AuthPage();

describe("Order Placement", () => {
  const orderPage = new OrderPage();

  beforeEach(() => {
    orderPage.visit();
  });

  it("should place an order successfully with valid data", () => {
    authPage.fillLoginForm(user.email, user.password);
    orderPage.verifyProductsOnPage();
    orderPage.clickAddToBasketButton();
    orderPage.clickBasketLink();
    orderPage.verifyProductAppleInCard();
    orderPage.verifyBonusPointsMessage();
    orderPage.clickCheckoutButton();
    orderPage.clickCreateAddressLink();
    addNewAddress();
    checkRadioButton();
    orderPage.clickNextButton();
    orderPage.verifyAddressSuccessufullyAdded();
    checkRadioButton();
    cy.get(".mat-focus-indicator .nextButton").click();
    orderPage.expandPaymentOptions();
    addCardDetails();
    checkRadioButton();
    cy.get(".mat-focus-indicator .nextButton").click();
    orderPage.verifyCardSuccessufullyAdded();
    orderPage.clickFinalCheckoutButton();
    orderPage.verifyOrderSuccessMessage();
  });

  it("checking that the Add to Basket button is not present before login", () => {
    cy.visit("/#/search");
    orderPage.verifyAdToBasketIsNotVisible();
  });

  it("Sold Out", () => {
    authPage.fillLoginForm(user.email, user.password);
    cy.visit("/#/search");
    cy.get(".btn-basket .mat-button-wrapper").eq(11).click();
    orderPage.verifySoldOutMessage();
  });

  it("Only 1 left ", () => {
    authPage.fillLoginForm(user.email, user.password);
    cy.visit("/#/search");
    cy.get(".btn-basket .mat-button-wrapper").eq(3).click();
    orderPage.verifyProductBestJuiceInCard();
    cy.get(".btn-basket .mat-button-wrapper").eq(3).click();
    orderPage.verifyLastProduct();
    cy.visit("/#/basket");
    cy.get(".mat-column-remove").eq(1).click();
  });

  // MUST BE FIXED APPLICATION!!!
  it.skip("Only 3 left", () => {
    authPage.fillLoginForm(user.email, user.password);
    cy.visit("/#/search");
    cy.get(".btn-basket .mat-button-wrapper").eq(10).click();
    orderPage.verifyProductMelonBikeInCard();
    cy.get(".btn-basket .mat-button-wrapper").eq(10).click();
    orderPage.verifyProductMelonBikeInCard();
    cy.get(".btn-basket .mat-button-wrapper").eq(10).click();
    orderPage.verifyLastProduct();
    orderPage.deleteProductFromBasket();
  });

  it("Only 5 left", () => {
    authPage.fillLoginForm(user.email, user.password);
    cy.visit("/#/search");
    orderPage.clickNextPage();
    cy.log("1 item");
    orderPage.addOWASPJuiceTShirtInCardToCart();
    orderPage.verifyProductOWASPJuiceTShirtInCard();

    cy.log("2 items");
    orderPage.addOWASPJuiceTShirtInCardToCart();
    orderPage.verifyAnotherProductOWASPJuiceTShirtInCard();

    cy.log("3 items");
    orderPage.addOWASPJuiceTShirtInCardToCart();
    orderPage.verifyAnotherProductOWASPJuiceTShirtInCard();
    cy.wait(2000);

    cy.log("4 items");
    orderPage.addOWASPJuiceTShirtInCardToCart();
    orderPage.verifyAnotherProductOWASPJuiceTShirtInCard();
    cy.wait(2000);

    cy.log("5 items");
    orderPage.addOWASPJuiceTShirtInCardToCart();
    orderPage.verifyAnotherProductOWASPJuiceTShirtInCard();

    cy.log("6 items");
    orderPage.addOWASPJuiceTShirtInCardToCart();
    orderPage.verifyOnly5Items();

    orderPage.deleteProductFromBasket();
  });

  it("Check the purchase with incorrect card data", () => {
    authPage.fillLoginForm(user.email, user.password);
    orderPage.verifyProductsOnPage();
    orderPage.clickAddToBasketButton();
    orderPage.clickBasketLink();
    orderPage.verifyBonusPointsMessage();
    orderPage.clickCheckoutButton();
    checkRadioButton();
    orderPage.clickNextButton();
    checkRadioButton();
    cy.get(".mat-focus-indicator .nextButton").click();
    orderPage.expandPaymentOptions();
    addWrongCardDetails();
    orderPage.verifySubmitButtonIsDisabled();
    cy.contains("Please enter a valid sixteen digit card number.").should(
      "be.visible"
    );
    orderPage.deleteProductFromBasket();
  });

  it("search product by name", () => {
    authPage.fillLoginForm(user.email, user.password);
    orderPage.verifyProductsOnPage();

    const productName = "Apple Juice";

    searchProductByName(productName);
    cy.get(".btn-basket .mat-button-wrapper").eq(0).click();
    orderPage.clickBasketLink();
    orderPage.verifyBonusPointsMessage();
    orderPage.clickCheckoutButton();
    orderPage.clickCreateAddressLink();
    addNewAddress();
    checkRadioButton();
    orderPage.clickNextButton();
    orderPage.verifyAddressSuccessufullyAdded();
    checkRadioButton();
    cy.get(".mat-focus-indicator .nextButton").click();
    orderPage.expandPaymentOptions();
    addCardDetails();
    checkRadioButton();
    cy.get(".mat-focus-indicator .nextButton").click();
    orderPage.verifyCardSuccessufullyAdded();
    orderPage.clickFinalCheckoutButton();
    orderPage.verifyOrderSuccessMessage();
  });
});
