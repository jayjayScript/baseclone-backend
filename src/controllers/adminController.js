const jwt = require('jsonwebtoken')
const CoinUser = require('../models/User');

const adminLogin = async (req, res) => {

    try{
        const { email, password } = req.body;

        console.log('Body:', req.body)
        console.log('ENV email:', process.env.ADMIN_EMAIL)
        console.log('ENV password:', process.env.ADMIN_PASSWORD)

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ id: process.env.ADMIN_ID }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.status(200).json({ message: "Login successful", token })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

const getUsers = async (req, res) => {
    try{
        const users = await CoinUser.find();
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { adminLogin, getUsers }