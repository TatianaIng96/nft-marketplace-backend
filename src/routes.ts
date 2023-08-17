import { Application } from "express";

import healthcheckRouter from "./api/healthcheck";
import nftRouter from "./api/nft";
import usersRouter from "./api/user";
import transactionsRouter from "./api/transaction"
import authLocalRouter from './auth/local'
import auctionsRouter from './api/auction'
import categoriesRouter from './api/category';

const routes = (app: Application) => {
    app.use('/api/healthcheck', healthcheckRouter);
    app.use('/api/nft', nftRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/transactions', transactionsRouter);
    app.use('/api/auctions', auctionsRouter);
    app.use('/api/categories', categoriesRouter);

    app.use('/auth/local', authLocalRouter)
}

export default routes