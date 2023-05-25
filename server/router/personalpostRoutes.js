const express = require('express');
const router = express.Router();
const personalpostController = require('../controllers/personalpost')

router.route('/')
.get(personalpostController.getPost)


module.exports = router;