const express = require('express');
const router = express.Router();
const recommend = require('../controllers/recommend')


router.route('/')
.get(recommend.recommend)

module.exports = router;