import faker from "faker";
import OrderPage from "../support/pages/orderPage";
import AuthPage from "../support/pages/authPage";
import { addNewAddress } from "../helper";
import LoginPage from "../support/pages/loginPage";
import BasePage from "../support/pages/basePage";
import HomePage from "../support/pages/homePage";

const authPage = new AuthPage();
const orderPage = new OrderPage();
const loginPage = new LoginPage();
const basePage = new BasePage();
const homePage = new HomePage();

let user;

describe("Order Placement", () => {
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
      url: "/api/Users/",
      body: user,
    });

    loginPage.visitLogin();
  });

  it("should place an order successfully with valid data", () => {
    const productName = "Apple Juice";

    authPage.fillLoginForm(user.email, user.password);
    orderPage.verifyProductsOnPage();
    orderPage.clickAddToBasketButton();
    orderPage.clickBasketLink();
    orderPage.verifyProductAppleInCard();
    orderPage.verifyBonusPointsMessage();
    orderPage.clickCheckoutButton();
    orderPage.clickCreateAddressLink();
    addNewAddress();
    basePage.checkRadioButton();
    orderPage.clickBtnNext();
    orderPage.verifyAddressSuccessufullyAdded();
    basePage.checkRadioButton();
    orderPage.clickNextButton();
    orderPage.expandPaymentOptions();
    orderPage.addCardDetails();
    basePage.checkRadioButton();
    orderPage.clickNextButton();
    orderPage.verifyCardSuccessufullyAdded();
    orderPage.clickFinalCheckoutButton();
    orderPage.verifyOrderSuccessMessage();
  });

  it("checking that the Add to Basket button is not present before login", () => {
    homePage.visit();
    orderPage.verifyAdToBasketIsNotVisible();
  });

  it("check adding to cart item with status sold Out", () => {
    authPage.fillLoginForm(user.email, user.password);
    homePage.visit();
    orderPage.addOWASPJuiceTShirtInCardToCart();
    orderPage.verifySoldOutMessage();
  });

  it("check adding to cart item with status only 1 left ", () => {
    authPage.fillLoginForm(user.email, user.password);
    homePage.visit();
    orderPage.addToCartBestJuiceShopSalesman();
    orderPage.verifyProductBestJuiceInCard();
    orderPage.addToCartBestJuiceShopSalesman();
    orderPage.verifyLastProduct();
    orderPage.deleteProductFromBasket();
  });

  it("check adding to cart item with status only 3 left and user can buy just 1 product", () => {
    authPage.fillLoginForm(user.email, user.password);
    homePage.visit();
    orderPage.addToCartMelonBike();
    orderPage.verifyProductMelonBikeInCard();
    orderPage.addToCartMelonBike();
    orderPage.verifyOnly1Item();
    orderPage.deleteProductFromBasket();
  });

  it("check adding to cart item with status only 5 left", () => {
    cy.intercept("GET", "/api/Products/*").as("Products");
    authPage.fillLoginForm(user.email, user.password);
    homePage.visit();
    orderPage.clickNextPage();
    cy.log("1 item");
    orderPage.addOWASPJuiceTShirtInCardToCart();
    orderPage.verifyProductOWASPJuiceTShirtInCard();
    cy.wait("@Products");
    cy.log("2 items");
    orderPage.addOWASPJuiceTShirtInCardToCart();
    orderPage.verifyAnotherProductOWASPJuiceTShirtInCard();
    cy.wait("@Products");
    cy.log("3 items");
    orderPage.addOWASPJuiceTShirtInCardToCart();
    orderPage.verifyAnotherProductOWASPJuiceTShirtInCard();
    cy.wait("@Products");
    cy.log("4 items");
    orderPage.addOWASPJuiceTShirtInCardToCart();
    orderPage.verifyAnotherProductOWASPJuiceTShirtInCard();
    cy.wait("@Products");
    cy.log("5 items");
    orderPage.addOWASPJuiceTShirtInCardToCart();
    orderPage.verifyAnotherProductOWASPJuiceTShirtInCard();
    cy.wait("@Products");
    cy.log("6 items");
    orderPage.addOWASPJuiceTShirtInCardToCart();
    orderPage.verifyOnly5Items();

    orderPage.deleteProductFromBasket();
  });

  it("check the purchase with incorrect card data", () => {
    authPage.fillLoginForm(user.email, user.password);
    orderPage.verifyProductsOnPage();
    orderPage.clickAddToBasketButton();
    orderPage.clickBasketLink();
    orderPage.verifyBonusPointsMessage();
    orderPage.clickCheckoutButton();
    orderPage.clickCreateAddressLink();
    addNewAddress();
    basePage.checkRadioButton();
    orderPage.clickBtnNext();
    basePage.checkRadioButton();
    orderPage.clickNextButton();
    orderPage.expandPaymentOptions();
    orderPage.addWrongCardDetails();
    orderPage.verifySubmitButtonIsDisabled();
    orderPage.verifyValidCardNumber();
    orderPage.deleteProductFromBasket();
  });

  it("search product by name", () => {
    authPage.fillLoginForm(user.email, user.password);
    orderPage.verifyProductsOnPage();

    const productName = "Apple Juice";

    orderPage.searchProductByName(productName);
    orderPage.addToCartAppleJuice();
    orderPage.clickBasketLink();
    orderPage.verifyBonusPointsMessage();
    orderPage.clickCheckoutButton();
    orderPage.clickCreateAddressLink();
    addNewAddress();
    basePage.checkRadioButton();
    orderPage.clickBtnNext();
    orderPage.verifyAddressSuccessufullyAdded();
    basePage.checkRadioButton();
    orderPage.clickNextButton();
    orderPage.expandPaymentOptions();
    orderPage.addCardDetails();
    basePage.checkRadioButton();
    orderPage.clickNextButton();
    orderPage.verifyCardSuccessufullyAdded();
    orderPage.clickFinalCheckoutButton();
    orderPage.verifyOrderSuccessMessage();
  });
});
