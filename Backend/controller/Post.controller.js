const PostModel = require("../model/Post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.createPost = async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  //File upload
  if (!req.file) {
    return res.status(400).json({ message: "No Image uploaded" });
  }
  const { path } = req.file.firebaseUrl;
  const author = req.userId;
  const { title, summary, content } = req.body;
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const postDoc = await PostModel.create({
      title,
      summary,
      content,
      cover: req.file.firebaseUrl,
      author,
    });
    res.json(postDoc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create post" });
  }
};

exports.getPost = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    //SELECT * FROM POST WHERE POST.author =USER._id
    if (!posts) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "Internal server error" });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await PostModel.findById(id).populate("author", [
      "username",
    ]);
    if (!postDoc) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.json(postDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "Internal server error" });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const authorId = req.userId;
  try {
    const postDoc = await PostModel.findById(id);
    if (authorId !== postDoc.author.toString()) {
      res.status(403).send({ message: "You can not delete post" });
      return;
    }
    await postDoc.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "delete Post error" });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ message: "Post not provided" });
  const authorId = req.userId;
  try {
    const postDoc = await PostModel.findById(id);
    if (authorId !== postDoc.author.toString()) {
      res.status(403).send({ message: "You can not update post" });
      return;
    }

    const { title, summary, content } = req.body;
    if (!title || !summary || !content) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    if (req.file) {
      const { path } = req.file;
      postDoc.cover = path;
    }
    await postDoc.save();
    res.json({ message: "Post updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "update Post error" });
  }
};

exports.getPostByAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await PostModel.find({ author: id }).populate("author", [
      "username",
    ]);
    if (!postDoc) {
      return res.status(404).send({ message: "author not found" });
    }
    res.json(postDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "Internal server error" });
  }
};
