const port = {
  SERVER_PORT: process.env.Port || 5000
};

const mongodb = {
  Mongo_DB_URL: process.env.MONGO_DB_CONNECTION_URL || 'mongodb://localhost:27017'
};

module.exports = { port, mongodb };
