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
exports.deleteNftHandler = exports.updateNftHandler = exports.createNftHandler = exports.getNftHandler = exports.getAllNftHandler = void 0;
const nft_service_1 = require("./nft.service");
const nftOwner_service_1 = require("../nftOwner/nftOwner.service");
const category_service_1 = require("../category/category.service");
const collection_service_1 = require("../collection/collection.service");
const nft_image_service_1 = require("../nft-image/nft-image.service");
const imageForNft_service_1 = require("../imageForNft/imageForNft.service");
const getAllNftHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const nfts = await getAllNft();
    const { likes, category, collection, price } = req.query;
    const categoryId = (0, nft_service_1.filterCategory)(category ? category.toString() : undefined);
    const collectionId = (0, nft_service_1.filterCollection)(collection ? collection.toString() : undefined);
    const priceInt = price ? parseInt(price.toString()) : undefined;
    if (!likes && !category && !collection && !price) {
        const allNfts = yield (0, nft_service_1.getAllNft)();
        return res.status(200).json(allNfts);
    }
    const nfts = yield (0, nft_service_1.getAllNft)(likes ? likes.toString() : undefined, categoryId, collectionId, priceInt);
    return res.status(200).json(nfts);
});
exports.getAllNftHandler = getAllNftHandler;
const getNftHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const nft = yield (0, nft_service_1.getNftById)(id);
    if (!nft) {
        return res.status(404).json({
            message: 'nft not found',
        });
    }
    const nftWithOrganizedImages = Object.assign(Object.assign({}, nft), { imageForNft: nft.imageForNft.map((image) => image.nftImage.url) });
    return res.json(nftWithOrganizedImages);
});
exports.getNftHandler = getNftHandler;
const createNftHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const category = yield (0, category_service_1.getCategoryByName)(data.category);
    const collection = yield (0, collection_service_1.getCollectionByName)(data.collection);
    const { id } = req.user;
    const nftToReturn = {
        name: data.name,
        description: data.description,
        price: parseInt(data.price),
        royalty: parseInt(data.royalty),
        categoryId: category === null || category === void 0 ? void 0 : category.id,
        collectionId: collection === null || collection === void 0 ? void 0 : collection.id
    };
    const nft = yield (0, nft_service_1.createNft)(nftToReturn, id);
    const dataRelation = {
        userId: id,
        nftId: nft.id
    };
    yield (0, nftOwner_service_1.createNftOwner)(dataRelation);
    const last3Images = yield (0, nft_image_service_1.getLast3Images)();
    for (let i = 0; i < last3Images.length; i++) {
        yield (0, imageForNft_service_1.createImageForNft)(nft.id, last3Images[i].id);
    }
    return res.status(201).json(nft);
});
exports.createNftHandler = createNftHandler;
const updateNftHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.params;
    const nft = yield (0, nft_service_1.updateNFT)(data, id);
    if (!nft) {
        return res.status(404).json({
            message: 'nft not found',
        });
    }
    return res.status(201).json(nft);
});
exports.updateNftHandler = updateNftHandler;
const deleteNftHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const nft = yield (0, nft_service_1.getNftById)(id);
    if (!nft) {
        return res.status(404).json({
            message: 'Nft not found',
        });
    }
    yield (0, nft_service_1.deleteNft)(id);
    return res.json(nft);
});
exports.deleteNftHandler = deleteNftHandler;
