import { Router } from "express";

import { getAllNftHandler } from "./nft.controller";

const router =  Router()

router.get('/',getAllNftHandler)

export default router