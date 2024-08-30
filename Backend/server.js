const express = require('express');
const twilio = require('twilio');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

const app = express();
const port = 5000; // Backend will run on port 5000


// Twilio credentials from .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Middleware
app.use(cors()); // Allow requests from other origins
app.use(express.json());


// Endpoint to send SMS
app.post('/send-sms', (req, res) => {
    const { to, message } = req.body;

    client.messages
        .create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: '+919877178891',
        })
        .then((message) => res.json({ success: true, messageSid: message.sid }))
        .catch((error) => res.json({ success: false, error: error.message }));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});