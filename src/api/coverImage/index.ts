import { Router } from "express";

import {
    getCoverImageHandler,
    createCoverImageHandler,
    updateCoverImageHandler
} from './coverImage.controller';

import { isAuthenticated } from '../../auth/auth.controller'
import { formData } from '../../middlewares/formData';

const router = Router();

router.get('/:id', isAuthenticated, getCoverImageHandler);
router.post('/', isAuthenticated, formData, createCoverImageHandler);
router.put('/:id', isAuthenticated, updateCoverImageHandler);

export default router;