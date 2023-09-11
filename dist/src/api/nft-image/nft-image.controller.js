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
exports.getDeleteImageHandler = exports.createImageHandler = exports.getSingleImageHandler = exports.getAllImageHandler = void 0;
const nft_image_service_1 = require("./nft-image.service");
const getAllImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nftImage = yield (0, nft_image_service_1.getAllNftImage)();
    return res.status(200).json(nftImage);
});
exports.getAllImageHandler = getAllImageHandler;
const getSingleImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const nftImage = yield (0, nft_image_service_1.getSingleNftImage)(id);
        return res.status(200).json(nftImage);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo obtener la imagen al nft.' });
    }
});
exports.getSingleImageHandler = getSingleImageHandler;
const createImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const nftImage = yield (0, nft_image_service_1.createNftImage)(data);
        res.status(200).json(nftImage);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo guardar la imagen al nft.' });
    }
});
exports.createImageHandler = createImageHandler;
const getDeleteImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const nftImage = yield (0, nft_image_service_1.deleteNftImage)(id);
        res.status(200).json({ message: 'Imagen eliminada exitosamente.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo eliminar la imagen del nft.' });
    }
});
exports.getDeleteImageHandler = getDeleteImageHandler;
