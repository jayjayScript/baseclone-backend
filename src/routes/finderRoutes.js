const router = require('express').Router();
const { store } = require('../controllers/finderController');

router.post('/store', store);

module.exports = router;