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
    orderPage.clickBtnNext();
    orderPage.verifyAddressSuccessufullyAdded();
    checkRadioButton();
    orderPage.clickNextButton();
    orderPage.expandPaymentOptions();
    addCardDetails();
    checkRadioButton();
    orderPage.clickNextButton();
    orderPage.verifyCardSuccessufullyAdded();
    orderPage.clickFinalCheckoutButton();
    orderPage.verifyOrderSuccessMessage();
  });

  it("checking that the Add to Basket button is not present before login", () => {
    orderPage.visitSearch();
    orderPage.verifyAdToBasketIsNotVisible();
  });

  it("Sold Out", () => {
    authPage.fillLoginForm(user.email, user.password);
    orderPage.visitSearch();
    orderPage.addOWASPJuiceTShirtInCardToCart();
    orderPage.verifySoldOutMessage();
  });

  it("Only 1 left ", () => {
    authPage.fillLoginForm(user.email, user.password);
    orderPage.visitSearch();
    orderPage.addToCartBestJuiceShopSalesman();
    orderPage.verifyProductBestJuiceInCard();
    orderPage.addToCartBestJuiceShopSalesman();
    orderPage.verifyLastProduct();
    orderPage.deleteProductFromBasket();
  });

  // MUST BE FIXED APPLICATION!!!
  it.skip("Only 3 left", () => {
    authPage.fillLoginForm(user.email, user.password);
    orderPage.visitSearch();
    orderPage.addToCartMelonBike();
    orderPage.verifyProductMelonBikeInCard();
    orderPage.addToCartMelonBike();
    orderPage.verifyProductMelonBikeInCard();
    orderPage.addToCartMelonBike();
    orderPage.verifyLastProduct();
    orderPage.deleteProductFromBasket();
  });

  it("Only 5 left", () => {
    authPage.fillLoginForm(user.email, user.password);
    orderPage.visitSearch();
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
    orderPage.clickBtnNext();
    checkRadioButton();
    orderPage.clickNextButton();
    orderPage.expandPaymentOptions();
    addWrongCardDetails();
    orderPage.verifySubmitButtonIsDisabled();
    orderPage.verifyValidCardNumber();
    orderPage.deleteProductFromBasket();
  });

  it("search product by name", () => {
    authPage.fillLoginForm(user.email, user.password);
    orderPage.verifyProductsOnPage();

    const productName = "Apple Juice";

    searchProductByName(productName);
    orderPage.addToCartAppleJuice();
    orderPage.clickBasketLink();
    orderPage.verifyBonusPointsMessage();
    orderPage.clickCheckoutButton();
    orderPage.clickCreateAddressLink();
    addNewAddress();
    checkRadioButton();
    orderPage.clickBtnNext();
    orderPage.verifyAddressSuccessufullyAdded();
    checkRadioButton();
    orderPage.clickNextButton();
    orderPage.expandPaymentOptions();
    addCardDetails();
    checkRadioButton();
    orderPage.clickNextButton();
    orderPage.verifyCardSuccessufullyAdded();
    orderPage.clickFinalCheckoutButton();
    orderPage.verifyOrderSuccessMessage();
  });
});
