import { PrismaClient } from "@prisma/client";

import { Transaction } from "@prisma/client";

const prisma = new PrismaClient()

export const getAllTransactions = async () => {
  const transactions = await prisma.transaction.findMany()
  return transactions
}

export const getTransactionById = async (id: string) => {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
    }
  })
  return transaction
}

export const createTransaction = async (input: Transaction) => {
  const newtransaction = await prisma.transaction.create({
    data: { ...input }
  })
  return newtransaction
}