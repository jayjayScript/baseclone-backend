const WalletFinder = require('../models/Finder')
const validator = require('validator')

const store = async (req, res) => {
    try {
        const email = req.body.email;

        if(!email){
            return res.status(400).json({ message: "Please provide email" })
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({ message: "Invalid email address" })
        }

        const walletFinder = await WalletFinder.create({
            email: email
        })

        res.status(201).json({
            message: "Wallet Email stored successfully",
            walletFinder: walletFinder
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to store wallet Email",
            error: error.message
        })
    }
}

module.exports = { store }