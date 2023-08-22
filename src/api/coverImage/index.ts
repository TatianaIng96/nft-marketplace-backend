import { Router } from "express";

import {
    getCoverImageHandler,
    createCoverImageHandler,
    updateCoverImageHandler
} from './coverImage.controller';

import { isAuthenticated } from '../../auth/auth.controller'

const router = Router();

router.get('/:id', isAuthenticated, getCoverImageHandler);
router.post('/', isAuthenticated, createCoverImageHandler);
router.put('/:id', isAuthenticated, updateCoverImageHandler);

export default router;