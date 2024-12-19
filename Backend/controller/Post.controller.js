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
  const { path } = req.file;
  const author = req.userId;
  const { title, summary, content } = req.body;
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const postDoc = await PostModel.create({
    title,
    summary,
    content,
    cover: path,
    author,
  });
  res.json(postDoc);
};


