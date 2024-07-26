const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  private_cdn: process.env.private_cdn,
  secure_distribution: process.env.secure_distribution,
  secure: process.env.secure,
});

const cloudupload = async (path) => {
  try {
    // Upload the image
    const options = {
      use_filename: true,
      unique_filename: true,
      folder: "ProductData",
    };
    const result = await cloudinary.uploader.upload(path, options);
    // console.log(result);
    return result;
  } catch (error) {
    console.error("Error on cloudinary: ", error);
  }
};

// Deleting the cloudinary image ---
const cloudDistroy = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.log("Error on delete cloudinary file: ", error);
  }
};

// Multer setup for file upload ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const multerupload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },// 10MB max size
});

module.exports = { cloudupload, cloudDistroy, multerupload };
