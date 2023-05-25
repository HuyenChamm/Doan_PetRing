const express = require('express');
const router = express.Router();
const recommendfr = require('../controllers/recommendfr')


router.route('/')
.get(recommendfr.recommendfr)

module.exports = router;