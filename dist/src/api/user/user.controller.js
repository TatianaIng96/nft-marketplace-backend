"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByAdminHandler = exports.deleteUserHandler = exports.newPasswordHandler = exports.recoverPasswordHandler = exports.updatePasswordHandler = exports.updateUserByIdHandler = exports.updateUserHandler = exports.adminCreateUserHandler = exports.createUserHandler = exports.getUserByIdHandler = exports.getSingleUserHandler = exports.getAllUsersHandler = void 0;
const bcrypt_1 = require("../../auth/utils/bcrypt");
const user_service_1 = require("./user.service");
const auth_service_1 = require("../../auth/auth.service");
const sendGrid_1 = require("../../config/sendGrid");
const emails_1 = require("../../utils/emails");
const getAllUsersHandler = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_service_1.getAllUsers)();
    return res.status(200).json(users);
});
exports.getAllUsersHandler = getAllUsersHandler;
const getSingleUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const user = yield (0, user_service_1.getSingleUser)(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
});
exports.getSingleUserHandler = getSingleUserHandler;
const getUserByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield (0, user_service_1.getSingleUser)(id);
    return res.status(200).json(user);
});
exports.getUserByIdHandler = getUserByIdHandler;
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const hashedPassword = yield (0, bcrypt_1.hashPassword)(body.password);
    const data = Object.assign(Object.assign({}, body), { password: hashedPassword, validateToken: (0, bcrypt_1.createValidationToken)(body.email), tokenExpires: new Date(Date.now() + 1000 * 60 * 60 * 24) });
    const user = yield (0, user_service_1.createUser)(data);
    const payload = {
        id: user.id,
        email: user.email,
    };
    const token = (0, auth_service_1.signToken)(payload);
    const profile = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
    };
    (0, sendGrid_1.sendMailWithSendgrid)((0, emails_1.welcomeEmail)(user));
    return res.status(201).json({ message: 'User created successfully!', token, profile });
});
exports.createUserHandler = createUserHandler;
const adminCreateUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const hashedPassword = yield (0, bcrypt_1.hashPassword)(body.password);
    const data = Object.assign(Object.assign({}, body), { password: hashedPassword });
    const user = yield (0, user_service_1.createUser)(data);
    return res.status(201).json(user);
});
exports.adminCreateUserHandler = adminCreateUserHandler;
const updateUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.user;
    const updatedUser = yield (0, user_service_1.updateUser)(id, body);
    return res.status(201).json({ message: 'User updated successfully!', updatedUser });
});
exports.updateUserHandler = updateUserHandler;
const updateUserByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const updatedUser = yield (0, user_service_1.updateUser)(id, body);
    return res.status(201).json({ message: 'User updated successfully!', updatedUser });
});
exports.updateUserByIdHandler = updateUserByIdHandler;
const updatePasswordHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const body = req.body;
    const loggedUser = yield (0, user_service_1.getSingleUser)(id);
    if (!loggedUser) {
        return "Not find user";
    }
    const match = yield (0, bcrypt_1.comparePassword)(body.oldPassword, loggedUser.password);
    if (!match) {
        return "Old password do not match, incorrect password";
    }
    const hashedPassword = yield (0, bcrypt_1.hashPassword)(body.newPassword);
    const updateUserPassword = yield (0, user_service_1.updatePassword)(id, hashedPassword);
    res.status(201).json({ message: 'Password succesfully updated', updateUserPassword });
});
exports.updatePasswordHandler = updatePasswordHandler;
const recoverPasswordHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield (0, user_service_1.getUserByEmail)(email);
        if (!user) {
            return res.status(404).json({ message: 'The email is not registered in our database' });
        }
        (0, sendGrid_1.sendMailWithSendgrid)((0, emails_1.recoverPasswordEmail)(user));
        res.status(201).json({ message: 'Successful' });
    }
    catch (error) { }
});
exports.recoverPasswordHandler = recoverPasswordHandler;
const newPasswordHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { password } = req.body;
    const hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
    const user = yield (0, user_service_1.getSingleUser)(id);
    if (!user) {
        return res.status(401).json({ message: 'User ID does not match any user in the database' });
    }
    const userToUpdate = yield (0, user_service_1.getUserByEmail)(user.email);
    if (!userToUpdate) {
        return res.status(401).json({ message: 'User ID does not match any user in the database' });
    }
    const data = Object.assign(Object.assign({}, userToUpdate), { password: hashedPassword });
    const updatedUser = yield (0, user_service_1.updateUser)(id, data);
    res.status(201).json({ message: 'Password succesfully updated', updatedUser });
});
exports.newPasswordHandler = newPasswordHandler;
const deleteUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const deletedUser = yield (0, user_service_1.deleteUser)(id);
    return res.status(201).json({ message: 'User deleted successfully!', deletedUser });
});
exports.deleteUserHandler = deleteUserHandler;
const deleteUserByAdminHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = req.params;
    const userToInactivate = yield (0, user_service_1.getWholeUser)(userId);
    if (!userToInactivate) {
        return res.status(500).json({ message: 'User not found in our database' });
    }
    const data = Object.assign(Object.assign({}, userToInactivate), { isActive: false });
    yield (0, user_service_1.updateUser)(userId, data);
    return res.status(201).json({ message: 'User has been inactivated in the database' });
});
exports.deleteUserByAdminHandler = deleteUserByAdminHandler;
