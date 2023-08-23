import { Router } from "express";

import {
  createProfileImageHandler,
  updateProfileimageHandler,
  deleteProfileImageHandler
} from "./profileImage.controller";
import { isAuthenticated } from "../../auth/auth.controller";
import { formData } from "../../middlewares/formData";

const router = Router();

router.post('/', isAuthenticated, formData, createProfileImageHandler);

router.put('/:id', isAuthenticated, formData, updateProfileimageHandler);
router.delete('/:id', isAuthenticated, deleteProfileImageHandler);

export default router;
