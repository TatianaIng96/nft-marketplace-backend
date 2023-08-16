import { Router } from "express";

import { getAllLikeHandler } from "./like.controller";
const router =  Router()

router.get('/', getAllLikeHandler)
router.post('/like/:nftId')

export default router
