const express = require("express");
const cors = require("cors");
const transporter = require("./middleware/sendEmail")
require("dotenv").config();

//===initializing app=========
const app = express();

//======middleware===============
app.use(cors());
app.use(express.json({ limit: '25mb'}));
app.use(express.urlencoded({ limit: '25mb', extended: true}));



//======routes====================
app.get("/", (req, res) => {
    res.send("hello nodemailer api")
})

app.post("/send", (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const msg = req.body.msg;

    const emailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: "Portfolio Feedback Message",
        html: `
            <p>Hello Rahul..</p>
            <p><b>${name}</b> this side..</p>
            <p>This is my email: ${email}</p>
            <p>Here is my message: ${msg}</p>
        `
    }

    transporter.sendMail(emailOptions, (err, info) => {
        if(err) {
            res.status(403).json("message not sent");
        } else {
            res.status(200).json("message sent");
        }
    })
})



const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Porfolio backend server started at http://localhost:${port}/`);
})