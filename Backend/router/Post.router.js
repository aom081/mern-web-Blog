const express = require("express");
const router = express.Router();
const postController = require("../controller/Post.controller");
const {upload} = require("../middlewares/file.middleware");
const authJwt = require("../middlewares/auth.middleware");

//http

router.post("",authJwt.verifyToken,upload, postController.createPost);
module.exports = router;