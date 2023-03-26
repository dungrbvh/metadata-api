export {};
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const routeError = require('../middleware/routeError');
const notFound = require('../middleware/notFound');
const { login } = require('../middleware/auth')

router.post(
    '/login', 
    [
        body('email').notEmpty().trim().isEmail().normalizeEmail().escape(),
        body('password').notEmpty().trim().escape()
    ],
    routeError,
    login
)

module.exports = router;