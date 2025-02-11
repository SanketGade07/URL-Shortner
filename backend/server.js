const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

const allowedOrigins = [
    'http://localhost:5000', // Local development
    'https://url-shortner-nine-beta.vercel.app/' // Replace with your actual Vercel domain
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json()); //middleware for parsing json data
app.use(express.urlencoded({ extended: true })); //middleware for parsing urlencoded data

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

app.use('/', require('./routes/urlRoutes'));

// Serve static files (Frontend)
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Fallback to index.html for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});