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
exports.deleteProfileImageHandler = exports.updateProfileimageHandler = exports.createProfileImageHandler = exports.getProfileImageHandler = void 0;
const profileImage_service_1 = require("./profileImage.service");
const getProfileImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const profileImage = yield (0, profileImage_service_1.getProfileImage)(id);
        res.status(200).json(profileImage);
    }
    catch (error) {
        res.status(400).json({ error: "Image coudn't be obtained" });
    }
    ;
});
exports.getProfileImageHandler = getProfileImageHandler;
const createProfileImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    const { id } = req.user;
    try {
        const createImage = yield (0, profileImage_service_1.createProfileImage)(url, id);
        res.status(201).json(createImage);
    }
    catch (error) {
        res.status(401).json({ error: "Image coudn't be created" });
    }
    ;
});
exports.createProfileImageHandler = createProfileImageHandler;
const updateProfileimageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    const { id: userId } = req.user;
    try {
        const currentProfileImage = yield (0, profileImage_service_1.getProfileImageByUserId)(userId);
        if (!currentProfileImage) {
            return res.status(404).json({ message: 'Profile image not found' });
        }
        const { id } = currentProfileImage;
        yield (0, profileImage_service_1.updateProfileimage)(id, url);
        res.status(201).json({ message: 'Profile image updated successfully' });
    }
    catch (error) {
        res.status(400).json({ error: "Image couldn't be updated" });
    }
    ;
});
exports.updateProfileimageHandler = updateProfileimageHandler;
const deleteProfileImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = req.user;
    const currentProfileImage = yield (0, profileImage_service_1.getProfileImageByUserId)(userId);
    if (!currentProfileImage) {
        return res.status(404).json({ message: 'Profile image not found' });
    }
    const { id } = currentProfileImage;
    yield (0, profileImage_service_1.deleteProfileImage)(id);
    res.status(201).json({ message: 'Cover image deleted' });
});
exports.deleteProfileImageHandler = deleteProfileImageHandler;
