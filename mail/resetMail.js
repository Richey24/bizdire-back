const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" })

const resetMail = async (email, token, name) => {

    const theMailer = nodemailer.createTransport({
        service: "Outlook365",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    await theMailer.sendMail({
        from: '"Bizdire" <info@ibiz.world>',
        to: `${email}, ${email}`,
        subject: "Reset Your Password",
        html: `
            <p>Hello ${name},</p>
            <p>A request has been received to change the password for your account.</p>
            <a style="color: blue; text-decoration: none" href="https://www.ibiz.world/reset/${token}">Reset</a>
            <p>If you did not initiate this request, please ignore this email.</p>
            <p>Thank you!</p>
            <p>The EzBooking team.</p>
        `
    })
}

module.exports = resetMail
