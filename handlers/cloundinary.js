const multer = require('multer');
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
cloudinary.config({
  cloud_name: 'lmtnolimit',
  api_key: '869128828138772',
  api_secret: 'WVuBpZSx34qEP-TdjSgjO-GeNHo'
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "blog-image",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

module.exports = parser;