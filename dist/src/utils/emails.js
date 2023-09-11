"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverPasswordEmail = exports.transactionEmail = exports.welcomeEmail = void 0;
const user_service_1 = require("../api/user/user.service");
const nft_service_1 = require("../api/nft/nft.service");
const welcomeEmail = (user) => {
    const emailData = {
        from: 'No reply <nft.marketplace.mir@gmail.com>',
        to: user.email,
        subject: 'Welcome to Nuron!',
        templateId: 'd-76345ae56436460da1b8f4ba59881365',
        dynamic_template_data: {
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            redirectUrl: `${process.env.FRONTEND_URL}/activate-account/${user.validateToken}`
        }
    };
    return emailData;
};
exports.welcomeEmail = welcomeEmail;
const transactionEmail = (transaction) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.getSingleUser)(transaction === null || transaction === void 0 ? void 0 : transaction.buyerId);
    const nft = yield (0, nft_service_1.getNftById)(transaction === null || transaction === void 0 ? void 0 : transaction.nftId);
    const emailData = {
        from: 'No reply <nft.marketplace.mir@gmail.com>',
        to: user === null || user === void 0 ? void 0 : user.email,
        subject: 'proof of payment!',
        templateId: 'd-9b3a7459ad4b4d13a8bcdb40301c3e85',
        dynamic_template_data: {
            nftName: nft === null || nft === void 0 ? void 0 : nft.name,
            nftAmount: transaction.amount,
            purchaseDate: transaction.createdAt,
            redirectUrl: `${process.env.FRONTEND_URL}/`
        }
    };
    return emailData;
});
exports.transactionEmail = transactionEmail;
const recoverPasswordEmail = (user) => {
    const emailData = {
        from: 'No reply <nft.marketplace.mir@gmail.com>',
        to: user.email,
        subject: 'Recover your password',
        templateId: 'd-c0081a7f59114264aafbb9135174706b',
        dynamic_template_data: {
            firstName: user.firstName,
            redirectUrl: `${process.env.FRONTEND_URL}/recover-password/${user.id}`
        }
    };
    return emailData;
};
exports.recoverPasswordEmail = recoverPasswordEmail;
