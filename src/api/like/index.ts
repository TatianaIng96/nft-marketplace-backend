import { Router } from "express";

import { 
  getAllLikeHandler,
  getCreateLikeHandler,
  getDeleteLikeHandler
} from "./like.controller";
import { isAuthenticated } from "../../auth/auth.controller";
import { hasRole } from "../../auth/auth.controller";
const router =  Router()

router.get('/:nftId', getAllLikeHandler)
router.post('/:nftId', isAuthenticated, hasRole('USER'), getCreateLikeHandler)
router.delete('/:nftId', isAuthenticated, hasRole('USER'),getDeleteLikeHandler)
export default router
