const express = require('express');
const router = express.Router();
const recommendpet = require('../controllers/recommendpet')


router.route('/')
.get(recommendpet.recommendpet)

module.exports = router;