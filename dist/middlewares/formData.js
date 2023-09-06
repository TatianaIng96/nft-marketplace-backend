"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formData = void 0;
const busboy_1 = __importDefault(require("busboy"));
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const formData = (req, _, next) => {
    let uploadingFile = false;
    let countFiles = 0;
    const bb = (0, busboy_1.default)({ headers: req.headers });
    req.body = {};
    const done = () => {
        if (uploadingFile)
            return;
        if (countFiles > 0)
            return;
        next();
    };
    bb.on('file', (key, stream) => {
        uploadingFile = true;
        countFiles++;
        const cloud = cloudinary_1.v2.uploader.upload_stream({ upload_preset: 'nft-marketplace-preset' }, (err, res) => {
            if (err)
                throw new Error('Something went wrong uploading to Cloudinary');
            req.body[key] = res === null || res === void 0 ? void 0 : res.secure_url;
            uploadingFile = false;
            countFiles--;
            done();
        });
        stream.on('data', (data) => {
            cloud.write(data);
        });
        stream.on('end', () => {
            cloud.end();
        });
    });
    bb.on('finish', () => {
        done();
    });
    req.pipe(bb);
};
exports.formData = formData;
