"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthcheckHandler = void 0;
const healthcheckHandler = (_, res) => {
    res.status(200).json({ message: 'OK', uptime: process.uptime() });
};
exports.healthcheckHandler = healthcheckHandler;
