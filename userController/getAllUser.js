const { BusinessUser } = require("../schema")

const getAllUser = async (req, res) => {
    try {
        const users = await BusinessUser.find({}).select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getAllUser