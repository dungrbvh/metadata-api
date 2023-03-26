"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../models');
const getQueryArgs = require('./utils/getQueryArgs');
const dateReviver = require('./utils/dateReviver');
const { announcementRoles } = require('../../roles');
module.exports.getAnnouncements = async (parent, args, { redisClient, req }) => {
    if (announcementRoles.includes(req.role)) {
        try {
            const queryArgs = getQueryArgs(args);
            const keys = Object.keys(queryArgs);
            const hasKeys = keys.length > 0;
            const cached = await redisClient.get('allAnnouncements');
            if (!hasKeys && cached)
                return JSON.parse(cached, dateReviver);
            if (!hasKeys && !cached) {
                const result = await db.Announcements.find();
                await redisClient.set('allAnnouncements', JSON.stringify(result), {
                    EX: 3600,
                    NX: true
                });
                return result;
            }
            return await db.Announcements.find(queryArgs);
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }
    else {
        return [];
    }
};
module.exports.createAnnouncement = async (parent, args, { redisClient, req }) => {
    if (announcementRoles.includes(req.role)) {
        try {
            const queryArgs = getQueryArgs(args);
            const { body, title, tag } = queryArgs;
            const currentDate = Date.now();
            const newAnnouncement = await db.Announcements.create({
                body,
                tag,
                title,
                created_at: currentDate,
                updated_at: currentDate
            });
            const updatedCache = await db.Announcements.find();
            await redisClient.set('allAnnouncements', JSON.stringify(updatedCache), {
                EX: 3600
            });
            return newAnnouncement;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }
    else {
        return [];
    }
};
module.exports.updateAnnouncement = async (parent, args, { redisClient, req }) => {
    if (announcementRoles.includes(req.role)) {
        try {
            const queryArgs = getQueryArgs(args);
            const currentDate = Date.now();
            if (queryArgs)
                queryArgs.updated_at = currentDate;
            const { _id } = queryArgs;
            await db.Announcements.findByIdAndUpdate({ _id });
            const pulledUpdatedAnnouncement = await db.Announcements.findOne({ _id });
            const updatedCache = await db.Announcements.find();
            await redisClient.set('allAnnouncements', JSON.stringify(updatedCache), {
                EX: 3600
            });
            return pulledUpdatedAnnouncement;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }
    else {
        return [];
    }
};
module.exports.deleteAnnouncement = async (parent, args, { redisClient, req }) => {
    if (announcementRoles.includes(req.role)) {
        try {
            const queryArgs = getQueryArgs(args);
            const { _id } = queryArgs;
            const deletedAnnouncement = await db.Announcements.findByIdAndDelete({ _id });
            const updatedCache = await db.Announcements.find();
            await redisClient.set('allAnnouncements', JSON.stringify(updatedCache), {
                EX: 3600
            });
            return deletedAnnouncement;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }
    else {
        return [];
    }
};
