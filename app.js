
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Viber message sending API
app.post('/api/send-message', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await axios.post('https://chatapi.viber.com/pa/send_message', {
      auth_token: process.env.VIBER_AUTH_TOKEN,
      receiver: process.env.VIBER_USER_ID,
      type: 'text',
      text: message
    }, {
      headers: { 'X-Viber-Auth-Token': process.env.VIBER_AUTH_TOKEN }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint
app.post('/webhook', (req, res) => {
  console.log('Webhook Received:', req.body);
  res.status(200).end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
