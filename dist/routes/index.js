"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const healthRouter = require('./health');
const authRouter = require('./auth');
const metadataRouter = require('./metadata');
module.exports = {
    healthRouter,
    authRouter,
    metadataRouter
};
