"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../mongo/models');
const { SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await db.ApiUsers.findOne({ email });
        if (!user) {
            console.log('Attempted login for non-existent user failed');
            return next({
                status: 400,
                message: 'An error occurred during login. Please try again'
            });
        }
        const isMatch = user.comparePassword(password);
        if (isMatch) {
            const { _id } = user;
            const token = jwt.sign({ _id }, SECRET_KEY);
            return res.status(200).json({ token });
        }
        return next({
            status: 400,
            message: 'An error occurred during login. Please try again'
        });
    }
    catch (err) {
        console.log(err.message);
    }
};
const validate = async (req, res, next) => {
    try {
        if (!req.header.authorization) {
            const err = new Error('Not authorized');
            err.status = 404;
            console.log(`${err.message} - Request was made without authorization header.`);
            return next(err);
        }
        else if (req.header.authorization.split(' ').length > 2) {
            const err = new Error('Tampering detected via header authorization');
            err.status = 401;
            console.log('Request made with manipulated authorization header');
            return next(err);
        }
        else {
            let token = req.header.authorization.split(' ')[1];
            const isVerifiedToken = await jwt.verify(token, SECRET_KEY);
            if (isVerifiedToken) {
                const { _id } = isVerifiedToken;
                const isUser = await db.ApiUsers.findOne({ _id });
                if (isUser && isUser.role) {
                    const { role } = isUser;
                    req.role = role;
                    return next();
                }
                else {
                    const err = new Error('Not Authorized');
                    err.status = 401;
                    return next(err);
                }
            }
            return res.sendStatus(401);
        }
    }
    catch (err) {
        console.log(err.message);
        return next(err);
    }
};
module.exports = {
    login,
    validate
};
