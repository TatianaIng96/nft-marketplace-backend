import { Router } from "express";

import {
  getProfileImageHandler,
  createProfileImageHandler,
  updateProfileimageHandler,
  deleteProfileImageHandler
} from "./profileImage.controller";

import { isAuthenticated } from "../../auth/auth.controller";
import { formData } from "../../middlewares/formData";

const router = Router();

router.get('/:id', isAuthenticated, getProfileImageHandler);
router.post('/', isAuthenticated, formData, createProfileImageHandler);
router.put('/', isAuthenticated, formData, updateProfileimageHandler);
router.delete('/', isAuthenticated, deleteProfileImageHandler);

export default router;
