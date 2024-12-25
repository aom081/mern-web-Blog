const express = require("express");
const router = express.Router();
const postController = require("../controller/Post.controller");
const { upload } = require("../middlewares/file.middleware");
const authJwt = require("../middlewares/auth.middleware");

//http://localhost:5000/api/v1/post
router.post("", authJwt.verifyToken, upload, postController.createPost);
//http://localhost:5000/api/v1/post
router.get("", postController.getPost);
//http://localhost:5000/api/v1/post/id
router.get("/:id", postController.getPostById);
//http://localhost:5000/api/v1/post/id
router.delete("/:id", authJwt.verifyToken, postController.getPostById);
module.exports = router;
