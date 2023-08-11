import { Application } from "express";

import healthcheckRouter from "./api/healthcheck";
import nftRouter from "./api/nft"

const routes = (app: Application) => {
    app.use('/api/healthcheck',healthcheckRouter)
    app.use('/api/nft',nftRouter)
}

export default routes