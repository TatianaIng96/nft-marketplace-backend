import { Transaction } from './transaction.types';
import{NftOwner} from '../nftOwner/nftOwner.types'
import { NftOwnerRelation  } from '../nftOwner/nftOwner.types';
import { Request, Response } from "express";
import { updateNftOwner, createNftOwner } from '../nftOwner/nftOwner.service';
import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
})

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
  const { paymentMethod, amount, nftId, nftOwnerId, buyerId} = req.body
  
  try {
    const { id } = paymentMethod
    const payment = await stripe.paymentIntents.create({
      payment_method: id,
      amount,
      currency: 'usd',
      confirm: true,
      description: 'Software development services provided',
      return_url: 'http://localhost:3000/payment-success',
    })
    const data = {
      nftId,
      nftOwnerId,
      buyerId,
      amount
    } as Transaction

    const data_owner = {
      isCurrentOwner: false
    } as NftOwner

    const newOwner = {
      nftId,
      userId: buyerId,
    } as NftOwnerRelation 
    const newTransaction = await createTransaction(data)
    const updateOwner = updateNftOwner(nftOwnerId, data_owner);
    const newNftOwner = await createNftOwner(newOwner);
     res.status(201).json({ message: 'Payment successful', payment })
  } catch (error: any) {
    console.log(error);
    
    res.status(500).json({ message: error.message})
  }
}