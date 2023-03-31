const { BizLocation } = require("../schema")

const createLocation = async (req, res) => {
    const body = req.body
    if (!body.state || !body.city) {
        return res.status(400).json({ message: "Send all required information" })
    }
    await BizLocation.create(body)
    return res.status(200).json({ message: "Created Successfully" })
}

module.exports = createLocation