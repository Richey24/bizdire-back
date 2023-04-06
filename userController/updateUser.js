const { BusinessUser } = require("../schema")
const { BlobServiceClient } = require("@azure/storage-blob")
const blobClient = BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=absa7kzimnaf;AccountKey=8sH4dhZjJa8cMyunmS1iDmwve5hZKLo5kaA1M9ubZScLCJ2oEsuSvWT46P2t+ouKoCwFENosnC4m+AStWRQ+rQ==;EndpointSuffix=core.windows.net")
const containerClient = blobClient.getContainerClient("newcontainer")

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const file = req.file
        if (!id) {
            return res.status(400).json({ message: "User ID is required" })
        }
        const user = await BusinessUser.findById(id).select("-password")
        if (!user) {
            return res.status(404).json({ message: "No user found with this ID" })
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
        body.updatedAt = new Date()
        const mainUser = await BusinessUser.findByIdAndUpdate(id, body, { new: true }).select("-password")
        res.status(200).json(mainUser)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = updateUser