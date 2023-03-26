"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateReviver = (key, value) => {
    let a;
    if (typeof value === 'string' && Date.parse(value)) {
        a = Date.parse(value);
        if (a)
            return new Date(a);
    }
    return value;
};
module.exports = dateReviver;
