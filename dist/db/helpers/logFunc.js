"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logs = void 0;
const logs = (req, res) => {
    console.log(`Request: ${req.method}, ${req.originalUrl}`);
};
exports.logs = logs;
