const { BizEvent } = require("../schema")

const getOneEvent = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "Event ID is required" })
        }
        const event = await BizEvent.findById(id)
        if (!event) {
            return res.status(404).json({ message: "No event found with this ID" })
        }
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getOneEvent