const bcrypt = require("bcrypt");
const UserModel = require("../model/User")
const salt = bcrypt.genSaltSync(10);

exports.register = async(req,res) => {
    const {username, password} = req.body;
    if(!username || !password){
        res.status(400).send({
            message: "Please enter both username and password"
        });
        return;
    }
    try{
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await UserModel.create({
            username,
            password: hashedPassword,
        })
        res.status(201).send({
            message: "User Register successfully",
            user,
            });
    }catch (error){
        res.status(500).send({
            message:error.message || "Error in registering user",
        })
    }
}