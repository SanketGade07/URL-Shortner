const express = require('express');
const router = express.Router();
const URL=require('../models/url');


router.post('/shorten', async (req, res) => {
    const shortCode = generateRandomString();
    const shortUrl = `http://localhost:5000/${shortCode}`; // This will be returned to the user
    const longUrl = req.body.url;

    try {
        const url = new URL({
            originalUrl: longUrl,
            shortCode: shortCode 
        });

        await url.save();
        res.json({ shortUrl }); // Return the short URL to the client
    } catch (e) {
        console.error('Error saving URL:', e);
        res.status(500).json({ error: 'Server error while saving URL' });
    }
});


router.get('/:shortCode',async (req,res) => {
    try{
        const {shortCode}= req.params;
       
        const urlData = await URL.findOne({shortCode:shortCode});
        
        if(urlData){
            
            res.redirect(urlData.originalUrl);
        }else{
            res.status(404).send('short URL not found')
        }
    }catch(e){
        console.error(e);
        res.status(500).send('Server Error');
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