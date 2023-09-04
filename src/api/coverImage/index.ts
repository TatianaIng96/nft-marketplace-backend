import { Router } from "express";

import {
    getCoverImageHandler,
    createCoverImageHandler,
    updateCoverImageHandler,
    deleteCoverImageHandler
} from './coverImage.controller';

import { isAuthenticated } from '../../auth/auth.controller'
import { formData } from '../../middlewares/formData';

const router = Router();

router.get('/:id', isAuthenticated, getCoverImageHandler);
router.post('/', isAuthenticated, formData, createCoverImageHandler);
router.put('/', isAuthenticated, formData, updateCoverImageHandler);
router.delete('/', isAuthenticated, deleteCoverImageHandler);

export default router;