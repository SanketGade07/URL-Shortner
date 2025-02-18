const express=require('express');
const mongoose=require('mongoose');
const path = require('path');
const cors=require('cors');
require('dotenv').config();
const URL=require('./models/url');

const app=express();

app.use(cors());
app.use(express.json()); //middleware for parsing json data
app.use(express.urlencoded({extended: true})); //middleware for parsing urlencoded data


mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{    
    console.log('Error connecting to MongoDB', err);
});




app.use('/', require('./routes/urlRoutes'));




// Serve static files (Frontend)
app.use(express.static(path.join(__dirname, '../frontend/public')));



// Fallback to index.html for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});


app.get('/:shortCode',async (req,res) => {
    try{
        const {shortCode}= req.params;
       
        const urlData = await URL.findOne({shortCode:shortCode});
        if(urlData){
            console.log(urlData.originalUrl)
            res.redirect(urlData.originalUrl);
        }else{
            res.status(404).send('short URL not found')
        }
    }catch(e){
        console.error(e);
        res.status(500).send('Server Error');
    }
});

// Check if running locally
if (require.main === module) {
    app.listen(5000, () => console.log("Server running on http://localhost:5000"));
  }
  
  // Export for Vercel
  module.exports = app;
  