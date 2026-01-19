// Global setup for Jest tests
const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async () => {
  // Start in-memory MongoDB instance for testing
  const mongod = new MongoMemoryServer();
  await mongod.start();

  const uri = mongod.getUri();
  process.env.MONGODB_TEST_URI = uri;

  // Store the instance for cleanup
  global.__MONGOD__ = mongod;

  console.log('Test database started:', uri);
};
