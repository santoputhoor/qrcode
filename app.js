const express = require('express');
const QRCode = require('qrcode');

const app = express();
const port = process.env.PORT || 3000;

app.get('/generate', async (req, res) => {
    let text = req.query.text;

    if (!text) {
        return res.status(400).send('Text query parameter is required');
    }

    try {
        // Decode the text received in the query string
        text = decodeURIComponent(text);  // Safely decode the text
        const qrCodeImageUrl = await QRCode.toDataURL(text);  // Generate QR code
        res.status(200).send(`<img src="${qrCodeImageUrl}" />`);
    } catch (err) {
        res.status(500).send('Error generating QR code');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
