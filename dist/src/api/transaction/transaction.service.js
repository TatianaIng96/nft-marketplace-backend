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
exports.createTransaction = exports.getTransactionById = exports.getAllTransactions = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield prisma.transaction.findMany();
    return transactions;
});
exports.getAllTransactions = getAllTransactions;
const getTransactionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield prisma.transaction.findUnique({
        where: {
            id,
        }
    });
    return transaction;
});
exports.getTransactionById = getTransactionById;
const createTransaction = (input) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(input);
    const newtransaction = yield prisma.transaction.create({
        data: Object.assign({}, input)
    });
    return newtransaction;
});
exports.createTransaction = createTransaction;
