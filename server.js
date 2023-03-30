const express = require("express");
const userRoute = require("./routes/userRoutes");
const cors = require("cors");
const mongoose = require("mongoose");
const listingRoutes = require("./routes/listingRoutes");
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

// all user routes begin with /user
app.use("/user", userRoute)
// all listing routes begin with /listing
app.use("/listing", listingRoutes)