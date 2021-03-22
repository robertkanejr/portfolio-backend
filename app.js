const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sendGrid = require('@sendGrid/mail');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/api', (req, res) => {
    res.send('API Status: Running')
});

app.post('/api/email', (req, res) => {

    console.log(req.body);

    sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'bkane90@gmail.com',
        from: req.body.email,
        subject: 'Portfolio Site Contact',
        text: req.body.message
    }

    sendGrid.send(msg)
        .then(result => {
            res.status(200).json({
                success: true
            });
        })
        .catch(err => {
            console.log('error: ', err);
            res.status(401).json({
                success: false
            })
        });
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Listening!');
})