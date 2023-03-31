const { BizCat } = require("../schema")

const getAllCategory = async (req, res) => {
    const category = await BizCat.find({})
    res.status(200).json(category)
}

module.exports = getAllCategory