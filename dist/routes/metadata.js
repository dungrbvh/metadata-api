"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const redis = require('redis');
const ping = require('ping');
const { graphqlHTTP } = require('express-graphql');
const routeError = require('../middleware/routeError');
const schema = require('../schema');
const REDIS_URI = process.env.REDIS_URI || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const url = `redis://${REDIS_URI}:${REDIS_PORT}`;
const router = express.Router();
// Set cache route if redis 
const setCacheRoute = () => {
    const redisConnection = { url };
    const redisClient = redis.createClient(redisConnection);
    router.use('/metadata', routeError, graphqlHTTP(async (req) => {
        return {
            schema,
            graphiql: true,
            pretty: true,
            context: { redisClient, req }
        };
    }));
    redisClient.connect();
};
// otherwise, none
const setNonCacheRoute = () => {
    const redisClient = {};
    router.use('/metadata', routeError, graphqlHTTP(async (req) => {
        return {
            schema,
            graphiql: true,
            pretty: true,
            context: { redisClient, req }
        };
    }));
};
const checkCacheHost = async (cb1, cb2) => {
    const response = await ping.promise.probe('redis');
    if (response.alive) {
        cb1();
    }
    else {
        cb2();
    }
};
checkCacheHost(setCacheRoute, setNonCacheRoute);
// Make sure connection is alive
const pollCacheHost = () => {
    const timer = setInterval(async () => {
        const response = await ping.promise.probe('redis');
        checkCacheHost(setCacheRoute, setNonCacheRoute);
    }, 10000);
};
pollCacheHost();
module.exports = router;
