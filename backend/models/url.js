const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    unique: true,        // Prevent duplicate URLs
    validate: {
      validator: function (v) {
        // Basic URL validation regex
        return /^(https?:\/\/)[^\s$.?#].[^\s]*$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  shortCode: {
    type: String,
    required: true,
    unique: true         // Ensure no two URLs have the same short code
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  shortUrl: {               // Add this field
    type: String,
    required: true,
    unique: true
  },
  clickCount: {
    type: Number,
    default: 0           // To track the number of times the short URL is accessed
  },
  user: {                           // New field to associate URL with a user
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'                      // Reference to the User model
  }
});

module.exports = mongoose.model('URL', urlSchema);
