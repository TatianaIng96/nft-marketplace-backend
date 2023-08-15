import { Router } from "express";

import {
    getAllUsersHandler,
    getUserByIdHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler
} from "./user.controller";

import { isAuthenticated, hasRole } from "../../auth/auth.controller";

const router = Router();

router.get('/', getAllUsersHandler);
router.get('/:id', getUserByIdHandler);
router.post('/', createUserHandler);
router.put('/:id', updateUserHandler);
router.delete('/', isAuthenticated, hasRole('ADMIN'), deleteUserHandler);

export default router;