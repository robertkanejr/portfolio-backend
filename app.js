// require("dotenv").config();
// const express = require("express");
// const app = express();
// const nodemailer = require("nodemailer");
// const cors = require("cors");

// app.use(cors());
// app.use(express.json());

// const smtpTrans = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//     },
// });

// app.post("/contact", (req, res) => {
//     const mailOpts = {
//         to: process.env.GMAIL_USER,
//         subject: "Portfolio Site Contact Form Submission",
//         html: `${req.body.name} (${req.body.email}) says: ${req.body.message}`,
//     };

//     smtpTrans.sendMail(mailOpts, (err, info) => {
//         if (err) {
//             res.status(404).send(err);
//         } else {
//             res.send("Message sent succesfully");
//         }
//     });
// });

// app.listen(process.env.PORT, () =>
//     console.log(`Server running on port: ${process.env.PORT}.`)
// );



// function sendEmail(name, email, message) {
//     const options = {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             name: name,
//             email: email,
//             message: message
//         })
//     }

//     return fetch("/contact", options)
//         .then(res => {
//             if (res.status === 200) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Message sent successfully!',
//                 })
//                 form.reset()
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error, please try again!',
//                 })
//             }
//         })
// }
