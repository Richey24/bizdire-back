const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" })

const userMail = async (req, res) => {
    const body = req.body

    const theMailer = nodemailer.createTransport({
        service: "Outlook365",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    await theMailer.sendMail({
        from: `"${body.name}" <info@israelbiblecamp.com>`,
        to: `${body.userEmail}, ${body.userEmail}`,
        subject: `New Message`,
        html: `
        <h2>New Message From ${body.senderEmail}</h2>
        <p>${body.message}</p>
        `
    })
    res.status(200).json({ message: "Mail sent" })
}

module.exports = userMail