const CoinUser = require('../models/User');
const validator = require('validator')


const register = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password){
            return res.status(400).json({ message: "Please provide email and password" })
        }

        if(!validator.isEmail(email)){
             return res.status(400).json({ message: "Invalid email address" })
        }

        const user = await CoinUser.create({
            email: email,
            password: password
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