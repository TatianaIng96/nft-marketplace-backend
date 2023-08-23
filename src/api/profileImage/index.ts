import { Router } from "express";

import {
  getProfileImageHandler,
  createProfileImageHandler,
  updateProfileimageHandler,
} from "./profileImage.controller";
import { isAuthenticated } from "../../auth/auth.controller";
import { formData } from "../../middlewares/formData";

const router = Router();

router.get('/:id', isAuthenticated, getProfileImageHandler);
router.post('/', isAuthenticated, formData, createProfileImageHandler);
router.put('/:id', isAuthenticated, updateProfileimageHandler);

export default router;
