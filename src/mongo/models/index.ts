export {};

const mongoose = require('mongoose');
const { MONGODB_USER, MONGODB_PASS, MONGODB_CONNECTION_URI, MONGODB_DATABASE } =
  process.env;

const DB_CONNECTION =  `mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_CONNECTION_URI}/${MONGODB_DATABASE}`;

mongoose.Promise = Promise;

const dbConnectionConfigs = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true
  };

mongoose.connect(DB_CONNECTION, dbConnectionConfigs);

module.exports.ApiUsers = require('./apiUsers');
module.exports.Announcements = require('./announcement');