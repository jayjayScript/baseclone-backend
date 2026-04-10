const router = require('express').Router();
const { adminLogin, getUsers } = require('../controllers/adminController')
const { protectAdmin } = require('../middleware/authMiddleware')

router.post('/login', adminLogin)
router.get('/users', protectAdmin, getUsers)

module.exports = router