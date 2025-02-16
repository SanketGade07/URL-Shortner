const express = require('express');
const router = express.Router();
const URL=require('../models/url');
require('dotenv').config();


router.post('/shorten', async (req, res) => {
    const shortCode = generateRandomString();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const shortUrl = `${baseUrl}/${shortCode}`; // This will be returned to the user
    const longUrl = req.body.longUrl;
    console.log('API Base URL:', baseUrl);

    //   // Basic URL validation
    //   const urlPattern = /^(https?:\/\/)[\w.-]+\.[a-z]{2,}.*$/;
    // if (!urlPattern.test(longUrl)) {
    //     return res.status(400).json({ error: 'Invalid URL format' });
    // }
 

    try {
        const url = new URL({
            originalUrl: longUrl,
            shortCode: shortCode,
            shortUrl:shortUrl 
        });

        await url.save();
        console.log(url);
        res.json(url); // Return the short URL to the client
    } catch (e) {
        console.error('Error saving URL:', e);
        res.status(500).json({ error: 'Server error while saving URL' });
    }
});

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}



module.exports = router;