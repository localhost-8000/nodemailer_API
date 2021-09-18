const nodemailer = require("nodemailer");
require("dotenv").config();

//======create mail transporter=============
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
})

//=======verify if transporter is ready or not============
transporter.verify((err, success) => {
    err
        ? console.log(err)
        : console.log(`==server is ready to send message: ${success}==`);
})

module.exports = transporter;