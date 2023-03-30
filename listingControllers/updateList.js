const { BusinessListing } = require("../schema")

const updateList = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        if (!id) {
            return res.status(400).json({ message: "ID is required" })
        }
        await BusinessListing.findByIdAndUpdate(id, body)
        return res.status(200).json({ message: "Updated Successfully" })
    } catch (error) {
        return res.status(500).json({ message: "An Error Occurred, Try Again" })
    }
}

module.exports = updateList