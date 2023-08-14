import { Request, Response } from "express";

import {
  getAllTransactions,
  getTransactionById,
  createTransaction
} from './transaction.service';

export const getAllTransactionsHandler = async (_: Request, res: Response) => {
  const transactions = await getAllTransactions()

  return res.status(200).json(transactions)
}

export const getTransactionByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.body
  const transaction = await getTransactionById(id)

  return res.status(200).json(transaction)
}

export const createTransactionHandler = async (req: Request, res: Response) => {
  const { data } = req.body
  const newTransaction = await createTransaction(data)

  return res.status(201).json(newTransaction)
}