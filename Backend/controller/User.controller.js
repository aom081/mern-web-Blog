const bcrypt = require("bcrypt");
const UserModel = require("../model/User");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Please enter both username and password",
    });
    return;
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
      username,
      password: hashedPassword,
    });
    res.status(201).send({
      message: "User Register successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error in registering user",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Please enter both username and password",
    });
    return;
  }
  try {
    const userDoc = await UserModel.findOne({ username });
    if (!userDoc) {
      res.status(404).send({
        message: "User not found",
      });
      return;
    }
    const isValidPassword = bcrypt.compareSync(password, userDoc.password);
    if (!isValidPassword) {
      res.status(401).send({
        message: "Invalid password",
      });
      return;
    }

    //login success
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) {
        res.status(500).send({
          message: "Internal server error:cannot General token",
        });
        return;
      }

      //token general
      res.status(200).send({
        message: "Login success",
        id: userDoc._id,
        username,
        accessToken: token,
      });
    });

  } catch (error) {
    res.status(500).send({
      message: error.message || "Error in logging user",
    });
  }
};
