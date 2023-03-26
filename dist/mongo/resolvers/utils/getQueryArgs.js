"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getQueryArgs = (args) => {
    const queryArgs = {};
    const argumentKeys = Object.keys(args);
    if (argumentKeys.length <= 0)
        return {};
    for (let i = 0; i < argumentKeys.length; i++) {
        const keyName = argumentKeys[i];
        if (args[keyName] || args[keyName] === 0 || args[keyName] === '') {
            queryArgs[keyName] = args[keyName];
        }
        else {
            queryArgs[keyName] = null;
        }
    }
    return queryArgs;
};
module.exports = getQueryArgs;
