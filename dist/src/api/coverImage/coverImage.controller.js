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
exports.deleteCoverImageHandler = exports.updateCoverImageHandler = exports.createCoverImageHandler = exports.getCoverImageHandler = void 0;
const coverImage_service_1 = require("./coverImage.service");
const getCoverImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const coverImage = yield (0, coverImage_service_1.getCoverImage)(id);
    res.status(200).json(coverImage);
});
exports.getCoverImageHandler = getCoverImageHandler;
const createCoverImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    const { id } = req.user;
    const coverImage = yield (0, coverImage_service_1.createCoverImage)(url, id);
    res.status(201).json(coverImage);
});
exports.createCoverImageHandler = createCoverImageHandler;
const updateCoverImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    const { id: userId } = req.user;
    const currentCoverImage = yield (0, coverImage_service_1.getCoverImageByUserId)(userId);
    if (!currentCoverImage) {
        return res.status(404).json({ message: 'Cover image not found' });
    }
    const { id } = currentCoverImage;
    yield (0, coverImage_service_1.updateCoverImage)(url, id);
    res.status(201).json({ message: 'Cover image updated successfully' });
});
exports.updateCoverImageHandler = updateCoverImageHandler;
const deleteCoverImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = req.user;
    const currentCoverImage = yield (0, coverImage_service_1.getCoverImageByUserId)(userId);
    if (!currentCoverImage) {
        return res.status(404).json({ message: 'Cover image not found' });
    }
    const { id } = currentCoverImage;
    yield (0, coverImage_service_1.deleteCoverImage)(id);
    res.status(201).json({ message: 'Cover image deleted' });
});
exports.deleteCoverImageHandler = deleteCoverImageHandler;
