const express = require("express")
const multer = require('multer');
const createEvent = require("../eventController/createEvent");
const updateEvent = require("../eventController/updateEvent");
const searchEvent = require("../eventController/searchEvent");
const getAllEvent = require("../eventController/getAllEvent");
const getOneEvent = require("../eventController/getOneEvent");
const deleteEvent = require("../eventController/deleteEvent");
const upload = multer({ dest: "./upload" })

const eventRoutes = express.Router()

eventRoutes.post("/create", upload.single("image"), createEvent)
eventRoutes.put("/update/:id", updateEvent)
eventRoutes.post("/search", searchEvent)
eventRoutes.get("/get/all", getAllEvent)
eventRoutes.get("/get/one/:id", getOneEvent)
eventRoutes.delete("/delete/:id", deleteEvent)

module.exports = eventRoutes