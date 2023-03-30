const { BusinessListing } = require("../schema")

const getListByID = async (req, res) => {
    try {
        const id = req.params.id
        const listing = await BusinessListing.findById(id)
        return res.status(200).json(listing)
    } catch (error) {
        return res.status(500).json({ message: "An Error Occurred, Try Again" })
    }
}

module.exports = getListByID