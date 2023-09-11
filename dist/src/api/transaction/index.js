"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("./transaction.controller");
const router = (0, express_1.Router)();
router.get('/', transaction_controller_1.getAllTransactionsHandler);
router.get('/:id', transaction_controller_1.getTransactionByIdHandler);
router.post('/', transaction_controller_1.createTransactionHandler);
exports.default = router;
