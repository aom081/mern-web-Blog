const multer = require("multer");
const path = require("path");

//Set Storage engin
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.filename + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, //1Mb
  fileFilter(req, file, cb) {
    checkFileType(file, cb); //Check file name
  },
}).single('file'); //input name

function checkFileType (file, cb){
    const fileTypes = /jpeg|jpg|png|git|webp/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if(mimetype && extName){
        return cb(null, true);
    }else{
        cb("Error: Image Only!");
    }
}

module.exports = { upload };