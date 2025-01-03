const express = require("express");
const router = express.Router();
const postController = require("../controller/Post.controller");
const { upload, uploadToFirebase } = require("../middlewares/file.middleware");
const authJwt = require("../middlewares/auth.middleware");

//http://localhost:5000/api/v1/post
router.post("", authJwt.verifyToken, upload,uploadToFirebase, postController.createPost);
//http://localhost:5000/api/v1/post
router.get("", postController.getPost);
//http://localhost:5000/api/v1/post/id
router.get("/:id", postController.getPostById);
//http://localhost:5000/api/v1/post/id
router.delete("/:id", authJwt.verifyToken, postController.getPostById);
//http://localhost:5000/api/v1/post/id
router.put("/:id", authJwt.verifyToken, upload, postController.updatePost);
//http://localhost:5000/api/v1/author/id
router.get("/author/:id", postController.getPostByAuthor);
module.exports = router;
