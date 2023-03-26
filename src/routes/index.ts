export {};
const healthRouter = require('./health');
const authRouter = require('./auth');
const metadataRouter = require('./metadata');

module.exports = {
  healthRouter,
  authRouter,
  metadataRouter
};
