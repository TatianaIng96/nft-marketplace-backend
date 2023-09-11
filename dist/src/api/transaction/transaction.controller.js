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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionHandler = exports.getTransactionByIdHandler = exports.getAllTransactionsHandler = void 0;
const nftOwner_service_1 = require("../nftOwner/nftOwner.service");
const emails_1 = require("../../utils/emails");
const sendGrid_1 = require("../../config/sendGrid");
const stripe_1 = __importDefault(require("stripe"));
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = new stripe_1.default(STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
});
const transaction_service_1 = require("./transaction.service");
const getAllTransactionsHandler = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield (0, transaction_service_1.getAllTransactions)();
    return res.status(200).json(transactions);
});
exports.getAllTransactionsHandler = getAllTransactionsHandler;
const getTransactionByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const transaction = yield (0, transaction_service_1.getTransactionById)(id);
    return res.status(200).json(transaction);
});
exports.getTransactionByIdHandler = getTransactionByIdHandler;
const createTransactionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentMethod, amount, nftId, nftOwnerId, buyerId } = req.body;
    try {
        const { id } = paymentMethod;
        const payment = yield stripe.paymentIntents.create({
            payment_method: id,
            amount,
            currency: 'usd',
            confirm: true,
            description: 'Software development services provided',
            return_url: 'http://localhost:3000/payment-success',
        });
        const data = {
            nftId,
            nftOwnerId,
            buyerId,
            amount
        };
        const data_owner = {
            isCurrentOwner: false
        };
        const newOwner = {
            nftId,
            userId: buyerId,
        };
        const newTransaction = yield (0, transaction_service_1.createTransaction)(data);
        const updateOwner = (0, nftOwner_service_1.updateNftOwner)(nftOwnerId, data_owner);
        const newNftOwner = yield (0, nftOwner_service_1.createNftOwner)(newOwner);
        (0, sendGrid_1.sendMailWithSendgrid)(yield (0, emails_1.transactionEmail)(newTransaction));
        res.status(201).json({ message: 'Payment successful', payment });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
exports.createTransactionHandler = createTransactionHandler;
