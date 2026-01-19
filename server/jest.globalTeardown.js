// Global teardown for Jest tests
module.exports = async () => {
  // Stop the in-memory MongoDB instance
  if (global.__MONGOD__) {
    await global.__MONGOD__.stop();
    console.log('Test database stopped');
  }
};
