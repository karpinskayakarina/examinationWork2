export default class ContactPage {
  visit() {
    cy.visit("/#/contact");
  }

  getCommentField() {
    return cy.get("#comment");
  }

  getRatingField() {
    return cy.get("#rating");
  }

  fillFeedbackForm(comment) {
    this.getCommentField().type(comment);
    this.getRatingField().invoke("attr", "aria-valuenow", 3).click();
    this.getRatingField().invoke("attr", "aria-valuenow", 2).click();
    this.getRatingField().invoke("attr", "aria-valuenow", 1).click();
  }

  getCaptchaText() {
    return cy
      .get("#captcha")
      .invoke("text")
      .then((text) => {
        return cy.wrap(text);
      });
  }

  enterCaptchaResult(result) {
    cy.get("#captchaControl").type(result.toString());
  }

  submitFeedback() {
    cy.get("#submitButton").click();
  }
}
