const mongoose = require('mongoose')

const finderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    
}, { timestamps: true })

module.exports = mongoose.model('WalletFinder', finderSchema)