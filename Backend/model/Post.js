const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  summary: String,
  content: String,
  cover: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const PostModel = module("Post", PostSchema);
module.exports = PostModel;
