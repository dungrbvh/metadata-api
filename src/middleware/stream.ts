export {};
const fs = require('fs');
const path = require('path');

const accessLogStream = fs.createWriteStream(
    path.join(__dirname + 'access.log'),
    { flag: 'a'}
);

module.exports = accessLogStream;

