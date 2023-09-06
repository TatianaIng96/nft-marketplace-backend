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
exports.deleteCategoryHandler = exports.updateCategoryHandler = exports.createCategoryHandler = exports.getSingleCategoryHandler = exports.getAllCategoriesHandler = void 0;
const category_service_1 = require("./category.service");
const getAllCategoriesHandler = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, category_service_1.getAllCategories)();
    res.status(200).json(categories);
});
exports.getAllCategoriesHandler = getAllCategoriesHandler;
const getSingleCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield (0, category_service_1.getSingleCategory)(parseInt(id));
    res.status(200).json(category);
});
exports.getSingleCategoryHandler = getSingleCategoryHandler;
const createCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const createdCategory = yield (0, category_service_1.createCategory)(body);
    res.status(201).json(createdCategory);
});
exports.createCategoryHandler = createCategoryHandler;
const updateCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const updatedCategory = yield (0, category_service_1.updateCategory)(parseInt(id), body);
    res.status(200).json(updatedCategory);
});
exports.updateCategoryHandler = updateCategoryHandler;
const deleteCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedCategory = yield (0, category_service_1.deleteCategory)(parseInt(id));
    res.status(200).json(deletedCategory);
});
exports.deleteCategoryHandler = deleteCategoryHandler;
