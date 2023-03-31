const express = require("express")
const addCategory = require("../categoryControllers/addCategory")
const getAllCategory = require("../categoryControllers/getAllCategory")

const categoryRoutes = express.Router()

categoryRoutes.post("/create", addCategory)
categoryRoutes.get("/get/all", getAllCategory)

module.exports = categoryRoutes