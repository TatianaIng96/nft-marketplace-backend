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
exports.deleteCollectionHandler = exports.createCollectionHandler = exports.updateCollectionHandler = exports.getCollectionByIdHandler = exports.getAllCollectionsHandler = void 0;
const collection_service_1 = require("./collection.service");
const getAllCollectionsHandler = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collections = yield (0, collection_service_1.getAllCollections)();
        res.status(200).json({ message: "Collections successfully found", collections });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.getAllCollectionsHandler = getAllCollectionsHandler;
const getCollectionByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const singleCollection = yield (0, collection_service_1.getCollectionById)(parseInt(id));
        res.status(200).json({ message: "Collection successfully found", singleCollection });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.getCollectionByIdHandler = getCollectionByIdHandler;
const updateCollectionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const updateSingleCollection = yield (0, collection_service_1.updateCollection)(parseInt(id), body);
        res.status(202).json({ message: "Collection succesfully updated", updateSingleCollection });
    }
    catch (error) {
        res.status(403).json({ message: error });
    }
});
exports.updateCollectionHandler = updateCollectionHandler;
const createCollectionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const newCollection = yield (0, collection_service_1.createCollection)(body);
        res.status(201).json({ message: "Collection succesfully created", newCollection });
    }
    catch (error) {
        res.status(403).json({ message: error });
    }
});
exports.createCollectionHandler = createCollectionHandler;
const deleteCollectionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteSingleCollection = yield (0, collection_service_1.deleteCollection)(parseInt(id));
        res.status(202).json({ message: "Collection succesfully deleted", deleteSingleCollection });
    }
    catch (error) {
        res.status(403).json({ message: error });
    }
});
exports.deleteCollectionHandler = deleteCollectionHandler;
