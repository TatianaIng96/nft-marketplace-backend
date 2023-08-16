import { Router } from "express";

import { 
  getAllLikeHandler,
  getCreateLikeHandler,
  getDeleteLikeHandler
} from "./like.controller";
import { isAuthenticated } from "../../auth/auth.controller";
const router =  Router()

router.get('/:nftId', getAllLikeHandler)
router.post('/:nftId', isAuthenticated, getCreateLikeHandler)
router.delete('/:nftId', isAuthenticated, getDeleteLikeHandler)
export default router
