const express = require("express");
const userRoute = require("./routes/userRoutes");
const cors = require("cors");
const mongoose = require("mongoose");
const listingRoutes = require("./routes/listingRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const locationRoutes = require("./routes/locationRoutes");
const contactMail = require("./mail/contactMail");
const { BusinessUser } = require("./schema");
const app = express()
require("dotenv").config({ path: ".env" })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("Database is connected");
    })
    .catch(err => {
        console.log({ database_error: err });
    });


app.listen(port, () => {
    console.log("Application started on port 5000!");
})

app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/user/get/noofuser", async (req, res) => {
    const users = await BusinessUser.find({})
    res.status(200).json({ noOfUser: users.length })
})

app.post("/contact", contactMail)

// all user routes begin with /user
app.use("/user", userRoute)
// all listing routes begin with /listing
app.use("/listing", listingRoutes)
// all category routes begin with /category
app.use("/category", categoryRoutes)
// all location routes begin with /location
app.use("/location", locationRoutes)