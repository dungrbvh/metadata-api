"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const announcementSchema = new Schema({
    body: Array,
    created_at: Date,
    tag: String,
    title: String,
    updated_at: Date
});
module.exports = new model('announcement', announcementSchema);
