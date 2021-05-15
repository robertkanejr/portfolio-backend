require("dotenv").config();
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

app.post("/contact", (req, res) => {
    const mailOpts = {
        to: process.env.GMAIL_USER,
        subject: "New message from contact form Portfolio.",
        html: `${req.body.name} (${req.body.email}) says: ${req.body.message}`,
    };

    smtpTrans.sendMail(mailOpts, (err, info) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send("Message sent succesfully.");
        }
    });
});

app.listen(process.env.PORT, () =>
    console.log(`Server running on port: ${process.env.PORT}.`)
);
