const { BusinessUser } = require("../schema")

const getOneUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({ message: "User ID is required" })
        }
        const user = await BusinessUser.findById(id).select("-password")
        if (!user) {
            return res.status(404).json({ message: "No user found with this ID" })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = getOneUser