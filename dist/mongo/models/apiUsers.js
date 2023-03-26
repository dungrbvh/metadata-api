"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema, model } = mongoose;
const apiUserSchema = new Schema({
    email: String,
    password: String,
    role: String
});
// Save hashed password to Mongo
apiUserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password'))
            return next();
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        return hashedPassword;
    }
    catch (err) {
        console.log(err);
        return next(err);
    }
});
// Pass validation 
apiUserSchema.methods.comparePassword = async function (candidatePassword, next) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};
module.exports = new model('ApiUser', apiUserSchema);
