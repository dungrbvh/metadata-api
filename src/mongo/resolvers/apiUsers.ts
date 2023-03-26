import { isNamedExportBindings } from "typescript";

export {};

const db = require('../models');
const { apiUserRoles } = require('../../roles');
const getQueryArgs = require('./utils/getQueryArgs');
const dateReviver = require('./utils/dateReviver');

module.exports.getApiUsers = async (parent, args, {redisClient, req}) => {
    if (apiUserRoles.includes(req.role)) {
        try {
            const queryArgs = getQueryArgs(args);
            const keys = Object.keys(queryArgs);
            const hasKeys = keys.length > 0;
            if (!hasKeys){
                const result = await db.ApiUsers.find();
                return result;
            }
            return await db.ApiUsers.find(queryArgs);
        } catch (err){
            console.log(err);
            return [];
        }
    } else {
        return []
    }
}

module.exports.createApiUsers = async (parent, args, {redisClient, req}) => {
    if (apiUserRoles.includes(req.role)){
        try {
            const queryArgs = getQueryArgs(args);
            const foundUser = await db.ApiUsers.findone({ email: queryArgs.email});
            if (foundUser) return new Error('User already exists');
            const newApiUser = await db.ApiUsers.create(queryArgs);
            return newApiUser;
        } catch (err){
            console.log(err);
            return [];
        }
    }
    else {
        return [];
    }
}

module.exports.updateApiUser = async (parent, args, {redisClient, req}) => {
    if (apiUserRoles.includes(req.role)){
        try {
            const queryArgs = getQueryArgs(args);
            if (queryArgs._id){
                const { _id } = queryArgs;
                await db.ApiUsers.findByIdAndUpdate({ _id }, queryArgs);
                const pulledUpdatedApiUser = await db.ApiUsers.findone({_id});
                return pulledUpdatedApiUser
            }
            else {
                return [];
            }
        } catch (err){
            console.log(err);
            return [];
        }
    }
    else {
        return []
    }
}

module.exports.deleteApiUsers = async (parent, args, {redisClient, req}) => {
    if (apiUserRoles.includes(req.role)){
        try {
            const queryArgs = getQueryArgs(args);
            if (queryArgs._id){
                const { _id } = queryArgs;
                const deletedApiUser = await db.ApiUsers.findByIdAndDelete({_id});
                return deletedApiUser;
            } 
            else {
                return []
            }
        } catch (err){
            console.log(err)
            return [];
        }
    } 
    else {
        return [];
    }
}