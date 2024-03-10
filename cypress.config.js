module.exports = {
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 1,
  e2e: {
    baseUrl: "https://juice-shop-sanitarskyi.herokuapp.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
