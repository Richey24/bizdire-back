const { BizCat } = require("../schema")

const addCategory = async (req, res) => {
    const body = req.body
    if (!body.category) {
        return res.status(400).json({ message: "Send all required information" })
    }
    await BizCat.create(body)
    return res.status(200).json({ message: "Created Successfully" })
}

module.exports = addCategory