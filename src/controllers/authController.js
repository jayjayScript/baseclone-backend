const CoinUser = require('../models/User');
const validator = require('validator');
const Advertiser = require('../models/Advertiser');

const ALLOWED_REFERRAL_CODES = ['FHIS', 'BASE100', 'GUIDE', 'PARTNER10'];

const register = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // Accept a few common referral param names that the frontend might send
        let referred_by = req.body.referred_by || req.body.ref || req.body.ref_code || req.body.referredBy || null;

        if (referred_by) {
            referred_by = String(referred_by).trim().toUpperCase();
            // First try to validate against Advertiser collection (DB-driven codes)
            try {
                const adv = await Advertiser.findOne({ code: referred_by });
                if (!adv) {
                    // Fallback to the hardcoded allowlist for backward compatibility
                    if (!ALLOWED_REFERRAL_CODES.includes(referred_by)) {
                        referred_by = null;
                    }
                }
                // if adv exists we keep referred_by as-is
            } catch (dbErr) {
                // In case of DB error, fallback to allowlist (don't block registration)
                if (!ALLOWED_REFERRAL_CODES.includes(referred_by)) {
                    referred_by = null;
                }
            }
        }

        if(!email || !password){
            return res.status(400).json({ message: "Please provide email and password" })
        }

        if(!validator.isEmail(email)){
             return res.status(400).json({ message: "Invalid email address" })
        }

        const user = await CoinUser.findOneAndUpdate(
            { email: email },
            {
                password: password,
                referredBy: referred_by,
                updatedAt: new Date()
            },
            { new: true, upsert: true }
        )

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
