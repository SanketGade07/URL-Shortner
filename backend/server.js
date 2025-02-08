const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();

const app=express();

app.use(cors());
app.use(express.json()); //middleware for parsing json data

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{    
    console.log('Error connecting to MongoDB', err);
});

app.get('/api/connect', (req, res)=>{
    res.json({message: 'Connected to server'});
});

app.listen(5000, ()=>{
    console.log(`Server is running on port 5000`);
});