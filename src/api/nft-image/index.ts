import { Router } from "express";

import {
  getAllImageHandler,
  getSingleImageHandler,
  createImageHandler,
  getDeleteImageHandler
} from "./nft-image.controller";
import { isAuthenticated } from "../../auth/auth.controller";
import { hasRole } from "../../auth/auth.controller";
import { formData } from "../../middlewares/formData";

const router = Router();

router.get('/', getAllImageHandler);
router.get('/:id', getSingleImageHandler);
router.post('/', isAuthenticated, hasRole('USER'), formData, createImageHandler);
router.delete('/:id', isAuthenticated, hasRole('USER'), getDeleteImageHandler);
export default router;
