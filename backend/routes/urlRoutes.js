const express = require('express');
const router = express.Router();
const URL=require('../models/url');


router.post('/shorten', async (req, res) => {
    const shortCode=generateRandomString();
    const shortUrl= `http://localhost:5000/${shortCode}`
    const longUrl= req.body.url;
    let url= await new URL();
    url.originalUrl=longUrl;
    url.shortCode=shortUrl;
    try{
        url=await url.save();
    }
    catch(e){
        console.error('Error saving url:', e);
    }
    res.json(url);

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