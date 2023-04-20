const { BizEvent } = require("../schema")

const getAllEvent = async (req, res) => {
    try {
        const events = await BizEvent.find({})
        return res.status(200).json(events)
    } catch (error) {
        return res.status(500).json({ message: "An Error Occurred, Try Again" })
    }
}

module.exports = getAllEvent