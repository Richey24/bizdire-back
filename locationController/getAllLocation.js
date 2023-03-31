const { BizLocation } = require("../schema")

const getAllLocation = async (req, res) => {
    const location = await BizLocation.find({})
    res.status(200).json(location)
}

module.exports = getAllLocation