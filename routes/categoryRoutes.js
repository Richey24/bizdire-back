const express = require("express")
const addCategory = require("../categoryControllers/addCategory")
const getAllCategory = require("../categoryControllers/getAllCategory")
const updateCategory = require("../categoryControllers/updateCategory")

const categoryRoutes = express.Router()

categoryRoutes.post("/create", addCategory)
categoryRoutes.get("/get/all", getAllCategory)
categoryRoutes.put("/update/:id", updateCategory)

module.exports = categoryRoutes