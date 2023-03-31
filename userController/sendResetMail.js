const jwt = require("jsonwebtoken")
const resetMail = require("../mail/resetMail")
const { BusinessUser } = require("../schema")

const sendResetMail = async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).json({ message: "User email is required" })
    }
    const user = await BusinessUser.findOne({ email: email }).select("-password")
    if (!user) {
        return res.status(404).json({ message: "No user found with this ID" })
    }
    const token = jwt.sign({ id: user._id }, "rich", { expiresIn: "10h" })
    await resetMail(user.email, token, user.firstName)
    res.status(200).json({ message: "Reset Mail Sent" })
}

module.exports = sendResetMail