const { BusinessListing } = require("../schema")

const getWithParams = async (req, res) => {
    try {
        const body = req.body
        const listings = await BusinessListing.find(body)
        return res.status(200).json(listings)
    } catch (error) {
        return res.status(500).json({ message: "An Error Occurred, Try Again" })
    }
}

module.exports = getWithParams