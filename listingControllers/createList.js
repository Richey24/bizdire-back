const { default: axios } = require("axios")
const { BlobServiceClient } = require("@azure/storage-blob")
const { BusinessListing } = require("../schema")
const fs = require("fs")
require("dotenv").config({ path: "../.env" })
const blobClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE)
const containerClient = blobClient.getContainerClient("newcontainer")


const createList = async (req, res) => {
    // try {
    const body = req.body
    const file = req.file
    console.log(body);
    if (!body.title || !body.category) {
        return res.status(400).json({ message: "Send all required information" })
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
    await BusinessListing.create(body)
    return res.status(200).json({ message: "Created Successfully" })
    // } catch (error) {
    //     return res.status(500).json({ message: "An Error Occurred, Try Again" })
    // }
}

module.exports = createList