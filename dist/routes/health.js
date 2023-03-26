"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
// For container healthcheck
router.get('/healthcheck', (req, res) => res.sendStatus(200));
router.get('conncheck', (req, res) => res.sendStatus(200));
module.exports = router;
