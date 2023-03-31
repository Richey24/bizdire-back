const { BusinessListing } = require("../schema")

const getWithParams = async (req, res) => {
    try {
        const body = req.body
        const keys = Object.keys(body)
        const obj = {}
        keys.forEach((key) => {
            obj[key] = { "$regex": body[key], "$options": "i" }
        })
        const listings = await BusinessListing.find(obj)
        return res.status(200).json(listings)
    } catch (error) {
        return res.status(500).json({ message: "An Error Occurred, Try Again" })
    }
}

module.exports = getWithParams