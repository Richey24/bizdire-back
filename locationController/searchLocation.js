const { BizLocation } = require("../schema")

const searchLocation = async (req, res) => {
    const body = req.body
    const keys = Object.keys(body)
    const obj = {}
    keys.forEach((key) => {
        obj[key] = { "$regex": body[key], "$options": "i" }
    })
    console.log(obj);
    const location = await BizLocation.find(obj)
    res.status(200).json(location)
}

module.exports = searchLocation