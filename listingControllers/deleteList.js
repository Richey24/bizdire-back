const { BusinessListing } = require("../schema")


const deleteList = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "ID is required" })
        }
        await BusinessListing.findByIdAndDelete(id)
        return res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        return res.status(500).json({ message: "An Error Occurred, Try Again" })
    }
}

module.exports = deleteList