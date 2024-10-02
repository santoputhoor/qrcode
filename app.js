const express = require('express');
const QRCode = require('qrcode');

const app = express();
const port = process.env.PORT || 3000;

// Endpoint to generate QR code from given text
app.get('/generate', async (req, res) => {
    const text = req.query.text;

    if (!text) {
        return res.status(400).send('Text query parameter is required');
    }

    try {
        const qrCodeImageUrl = await QRCode.toDataURL(text);
        res.status(200).send(`<img src="${qrCodeImageUrl}" />`);
    } catch (err) {
        res.status(500).send('Error generating QR code');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
