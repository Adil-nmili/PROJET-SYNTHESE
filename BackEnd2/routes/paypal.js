const express = require('express');
const router = express.Router();
const paypal = require('@paypal/checkout-server-sdk');

// PayPal client configuration
let environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
let client = new paypal.core.PayPalHttpClient(environment);

// Verify PayPal email
router.post('/verify-email', async (req, res) => {
  try {
    const { email } = req.body;

    // Create a request to PayPal's Identity API
    const request = new paypal.core.PayPalHttpRequest();
    request.path = '/v1/identity/oauth2/userinfo';
    request.headers = {
      'Authorization': `Bearer ${await getAccessToken()}`,
      'Content-Type': 'application/json'
    };

    // Make the request to PayPal
    const response = await client.execute(request);

    // Check if the email matches
    if (response.result.email === email) {
      res.json({ verified: true });
    } else {
      res.status(404).json({ 
        verified: false, 
        message: 'Email not associated with a PayPal account' 
      });
    }
  } catch (error) {
    console.error('PayPal verification error:', error);
    res.status(500).json({ 
      verified: false, 
      message: 'Failed to verify PayPal email' 
    });
  }
});

// Helper function to get PayPal access token
async function getAccessToken() {
  const request = new paypal.core.PayPalHttpRequest();
  request.path = '/v1/oauth2/token';
  request.method = 'POST';
  request.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  request.body = 'grant_type=client_credentials';

  const response = await client.execute(request);
  return response.result.access_token;
}

module.exports = router; 