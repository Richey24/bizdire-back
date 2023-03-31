const express = require("express")
const createLocation = require("../locationController/createLocation")
const getAllLocation = require("../locationController/getAllLocation")
const searchLocation = require("../locationController/searchLocation")

const locationRoutes = express.Router()

locationRoutes.post("/add", createLocation)
locationRoutes.get("/get/all", getAllLocation)
locationRoutes.get("/search", searchLocation)

module.exports = locationRoutes