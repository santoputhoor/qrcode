const express = require('express');
const QRCode = require('qrcode');

const app = express();
const port = process.env.PORT || 3000;

// API endpoint to generate QR code from a query parameter
app.get('/generate', async (req, res) => {
    let text = req.query.text;

    if (!text) {
        return res.status(400).send('Text query parameter is required');
    }

    try {
        // Remove line breaks from the text
        text = text.replace(/[\r\n]+/g, ''); // Remove line breaks

        // Decode the text received in the query string
        text = decodeURIComponent(text);  // Safely decode the text

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
