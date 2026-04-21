const router = require('express').Router();
const { adminLogin, getUsers, getReferralStats, getFinderEmails } = require('../controllers/adminController')
const { protectAdmin } = require('../middleware/authMiddleware')

router.post('/login', adminLogin)
router.get('/users', protectAdmin, getUsers)
router.get('/referral-stats', protectAdmin, getReferralStats)
router.get('/finder-emails', protectAdmin, getFinderEmails)

module.exports = router