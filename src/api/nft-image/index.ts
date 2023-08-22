import { Router } from "express";

import { 
  getAllImageHandler,
  getSingleImageHandler,
  getCreateImageHandler, 
  getDeleteImageHandler
} from "./nft-mage.controller";
import { isAuthenticated } from "../../auth/auth.controller";
import { hasRole } from "../../auth/auth.controller";
const router =  Router()

router.get('/',getAllImageHandler)
router.get('/:id',  getSingleImageHandler)
router.post('/', isAuthenticated, hasRole('USER'), getCreateImageHandler)
router.delete('/:id', isAuthenticated, hasRole('USER'),getDeleteImageHandler)
export default router
