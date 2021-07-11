require("dotenv").config();
const express = require('express')
const cors = require("cors")
const request = require('request');
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
)

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
})

const accessToken = oauth2Client.getAccessToken()

const app = express()

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
// app.route("/").get(function (req, res) {
//     res.sendFile(process.cwd() + "/public/contactUs.html");
// });


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/contact', (req, res) => {
    request(
        { url: 'https://robertkanejr.netlify.app/contact' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message });
            }
            res.json(JSON.parse(body));
        }
    )
});


app.post('/contact', (req, response) => {
    const output = `
  <p>You have a new contact request</p>
  <h3>Contact details</h3>
  <ul>
  <li>FirstName: ${req.body.name}</li>
  <li>Email: ${req.body.email}</li>
  <li>Message: ${req.body.message}</li>
  </ul>`

    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: process.env.GMAIL_USER,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        }
    })

    const mailOpts = {
        from: process.env.GMAIL_USER,
        to: process.env.RECIPIENT,
        subject: 'New message from Nodemailer-contact-form',
        html: output
    }

    smtpTrans.sendMail(mailOpts, (error, res) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + res.message);
            response.status(200).send(200)
        }
    })
})

const port = process.env.PORT || 5000
const server = app.listen(port, listening)
function listening() {
    console.log(`server running on ${port}`)
}