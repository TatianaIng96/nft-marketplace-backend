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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidationToken = exports.comparePassword = exports.hashPasswordSync = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const factor = 12;
    const salt = yield bcrypt_1.default.genSalt(factor);
    return yield bcrypt_1.default.hash(password, salt);
});
exports.hashPassword = hashPassword;
const hashPasswordSync = (password) => {
    const factor = 12;
    const salt = bcrypt_1.default.genSaltSync(factor);
    return bcrypt_1.default.hashSync(password, salt);
};
exports.hashPasswordSync = hashPasswordSync;
const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('TYPED PASSWORD:', password);
    console.log('SAVED PASSWORD:', hashedPassword);
    return yield bcrypt_1.default.compare(password, hashedPassword);
});
exports.comparePassword = comparePassword;
const createValidationToken = (data) => {
    return crypto_1.default.createHash('sha256').update(data).digest('hex');
};
exports.createValidationToken = createValidationToken;
