const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" })

const contactMail = async (req, res) => {
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
        to: `info@dreamtechlabs.net, info@dreamtechlabs.net`,
        subject: `${body.subject}`,
        html: `
           <p>${body.message}</p>
        `
    })
    res.status(200).json({ message: "Mail sent" })
}

module.exports = contactMail