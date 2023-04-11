const jwt = require("jsonwebtoken")
const express = require("express");
const multer = require('multer');
const register = require("../userController/register");
const login = require("../userController/login");
const getOneUser = require("../userController/getOneUser");
const updateUser = require("../userController/updateUser");
const deleteUser = require("../userController/deleteUser");
const getAllUser = require("../userController/getAllUser");
const resetPassword = require("../userController/resetPass");
const sendResetMail = require("../userController/sendResetMail");
const { BusinessUser } = require("../schema");
const upload = multer({ dest: "./upload" })

const userRoute = express.Router()


const restrict = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "rich");
        req.userData = decoded;
        next()
    } catch (error) {
        return res.status(401).json({ message: "invalid token" })
    }
}

userRoute.post("/register", register)
userRoute.post("/login", login)
userRoute.get("/get/:id", restrict, getOneUser)
userRoute.put("/update/:id", restrict, upload.single("image"), updateUser)
userRoute.delete("/delete/:id", restrict, deleteUser)
userRoute.get("/find/all", restrict, getAllUser)
userRoute.post("/reset/password", restrict, resetPassword)
userRoute.post("/reset/send", sendResetMail)
userRoute.get("/get/noofuser", async (req, res) => {
    const users = await BusinessUser.find({})
    res.status(200).json({ noOfUser: users.length })
})

module.exports = userRoute