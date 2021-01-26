// Nomination Model

const mongoose = require('mongoose');

// Nomination Schema
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
    Poster: String,
    Rated: String,
    Plot: String,
});

module.exports = nominationSchema;

