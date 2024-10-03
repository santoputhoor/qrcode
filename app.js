const express = require('express');
const QRCode = require('qrcode');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse URL-encoded query strings for POST requests
app.use(express.urlencoded({ extended: true }));

// Helper function to sanitize text by removing line breaks and unwanted characters
function sanitizeText(text) {
    return text.replace(/[\r\n]+/g, '') // Remove line breaks
               .replace(/[^\x20-\x7E]+/g, '') // Remove non-printable characters
               .trim(); // Trim extra spaces
}

// API endpoint to generate QR code from a query parameter (GET or POST)
app.all('/generate', async (req, res) => {
    // Support both GET and POST methods with query parameters
    let text = req.query.text || req.body.text;

    if (!text) {
        return res.status(400).send('Text query parameter is required');
    }

    try {
        // Sanitize and decode the text from the query parameter
        text = sanitizeText(decodeURIComponent(text));

        // Generate QR code
        const qrCodeImageUrl = await QRCode.toDataURL(text);

        // Send the QR code image in the response
        res.status(200).send(`<img src="${qrCodeImageUrl}" />`);
    } catch (err) {
        res.status(500).send('Error generating QR code');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
