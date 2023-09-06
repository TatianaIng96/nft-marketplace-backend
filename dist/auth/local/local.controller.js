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
exports.activateAccountHandler = exports.loginHandler = void 0;
const user_service_1 = require("../../api/user/user.service");
const bcrypt_1 = require("../utils/bcrypt");
const auth_service_1 = require("../auth.service");
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield (0, user_service_1.getUserByEmail)(email);
        if (!user) {
            return res.status(401).json('Invalid email');
        }
        const match = yield (0, bcrypt_1.comparePassword)(password, user.password);
        if (!match) {
            return res.status(401).json('Invalid password');
        }
        const payload = {
            id: user.id,
            email: user.email,
        };
        const token = (0, auth_service_1.signToken)(payload);
        const profile = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        };
        return res.status(201).json({ token, profile });
    }
    catch (error) {
        return res.status(401).send('There has been an error accessing information. Try again later!');
    }
});
exports.loginHandler = loginHandler;
const activateAccountHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    try {
        const user = yield (0, user_service_1.getUserByValidateToken)(token);
        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }
        if (user.tokenExpires) {
            if (Date.now() > user.tokenExpires.getTime()) {
                return res.status(401).json({ message: 'Token expired' });
            }
        }
        const data = Object.assign(Object.assign({}, user), { tokenExpires: null, validateToken: null, isActive: true });
        yield (0, user_service_1.updateUser)(user.id, data);
        const payload = {
            id: user.id,
            email: user.email,
        };
        const tokenToSend = (0, auth_service_1.signToken)(payload);
        const profile = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        };
        return res.status(201).json({ token: tokenToSend, profile });
    }
    catch (error) {
    }
});
exports.activateAccountHandler = activateAccountHandler;
