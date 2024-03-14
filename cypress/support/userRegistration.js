import faker from "faker";

export const registerUser = () => {
  const user = {
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
  }).then((response) => {
    expect(response.status).to.eq(201);
  });

  return user;
};
