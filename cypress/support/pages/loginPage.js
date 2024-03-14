export default class LoginPage {
  visitLogin() {
    cy.visit("/#/login");
    cy.closeBanners();
  }
}
