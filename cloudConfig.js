const cloudinary = require('cloudinary').v2;
const multer=require("multer")
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const upload = multer({ dest: 'uploads/' })
require('dotenv').config();
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowedFormats:["png","jpg","jpeg"] 
  },
});

module.exports={storage,cloudinary};