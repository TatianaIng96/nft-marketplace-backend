import busboy from "busboy";
import { v2 as cloudinary } from 'cloudinary';
import { Request, Response, NextFunction } from "express";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const formData = (req: Request, _: Response, next: NextFunction) => {
    // let uploadingFile = false;
    // let countFiles = 0;

    const bb = busboy({ headers: req.headers });
    req.body = {};

    bb.on('field', (key, val) => {
        req.body[key] = val;
    });

    // const done = () => {
    //     if (uploadingFile) return;
    //     if (countFiles > 0) return;

    //     next();
    // };

    bb.on('file', (key, stream) => {
        // uploadingFile = true;
        // countFiles++;
        const cloud = cloudinary.uploader.upload_stream(
            { upload_preset: 'nft-marketplace-preset' },
            (err, res) => {
                if (err) throw new Error('Something went wrong uploading to Cloudinary');

                req.body[key] = res?.secure_url;
                next();
                // uploadingFile = false;
                // countFiles--;

                // done();
            }
        );

        stream.on('data', (data) => {
            console.log('DATA IN FORMDATA MIDDLEWARE:', data);
            cloud.write(data);
        });

        stream.on('end', () => {
            cloud.end();
        });

    });

    bb.on('finish', () => {
        // done();
    });

    req.pipe(bb);
};
