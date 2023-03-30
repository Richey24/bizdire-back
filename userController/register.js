const { BusinessUser } = require("../schema")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    console.log(req.body)
    try {
        const body = req.body
        if (!body.password || !body.email) {
            return res.status(400).json({ message: "Send all required information" })
        }
        const check = await BusinessUser.findOne({ email: body.email })
        if (check) {
            return res.status(419).json({ message: "This email is already registered" })
        }
        const pass = await argon2.hash(body.password)
        body.password = pass
        body.createdAt = new Date()
        const user = await BusinessUser.create(body)
        const token = jwt.sign({ id: user._id }, "rich", { expiresIn: "10h" })
        const mainUser = await BusinessUser.findByIdAndUpdate(user._id, { mainToken: token }, { new: true }).select("-password")
        res.status(200).json(mainUser)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

module.exports = register


