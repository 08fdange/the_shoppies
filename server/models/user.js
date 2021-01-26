// User Model

var mongoose = require('mongoose');

const nominationSchema = mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Year: {
        type: String,
    },
    Actors: {
        type: String,
    },
    Rated: String,
    Plot: String,
    Poster: String,
});

// User Schema 
var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nominations: [nominationSchema],
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export User model
const User = module.exports = mongoose.model('User', userSchema);