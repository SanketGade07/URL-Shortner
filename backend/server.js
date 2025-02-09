const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();

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

app.get('/',(req,res)=>{
    res.send('url shortner backend server');
})

app.listen(5000, ()=>{
    console.log(`Server is running on port 5000`);
});