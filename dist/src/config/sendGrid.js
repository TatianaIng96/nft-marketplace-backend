"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailWithSendgrid = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const sendMailWithSendgrid = (data) => {
    const apiKey = process.env.SENDGRID_API_KEY;
    mail_1.default.setApiKey(apiKey);
    return mail_1.default.send(data);
};
exports.sendMailWithSendgrid = sendMailWithSendgrid;
