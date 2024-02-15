const multer =require("multer")
const path=require("path")
const {v4 :uuidv4}=require("uuid")
// const j=require("../uploads/TASKS-UPLOAD")

const taskStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null ,"./uploads");
    },
    filename: function(req,file,cb){
        if(file){
            console.log(file.originalname)
            
            let fileExt=path.extname(file.originalname)
            cb(null,uuidv4()+fileExt)
        }else{
            cb(null,false)
        }
    }

})

const imageupload =multer ({
    storage :taskStorage,
    fileFilter :(req,file,cb)=>{
        const filetype=/jpg|png|gif|webp|jfif|pdf|svg/
        const validatefile=filetype.test(path.extname(file.originalname))
        console.log("validatefile")
        if(file.mimetype.startsWith("image")&&validatefile){
            cb(null,true)
        }else{
            cb("unsuportted file" ,false)
        }
        
    },
    limits:{fileSize :1024*1024*10000}
})

module.exports={imageupload}
// const multer = require("multer");
// const cloudinary = require("cloudinary");
// const cloudinaryStorage = require("multer-storage-cloudinary");
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
//     });
//     const storage = cloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: "demo",
//     allowedFormats: ["jpg", "png"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }]
//     });
//     const parser = multer({ storage: storage });
//     module.exports=parser