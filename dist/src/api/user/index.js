"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_controller_1 = require("../../auth/auth.controller");
const router = (0, express_1.Router)();
router.get('/', auth_controller_1.isAuthenticated, user_controller_1.getAllUsersHandler);
router.get('/single', auth_controller_1.isAuthenticated, user_controller_1.getSingleUserHandler);
router.get('/:id', auth_controller_1.isAuthenticated, user_controller_1.getUserByIdHandler);
router.post('/', user_controller_1.createUserHandler);
router.post('/recover-password', user_controller_1.recoverPasswordHandler);
router.post('/create', auth_controller_1.isAuthenticated, (0, auth_controller_1.hasRole)('ADMIN'), user_controller_1.adminCreateUserHandler);
router.put('/single', auth_controller_1.isAuthenticated, user_controller_1.updateUserHandler);
router.put('/change-password', auth_controller_1.isAuthenticated, user_controller_1.updatePasswordHandler);
router.put('/:id', auth_controller_1.isAuthenticated, (0, auth_controller_1.hasRole)('ADMIN'), user_controller_1.updateUserByIdHandler);
router.put('/new-password/:id', user_controller_1.newPasswordHandler);
router.delete('/', auth_controller_1.isAuthenticated, (0, auth_controller_1.hasRole)('USER'), user_controller_1.deleteUserHandler);
router.delete('/:id', auth_controller_1.isAuthenticated, (0, auth_controller_1.hasRole)('ADMIN'), user_controller_1.deleteUserByAdminHandler);
exports.default = router;