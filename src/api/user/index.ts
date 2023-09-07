import { Router } from "express";

import {
    getAllUsersHandler,
    getSingleUserHandler,
    getUserByIdHandler,
    createUserHandler,
    recoverPasswordHandler,
    adminCreateUserHandler,
    updateUserHandler,
    updateUserByIdHandler,
    updatePasswordHandler,
    newPasswordHandler,
    deleteUserHandler
} from "./user.controller";

import { isAuthenticated, hasRole } from "../../auth/auth.controller";

const router = Router();

router.get('/', isAuthenticated, getAllUsersHandler);
router.get('/single', isAuthenticated, getSingleUserHandler);
router.get('/:id', isAuthenticated, getUserByIdHandler);
router.post('/', createUserHandler);
router.post('/recover-password', recoverPasswordHandler);
router.post('/create', isAuthenticated, hasRole('ADMIN'), adminCreateUserHandler);
router.put('/single', isAuthenticated, updateUserHandler);
router.put('/change-password', isAuthenticated, updatePasswordHandler);
router.put('/:id', isAuthenticated, hasRole('ADMIN'), updateUserByIdHandler);
router.put('/new-password/:id', newPasswordHandler);
router.delete('/', isAuthenticated, hasRole('USER'), deleteUserHandler);

export default router;