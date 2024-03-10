export default class ContactPage {
  visit() {
    cy.visit("/#/contact");
  }

  fillFeedbackForm(comment) {
    cy.get("#comment").type(comment);
    cy.get("#rating").invoke("attr", "aria-valuenow", 3).click();
  }

  getCaptchaText() {
    return cy.get("#captcha").invoke("text");
  }

  enterCaptchaResult(result) {
    cy.get("#captchaControl").type(result.toString());
  }

  submitFeedback() {
    cy.get("#submitButton").click();
  }
}
