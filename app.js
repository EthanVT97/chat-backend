// Required packages
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Loads .env file variables

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// GET root for testing if backend is live
app.get('/', (req, res) => {
  res.send('Viber Bot Backend is running!');
});

// POST endpoint to send a Viber message
app.post('/api/send-message', async (req, res) => {
  try {
    const { message } = req.body;

    // Send POST request to Viber API
    const response = await axios.post(
      'https://chatapi.viber.com/pa/send_message',
      {
        receiver: process.env.VIBER_USER_ID,   // Viber user ID of recipient
        type: 'text',
        text: message
      },
      {
        headers: {
          'X-Viber-Auth-Token': process.env.VIBER_AUTH_TOKEN
        }
      }
    );

    // Return API response to client
    res.json(response.data);
  } catch (error) {
    console.error('Send message error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST endpoint for Viber webhook
app.post('/webhook', (req, res) => {
  console.log('Webhook received from Viber:', JSON.stringify(req.body, null, 2));
  res.status(200).end(); // Always respond with 200 OK
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
