const { BusinessListing } = require("../schema")

const getAllListing = async (req, res) => {
    try {
        const listings = await BusinessListing.find({})
        return res.status(200).json(listings)
    } catch (error) {
        return res.status(500).json({ message: "An Error Occurred, Try Again" })
    }
}

module.exports = getAllListing