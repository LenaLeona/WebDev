// to store all shortUrl info

const mongoose = require('mongoose')
const shortId = require('shortid') //unique short identifier

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

//to be able to affect db from the model
module.exports = mongoose.model('ShortUrl', shortUrlSchema)