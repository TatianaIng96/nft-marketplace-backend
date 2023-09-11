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
exports.updateNftOwnerHandler = exports.createNftOwnerHandler = exports.getNftOwnerByIdHandler = exports.getAllNftOwnersHandler = void 0;
const nftOwner_service_1 = require("./nftOwner.service");
const getAllNftOwnersHandler = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nftOwners = yield (0, nftOwner_service_1.getAllNftOwners)();
    return res.status(200).json(nftOwners);
});
exports.getAllNftOwnersHandler = getAllNftOwnersHandler;
const getNftOwnerByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const nftOwner = yield (0, nftOwner_service_1.getNftOwnerById)(id);
    return res.status(200).json(nftOwner);
});
exports.getNftOwnerByIdHandler = getNftOwnerByIdHandler;
const createNftOwnerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const newNftOwner = yield (0, nftOwner_service_1.createNftOwner)(data);
    return res.status(201).json(newNftOwner);
});
exports.createNftOwnerHandler = createNftOwnerHandler;
const updateNftOwnerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.params;
    const updateOwner = (0, nftOwner_service_1.updateNftOwner)(id, data);
    return res.status(201).json(updateOwner);
});
exports.updateNftOwnerHandler = updateNftOwnerHandler;
