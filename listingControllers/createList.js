const { default: axios } = require("axios")
const { BlobServiceClient } = require("@azure/storage-blob")
const { BusinessListing, BizLocation } = require("../schema")
const fs = require("fs")
const { BizCat } = require("../schema")
require("dotenv").config({ path: "../.env" })
const blobClient = BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=absa7kzimnaf;AccountKey=8sH4dhZjJa8cMyunmS1iDmwve5hZKLo5kaA1M9ubZScLCJ2oEsuSvWT46P2t+ouKoCwFENosnC4m+AStWRQ+rQ==;EndpointSuffix=core.windows.net")
const containerClient = blobClient.getContainerClient("newcontainer")


const createList = async (req, res) => {
    // try {
    const body = req.body
    const file = req.file
    if (!body.title || !body.category || !body.userID) {
        return res.status(400).json({ message: "Send all required information and user ID" })
    }
    if (file) {
        // upload image to azure
        const imageClient = containerClient.getBlockBlobClient(file.filename)
        const response = await imageClient.uploadFile(file.path, {
            blobHTTPHeaders: {
                blobContentType: file.mimetype,
            },
        })

        if (response._response.status !== 201) {
            console.log("error");
        }
        // delete image from folder after it is uploaded
        fs.unlink(file.path, (err) => {
            if (err) {
                console.log(err);
            }
        })
        body.image = file.filename
    }
    // get state and city with zipcode
    const resp = await axios.get(`https://zip-api.eu/api/v1/info/US-${body.zipCode}`)
    const location = await resp.data
    body.state = location.state
    body.city = location.place_name
    const obj = {
        state: location.state,
        city: location.place_name
    }
    const loc = await BizLocation.find({ state: location.state, city: location.place_name })
    await BizCat.findOneAndUpdate({ category: body.category }, { $inc: { noOfListings: 1 }, $addToSet: { cities: `${obj.city}, ${obj.state}` } }, { new: true })

    if (loc.length < 1) {
        await BizLocation.create(obj)
    }
    await BusinessListing.create(body)
    return res.status(200).json({ message: "Created Successfully" })
    // } catch (error) {
    //     return res.status(500).json({ message: "An Error Occurred, Try Again" })
    // }
}

module.exports = createList