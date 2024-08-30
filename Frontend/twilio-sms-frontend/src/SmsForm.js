import React, { useState } from 'react';
import axios from 'axios';
import './SmsForm.css';
// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const SmsForm = () => {
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSendSms = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/send-sms', { to, message });
            if (res.data.success) {
                setResponse(`SMS sent successfully!`);
                setIsSuccess(true);
            } else {
                setResponse(`Error: ${res.data.error}`);
                setIsSuccess(false);
            }
        } catch (error) {
            setResponse('An error occurred while sending the SMS.');
            setIsSuccess(false);
        }
    };

    return (
        <div className="sms-container">
            <h1>Send SMS with Twilio</h1>
            <form onSubmit={handleSendSms}>
                <label htmlFor="to">Recipient Phone Number:</label>
                <input
                    type="text"
                    id="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="+91 Enter your Mobile number Here"
                    required
                />
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message here..."
                    required
                />
                <button type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Send SMS
                </button>
            </form>
            {response && (
                <div className={`response ${isSuccess ? 'success' : 'error'}`}>
                    {response}
                </div>
            )}
        </div>
    );
};

export default SmsForm;
