const router = require('express').Router();
const { adminLogin, getUsers, getReferralStats } = require('../controllers/adminController')
const { protectAdmin } = require('../middleware/authMiddleware')

router.post('/login', adminLogin)
router.get('/users', protectAdmin, getUsers)
router.get('/referral-stats', protectAdmin, getReferralStats)

module.exports = router