import { Router } from "express";

import {
  getAllTransactionsHandler,
  getTransactionByIdHandler,
  createTransactionHandler
} from './transaction.controller';

const router = Router()

router.get('/', getAllTransactionsHandler)
router.get('/:id', getTransactionByIdHandler)
router.post('/', createTransactionHandler)

export default router