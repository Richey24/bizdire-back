const { BusinessUser } = require("../schema")
const argon2 = require("argon2")

const changePassword = async (req, res) => {
    const body = req.body
    if (!body.currentPassword || !body.newPassword || !body.id) {
        return res.status(400).json({ message: "Send all required information and user ID" })
    }
    const user = await BusinessUser.findById(body.id)
    const verify = await argon2.verify(user.password, body.currentPassword)
    if (!verify) {
        return res.status(401).json({ message: "Current password is incorrect" })
    }
    const hashedPassword = await argon2.hash(body.newPassword)
    await BusinessUser.findByIdAndUpdate(body.id, { password: hashedPassword })
    return res.status(200).json({ message: "Password Updated Successfully" })
}

module.exports = changePassword