const { default: axios } = require("axios")
const { BlobServiceClient } = require("@azure/storage-blob")
const fs = require("fs")
const { BizEvent, BusinessUser } = require("../schema")
require("dotenv").config({ path: "../.env" })
const blobClient = BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=absa7kzimnaf;AccountKey=8sH4dhZjJa8cMyunmS1iDmwve5hZKLo5kaA1M9ubZScLCJ2oEsuSvWT46P2t+ouKoCwFENosnC4m+AStWRQ+rQ==;EndpointSuffix=core.windows.net")
const containerClient = blobClient.getContainerClient("newcontainer")

const createEvent = async (req, res) => {
    try {
        const body = req.body
        const file = req.file
        if (!body.userID) {
            return res.status(400).json({ message: "User ID is required" })
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

        // get User details
        const user = await BusinessUser.findById(body.userID)
        body.userName = user.name
        body.userImage = user.image
        body.userNumber = user.phoneNumber
        // get state, city, lat, long with zipcode
        if (body.zipcode) {
            const resp = await axios.get(`https://zip-api.eu/api/v1/info/US-${body.zipcode}`)
            const location = await resp.data
            body.location = `${location.place_name}, ${location.state}`
            body.lat = location.lat
            body.long = location.lng
        }
        await BizEvent.create(body)
        return res.status(200).json({ message: "Created Successfully" })

    } catch (error) {
        return res.status(500).json({ message: "An Error Occurred, Try Again" })
    }
}

module.exports = createEvent