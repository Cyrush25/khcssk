const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // Use any port you prefer

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { name, phone, slot, day, utr } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail', // e.g., 'Gmail'
        auth: {
            user: 'aarushchandna1@gmail.com',
            pass: 'qwzdieursxtritny',
        },
    });

    const mailOptions = {
        from: 'aarushchandna1@gmail.com',
        to: 'profdrsskochhar@gmail.com',
        subject: 'New Consultancy Request',
        text: `Name: ${name}\nPhone: ${phone}\nDay: ${day}\nPreferred Slot: ${slot}\nUTR: ${utr}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send('Oops! Something went wrong.');
        } else {
            console.log('Email sent:', info.response);
            res.send('Thank you for your request. We will contact you soon!');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
