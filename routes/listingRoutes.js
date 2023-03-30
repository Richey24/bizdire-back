const express = require("express")
const multer = require('multer');
const createList = require("../listingControllers/createList");
const deleteList = require("../listingControllers/deleteList");
const getAllListing = require("../listingControllers/getAll");
const getListByID = require("../listingControllers/getByID");
const getWithParams = require("../listingControllers/getWIthParam");
const updateList = require("../listingControllers/updateList");
const upload = multer({ dest: "./upload" })

const listingRoutes = express.Router()

listingRoutes.post("/create", upload.single("image"), createList)
listingRoutes.get("/get/all", getAllListing)
listingRoutes.post("/get/params", getWithParams)
listingRoutes.get("/get/one/:id", getListByID)
listingRoutes.put("/update/:id", updateList)
listingRoutes.delete("/delete/:id", deleteList)

module.exports = listingRoutes