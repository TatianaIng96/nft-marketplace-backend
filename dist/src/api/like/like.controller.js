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
exports.getDeleteLikeHandler = exports.getCreateLikeHandler = exports.getAllLikeHandler = void 0;
const like_service_1 = require("./like.service");
const getAllLikeHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nftId } = req.params;
    const like = yield (0, like_service_1.getByLike)(nftId);
    return res.status(200).json(like);
});
exports.getAllLikeHandler = getAllLikeHandler;
const getCreateLikeHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nftId } = req.params;
    const { id } = req.user;
    const data = { nftId, userId: id };
    try {
        const like = yield (0, like_service_1.createLike)(data);
        res.json(like);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo dar like al nft.' });
    }
});
exports.getCreateLikeHandler = getCreateLikeHandler;
const getDeleteLikeHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nftId } = req.params;
    const { id } = req.user;
    const data = { nftId, userId: id };
    try {
        const like = yield (0, like_service_1.deleteLike)(data);
        if (like.count === 0) {
            return res.status(404).json({ message: 'No se encontró el like para eliminar.' });
        }
        res.json({ message: 'Like eliminado exitosamente.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo eliminar el like del nft.' });
    }
});
exports.getDeleteLikeHandler = getDeleteLikeHandler;
