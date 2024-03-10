import faker from "faker";

export const TestData = {
  validEmail: faker.internet.email(),
  validPassword: faker.internet.password(),
  confirmPassword: faker.internet.password(),
  weakPassword: "1",
  securityAnswer: faker.random.alphaNumeric(3),
  invalidEmail: "invalidemail",
};
