const multer = require("multer");
const path = require("path");

const firebaseConfig = require("../config/firebase.config");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");

//init firebase
const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);
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
}).single("file"); //input name

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|git|webp/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extName) {
    return cb(null, true);
  } else {
    cb("Error: Image Only!");
  }
}

async function uploadToFirebase(req, res, next) {
  if (!req.file) {
    next();
    return;
  }
  //save location
  const storageRef = ref(firebaseStorage, `upload/${req?.file?.buffer?.originalname}`);
  //file type
  const metadata = {
    contentType: req.file.mimetype,
  };
  try {
    //uploading . . .
    const uploadTask = uploadBytesResumable(storageRef, req.file, metadata);
    // get URL from firebase
    req.file.firebaseUrl = await getDownloadURL(getHeapSnapshot.ref);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message || "Something wrong" });
  }
}

module.exports = { upload, uploadToFirebase };
