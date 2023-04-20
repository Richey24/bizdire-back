const { BizEvent } = require("../schema")

const deleteEvent = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "Event ID is required" })
        }
        await BizEvent.findByIdAndDelete(id)
        res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = deleteEvent