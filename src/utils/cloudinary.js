import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config(); 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
    // cloud_name: 'wasif-vtube', 
    // api_key: '631555165679188', 
    // api_secret: 'f-0i4N3_qBAZWyFPswRRv2kNkew'
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // file has been uploaded successfully
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        console.error("Cloudinary upload error: ", error);
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export {uploadOnCloudinary}