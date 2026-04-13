const CoinUser = require('../models/User');
const validator = require('validator');
const ALLOWED_REFERRAL_CODES = ['FHIS', 'BASE100', 'GUIDE', 'PARTNER10'];

const register = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        let referred_by = req.body.referred_by || null;

        // Validate hardcoded referral codes
        if (referred_by && !ALLOWED_REFERRAL_CODES.includes(referred_by)) {
            referred_by = null;
        }

        if(!email || !password){
            return res.status(400).json({ message: "Please provide email and password" })
        }

        if(!validator.isEmail(email)){
             return res.status(400).json({ message: "Invalid email address" })
        }

        const user = await CoinUser.create({
            email: email,
            password: password,
            referredBy: referred_by
        })

        res.status(201).json({
            message: "User created successfully",
            user: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to register user",
            error: error.message
        })
    }
}

module.exports = { register }