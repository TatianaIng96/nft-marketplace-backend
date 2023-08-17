import { Router } from 'express';

import {
    getAllCategoriesHandler,
    getSingleCategoryHandler,
    createCategoryHandler,
    updateCategoryHandler,
    deleteCategoryHandler
} from './category.controller';

import { isAuthenticated, hasRole } from '../../auth/auth.controller';

const router = Router();

router.get('/', isAuthenticated, getAllCategoriesHandler);
router.get('/:id', getSingleCategoryHandler);
router.post('/', isAuthenticated, hasRole('ADMIN'), createCategoryHandler);
router.put('/:id', isAuthenticated, hasRole('ADMIN'), updateCategoryHandler);
router.delete('/:id', isAuthenticated, hasRole('ADMIN'), deleteCategoryHandler);

export default router;