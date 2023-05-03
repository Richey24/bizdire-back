const { default: axios } = require("axios")
const { BusinessListing } = require("../schema")
const { BlobServiceClient } = require("@azure/storage-blob")
const fs = require("fs")
const blobClient = BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=absa7kzimnaf;AccountKey=8sH4dhZjJa8cMyunmS1iDmwve5hZKLo5kaA1M9ubZScLCJ2oEsuSvWT46P2t+ouKoCwFENosnC4m+AStWRQ+rQ==;EndpointSuffix=core.windows.net")
const containerClient = blobClient.getContainerClient("newcontainer")
const updateList = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const file = req.file

        console.log(body);

        if (!id) {
            return res.status(400).json({ message: "ID is required" })
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

        if (body.zipcode) {
            const resp = await axios.get(`https://zip-api.eu/api/v1/info/US-${body.zipcode}`)
            const location = await resp.data
            body.state = location.state
            body.city = location.place_name
        }

        await BusinessListing.findByIdAndUpdate(id, body)
        return res.status(200).json({ message: "Updated Successfully" })
    } catch (error) {
        return res.status(500).json({ message: "An Error Occurred, Try Again" })
    }
}

module.exports = updateList